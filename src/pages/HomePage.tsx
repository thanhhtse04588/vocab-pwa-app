import React, { useEffect } from 'react';
import { Pane, Heading, Card, Button, Text } from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  loadTotalWordsToReview,
  loadCombinedMemoryLevelDistribution,
} from '@/store/slices/userProgressSlice';
import { loadVocabularySets } from '@/store/slices/vocabularySlice';
import { setActiveTab } from '@/store/slices/navigationSlice';
import { startStudySession } from '@/store/slices/studySlice';
import StorageWarning from '@/components/StorageWarning';
import MemoryLevelChart from '@/components/MemoryLevelChart';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalWordsToReview } = useAppSelector((state) => state.userProgress);
  const { sets } = useAppSelector((state) => state.vocabulary);
  const { settings } = useAppSelector((state) => state.settings);

  useEffect(() => {
    dispatch(loadTotalWordsToReview());
    dispatch(loadVocabularySets());
    dispatch(loadCombinedMemoryLevelDistribution());
  }, [dispatch]);

  const handleStartReview = async () => {
    try {
      // Start review session with words that need review
      await dispatch(
        startStudySession({
          setId: 'review', // Special ID for review mode
          batchSize: settings?.batchSize || 10,
        })
      ).unwrap();

      // Navigate to learn page to show study session
      dispatch(setActiveTab('learn'));
    } catch (error) {
      console.error('Failed to start review session:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to start review: ${errorMessage}`);
    }
  };

  return (
    <Pane
      className="page-content"
      width="100%"
      maxWidth="100vw"
      boxSizing="border-box"
    >
      <Pane padding={24} width="100%" maxWidth="100vw" boxSizing="border-box">
        <Heading size={500} marginBottom={16}>
          Welcome Back!
        </Heading>

        {/* Storage quota warning */}
        <StorageWarning />

        {/* Review Card */}
        <Card marginBottom={24} elevation={1}>
          <Pane
            padding={24}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Pane flex={1}>
              <Heading size={500} marginBottom={8}>
                Review Time
              </Heading>
              <Text>
                <Text fontWeight={600}>{totalWordsToReview}</Text> words need
                review
              </Text>
            </Pane>
            <Pane>
              <Button
                size="large"
                appearance="primary"
                intent="none"
                onClick={handleStartReview}
                disabled={totalWordsToReview === 0}
              >
                Review
              </Button>
            </Pane>
          </Pane>
        </Card>

        {/* Statistics */}
        <Heading size={500} marginBottom={16}>
          Your Progress
        </Heading>

        {/* Memory Levels Chart */}
        {sets.length > 0 && <MemoryLevelChart />}

        {/* Recent Activity */}
        {sets.length > 0 && (
          <>
            <Heading size={500} marginBottom={16}>
              Recent Activity
            </Heading>
            <Card>
              <Pane paddingX={24}>
                <Heading size={400} marginBottom={16}>
                  Recent Vocabulary Sets
                </Heading>
                {sets.slice(0, 3).map((set) => (
                  <Pane
                    key={set.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    padding={12}
                    borderBottom="1px solid #e4e7eb"
                  >
                    <Pane>
                      <Text fontWeight={500}>{set.name}</Text>
                    </Pane>
                    <Pane>
                      <Text color="muted">{set.wordCount} words</Text>
                    </Pane>
                  </Pane>
                ))}
              </Pane>
            </Card>
          </>
        )}
      </Pane>
    </Pane>
  );
};

export default HomePage;
