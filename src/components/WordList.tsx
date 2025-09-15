import React, { useState, useEffect, useMemo } from 'react';
import {
  Pane,
  Heading,
  Card,
  Button,
  Text,
  Spinner,
  Badge,
  Tooltip,
  Dialog,
  Alert,
} from 'evergreen-ui';
import { Trash, PencilSimple } from 'phosphor-react';
import { useAppDispatch } from '@/hooks/redux';
import { deleteVocabularyWord } from '@/store/slices/vocabularySlice';
import type { VocabularyWord } from '@/types';
import AudioButton from '@/components/AudioButton';

interface WordListProps {
  words: VocabularyWord[];
  loading: boolean;
  onEditWord: (word: VocabularyWord) => void;
  language: string;
}

const WordList: React.FC<WordListProps> = ({
  words,
  loading,
  onEditWord,
  language,
}) => {
  const dispatch = useAppDispatch();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [wordToDelete, setWordToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 20;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(words.length / PAGE_SIZE)),
    [words.length]
  );
  const clampedPage = Math.min(currentPage, totalPages);
  const startIndex = (clampedPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pagedWords = useMemo(
    () => words.slice(startIndex, endIndex),
    [words, startIndex, endIndex]
  );

  useEffect(() => {
    // Clamp current page when words change (e.g., after delete or new import)
    setCurrentPage((prev) => {
      const next = Math.max(
        1,
        Math.min(prev, Math.max(1, Math.ceil(words.length / PAGE_SIZE)))
      );
      return next;
    });
  }, [words.length]);

  const getMemoryLevelLabel = (level: number) => {
    const labels = [
      'New',
      'Learning',
      'Familiar',
      'Known',
      'Mastered',
      'Expert',
      'Native',
      'Perfect',
    ];
    return labels[level] || `Level ${level}`;
  };

  const getMemoryLevelColor = (
    level: number
  ):
    | 'neutral'
    | 'blue'
    | 'green'
    | 'orange'
    | 'red'
    | 'purple'
    | 'teal'
    | 'yellow' => {
    const colors: (
      | 'neutral'
      | 'blue'
      | 'green'
      | 'orange'
      | 'red'
      | 'purple'
      | 'teal'
      | 'yellow'
    )[] = [
      'neutral',
      'blue',
      'green',
      'orange',
      'red',
      'purple',
      'teal',
      'yellow',
    ];
    return colors[level] || 'neutral';
  };

  const handleDeleteWord = (wordId: string) => {
    setWordToDelete(wordId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (wordToDelete) {
      dispatch(deleteVocabularyWord(wordToDelete));
      setDeleteDialogOpen(false);
      setWordToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setWordToDelete(null);
  };

  if (loading) {
    return (
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={40}
      >
        <Spinner size={24} />
        <Text marginTop={16}>Loading words...</Text>
      </Pane>
    );
  }

  if (words.length === 0) {
    return (
      <Card elevation={1}>
        <Pane padding={32} textAlign="center">
          <Heading size={500} marginBottom={16} color="muted">
            No Words Yet
          </Heading>
          <Text size={400} color="muted" marginBottom={24}>
            Add your first word to start learning!
          </Text>
          <Alert intent="info" title="Getting Started" marginTop={16}>
            Use the "Add Word" button above to create your first vocabulary
            entry.
          </Alert>
        </Pane>
      </Card>
    );
  }

  return (
    <>
      <Pane display="flex" alignItems="center" marginBottom={16}>
        <Heading size={500} marginRight={12}>
          Words
        </Heading>
        <Badge color="blue" size={300}>
          {words.length}
        </Badge>
      </Pane>

      {pagedWords.map((word) => (
        <Card key={word.id} marginBottom={16} hoverElevation={1}>
          <Pane padding={24}>
            <Pane display="flex" flexDirection="column" gap={16}>
              {/* Header with word and badge */}
              <Pane display="flex" alignItems="center" flexWrap="wrap" gap={12}>
                <Heading size={500} flex={1} minWidth={0}>
                  {word.word}
                </Heading>
                <AudioButton text={word.word} lang={language} rate={0.8} />
                <Badge color={getMemoryLevelColor(word.memoryLevel)} size={300}>
                  {getMemoryLevelLabel(word.memoryLevel)}
                </Badge>
              </Pane>

              {/* Meaning */}
              <Text size={400} color="muted">
                {word.meaning}
              </Text>

              {/* Word Type */}
              {word.wordType && (
                <Text
                  size={300}
                  color="muted"
                  fontSize="11px"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                >
                  {word.wordType}
                </Text>
              )}

              {/* Memory level and actions */}
              <Pane
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={12}
              >
                <Text size={300} color="muted">
                  Memory Level: {word.memoryLevel}
                </Text>

                <Pane display="flex" gap={8}>
                  <Tooltip content="Edit this word">
                    <Button
                      appearance="minimal"
                      intent="none"
                      iconBefore={<PencilSimple size={16} />}
                      onClick={() => onEditWord(word)}
                      size="small"
                    >
                      Edit
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete this word">
                    <Button
                      appearance="minimal"
                      intent="danger"
                      iconBefore={<Trash size={16} />}
                      onClick={() => handleDeleteWord(word.id)}
                      size="small"
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </Pane>
              </Pane>
            </Pane>
          </Pane>
        </Card>
      ))}

      {/* Pagination controls */}
      {words.length > PAGE_SIZE && (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop={16}
        >
          <Button
            disabled={clampedPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>

          <Text size={300} color="muted">
            Page {clampedPage} of {totalPages}
          </Text>

          <Button
            disabled={clampedPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </Pane>
      )}

      <Dialog
        isShown={deleteDialogOpen}
        title="Delete Word"
        intent="danger"
        onCloseComplete={cancelDelete}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
      >
        <Alert intent="danger" title="Are you sure?" marginBottom={16}>
          This action cannot be undone. The word will be permanently removed
          from your vocabulary.
        </Alert>
      </Dialog>
    </>
  );
};

export default WordList;
