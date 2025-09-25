import AudioButton from '@/components/AudioButton';
import HighlightedText from '@/components/HighlightedText';
import type { VocabularySet, VocabularyWord } from '@/types';
import { Card, Heading, Pane, Strong, Text } from 'evergreen-ui';
import React from 'react';
import { getDetailedTextDiff } from '@/utils/textDiff';

interface WordCardProps {
  word: VocabularyWord;
  showAnswer: boolean;
  isCorrect: boolean | null;
  isMarkedAsTrue: boolean;
  userAnswer?: string; // User's input answer
  vocabularySet?: VocabularySet; // Optional vocabulary set to get meaningLanguage
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  showAnswer,
  isCorrect,
  isMarkedAsTrue,
  userAnswer,
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

            {/* Show user's answer with highlighting when incorrect */}
            {!isCorrect && userAnswer && (
              <Pane
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={8}
                marginTop={8}
                padding={12}
                backgroundColor="#f7f8fa"
                borderRadius={6}
                border="1px solid #e4e7eb"
              >
                <Text size={400} color="muted">
                  <Strong>Your answer:</Strong>
                </Text>
                <HighlightedText
                  segments={
                    getDetailedTextDiff(word.word, userAnswer).userSegments
                  }
                  size={400}
                  color="muted"
                  highlightColor="danger"
                  highlightBackgroundColor="#ffebee"
                />
              </Pane>
            )}

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
