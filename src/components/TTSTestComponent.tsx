import React, { useState, useEffect } from 'react';
import { Card, Text, Button, Select, TextInput, Alert } from 'evergreen-ui';
import { audioService, type VoiceInfo } from '@/services/audioService';
import { useAppSelector } from '@/hooks/redux';

const TTSTestComponent: React.FC = () => {
  const { settings } = useAppSelector((state) => state.settings);
  const [availableVoices, setAvailableVoices] = useState<VoiceInfo[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [testText, setTestText] = useState(
    'Hello, this is a test of the text-to-speech system.'
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    try {
      const voices = await audioService.getAvailableVoices();
      setAvailableVoices(voices);
    } catch (error) {
      console.error('Failed to load voices:', error);
      setError('Failed to load voices');
    }
  };

  const handleTestVoice = async () => {
    if (!testText.trim()) return;

    setIsPlaying(true);
    setError(null);

    try {
      await audioService.playAudio(testText, {
        lang: 'en-US',
        voiceName: selectedVoice || '',
        rate: settings?.ttsRate || 1.0,
        gender: settings?.ttsGender || 'neutral',
      });
    } catch (error) {
      console.error('Failed to play audio:', error);
      setError('Failed to play audio');
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <Card padding={16} margin={16}>
      <Text size={500} fontWeight={600} marginBottom={16}>
        TTS Test Component
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
          Voice
        </Text>
        <Select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          width="100%"
        >
          <option value="">Default Voice</option>
          {availableVoices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {audioService.getVoiceDisplayName(voice)}
            </option>
          ))}
        </Select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text size={400} fontWeight={500} marginBottom={8} display="block">
          Current Settings
        </Text>
        <Text size={300} color="muted">
          Provider: WaveNet (with Web Speech API fallback)
          <br />
          Language: Auto-detect from vocabulary set
          <br />
          Rate: {settings?.ttsRate || 1.0}x<br />
          Gender: {settings?.ttsGender || 'neutral'}
        </Text>
      </div>

      <Button
        intent="primary"
        onClick={handleTestVoice}
        disabled={isPlaying || !testText.trim()}
        width="100%"
      >
        {isPlaying ? 'Playing...' : 'Test Voice'}
      </Button>

      <Button
        appearance="minimal"
        onClick={loadVoices}
        marginTop={8}
        width="100%"
      >
        Refresh Voices
      </Button>
    </Card>
  );
};

export default TTSTestComponent;
