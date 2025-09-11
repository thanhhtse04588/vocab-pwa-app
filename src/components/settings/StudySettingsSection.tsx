import React from 'react';
import { Book } from 'lucide-react';
import SettingsSection from './SettingsSection';
import StudySettingsCard from './StudySettingsCard';
import type { UserSettings } from '@/types';

interface StudySettingsSectionProps {
  settings: UserSettings;
  onBatchSizeChange: (value: number) => void;
}

const StudySettingsSection: React.FC<StudySettingsSectionProps> = ({
  settings,
  onBatchSizeChange,
}) => {
  return (
    <SettingsSection icon={Book} title="Study Settings">
      <StudySettingsCard
        settings={settings}
        onBatchSizeChange={onBatchSizeChange}
      />
    </SettingsSection>
  );
};

export default StudySettingsSection;
