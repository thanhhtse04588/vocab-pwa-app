/**
 * Audio service initializer
 * Handles initialization of the audio service when the app starts
 */

import { audioService } from './audioService';
import { db } from './database';

class AudioInitializer {
  private isInitialized = false;

  /**
   * Initialize the audio service with user settings
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Load user settings
      const settings = await db.getSettings();

      if (settings) {
        // Initialize audio service
        await audioService.initialize();

        // Always use WaveNet as primary provider (with Web Speech API fallback)
        audioService.setProvider('google-cloud');
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio service:', error);
      // Continue with Web Speech API fallback
      await audioService.initialize();
      this.isInitialized = true;
    }
  }

  /**
   * Check if the audio service is initialized
   */
  isServiceInitialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Reinitialize with new settings
   */
  async reinitialize(): Promise<void> {
    this.isInitialized = false;
    await this.initialize();
  }
}

// Export singleton instance
export const audioInitializer = new AudioInitializer();
