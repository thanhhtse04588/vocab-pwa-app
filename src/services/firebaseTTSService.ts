/**
 * Firebase Cloud Functions TTS service
 * Calls Firebase Cloud Functions instead of direct Google Cloud TTS API
 */

import { getFunctions, httpsCallable } from 'firebase/functions';
import { ensureFirebase } from './firebaseService';
import { audioCacheService, type AudioCacheOptions } from './audioCacheService';

export interface FirebaseTTSOptions {
  languageCode?: string;
  voiceName?: string;
  ssmlGender?: 'NEUTRAL' | 'MALE' | 'FEMALE';
  speakingRate?: number;
  pitch?: number;
  volumeGainDb?: number;
}

export interface WaveNetVoice {
  name: string;
  languageCode: string;
  ssmlGender: 'NEUTRAL' | 'MALE' | 'FEMALE';
  naturalSampleRateHertz: number;
}

interface FirebaseVoicesResponse {
  voices: WaveNetVoice[];
}

interface FirebaseSynthesizeResponse {
  success: boolean;
  audioContent: string;
}

class FirebaseTTSService {
  private functions: ReturnType<typeof getFunctions> | null = null;
  private synthesizeSpeechFunction: ReturnType<typeof httpsCallable> | null =
    null;
  private getVoicesFunction: ReturnType<typeof httpsCallable> | null = null;

  constructor() {
    this.initializeFunctions();
  }

  private initializeFunctions() {
    try {
      // Ensure Firebase is initialized
      ensureFirebase();
      // Specify the region where functions are deployed
      this.functions = getFunctions(undefined, 'asia-southeast1');
      this.synthesizeSpeechFunction = httpsCallable(
        this.functions,
        'synthesizeSpeech'
      );
      this.getVoicesFunction = httpsCallable(
        this.functions,
        'getAvailableVoices'
      );
    } catch (error) {
      // Functions will remain null, and methods will handle this gracefully
    }
  }

  /**
   * Check if the service is ready
   */
  isServiceReady(): boolean {
    return (
      this.functions !== null &&
      this.synthesizeSpeechFunction !== null &&
      this.getVoicesFunction !== null
    );
  }

  /**
   * Get available WaveNet voices from Firebase function
   */
  async getAvailableVoices(): Promise<WaveNetVoice[]> {
    if (!this.getVoicesFunction) {
      return [];
    }

    try {
      const result = await this.getVoicesFunction();
      return (result.data as FirebaseVoicesResponse).voices || [];
    } catch (error) {
      console.error('Failed to fetch voices from Firebase function:', error);
      throw new Error('Failed to fetch available voices');
    }
  }

  /**
   * Synthesize speech using Firebase Cloud Function with caching
   * @param text - Text to synthesize
   * @param options - TTS options
   * @returns Audio data as base64 string
   */
  async synthesizeSpeech(
    text: string,
    options: FirebaseTTSOptions = {}
  ): Promise<string> {
    if (!this.synthesizeSpeechFunction) {
      throw new Error(
        'Firebase TTS not available - please use Web Speech API instead'
      );
    }

    // Convert FirebaseTTSOptions to AudioCacheOptions
    const cacheOptions: AudioCacheOptions = {
      languageCode: options.languageCode || 'en-US',
      voiceName: options.voiceName,
      ssmlGender: options.ssmlGender || 'NEUTRAL',
      speakingRate: options.speakingRate || 1.0,
      pitch: options.pitch || 0.0,
      volumeGainDb: options.volumeGainDb || 0.0,
    };

    // Check cache first
    const cachedAudio = await audioCacheService.getCachedAudio(
      text,
      cacheOptions
    );
    if (cachedAudio) {
      return cachedAudio;
    }

    try {
      const result = await this.synthesizeSpeechFunction({
        text,
        languageCode: options.languageCode || 'en-US',
        voiceName: options.voiceName,
        ssmlGender: options.ssmlGender || 'NEUTRAL',
        speakingRate: options.speakingRate || 1.0,
        pitch: options.pitch || 0.0,
        volumeGainDb: options.volumeGainDb || 0.0,
      });

      const response = result.data as FirebaseSynthesizeResponse;
      if (!response.success || !response.audioContent) {
        throw new Error('Failed to synthesize speech');
      }

      // Cache the audio data
      await audioCacheService.setCachedAudio(
        text,
        response.audioContent,
        cacheOptions
      );

      return response.audioContent;
    } catch (error) {
      console.error(
        'Failed to synthesize speech via Firebase function:',
        error
      );
      throw new Error('Failed to synthesize speech with Firebase TTS');
    }
  }

