/**
 * Google Cloud Text-to-Speech service with WaveNet voices support
 */

import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export interface GoogleCloudTTSOptions {
  languageCode?: string;
  voiceName?: string;
  ssmlGender?: 'NEUTRAL' | 'MALE' | 'FEMALE';
  audioEncoding?: 'MP3' | 'LINEAR16' | 'OGG_OPUS';
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

class GoogleCloudTTSService {
  private client: TextToSpeechClient | null = null;
  private isInitialized = false;

  /**
   * Initialize the Google Cloud TTS client
   * @param apiKey - Google Cloud API key
   */
  async initialize(apiKey: string): Promise<void> {
    try {
      // Note: In production, you should use service account credentials
      // For now, we'll use the API key approach
      this.client = new TextToSpeechClient({
        apiKey: apiKey,
      });
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Google Cloud TTS:', error);
      throw new Error('Failed to initialize Google Cloud TTS service');
    }
  }

  /**
   * Check if the service is initialized
   */
  isServiceReady(): boolean {
    return this.isInitialized && this.client !== null;
  }

  /**
   * Get available WaveNet voices
   */
  async getAvailableVoices(): Promise<WaveNetVoice[]> {
    if (!this.isServiceReady()) {
      throw new Error('Google Cloud TTS service not initialized');
    }

    try {
      const [result] = await this.client!.listVoices({});

      // Filter for WaveNet voices (they have higher sample rates)
      const waveNetVoices =
        result.voices
          ?.filter(
            (voice) =>
              voice.naturalSampleRateHertz &&
              voice.naturalSampleRateHertz >= 24000
          )
          .map((voice) => ({
            name: voice.name || '',
            languageCode: voice.languageCodes?.[0] || '',
            ssmlGender: voice.ssmlGender || 'NEUTRAL',
            naturalSampleRateHertz: voice.naturalSampleRateHertz || 24000,
          })) || [];

      return waveNetVoices as WaveNetVoice[];
    } catch (error) {
      console.error('Failed to fetch voices:', error);
      throw new Error('Failed to fetch available voices');
    }
  }

  /**
   * Synthesize speech using Google Cloud TTS
   * @param text - Text to synthesize
   * @param options - TTS options
   * @returns Audio data as base64 string
   */
  async synthesizeSpeech(
    text: string,
    options: GoogleCloudTTSOptions = {}
  ): Promise<string> {
    if (!this.isServiceReady()) {
      throw new Error('Google Cloud TTS service not initialized');
    }

    try {
      const request = {
        input: { text },
        voice: {
          languageCode: options.languageCode || 'en-US',
          name: options.voiceName,
          ssmlGender: options.ssmlGender || 'NEUTRAL',
        },
        audioConfig: {
          audioEncoding: options.audioEncoding || 'MP3',
          speakingRate: options.speakingRate || 1.0,
          pitch: options.pitch || 0.0,
          volumeGainDb: options.volumeGainDb || 0.0,
        },
      };

      const [response] = await this.client!.synthesizeSpeech(request);

      if (!response.audioContent) {
        throw new Error('No audio content received from Google Cloud TTS');
      }

      // Convert to base64 for easy handling
      const audioData = Buffer.from(response.audioContent).toString('base64');
      return audioData;
    } catch (error) {
      console.error('Failed to synthesize speech:', error);
      throw new Error('Failed to synthesize speech with Google Cloud TTS');
    }
  }

  /**
   * Play synthesized speech
   * @param text - Text to synthesize and play
   * @param options - TTS options
   */
  async playSpeech(
    text: string,
    options: GoogleCloudTTSOptions = {}
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
export const googleCloudTTS = new GoogleCloudTTSService();
