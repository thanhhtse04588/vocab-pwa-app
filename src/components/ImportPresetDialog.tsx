import React, { useEffect } from 'react';
import {
  SideSheet,
  Pane,
  Button,
  Spinner,
  Text,
  Card,
  Heading,
  Badge,
  Position,
} from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  fetchPublicSets,
  downloadPublicSet,
} from '@/store/slices/vocabularySlice';
import { useState } from 'react';
import { SearchInput } from 'evergreen-ui';

interface ImportPresetDialogProps {
  isShown: boolean;
  onClose: () => void;
}

interface PresetSet {
  id: string;
  name: string;
  wordLanguage: string;
  meaningLanguage: string;
  wordCount: number;
}

const ImportPresetDialog: React.FC<ImportPresetDialogProps> = ({
  isShown,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { publicSets, publicLoading } = useAppSelector(
    (state) => state.vocabulary
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isShown) {
      dispatch(fetchPublicSets());
    }
  }, [isShown, dispatch]);

  const handleImport = async (id: string) => {
    await dispatch(downloadPublicSet(id));
    onClose();
  };

  const filteredSets = publicSets.filter(
    (preset: PresetSet) =>
      preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.wordLanguage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.meaningLanguage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SideSheet
      position={Position.BOTTOM}
      isShown={isShown}
      onCloseComplete={onClose}
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
            Import Preset Vocabulary Set
          </Text>
        </Pane>

        {publicLoading ? (
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={32}
          >
            <Spinner />
            <Text marginLeft={12} size={400}>
              Loading presets...
            </Text>
          </Pane>
        ) : (
          <>
            {/* Search Bar */}
            <Pane marginBottom={16}>
              <SearchInput
                placeholder="Search presets by name or language..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  if (value.length <= 126) {
                    setSearchQuery(value);
                  }
                }}
                width="100%"
                height={36}
                maxLength={126}
              />
            </Pane>

            {/* Presets Grid */}
            <Pane
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))"
              gap={12}
              maxHeight="60vh"
              overflowY="auto"
            >
              {filteredSets.length === 0 ? (
                <Pane
                  gridColumn="1 / -1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  padding={32}
                  textAlign="center"
                >
                  <Text size={400} color="muted">
                    {searchQuery
                      ? 'No presets found matching your search.'
                      : 'No presets available.'}
                  </Text>
                </Pane>
              ) : (
                filteredSets.map((preset: PresetSet) => (
                  <Card
                    key={preset.id}
                    elevation={1}
                    padding={12}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    minHeight={100}
                    hoverElevation={2}
                    transition="all 0.2s ease"
                    border="1px solid #E4E7EB"
                    borderRadius={6}
                  >
                    {/* Header */}
                    <Pane>
                      <Heading size={400} marginBottom={8} lineHeight={1.3}>
                        {preset.name}
                      </Heading>

                      {/* Language badges */}
                      <Pane
                        display="flex"
                        alignItems="center"
                        marginBottom={6}
                        flexWrap="wrap"
                        gap={3}
                      >
                        <Badge color="blue" size="small">
                          {preset.wordLanguage}
                        </Badge>
                        <Text size={300} marginX={4} color="muted">
                          →
                        </Text>
                        <Badge color="green" size="small">
                          {preset.meaningLanguage}
                        </Badge>
                      </Pane>

                      {/* Word count */}
                      <Text size={300} color="muted">
                        {preset.wordCount} words
                      </Text>
                    </Pane>

                    {/* Import button */}
                    <Pane marginTop={8}>
                      <Button
                        appearance="primary"
                        onClick={() => handleImport(preset.id)}
                        width="100%"
                        height={32}
                        size="small"
                      >
                        Import
                      </Button>
                    </Pane>
                  </Card>
                ))
              )}
            </Pane>
          </>
        )}
      </Pane>
    </SideSheet>
  );
};

export default ImportPresetDialog;
