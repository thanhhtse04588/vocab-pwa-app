import React from 'react';
import { Pane, Card, Text, Switch } from 'evergreen-ui';
import type { UserSettings } from '@/types';

interface NotificationSettingsCardProps {
  settings: UserSettings;
  onNotificationToggle: () => void;
  onNotificationTimeChange: (time: string) => void;
}

const NotificationSettingsCard: React.FC<NotificationSettingsCardProps> = ({
  settings,
  onNotificationToggle,
  onNotificationTimeChange,
}) => {
  return (
    <Card marginBottom={24}>
      <Pane padding={24}>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={16}
        >
          <Text>Enable notifications</Text>
          <Switch
            checked={settings.enableNotifications}
            onChange={onNotificationToggle}
          />
        </Pane>
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Text>Notification time</Text>
          <input
            type="time"
            value={settings.notificationTime}
            onChange={(e) => onNotificationTimeChange(e.target.value)}
            className="form-input"
            style={{
              padding: '8px 12px',
              fontSize: '14px',
            }}
          />
        </Pane>
      </Pane>
    </Card>
  );
};

export default NotificationSettingsCard;
