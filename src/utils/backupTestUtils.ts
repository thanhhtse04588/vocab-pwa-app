/**
 * Test utilities for backup functionality
 * These functions help verify that backup and restore work correctly
 */

import { backupService } from '@/services/backupService';
import { db } from '@/services/database';
import type { BackupData } from '@/types';

export class BackupTestUtils {
  /**
   * Create test data for backup testing
   */
  static async createTestData(): Promise<void> {
    try {
      // Create a test vocabulary set
      const testSet = {
        id: 'test-set-1',
        name: 'Test Vocabulary Set',
        wordLanguage: 'en',
        meaningLanguage: 'vi',
        createdAt: new Date().toISOString(),
        wordCount: 2,
        isActive: true,
      };

      // Create test vocabulary words
      const testWords = [
        {
          id: 'test-word-1',
          vocabularySetId: 'test-set-1',
          word: 'hello',
          meaning: 'xin chào',
          pronunciation: 'həˈloʊ',
          example: 'Hello, how are you?',
          wordType: 'interjection' as const,
          wordLanguage: 'en',
          memoryLevel: 0 as const,
          nextReviewAt: new Date().toISOString(),
          correctCount: 0,
          incorrectCount: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'test-word-2',
          vocabularySetId: 'test-set-1',
          word: 'world',
          meaning: 'thế giới',
          pronunciation: 'wɜːrld',
          example: 'Hello, world!',
          wordType: 'noun' as const,
          wordLanguage: 'en',
          memoryLevel: 1 as const,
          nextReviewAt: new Date().toISOString(),
          correctCount: 1,
          incorrectCount: 0,
          createdAt: new Date().toISOString(),
        },
      ];

      // Create test user settings
      const testSettings = {
        id: 'test-settings',
        batchSize: 10,
        theme: 'light' as const,
        enableSound: true,
        enableVibration: true,
        autoPlayPronunciation: true,
        reviewReminderEnabled: true,
        reviewReminderInterval: 24,
        ttsGender: 'female' as const,
        ttsRate: 1.0,
      };

      // Add test data to database
      await db.vocabularySets.add(testSet);
      await db.vocabularyWords.bulkAdd(testWords);
      await db.userSettings.add(testSettings);

      console.log('Test data created successfully');
    } catch (error) {
      console.error('Error creating test data:', error);
      throw error;
    }
  }

  /**
   * Clear all test data
   */
  static async clearTestData(): Promise<void> {
    try {
      await backupService.clearAllData();
      console.log('Test data cleared successfully');
    } catch (error) {
      console.error('Error clearing test data:', error);
      throw error;
    }
  }

  /**
   * Test backup export functionality
   */
  static async testBackupExport(): Promise<BackupData> {
    try {
      console.log('Testing backup export...');
      const backupData = await backupService.exportData();

      // Verify backup data structure
      if (!backupData.checksum) {
        throw new Error('Backup data missing checksum');
      }

      console.log('Backup export test passed');
      console.log('Backup info:', {
        vocabularySets: backupData.vocabularySets.length,
        vocabularyWords: backupData.vocabularyWords.length,
        studySessions: backupData.studySessions.length,
        exportedAt: backupData.exportedAt,
      });

      return backupData;
    } catch (error) {
      console.error('Backup export test failed:', error);
      throw error;
    }
  }

  /**
   * Test backup import functionality
   */
  static async testBackupImport(backupData: BackupData): Promise<void> {
    try {
      console.log('Testing backup import...');

      // Clear existing data first
      await backupService.clearAllData();

      // Import backup data
      await backupService.importData(backupData);

      // Verify data was imported correctly
      const importedData = await db.exportData();

      if (
        importedData.vocabularySets.length !== backupData.vocabularySets.length
      ) {
        throw new Error('Vocabulary sets count mismatch after import');
      }

      if (
        importedData.vocabularyWords.length !==
        backupData.vocabularyWords.length
      ) {
        throw new Error('Vocabulary words count mismatch after import');
      }

      console.log('Backup import test passed');
    } catch (error) {
      console.error('Backup import test failed:', error);
      throw error;
    }
  }

  /**
   * Test file validation
   */
  static async testFileValidation(): Promise<void> {
    try {
      console.log('Testing file validation...');

      // Create a test file
      const testData = await backupService.exportData();
      const jsonString = JSON.stringify(testData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const testFile = new File([blob], 'test-backup.json', {
        type: 'application/json',
      });

      // Test file validation
      const validation = backupService.validateBackupFile(testFile);
      if (!validation.valid) {
        throw new Error(`File validation failed: ${validation.error}`);
      }

      // Test content validation (simplified)
      const text = await backupService.readFileAsText(testFile);
      const backupData = JSON.parse(text);
      if (!backupData.checksum) {
        throw new Error('Content validation failed: missing checksum');
      }

      console.log('File validation test passed');
    } catch (error) {
      console.error('File validation test failed:', error);
      throw error;
    }
  }

  /**
   * Run comprehensive backup tests
   */
  static async runBackupTests(): Promise<void> {
    try {
      console.log('Starting comprehensive backup tests...');

      // Create test data
      await this.createTestData();

      // Test export
      const backupData = await this.testBackupExport();

      // Test file validation
      await this.testFileValidation();

      // Test import
      await this.testBackupImport(backupData);

      // Clean up
      await this.clearTestData();

      console.log('All backup tests passed successfully!');
    } catch (error) {
      console.error('Backup tests failed:', error);
      throw error;
    }
  }
}
