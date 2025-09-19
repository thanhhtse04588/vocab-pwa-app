/**
 * Firebase Cloud Functions for Vocabulary PWA App
 * Main entry point that exports all cloud functions
 */

import { setGlobalOptions } from 'firebase-functions';

// Import services
import { synthesizeSpeech, getAvailableVoices } from './services/ttsService';
import { generateWordInfo } from './services/aiService';
import { health } from './services/healthService';
import { speechToText, getSupportedLanguages, streamingSpeechToText } from './services/speechService';

// Set global options for cost control
setGlobalOptions({ maxInstances: 10 });

// Export all cloud functions
export { 
  synthesizeSpeech, 
  getAvailableVoices, 
  generateWordInfo, 
  health,
  speechToText,
  getSupportedLanguages,
  streamingSpeechToText
};
