import React, { useEffect, useState, useMemo } from 'react';
import {
  Pane,
  Heading,
  Card,
  Button,
  Spinner,
  Text,
  TextInput,
  Select,
  IconButton,
} from 'evergreen-ui';
import {
  Plus,
  CloudArrowDown,
  MagnifyingGlass,
  SortAscending,
  SortDescending,
} from 'phosphor-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  loadVocabularySets,
  createVocabularySet,
  deleteVocabularySet,
} from '@/store/slices/vocabularySlice';
import {
  setCurrentPage,
  setVocabularySetId,
  setActiveTab,
} from '@/store/slices/navigationSlice';
import { startStudySession } from '@/store/slices/studySlice';
import VocabularySetCard from '@/components/VocabularySetCard';
import CreateSetDialog from '@/components/CreateSetDialog';
import ImportPresetDialog from '@/components/ImportPresetDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

const VocabularyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sets, loading } = useAppSelector((state) => state.vocabulary);
  const { settings } = useAppSelector((state) => state.settings);

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [setToDelete, setSetToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'name' | 'wordCount'>(
    'createdAt'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    dispatch(loadVocabularySets());
  }, [dispatch]);

  // Filter and sort sets based on search query and sort options
  const filteredAndSortedSets = useMemo(() => {
    const filtered = sets.filter(
      (set) =>
        set.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        set.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'createdAt':
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'wordCount':
          comparison = a.wordCount - b.wordCount;
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [sets, searchQuery, sortBy, sortOrder]);

  const handleCreateSet = async (newSetData: {
    name: string;
    description: string;
    wordLanguage: string;
    meaningLanguage: string;
  }) => {
    const result = await dispatch(createVocabularySet(newSetData));

    if (createVocabularySet.fulfilled.match(result)) {
      setShowCreatePopup(false);
    }
  };

  const handleDeleteSet = (setId: string) => {
    setSetToDelete(setId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (setToDelete) {
      dispatch(deleteVocabularySet(setToDelete));
      setSetToDelete(null);
    }
    setShowDeleteConfirm(false);
  };

  const handleViewSet = (setId: string) => {
    dispatch(setVocabularySetId(setId));
    dispatch(setCurrentPage('vocabulary-set'));
  };

  const handleStartStudy = async (setId: string) => {
    try {
      // Start study session with new words (not for review)
      await dispatch(
        startStudySession({
          setId,
          batchSize: settings?.batchSize || 10,
          studyMode: 'new', // Study new words, not review
        })
      ).unwrap();

      // Navigate to learn page to show study session
      dispatch(setActiveTab('learn'));
    } catch (error) {
      console.error('Failed to start study session:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to start study: ${errorMessage}`);
    }
  };

  return (
    <Pane className="page-content">
      <Pane padding={24}>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={24}
        >
          <Heading size={600}>Vocabulary Sets</Heading>
          <Pane display="flex" gap={8}>
            <Button
              iconBefore={<CloudArrowDown size={16} />}
              onClick={() => setShowImportDialog(true)}
            >
              Import Preset
            </Button>
            <Button
              iconBefore={<Plus size={16} />}
              onClick={() => setShowCreatePopup(true)}
            >
              New Set
            </Button>
          </Pane>
        </Pane>

        {/* Search and Sort Controls */}
        {sets.length > 0 && (
          <Pane
            display="flex"
            gap={16}
            marginBottom={24}
            alignItems="center"
            flexDirection="row"
          >
            <Pane flex={1} minWidth={250} position="relative">
              <TextInput
                placeholder="Search vocabulary sets..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
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
                <MagnifyingGlass size={16} color="#8F95B2" />
              </Pane>
            </Pane>
            <Pane display="flex" gap={8} alignItems="center" flexShrink={0}>
              <Select
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSortBy(
                    e.target.value as 'createdAt' | 'name' | 'wordCount'
                  )
                }
                width={100}
              >
                <option value="createdAt">Date</option>
                <option value="name">Name</option>
                <option value="wordCount">Words</option>
              </Select>
              <IconButton
                intent="default"
                onClick={() =>
                  setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
                }
                title={
                  sortOrder === 'desc' ? 'Sort descending' : 'Sort ascending'
                }
                icon={sortOrder === 'desc' ? SortDescending : SortAscending}
              />
            </Pane>
          </Pane>
        )}

        {loading ? (
          <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={40}
          >
            <Spinner size={40} />
            <Text marginTop={16}>Loading vocabulary sets...</Text>
          </Pane>
        ) : sets.length === 0 ? (
          <Card>
            <Pane padding={24} textAlign="center">
              <Heading size={500} marginBottom={16}>
                No Vocabulary Sets
              </Heading>
              <Text marginBottom={24}>
                Create your first vocabulary set to start learning!
              </Text>
              <Button
                appearance="primary"
                intent="none"
                onClick={() => setShowCreatePopup(true)}
              >
                Create First Set
              </Button>
            </Pane>
          </Card>
        ) : filteredAndSortedSets.length === 0 ? (
          <Card>
            <Pane padding={24} textAlign="center">
              <Heading size={500} marginBottom={16}>
                No Matching Sets
              </Heading>
              <Text marginBottom={24}>
                No vocabulary sets match your search criteria.
              </Text>
              <Button
                appearance="primary"
                intent="none"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </Pane>
          </Card>
        ) : (
          <>
            <Heading size={500} marginBottom={16}>
              Your Vocabulary Sets ({filteredAndSortedSets.length} of{' '}
              {sets.length})
            </Heading>
            {filteredAndSortedSets.map((set) => (
              <VocabularySetCard
                key={set.id}
                set={set}
                onView={handleViewSet}
                onDelete={handleDeleteSet}
                onStartStudy={handleStartStudy}
              />
            ))}
          </>
        )}
      </Pane>

      <CreateSetDialog
        isShown={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onCreate={handleCreateSet}
      />

      <DeleteConfirmDialog
        isShown={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
      />

      <ImportPresetDialog
        isShown={showImportDialog}
        onClose={() => setShowImportDialog(false)}
      />
    </Pane>
  );
};

export default VocabularyPage;
