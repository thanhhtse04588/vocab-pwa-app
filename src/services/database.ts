import Dexie, { type Table } from 'dexie';
import type {
  VocabularySet,
  VocabularyWord,
  StudySession,
  UserProgress,
  UserSettings,
} from '@/types';

export class VocabDatabase extends Dexie {
  vocabularySets!: Table<VocabularySet>;
  vocabularyWords!: Table<VocabularyWord>;
  studySessions!: Table<StudySession>;
  userProgress!: Table<UserProgress>;
  userSettings!: Table<UserSettings>;

  constructor() {
    super('BeeVocab');

    this.version(1).stores({
      vocabularySets:
        'id, name, description, sourceLanguage, targetLanguage, createdAt, lastStudiedAt, wordCount, isActive',
      vocabularyWords:
        'id, vocabularySetId, word, meaning, pronunciation, example, memoryLevel, nextReviewAt, correctCount, incorrectCount, createdAt, lastReviewedAt',
      studySessions:
        'id, vocabularySetId, startedAt, completedAt, totalWords, correctWords, incorrectWords, wordsStudied, isCompleted',
      userProgress:
        'id, vocabularySetId, totalWordsStudied, totalCorrectAnswers, totalIncorrectAnswers, averageAccuracy, streakDays, lastStudyDate, memoryLevelDistribution',
      userSettings:
        'id, batchSize, enableNotifications, notificationTime, theme, enableSound, enableVibration, autoPlayPronunciation, reviewReminderEnabled, reviewReminderInterval, ttsGender, ttsRate',
    });

    // Add hooks for data integrity
    this.vocabularySets.hook('creating', function (_primKey, obj) {
      obj.createdAt = new Date().toISOString();
      obj.isActive = true;
      obj.wordCount = 0;
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

    if (isCorrect) {
      // Move to next memory level
      newMemoryLevel = Math.min(word.memoryLevel + 1, 7);
      word.correctCount += 1;
    } else {
      // Reset to level 0
      newMemoryLevel = 0;
      word.incorrectCount += 1;
    }

    // Calculate next review time based on memory level
    const intervals = [10, 15, 1440, 4320, 10080, 20160, 43200, 129600]; // minutes
    const nextReviewInterval = intervals[newMemoryLevel];

    const nextReview = new Date(now.getTime() + nextReviewInterval * 60 * 1000);

    await this.vocabularyWords.update(wordId, {
      memoryLevel: newMemoryLevel as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
      nextReviewAt: nextReview.toISOString(),
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
      enableNotifications: true,
      notificationTime: '09:00',
      theme: 'auto',
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

        // Import new data
        await Promise.all([
          this.vocabularySets.bulkAdd(data.vocabularySets),
          this.vocabularyWords.bulkAdd(data.vocabularyWords),
          this.userProgress.bulkAdd(data.userProgress),
          this.userSettings.add(data.userSettings),
          this.studySessions.bulkAdd(data.studySessions),
        ]);
      }
    );
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
}

export const db = new VocabDatabase();
