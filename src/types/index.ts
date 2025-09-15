// Core data types for the vocabulary learning app

export interface VocabularySet {
  id: string;
  name: string;
  description: string;
  wordLanguage: string;
  meaningLanguage: string;
  createdAt: string;
  lastStudiedAt?: string;
  wordCount: number;
  isActive: boolean;
}

export interface VocabularyWord {
  id: string;
  vocabularySetId: string;
  word: string;
  meaning: string;
  pronunciation?: string;
  example?: string;
  wordType?: WordType;
  memoryLevel: MemoryLevel;
  nextReviewAt: string;
  correctCount: number;
  incorrectCount: number;
  createdAt: string;
  lastReviewedAt?: string;
}

export type MemoryLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type WordType =
  | 'noun' // danh từ
  | 'verb' // động từ
  | 'adjective' // tính từ
  | 'adverb' // trạng từ
  | 'pronoun' // đại từ
  | 'preposition' // giới từ
  | 'conjunction' // liên từ
  | 'interjection' // thán từ
  | 'abbreviation' // viết tắt
  | 'phrase' // cụm từ
  | 'sentence' // câu
  | 'other'; // khác

export interface StudySession {
  id: string;
  vocabularySetId: string;
  startedAt: string;
  completedAt?: string;
  totalWords: number;
  correctWords: number;
  incorrectWords: number;
  wordsStudied: string[]; // word IDs
  isCompleted: boolean;
}

export interface UserProgress {
  id: string;
  vocabularySetId: string;
  totalWordsStudied: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  averageAccuracy: number;
  streakDays: number;
  lastStudyDate?: string;
  memoryLevelDistribution: Record<MemoryLevel, number>;
}

export interface UserSettings {
  id: string;
  batchSize: number;
  enableNotifications: boolean;
  notificationTime: string; // HH:MM format
  theme: 'light' | 'dark' | 'auto';
  enableSound: boolean;
  enableVibration: boolean;
  autoPlayPronunciation: boolean;
  reviewReminderEnabled: boolean;
  reviewReminderInterval: number; // in hours
  // TTS Settings
  ttsGender: 'male' | 'female' | 'neutral';
  ttsRate: number;
}

// Spaced repetition intervals (in minutes for first few, then days)
export const SPACED_REPETITION_INTERVALS: Record<MemoryLevel, number> = {
  0: 10, // 10 minutes
  1: 15, // 15 minutes
  2: 1440, // 1 day (24 * 60 minutes)
  3: 4320, // 3 days (3 * 24 * 60 minutes)
  4: 10080, // 7 days (7 * 24 * 60 minutes)
  5: 20160, // 14 days (14 * 24 * 60 minutes)
  6: 43200, // 30 days (30 * 24 * 60 minutes)
  7: 129600, // 90 days (90 * 24 * 60 minutes)
};

// Navigation types
export type TabId = 'home' | 'vocabulary' | 'learn' | 'settings' | 'profile';

export interface NavigationState {
  activeTab: TabId;
  previousTab?: TabId;
}

// Study modes
export type StudyMode = 'write' | 'multiple-choice' | 'flashcard';

// CSV Import types
export interface CSVImportResult {
  success: boolean;
  importedCount: number;
  errors: string[];
  warnings: string[];
}

export interface CSVWordData {
  word: string;
  meaning: string;
  pronunciation?: string;
  example?: string;
  wordType?: WordType;
}

// Backup/Restore types
export interface BackupData {
  vocabularySets: VocabularySet[];
  vocabularyWords: VocabularyWord[];
  userProgress: UserProgress[];
  userSettings: UserSettings;
  studySessions: StudySession[];
  exportedAt: string;
  version: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
