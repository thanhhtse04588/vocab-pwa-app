/**
 * Enhanced audio service supporting both Web Speech API and Google Cloud TTS
 */

// Removed circular dependency - Web Speech API implementation moved inline
import {
  firebaseTTSService,
  type FirebaseTTSOptions,
} from './firebaseTTSService';

export type TTSProvider = 'web-speech' | 'google-cloud';

export interface AudioServiceOptions {
  provider?: TTSProvider;
  lang?: string;
  rate?: number;
  gender?: 'male' | 'female' | 'neutral';
  voiceName?: string;
  ssmlGender?: 'NEUTRAL' | 'MALE' | 'FEMALE';
  audioEncoding?: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
  volumeGainDb?: number;
  // Legacy support for Web Speech API
  pitch?: number;
  volume?: number;
}

export interface VoiceInfo {
  name: string;
  languageCode: string;
  provider: TTSProvider;
  ssmlGender?: 'NEUTRAL' | 'MALE' | 'FEMALE';
  naturalSampleRateHertz?: number;
}

class AudioService {
  private currentProvider: TTSProvider = 'google-cloud'; // Default to WaveNet
  private isFirebaseTTSInitialized = false;

  /**
   * Initialize the audio service
   */
  async initialize(): Promise<void> {
    try {
      // Firebase TTS is always ready, no initialization needed
      this.isFirebaseTTSInitialized = true;
    } catch (error) {
      this.isFirebaseTTSInitialized = false;
    }
  }

  /**
   * Set the TTS provider (always defaults to google-cloud for WaveNet)
   * @param _provider - TTS provider to use (ignored, always uses google-cloud)
   */
  setProvider(_provider: TTSProvider): void {
    // Always use google-cloud (WaveNet) as primary provider
    this.currentProvider = 'google-cloud';
  }

  /**
   * Get current TTS provider
   */
  getCurrentProvider(): TTSProvider {
    return this.currentProvider;
  }

  /**
   * Check if Firebase TTS is available
   */
  isFirebaseTTSAvailable(): boolean {
    return this.isFirebaseTTSInitialized && firebaseTTSService.isServiceReady();
  }

  /**
   * Play audio using WaveNet with Web Speech API fallback
   * @param text - Text to speak
   * @param options - Audio options
   */
  async playAudio(
    text: string,
    options: AudioServiceOptions = {}
  ): Promise<void> {
    // Always try WaveNet first, then fallback to Web Speech API
    try {
      if (this.isFirebaseTTSAvailable()) {
        await this.playWithFirebaseTTS(text, {
          ...options,
          lang: options.lang || 'en-US', // Default to English
          ssmlGender: this.convertGenderToSSML(options.gender || 'neutral'),
        });
      } else {
        throw new Error('Firebase TTS not available');
      }
    } catch (error) {
      console.error('Failed to play audio with WaveNet:', error);

      await this.playWithWebSpeech(text, {
        ...options,
        lang: options.lang || 'en-US', // Default to English
        pitch: this.convertGenderToPitch(options.gender || 'neutral'), // Convert gender to pitch
      });
    }
  }

  /**
   * Play audio using Firebase TTS
   * @param text - Text to speak
   * @param options - Audio options
   */
  private async playWithFirebaseTTS(
    text: string,
    options: AudioServiceOptions
  ): Promise<void> {
    if (!this.isFirebaseTTSAvailable()) {
      throw new Error('Firebase TTS not available');
    }

    // Map simple voice selection to actual voice names
    let voiceName = options.voiceName || '';
    let ssmlGender: 'NEUTRAL' | 'MALE' | 'FEMALE' = 'NEUTRAL';

    // Check both voiceName and gender for mapping
    const voiceType = options.voiceName || options.gender;

    if (voiceType === 'male') {
      voiceName = 'en-US-Wavenet-D'; // Male voice
      ssmlGender = 'MALE';
    } else if (voiceType === 'female') {
      voiceName = 'en-US-Wavenet-C'; // Female voice
      ssmlGender = 'FEMALE';
    }

    const firebaseOptions: FirebaseTTSOptions = {
      languageCode: options.lang || 'en-US',
      voiceName: voiceName,
      ssmlGender: ssmlGender,
      speakingRate: options.rate || 1.0,
      pitch: options.pitch || 0.0,
      volumeGainDb: options.volumeGainDb || 0.0,
    };

    await firebaseTTSService.playSpeech(text, firebaseOptions);
  }

