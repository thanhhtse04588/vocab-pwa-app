/**
 * AI service using Google Cloud Vertex AI for word generation
 */

import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { VertexAI } from '@google-cloud/vertexai';
import { GenerateWordInfoRequest, GenerateWordInfoResponse } from '../types';
import { getFallbackWordData, cleanAIResponse } from '../utils/fallbackData';

// Initialize Vertex AI client
// Using us-central1 for Gemini model access while keeping Cloud Functions in asia-southeast1
const vertexAI = new VertexAI({
  project: 'bee-vocab',
  location: 'us-central1',
});

/**
 * Generate word information using Vertex AI Gemini
 */
export const generateWordInfo = onCall(
  { region: 'asia-southeast1' },
  async (request): Promise<GenerateWordInfoResponse> => {
    const { word, meaningLanguage = 'Vietnamese' } =
      request.data as GenerateWordInfoRequest;

    try {
      // Validate input
      if (!word || word.trim().length === 0) {
        throw new HttpsError(
          'invalid-argument',
          'Word is required and cannot be empty'
        );
      }

      if (word.length > 100) {
        throw new HttpsError(
          'invalid-argument',
          'Word is too long. Maximum 100 characters allowed.'
        );
      }

      // Get the Gemini model - try gemini-2.5-flash-lite
      const model = vertexAI.getGenerativeModel({
        model: 'gemini-2.5-flash-lite',
      });

      // Create the prompt for word information generation
      const prompt = `Generate comprehensive information for the word "${word.trim()}" with meaning language "${meaningLanguage}".

Please provide the following information in JSON format:
{
  "meaning": "Simple and concise definition in ${meaningLanguage}",
  "pronunciation": "Pronunciation guide (optional - use appropriate format for the language: IPA for English, pinyin for Chinese, hiragana/katakana for Japanese, etc.)",
  "example": "Example sentence using the word in the same language as the word",
  "wordType": "One of: noun, verb, adjective, adverb, pronoun, preposition, conjunction, interjection, phrase, sentence, other"
}

Requirements:
- Meaning should be simple, concise, and easy to understand in ${meaningLanguage}
- Pronunciation should be provided only if relevant for the language type (optional):
  * For English: use IPA format (e.g., /həˈloʊ/)
  * For Chinese: use pinyin (e.g., nǐ hǎo)
  * For Japanese: use hiragana/katakana (e.g., こんにちは)
  * For Korean: use hangul (e.g., 안녕하세요)
  * For other languages: use the most appropriate phonetic system
- Example sentence should be in the same language as the word itself (not in ${meaningLanguage})
- Word type should be one of the specified categories
- Response should be valid JSON only, no additional text`;

      // Generate content using Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Parse the JSON response
      let wordInfo;
      try {
        // Clean the response text (remove markdown code blocks if present)
        const cleanText = cleanAIResponse(text);
        wordInfo = JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Failed to parse AI response:', text);
        throw new HttpsError('internal', 'Failed to parse AI response');
      }

      // Validate the response structure
      if (!wordInfo.meaning) {
        throw new HttpsError('internal', 'AI response missing required fields');
      }

      return {
        success: true,
        data: {
          meaning: wordInfo.meaning,
          pronunciation: wordInfo.pronunciation || undefined,
          example: wordInfo.example || undefined,
          wordType: wordInfo.wordType || 'noun',
        },
      };
    } catch (error) {
      console.error('AI word generation error:', error);

      // If it's a model availability error, provide fallback data
      if (error instanceof Error && error.message.includes('404 Not Found')) {
        console.warn('Gemini model not available, using fallback data');

        return {
          success: true,
          data: getFallbackWordData(word.trim(), meaningLanguage),
        };
      }

      if (error instanceof HttpsError) {
        throw error;
      }

      throw new HttpsError('internal', 'Failed to generate word information');
    }
  }
);
