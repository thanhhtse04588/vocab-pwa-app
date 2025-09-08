import React from 'react';
import { Pane, Button } from 'evergreen-ui';
import { Plus, FileCsv } from 'phosphor-react';

interface VocabularySetActionsProps {
  onImportCSV: () => void;
  onAddWord: () => void;
}

const VocabularySetActions: React.FC<VocabularySetActionsProps> = ({
  onImportCSV,
  onAddWord,
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
    </Pane>
  );
};

export default VocabularySetActions;
