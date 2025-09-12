import React, { useState, useEffect } from 'react';
import {
  Card,
  Text,
  Button,
  Select,
  TextInput,
  Alert,
  Spinner,
} from 'evergreen-ui';
import { firebaseTTSService } from '@/services/firebaseTTSService';
import { useAppSelector } from '@/hooks/redux';

const FirebaseTTSTestComponent: React.FC = () => {
  const { settings } = useAppSelector((state) => state.settings);
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [testText, setTestText] = useState(
    'Hello, this is a test of Firebase TTS integration.'
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingVoices, setIsLoadingVoices] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    setIsLoadingVoices(true);
    setError(null);

    try {
      const voices = await firebaseTTSService.getAvailableVoices();
      setAvailableVoices(voices);
      console.log('Loaded voices:', voices);
    } catch (error) {
      console.error('Failed to load voices:', error);
      setError('Failed to load voices from Firebase function');
    } finally {
      setIsLoadingVoices(false);
    }
  };

  const handleTestVoice = async () => {
    if (!testText.trim()) return;

    setIsPlaying(true);
    setError(null);

    try {
      await firebaseTTSService.playSpeech(testText, {
        languageCode: settings?.ttsLanguage || 'en-US',
        voiceName: selectedVoice || settings?.ttsVoice || '',
        speakingRate: settings?.ttsRate || 1.0,
        pitch: settings?.ttsPitch || 0.0,
        volumeGainDb: (settings?.ttsVolume || 1.0) * 6 - 6, // Convert 0-1 to -6 to 0 dB
      });
      console.log('TTS test completed successfully');
    } catch (error) {
      console.error('Failed to play audio:', error);
      setError('Failed to play audio via Firebase function');
    } finally {
      setIsPlaying(false);
    }
  };

  const getVoiceDisplayName = (voice: any) => {
    const parts = voice.name.split('-');
    const language = parts[0] + '-' + parts[1];
    const gender =
      voice.ssmlGender === 'MALE'
        ? 'Male'
        : voice.ssmlGender === 'FEMALE'
        ? 'Female'
        : 'Neutral';
    return `${language} ${gender} (WaveNet)`;
  };

  return (
    <Card padding={16} margin={16}>
      <Text size={500} fontWeight={600} marginBottom={16}>
        Firebase TTS Test Component
      </Text>

      {error && (
        <Alert intent="danger" title="Error" marginBottom={16}>
          {error}
        </Alert>
      )}

      <div style={{ marginBottom: 16 }}>
        <Text size={400} fontWeight={500} marginBottom={8} display="block">
          Test Text
        </Text>
        <TextInput
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Enter text to test..."
          width="100%"
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text size={400} fontWeight={500} marginBottom={8} display="block">
          Voice ({availableVoices.length} available)
        </Text>
        {isLoadingVoices ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Spinner size={16} />
            <Text size={300}>Loading voices from Firebase...</Text>
          </div>
        ) : (
          <Select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            width="100%"
          >
            <option value="">Default Voice</option>
            {availableVoices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {getVoiceDisplayName(voice)}
              </option>
            ))}
          </Select>
        )}
        <Button
          appearance="minimal"
          size="small"
          onClick={loadVoices}
          marginTop={8}
        >
          Refresh Voices
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text size={400} fontWeight={500} marginBottom={8} display="block">
          Current Settings
        </Text>
        <Text size={300} color="muted">
          Provider: WaveNet (Firebase TTS)
          <br />
          Language: {settings?.ttsLanguage || 'en-US'}
          <br />
          Rate: {settings?.ttsRate || 0.8}x<br />
          Pitch: {settings?.ttsPitch || 1.0}
          <br />
          Volume: {Math.round((settings?.ttsVolume || 1.0) * 100)}%
        </Text>
      </div>

      <Button
        intent="primary"
        onClick={handleTestVoice}
        disabled={isPlaying || !testText.trim()}
        width="100%"
        iconBefore={isPlaying ? <Spinner size={16} /> : undefined}
      >
        {isPlaying ? 'Playing...' : 'Test Firebase TTS'}
      </Button>

      <Alert intent="info" title="Firebase TTS Integration" marginTop={16}>
        This component tests the Firebase Cloud Functions integration for Google
        Cloud TTS. Make sure your Firebase functions are deployed and properly
        configured.
      </Alert>
    </Card>
  );
};

export default FirebaseTTSTestComponent;
