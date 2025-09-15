/**
 * Text-to-Speech service using Google Cloud TTS
 */

import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { TTSRequest, TTSResponse, VoicesResponse, VoiceInfo } from '../types';

// Initialize Google Cloud TTS client with service account
// The service account key should be placed in functions/service-account-key.json
// or set GOOGLE_APPLICATION_CREDENTIALS environment variable
const ttsClient = new TextToSpeechClient({
  // Firebase Functions automatically provides credentials when deployed
  // For local development, ensure service-account-key.json is in the functions directory
});

/**
 * Synthesize speech using Google Cloud TTS
 */
export const synthesizeSpeech = onCall(
  { region: 'asia-southeast1' },
  async (request): Promise<TTSResponse> => {
    try {
      const {
        text,
        languageCode = 'en-US',
        voiceName,
        ssmlGender = 'NEUTRAL',
        speakingRate = 1.0,
        pitch = 0.0,
        volumeGainDb = 0.0,
      } = request.data as TTSRequest;

      // Validate input
      if (!text || text.trim().length === 0) {
        throw new HttpsError(
          'invalid-argument',
          'Text is required and cannot be empty'
        );
      }

      if (text.length > 5000) {
        throw new HttpsError(
          'invalid-argument',
          'Text is too long. Maximum 5000 characters allowed.'
        );
      }

      // Prepare the request
      const ttsRequest = {
        input: { text: text.trim() },
        voice: {
          languageCode,
          name: voiceName,
          ssmlGender,
        },
        audioConfig: {
          audioEncoding: 'MP3' as const,
          speakingRate,
          pitch,
          volumeGainDb,
        },
      };

      // Call Google Cloud TTS
      const [response] = await ttsClient.synthesizeSpeech(ttsRequest);

      if (!response.audioContent) {
        throw new HttpsError(
          'internal',
          'No audio content received from Google Cloud TTS'
        );
      }

      // Convert to base64
      const audioContent = Buffer.from(response.audioContent).toString(
        'base64'
      );

      return {
        audioContent,
        success: true,
      };
    } catch (error) {
      console.error('TTS synthesis error:', error);

      if (error instanceof HttpsError) {
        throw error;
      }

      throw new HttpsError('internal', 'Failed to synthesize speech');
    }
  }
);

/**
 * Get available voices from Google Cloud TTS
 */
export const getAvailableVoices = onCall(
  { region: 'asia-southeast1' },
  async (_request): Promise<VoicesResponse> => {
    try {
      const [result] = await ttsClient.listVoices({});

      // Filter for WaveNet voices (they have higher sample rates)
      const waveNetVoices: VoiceInfo[] =
        result.voices
          ?.filter(
            (voice) =>
              voice.naturalSampleRateHertz &&
              voice.naturalSampleRateHertz >= 24000
          )
          .map((voice) => ({
            name: voice.name || '',
            languageCode: voice.languageCodes?.[0] || '',
            ssmlGender:
              (voice.ssmlGender as 'NEUTRAL' | 'MALE' | 'FEMALE') || 'NEUTRAL',
            naturalSampleRateHertz: voice.naturalSampleRateHertz || 24000,
          })) || [];

      return {
        voices: waveNetVoices,
        success: true,
      };
    } catch (error) {
      console.error('Get voices error:', error);
      throw new HttpsError('internal', 'Failed to get available voices');
    }
  }
);
