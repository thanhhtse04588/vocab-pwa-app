import type { VocabularySet, VocabularyWord } from '@/types';
import { Button, Card, Pane, Text } from 'evergreen-ui';
import { Play } from 'phosphor-react';
import React from 'react';

interface SetInfoCardProps {
  set: VocabularySet;
  words: VocabularyWord[];
  onStartStudy: () => void;
  isStartingStudy?: boolean;
}

const SetInfoCard: React.FC<SetInfoCardProps> = ({
  set,
  words,
  onStartStudy,
  isStartingStudy = false,
}) => {
  const wordsToReview = words.filter(
    (w) => new Date(w.nextReviewAt) <= new Date()
  ).length;

  const newWords = words.filter((w) => w.memoryLevel === 0).length;

  return (
    <Card>
      <Pane padding={24}>
        {set.description && (
          <Text color="muted" marginBottom={16}>
            {set.description}
          </Text>
        )}
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={16}
        >
          <Pane>
            <Text fontWeight={600}>Total: {words.length} words</Text>
          </Pane>
          <Pane>
            <Text fontWeight={600}>New: {newWords}</Text>
          </Pane>
          <Pane>
            <Text fontWeight={600}>To Review: {wordsToReview}</Text>
          </Pane>
        </Pane>
        <Pane display="flex" gap={16}>
          <Pane flex={1}>
            <Button
              appearance="primary"
              intent="success"
              iconBefore={<Play size={16} />}
              onClick={onStartStudy}
              width="100%"
              disabled={isStartingStudy || newWords === 0}
            >
              {isStartingStudy
                ? 'Starting...'
                : `Start Study (${newWords} new)`}
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </Card>
  );
};

export default SetInfoCard;
