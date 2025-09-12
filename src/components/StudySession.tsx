import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { pwaService } from '@/services/pwaService';
import {
  completeStudySession,
  nextWord,
  submitAnswer,
  checkSessionCompletion,
  loadMoreWords,
} from '@/store/slices/studySlice';
import { Pane, Spinner, Text } from 'evergreen-ui';
import React, { useEffect, useState, useCallback } from 'react';
import { playAudio } from '@/utils/audioUtils';
import StudySessionHeader from '@/components/StudySessionHeader';
import WordCard from '@/components/WordCard';
import AnswerInput from '@/components/AnswerInput';
import ActionButtons from '@/components/ActionButtons';
import SessionStats from '@/components/SessionStats';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

// Helper function to play feedback sound
const playFeedbackSound = (isCorrect: boolean) => {
  try {
    const audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different frequencies for correct/incorrect
    oscillator.frequency.setValueAtTime(
      isCorrect ? 800 : 400,
      audioContext.currentTime
    );
    oscillator.type = 'sine';

    // Set volume and duration
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.2
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (error) {
    console.warn('Could not play feedback sound:', error);
  }
};

interface StudySessionProps {
  onComplete: () => void;
}

const StudySession: React.FC<StudySessionProps> = ({ onComplete }) => {
  const dispatch = useAppDispatch();
  const {
    currentSession,
    currentBatch,
    currentWordIndex,
    sessionResults,
    incorrectWords,
    isStudying,
    batchSize,
  } = useAppSelector((state) => state.study);
  const { settings } = useAppSelector((state) => state.settings);

  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMarkedAsTrue, setIsMarkedAsTrue] = useState(false);

  // Memoize the speech recognition callback to prevent infinite re-renders
  const handleSpeechResult = useCallback((transcript: string) => {
    setUserAnswer(transcript);
  }, []);

  const { isListening, startListening, stopListening } =
    useSpeechRecognition(handleSpeechResult);

  const currentWord = currentBatch[currentWordIndex];
  const progress =
    currentBatch.length > 0
      ? ((currentWordIndex + 1) / currentBatch.length) * 100
      : 0;

  // Auto-play audio when answer is shown
  useEffect(() => {
    if (showAnswer && settings?.autoPlayPronunciation && currentWord) {
      // Auto-play pronunciation of the correct answer using user's TTS settings
      playAudio(currentWord.word, {
        lang: settings.ttsLanguage || 'en-US',
        rate: settings.ttsRate || 0.8,
        volume: settings.ttsVolume || 1.0,
        pitch: settings.ttsPitch || 1.0,
      });
    }
  }, [
    showAnswer,
    settings?.autoPlayPronunciation,
    currentWord,
    settings?.ttsLanguage,
    settings?.ttsRate,
    settings?.ttsVolume,
    settings?.ttsPitch,
  ]);

  // Auto complete session when study is finished
  useEffect(() => {
    if (!isStudying && currentSession) {
      const completeSession = async () => {
        try {
          await dispatch(
            completeStudySession({
              sessionId: currentSession.id,
              results: {
                correct: sessionResults.correct,
                incorrect: sessionResults.incorrect,
              },
            })
          ).unwrap();
          onComplete();
        } catch (error) {
          console.error('Error completing session:', error);
        }
      };
      completeSession();
    }
  }, [isStudying, currentSession, dispatch, sessionResults, onComplete]);

  const handleSubmitAnswer = async () => {
    if (!currentWord || !userAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simple answer checking (in a real app, this would be more sophisticated)
      const correct =
        userAnswer.toLowerCase().trim() ===
        currentWord.word.toLowerCase().trim();
      setIsCorrect(correct);
      setShowAnswer(true);
      setIsMarkedAsTrue(false); // Reset mark as true state

      // Submit answer to store
      await dispatch(
        submitAnswer({
          wordId: currentWord.id,
          isCorrect: correct,
        })
      ).unwrap();

      // Provide feedback
      if (settings?.enableSound) {
        // Play a simple beep sound using Web Audio API
        playFeedbackSound(correct);
      }

      if (settings?.enableVibration) {
        pwaService.vibrate(correct ? [100] : [200, 100, 200]);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkAsTrue = async () => {
    if (!currentWord || isSubmitting) return;

    try {
      // Update the answer to be correct
      setIsCorrect(true);
      setIsMarkedAsTrue(true);

      // Submit corrected answer to store
      await dispatch(
        submitAnswer({
          wordId: currentWord.id,
          isCorrect: true,
        })
      ).unwrap();

      // Provide positive feedback
      if (settings?.enableSound) {
        playFeedbackSound(true);
      }

      if (settings?.enableVibration) {
        pwaService.vibrate([100]);
      }

      // Auto move to next word after a short delay
      setTimeout(() => {
        handleNextWord();
      }, 500);
    } catch (error) {
      console.error('Error marking as true:', error);
    }
  };

  const handleNextWord = async () => {
    if (currentWordIndex < currentBatch.length - 1) {
      dispatch(nextWord());
      setUserAnswer('');
      setShowAnswer(false);
      setIsCorrect(null);
      setIsMarkedAsTrue(false);
    } else {
      // End of current batch - check if we need to retry or move to next batch
      dispatch(nextWord());
      setUserAnswer('');
      setShowAnswer(false);
      setIsCorrect(null);
      setIsMarkedAsTrue(false);

      // Check if we need to load more words from database
      setTimeout(async () => {
        // Check if there are more words available in database
        try {
          const result = await dispatch(
            loadMoreWords({ batchSize: batchSize })
          ).unwrap();

          if (result.newWords.length > 0) {
            // Load more words and continue - the loadMoreWordsSuccess will be dispatched automatically
          } else {
            // No more words available, check session completion
            dispatch(checkSessionCompletion());
          }
        } catch (error) {
          console.error('Error loading more words:', error);
          // If error loading more words, check session completion
          dispatch(checkSessionCompletion());
        }
      }, 100);
    }
  };

  const handleClearInput = () => {
    setUserAnswer('');
    if (isListening) {
      stopListening();
    }
  };

  if (!currentWord) {
    return (
      <Pane
        padding={24}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Spinner size={40} />
        <Text marginTop={16}>Loading study session...</Text>
      </Pane>
    );
  }

  return (
    <Pane padding={24} className="page-content">
      <StudySessionHeader
        currentWordIndex={currentWordIndex}
        totalWords={currentBatch.length}
        incorrectWordsCount={incorrectWords.length}
        progress={progress}
      />

      <WordCard
        word={currentWord}
        showAnswer={showAnswer}
        isCorrect={isCorrect}
        isMarkedAsTrue={isMarkedAsTrue}
      />

      {!showAnswer && (
        <AnswerInput
          userAnswer={userAnswer}
          isSubmitting={isSubmitting}
          isListening={isListening}
          onAnswerChange={setUserAnswer}
          onStartListening={startListening}
          onStopListening={stopListening}
          onClearInput={handleClearInput}
          onSubmitAnswer={handleSubmitAnswer}
          wordMeaning={currentWord.meaning}
        />
      )}

      <ActionButtons
        showAnswer={showAnswer}
        isCorrect={isCorrect}
        isMarkedAsTrue={isMarkedAsTrue}
        currentWordIndex={currentWordIndex}
        totalWords={currentBatch.length}
        onMarkAsTrue={handleMarkAsTrue}
        onNextWord={handleNextWord}
      />

      <SessionStats
        correct={sessionResults.correct}
        incorrect={sessionResults.incorrect}
        total={sessionResults.total}
      />
    </Pane>
  );
};

export default StudySession;
