import React, { useState, useEffect } from 'react';
import { Dialog, Pane, Select, Text } from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addVocabularyWord } from '@/store/slices/vocabularySlice';
import AppTextInput from './AppTextInput';

interface AddWordFromHomeDialogProps {
  isShown: boolean;
  onClose: () => void;
}

const AddWordFromHomeDialog: React.FC<AddWordFromHomeDialogProps> = ({
  isShown,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { sets } = useAppSelector((state) => state.vocabulary);

  const [selectedSetId, setSelectedSetId] = useState<string>('');
  const [newWordData, setNewWordData] = useState({
    word: '',
    meaning: '',
    pronunciation: '',
    example: '',
  });

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isShown) {
      // Set default to first set if available
      if (sets.length > 0 && !selectedSetId) {
        setSelectedSetId(sets[0].id);
      }
      // Clear form data
      setNewWordData({
        word: '',
        meaning: '',
        pronunciation: '',
        example: '',
      });
    }
  }, [isShown, sets, selectedSetId]);

  const handleInputChange = (
    field: keyof typeof newWordData,
    value: string
  ) => {
    setNewWordData({ ...newWordData, [field]: value });
  };

  const handleSaveWord = () => {
    if (
      newWordData.word.trim() &&
      newWordData.meaning.trim() &&
      selectedSetId
    ) {
      // Add new word to selected vocabulary set
      dispatch(
        addVocabularyWord({
          vocabularySetId: selectedSetId,
          word: newWordData.word.trim(),
          meaning: newWordData.meaning.trim(),
          pronunciation: newWordData.pronunciation.trim() || undefined,
          example: newWordData.example.trim() || undefined,
        })
      );

      // Reset form
      setNewWordData({
        word: '',
        meaning: '',
        pronunciation: '',
        example: '',
      });
      onClose();
    }
  };

  const isFormValid =
    newWordData.word.trim() && newWordData.meaning.trim() && selectedSetId;

  return (
    <Dialog
      isShown={isShown}
      title="Add New Word"
      onCloseComplete={onClose}
      confirmLabel="Add Word"
      cancelLabel="Cancel"
      onConfirm={handleSaveWord}
      onCancel={onClose}
      isConfirmDisabled={!isFormValid}
    >
      <Pane>
        {/* Vocabulary Set Selection */}
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

        {/* Word Input */}
        <Pane marginBottom={16}>
          <AppTextInput
            placeholder="Word"
            value={newWordData.word}
            onChange={(value) => handleInputChange('word', value)}
            width="100%"
          />
        </Pane>

        {/* Meaning Input */}
        <Pane marginBottom={16}>
          <AppTextInput
            placeholder="Meaning"
            value={newWordData.meaning}
            onChange={(value) => handleInputChange('meaning', value)}
            width="100%"
          />
        </Pane>

        {/* Pronunciation Input */}
        <Pane marginBottom={16}>
          <AppTextInput
            placeholder="Pronunciation (optional)"
            value={newWordData.pronunciation}
            onChange={(value) => handleInputChange('pronunciation', value)}
            width="100%"
          />
        </Pane>

        {/* Example Input */}
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

export default AddWordFromHomeDialog;
