import React from 'react';
import { Pane, Card, Text } from 'evergreen-ui';
import { Code, Smartphone, Layers, Database } from 'lucide-react';

const AppInfoCard: React.FC = () => {
  return (
    <Card marginBottom={24}>
      <Pane>
        <Pane display="flex" gap={24}>
          <Pane flex={1}>
            <Pane display="flex" alignItems="center" marginBottom={12}>
              <Code
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text fontWeight={600}>Version: 1.0.0</Text>
            </Pane>
            <Pane display="flex" alignItems="center">
              <Smartphone
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text fontWeight={600}>PWA</Text>
            </Pane>
          </Pane>
          <Pane flex={1}>
            <Pane display="flex" alignItems="center" marginBottom={12}>
              <Layers
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text fontWeight={600}>Evergreen UI</Text>
            </Pane>
            <Pane display="flex" alignItems="center">
              <Database
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text fontWeight={600}>IndexedDB</Text>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </Card>
  );
};

export default AppInfoCard;
