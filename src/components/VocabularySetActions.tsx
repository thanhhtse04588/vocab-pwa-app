import React from 'react';
import { Pane, Button } from 'evergreen-ui';
import { Plus, FileCsv, ArrowClockwise } from 'phosphor-react';

interface VocabularySetActionsProps {
  onImportCSV: () => void;
  onAddWord: () => void;
  onResetProgress: () => void;
}

const VocabularySetActions: React.FC<VocabularySetActionsProps> = ({
  onImportCSV,
  onAddWord,
  onResetProgress,
}) => {
  return (
    <Pane
      display="grid"
      gridTemplateColumns="1fr 1fr 1fr"
      gap={8}
      marginBottom={24}
    >
      <Button
        gridColumn="span 1"
        iconBefore={<FileCsv size={16} />}
        onClick={onImportCSV}
      >
        Import CSV
      </Button>

      <Button
        gridColumn="span 1"
        iconBefore={<Plus size={16} />}
        onClick={onAddWord}
      >
        Add Word
      </Button>

      <Button
        gridColumn="span 1"
        iconBefore={<ArrowClockwise size={16} />}
        intent="danger"
        onClick={onResetProgress}
      >
        Reset Progress
      </Button>
    </Pane>
  );
};

export default VocabularySetActions;
