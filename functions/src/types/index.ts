/**
 * Type definitions for Firebase Cloud Functions
 */

// Interface for TTS request
export interface TTSRequest {
  text: string;
  languageCode?: string;
  voiceName?: string;
  ssmlGender?: 'NEUTRAL' | 'MALE' | 'FEMALE';
  speakingRate?: number;
  pitch?: number;
  volumeGainDb?: number;
}

// Interface for TTS response
export interface TTSResponse {
  audioContent: string; // Base64 encoded audio
  success: boolean;
  error?: string;
}

// Interface for AI word generation request
export interface GenerateWordInfoRequest {
  word: string;
  meaningLanguage: string;
}

// Interface for AI word generation response
export interface GenerateWordInfoResponse {
  success: boolean;
  data?: {
    meaning: string;
    pronunciation?: string;
    example?: string;
    wordType?: string;
  };
  error?: string;
}

// Interface for voice information
export interface VoiceInfo {
  name: string;
  languageCode: string;
  ssmlGender: 'NEUTRAL' | 'MALE' | 'FEMALE';
  naturalSampleRateHertz: number;
}

// Interface for voices response
export interface VoicesResponse {
  voices: VoiceInfo[];
  success: boolean;
}

// Interface for health check response
export interface HealthResponse {
  status: string;
  timestamp: string;
}
