import {
  PlayIcon,
  Card,
  Heading,
  IconButton,
  Pane,
  Text,
  TrashIcon,
} from 'evergreen-ui';
import React from 'react';

interface VocabularySet {
  id: string;
  name: string;
  description: string;
  wordCount: number;
}

interface VocabularySetCardProps {
  set: VocabularySet;
  onView: (setId: string) => void;
  onDelete: (setId: string) => void;
  onStartStudy: (setId: string) => void;
}

const VocabularySetCard: React.FC<VocabularySetCardProps> = ({
  set,
  onView,
  onDelete,
  onStartStudy,
}) => {
  return (
    <Card
      marginBottom={16}
      cursor="pointer"
      onClick={() => onView(set.id)}
      hoverElevation={1}
      transition="all 0.2s ease"
    >
      <Pane
        padding={24}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Pane flex={1}>
          <Heading size={500} marginBottom={8}>
            {set.name}
          </Heading>
          <Text color="muted" marginBottom={4}>
            {set.description}
          </Text>
          <Text size={300} color="muted">
            {set.wordCount} words
          </Text>
        </Pane>
        <Pane display="flex" alignItems="center" gap={16}>
          <IconButton
            icon={PlayIcon}
            intent="primary"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onStartStudy(set.id);
            }}
          />
          <IconButton
            icon={TrashIcon}
            intent="danger"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onDelete(set.id);
            }}
          />
        </Pane>
      </Pane>
    </Card>
  );
};

export default VocabularySetCard;
