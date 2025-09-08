import React from 'react';
import { Pane, Text, Button } from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { resetStudySession } from '@/store/slices/studySlice';
import { setActiveTab } from '@/store/slices/navigationSlice';
import StudySession from '@/components/StudySession';

const LearnPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isStudying, currentSession } = useAppSelector((state) => state.study);

  const handleStudyComplete = () => {
    dispatch(resetStudySession());
    // Navigate back to home after completing study
    dispatch(setActiveTab('home'));
  };

  const handleReturnHome = () => {
    dispatch(setActiveTab('home'));
  };

  // If there's an active study session, show StudySession directly
  if (isStudying && currentSession) {
    return <StudySession onComplete={handleStudyComplete} />;
  }

  // Show completion message while redirecting
  return (
    <Pane className="page-content">
      <Pane
        padding={24}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Text fontSize={24} fontWeight="bold" color="success" marginBottom={16}>
          🎉 Study Session Completed!
        </Text>
        <Text fontSize={16} color="muted" marginBottom={24}>
          Great job! You've completed all the words.
        </Text>
        <Button
          appearance="primary"
          intent="success"
          onClick={handleReturnHome}
        >
          Return to Home
        </Button>
      </Pane>
    </Pane>
  );
};

export default LearnPage;
