import React, { useState, useEffect } from 'react';
import { Dialog, Pane, TextInput } from 'evergreen-ui';
import { useAppDispatch } from '@/hooks/redux';
import {
  addVocabularyWord,
  updateVocabularyWord,
} from '@/store/slices/vocabularySlice';
import type { VocabularyWord } from '@/types';

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
        <TextInput
          placeholder="Word"
          value={newWordData.word}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewWordData({ ...newWordData, word: e.target.value })
          }
          marginBottom={16}
          width="100%"
        />
        <TextInput
          placeholder="Meaning"
          value={newWordData.meaning}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewWordData({ ...newWordData, meaning: e.target.value })
          }
          marginBottom={16}
          width="100%"
        />
        <TextInput
          placeholder="Pronunciation (optional)"
          value={newWordData.pronunciation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewWordData({ ...newWordData, pronunciation: e.target.value })
          }
          marginBottom={16}
          width="100%"
        />
        <TextInput
          placeholder="Example sentence (optional)"
          value={newWordData.example}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewWordData({ ...newWordData, example: e.target.value })
          }
          width="100%"
        />
      </Pane>
    </Dialog>
  );
};

export default AddWordDialog;
