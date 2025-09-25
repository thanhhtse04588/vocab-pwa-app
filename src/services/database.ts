import Dexie, { type Table } from 'dexie';
import type {
  VocabularySet,
  VocabularyWord,
  StudySession,
  UserProgress,
  UserSettings,
  CachedAudio,
  AudioCacheOptions,
} from '@/types';

export class VocabDatabase extends Dexie {
  vocabularySets!: Table<VocabularySet>;
  vocabularyWords!: Table<VocabularyWord>;
  studySessions!: Table<StudySession>;
  userProgress!: Table<UserProgress>;
  userSettings!: Table<UserSettings>;
  audioCache!: Table<CachedAudio>;

  constructor() {
    super('BeeVocab');

    this.version(1).stores({
      vocabularySets:
        'id, name, wordLanguage, meaningLanguage, createdAt, lastStudiedAt, wordCount, isActive',
      vocabularyWords:
        'id, vocabularySetId, word, meaning, pronunciation, example, wordType, wordLanguage, memoryLevel, nextReviewAt, correctCount, incorrectCount, createdAt, lastReviewedAt',
      studySessions:
        'id, vocabularySetId, startedAt, completedAt, totalWords, correctWords, incorrectWords, wordsStudied, isCompleted',
      userProgress:
        'id, vocabularySetId, totalWordsStudied, totalCorrectAnswers, totalIncorrectAnswers, averageAccuracy, streakDays, lastStudyDate, memoryLevelDistribution',
      userSettings:
        'id, batchSize, theme, enableSound, enableVibration, autoPlayPronunciation, reviewReminderEnabled, reviewReminderInterval, ttsGender, ttsRate',
      audioCache: 'key, text, timestamp, size',
    });

    // Add hooks for data integrity
    this.vocabularySets.hook('creating', function (_primKey, obj) {
      obj.createdAt = new Date().toISOString();
      obj.isActive = true;
      // Only set wordCount to 0 if it's not already set
      if (obj.wordCount === undefined) {
        obj.wordCount = 0;
      }
    });

    this.vocabularyWords.hook('creating', function (_primKey, obj) {
      obj.createdAt = new Date().toISOString();
      obj.memoryLevel = 0;
      obj.correctCount = 0;
      obj.incorrectCount = 0;
      // Set next review time based on memory level
      const nextReview = new Date();
      nextReview.setMinutes(nextReview.getMinutes() + 10); // Start with 10 minutes
      obj.nextReviewAt = nextReview.toISOString();
    });

    this.studySessions.hook('creating', function (_primKey, obj) {
      obj.startedAt = new Date().toISOString();
      obj.isCompleted = false;
      obj.totalWords = 0;
      obj.correctWords = 0;
      obj.incorrectWords = 0;
      obj.wordsStudied = [];
    });
  }

  // Helper methods for common operations
  async getVocabularySetsWithStats(): Promise<
    (VocabularySet & {
      totalWords: number;
      wordsToReview: number;
      lastStudyDate?: string;
    })[]
  > {
    // Get all active sets using filter (more reliable than where with boolean)
    const sets = await this.vocabularySets
      .filter((set) => set.isActive)
      .toArray();

    return Promise.all(
      sets.map(async (set) => {
        const words = await this.vocabularyWords
          .where('vocabularySetId')
          .equals(set.id)
          .toArray();

        const wordsToReview = words.filter(
          (word) =>
            new Date(word.nextReviewAt) <= new Date() && word.memoryLevel >= 1
        ).length;

        const progress = await this.userProgress
          .where('vocabularySetId')
          .equals(set.id)
          .first();

        return {
          ...set,
          totalWords: words.length,
          wordsToReview,
          lastStudyDate: progress?.lastStudyDate,
        };
      })
    );
  }

  async getWordsForReview(
    vocabularySetId: string,
    limit?: number
  ): Promise<VocabularyWord[]> {
    const now = new Date().toISOString();
    const query = this.vocabularyWords
      .where('vocabularySetId')
      .equals(vocabularySetId)
      .and((word) => word.nextReviewAt <= now && word.memoryLevel >= 1);

    if (limit) {
      return await query.limit(limit).toArray();
    }

    return await query.toArray();
  }

  async getAllWordsForReview(limit?: number): Promise<VocabularyWord[]> {
    const now = new Date().toISOString();
    const query = this.vocabularyWords
      .where('nextReviewAt')
      .belowOrEqual(now)
      .and((word) => word.memoryLevel >= 1);

    if (limit) {
      return await query.limit(limit).toArray();
    }

    return await query.toArray();
  }

