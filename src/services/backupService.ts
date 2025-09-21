import type { BackupData, BackupValidationResult } from '@/types';
import { db } from '@/services/database';
import { CryptoUtils } from '@/utils/cryptoUtils';

class BackupService {
  async exportData(): Promise<BackupData> {
    try {
      // Export data from database
      const data = await db.exportData();

      // Create data for integrity checks
      const exportedAt = new Date().toISOString();
      const version = '1.0.0';
      const dataForIntegrity = {
        vocabularySets: data.vocabularySets,
        vocabularyWords: data.vocabularyWords,
        userProgress: data.userProgress,
        userSettings: data.userSettings,
        studySessions: data.studySessions,
        exportedAt,
        version,
      };

      // Generate checksum for integrity verification
      const checksum = await CryptoUtils.generateChecksum(dataForIntegrity);

      const backupData: BackupData = {
        ...data,
        exportedAt,
        version,
        checksum,
      };

      return backupData;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Failed to export data');
    }
  }

  async importData(backupData: BackupData): Promise<void> {
    try {
      // Comprehensive validation
      const validationResult = await this.validateBackupDataComprehensive(
        backupData
      );

      if (!validationResult.isValid) {
        const errorMessage = `Backup validation failed: ${validationResult.errors.join(
          ', '
        )}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Log warnings if any
      if (validationResult.warnings.length > 0) {
        console.warn('Backup import warnings:', validationResult.warnings);
      }

      // Import data to database
      await db.importData(backupData);
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Failed to import data');
    }
  }

  /**
   * Comprehensive backup data validation with integrity checks
   */
  private async validateBackupDataComprehensive(
    data: BackupData
  ): Promise<BackupValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic structure validation
    if (!data.vocabularySets || !Array.isArray(data.vocabularySets)) {
      errors.push('vocabularySets is missing or not an array');
    }

    if (!data.vocabularyWords || !Array.isArray(data.vocabularyWords)) {
      errors.push('vocabularyWords is missing or not an array');
    }

    if (!data.userProgress || !Array.isArray(data.userProgress)) {
      errors.push('userProgress is missing or not an array');
    }

    if (!data.userSettings) {
      errors.push('userSettings is missing');
    }

    if (!data.studySessions || !Array.isArray(data.studySessions)) {
      errors.push('studySessions is missing or not an array');
    }

    if (!data.exportedAt) {
      errors.push('exportedAt is missing');
    }

    if (!data.version) {
      errors.push('version is missing');
    }

    // Integrity validation
    if (data.checksum) {
      try {
        // Verify checksum
        const dataForIntegrity = {
          vocabularySets: data.vocabularySets,
          vocabularyWords: data.vocabularyWords,
          userProgress: data.userProgress,
          userSettings: data.userSettings,
          studySessions: data.studySessions,
          exportedAt: data.exportedAt,
          version: data.version,
        };

        const checksumValid = await CryptoUtils.verifyChecksum(
          dataForIntegrity,
          data.checksum
        );

        if (!checksumValid) {
          errors.push(
            'Data checksum verification failed - data may be corrupted'
          );
        }
      } catch {
        errors.push('Failed to verify data integrity');
      }
    } else {
      warnings.push('Backup file lacks integrity verification data');
    }

    // Version compatibility check
    const currentVersion = '1.0.0';
    const versionCompatible = data.version === currentVersion;

    if (!versionCompatible) {
      warnings.push(
        `Version mismatch: backup version ${data.version}, current version ${currentVersion}`
      );
    }

    // Schema validation
    const schemaCompatible = this.validateDataSchema(data);
    if (!schemaCompatible) {
      errors.push(
        'Data schema validation failed - check required fields and data types'
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate data schema and structure
   */
  private validateDataSchema(data: BackupData): boolean {
    try {
      // Validate vocabulary sets - only check required fields, allow additional fields
      if (data.vocabularySets) {
        for (const set of data.vocabularySets) {
          if (
            !set.id ||
            !set.name ||
            !set.wordLanguage ||
            !set.meaningLanguage ||
            typeof set.wordCount !== 'number' ||
            typeof set.isActive !== 'boolean'
          ) {
            return false;
          }
        }
      }

      // Validate vocabulary words - only check required fields, allow additional fields
      if (data.vocabularyWords) {
        for (const word of data.vocabularyWords) {
          if (
            !word.id ||
            !word.vocabularySetId ||
            !word.word ||
            !word.meaning ||
            typeof word.memoryLevel !== 'number' ||
            typeof word.correctCount !== 'number' ||
            typeof word.incorrectCount !== 'number'
          ) {
            return false;
          }
        }
      }

      // Validate user settings
      if (data.userSettings) {
        if (
          typeof data.userSettings.batchSize !== 'number' ||
          !['light', 'dark', 'auto'].includes(data.userSettings.theme)
        ) {
          return false;
        }
      }

      // Validate study sessions - only check required fields
      if (data.studySessions) {
        for (const session of data.studySessions) {
          if (
            !session.id ||
            !session.vocabularySetId ||
            !session.startedAt ||
            typeof session.totalWords !== 'number' ||
            typeof session.correctWords !== 'number' ||
            typeof session.incorrectWords !== 'number' ||
            typeof session.isCompleted !== 'boolean'
          ) {
            return false;
          }
        }
      }

      // Validate user progress - only check required fields
      if (data.userProgress) {
        for (const progress of data.userProgress) {
          if (
            !progress.id ||
            !progress.vocabularySetId ||
            typeof progress.totalWordsStudied !== 'number' ||
            typeof progress.totalCorrectAnswers !== 'number' ||
            typeof progress.totalIncorrectAnswers !== 'number' ||
            typeof progress.averageAccuracy !== 'number'
          ) {
            return false;
          }
        }
      }

      return true;
    } catch {
      return false;
    }
  }

  async downloadBackup(): Promise<void> {
    try {
      const backupData = await this.exportData();

      // Create filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `BeeVocab-backup-${timestamp}.json`;

      // Pretty print JSON for readability
      const jsonString = JSON.stringify(backupData, null, 2);

      // Create blob with proper MIME type
      const blob = new Blob([jsonString], {
        type: 'application/json;charset=utf-8',
      });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading backup:', error);
      throw new Error('Failed to download backup');
    }
  }

  async uploadBackup(file: File): Promise<void> {
    try {
      // Validate file before processing
      const fileValidation = this.validateBackupFile(file);
      if (!fileValidation.valid) {
        throw new Error(fileValidation.error || 'Invalid backup file');
      }

      // Read and parse file
      const text = await this.readFileAsText(file);
      let backupData: BackupData;

      try {
        backupData = JSON.parse(text);
      } catch {
        throw new Error('Invalid JSON format in backup file');
      }

      // Import with comprehensive validation
      await this.importData(backupData);
    } catch (error) {
      console.error('Error uploading backup:', error);
      throw new Error('Failed to upload backup');
    }
  }

  private readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };

      reader.readAsText(file);
    });
  }

  validateBackupFile(file: File): { valid: boolean; error?: string } {
    // Check file type
    if (!file.name.toLowerCase().endsWith('.json')) {
      return { valid: false, error: 'File must be a JSON file' };
    }

    // Check file size (max 50MB for comprehensive backups)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size must be less than ${Math.round(
          maxSize / 1024 / 1024
        )}MB`,
      };
    }

    // Check minimum file size (should have some content)
    if (file.size < 100) {
      return { valid: false, error: 'File appears to be empty or too small' };
    }

    // Check filename format (optional validation)
    const filename = file.name.toLowerCase();
    if (!filename.includes('backup') && !filename.includes('vocab')) {
      return {
        valid: true,
        error: 'Warning: File name does not suggest it is a vocabulary backup',
      };
    }

    return { valid: true };
  }

  async getBackupInfo(): Promise<{
    vocabularySets: number;
    vocabularyWords: number;
    studySessions: number;
    lastBackup?: string;
  }> {
    try {
      const data = await db.exportData();

      return {
        vocabularySets: data.vocabularySets.length,
        vocabularyWords: data.vocabularyWords.length,
        studySessions: data.studySessions.length,
        lastBackup: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error getting backup info:', error);
      throw new Error('Failed to get backup info');
    }
  }

  async clearAllData(): Promise<void> {
    try {
      await db.transaction(
        'rw',
        [
          db.vocabularySets,
          db.vocabularyWords,
          db.studySessions,
          db.userProgress,
          db.userSettings,
        ],
        async () => {
          await Promise.all([
            db.vocabularySets.clear(),
            db.vocabularyWords.clear(),
            db.studySessions.clear(),
            db.userProgress.clear(),
            db.userSettings.clear(),
          ]);
        }
      );
    } catch (error) {
      console.error('Error clearing data:', error);
      throw new Error('Failed to clear data');
    }
  }
}

export const backupService = new BackupService();
