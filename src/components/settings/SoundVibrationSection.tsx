import React from 'react';
import { Volume2 } from 'lucide-react';
import SettingsSection from './SettingsSection';
import SoundVibrationCard from './SoundVibrationCard';
import type { UserSettings } from '@/types';

interface SoundVibrationSectionProps {
  settings: UserSettings;
  onAutoPlayToggle: () => void;
}

const SoundVibrationSection: React.FC<SoundVibrationSectionProps> = ({
  settings,
  onAutoPlayToggle,
}) => {
  return (
    <SettingsSection icon={Volume2} title="Sound, Vibration & TTS">
      <SoundVibrationCard
        settings={settings}
        onAutoPlayToggle={onAutoPlayToggle}
      />
    </SettingsSection>
  );
};

export default SoundVibrationSection;
