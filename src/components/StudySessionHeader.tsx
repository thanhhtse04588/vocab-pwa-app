import { Pane, Heading, Text } from 'evergreen-ui';
import React from 'react';

interface StudySessionHeaderProps {
  currentWordIndex: number;
  totalWords: number;
  incorrectWordsCount: number;
  progress: number;
}

const StudySessionHeader: React.FC<StudySessionHeaderProps> = ({
  currentWordIndex,
  totalWords,
  incorrectWordsCount,
  progress,
}) => {
  return (
    <>
      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={24}
      >
        <Heading size={600}>Study Session</Heading>
        <Text color="muted">
          {currentWordIndex + 1} / {totalWords}
          {incorrectWordsCount > 0 && (
            <Text color="danger" marginLeft={8}>
              (Retry: {incorrectWordsCount})
            </Text>
          )}
        </Text>
      </Pane>

      {/* Progress Bar */}
      <Pane
        height={8}
        backgroundColor="#e4e7eb"
        borderRadius={4}
        marginBottom={24}
        overflow="hidden"
      >
        <Pane
          height="100%"
          width={`${progress}%`}
          backgroundColor="#1070ca"
          borderRadius={4}
          transition="width 0.3s ease"
        />
      </Pane>
    </>
  );
};

export default StudySessionHeader;
