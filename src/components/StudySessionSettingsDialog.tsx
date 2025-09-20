import React, { useState } from 'react';
import {
  SideSheet,
  Pane,
  Text,
  Button,
  Switch,
  Select,
  Position,
} from 'evergreen-ui';
import { Volume2, Play, Smartphone, User, Gauge, Speaker } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  updateSettings,
  toggleSound,
  toggleVibration,
} from '@/store/slices/settingsSlice';
import { playAudio } from '@/utils/audioUtils';

interface StudySessionSettingsDialogProps {
  isShown: boolean;
  onClose: () => void;
}

const StudySessionSettingsDialog: React.FC<StudySessionSettingsDialogProps> = ({
  isShown,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((state) => state.settings);
  const [isTestingTTS, setIsTestingTTS] = useState(false);

  if (!settings) return null;

  const handleSoundToggle = () => {
    dispatch(toggleSound());
    dispatch(updateSettings({ enableSound: !settings.enableSound }));
  };

  const handleVibrationToggle = () => {
    dispatch(toggleVibration());
    dispatch(updateSettings({ enableVibration: !settings.enableVibration }));
  };

  const handleAutoPlayToggle = () => {
    dispatch(
      updateSettings({ autoPlayPronunciation: !settings.autoPlayPronunciation })
    );
  };

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
    <SideSheet
      position={Position.BOTTOM}
      isShown={isShown}
      onCloseComplete={onClose}
    >
      <Pane padding={24}>
        {/* Header */}
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingBottom={16}
          marginBottom={16}
          borderBottom="1px solid #E4E7EB"
        >
          <Text size={500} fontWeight={600}>
            Study Settings
          </Text>
        </Pane>

        {/* Sound Settings */}
        <Pane marginBottom={24}>
          <Text size={500} fontWeight={600} marginBottom={16} display="block">
            Sound & Vibration
          </Text>

          <Pane
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={16}
          >
            <Pane display="flex" alignItems="center">
              <Volume2
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text fontWeight={500}>Enable sound</Text>
            </Pane>
            <Switch
              checked={settings.enableSound}
              onChange={handleSoundToggle}
            />
          </Pane>

          <Pane
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={16}
          >
            <Pane display="flex" alignItems="center">
              <Smartphone
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text fontWeight={500}>Enable vibration</Text>
            </Pane>
            <Switch
              checked={settings.enableVibration}
              onChange={handleVibrationToggle}
            />
          </Pane>

          <Pane
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={0}
          >
            <Pane display="flex" alignItems="center">
              <Play
                size={16}
                style={{ marginRight: '8px', color: 'var(--text-muted)' }}
              />
              <Text fontWeight={500}>Auto-play pronunciation</Text>
            </Pane>
            <Switch
              checked={settings.autoPlayPronunciation}
              onChange={handleAutoPlayToggle}
            />
          </Pane>
        </Pane>

        {/* TTS Settings */}
        <Pane marginBottom={24}>
          <Text size={500} fontWeight={600} marginBottom={16} display="block">
            Text-to-Speech
          </Text>

          {/* Voice Gender */}
          <Pane
            marginBottom={16}
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
              maxWidth={150}
            >
              <option value="neutral">Neutral Voice</option>
              <option value="male">Male Voice</option>
              <option value="female">Female Voice</option>
            </Select>
          </Pane>

          {/* Speech Rate */}
          <Pane
            marginBottom={16}
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
              maxWidth={150}
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
          <Pane display="flex" justifyContent="end">
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

        {/* Action Buttons */}
        <Pane display="flex" gap={12} marginTop={24}>
          <Button flex={1} onClick={onClose} appearance="minimal">
            Done
          </Button>
        </Pane>
      </Pane>
    </SideSheet>
  );
};

export default StudySessionSettingsDialog;
