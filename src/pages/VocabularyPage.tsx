import React, { useEffect, useState } from 'react';
import { Pane, Heading, Card, Button, Spinner, Text } from 'evergreen-ui';
import { Plus } from 'phosphor-react';
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
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

const VocabularyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sets, loading } = useAppSelector((state) => state.vocabulary);
  const { settings } = useAppSelector((state) => state.settings);

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [setToDelete, setSetToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadVocabularySets());
  }, [dispatch]);

  const handleCreateSet = async (newSetData: {
    name: string;
    description: string;
    sourceLanguage: string;
    targetLanguage: string;
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
          <Button
            iconBefore={<Plus size={16} />}
            onClick={() => setShowCreatePopup(true)}
          >
            New Set
          </Button>
        </Pane>

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
        ) : (
          <>
            <Heading size={500} marginBottom={16}>
              Your Vocabulary Sets ({sets.length})
            </Heading>
            {sets.map((set) => (
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
    </Pane>
  );
};

export default VocabularyPage;
