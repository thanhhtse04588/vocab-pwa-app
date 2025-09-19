/**
 * Client-side Speech-to-Text Service
 * Handles audio recording and communication with cloud functions
 */

import { getFunctions, httpsCallable } from 'firebase/functions';

// Simple logger utility
const logger = {
  info: (message: string, data?: unknown) =>
    console.log(`[INFO] ${message}`, data || ''),
  warn: (message: string, data?: unknown) =>
    console.warn(`[WARN] ${message}`, data || ''),
  error: (message: string, data?: unknown) =>
    console.error(`[ERROR] ${message}`, data || ''),
};

interface SpeechToTextResult {
  success: boolean;
  transcription: string;
  confidence: number;
}

interface SupportedLanguage {
  languageCode: string;
  name: string;
  supportLevel: string;
}

interface SupportedLanguagesResult {
  success: boolean;
  languages: SupportedLanguage[];
}

class SpeechToTextService {
  private functions = getFunctions();
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private isRecording = false;

  /**
   * Check if the browser supports audio recording
   */
  isSupported(): boolean {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  /**
   * Start recording audio for speech recognition
   * @param onDataAvailable - Callback when audio data is available
   * @param onError - Callback for errors
   */
  async startRecording(
    onDataAvailable?: (chunk: Blob) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      if (this.isRecording) {
        throw new Error('Already recording');
      }

      if (!this.isSupported()) {
        throw new Error('Audio recording not supported in this browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 48000,
        },
      });

      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      this.audioChunks = [];
      this.isRecording = true;

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
          onDataAvailable?.(event.data);
        }
      };

      this.mediaRecorder.onerror = (event) => {
        const error = new Error(`Recording error: ${event}`);
        logger.error('MediaRecorder error:', error);
        onError?.(error);
      };

      this.mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        this.isRecording = false;
      };

      this.mediaRecorder.start(1000); // Collect data every second
      logger.info('Started audio recording');
    } catch (error) {
      logger.error('Failed to start recording:', error);
      onError?.(error as Error);
      throw error;
    }
  }

  /**
   * Stop recording audio
   */
  stopRecording(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      logger.info('Stopped audio recording');
    }
  }

  /**
   * Convert recorded audio to text using Google Cloud Speech-to-Text
   * @param languageCode - Language code for recognition (default: 'en-US')
   * @returns Promise with transcription result
   */
  async convertToText(
    languageCode: string = 'en-US'
  ): Promise<SpeechToTextResult> {
    try {
      if (this.audioChunks.length === 0) {
        throw new Error('No audio data available');
      }

      // Combine audio chunks into a single blob
      const audioBlob = new Blob(this.audioChunks, {
        type: 'audio/webm;codecs=opus',
      });

      // Convert blob to base64
      const audioData = await this.blobToBase64(audioBlob);

      // Call the cloud function
      const speechToTextFunction = httpsCallable(
        this.functions,
        'speechToText'
      );
      const result = await speechToTextFunction({
        audioData,
        languageCode,
      });

      logger.info('Speech-to-text conversion completed', {
        success: (result.data as any).success,
        transcriptionLength: (result.data as any).transcription?.length || 0,
      });

      return result.data as SpeechToTextResult;
    } catch (error) {
      logger.error('Failed to convert speech to text:', error);
      throw error;
    }
  }

  /**
   * Convert speech to text in real-time (streaming)
   * @param languageCode - Language code for recognition
   * @returns Promise with streaming results
   */
  async convertToTextStreaming(languageCode: string = 'en-US'): Promise<any> {
    try {
      if (this.audioChunks.length === 0) {
        throw new Error('No audio data available');
      }

      // Convert audio chunks to base64
      const audioChunksBase64 = await Promise.all(
        this.audioChunks.map((chunk) => this.blobToBase64(chunk))
      );

      // Call the streaming cloud function
      const streamingFunction = httpsCallable(
        this.functions,
        'streamingSpeechToText'
      );
      const result = await streamingFunction({
        audioChunks: audioChunksBase64,
        languageCode,
      });

      logger.info('Streaming speech-to-text conversion completed', {
        success: (result.data as any).success,
        resultsCount: (result.data as any).results?.length || 0,
      });

      return result.data;
    } catch (error) {
      logger.error('Failed to convert speech to text (streaming):', error);
      throw error;
    }
  }

  /**
   * Get supported languages for speech recognition
   * @returns Promise with supported languages
   */
  async getSupportedLanguages(): Promise<SupportedLanguagesResult> {
    try {
      const getLanguagesFunction = httpsCallable(
        this.functions,
        'getSupportedLanguages'
      );
      const result = await getLanguagesFunction();

      logger.info('Fetched supported languages', {
        count: (result.data as any).languages?.length || 0,
      });

      return result.data as SupportedLanguagesResult;
    } catch (error) {
      logger.error('Failed to get supported languages:', error);
      throw error;
    }
  }

  /**
   * Clear recorded audio data
   */
  clearAudioData(): void {
    this.audioChunks = [];
    logger.info('Cleared audio data');
  }

  /**
   * Check if currently recording
   */
  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Get the number of recorded audio chunks
   */
  getAudioChunksCount(): number {
    return this.audioChunks.length;
  }

  /**
   * Convert blob to base64 string
   * @param blob - Blob to convert
   * @returns Promise with base64 string
   */
  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix to get just the base64 data
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

// Export singleton instance
export const speechToTextService = new SpeechToTextService();
export default speechToTextService;
