import React from 'react';
import { Pane, Heading, Button } from 'evergreen-ui';
import { ArrowClockwise } from 'phosphor-react';
import type { VocabularySet } from '@/types';

interface VocabularySetHeaderProps {
  set: VocabularySet;
  onResetProgress: () => void;
}

const VocabularySetHeader: React.FC<VocabularySetHeaderProps> = ({
  set,
  onResetProgress,
}) => {
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={24}
    >
      <Heading size={600}>{set.name}</Heading>
      <Pane display="flex" gap={8}>
        <Button
          iconBefore={<ArrowClockwise size={16} />}
          intent="danger"
          onClick={onResetProgress}
        >
          Reset Progress
        </Button>
      </Pane>
    </Pane>
  );
};

export default VocabularySetHeader;
