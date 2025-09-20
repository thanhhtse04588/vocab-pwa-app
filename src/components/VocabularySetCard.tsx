import { Card, IconButton, Pane, Text } from 'evergreen-ui';
import { X } from 'phosphor-react';
import React from 'react';

interface VocabularySet {
  id: string;
  name: string;
  wordCount: number;
}

interface VocabularySetCardProps {
  set: VocabularySet;
  onView: (setId: string) => void;
  onDelete: (setId: string) => void;
  isEditMode: boolean;
}

const VocabularySetCard: React.FC<VocabularySetCardProps> = ({
  set,
  onView,
  onDelete,
  isEditMode,
}) => {
  return (
    <Card
      cursor="pointer"
      onClick={() => onView(set.id)}
      hoverElevation={1}
      transition="all 0.2s ease"
      elevation={1}
      position="relative"
      minWidth={0}
      overflow="hidden"
      height={120}
    >
      {/* X button in top-right corner - only show in edit mode */}
      {isEditMode && (
        <IconButton
          icon={<X size={16} />}
          intent="danger"
          appearance="minimal"
          size="small"
          position="absolute"
          top={8}
          right={8}
          zIndex={1}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onDelete(set.id);
          }}
        />
      )}

      <Pane
        padding={12}
        minWidth={0}
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Pane display="flex" flexDirection="column" gap={8} minWidth={0}>
          <Text size={500} fontWeight="bold">
            {set.name}
          </Text>
          <Text size={300} color="muted">
            {set.wordCount} words
          </Text>
        </Pane>
      </Pane>
    </Card>
  );
};

export default VocabularySetCard;
