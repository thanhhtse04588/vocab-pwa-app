import { Card, Pane, Text, Button } from 'evergreen-ui';
import { Microphone, XCircle } from 'phosphor-react';
import React from 'react';
import AppTextInput from './AppTextInput';

interface AnswerInputProps {
  userAnswer: string;
  isSubmitting: boolean;
  isListening: boolean;
  onAnswerChange: (answer: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onClearInput: () => void;
  onSubmitAnswer: () => void;
  wordMeaning: string;
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
  wordMeaning,
}) => {
  return (
    <Card marginBottom={24}>
      <Pane padding={24}>
        <Text size={500} fontWeight={600} marginBottom={16}>
          What is the word for "{wordMeaning}"?
        </Text>

        <Pane display="flex" gap={8} marginBottom={8} alignItems="center">
          <Pane position="relative" flex={1}>
            <AppTextInput
              placeholder="Enter your answer..."
              value={userAnswer}
              onChange={onAnswerChange}
              disabled={isSubmitting}
              width="100%"
              paddingRight={userAnswer ? 40 : 12}
              height={42}
              minWidth={42}
              showCharacterCount={false}
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
            intent={isListening ? 'danger' : 'none'}
            onClick={isListening ? onStopListening : onStartListening}
            disabled={isSubmitting}
            height={40}
            minWidth={40}
            paddingX={8}
          >
            <Microphone size={20} />
          </Button>
        </Pane>

        <Pane display="flex" justifyContent="flex-end" marginBottom={16}>
          <Text size={300} color="muted">
            {userAnswer.length}/126 characters
          </Text>
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
