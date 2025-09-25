import { Button, Card, Pane, Spinner } from 'evergreen-ui';
import { Microphone, XCircle } from 'phosphor-react';
import React, { useState, useCallback } from 'react';
import AppTextInput from './AppTextInput';
import { speechToTextService } from '../services/speechToTextService';

// Simple logger utility
const logger = {
  info: (message: string, data?: unknown) =>
    console.log(`[INFO] ${message}`, data || ''),
  warn: (message: string, data?: unknown) =>
    console.warn(`[WARN] ${message}`, data || ''),
  error: (message: string, data?: unknown) =>
    console.error(`[ERROR] ${message}`, data || ''),
};

interface AnswerInputProps {
  userAnswer: string;
  isSubmitting: boolean;
  isListening: boolean;
  onAnswerChange: (answer: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onClearInput: () => void;
  onSubmitAnswer: () => void;
  languageCode?: string; // Language code for speech recognition
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  userAnswer,
  isSubmitting,
  isListening,
  onAnswerChange,
  onStartListening,
  onStopListening,
  onClearInput,
  onSubmitAnswer,
  languageCode = 'en-US',
}) => {
  // State for speech recognition processing
  const [isProcessingSpeech, setIsProcessingSpeech] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Check if speech recognition is supported
  React.useEffect(() => {
    setSpeechSupported(speechToTextService.isSupported());
  }, []);

  // Handle speech recognition start
  const handleStartListening = useCallback(async () => {
    if (!speechSupported) {
      logger.warn('Speech recognition not supported');
      return;
    }

    try {
      onStartListening();
      await speechToTextService.startRecording(
        undefined, // onDataAvailable callback
        (error) => {
          logger.error('Speech recording error:', error);
          onStopListening();
        }
      );
      logger.info('Started Firebase speech recording');
    } catch (error) {
      logger.error('Failed to start speech recording:', error);
      onStopListening();
    }
  }, [speechSupported, onStartListening, onStopListening]);

  // Handle speech recognition stop and conversion
  const handleStopListening = useCallback(async () => {
    try {
      onStopListening();
      speechToTextService.stopRecording();

      setIsProcessingSpeech(true);
      logger.info('Processing speech with Firebase API...');

      // Convert speech to text using Firebase API
      const result = await speechToTextService.convertToText(languageCode);

      if (result.success && result.transcription) {
        onAnswerChange(result.transcription);
        logger.info('Speech converted to text successfully via Firebase API', {
          transcription: result.transcription,
          confidence: result.confidence,
        });
      } else {
        logger.warn('No transcription received from Firebase speech service');
      }
    } catch (error) {
      logger.error('Failed to convert speech to text via Firebase API:', error);
    } finally {
      setIsProcessingSpeech(false);
      speechToTextService.clearAudioData();
    }
  }, [languageCode, onAnswerChange, onStopListening]);

  // Handle Enter key press to submit answer
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isSubmitting && userAnswer.trim()) {
      onSubmitAnswer();
    }
  };
  return (
    <Card marginBottom={24}>
      <Pane padding={24}>
        <Pane display="flex" gap={8} marginBottom={16} alignItems="center">
          <Pane position="relative" flex={1}>
            <AppTextInput
              autoFocus
              placeholder="Enter your answer..."
              value={userAnswer}
              onChange={onAnswerChange}
              onKeyDown={handleKeyDown}
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
                onClick={onClearInput}
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
            intent={isListening ? 'danger' : 'default'}
            onClick={isListening ? handleStopListening : handleStartListening}
            disabled={isSubmitting || !speechSupported || isProcessingSpeech}
            height={40}
            minWidth={40}
            paddingX={8}
            title={
              !speechSupported
                ? 'Speech recognition not supported'
                : isProcessingSpeech
                ? 'Processing speech...'
                : isListening
                ? 'Stop recording'
                : 'Start recording'
            }
          >
            {isProcessingSpeech ? (
              <Spinner size={20} />
            ) : (
              <Microphone size={20} />
            )}
          </Button>
        </Pane>

        <Button
          appearance="primary"
          intent="none"
          onClick={onSubmitAnswer}
          disabled={!userAnswer.trim() || isSubmitting}
          width="100%"
        >
          {isSubmitting ? 'Checking...' : 'Submit Answer'}
        </Button>
      </Pane>
    </Card>
  );
};

export default AnswerInput;
