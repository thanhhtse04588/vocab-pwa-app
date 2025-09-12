// Language mapping utility for TTS
// Maps vocabulary set language codes to TTS language codes

export interface LanguageMapping {
  [key: string]: string;
}

// Mapping from vocabulary set language codes to TTS language codes
export const LANGUAGE_TO_TTS_MAPPING: LanguageMapping = {
  // English variants
  en: 'en-US',
  'en-US': 'en-US',
  'en-GB': 'en-GB',
  'en-AU': 'en-AU',
  'en-CA': 'en-CA',

  // Vietnamese
  vi: 'vi-VN',
  'vi-VN': 'vi-VN',

  // Japanese
  ja: 'ja-JP',
  'ja-JP': 'ja-JP',

  // Korean
  ko: 'ko-KR',
  'ko-KR': 'ko-KR',

  // Chinese variants
  zh: 'zh-CN',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  'zh-HK': 'zh-HK',

  // French
  fr: 'fr-FR',
  'fr-FR': 'fr-FR',
  'fr-CA': 'fr-CA',

  // German
  de: 'de-DE',
  'de-DE': 'de-DE',

  // Spanish
  es: 'es-ES',
  'es-ES': 'es-ES',
  'es-MX': 'es-MX',
  'es-AR': 'es-AR',

  // Italian
  it: 'it-IT',
  'it-IT': 'it-IT',

  // Portuguese
  pt: 'pt-PT',
  'pt-PT': 'pt-PT',
  'pt-BR': 'pt-BR',

  // Russian
  ru: 'ru-RU',
  'ru-RU': 'ru-RU',

  // Arabic
  ar: 'ar-SA',
  'ar-SA': 'ar-SA',

  // Dutch
  nl: 'nl-NL',
  'nl-NL': 'nl-NL',

  // Swedish
  sv: 'sv-SE',
  'sv-SE': 'sv-SE',

  // Norwegian
  no: 'no-NO',
  'no-NO': 'no-NO',

  // Danish
  da: 'da-DK',
  'da-DK': 'da-DK',

  // Finnish
  fi: 'fi-FI',
  'fi-FI': 'fi-FI',

  // Polish
  pl: 'pl-PL',
  'pl-PL': 'pl-PL',

  // Czech
  cs: 'cs-CZ',
  'cs-CZ': 'cs-CZ',

  // Hungarian
  hu: 'hu-HU',
  'hu-HU': 'hu-HU',

  // Greek
  el: 'el-GR',
  'el-GR': 'el-GR',

  // Turkish
  tr: 'tr-TR',
  'tr-TR': 'tr-TR',

  // Hebrew
  he: 'he-IL',
  'he-IL': 'he-IL',

  // Thai
  th: 'th-TH',
  'th-TH': 'th-TH',

  // Indonesian
  id: 'id-ID',
  'id-ID': 'id-ID',

  // Malay
  ms: 'ms-MY',
  'ms-MY': 'ms-MY',

  // Filipino
  tl: 'tl-PH',
  'tl-PH': 'tl-PH',
};

/**
 * Converts a vocabulary set language code to TTS language code
 * @param languageCode - The language code from vocabulary set (e.g., 'en', 'vi', 'ja')
 * @returns The corresponding TTS language code (e.g., 'en-US', 'vi-VN', 'ja-JP')
 */
export function getTTSLanguageCode(languageCode: string): string {
  return LANGUAGE_TO_TTS_MAPPING[languageCode] || 'en-US';
}

/**
 * Gets the display name for a language code
 * @param languageCode - The language code
 * @returns The display name for the language
 */
export function getLanguageDisplayName(languageCode: string): string {
  const displayNames: LanguageMapping = {
    en: 'English',
    vi: 'Vietnamese',
    ja: 'Japanese',
    ko: 'Korean',
    zh: 'Chinese',
    fr: 'French',
    de: 'German',
    es: 'Spanish',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
    ar: 'Arabic',
    nl: 'Dutch',
    sv: 'Swedish',
    no: 'Norwegian',
    da: 'Danish',
    fi: 'Finnish',
    pl: 'Polish',
    cs: 'Czech',
    hu: 'Hungarian',
    el: 'Greek',
    tr: 'Turkish',
    he: 'Hebrew',
    th: 'Thai',
    id: 'Indonesian',
    ms: 'Malay',
    tl: 'Filipino',
  };

  return displayNames[languageCode] || languageCode;
}
