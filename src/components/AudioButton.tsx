import { useAppSelector } from '@/hooks/redux';
import { playAudio } from '@/utils/audioUtils';
import { Button } from 'evergreen-ui';
import { SpeakerHigh } from 'phosphor-react';
import React, { useState } from 'react';

interface AudioButtonProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  appearance?: 'minimal' | 'primary' | 'default';
  intent?: 'none' | 'success' | 'warning' | 'danger';
  className?: string;
  disabled?: boolean;
  lang?: string;
  rate?: number;
  gender?: 'male' | 'female' | 'neutral';
}

const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'small',
  appearance = 'minimal',
  intent = 'none',
  className,
  disabled = false,
  lang,
  rate,
  gender,
}) => {
  const { settings } = useAppSelector((state) => state.settings);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async () => {
    if (text.trim() && !isPlaying) {
      setIsPlaying(true);
      try {
        // Use settings if no specific options provided
        const audioOptions = {
          lang: lang || 'en-US',
          rate: rate || settings?.ttsRate || 1.0,
          gender: gender || settings?.ttsGender || 'neutral',
        };

        await playAudio(text, audioOptions);
      } catch (error) {
        console.error('Failed to play audio:', error);
      } finally {
        setIsPlaying(false);
      }
    }
  };

  return (
    <Button
      appearance={appearance}
      intent={intent}
      size={size}
      onClick={handlePlayAudio}
      disabled={disabled || !text.trim() || isPlaying}
      className={className}
    >
      <SpeakerHigh size={16} />
    </Button>
  );
};

export default AudioButton;
