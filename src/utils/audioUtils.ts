/**
 * Audio utilities for text-to-speech functionality
 * This file provides backward compatibility with the old Web Speech API functions
 * while the new audioService handles both Web Speech API and Google Cloud TTS
 *
 * Note: This file now only provides wrapper functions to maintain backward compatibility.
 * The actual implementation is in audioService.ts to avoid circular dependencies.
 */

import {
  audioService,
  type AudioServiceOptions,
} from '@/services/audioService';

export interface AudioOptions {
  lang?: string;
  rate?: number;
  volume?: number;
  pitch?: number;
}

/**
 * Play audio for the given text using the configured TTS provider
 * @param text - The text to be spoken
 * @param options - Audio configuration options
 */
export const playAudio = async (
  text: string,
  options: AudioOptions = {}
): Promise<void> => {
  const audioOptions: AudioServiceOptions = {
    lang: options.lang,
    rate: options.rate,
    volume: options.volume,
    pitch: options.pitch,
  };

  await audioService.playAudio(text, audioOptions);
};

/**
 * Stop current speech synthesis
 */
export const stopAudio = (): void => {
  audioService.stopAudio();
};

/**
 * Check if speech synthesis is supported
 */
export const isAudioSupported = (): boolean => {
  return audioService.isAudioSupported();
};

/**
 * Get available voices
 * @deprecated Use audioService.getAvailableVoices() instead
 */
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (!('speechSynthesis' in window)) {
    return [];
  }
  return speechSynthesis.getVoices();
};

/**
 * Play audio with specific voice
 * @param text - The text to be spoken
 * @param voiceName - Name of the voice to use
 * @param options - Audio configuration options
 */
export const playAudioWithVoice = async (
  text: string,
  voiceName: string,
  options: AudioOptions = {}
): Promise<void> => {
  const audioOptions: AudioServiceOptions = {
    lang: options.lang,
    rate: options.rate,
    volume: options.volume,
    pitch: options.pitch,
    voiceName: voiceName,
  };

  await audioService.playAudio(text, audioOptions);
};
