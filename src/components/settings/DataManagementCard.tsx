import React, { useRef } from 'react';
import { Pane, Card, Text, Button } from 'evergreen-ui';

interface DataManagementCardProps {
  onBackup: () => void;
  onRestore?: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DataManagementCard: React.FC<DataManagementCardProps> = ({
  onBackup,
  onRestore: _onRestore,
  onFileUpload,
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
          <Card>
            <Pane padding={24}>
              <Text fontWeight={600} marginBottom={8}>
                Backup data
              </Text>
              <Text color="muted" marginBottom={16}>
                Export your vocabulary data
              </Text>
              <Button
                appearance="primary"
                intent="none"
                onClick={onBackup}
                width="100%"
              >
                Backup
              </Button>
            </Pane>
          </Card>
        </Pane>
        <Pane flex={1}>
          <Card>
            <Pane padding={24}>
              <Text fontWeight={600} marginBottom={8}>
                Restore data
              </Text>
              <Text color="muted" marginBottom={16}>
                Import vocabulary data from backup
              </Text>
              <Button
                appearance="primary"
                intent="warning"
                onClick={handleRestore}
                width="100%"
              >
                Restore
              </Button>
            </Pane>
          </Card>
        </Pane>
      </Pane>

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
