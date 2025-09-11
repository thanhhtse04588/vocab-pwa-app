import { Card, Pane, Button } from 'evergreen-ui';
import React from 'react';

interface ActionButtonsProps {
  showAnswer: boolean;
  isCorrect: boolean | null;
  isMarkedAsTrue: boolean;
  currentWordIndex: number;
  totalWords: number;
  onMarkAsTrue: () => void;
  onNextWord: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  showAnswer,
  isCorrect,
  isMarkedAsTrue,
  currentWordIndex,
  totalWords,
  onMarkAsTrue,
  onNextWord,
}) => {
  if (!showAnswer) {
    return null;
  }

  return (
    <Card marginBottom={24}>
      <Pane padding={24}>
        <Pane display="flex" gap={12}>
          {!isCorrect && !isMarkedAsTrue && (
            <Button
              appearance="default"
              intent="warning"
              onClick={onMarkAsTrue}
              flex={1}
            >
              Mark as True
            </Button>
          )}
          <Button
            disabled={isMarkedAsTrue}
            appearance="primary"
            intent="success"
            onClick={onNextWord}
            flex={isCorrect || isMarkedAsTrue ? 1 : 2}
          >
            {currentWordIndex < totalWords - 1
              ? 'Next Word'
              : 'Complete Session'}
          </Button>
        </Pane>
      </Pane>
    </Card>
  );
};

export default ActionButtons;