  async getNewWords(
    vocabularySetId: string,
    limit?: number
  ): Promise<VocabularyWord[]> {
    const query = this.vocabularyWords
      .where('vocabularySetId')
      .equals(vocabularySetId)
      .and((word) => word.memoryLevel === 0);

    const result = limit
      ? await query.limit(limit).toArray()
      : await query.toArray();

    return result;
  }

  async updateWordMemoryLevel(
    wordId: string,
    isCorrect: boolean
  ): Promise<void> {
    const word = await this.vocabularyWords.get(wordId);
    if (!word) return;

    const now = new Date();
    let newMemoryLevel: number;
    let nextReviewAt: string | undefined;

    if (isCorrect) {
      // Move to next memory level
      newMemoryLevel = Math.min(word.memoryLevel + 1, 7);
      word.correctCount += 1;

      // Calculate next review time based on new memory level
      const intervals = [10, 15, 1440, 4320, 10080, 20160, 43200, 129600]; // minutes
      const nextReviewInterval = intervals[newMemoryLevel];
      const nextReview = new Date(
        now.getTime() + nextReviewInterval * 60 * 1000
      );
      nextReviewAt = nextReview.toISOString();
    } else {
      // Reset to level 0 but don't update nextReviewAt
      newMemoryLevel = 0;
      word.incorrectCount += 1;
      // Keep the existing nextReviewAt value
      nextReviewAt = word.nextReviewAt;
    }

    await this.vocabularyWords.update(wordId, {
      memoryLevel: newMemoryLevel as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
      nextReviewAt: nextReviewAt,
      lastReviewedAt: now.toISOString(),
    });
  }

  async getMemoryLevelDistribution(
    vocabularySetId: string
  ): Promise<Record<number, number>> {
    const words = await this.vocabularyWords
      .where('vocabularySetId')
      .equals(vocabularySetId)
      .and((word) => word.memoryLevel >= 1)
      .toArray();

    const distribution: Record<number, number> = {};
    for (let i = 1; i <= 7; i++) {
      distribution[i] = 0;
    }

    words.forEach((word) => {
      distribution[word.memoryLevel] =
        (distribution[word.memoryLevel] || 0) + 1;
    });

    return distribution;
  }

  async getTotalWordsToReview(): Promise<number> {
    const now = new Date().toISOString();
    return await this.vocabularyWords
      .where('nextReviewAt')
      .below(now)
      .and((word) => word.memoryLevel >= 1)
      .count();
  }

  async createDefaultSettings(): Promise<UserSettings> {
    const defaultSettings: UserSettings = {
      id: 'default',
      batchSize: 10,
      theme: 'light',
      enableSound: true,
      enableVibration: true,
      autoPlayPronunciation: true,
      reviewReminderEnabled: true,
      reviewReminderInterval: 24,
      // TTS Settings
      ttsGender: 'neutral',
      ttsRate: 1.0,
    };

    await this.userSettings.put(defaultSettings);
    return defaultSettings;
  }

  async getSettings(): Promise<UserSettings> {
    let settings = await this.userSettings.get('default');
    if (!settings) {
      settings = await this.createDefaultSettings();
    }
    return settings;
  }

  async exportData(): Promise<{
    vocabularySets: VocabularySet[];
    vocabularyWords: VocabularyWord[];
    userProgress: UserProgress[];
    userSettings: UserSettings;
    studySessions: StudySession[];
  }> {
    const [
      vocabularySets,
      vocabularyWords,
      userProgress,
      userSettings,
      studySessions,
    ] = await Promise.all([
      this.vocabularySets.toArray(),
      this.vocabularyWords.toArray(),
      this.userProgress.toArray(),
      this.getSettings(),
      this.studySessions.toArray(),
    ]);

    return {
      vocabularySets,
      vocabularyWords,
      userProgress,
      userSettings,
      studySessions,
    };
  }

  async importData(data: {
    vocabularySets: VocabularySet[];
    vocabularyWords: VocabularyWord[];
    userProgress: UserProgress[];
    userSettings: UserSettings;
    studySessions: StudySession[];
  }): Promise<void> {
    // Validate data before import
    this.validateImportData(data);

    await this.transaction(
      'rw',
      [
        this.vocabularySets,
        this.vocabularyWords,
        this.userProgress,
        this.userSettings,
        this.studySessions,
      ],
      async () => {
        // Clear existing data
        await Promise.all([
          this.vocabularySets.clear(),
          this.vocabularyWords.clear(),
          this.userProgress.clear(),
          this.userSettings.clear(),
          this.studySessions.clear(),
        ]);

        // Import new data with validation
        await Promise.all([
          this.vocabularySets.bulkAdd(data.vocabularySets),
          this.vocabularyWords.bulkAdd(data.vocabularyWords),
          this.userProgress.bulkAdd(data.userProgress),
          this.userSettings.add(data.userSettings),
          this.studySessions.bulkAdd(data.studySessions),
        ]);

        // Verify import integrity
        await this.verifyImportIntegrity(data);
      }
    );
  }

