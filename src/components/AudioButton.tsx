import React, { useState } from 'react';
import { Button, Tooltip } from 'evergreen-ui';
import { SpeakerHigh } from 'phosphor-react';
import { playAudio } from '@/utils/audioUtils';
import { useAppSelector } from '@/hooks/redux';

interface AudioButtonProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  appearance?: 'minimal' | 'primary' | 'default';
  intent?: 'none' | 'success' | 'warning' | 'danger';
  tooltip?: string;
  className?: string;
  disabled?: boolean;
  lang?: string;
  rate?: number;
  volume?: number;
  pitch?: number;
}

const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'small',
  appearance = 'minimal',
  intent = 'none',
  tooltip = 'Play pronunciation',
  className,
  disabled = false,
  lang,
  rate,
  volume,
  pitch,
}) => {
  const { settings } = useAppSelector((state) => state.settings);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async () => {
    if (text.trim() && !isPlaying) {
      setIsPlaying(true);
      try {
        // Use settings if no specific options provided
        const audioOptions = {
          lang: lang || settings?.ttsLanguage || 'en-US',
          rate: rate || settings?.ttsRate || 0.8,
          volume: volume || settings?.ttsVolume || 1.0,
          pitch: pitch || settings?.ttsPitch || 1.0,
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
    <Tooltip content={tooltip}>
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
    </Tooltip>
  );
};

export default AudioButton;
