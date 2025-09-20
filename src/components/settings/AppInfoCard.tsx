import React from 'react';
import { Pane, Card, Text } from 'evergreen-ui';
import { Code, Smartphone, Layers, Database, Clock } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// Configure dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('vi');

const AppInfoCard: React.FC = () => {
  // Get build time from build-info.json or use current time as fallback
  let buildTime = dayjs().toISOString();

  // Try to get build time from environment variable first
  if (import.meta.env.VITE_BUILD_TIME) {
    buildTime = import.meta.env.VITE_BUILD_TIME;
  }

  const formattedDate = dayjs(buildTime)
    .tz('Asia/Ho_Chi_Minh')
    .format('DD/MM/YYYY HH:mm');

  return (
    <Card marginBottom={24}>
      <Pane>
        <Pane display="flex" gap={12}>
          <Pane flex={1}>
            <Pane display="flex" alignItems="center" marginBottom={12}>
              <Code
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text fontWeight={600}>Version: 1.0.0</Text>
            </Pane>
            <Pane display="flex" alignItems="center" marginBottom={12}>
              <Clock
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text fontWeight={600} size={300}>
                Deploy: {formattedDate}
              </Text>
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
