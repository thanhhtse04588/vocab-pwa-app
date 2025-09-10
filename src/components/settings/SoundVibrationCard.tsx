import React from 'react';
import { Pane, Card, Text, Switch } from 'evergreen-ui';
import { Volume2, Smartphone, Play } from 'lucide-react';
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
    <Card marginBottom={24} elevation={1}>
      <Pane padding={24}>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={20}
        >
          <Pane display="flex" alignItems="center">
            <Volume2
              size={16}
              style={{ marginRight: '8px', color: 'var(--text-muted)' }}
            />
            <Pane>
              <Text fontWeight={500}>Enable sound</Text>
              <Text size={300} color="muted">
                Audio feedback for interactions
              </Text>
            </Pane>
          </Pane>
          <Switch checked={settings.enableSound} onChange={onSoundToggle} />
        </Pane>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={20}
        >
          <Pane display="flex" alignItems="center">
            <Smartphone
              size={16}
              style={{ marginRight: '8px', color: 'var(--text-muted)' }}
            />
            <Pane>
              <Text fontWeight={500}>Enable vibration</Text>
              <Text size={300} color="muted">
                Haptic feedback on mobile
              </Text>
            </Pane>
          </Pane>
          <Switch
            checked={settings.enableVibration}
            onChange={onVibrationToggle}
          />
        </Pane>
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Pane display="flex" alignItems="center">
            <Play
              size={16}
              style={{ marginRight: '8px', color: 'var(--text-muted)' }}
            />
            <Pane>
              <Text fontWeight={500}>Auto-play pronunciation</Text>
              <Text size={300} color="muted">
                Automatically play word sounds
              </Text>
            </Pane>
          </Pane>
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
