import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { pwaService } from '@/services/pwaService';
import {
  completeStudySession,
  nextWord,
  submitAnswer,
  checkSessionCompletion,
  loadMoreWords,
} from '@/store/slices/studySlice';
import {
  Button,
  Card,
  Heading,
  Pane,
  Spinner,
  Strong,
  Text,
  TextInput,
} from 'evergreen-ui';
import { Microphone, XCircle } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import AudioButton from '@/components/AudioButton';
import { playAudio } from '@/utils/audioUtils';

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

interface SpeechRecognitionInterface {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onresult:
    | ((event: {
        results: {
          [index: number]: { [index: number]: { transcript: string } };
        };
      }) => void)
    | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
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
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] =
    useState<SpeechRecognitionInterface | null>(null);

  const currentWord = currentBatch[currentWordIndex];
  const progress =
    currentBatch.length > 0
      ? ((currentWordIndex + 1) / currentBatch.length) * 100
      : 0;

  // Auto-play audio when answer is shown
  useEffect(() => {
    if (showAnswer && currentWord && settings?.autoPlayPronunciation) {
      // Auto-play pronunciation of the correct answer
      playAudio(currentWord.word, {
        lang: 'en-US',
        rate: 0.8,
        volume: 1.0,
      });
    }
  }, [showAnswer, currentWord, settings?.autoPlayPronunciation]);

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

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (
          window as unknown as {
            SpeechRecognition?: unknown;
            webkitSpeechRecognition?: unknown;
          }
        ).SpeechRecognition ||
        (
          window as unknown as {
            SpeechRecognition?: unknown;
            webkitSpeechRecognition?: unknown;
          }
        ).webkitSpeechRecognition;
      const recognition =
        new (SpeechRecognition as new () => SpeechRecognitionInterface)() as SpeechRecognitionInterface;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: {
        results: {
          [index: number]: { [index: number]: { transcript: string } };
        };
      }) => {
        const transcript = event.results[0][0].transcript;
        setUserAnswer(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: { error: string }) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setSpeechRecognition(recognition);
    }
  }, []);

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
      }, 1000);
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

  const handleStartListening = () => {
    if (speechRecognition && !isListening) {
      speechRecognition.start();
    }
  };

  const handleStopListening = () => {
    if (speechRecognition && isListening) {
      speechRecognition.stop();
    }
  };

  const handleClearInput = () => {
    setUserAnswer('');
    if (isListening) {
      handleStopListening();
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
      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={24}
      >
        <Heading size={600}>Study Session</Heading>
        <Text color="muted">
          {currentWordIndex + 1} / {currentBatch.length}
          {incorrectWords.length > 0 && (
            <Text color="danger" marginLeft={8}>
              (Retry: {incorrectWords.length})
            </Text>
          )}
        </Text>
      </Pane>

      {/* Progress Bar */}
      <Pane
        height={8}
        backgroundColor="#e4e7eb"
        borderRadius={4}
        marginBottom={24}
        overflow="hidden"
      >
        <Pane
          height="100%"
          width={`${progress}%`}
          backgroundColor="#1070ca"
          borderRadius={4}
          transition="width 0.3s ease"
        />
      </Pane>

      {/* Meaning Card */}
      <Card marginBottom={24}>
        <Pane padding={24} textAlign="center">
          <Heading size={800} marginBottom={16}>
            {currentWord.meaning}
          </Heading>

          {currentWord.pronunciation && (
            <Text color="muted" marginBottom={16}>
              {currentWord.pronunciation}
            </Text>
          )}

          {showAnswer && (
            <Pane className="fade-in">
              <Heading
                size={500}
                color={isCorrect ? 'success' : 'danger'}
                marginBottom={16}
              >
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                {isMarkedAsTrue && (
                  <Text size={400} color="success" marginLeft={8}>
                    (Marked as True)
                  </Text>
                )}
              </Heading>

              <Pane
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={8}
                marginBottom={16}
              >
                <Text size={500}>
                  <Strong>Answer:</Strong> {currentWord.word}
                </Text>
                <AudioButton text={currentWord.word} lang="en-US" rate={0.8} />
              </Pane>

              {currentWord.example && (
                <Text fontStyle="italic" color="muted" marginBottom={16}>
                  "{currentWord.example}"
                </Text>
              )}
            </Pane>
          )}
        </Pane>
      </Card>

      {/* Answer Input */}
      {!showAnswer && (
        <Card marginBottom={24}>
          <Pane padding={24}>
            <Text size={500} fontWeight={600} marginBottom={16}>
              What is the word for "{currentWord.meaning}"?
            </Text>

            <Pane display="flex" gap={8} marginBottom={16} alignItems="center">
              <Pane position="relative" flex={1}>
                <TextInput
                  placeholder="Enter your answer..."
                  value={userAnswer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserAnswer(e.target.value)
                  }
                  disabled={isSubmitting}
                  width="100%"
                  paddingRight={userAnswer ? 40 : 12}
                  height={42}
                  minWidth={42}
                />
                {userAnswer && (
                  <Button
                    size="small"
                    appearance="minimal"
                    onClick={handleClearInput}
                    disabled={isSubmitting}
                    position="absolute"
                    right={4}
                    top="50%"
                    transform="translateY(-50%)"
                  >
                    <XCircle size={16} color="var(--text-muted)" />
                  </Button>
                )}
              </Pane>
              <Button
                appearance={isListening ? 'primary' : 'default'}
                intent={isListening ? 'danger' : 'none'}
                onClick={
                  isListening ? handleStopListening : handleStartListening
                }
                disabled={isSubmitting}
                height={40}
                minWidth={40}
                paddingX={8}
              >
                <Microphone size={20} />
              </Button>
            </Pane>

            {isListening && (
              <Pane
                padding={12}
                backgroundColor="#e3f2fd"
                borderRadius={8}
                textAlign="center"
                border="2px solid #2196f3"
                marginBottom={16}
              >
                <Text size={400} color="#1976d2">
                  🎤 Listening... Speak now
                </Text>
              </Pane>
            )}

            <Button
              appearance="primary"
              intent="none"
              onClick={handleSubmitAnswer}
              disabled={!userAnswer.trim() || isSubmitting}
              width="100%"
            >
              {isSubmitting ? 'Checking...' : 'Submit Answer'}
            </Button>
          </Pane>
        </Card>
      )}

      {/* Action Buttons */}
      {showAnswer && (
        <Card marginBottom={24}>
          <Pane padding={24}>
            <Pane display="flex" gap={12}>
              {!isCorrect && !isMarkedAsTrue && (
                <Button
                  appearance="default"
                  intent="warning"
                  onClick={handleMarkAsTrue}
                  flex={1}
                >
                  Mark as True
                </Button>
              )}
              <Button
                disabled={isMarkedAsTrue}
                appearance="primary"
                intent="success"
                onClick={handleNextWord}
                flex={isCorrect || isMarkedAsTrue ? 1 : 2}
              >
                {currentWordIndex < currentBatch.length - 1
                  ? 'Next Word'
                  : 'Complete Session'}
              </Button>
            </Pane>
          </Pane>
        </Card>
      )}

      {/* Session Stats */}
      <Card>
        <Pane padding={24}>
          <Pane display="flex" gap={16}>
            <Pane flex={1} textAlign="center">
              <Heading size={600} color="success" margin={0}>
                {sessionResults.correct}
              </Heading>
              <Text margin={0} size={300}>
                Correct
              </Text>
            </Pane>
            <Pane flex={1} textAlign="center">
              <Heading size={600} color="danger" margin={0}>
                {sessionResults.incorrect}
              </Heading>
              <Text margin={0} size={300}>
                Incorrect
              </Text>
            </Pane>
            <Pane flex={1} textAlign="center">
              <Heading size={600} color="info" margin={0}>
                {sessionResults.total}
              </Heading>
              <Text margin={0} size={300}>
                Total
              </Text>
            </Pane>
          </Pane>
        </Pane>
      </Card>
    </Pane>
  );
};

export default StudySession;
