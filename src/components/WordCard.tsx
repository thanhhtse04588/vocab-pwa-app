import { Card, Pane, Heading, Text, Strong } from 'evergreen-ui';
import React from 'react';
import AudioButton from '@/components/AudioButton';
import type { VocabularyWord, VocabularySet } from '@/types';

interface WordCardProps {
  word: VocabularyWord;
  showAnswer: boolean;
  isCorrect: boolean | null;
  isMarkedAsTrue: boolean;
  vocabularySet?: VocabularySet; // Optional vocabulary set to get targetLanguage
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
        <Heading size={800} marginBottom={16}>
          {word.meaning}
        </Heading>

        {word.pronunciation && (
          <Text color="muted" marginBottom={16}>
            {word.pronunciation}
          </Text>
        )}

        {showAnswer && (
          <Pane className="fade-in">
            <Heading
              size={500}
              color={isCorrect ? 'success' : 'danger'}
              marginBottom={16}
            >
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
              marginBottom={16}
            >
              <Text size={500}>
                <Strong>Answer:</Strong> {word.word}
              </Text>
              <AudioButton
                text={word.word}
                targetLanguage={vocabularySet?.targetLanguage}
                tooltip={`Play pronunciation in ${
                  vocabularySet?.targetLanguage || 'default'
                } language`}
              />
            </Pane>

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