  /**
   * Validate data before import to ensure data integrity
   */
  private validateImportData(data: {
    vocabularySets: VocabularySet[];
    vocabularyWords: VocabularyWord[];
    userProgress: UserProgress[];
    userSettings: UserSettings;
    studySessions: StudySession[];
  }): void {
    // Validate vocabulary sets
    if (!Array.isArray(data.vocabularySets)) {
      throw new Error('vocabularySets must be an array');
    }

    for (const set of data.vocabularySets) {
      if (!set.id || !set.name || !set.wordLanguage || !set.meaningLanguage) {
        throw new Error('Invalid vocabulary set: missing required fields');
      }
      if (typeof set.wordCount !== 'number' || set.wordCount < 0) {
        throw new Error(
          'Invalid vocabulary set: wordCount must be a non-negative number'
        );
      }
      // Allow additional fields like 'description' - no validation needed
    }

    // Validate vocabulary words
    if (!Array.isArray(data.vocabularyWords)) {
      throw new Error('vocabularyWords must be an array');
    }

    for (const word of data.vocabularyWords) {
      if (!word.id || !word.vocabularySetId || !word.word || !word.meaning) {
        throw new Error('Invalid vocabulary word: missing required fields');
      }
      if (word.memoryLevel < 0 || word.memoryLevel > 7) {
        throw new Error(
          'Invalid vocabulary word: memoryLevel must be between 0 and 7'
        );
      }
      if (word.correctCount < 0 || word.incorrectCount < 0) {
        throw new Error('Invalid vocabulary word: counts must be non-negative');
      }
      // Allow additional fields - no validation needed
    }

    // Validate user settings
    if (!data.userSettings) {
      throw new Error('userSettings is required');
    }

    if (
      typeof data.userSettings.batchSize !== 'number' ||
      data.userSettings.batchSize < 1
    ) {
      throw new Error(
        'Invalid user settings: batchSize must be a positive number'
      );
    }

    if (!['light', 'dark', 'auto'].includes(data.userSettings.theme)) {
      throw new Error(
        'Invalid user settings: theme must be light, dark, or auto'
      );
    }

    // Validate study sessions
    if (!Array.isArray(data.studySessions)) {
      throw new Error('studySessions must be an array');
    }

    for (const session of data.studySessions) {
      if (!session.id || !session.vocabularySetId || !session.startedAt) {
        throw new Error('Invalid study session: missing required fields');
      }
      if (
        session.totalWords < 0 ||
        session.correctWords < 0 ||
        session.incorrectWords < 0
      ) {
        throw new Error('Invalid study session: counts must be non-negative');
      }
    }

    // Validate user progress
    if (!Array.isArray(data.userProgress)) {
      throw new Error('userProgress must be an array');
    }

    for (const progress of data.userProgress) {
      if (!progress.id || !progress.vocabularySetId) {
        throw new Error('Invalid user progress: missing required fields');
      }
      if (progress.averageAccuracy < 0 || progress.averageAccuracy > 100) {
        throw new Error(
          'Invalid user progress: averageAccuracy must be between 0 and 100'
        );
      }
    }
  }

  /**
   * Verify data integrity after import
   */
  private async verifyImportIntegrity(data: {
    vocabularySets: VocabularySet[];
    vocabularyWords: VocabularyWord[];
    userProgress: UserProgress[];
    userSettings: UserSettings;
    studySessions: StudySession[];
  }): Promise<void> {
    try {
      // Verify all data was imported correctly
      const [
        importedSets,
        importedWords,
        importedProgress,
        importedSettings,
        importedSessions,
      ] = await Promise.all([
        this.vocabularySets.count(),
        this.vocabularyWords.count(),
        this.userProgress.count(),
        this.userSettings.count(),
        this.studySessions.count(),
      ]);

      if (importedSets !== data.vocabularySets.length) {
        throw new Error(
          `Vocabulary sets import mismatch: expected ${data.vocabularySets.length}, got ${importedSets}`
        );
      }

      if (importedWords !== data.vocabularyWords.length) {
        throw new Error(
          `Vocabulary words import mismatch: expected ${data.vocabularyWords.length}, got ${importedWords}`
        );
      }

      if (importedProgress !== data.userProgress.length) {
        throw new Error(
          `User progress import mismatch: expected ${data.userProgress.length}, got ${importedProgress}`
        );
      }

      if (importedSessions !== data.studySessions.length) {
        throw new Error(
          `Study sessions import mismatch: expected ${data.studySessions.length}, got ${importedSessions}`
        );
      }

      if (importedSettings !== 1) {
        throw new Error(
          `User settings import mismatch: expected 1, got ${importedSettings}`
        );
      }

      console.log('Data import verification completed successfully');
    } catch (error) {
      console.error('Data import verification failed:', error);
      throw new Error('Data import verification failed');
    }
  }

