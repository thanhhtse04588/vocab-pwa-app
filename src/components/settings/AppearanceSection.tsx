import React from 'react';
import { Paintbrush } from 'lucide-react';
import { Card, Pane } from 'evergreen-ui';
import SettingsSection from './SettingsSection';
import ThemeToggle from '@/components/ThemeToggle';
import type { UserSettings } from '@/types';

interface AppearanceSectionProps {
  settings: UserSettings;
  onThemeChange: (theme: 'light' | 'dark' | 'auto') => void;
}

const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  settings,
  onThemeChange,
}) => {
  return (
    <SettingsSection icon={Paintbrush} title="Appearance">
      <Card marginBottom={24}>
        <Pane padding={24}>
          <ThemeToggle
            currentTheme={settings.theme}
            onThemeChange={onThemeChange}
          />
        </Pane>
      </Card>
    </SettingsSection>
  );
};

export default AppearanceSection;
