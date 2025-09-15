/**
 * Fallback data utilities for when AI services are unavailable
 */

import { GenerateWordInfoRequest } from '../types';

/**
 * Generate fallback word data when AI service is unavailable
 */
export function getFallbackWordData(word: string, meaningLanguage: string) {
  return {
    meaning: `Definition of ${word}`,
    pronunciation: `/${word.toLowerCase()}/`,
    example: `This is an example sentence with ${word}.`,
    wordType: 'noun',
  };
}

/**
 * Clean AI response text by removing markdown code blocks
 */
export function cleanAIResponse(text: string): string {
  return text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
}