  async resetProgressForSet(vocabularySetId: string): Promise<void> {
    await this.transaction(
      'rw',
      [this.vocabularyWords, this.userProgress, this.studySessions],
      async () => {
        // Reset all words in the set to memory level 0
        const words = await this.vocabularyWords
          .where('vocabularySetId')
          .equals(vocabularySetId)
          .toArray();

        const now = new Date();
        const nextReview = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes from now

        await Promise.all(
          words.map((word) =>
            this.vocabularyWords.update(word.id, {
              memoryLevel: 0,
              correctCount: 0,
              incorrectCount: 0,
              nextReviewAt: nextReview.toISOString(),
              lastReviewedAt: undefined,
            })
          )
        );

        // Delete user progress for this set
        await this.userProgress
          .where('vocabularySetId')
          .equals(vocabularySetId)
          .delete();

        // Delete study sessions for this set
        await this.studySessions
          .where('vocabularySetId')
          .equals(vocabularySetId)
          .delete();
      }
    );
  }

  // Audio Cache Service Methods
  private memoryCache = new Map<string, CachedAudio>(); // Memory fallback
  private maxCacheSize = 50; // Maximum number of cached items
  private maxCacheAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  private maxTotalSize = 100 * 1024 * 1024; // 100MB total cache size

  /**
   * Generate cache key from text and options
   */
  private generateCacheKey(text: string, options: AudioCacheOptions): string {
    const normalizedText = text.toLowerCase().trim();
    const optionsKey = JSON.stringify({
      languageCode: options.languageCode || 'en-US',
      voiceName: options.voiceName || '',
      ssmlGender: options.ssmlGender || 'NEUTRAL',
      speakingRate: options.speakingRate || 1.0,
      pitch: options.pitch || 0.0,
      volumeGainDb: options.volumeGainDb || 0.0,
    });

    return `${normalizedText}|${optionsKey}`;
  }

  /**
   * Get cached audio data from Dexie or memory
   */
  async getCachedAudio(
    text: string,
    options: AudioCacheOptions
  ): Promise<string | null> {
    const key = this.generateCacheKey(text, options);

    // Check memory cache first (fastest)
    const memoryCached = this.memoryCache.get(key);
    if (memoryCached) {
      const now = Date.now();
      if (now - memoryCached.timestamp <= this.maxCacheAge) {
        return memoryCached.audioData;
      } else {
        this.memoryCache.delete(key);
      }
    }

    // Check Dexie if available
    try {
      const cached = await this.audioCache.get(key);
      if (cached) {
        const now = Date.now();
        if (now - cached.timestamp <= this.maxCacheAge) {
          // Update memory cache
          this.memoryCache.set(key, cached);
          return cached.audioData;
        } else {
          // Remove expired entry
          await this.audioCache.delete(key);
        }
      }
    } catch (error) {
      console.warn('Failed to get from audio cache:', error);
    }

    return null;
  }

  /**
   * Cache audio data to both Dexie and memory
   */
  async setCachedAudio(
    text: string,
    audioData: string,
    options: AudioCacheOptions
  ): Promise<void> {
    const key = this.generateCacheKey(text, options);
    const now = Date.now();

    // Calculate audio data size (approximate)
    const audioSize = Math.floor(audioData.length * 0.75); // Base64 is ~33% larger than binary

    const cachedAudio: CachedAudio = {
      key,
      text,
      audioData,
      options,
      timestamp: now,
      size: audioSize,
    };

    // Store in memory cache
    this.memoryCache.set(key, cachedAudio);

    // Store in Dexie if available
    try {
      await this.audioCache.put(cachedAudio);
      await this.cleanupAudioCache();
    } catch (error) {
      console.warn('Failed to store in audio cache:', error);
    }
  }

