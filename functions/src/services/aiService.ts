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
    const {
      word,
      meaningLanguage = 'Vietnamese',
      isReverseTranslation = false,
    } = request.data as GenerateWordInfoRequest;

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
      let prompt;

      if (isReverseTranslation) {
        // Reverse translation: meaning → word
        prompt = `Translate "${word.trim()}" (${meaningLanguage}) to English. Return JSON:
{
  "meaning": "English word/phrase",
  "pronunciation": "IPA for English (optional)",
  "example": "Example sentence in English",
  "wordType": "noun|verb|adjective|adverb|pronoun|preposition|conjunction|interjection|phrase|sentence|other"
}

Rules:
- Natural English translation
- Example & pronunciation in English only
- JSON only, no extra text`;
      } else {
        // Normal translation: word → meaning
        prompt = `Translate "${word.trim()}" to ${meaningLanguage}. Return JSON:
{
  "meaning": "Natural translation in ${meaningLanguage}",
  "pronunciation": "IPA/pinyin/hiragana for original language (optional)",
  "example": "Example sentence in original language",
  "wordType": "noun|verb|adjective|adverb|pronoun|preposition|conjunction|interjection|phrase|sentence|other"
}

Rules:
- Vietnamese: Use "bạn" for "you", natural conversational style
- Examples: "book"→"quyển sách", "What's your name?"→"Tên bạn là gì?"
- Example & pronunciation in original language only
- JSON only, no extra text`;
      }

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
