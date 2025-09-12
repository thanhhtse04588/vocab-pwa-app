import React, { useState } from 'react';
import { Button, Tooltip } from 'evergreen-ui';
import { SpeakerHigh } from 'phosphor-react';
import { playAudio } from '@/utils/audioUtils';
import { useAppSelector } from '@/hooks/redux';
import { getTTSLanguageCode } from '@/utils/languageMapping';

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
  gender?: 'male' | 'female' | 'neutral';
  targetLanguage?: string; // Language code from vocabulary set (e.g., 'en', 'vi', 'ja')
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
  gender,
  targetLanguage,
}) => {
  const { settings } = useAppSelector((state) => state.settings);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async () => {
    if (text.trim() && !isPlaying) {
      setIsPlaying(true);
      try {
        // Determine the language to use for TTS
        let ttsLanguage: string;
        if (lang) {
          // If lang is explicitly provided, use it
          ttsLanguage = lang;
        } else if (targetLanguage) {
          // If targetLanguage is provided, convert it to TTS language code
          ttsLanguage = getTTSLanguageCode(targetLanguage);
        } else {
          // Fall back to default
          ttsLanguage = 'en-US';
        }

        // Use settings if no specific options provided
        const audioOptions = {
          lang: ttsLanguage,
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
