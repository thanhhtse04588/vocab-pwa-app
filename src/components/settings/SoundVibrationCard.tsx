import React from 'react';
import { Pane, Card, Text, Switch } from 'evergreen-ui';
import type { UserSettings } from '@/types';

interface SoundVibrationCardProps {
  settings: UserSettings;
  onSoundToggle: () => void;
  onVibrationToggle: () => void;
  onAutoPlayToggle: () => void;
}

const SoundVibrationCard: React.FC<SoundVibrationCardProps> = ({
  settings,
  onSoundToggle,
  onVibrationToggle,
  onAutoPlayToggle,
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
          <Text>Enable sound</Text>
          <Switch checked={settings.enableSound} onChange={onSoundToggle} />
        </Pane>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={16}
        >
          <Text>Enable vibration</Text>
          <Switch
            checked={settings.enableVibration}
            onChange={onVibrationToggle}
          />
        </Pane>
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Text>Auto-play pronunciation</Text>
          <Switch
            checked={settings.autoPlayPronunciation}
            onChange={onAutoPlayToggle}
          />
        </Pane>
      </Pane>
    </Card>
  );
};

export default SoundVibrationCard;
