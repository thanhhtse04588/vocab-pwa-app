// Cloud Functions service for AI-powered word information generation
// This service calls Firebase Cloud Functions which handle Vertex AI integration

import { getFunctions, httpsCallable } from 'firebase/functions';
import { ensureFirebase } from './firebaseService';

export interface AIWordInfo {
  meaning: string;
  pronunciation?: string;
  example?: string;
  wordType?: string;
}

export interface GenerateWordInfoRequest {
  word: string;
  meaningLanguage: string;
  isReverseTranslation?: boolean;
}

export interface GenerateWordInfoResponse {
  success: boolean;
  data?: AIWordInfo;
  error?: string;
}

class CloudFunctionsService {
  private functions: ReturnType<typeof getFunctions> | null = null;
  private generateWordInfoFunction: ReturnType<typeof httpsCallable> | null =
    null;

  constructor() {
    this.initializeFunctions();
  }

  private initializeFunctions() {
    try {
      // Ensure Firebase is initialized
      ensureFirebase();
      // Specify the region where functions are deployed
      this.functions = getFunctions(undefined, 'asia-southeast1');
      this.generateWordInfoFunction = httpsCallable(
        this.functions,
        'generateWordInfo'
      );
    } catch (error) {
      // Functions will remain null, and methods will handle this gracefully
    }
  }

  /**
   * Generate word information using Cloud Functions
   */
  async generateWordInfo(
    word: string,
    meaningLanguage: string = 'Vietnamese',
    isReverseTranslation: boolean = false
  ): Promise<AIWordInfo> {
    if (!this.generateWordInfoFunction) {
      throw new Error(
        'Firebase Functions not available - please check your configuration'
      );
    }

    try {
      const request: GenerateWordInfoRequest = {
        word: word.trim(),
        meaningLanguage,
        isReverseTranslation,
      };

      const result = await this.generateWordInfoFunction(request);
      const response = result.data as GenerateWordInfoResponse;

      if (!response.success) {
        throw new Error(
          response.error || 'Failed to generate word information'
        );
      }

      if (!response.data) {
        throw new Error('No data returned from AI service');
      }

      return response.data;
    } catch (error) {
      console.error('Error generating word info:', error);

      // Only use mock data if the API call actually fails
      // Don't use mock data just because we're in development mode
      console.warn('API call failed, using fallback data');
      return this.getMockWordInfo(word, meaningLanguage);
    }
  }

  /**
   * Mock implementation for development/testing
   */
  private getMockWordInfo(word: string, _meaningLanguage: string): AIWordInfo {
    // Generic fallback
    return {
      meaning: `Definition of ${word}`,
      pronunciation: `/${word.toLowerCase()}/`,
      example: `This is an example sentence with ${word}.`,
      wordType: 'noun',
    };
  }

  /**
   * Check if the service is available
   */
  async isAvailable(): Promise<boolean> {
    return this.functions !== null && this.generateWordInfoFunction !== null;
  }
}

// Export singleton instance
export const cloudFunctionsService = new CloudFunctionsService();

// Export the class for testing
export { CloudFunctionsService };
