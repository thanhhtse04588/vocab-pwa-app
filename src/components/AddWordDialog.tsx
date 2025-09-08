import React, { useState, useEffect } from 'react';
import { Dialog, Pane, TextInput } from 'evergreen-ui';
import { useAppDispatch } from '@/hooks/redux';
import { addVocabularyWord } from '@/store/slices/vocabularySlice';

interface AddWordDialogProps {
  isShown: boolean;
  onClose: () => void;
  setId: string;
}

const AddWordDialog: React.FC<AddWordDialogProps> = ({
  isShown,
  onClose,
  setId,
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
      setNewWordData({
        word: '',
        meaning: '',
        pronunciation: '',
        example: '',
      });
    }
  }, [isShown]);

  const handleAddWord = () => {
    if (newWordData.word.trim() && newWordData.meaning.trim()) {
      dispatch(
        addVocabularyWord({
          vocabularySetId: setId,
          word: newWordData.word.trim(),
          meaning: newWordData.meaning.trim(),
          pronunciation: newWordData.pronunciation.trim() || undefined,
          example: newWordData.example.trim() || undefined,
        })
      );
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
      title="Add New Word"
      onCloseComplete={onClose}
      confirmLabel="Add Word"
      cancelLabel="Cancel"
      onConfirm={handleAddWord}
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
