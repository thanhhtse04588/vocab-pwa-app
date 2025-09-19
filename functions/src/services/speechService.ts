/**
 * Google Cloud Speech-to-Text Service
 * Handles speech recognition using Google Cloud Speech-to-Text API
 */

import { SpeechClient } from '@google-cloud/speech';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';

// Initialize the Speech client
const speechClient = new SpeechClient();

/**
 * Cloud function to convert speech audio to text
 * @param data - Request data containing audio data and language code
 * @returns Promise with the transcribed text
 */
export const speechToText = onCall(
  {
    region: 'us-central1',
    memory: '256MiB',
    timeoutSeconds: 30,
  },
  async (request) => {
    try {
      const { audioData, languageCode = 'en-US' } = request.data;

      if (!audioData) {
        throw new HttpsError('invalid-argument', 'Audio data is required');
      }

      logger.info('Processing speech-to-text request', {
        languageCode,
        audioDataLength: audioData.length,
      });

      // Configure the recognition request
      const config = {
        encoding: 'WEBM_OPUS' as const,
        sampleRateHertz: 48000,
        languageCode: languageCode,
        enableAutomaticPunctuation: true,
        model: 'latest_long', // Use the latest long model for better accuracy
        useEnhanced: true, // Use enhanced model for better accuracy
      };

      const audio = {
        content: audioData,
      };

      const request_config = {
        config,
        audio,
      };

      // Perform the speech recognition
      const [response] = await speechClient.recognize(request_config);
      const transcription = response.results
        ?.map((result) => result.alternatives?.[0]?.transcript)
        .join(' ')
        .trim();

      if (!transcription) {
        throw new HttpsError('not-found', 'No speech detected in audio');
      }

      logger.info('Speech-to-text completed successfully', {
        transcriptionLength: transcription.length,
      });

      return {
        success: true,
        transcription,
        confidence: response.results?.[0]?.alternatives?.[0]?.confidence || 0,
      };
    } catch (error) {
      logger.error('Speech-to-text error:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }

      throw new HttpsError('internal', 'Failed to process speech audio');
    }
  }
);

/**
 * Cloud function to get supported languages for speech recognition
 * Returns a predefined list of commonly supported languages
 * @returns Promise with list of supported languages
 */
export const getSupportedLanguages = onCall(
  {
    region: 'us-central1',
    memory: '128MiB',
    timeoutSeconds: 10,
  },
  async () => {
    try {
      logger.info('Returning predefined supported languages for speech recognition');

      // Return a predefined list of commonly supported languages
      const supportedLanguages = [
        { languageCode: 'en-US', name: 'English (US)', supportLevel: 'GA' },
        { languageCode: 'en-GB', name: 'English (UK)', supportLevel: 'GA' },
        { languageCode: 'es-ES', name: 'Spanish (Spain)', supportLevel: 'GA' },
        { languageCode: 'es-MX', name: 'Spanish (Mexico)', supportLevel: 'GA' },
        { languageCode: 'fr-FR', name: 'French (France)', supportLevel: 'GA' },
        { languageCode: 'de-DE', name: 'German (Germany)', supportLevel: 'GA' },
        { languageCode: 'it-IT', name: 'Italian (Italy)', supportLevel: 'GA' },
        { languageCode: 'pt-BR', name: 'Portuguese (Brazil)', supportLevel: 'GA' },
        { languageCode: 'pt-PT', name: 'Portuguese (Portugal)', supportLevel: 'GA' },
        { languageCode: 'ru-RU', name: 'Russian (Russia)', supportLevel: 'GA' },
        { languageCode: 'ja-JP', name: 'Japanese (Japan)', supportLevel: 'GA' },
        { languageCode: 'ko-KR', name: 'Korean (South Korea)', supportLevel: 'GA' },
        { languageCode: 'zh-CN', name: 'Chinese (Simplified)', supportLevel: 'GA' },
        { languageCode: 'zh-TW', name: 'Chinese (Traditional)', supportLevel: 'GA' },
        { languageCode: 'ar-SA', name: 'Arabic (Saudi Arabia)', supportLevel: 'GA' },
        { languageCode: 'hi-IN', name: 'Hindi (India)', supportLevel: 'GA' },
        { languageCode: 'th-TH', name: 'Thai (Thailand)', supportLevel: 'GA' },
        { languageCode: 'vi-VN', name: 'Vietnamese (Vietnam)', supportLevel: 'GA' },
      ];

      logger.info('Successfully returned supported languages', {
        count: supportedLanguages.length,
      });

      return {
        success: true,
        languages: supportedLanguages,
      };
    } catch (error) {
      logger.error('Error returning supported languages:', error);
      throw new HttpsError('internal', 'Failed to return supported languages');
    }
  }
);

/**
 * Cloud function for streaming speech recognition (for real-time processing)
 * Note: This is a simplified version. For production, consider using streaming recognition
 * @param data - Request data containing audio chunks
 * @returns Promise with partial transcription results
 */
export const streamingSpeechToText = onCall(
  {
    region: 'us-central1',
    memory: '512MiB',
    timeoutSeconds: 60,
  },
  async (request) => {
    try {
      const { audioChunks, languageCode = 'en-US' } = request.data;

      if (!audioChunks || !Array.isArray(audioChunks)) {
        throw new HttpsError('invalid-argument', 'Audio chunks array is required');
      }

      logger.info('Processing streaming speech-to-text request', {
        languageCode,
        chunksCount: audioChunks.length,
      });

      // Configure the recognition request for streaming
      const config = {
        encoding: 'WEBM_OPUS' as const,
        sampleRateHertz: 48000,
        languageCode: languageCode,
        enableAutomaticPunctuation: true,
        model: 'latest_long',
        useEnhanced: true,
        enableWordTimeOffsets: true, // Enable word-level timestamps
      };

      // Combine audio chunks
      const combinedAudio = audioChunks.join('');
      const audio = {
        content: combinedAudio,
      };

      const request_config = {
        config,
        audio,
      };

      // Perform the speech recognition
      const [response] = await speechClient.recognize(request_config);
      
      const results = response.results?.map((result) => ({
        transcript: result.alternatives?.[0]?.transcript || '',
        confidence: result.alternatives?.[0]?.confidence || 0,
        words: result.alternatives?.[0]?.words?.map((word) => ({
          word: word.word || '',
          startTime: word.startTime?.seconds || 0,
          endTime: word.endTime?.seconds || 0,
        })) || [],
      })) || [];

      logger.info('Streaming speech-to-text completed successfully', {
        resultsCount: results.length,
      });

      return {
        success: true,
        results,
        finalTranscript: results.map(r => r.transcript).join(' ').trim(),
      };
    } catch (error) {
      logger.error('Streaming speech-to-text error:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }

      throw new HttpsError('internal', 'Failed to process streaming speech audio');
    }
  }
);
