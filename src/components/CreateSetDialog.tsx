import React, { useState } from 'react';
import { Dialog, Pane, Text, TextInput, Textarea, Select } from 'evergreen-ui';

interface NewSetData {
  name: string;
  description: string;
  sourceLanguage: string;
  targetLanguage: string;
}

interface CreateSetDialogProps {
  isShown: boolean;
  onClose: () => void;
  onCreate: (data: NewSetData) => void;
}

const languages = [
  { value: 'en', text: 'English' },
  { value: 'vi', text: 'Vietnamese' },
  { value: 'ja', text: 'Japanese' },
  { value: 'ko', text: 'Korean' },
  { value: 'zh', text: 'Chinese' },
  { value: 'fr', text: 'French' },
  { value: 'de', text: 'German' },
  { value: 'es', text: 'Spanish' },
];

const CreateSetDialog: React.FC<CreateSetDialogProps> = ({
  isShown,
  onClose,
  onCreate,
}) => {
  const [newSetData, setNewSetData] = useState<NewSetData>({
    name: '',
    description: '',
    sourceLanguage: 'en',
    targetLanguage: 'vi',
  });

  const handleCreate = () => {
    if (newSetData.name.trim()) {
      onCreate(newSetData);
      setNewSetData({
        name: '',
        description: '',
        sourceLanguage: 'en',
        targetLanguage: 'vi',
      });
    }
  };

  const handleClose = () => {
    setNewSetData({
      name: '',
      description: '',
      sourceLanguage: 'en',
      targetLanguage: 'vi',
    });
    onClose();
  };

  return (
    <Dialog
      isShown={isShown}
      title="Create New Set"
      onCloseComplete={handleClose}
      confirmLabel="Create Set"
      cancelLabel="Cancel"
      onConfirm={handleCreate}
      onCancel={handleClose}
      isConfirmDisabled={!newSetData.name.trim()}
      width="90vw"
    >
      <Pane>
        <Pane marginBottom={16}>
          <Text display="block" marginBottom={8} fontWeight={500}>
            Set Name *
          </Text>
          <TextInput
            placeholder="Enter set name"
            value={newSetData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewSetData({
                ...newSetData,
                name: e.target.value,
              })
            }
            width="100%"
          />
        </Pane>

        <Pane marginBottom={16}>
          <Text display="block" marginBottom={8} fontWeight={500}>
            Description
          </Text>
          <Textarea
            placeholder="Enter description (optional)"
            value={newSetData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewSetData({
                ...newSetData,
                description: e.target.value,
              })
            }
            width="100%"
          />
        </Pane>

        <Pane marginBottom={16}>
          <Text display="block" marginBottom={8} fontWeight={500}>
            Source Language
          </Text>
          <Select
            value={newSetData.sourceLanguage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setNewSetData({
                ...newSetData,
                sourceLanguage: e.target.value,
              })
            }
            width="100%"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.text}
              </option>
            ))}
          </Select>
        </Pane>

        <Pane marginBottom={16}>
          <Text display="block" marginBottom={8} fontWeight={500}>
            Target Language
          </Text>
          <Select
            value={newSetData.targetLanguage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setNewSetData({
                ...newSetData,
                targetLanguage: e.target.value,
              })
            }
            width="100%"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.text}
              </option>
            ))}
          </Select>
        </Pane>
      </Pane>
    </Dialog>
  );
};

export default CreateSetDialog;