  /**
   * Play audio using Web Speech API
   * @param text - Text to speak
   * @param options - Audio options
   */
  private async playWithWebSpeech(
    text: string,
    options: AudioServiceOptions
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Stop any current speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang || 'en-US';
      utterance.rate = options.rate || 0.8;
      utterance.volume = options.volume || 1.0;
      utterance.pitch = options.pitch || 1.0;

      // Set voice if specified
      if (options.voiceName) {
        const voices = speechSynthesis.getVoices();
        const selectedVoice = voices.find(
          (voice) => voice.name === options.voiceName
        );
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) =>
        reject(new Error(`Speech synthesis error: ${event.error}`));

      speechSynthesis.speak(utterance);
    });
  }

  /**
   * Stop current audio playback
   */
  stopAudio(): void {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    // Note: Google Cloud TTS doesn't have a direct stop method for audio elements
    // The browser will handle stopping when new audio starts
  }

  /**
   * Get available voices for the specified provider
   * @param provider - TTS provider to get voices for (optional, uses current provider if not specified)
   */
  async getAvailableVoices(provider?: TTSProvider): Promise<VoiceInfo[]> {
    const targetProvider = provider || this.currentProvider;

    if (targetProvider === 'google-cloud' && this.isFirebaseTTSAvailable()) {
      try {
        const firebaseVoices = await firebaseTTSService.getAvailableVoices();
        return firebaseVoices.map((voice) => ({
          ...voice,
          provider: 'google-cloud' as TTSProvider,
        }));
      } catch (error) {
        console.error('Failed to get Firebase TTS voices:', error);
        return [];
      }
    } else {
      // Return Web Speech API voices
      const webVoices = window.speechSynthesis?.getVoices() || [];
      return webVoices.map((voice) => ({
        name: voice.name,
        languageCode: voice.lang,
        provider: 'web-speech' as TTSProvider,
        ssmlGender: undefined,
        naturalSampleRateHertz: undefined,
      }));
    }
  }

  /**
   * Get popular WaveNet voices (for UI display)
   */
  getPopularWaveNetVoices(): VoiceInfo[] {
    const voices = firebaseTTSService.getPopularWaveNetVoices();
    return voices.map((voice) => ({
      ...voice,
      provider: 'google-cloud' as TTSProvider,
    }));
  }

  /**
   * Check if audio is supported
   */
  isAudioSupported(): boolean {
    return 'speechSynthesis' in window || this.isFirebaseTTSAvailable();
  }

  /**
   * Get voice display name for UI
   * @param voice - Voice information
   */
  getVoiceDisplayName(voice: VoiceInfo): string {
    if (voice.provider === 'google-cloud') {
      // Extract a more readable name from Google Cloud voice names
      const parts = voice.name.split('-');
      const language = parts[0] + '-' + parts[1];
      const gender =
        voice.ssmlGender === 'MALE'
          ? 'Male'
          : voice.ssmlGender === 'FEMALE'
          ? 'Female'
          : 'Neutral';
      return `${language} ${gender} (WaveNet)`;
    } else {
      return `${voice.name} (${voice.languageCode})`;
    }
  }

  /**
   * Get language display name
   * @param languageCode - Language code (e.g., 'en-US')
   */
  getLanguageDisplayName(languageCode: string): string {
    const languageNames: Record<string, string> = {
      'en-US': 'English (US)',
      'en-GB': 'English (UK)',
      'es-ES': 'Spanish (Spain)',
      'es-MX': 'Spanish (Mexico)',
      'fr-FR': 'French (France)',
      'de-DE': 'German (Germany)',
      'it-IT': 'Italian (Italy)',
      'pt-PT': 'Portuguese (Portugal)',
      'pt-BR': 'Portuguese (Brazil)',
      'ja-JP': 'Japanese (Japan)',
      'ko-KR': 'Korean (South Korea)',
      'cmn-CN': 'Chinese (Mandarin)',
      'zh-CN': 'Chinese (Simplified)',
      'zh-TW': 'Chinese (Traditional)',
    };

    return languageNames[languageCode] || languageCode;
  }

  /**
   * Convert gender to SSML gender for Firebase TTS
   */
  private convertGenderToSSML(
    gender: 'male' | 'female' | 'neutral'
  ): 'NEUTRAL' | 'MALE' | 'FEMALE' {
    switch (gender) {
      case 'male':
        return 'MALE';
      case 'female':
        return 'FEMALE';
      case 'neutral':
      default:
        return 'NEUTRAL';
    }
  }

  /**
   * Convert gender to pitch for Web Speech API
   */
  private convertGenderToPitch(gender: 'male' | 'female' | 'neutral'): number {
    switch (gender) {
      case 'male':
        return 0.8; // Lower pitch for male voice
      case 'female':
        return 1.2; // Higher pitch for female voice
      case 'neutral':
      default:
        return 1.0; // Neutral pitch
    }
  }
}

// Export singleton instance
export const audioService = new AudioService();
