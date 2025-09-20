import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { VocabularySet, VocabularyWord, CSVWordData } from '@/types';
import { db } from '@/services/database';
import {
  fetchPublicVocabularySets,
  fetchPublicVocabularySetWithWords,
  type PublicVocabularySetMeta,
} from '@/services/firebaseService';

interface VocabularyState {
  sets: VocabularySet[];
  currentSet: VocabularySet | null;
  words: VocabularyWord[];
  loading: boolean;
  error: string | null;
  totalWordsToReview: number;
  publicSets: PublicVocabularySetMeta[];
  publicLoading: boolean;
}

const initialState: VocabularyState = {
  sets: [],
  currentSet: null,
  words: [],
  loading: false,
  error: null,
  totalWordsToReview: 0,
  publicSets: [],
  publicLoading: false,
};

// Async thunks
export const loadVocabularySets = createAsyncThunk(
  'vocabulary/loadSets',
  async () => {
    const setsWithStats = await db.getVocabularySetsWithStats();
    return setsWithStats;
  }
);

export const fetchPublicSets = createAsyncThunk(
  'vocabulary/fetchPublicSets',
  async () => {
    const sets = await fetchPublicVocabularySets();
    return sets;
  }
);

export const downloadPublicSet = createAsyncThunk(
  'vocabulary/downloadPublicSet',
  async (publicSetId: string) => {
    const { set, words } = await fetchPublicVocabularySetWithWords(publicSetId);

    // Create local set
    const newSetId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    const localSet: VocabularySet = {
      id: newSetId,
      name: set.name,
      wordLanguage: set.wordLanguage,
      meaningLanguage: set.meaningLanguage,
      createdAt: new Date().toISOString(),
      lastStudiedAt: undefined,
      wordCount: words.length,
      isActive: true,
    };

    await db.vocabularySets.add(localSet);

    // Insert words
    const now = new Date();
    const nextReview = new Date(now.getTime() + 10 * 60 * 1000).toISOString();
    const localWords: VocabularyWord[] = words.map((w) => ({
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2),
      vocabularySetId: newSetId,
      word: w.word,
      meaning: w.meaning,
      pronunciation: w.pronunciation,
      example: w.example,
      memoryLevel: 0,
      nextReviewAt: nextReview,
      correctCount: 0,
      incorrectCount: 0,
      createdAt: new Date().toISOString(),
      lastReviewedAt: undefined,
    }));

    if (localWords.length > 0) {
      await db.vocabularyWords.bulkAdd(localWords);
    }

    return { set: localSet, words: localWords };
  }
);

export const loadVocabularyWords = createAsyncThunk(
  'vocabulary/loadWords',
  async (setId: string) => {
    const words = await db.vocabularyWords
      .where('vocabularySetId')
      .equals(setId)
      .toArray();
    return words;
  }
);

