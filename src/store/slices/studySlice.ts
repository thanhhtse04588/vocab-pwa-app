import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { StudySession, VocabularyWord, StudyMode } from '@/types';
import { db } from '@/services/database';
import { generateUUID } from '@/utils/uuid';

interface StudyState {
  currentSession: StudySession | null;
  wordsToStudy: VocabularyWord[];
  currentWordIndex: number;
  studyMode: StudyMode;
  batchSize: number;
  currentBatch: VocabularyWord[];
  batchIndex: number;
  loading: boolean;
  error: string | null;
  isStudying: boolean;
  sessionResults: {
    correct: number;
    incorrect: number;
    total: number;
  };
  incorrectWords: VocabularyWord[]; // Words that were answered incorrectly
  isReviewMode: boolean; // Whether this is a review session or new words session
  answeredWords: string[]; // Track which words have been answered to prevent double submission
  isRetryMode: boolean; // Whether we're currently in retry mode
  // Session metadata for loading more words
  sessionSetId: string | null; // The setId being studied (null for review mode)
  sessionStudyMode: 'new' | 'review' | null; // The study mode for this session
}

const initialState: StudyState = {
  currentSession: null,
  wordsToStudy: [],
  currentWordIndex: 0,
  studyMode: 'write',
  batchSize: 10,
  currentBatch: [],
  batchIndex: 0,
  loading: false,
  error: null,
  isStudying: false,
  sessionResults: {
    correct: 0,
    incorrect: 0,
    total: 0,
  },
  incorrectWords: [],
  isReviewMode: false,
  answeredWords: [],
  isRetryMode: false,
  sessionSetId: null,
  sessionStudyMode: null,
};

// Async thunks
export const startStudySession = createAsyncThunk(
  'study/startSession',
  async ({ setId, batchSize, studyMode = 'review' }: { 
    setId: string; 
    batchSize: number; 
    studyMode?: 'review' | 'new' 
  }) => {
    let wordsToStudy: VocabularyWord[] = [];
    
    if (studyMode === 'review') {
      if (setId === 'review') {
        // Get all words that need review across all sets
        wordsToStudy = await db.getAllWordsForReview(batchSize);
      } else {
        // Get words that need review for specific set
        wordsToStudy = await db.getWordsForReview(setId, batchSize);
      }
    } else {
      // Get new words (not yet studied or memory level 0)
      wordsToStudy = await db.getNewWords(setId, batchSize);
    }
    
    if (wordsToStudy.length === 0) {
      throw new Error(`No words available for ${studyMode} study`);
    }

    // Create new study session
    const sessionId = generateUUID();
    const newSession: StudySession = {
      id: sessionId,
      vocabularySetId: setId,
      startedAt: new Date().toISOString(),
      totalWords: wordsToStudy.length,
      correctWords: 0,
      incorrectWords: 0,
      wordsStudied: wordsToStudy.map(w => w.id),
      isCompleted: false,
    };

    await db.studySessions.add(newSession);

    return {
      session: newSession,
      words: wordsToStudy,
      batchSize,
      isReviewMode: studyMode === 'review',
      sessionSetId: setId === 'review' ? null : setId,
      sessionStudyMode: studyMode,
    };
  }
);

export const loadMoreWords = createAsyncThunk(
  'study/loadMoreWords',
  async ({ batchSize }: { batchSize: number }, { getState }) => {
    const state = getState() as { study: StudyState };
    const { sessionSetId, sessionStudyMode } = state.study;
    
    if (!sessionSetId && !sessionStudyMode) {
      throw new Error('No session metadata available');
    }
    
    let newWords: VocabularyWord[] = [];
    
    if (sessionStudyMode === 'review') {
      if (sessionSetId === null) {
        // Get all words that need review across all sets
        newWords = await db.getAllWordsForReview(batchSize);
      } else {
        // Get words that need review for specific set
        newWords = await db.getWordsForReview(sessionSetId, batchSize);
      }
    } else {
      // Get new words (not yet studied or memory level 0)
      if (sessionSetId) {
        newWords = await db.getNewWords(sessionSetId, batchSize);
      }
    }
    
    return { newWords };
  }
);

export const submitAnswer = createAsyncThunk(
  'study/submitAnswer',
  async ({ wordId, isCorrect }: { wordId: string; isCorrect: boolean }) => {
    // Update word memory level and next review time
    await db.updateWordMemoryLevel(wordId, isCorrect);
    
    // Get updated word
    const updatedWord = await db.vocabularyWords.get(wordId);
    
    return {
      wordId,
      isCorrect,
      updatedWord,
    };
  }
);

