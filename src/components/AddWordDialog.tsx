import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Pane,
  Select,
  Text,
  Button,
  Spinner,
  Alert,
} from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  addVocabularyWord,
  updateVocabularyWord,
} from '@/store/slices/vocabularySlice';
import type { VocabularyWord, WordType } from '@/types';
import { cloudFunctionsService } from '@/services/vertexAIService';
import { Sparkles } from 'lucide-react';
import AppTextInput from './AppTextInput';

interface AddWordDialogProps {
  isShown: boolean;
  onClose: () => void;
  setId?: string; // Optional - if not provided, will show vocabulary set selection
  editingWord?: VocabularyWord | null;
}

const AddWordDialog: React.FC<AddWordDialogProps> = ({
  isShown,
  onClose,
  setId,
  editingWord,
}) => {
  const dispatch = useAppDispatch();
  const { sets } = useAppSelector((state) => state.vocabulary);
  const [selectedSetId, setSelectedSetId] = useState<string>('');
  const [newWordData, setNewWordData] = useState({
    word: '',
    meaning: '',
    pronunciation: '',
    example: '',
    wordType: '' as WordType | '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Determine if we need to show vocabulary set selection
  const showSetSelection = !setId;
  const currentSetId = setId || selectedSetId;

  // Get the current vocabulary set
  const vocabularySet = sets.find((set) => set.id === currentSetId);

  useEffect(() => {
    if (isShown) {
      if (editingWord) {
        // Pre-fill form with existing word data for editing
        setNewWordData({
          word: editingWord.word,
          meaning: editingWord.meaning,
          pronunciation: editingWord.pronunciation || '',
          example: editingWord.example || '',
          wordType: editingWord.wordType || '',
        });
      } else {
        // Clear form for adding new word
        setNewWordData({
          word: '',
          meaning: '',
          pronunciation: '',
          example: '',
          wordType: '',
        });
      }

      // Set default vocabulary set if showing set selection
      if (showSetSelection && sets.length > 0 && !selectedSetId) {
        setSelectedSetId(sets[0].id);
      }
    }
  }, [isShown, editingWord, showSetSelection, sets, selectedSetId]);

  const handleInputChange = (
    field: keyof typeof newWordData,
    value: string
  ) => {
    setNewWordData({ ...newWordData, [field]: value });
    // Clear AI error when user starts typing
    if (field === 'word' && aiError) {
      setAiError(null);
    }
  };

  const handleGenerateWithAI = async () => {
    if (!newWordData.word.trim()) {
      setAiError('Please enter a word first');
      return;
    }

    if (showSetSelection && !selectedSetId) {
      setAiError('Please select a vocabulary set first');
      return;
    }

    setIsGenerating(true);
    setAiError(null);

    try {
      // Get meaning language from the current set
      const currentSet = sets.find((set) => set.id === currentSetId);
      const meaningLanguage = currentSet?.meaningLanguage || 'Vietnamese';

      const aiInfo = await cloudFunctionsService.generateWordInfo(
        newWordData.word.trim(),
        meaningLanguage
      );

      // Update form with AI-generated data
      setNewWordData((prev) => ({
        ...prev,
        meaning: aiInfo.meaning || prev.meaning,
        pronunciation: aiInfo.pronunciation || prev.pronunciation,
        example: aiInfo.example || prev.example,
        wordType: (aiInfo.wordType as WordType) || prev.wordType,
      }));
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : 'Failed to generate word information'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveWord = () => {
    if (newWordData.word.trim() && newWordData.meaning.trim() && currentSetId) {
      if (editingWord) {
        // Update existing word
        dispatch(
          updateVocabularyWord({
            id: editingWord.id,
            updates: {
              word: newWordData.word.trim(),
              meaning: newWordData.meaning.trim(),
              pronunciation: newWordData.pronunciation.trim() || undefined,
              example: newWordData.example.trim() || undefined,
              wordType: newWordData.wordType || undefined,
            },
          })
        );
      } else {
        // Add new word
        dispatch(
          addVocabularyWord({
            vocabularySetId: currentSetId,
            word: newWordData.word.trim(),
            meaning: newWordData.meaning.trim(),
            pronunciation: newWordData.pronunciation.trim() || undefined,
            example: newWordData.example.trim() || undefined,
            wordType: newWordData.wordType || undefined,
          })
        );
      }
      setNewWordData({
        word: '',
        meaning: '',
        pronunciation: '',
        example: '',
        wordType: '',
      });
      onClose();
    }
  };

  return (
    <Dialog
      isShown={isShown}
      title={editingWord ? 'Edit Word' : 'Add New Word'}
      onCloseComplete={onClose}
      confirmLabel={editingWord ? 'Update Word' : 'Add Word'}
      cancelLabel="Cancel"
      onConfirm={handleSaveWord}
      onCancel={onClose}
      isConfirmDisabled={
        !newWordData.word.trim() || !newWordData.meaning.trim() || !currentSetId
      }
      shouldCloseOnOverlayClick={false}
    >
      <Pane>
        {/* Vocabulary Set Selection - only show when setId is not provided */}
        {showSetSelection && (
          <Pane marginBottom={16}>
            <Text size={400} fontWeight={500} marginBottom={8} display="block">
              Select Vocabulary Set
            </Text>
            <Select
              value={selectedSetId}
              onChange={(e) => setSelectedSetId(e.target.value)}
              width="100%"
              disabled={sets.length === 0}
            >
              {sets.length === 0 ? (
                <option value="">No vocabulary sets available</option>
              ) : (
                sets.map((set) => (
                  <option key={set.id} value={set.id}>
                    {set.name} ({set.wordCount} words)
                  </option>
                ))
              )}
            </Select>
          </Pane>
        )}

        {/* Word Input */}
        <Pane marginBottom={16}>
          <AppTextInput
            placeholder={'Word (' + vocabularySet?.wordLanguage + ')'}
            value={newWordData.word}
            onChange={(value) => handleInputChange('word', value)}
            width="100%"
          />
        </Pane>

        {/* AI Generate Button */}
        <Pane marginBottom={16}>
          <Button
            onClick={handleGenerateWithAI}
            disabled={
              !newWordData.word.trim() ||
              (showSetSelection && !selectedSetId) ||
              isGenerating
            }
            appearance="minimal"
            intent="primary"
            size="small"
            iconBefore={
              isGenerating ? <Spinner size={12} /> : <Sparkles size={12} />
            }
          >
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </Button>
        </Pane>

        {/* AI Error Alert */}
        {aiError && (
          <Pane marginBottom={16}>
            <Alert intent="danger" title="AI Generation Error">
              {aiError}
            </Alert>
          </Pane>
        )}

        <Pane marginBottom={16}>
          <AppTextInput
            placeholder={'Meaning (' + vocabularySet?.meaningLanguage + ')'}
            value={newWordData.meaning}
            onChange={(value) => handleInputChange('meaning', value)}
            width="100%"
          />
        </Pane>

        <Pane marginBottom={16}>
          <Select
            value={newWordData.wordType}
            onChange={(e) =>
              handleInputChange('wordType', e.target.value as WordType | '')
            }
            width="100%"
          >
            <option value="">Word Type (optional)</option>
            <option value="noun">Noun (n)</option>
            <option value="verb">Verb (v)</option>
            <option value="adjective">Adjective (adj)</option>
            <option value="adverb">Adverb (adv)</option>
            <option value="pronoun">Pronoun (pron)</option>
            <option value="preposition">Preposition (prep)</option>
            <option value="conjunction">Conjunction (conj)</option>
            <option value="interjection">Interjection (interj)</option>
            <option value="phrase">Phrase (phr)</option>
            <option value="sentence">Sentence (sent)</option>
            <option value="other">Other</option>
          </Select>
        </Pane>

        <Pane marginBottom={16}>
          <AppTextInput
            placeholder="Pronunciation (optional)"
            value={newWordData.pronunciation}
            onChange={(value) => handleInputChange('pronunciation', value)}
            width="100%"
          />
        </Pane>

        <Pane>
          <AppTextInput
            placeholder="Example sentence (optional)"
            value={newWordData.example}
            onChange={(value) => handleInputChange('example', value)}
            width="100%"
          />
        </Pane>
      </Pane>
    </Dialog>
  );
};

export default AddWordDialog;
