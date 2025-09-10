import React, { useEffect } from 'react';
import {
  Dialog,
  Pane,
  Button,
  Spinner,
  Text,
  Card,
  Heading,
  Badge,
} from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  fetchPublicSets,
  downloadPublicSet,
} from '@/store/slices/vocabularySlice';

interface ImportPresetDialogProps {
  isShown: boolean;
  onClose: () => void;
}

interface PresetSet {
  id: string;
  name: string;
  sourceLanguage: string;
  targetLanguage: string;
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

  useEffect(() => {
    if (isShown) {
      dispatch(fetchPublicSets());
    }
  }, [isShown, dispatch]);

  const handleImport = async (id: string) => {
    await dispatch(downloadPublicSet(id));
    onClose();
  };

  return (
    <Dialog
      isShown={isShown}
      title="Import Preset Vocabulary Set"
      onCloseComplete={onClose}
      hasFooter={false}
    >
      <Pane>
        {publicLoading ? (
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={24}
          >
            <Spinner />
            <Text marginLeft={8}>Loading presets...</Text>
          </Pane>
        ) : (
          <Pane
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap={16}
            padding={16}
            maxHeight="60vh"
            overflowY="auto"
          >
            {publicSets.map((preset: PresetSet) => (
              <Card
                key={preset.id}
                elevation={1}
                padding={20}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                minHeight={140}
                hoverElevation={2}
                transition="all 0.2s ease"
              >
                <Pane>
                  <Heading size={500} marginBottom={8}>
                    {preset.name}
                  </Heading>

                  <Pane display="flex" alignItems="center" marginBottom={12}>
                    <Badge color="blue" marginRight={8}>
                      {preset.sourceLanguage}
                    </Badge>
                    <Text size={300} marginX={8}>
                      →
                    </Text>
                    <Badge color="green">{preset.targetLanguage}</Badge>
                  </Pane>

                  <Text size={400} color="muted">
                    {preset.wordCount} từ
                  </Text>
                </Pane>

                <Pane marginTop={16}>
                  <Button
                    appearance="primary"
                    onClick={() => handleImport(preset.id)}
                    width="100%"
                  >
                    Import
                  </Button>
                </Pane>
              </Card>
            ))}
          </Pane>
        )}
      </Pane>
    </Dialog>
  );
};

export default ImportPresetDialog;