export const completeStudySession = createAsyncThunk(
  'study/completeSession',
  async ({ sessionId, results }: { sessionId: string; results: { correct: number; incorrect: number } }) => {
    const session = await db.studySessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const updatedSession: StudySession = {
      ...session,
      completedAt: new Date().toISOString(),
      correctWords: results.correct,
      incorrectWords: results.incorrect,
      isCompleted: true,
    };

    await db.studySessions.update(sessionId, updatedSession as Partial<StudySession>);

    // Update user progress
    const existingProgress = await db.userProgress
      .where('vocabularySetId')
      .equals(session.vocabularySetId)
      .first();

    if (existingProgress) {
      await db.userProgress.update(existingProgress.id, {
        totalWordsStudied: existingProgress.totalWordsStudied + session.totalWords,
        totalCorrectAnswers: existingProgress.totalCorrectAnswers + results.correct,
        totalIncorrectAnswers: existingProgress.totalIncorrectAnswers + results.incorrect,
        averageAccuracy: (existingProgress.totalCorrectAnswers + results.correct) / 
                        (existingProgress.totalWordsStudied + session.totalWords),
        lastStudyDate: new Date().toISOString(),
      });
    } else {
      const newProgress = {
        id: generateUUID(),
        vocabularySetId: session.vocabularySetId,
        totalWordsStudied: session.totalWords,
        totalCorrectAnswers: results.correct,
        totalIncorrectAnswers: results.incorrect,
        averageAccuracy: results.correct / session.totalWords,
        streakDays: 1,
        lastStudyDate: new Date().toISOString(),
        memoryLevelDistribution: {} as Record<number, number>,
      };
      await db.userProgress.add(newProgress);
    }

    return updatedSession;
  }
);

export const loadWordsForStudy = createAsyncThunk(
  'study/loadWords',
  async ({ setId, limit }: { setId: string; limit?: number }) => {
    const words = await db.getWordsForReview(setId, limit);
    return words;
  }
);

