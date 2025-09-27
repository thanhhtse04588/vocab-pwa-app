import AudioButton from '@/components/AudioButton';
import { useAppDispatch } from '@/hooks/redux';
import { deleteVocabularyWord } from '@/store/slices/vocabularySlice';
import type { VocabularyWord } from '@/types';
import {
  Alert,
  Badge,
  Card,
  Dialog,
  Heading,
  IconButton,
  Pane,
  Spinner,
  Text,
  TextInput,
  useTheme,
} from 'evergreen-ui';
import {
  CaretLeft,
  CaretRight,
  PencilSimple,
  Trash,
  MagnifyingGlass,
} from 'phosphor-react';
import React, { useEffect, useMemo, useState } from 'react';

interface WordListProps {
  words: VocabularyWord[];
  loading: boolean;
  onEditWord: (word: VocabularyWord) => void;
  language: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  isEditMode?: boolean;
}

const WordList: React.FC<WordListProps> = ({
  words,
  loading,
  onEditWord,
  language,
  searchQuery = '',
  onSearchChange,
  isEditMode = false,
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [wordToDelete, setWordToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 20;

  // Filter words by search query
  const filteredWords = useMemo(() => {
    if (!searchQuery.trim()) return words;
    return words.filter(
      (word) =>
        word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.meaning.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [words, searchQuery]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredWords.length / PAGE_SIZE)),
    [filteredWords.length]
  );
  const clampedPage = Math.min(currentPage, totalPages);
  const startIndex = (clampedPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pagedWords = useMemo(
    () => filteredWords.slice(startIndex, endIndex),
    [filteredWords, startIndex, endIndex]
  );

  useEffect(() => {
    // Clamp current page when words change (e.g., after delete or new import)
    setCurrentPage((prev) => {
      const next = Math.max(
        1,
        Math.min(prev, Math.max(1, Math.ceil(filteredWords.length / PAGE_SIZE)))
      );
      return next;
    });
  }, [filteredWords.length]);

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
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={16}
      >
        <Pane display="flex" alignItems="center">
          <Heading size={500} marginRight={12}>
            Words
          </Heading>
          <Badge color="blue" size={300}>
            {filteredWords.length}
          </Badge>
        </Pane>

        {onSearchChange && (
          <Pane position="relative" maxWidth={300}>
            <TextInput
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e.target.value)
              }
              width="100%"
              paddingLeft={32}
            />
            <Pane
              position="absolute"
              left={8}
              top="50%"
              transform="translateY(-50%)"
              pointerEvents="none"
            >
              <MagnifyingGlass size={16} color={theme.colors.gray600} />
            </Pane>
          </Pane>
        )}
      </Pane>

      {pagedWords.map((word) => (
        <Card key={word.id} marginBottom={8} hoverElevation={1}>
          <Pane padding={16}>
            <Pane display="flex" flexDirection="column" gap={8}>
              {/* Header with word and badge */}
              <Pane display="flex" alignItems="center" flexWrap="wrap" gap={12}>
                <Heading size={500} flex={1} minWidth={0}>
                  {word.word}
                </Heading>
                <AudioButton text={word.word} lang={language} rate={0.8} />
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

                {isEditMode && (
                  <Pane display="flex" gap={8}>
                    <IconButton
                      appearance="minimal"
                      intent="primary"
                      icon={<PencilSimple size={16} />}
                      onClick={() => onEditWord(word)}
                      size="small"
                      title="Edit word"
                    />
                    <IconButton
                      appearance="minimal"
                      intent="danger"
                      icon={<Trash size={16} />}
                      onClick={() => handleDeleteWord(word.id)}
                      size="small"
                      title="Delete word"
                    />
                  </Pane>
                )}
              </Pane>
            </Pane>
          </Pane>
        </Card>
      ))}

      {/* Pagination controls */}
      {filteredWords.length > PAGE_SIZE && (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop={16}
        >
          <IconButton
            intent="primary"
            disabled={clampedPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            icon={<CaretLeft size={16} />}
            title="Previous page"
          />

          <Text size={300} color="muted">
            Page {clampedPage} of {totalPages}
          </Text>

          <IconButton
            intent="primary"
            disabled={clampedPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            icon={<CaretRight size={16} />}
            title="Next page"
          />
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