  /**
   * Check if audio is cached
   */
  async isCached(text: string, options: AudioCacheOptions): Promise<boolean> {
    const key = this.generateCacheKey(text, options);

    // Check memory cache first
    const memoryCached = this.memoryCache.get(key);
    if (memoryCached) {
      const now = Date.now();
      if (now - memoryCached.timestamp <= this.maxCacheAge) {
        return true;
      } else {
        this.memoryCache.delete(key);
      }
    }

    // Check Dexie if available
    try {
      const cached = await this.audioCache.get(key);
      if (cached) {
        const now = Date.now();
        if (now - cached.timestamp <= this.maxCacheAge) {
          return true;
        } else {
          await this.audioCache.delete(key);
        }
      }
    } catch (error) {
      console.warn('Failed to check audio cache:', error);
    }

    return false;
  }

  /**
   * Cleanup audio cache - remove expired entries and enforce limits
   */
  private async cleanupAudioCache(): Promise<void> {
    try {
      const now = Date.now();

      // Remove expired entries
      await this.audioCache
        .where('timestamp')
        .below(now - this.maxCacheAge)
        .delete();

      // Get all remaining entries
      const allEntries = await this.audioCache.toArray();

      // Check size limits
      const totalSize = allEntries.reduce(
        (total, entry) => total + entry.size,
        0
      );

      if (
        allEntries.length > this.maxCacheSize ||
        totalSize > this.maxTotalSize
      ) {
        // Sort by timestamp (oldest first)
        const sortedEntries = allEntries.sort(
          (a, b) => a.timestamp - b.timestamp
        );

        // Remove oldest entries
        const toRemove = Math.max(0, allEntries.length - this.maxCacheSize);
        const keysToRemove = sortedEntries
          .slice(0, toRemove)
          .map((entry) => entry.key);

        if (keysToRemove.length > 0) {
          await this.audioCache.bulkDelete(keysToRemove);
        }

        // Remove entries if still over size limit
        let currentSize = sortedEntries
          .slice(toRemove)
          .reduce((total, entry) => total + entry.size, 0);

        let index = toRemove;
        while (
          currentSize > this.maxTotalSize &&
          index < sortedEntries.length
        ) {
          await this.audioCache.delete(sortedEntries[index].key);
          currentSize -= sortedEntries[index].size;
          index++;
        }
      }
    } catch (error) {
      console.warn('Failed to cleanup audio cache:', error);
    }
  }

  /**
   * Clear all audio cache (both memory and Dexie)
   */
  async clearAudioCache(): Promise<void> {
    // Clear memory cache
    this.memoryCache.clear();

    // Clear Dexie if available
    try {
      await this.audioCache.clear();
    } catch (error) {
      console.warn('Failed to clear audio cache:', error);
    }
  }

  /**
   * Get audio cache statistics
   */
  async getAudioCacheStats(): Promise<{
    size: number;
    totalSize: number;
    oldestEntry: number | null;
    newestEntry: number | null;
    memorySize: number;
    dexieSize: number;
  }> {
    const memoryEntries = Array.from(this.memoryCache.values());
    const memoryTimestamps = memoryEntries.map((entry) => entry.timestamp);

    let dexieEntries: CachedAudio[] = [];
    try {
      dexieEntries = await this.audioCache.toArray();
    } catch (error) {
      console.warn('Failed to get audio cache stats:', error);
    }

    const allTimestamps = [
      ...memoryTimestamps,
      ...dexieEntries.map((entry) => entry.timestamp),
    ];

    return {
      size: memoryEntries.length + dexieEntries.length,
      totalSize:
        memoryEntries.reduce((total, entry) => total + entry.size, 0) +
        dexieEntries.reduce((total, entry) => total + entry.size, 0),
      oldestEntry: allTimestamps.length > 0 ? Math.min(...allTimestamps) : null,
      newestEntry: allTimestamps.length > 0 ? Math.max(...allTimestamps) : null,
      memorySize: memoryEntries.length,
      dexieSize: dexieEntries.length,
    };
  }

  /**
   * Get audio cache size in human readable format
   */
  async getAudioCacheSizeFormatted(): Promise<string> {
    const stats = await this.getAudioCacheStats();
    const bytes = stats.totalSize;

    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }

  /**
   * Set audio cache limits
   */
  setAudioCacheLimits(
    maxCacheSize: number,
    maxCacheAge: number,
    maxTotalSize: number
  ): void {
    this.maxCacheSize = maxCacheSize;
    this.maxCacheAge = maxCacheAge;
    this.maxTotalSize = maxTotalSize;
  }
}

export const db = new VocabDatabase();
