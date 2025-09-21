import type { VocabularyWord } from '@/types';
import { Button, Card, Pane } from 'evergreen-ui';
import { Play } from 'phosphor-react';
import React from 'react';

interface SetInfoCardProps {
  words: VocabularyWord[];
  onStartStudy: () => void;
  isStartingStudy?: boolean;
}

const SetInfoCard: React.FC<SetInfoCardProps> = ({
  words,
  onStartStudy,
  isStartingStudy = false,
}) => {
  const newWords = words.filter((w) => w.memoryLevel === 0).length;

  return (
    <Card>
      <Pane paddingX={24} marginBottom={16}>
        <Pane>
          <Button
            appearance="primary"
            intent="success"
            iconBefore={<Play size={16} />}
            onClick={onStartStudy}
            width="100%"
            disabled={isStartingStudy || newWords === 0}
          >
            {isStartingStudy ? 'Starting...' : `Start Study (${newWords} new)`}
          </Button>
        </Pane>
      </Pane>
    </Card>
  );
};

export default SetInfoCard;
