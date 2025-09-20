// Application constants
export const CHARACTER_LIMIT = 126;

// Other constants can be added here in the future
export const MAX_BATCH_SIZE = 50;
export const MIN_BATCH_SIZE = 5;
export const DEFAULT_BATCH_SIZE = 10;

// Speech-to-Text language codes
export const SPEECH_TO_TEXT_LANGUAGES = {
  ENGLISH: 'en-US',
  VIETNAMESE: 'vi-VN',
  JAPANESE: 'ja-JP',
  KOREAN: 'ko-KR',
  CHINESE: 'zh-CN',
} as const;

export const ALTERNATIVE_LANGUAGE_CODES = [
  SPEECH_TO_TEXT_LANGUAGES.ENGLISH,
  SPEECH_TO_TEXT_LANGUAGES.VIETNAMESE,
  SPEECH_TO_TEXT_LANGUAGES.JAPANESE,
  SPEECH_TO_TEXT_LANGUAGES.KOREAN,
  SPEECH_TO_TEXT_LANGUAGES.CHINESE,
];