  /**
   * Play synthesized speech
   * @param text - Text to synthesize and play
   * @param options - TTS options
   */
  async playSpeech(
    text: string,
    options: FirebaseTTSOptions = {}
  ): Promise<void> {
    try {
      const audioData = await this.synthesizeSpeech(text, options);

      // Create audio element and play
      const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
      await audio.play();
    } catch (error) {
      console.error('Failed to play speech:', error);
      throw error;
    }
  }

  /**
   * Get popular WaveNet voices for common languages
   */
  getPopularWaveNetVoices(): WaveNetVoice[] {
    return [
      // English voices
      {
        name: 'en-US-Wavenet-A',
        languageCode: 'en-US',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'en-US-Wavenet-B',
        languageCode: 'en-US',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'en-US-Wavenet-C',
        languageCode: 'en-US',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'en-US-Wavenet-D',
        languageCode: 'en-US',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'en-US-Wavenet-E',
        languageCode: 'en-US',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'en-US-Wavenet-F',
        languageCode: 'en-US',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },

      // Spanish voices
      {
        name: 'es-ES-Wavenet-A',
        languageCode: 'es-ES',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'es-ES-Wavenet-B',
        languageCode: 'es-ES',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'es-ES-Wavenet-C',
        languageCode: 'es-ES',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },

      // French voices
      {
        name: 'fr-FR-Wavenet-A',
        languageCode: 'fr-FR',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'fr-FR-Wavenet-B',
        languageCode: 'fr-FR',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'fr-FR-Wavenet-C',
        languageCode: 'fr-FR',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },

      // German voices
      {
        name: 'de-DE-Wavenet-A',
        languageCode: 'de-DE',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'de-DE-Wavenet-B',
        languageCode: 'de-DE',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'de-DE-Wavenet-C',
        languageCode: 'de-DE',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },

      // Italian voices
      {
        name: 'it-IT-Wavenet-A',
        languageCode: 'it-IT',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'it-IT-Wavenet-B',
        languageCode: 'it-IT',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },

      // Portuguese voices
      {
        name: 'pt-PT-Wavenet-A',
        languageCode: 'pt-PT',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'pt-PT-Wavenet-B',
        languageCode: 'pt-PT',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },

      // Japanese voices
      {
        name: 'ja-JP-Wavenet-A',
        languageCode: 'ja-JP',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'ja-JP-Wavenet-B',
        languageCode: 'ja-JP',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'ja-JP-Wavenet-C',
        languageCode: 'ja-JP',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },

      // Korean voices
      {
        name: 'ko-KR-Wavenet-A',
        languageCode: 'ko-KR',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'ko-KR-Wavenet-B',
        languageCode: 'ko-KR',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },

      // Chinese voices
      {
        name: 'cmn-CN-Wavenet-A',
        languageCode: 'cmn-CN',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'cmn-CN-Wavenet-B',
        languageCode: 'cmn-CN',
        ssmlGender: 'FEMALE',
        naturalSampleRateHertz: 24000,
      },
      {
        name: 'cmn-CN-Wavenet-C',
        languageCode: 'cmn-CN',
        ssmlGender: 'MALE',
        naturalSampleRateHertz: 24000,
      },
    ];
  }
}

// Export singleton instance
export const firebaseTTSService = new FirebaseTTSService();
