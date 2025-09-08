import React from 'react';
import { Pane, Card, Text } from 'evergreen-ui';

const AppInfoCard: React.FC = () => {
  return (
    <Card marginBottom={24}>
      <Pane padding={24}>
        <Pane display="flex" gap={16}>
          <Pane flex={1}>
            <Text fontWeight={600} marginBottom={8}>
              Version: 1.0.0
            </Text>
            <Text fontWeight={600}>Build: PWA</Text>
          </Pane>
          <Pane flex={1}>
            <Text fontWeight={600} marginBottom={8}>
              Framework: Evergreen UI
            </Text>
            <Text fontWeight={600}>Storage: IndexedDB</Text>
          </Pane>
        </Pane>
      </Pane>
    </Card>
  );
};

export default AppInfoCard;
