import AudioButton from '@/components/AudioButton';
import type { VocabularySet, VocabularyWord } from '@/types';
import { Card, Heading, Pane, Strong, Text } from 'evergreen-ui';
import React from 'react';

interface WordCardProps {
  word: VocabularyWord;
  showAnswer: boolean;
  isCorrect: boolean | null;
  isMarkedAsTrue: boolean;
  vocabularySet?: VocabularySet; // Optional vocabulary set to get meaningLanguage
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  showAnswer,
  isCorrect,
  isMarkedAsTrue,
  vocabularySet,
}) => {
  return (
    <Card marginBottom={24}>
      <Pane padding={24} textAlign="center">
        <Heading size={600} marginBottom={16}>
          {word.meaning}
        </Heading>

        {showAnswer && (
          <Pane
            className="fade-in"
            display="flex"
            flexDirection="column"
            gap={12}
          >
            <Heading size={500} color={isCorrect ? 'success' : 'danger'}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              {isMarkedAsTrue && (
                <Text size={400} color="success" marginLeft={8}>
                  (Marked as True)
                </Text>
              )}
            </Heading>

            <Pane
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={8}
            >
              <Text size={500}>
                <Strong>Answer:</Strong> {word.word}
              </Text>
              <AudioButton
                text={word.word}
                lang={vocabularySet?.wordLanguage}
              />
            </Pane>

            {word.pronunciation && (
              <Text color="muted">/ {word.pronunciation} /</Text>
            )}

            {word.wordType && (
              <Text
                color="muted"
                fontSize="12px"
                textTransform="uppercase"
                letterSpacing="0.5px"
              >
                {word.wordType}
              </Text>
            )}

            {word.example && (
              <Text fontStyle="italic" color="muted" marginBottom={16}>
                "{word.example}"
              </Text>
            )}
          </Pane>
        )}
      </Pane>
    </Card>
  );
};

export default WordCard;
