import React from 'react';
import { Bell } from 'lucide-react';
import SettingsSection from './SettingsSection';
import NotificationSettingsCard from './NotificationSettingsCard';
import type { UserSettings } from '@/types';

interface NotificationSectionProps {
  settings: UserSettings;
  onNotificationToggle: () => void;
  onNotificationTimeChange: (time: string) => void;
  onTestNotification?: () => void;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({
  settings,
  onNotificationToggle,
  onNotificationTimeChange,
  onTestNotification,
}) => {
  return (
    <SettingsSection icon={Bell} title="Notifications">
      <NotificationSettingsCard
        settings={settings}
        onNotificationToggle={onNotificationToggle}
        onNotificationTimeChange={onNotificationTimeChange}
        onTestNotification={onTestNotification}
      />
    </SettingsSection>
  );
};

export default NotificationSection;
