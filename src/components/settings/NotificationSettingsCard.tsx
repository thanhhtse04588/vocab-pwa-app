import React from 'react';
import { Pane, Card, Text, Switch, Button } from 'evergreen-ui';
import { Bell, Clock, TestTube } from 'lucide-react';
import type { UserSettings } from '@/types';

interface NotificationSettingsCardProps {
  settings: UserSettings;
  onNotificationToggle: () => void;
  onNotificationTimeChange: (time: string) => void;
  onTestNotification?: () => void;
}

const NotificationSettingsCard: React.FC<NotificationSettingsCardProps> = ({
  settings,
  onNotificationToggle,
  onNotificationTimeChange,
  onTestNotification,
}) => {
  return (
    <Card marginBottom={0}>
      <Pane paddingX={24}>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={24}
        >
          <Pane display="flex" alignItems="center">
            <Bell
              size={16}
              style={{ marginRight: '8px', color: 'var(--text-muted)' }}
            />
            <Pane>
              <Text fontWeight={500}>Enable notifications</Text>
            </Pane>
          </Pane>
          <Switch
            checked={settings.enableNotifications}
            onChange={onNotificationToggle}
          />
        </Pane>
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Pane display="flex" alignItems="center">
            <Clock
              size={16}
              style={{ marginRight: '8px', color: 'var(--text-muted)' }}
            />
            <Pane>
              <Text fontWeight={500}>Notification time</Text>
            </Pane>
          </Pane>
          <input
            type="time"
            value={settings.notificationTime}
            onChange={(e) => onNotificationTimeChange(e.target.value)}
            className="form-input"
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
          />
        </Pane>

        {/* Test Notification Button */}
        {onTestNotification && (
          <Pane marginTop={16} marginBottom={24}>
            <Button
              iconBefore={<TestTube size={16} />}
              onClick={onTestNotification}
              appearance="outline"
              size="small"
            >
              Test Notification
            </Button>
            <Text size={300} color="muted" marginTop={8} display="block">
              Send a test notification to check if notifications are working
            </Text>
          </Pane>
        )}
      </Pane>
    </Card>
  );
};

export default NotificationSettingsCard;
