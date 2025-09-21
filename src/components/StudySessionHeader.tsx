import {
  Pane,
  Heading,
  Text,
  Button,
  IconButton,
  useTheme,
} from 'evergreen-ui';
import { ArrowLeft, Gear } from 'phosphor-react';
import React from 'react';

interface StudySessionHeaderProps {
  currentWordIndex: number;
  totalWords: number;
  progress: number;
  onBack?: () => void;
  onSettingsClick?: () => void;
}

const StudySessionHeader: React.FC<StudySessionHeaderProps> = ({
  currentWordIndex,
  totalWords,
  progress,
  onBack,
  onSettingsClick,
}) => {
  const theme = useTheme();

  return (
    <>
      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={24}
      >
        <Pane display="flex" alignItems="center" gap={12}>
          {onBack && (
            <Button
              appearance="minimal"
              onClick={onBack}
              padding={8}
              borderRadius={8}
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          <Heading size={600}>Study Session</Heading>
        </Pane>
        <Pane display="flex" alignItems="center" gap={12}>
          <Text color="muted">
            {currentWordIndex + 1} / {totalWords}
          </Text>
          {onSettingsClick && (
            <IconButton
              intent="default"
              appearance="minimal"
              iconSize={20}
              icon={Gear}
              onClick={onSettingsClick}
              size="small"
              title="Study Settings"
            />
          )}
        </Pane>
      </Pane>

      {/* Progress Bar */}
      <Pane
        height={8}
        backgroundColor={theme.colors.gray200}
        borderRadius={4}
        marginBottom={24}
        overflow="hidden"
      >
        <Pane
          height="100%"
          width={`${progress}%`}
          backgroundColor={theme.colors.blue500}
          borderRadius={4}
          transition="width 0.3s ease"
        />
      </Pane>
    </>
  );
};

export default StudySessionHeader;
