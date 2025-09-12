import {
  PlayIcon,
  Card,
  IconButton,
  Pane,
  Text,
  TrashIcon,
} from 'evergreen-ui';
import React from 'react';
import TextOverflow from './TextOverflow';

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
        <Pane width="70%" display="flex" flexDirection="column" gap={8}>
          <TextOverflow size={500} maxWidth="100%" fontWeight="bold">
            {set.name}
          </TextOverflow>
          <TextOverflow size={300} maxWidth="100%" color="muted">
            {set.description}
          </TextOverflow>
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
