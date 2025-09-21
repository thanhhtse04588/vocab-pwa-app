import { Button, Card, Pane, Text } from 'evergreen-ui';
import { Download, Music, Upload } from 'lucide-react';
import React, { useRef } from 'react';

interface DataManagementCardProps {
  onBackup: () => void;
  onRestore?: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearAudioCache?: () => void;
  audioCacheStats?: string;
}

const DataManagementCard: React.FC<DataManagementCardProps> = ({
  onBackup,
  onRestore: _onRestore,
  onFileUpload,
  onClearAudioCache,
  audioCacheStats,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRestore = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Card marginBottom={0}>
        <Pane paddingX={24}>
          {/* Backup Section */}
          <Pane
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={24}
          >
            <Pane display="flex" alignItems="center">
              <Download
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Pane>
                <Text fontWeight={500}>Backup data</Text>
                <Text size={300} color="muted" marginTop={4} display="block">
                  Export data to backup file
                </Text>
              </Pane>
            </Pane>
            <Button appearance="outline" intent="none" onClick={onBackup}>
              Export
            </Button>
          </Pane>

          {/* Restore Section */}
          <Pane
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={24}
          >
            <Pane display="flex" alignItems="center">
              <Upload
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Pane>
                <Text fontWeight={500}>Restore data</Text>
                <Text size={300} color="muted" marginTop={4} display="block">
                  Import data from backup file
                </Text>
              </Pane>
            </Pane>
            <Button
              appearance="outline"
              intent="warning"
              onClick={handleRestore}
            >
              Restore
            </Button>
          </Pane>

          {/* Audio Cache Section */}
          {onClearAudioCache && (
            <Pane
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={0}
            >
              <Pane display="flex" alignItems="center">
                <Music
                  size={16}
                  style={{ marginRight: '8px', color: 'var(--text-muted)' }}
                />
                <Pane>
                  <Text fontWeight={500}>Audio Cache</Text>
                  <Text size={300} color="muted" marginTop={4} display="block">
                    {audioCacheStats || 'Cache: 0 items, 0 B'}
                  </Text>
                </Pane>
              </Pane>
              <Button
                appearance="outline"
                intent="danger"
                onClick={onClearAudioCache}
              >
                Clear Cache
              </Button>
            </Pane>
          )}
        </Pane>
      </Card>

      {/* Hidden file input for restore */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={onFileUpload}
      />
    </>
  );
};

export default DataManagementCard;
