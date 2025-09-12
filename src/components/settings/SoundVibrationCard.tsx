import { useAppDispatch } from '@/hooks/redux';
import { updateSettings } from '@/store/slices/settingsSlice';
import type { UserSettings } from '@/types';
import { Card, Pane, Select, Switch, Text, Button } from 'evergreen-ui';
import { Gauge, Play, Smartphone, User, Volume2, Speaker } from 'lucide-react';
import React, { useState } from 'react';
import { playAudio } from '@/utils/audioUtils';

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
  const dispatch = useAppDispatch();
  const [isTestingTTS, setIsTestingTTS] = useState(false);

  const handleTestTTS = async () => {
    if (isTestingTTS) return;

    setIsTestingTTS(true);
    try {
      await playAudio('Hello, this is a test of the text-to-speech system.', {
        lang: 'en-US',
        rate: settings.ttsRate || 1.0,
        gender: settings.ttsGender || 'neutral',
      });
    } catch (error) {
      console.error('Failed to play TTS test:', error);
    } finally {
      setIsTestingTTS(false);
    }
  };

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
            <Volume2
              size={16}
              style={{ marginRight: '8px', color: 'var(--text-muted)' }}
            />
            <Pane>
              <Text fontWeight={500}>Enable sound</Text>
            </Pane>
          </Pane>
          <Switch checked={settings.enableSound} onChange={onSoundToggle} />
        </Pane>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={24}
        >
          <Pane display="flex" alignItems="center">
            <Smartphone
              size={16}
              style={{ marginRight: '8px', color: 'var(--text-muted)' }}
            />
            <Pane>
              <Text fontWeight={500}>Enable vibration</Text>
            </Pane>
          </Pane>
          <Switch
            checked={settings.enableVibration}
            onChange={onVibrationToggle}
          />
        </Pane>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={24}
        >
          <Pane display="flex" alignItems="center">
            <Play
              size={16}
              style={{ marginRight: '8px', color: 'var(--text-muted)' }}
            />
            <Pane>
              <Text fontWeight={500}>Auto-play pronunciation</Text>
            </Pane>
          </Pane>
          <Switch
            checked={settings.autoPlayPronunciation}
            onChange={onAutoPlayToggle}
          />
        </Pane>

        {/* TTS Settings */}
        <Pane>
          <Text size={500} fontWeight={600} marginBottom={20} display="block">
            Text-to-Speech
          </Text>

          {/* Voice Gender */}
          <Pane
            marginBottom={20}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={16}
          >
            <Pane
              display="flex"
              alignItems="center"
              style={{ minWidth: '120px' }}
            >
              <User
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text size={400} fontWeight={500}>
                Voice Gender
              </Text>
            </Pane>
            <Select
              key={`gender-${settings.ttsGender}`}
              value={settings.ttsGender || 'neutral'}
              onChange={(e) => {
                const newGender = e.target.value as
                  | 'male'
                  | 'female'
                  | 'neutral';
                dispatch(updateSettings({ ttsGender: newGender }));
              }}
              maxWidth={130}
            >
              <option value="neutral">Neutral Voice</option>
              <option value="male">Male Voice</option>
              <option value="female">Female Voice</option>
            </Select>
          </Pane>

          {/* Speech Rate */}
          <Pane
            marginBottom={20}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={16}
          >
            <Pane
              display="flex"
              alignItems="center"
              style={{ minWidth: '120px' }}
            >
              <Gauge
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text size={400} fontWeight={500}>
                Speech Rate
              </Text>
            </Pane>
            <Select
              key={`rate-${settings.ttsRate}`}
              value={(settings.ttsRate || 1).toString()}
              onChange={(e) => {
                const newRate = parseFloat(e.target.value);
                dispatch(updateSettings({ ttsRate: newRate }));
              }}
              maxWidth={130}
            >
              <option value="0.5">0.5x (Very Slow)</option>
              <option value="0.75">0.75x (Slow)</option>
              <option value="1">1.0x (Normal)</option>
              <option value="1.25">1.25x (Fast)</option>
              <option value="1.5">1.5x (Very Fast)</option>
              <option value="2">2.0x (Extremely Fast)</option>
            </Select>
          </Pane>

          {/* Test TTS Button */}
          <Pane marginBottom={0} display="flex" justifyContent="end">
            <Button
              intent="none"
              size="small"
              onClick={handleTestTTS}
              disabled={isTestingTTS}
              iconBefore={<Speaker size={16} />}
            >
              {isTestingTTS ? 'Testing...' : 'Test sound'}
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </Card>
  );
};

export default SoundVibrationCard;
