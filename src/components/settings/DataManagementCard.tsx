import React, { useRef } from 'react';
import { Pane, Card, Text, Button } from 'evergreen-ui';
import { Download, Upload, Trash2, Music } from 'lucide-react';

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
      <Pane display="flex" gap={16} marginBottom={24}>
        <Pane flex={1}>
          <Card elevation={1}>
            <Pane padding={24}>
              <Pane display="flex" alignItems="center" marginBottom={12}>
                <Download
                  size={20}
                  style={{ marginRight: '8px', color: '#0066cc' }}
                />
                <Text fontWeight={600}>Backup data</Text>
              </Pane>
              <Text color="muted">
                Export your vocabulary data to a JSON file
              </Text>
              <Button
                appearance="primary"
                intent="none"
                onClick={onBackup}
                width="100%"
                iconBefore={<Download size={16} />}
                marginTop={12}
              >
                Backup
              </Button>
            </Pane>
          </Card>
        </Pane>
        <Pane flex={1}>
          <Card elevation={1}>
            <Pane padding={24}>
              <Pane display="flex" alignItems="center" marginBottom={12}>
                <Upload
                  size={20}
                  style={{ marginRight: '8px', color: '#ff8800' }}
                />
                <Text fontWeight={600}>Restore data</Text>
              </Pane>
              <Text color="muted" marginBottom={16}>
                Import vocabulary data from backup file
              </Text>
              <Button
                appearance="primary"
                intent="warning"
                onClick={handleRestore}
                width="100%"
                iconBefore={<Upload size={16} />}
                marginTop={12}
              >
                Restore
              </Button>
            </Pane>
          </Card>
        </Pane>
      </Pane>

      {/* Audio Cache Management - Full Width */}
      {onClearAudioCache && (
        <Card elevation={1} marginBottom={24}>
          <Pane padding={24}>
            <Pane display="flex" alignItems="center" marginBottom={12}>
              <Music
                size={20}
                style={{ marginRight: '8px', color: '#8b5cf6' }}
              />
              <Text fontWeight={600}>Audio Cache</Text>
            </Pane>
            <Pane
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Pane flex={1}>
                <Text color="muted">
                  {audioCacheStats || 'Cache: 0 items, 0 B'}
                </Text>
              </Pane>
              <Pane marginLeft={16}>
                <Button
                  appearance="outline"
                  intent="danger"
                  onClick={onClearAudioCache}
                  iconBefore={<Trash2 size={16} />}
                >
                  Clear Audio Cache
                </Button>
              </Pane>
            </Pane>
          </Pane>
        </Card>
      )}

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
