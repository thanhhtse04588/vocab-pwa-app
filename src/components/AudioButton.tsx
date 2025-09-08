import React from 'react';
import { Button, Tooltip } from 'evergreen-ui';
import { SpeakerHigh } from 'phosphor-react';
import { playAudio } from '@/utils/audioUtils';

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
  const handlePlayAudio = () => {
    if (text.trim()) {
      playAudio(text, { lang, rate, volume, pitch });
    }
  };

  return (
    <Tooltip content={tooltip}>
      <Button
        appearance={appearance}
        intent={intent}
        size={size}
        onClick={handlePlayAudio}
        disabled={disabled || !text.trim()}
        className={className}
      >
        <SpeakerHigh size={16} />
      </Button>
    </Tooltip>
  );
};

export default AudioButton;
