import CreateSetDialog from '@/components/CreateSetDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import ImportPresetDialog from '@/components/ImportPresetDialog';
import VocabularySetCard from '@/components/VocabularySetCard';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  setCurrentPage,
  setVocabularySetId,
} from '@/store/slices/navigationSlice';
import {
  createVocabularySet,
  deleteVocabularySet,
  loadVocabularySets,
} from '@/store/slices/vocabularySlice';
import {
  Button,
  Card,
  Heading,
  Pane,
  Spinner,
  Text,
  TextInput,
  useTheme,
} from 'evergreen-ui';
import {
  CloudArrowDown,
  MagnifyingGlass,
  Plus,
  PencilSimple,
} from 'phosphor-react';
import React, { useEffect, useMemo, useState } from 'react';

const VocabularyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { sets, loading } = useAppSelector((state) => state.vocabulary);

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [setToDelete, setSetToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(loadVocabularySets());
  }, [dispatch]);

  // Filter and sort sets by recently added
  const filteredAndSortedSets = useMemo(() => {
    const filtered = sets.filter((set) =>
      set.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [sets, searchQuery]);

  const handleCreateSet = async (newSetData: {
    name: string;
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

  return (
    <Pane className="page-content">
      <Pane padding={24} display="flex" flexDirection="column" gap={16}>
        <Heading size={600}>Vocabulary Sets ({sets.length})</Heading>

        <Pane display="flex" gap={8}>
          <Button
            iconBefore={<Plus size={16} />}
            onClick={() => setShowCreatePopup(true)}
          >
            New Set
          </Button>
          <Button
            iconBefore={<CloudArrowDown size={16} />}
            onClick={() => setShowImportDialog(true)}
          >
            Import Preset
          </Button>
          <Button
            iconBefore={<PencilSimple size={16} />}
            onClick={() => setIsEditMode(!isEditMode)}
            intent={isEditMode ? 'danger' : 'none'}
          >
            {isEditMode ? 'Done' : 'Edit'}
          </Button>
        </Pane>

        {/* Search and Sort Controls */}
        {sets.length > 0 && (
          <Pane display="flex" gap={16} alignItems="center" flexDirection="row">
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
                <MagnifyingGlass size={16} color={theme.colors.gray600} />
              </Pane>
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
          <Pane
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap={16}
            width="100%"
            overflow="hidden"
            padding={2}
          >
            {filteredAndSortedSets.map((set) => (
              <VocabularySetCard
                key={set.id}
                set={set}
                onView={handleViewSet}
                onDelete={handleDeleteSet}
                isEditMode={isEditMode}
              />
            ))}
          </Pane>
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
