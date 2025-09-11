import React from 'react';
import { Volume2 } from 'lucide-react';
import SettingsSection from './SettingsSection';
import SoundVibrationCard from './SoundVibrationCard';
import type { UserSettings } from '@/types';

interface SoundVibrationSectionProps {
  settings: UserSettings;
  onSoundToggle: () => void;
  onVibrationToggle: () => void;
  onAutoPlayToggle: () => void;
}

const SoundVibrationSection: React.FC<SoundVibrationSectionProps> = ({
  settings,
  onSoundToggle,
  onVibrationToggle,
  onAutoPlayToggle,
}) => {
  return (
    <SettingsSection icon={Volume2} title="Sound & Vibration">
      <SoundVibrationCard
        settings={settings}
        onSoundToggle={onSoundToggle}
        onVibrationToggle={onVibrationToggle}
        onAutoPlayToggle={onAutoPlayToggle}
      />
    </SettingsSection>
  );
};

export default SoundVibrationSection;
