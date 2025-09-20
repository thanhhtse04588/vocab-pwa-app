import React from 'react';
import { Pane, Heading, Button } from 'evergreen-ui';
import { ArrowLeft } from 'phosphor-react';
import type { VocabularySet } from '@/types';

interface VocabularySetHeaderProps {
  set: VocabularySet;
  onBack?: () => void;
}

const VocabularySetHeader: React.FC<VocabularySetHeaderProps> = ({
  set,
  onBack,
}) => {
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={24}
    >
      <Pane display="flex" alignItems="center" gap={12}>
        {onBack && (
          <Button
            appearance="minimal"
            onClick={() => {
              onBack();
            }}
            padding={8}
            borderRadius={8}
            style={{
              zIndex: 10,
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        <Heading size={600}>{set.name}</Heading>
      </Pane>
    </Pane>
  );
};

export default VocabularySetHeader;