// Helper function to generate UUID with fallback for older browsers
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers (including Safari < 15.4)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const createVocabularySet = createAsyncThunk(
  'vocabulary/createSet',
  async (
    setData: Omit<VocabularySet, 'id' | 'createdAt' | 'wordCount' | 'isActive'>
  ) => {
    try {
      const id = generateUUID();
      const newSet: VocabularySet = {
        ...setData,
        id,
        createdAt: new Date().toISOString(),
        wordCount: 0,
        isActive: true,
      };

      await db.vocabularySets.add(newSet);
      return newSet;
    } catch (error) {
      console.error('Error creating vocabulary set:', error);
      throw new Error(
        `Failed to create vocabulary set: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
);

export const updateVocabularySet = createAsyncThunk(
  'vocabulary/updateSet',
  async ({ id, updates }: { id: string; updates: Partial<VocabularySet> }) => {
    await db.vocabularySets.update(id, updates);
    const updatedSet = await db.vocabularySets.get(id);
    return updatedSet!;
  }
);

export const deleteVocabularySet = createAsyncThunk(
  'vocabulary/deleteSet',
  async (id: string) => {
    // Delete associated words first
    await db.vocabularyWords.where('vocabularySetId').equals(id).delete();
    // Delete user progress
    await db.userProgress.where('vocabularySetId').equals(id).delete();
    // Delete study sessions
    await db.studySessions.where('vocabularySetId').equals(id).delete();
    // Delete the set
    await db.vocabularySets.delete(id);
    return id;
  }
);

export const addVocabularyWord = createAsyncThunk(
  'vocabulary/addWord',
  async (
    wordData: Omit<
      VocabularyWord,
      | 'id'
      | 'createdAt'
      | 'memoryLevel'
      | 'correctCount'
      | 'incorrectCount'
      | 'nextReviewAt'
    >
  ) => {
    try {
      const id = generateUUID();
      const nextReview = new Date();
      nextReview.setMinutes(nextReview.getMinutes() + 10);

      const newWord: VocabularyWord = {
        ...wordData,
        id,
        createdAt: new Date().toISOString(),
        memoryLevel: 0,
        correctCount: 0,
        incorrectCount: 0,
        nextReviewAt: nextReview.toISOString(),
      };

      await db.vocabularyWords.add(newWord);

      // Update word count in the set
      const set = await db.vocabularySets.get(wordData.vocabularySetId);
      if (set) {
        await db.vocabularySets.update(wordData.vocabularySetId, {
          wordCount: set.wordCount + 1,
        });
      }

      return newWord;
    } catch (error) {
      console.error('Error adding vocabulary word:', error);
      throw new Error(
        `Failed to add vocabulary word: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
);

export const updateVocabularyWord = createAsyncThunk(
  'vocabulary/updateWord',
  async ({ id, updates }: { id: string; updates: Partial<VocabularyWord> }) => {
    await db.vocabularyWords.update(id, updates);
    const updatedWord = await db.vocabularyWords.get(id);
    return updatedWord!;
  }
);

export const deleteVocabularyWord = createAsyncThunk(
  'vocabulary/deleteWord',
  async (id: string) => {
    const word = await db.vocabularyWords.get(id);
    if (word) {
      await db.vocabularyWords.delete(id);

      // Update word count in the set
      const set = await db.vocabularySets.get(word.vocabularySetId);
      if (set) {
        await db.vocabularySets.update(word.vocabularySetId, {
          wordCount: Math.max(0, set.wordCount - 1),
        });
      }
    }
    return id;
  }
);

export const importCSVWords = createAsyncThunk(
  'vocabulary/importCSV',
  async ({ setId, words }: { setId: string; words: CSVWordData[] }) => {
    const results = [];
    const errors: string[] = [];

    for (const wordData of words) {
      try {
        const id = generateUUID();
        const nextReview = new Date();
        nextReview.setMinutes(nextReview.getMinutes() + 10);

        const newWord: VocabularyWord = {
          id,
          vocabularySetId: setId,
          word: wordData.word.trim(),
          meaning: wordData.meaning.trim(),
          pronunciation: wordData.pronunciation?.trim(),
          example: wordData.example?.trim(),
          wordType: wordData.wordType,
          createdAt: new Date().toISOString(),
          memoryLevel: 0,
          correctCount: 0,
          incorrectCount: 0,
          nextReviewAt: nextReview.toISOString(),
        };

        await db.vocabularyWords.add(newWord);
        results.push(newWord);
      } catch (error) {
        errors.push(`Failed to import "${wordData.word}": ${error}`);
      }
    }

    // Update word count in the set
    const set = await db.vocabularySets.get(setId);
    if (set) {
      await db.vocabularySets.update(setId, {
        wordCount: set.wordCount + results.length,
      });
    }

    return { importedWords: results, errors };
  }
);

export const loadTotalWordsToReview = createAsyncThunk(
  'vocabulary/loadTotalWordsToReview',
  async () => {
    const count = await db.getTotalWordsToReview();
    return count;
  }
);

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    setCurrentSet: (state, action: PayloadAction<VocabularySet | null>) => {
      state.currentSet = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load sets
      .addCase(loadVocabularySets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadVocabularySets.fulfilled, (state, action) => {
        state.loading = false;
        state.sets = action.payload;
      })
      .addCase(loadVocabularySets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load vocabulary sets';
      })
      // Fetch public sets
      .addCase(fetchPublicSets.pending, (state) => {
        state.publicLoading = true;
        state.error = null;
      })
      .addCase(fetchPublicSets.fulfilled, (state, action) => {
        state.publicLoading = false;
        state.publicSets = action.payload;
      })
      .addCase(fetchPublicSets.rejected, (state, action) => {
        state.publicLoading = false;
        state.error = action.error.message || 'Failed to fetch public sets';
      })

      // Load words
      .addCase(loadVocabularyWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadVocabularyWords.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload;
      })
      .addCase(loadVocabularyWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load vocabulary words';
      })

      // Create set
      .addCase(createVocabularySet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVocabularySet.fulfilled, (state, action) => {
        state.loading = false;
        state.sets.push(action.payload);
      })
      .addCase(createVocabularySet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create vocabulary set';
      })

      // Update set
      .addCase(updateVocabularySet.fulfilled, (state, action) => {
        const index = state.sets.findIndex(
          (set) => set.id === action.payload.id
        );
        if (index !== -1) {
          state.sets[index] = action.payload;
        }
        if (state.currentSet?.id === action.payload.id) {
          state.currentSet = action.payload;
        }
      })

      // Delete set
      .addCase(deleteVocabularySet.fulfilled, (state, action) => {
        state.sets = state.sets.filter((set) => set.id !== action.payload);
        if (state.currentSet?.id === action.payload) {
          state.currentSet = null;
          state.words = [];
        }
      })

      // Add word
      .addCase(addVocabularyWord.fulfilled, (state, action) => {
        state.words.push(action.payload);
        const setIndex = state.sets.findIndex(
          (set) => set.id === action.payload.vocabularySetId
        );
        if (setIndex !== -1) {
          state.sets[setIndex].wordCount += 1;
        }
      })

      // Update word
      .addCase(updateVocabularyWord.fulfilled, (state, action) => {
        const index = state.words.findIndex(
          (word) => word.id === action.payload.id
        );
        if (index !== -1) {
          state.words[index] = action.payload;
        }
      })

      // Delete word
      .addCase(deleteVocabularyWord.fulfilled, (state, action) => {
        state.words = state.words.filter((word) => word.id !== action.payload);
        const setIndex = state.sets.findIndex(
          (set) => set.id === state.currentSet?.id
        );
        if (setIndex !== -1) {
          state.sets[setIndex].wordCount = Math.max(
            0,
            state.sets[setIndex].wordCount - 1
          );
        }
      })

      // Import CSV
      .addCase(importCSVWords.fulfilled, (state, action) => {
        state.words.push(...action.payload.importedWords);
        const setIndex = state.sets.findIndex(
          (set) => set.id === state.currentSet?.id
        );
        if (setIndex !== -1) {
          state.sets[setIndex].wordCount += action.payload.importedWords.length;
        }
        if (action.payload.errors.length > 0) {
          state.error = `Import completed with ${action.payload.errors.length} errors`;
        }
      })
      // Download public set
      .addCase(downloadPublicSet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadPublicSet.fulfilled, (state, action) => {
        state.loading = false;
        state.sets.push(action.payload.set);
        if (state.currentSet?.id === action.payload.set.id) {
          state.words.push(...action.payload.words);
        }
      })
      .addCase(downloadPublicSet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to download public set';
      })

      // Load total words to review
      .addCase(loadTotalWordsToReview.fulfilled, (state, action) => {
        state.totalWordsToReview = action.payload;
      });
  },
});

export const { setCurrentSet, clearError } = vocabularySlice.actions;
export default vocabularySlice.reducer;
