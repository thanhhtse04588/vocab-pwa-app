import React, { useEffect, useState } from 'react';
import { Pane } from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  loadVocabularyWords,
  setCurrentSet,
} from '@/store/slices/vocabularySlice';
import { setActiveTab } from '@/store/slices/navigationSlice';
import { startStudySession } from '@/store/slices/studySlice';
import { resetProgress } from '@/store/slices/userProgressSlice';
import AddWordDialog from '@/components/AddWordDialog';
import ImportCSVDialog from '@/components/ImportCSVDialog';
import ResetProgressDialog from '@/components/ResetProgressDialog';
import WordList from '@/components/WordList';
import SetInfoCard from '@/components/SetInfoCard';
import MemoryLevelChart from '@/components/MemoryLevelChart';
import VocabularySetHeader from '@/components/VocabularySetHeader';
import VocabularySetActions from '@/components/VocabularySetActions';
import VocabularySetErrorStates from '@/components/VocabularySetErrorStates';

interface VocabularySetPageProps {
  setId: string;
}

const VocabularySetPage: React.FC<VocabularySetPageProps> = ({ setId }) => {
  const dispatch = useAppDispatch();
  const { words, currentSet, sets, loading } = useAppSelector(
    (state) => state.vocabulary
  );
  const { settings } = useAppSelector((state) => state.settings);

  const [showAddWordDialog, setShowAddWordDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isStartingStudy, setIsStartingStudy] = useState(false);

  useEffect(() => {
    if (setId) {
      dispatch(loadVocabularyWords(setId));

      // Set current set in store
      const set = sets.find((s) => s.id === setId);
      if (set) {
        dispatch(setCurrentSet(set));
      }
    }
  }, [setId, dispatch, sets]);

  const handleEditWord = () => {
    setShowAddWordDialog(true);
  };

  const handleStartStudy = async () => {
    if (setId) {
      setIsStartingStudy(true);
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
      } finally {
        setIsStartingStudy(false);
      }
    }
  };

  const handleResetProgress = async () => {
    if (setId) {
      try {
        await dispatch(resetProgress(setId)).unwrap();
        // Reload words to reflect the reset
        dispatch(loadVocabularyWords(setId));
        setShowResetDialog(false);
        alert('Progress has been reset successfully!');
      } catch (error) {
        console.error('Failed to reset progress:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        alert(`Failed to reset progress: ${errorMessage}`);
      }
    }
  };

  // Handle error states and loading
  if (!setId || (loading && !currentSet) || (!loading && !currentSet)) {
    return (
      <VocabularySetErrorStates
        loading={loading}
        currentSet={currentSet}
        setId={setId}
      />
    );
  }

  if (!currentSet) {
    return null;
  }

  return (
    <Pane className="page-content">
      <Pane padding={24}>
        {/* Header */}
        <VocabularySetHeader
          set={currentSet}
          onResetProgress={() => setShowResetDialog(true)}
        />

        {/* Set Info */}
        <SetInfoCard
          set={currentSet}
          words={words}
          onStartStudy={handleStartStudy}
          isStartingStudy={isStartingStudy}
        />

        {/* Memory Levels Distribution */}
        <MemoryLevelChart vocabularySetId={setId} />

        {/* Action Buttons */}
        <VocabularySetActions
          onImportCSV={() => setShowImportDialog(true)}
          onAddWord={() => setShowAddWordDialog(true)}
        />

        {/* Words List */}
        <WordList words={words} loading={loading} onEditWord={handleEditWord} />
      </Pane>

      {/* Add/Edit Word Dialog */}
      <AddWordDialog
        isShown={showAddWordDialog}
        onClose={() => {
          setShowAddWordDialog(false);
        }}
        setId={setId!}
      />

      {/* Import CSV Dialog */}
      <ImportCSVDialog
        isShown={showImportDialog}
        onClose={() => setShowImportDialog(false)}
        setId={setId!}
      />

      {/* Reset Progress Dialog */}
      <ResetProgressDialog
        isShown={showResetDialog}
        onClose={() => setShowResetDialog(false)}
        onConfirm={handleResetProgress}
        setName={currentSet?.name || ''}
      />
    </Pane>
  );
};

export default VocabularySetPage;
