import React, { useState } from 'react';
import { SideSheet, Pane, Text, Select, Button, Position } from 'evergreen-ui';
import AppTextInput from './AppTextInput';

interface NewSetData {
  name: string;
  wordLanguage: string;
  meaningLanguage: string;
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
    wordLanguage: 'en',
    meaningLanguage: 'vi',
  });

  const handleInputChange = (field: keyof NewSetData, value: string) => {
    setNewSetData({ ...newSetData, [field]: value });
  };

  const handleCreate = () => {
    if (newSetData.name.trim()) {
      onCreate(newSetData);
      setNewSetData({
        name: '',
        wordLanguage: 'en',
        meaningLanguage: 'vi',
      });
    }
  };

  const handleClose = () => {
    setNewSetData({
      name: '',
      wordLanguage: 'en',
      meaningLanguage: 'vi',
    });
    onClose();
  };

  return (
    <SideSheet
      position={Position.BOTTOM}
      isShown={isShown}
      onCloseComplete={handleClose}
    >
      <Pane padding={24}>
        {/* Header */}
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingBottom={16}
          marginBottom={16}
          borderBottom="1px solid #E4E7EB"
        >
          <Text size={500} fontWeight={600}>
            Create New Set
          </Text>
        </Pane>
        <Pane marginBottom={16}>
          <Text display="block" marginBottom={8} fontWeight={500}>
            Set Name *
          </Text>
          <AppTextInput
            placeholder="Enter set name"
            value={newSetData.name}
            onChange={(value) => handleInputChange('name', value)}
            width="100%"
          />
        </Pane>

        <Pane marginBottom={16}>
          <Text display="block" marginBottom={8} fontWeight={500}>
            Word Language
          </Text>
          <Select
            value={newSetData.wordLanguage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setNewSetData({
                ...newSetData,
                wordLanguage: e.target.value,
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

        <Pane marginBottom={24}>
          <Text display="block" marginBottom={8} fontWeight={500}>
            Meaning Language
          </Text>
          <Select
            value={newSetData.meaningLanguage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setNewSetData({
                ...newSetData,
                meaningLanguage: e.target.value,
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

        {/* Action Buttons */}
        <Pane display="flex" gap={12} marginTop={24}>
          <Button flex={1} onClick={handleClose} appearance="minimal">
            Cancel
          </Button>
          <Button
            flex={1}
            onClick={handleCreate}
            intent="success"
            disabled={!newSetData.name.trim()}
          >
            Create Set
          </Button>
        </Pane>
      </Pane>
    </SideSheet>
  );
};

export default CreateSetDialog;
