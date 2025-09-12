import React, { useState, useEffect } from 'react';
import { Dialog, Pane } from 'evergreen-ui';
import { useAppDispatch } from '@/hooks/redux';
import {
  addVocabularyWord,
  updateVocabularyWord,
} from '@/store/slices/vocabularySlice';
import type { VocabularyWord } from '@/types';
import AppTextInput from './AppTextInput';

interface AddWordDialogProps {
  isShown: boolean;
  onClose: () => void;
  setId: string;
  editingWord?: VocabularyWord | null;
}

const AddWordDialog: React.FC<AddWordDialogProps> = ({
  isShown,
  onClose,
  setId,
  editingWord,
}) => {
  const dispatch = useAppDispatch();
  const [newWordData, setNewWordData] = useState({
    word: '',
    meaning: '',
    pronunciation: '',
    example: '',
  });

  useEffect(() => {
    if (isShown) {
      if (editingWord) {
        // Pre-fill form with existing word data for editing
        setNewWordData({
          word: editingWord.word,
          meaning: editingWord.meaning,
          pronunciation: editingWord.pronunciation || '',
          example: editingWord.example || '',
        });
      } else {
        // Clear form for adding new word
        setNewWordData({
          word: '',
          meaning: '',
          pronunciation: '',
          example: '',
        });
      }
    }
  }, [isShown, editingWord]);

  const handleInputChange = (
    field: keyof typeof newWordData,
    value: string
  ) => {
    setNewWordData({ ...newWordData, [field]: value });
  };

  const handleSaveWord = () => {
    if (newWordData.word.trim() && newWordData.meaning.trim()) {
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
            },
          })
        );
      } else {
        // Add new word
        dispatch(
          addVocabularyWord({
            vocabularySetId: setId,
            word: newWordData.word.trim(),
            meaning: newWordData.meaning.trim(),
            pronunciation: newWordData.pronunciation.trim() || undefined,
            example: newWordData.example.trim() || undefined,
          })
        );
      }
      setNewWordData({
        word: '',
        meaning: '',
        pronunciation: '',
        example: '',
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
        !newWordData.word.trim() || !newWordData.meaning.trim()
      }
    >
      <Pane>
        <Pane marginBottom={16}>
          <AppTextInput
            placeholder="Word"
            value={newWordData.word}
            onChange={(value) => handleInputChange('word', value)}
            width="100%"
          />
        </Pane>

        <Pane marginBottom={16}>
          <AppTextInput
            placeholder="Meaning"
            value={newWordData.meaning}
            onChange={(value) => handleInputChange('meaning', value)}
            width="100%"
          />
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