const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    setStudyMode: (state, action: PayloadAction<StudyMode>) => {
      state.studyMode = action.payload;
    },
    setBatchSize: (state, action: PayloadAction<number>) => {
      state.batchSize = action.payload;
    },
    nextWord: (state) => {
      if (state.currentWordIndex < state.currentBatch.length - 1) {
        state.currentWordIndex += 1;
      } else {
        // End of current batch - check if we need to retry incorrect words
        
        if (state.incorrectWords.length > 0) {
          // Retry incorrect words
          state.currentBatch = [...state.incorrectWords];
          state.incorrectWords = [];
          state.currentWordIndex = 0;
          state.answeredWords = []; // Reset answered words for retry batch
          state.isRetryMode = true; // Set retry mode
        } else if (state.isRetryMode) {
          // We were in retry mode but no more incorrect words - exit retry mode and continue
          state.isRetryMode = false;
          
          // Move to next batch if available
          const nextBatchStart = (state.batchIndex + 1) * state.batchSize;
          const nextBatch = state.wordsToStudy.slice(nextBatchStart, nextBatchStart + state.batchSize);
          
          if (nextBatch.length > 0) {
            state.currentBatch = nextBatch;
            state.batchIndex += 1;
            state.currentWordIndex = 0;
            state.answeredWords = []; // Reset answered words for new batch
          } else {
            // This will be handled by loadMoreWords thunk
          }
        } else {
          // Normal batch completion - need to load more words from database
          // This will be handled by loadMoreWords thunk
        }
      }
    },
    previousWord: (state) => {
      if (state.currentWordIndex > 0) {
        state.currentWordIndex -= 1;
      }
    },
    setCurrentBatch: (state, action: PayloadAction<VocabularyWord[]>) => {
      state.currentBatch = action.payload;
      state.currentWordIndex = 0;
    },
    incrementCorrect: (state) => {
      state.sessionResults.correct += 1;
    },
    incrementIncorrect: (state) => {
      state.sessionResults.incorrect += 1;
    },
    resetStudySession: (state) => {
      state.currentSession = null;
      state.wordsToStudy = [];
      state.currentWordIndex = 0;
      state.currentBatch = [];
      state.batchIndex = 0;
      state.isStudying = false;
      state.incorrectWords = [];
      state.isReviewMode = false;
      state.answeredWords = [];
      state.isRetryMode = false;
      state.sessionSetId = null;
      state.sessionStudyMode = null;
      state.sessionResults = {
        correct: 0,
        incorrect: 0,
        total: 0,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    checkSessionCompletion: (state) => {
      // Check if session is complete
      // Calculate how many words have been processed so far
      const processedWords = (state.batchIndex + 1) * state.batchSize;
      const hasMoreBatches = processedWords < state.wordsToStudy.length;
      const hasIncorrectWords = state.incorrectWords.length > 0;
      
      // Session is complete only if:
      // 1. No more batches AND
      // 2. No incorrect words to retry AND  
      // 3. Not currently in retry mode
      if (!hasMoreBatches && !hasIncorrectWords && !state.isRetryMode) {
        // Session is complete
        state.isStudying = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Start study session
      .addCase(startStudySession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startStudySession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload.session;
        state.wordsToStudy = action.payload.words;
        state.batchSize = action.payload.batchSize;
        state.currentBatch = action.payload.words.slice(0, action.payload.batchSize);
        state.currentWordIndex = 0;
        state.batchIndex = 0;
        state.isStudying = true;
        state.incorrectWords = [];
        state.isReviewMode = action.payload.isReviewMode;
        state.answeredWords = [];
        state.isRetryMode = false;
        state.sessionSetId = action.payload.sessionSetId;
        state.sessionStudyMode = action.payload.sessionStudyMode;
        state.sessionResults = {
          correct: 0,
          incorrect: 0,
          total: action.payload.words.length,
        };
      })
      .addCase(startStudySession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to start study session';
      })
      
      // Load more words
      .addCase(loadMoreWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreWords.fulfilled, (state, action) => {
        state.loading = false;
        const { newWords } = action.payload;
        
        if (newWords.length > 0) {
          // Add new words to existing wordsToStudy
          state.wordsToStudy = [...state.wordsToStudy, ...newWords];
          
          // Create new batch from the new words
          state.currentBatch = newWords.slice(0, state.batchSize);
          state.batchIndex += 1;
          state.currentWordIndex = 0;
          state.answeredWords = []; // Reset answered words for new batch
          state.isRetryMode = false; // Exit retry mode for new batch
          
          // Update session results total
          state.sessionResults.total = state.wordsToStudy.length;
        }
      })
      .addCase(loadMoreWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load more words';
      })
      
      // Submit answer
      .addCase(submitAnswer.fulfilled, (state, action) => {
        const { isCorrect, wordId } = action.payload;
        
        // Check if this word has already been answered in current batch
        const wasAlreadyAnswered = state.answeredWords.includes(wordId);
        if (wasAlreadyAnswered && !isCorrect) {
          return;
        }
        
        // Mark word as answered (or re-answered in case of mark as true)
        if (!wasAlreadyAnswered) {
          state.answeredWords.push(wordId);
        }
        
        if (isCorrect) {
          // If this was previously incorrect, adjust the counts
          if (wasAlreadyAnswered) {
            // This is a mark as true - convert incorrect to correct
            state.sessionResults.incorrect -= 1;
            state.sessionResults.correct += 1;
          } else {
            // This is a new correct answer
            state.sessionResults.correct += 1;
          }
          
          // Remove from retry list if it was there (in case of mark as true)
          const retryIndex = state.incorrectWords.findIndex(w => w.id === wordId);
          if (retryIndex !== -1) {
            state.incorrectWords.splice(retryIndex, 1);
          }
        } else {
          state.sessionResults.incorrect += 1;
          
          // Add incorrect word to retry list
          const incorrectWord = state.currentBatch.find(w => w.id === wordId);
          if (incorrectWord && !state.incorrectWords.find(w => w.id === wordId)) {
            state.incorrectWords.push(incorrectWord);
          }
        }
        
        // Update the word in current batch
        const wordIndex = state.currentBatch.findIndex(w => w.id === action.payload.wordId);
        if (wordIndex !== -1 && action.payload.updatedWord) {
          state.currentBatch[wordIndex] = action.payload.updatedWord;
        }
      })
      
      // Complete study session
      .addCase(completeStudySession.fulfilled, (state, action) => {
        state.currentSession = action.payload;
        state.isStudying = false;
      })
      
      // Load words for study
      .addCase(loadWordsForStudy.fulfilled, (state, action) => {
        state.wordsToStudy = action.payload;
      });
  },
});

export const {
  setStudyMode,
  setBatchSize,
  nextWord,
  checkSessionCompletion,
  resetStudySession,
} = studySlice.actions;

export default studySlice.reducer;
