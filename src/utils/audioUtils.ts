/**
 * Audio utilities for text-to-speech functionality
 */

export interface AudioOptions {
  lang?: string;
  rate?: number;
  volume?: number;
  pitch?: number;
}

/**
 * Play audio for the given text using Web Speech API
 * @param text - The text to be spoken
 * @param options - Audio configuration options
 */
export const playAudio = (text: string, options: AudioOptions = {}): void => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser');
    return;
  }

  // Stop any current speech
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set default options
  utterance.lang = options.lang || 'en-US';
  utterance.rate = options.rate || 0.8;
  utterance.volume = options.volume || 1.0;
  utterance.pitch = options.pitch || 1.0;

  // Speak the text
  speechSynthesis.speak(utterance);
};

/**
 * Stop current speech synthesis
 */
export const stopAudio = (): void => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
};

/**
 * Check if speech synthesis is supported
 */
export const isAudioSupported = (): boolean => {
  return 'speechSynthesis' in window;
};

/**
 * Get available voices
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
export const playAudioWithVoice = (
  text: string, 
  voiceName: string, 
  options: AudioOptions = {}
): void => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser');
    return;
  }

  const voices = getAvailableVoices();
  const voice = voices.find(v => v.name === voiceName);
  
  if (!voice) {
    console.warn(`Voice "${voiceName}" not found, using default voice`);
    playAudio(text, options);
    return;
  }

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = options.lang || voice.lang;
  utterance.rate = options.rate || 0.8;
  utterance.volume = options.volume || 1.0;
  utterance.pitch = options.pitch || 1.0;

  speechSynthesis.speak(utterance);
};
