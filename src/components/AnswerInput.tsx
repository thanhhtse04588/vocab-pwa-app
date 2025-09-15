import { Button, Card, Pane } from 'evergreen-ui';
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
}) => {
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
            appearance={isListening ? 'danger' : 'default'}
            onClick={isListening ? onStopListening : onStartListening}
            disabled={isSubmitting}
            height={40}
            minWidth={40}
            paddingX={8}
          >
            <Microphone size={20} />
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
