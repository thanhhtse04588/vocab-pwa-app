import type { BackupData } from '@/types';
import { db } from '@/services/database';

class BackupService {
  async exportData(): Promise<BackupData> {
    try {
      const data = await db.exportData();
      
      const backupData: BackupData = {
        ...data,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      };

      return backupData;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Failed to export data');
    }
  }

  async importData(backupData: BackupData): Promise<void> {
    try {
      // Validate backup data
      this.validateBackupData(backupData);

      // Import data to database
      await db.importData(backupData);
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Failed to import data');
    }
  }

  private validateBackupData(data: BackupData): void {
    if (!data.vocabularySets || !Array.isArray(data.vocabularySets)) {
      throw new Error('Invalid backup data: vocabularySets is missing or not an array');
    }

    if (!data.vocabularyWords || !Array.isArray(data.vocabularyWords)) {
      throw new Error('Invalid backup data: vocabularyWords is missing or not an array');
    }

    if (!data.userProgress || !Array.isArray(data.userProgress)) {
      throw new Error('Invalid backup data: userProgress is missing or not an array');
    }

    if (!data.userSettings) {
      throw new Error('Invalid backup data: userSettings is missing');
    }

    if (!data.studySessions || !Array.isArray(data.studySessions)) {
      throw new Error('Invalid backup data: studySessions is missing or not an array');
    }

    if (!data.exportedAt) {
      throw new Error('Invalid backup data: exportedAt is missing');
    }

    if (!data.version) {
      throw new Error('Invalid backup data: version is missing');
    }
  }

  async downloadBackup(): Promise<void> {
    try {
      const backupData = await this.exportData();
      const jsonString = JSON.stringify(backupData, null, 2);
      
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `vocab-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading backup:', error);
      throw new Error('Failed to download backup');
    }
  }

  async uploadBackup(file: File): Promise<void> {
    try {
      const text = await this.readFileAsText(file);
      const backupData: BackupData = JSON.parse(text);
      
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

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { valid: false, error: 'File size must be less than 10MB' };
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
        lastBackup: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting backup info:', error);
      throw new Error('Failed to get backup info');
    }
  }

  async clearAllData(): Promise<void> {
    try {
      await db.transaction('rw', [
        db.vocabularySets,
        db.vocabularyWords,
        db.studySessions,
        db.userProgress,
        db.userSettings
      ], async () => {
        await Promise.all([
          db.vocabularySets.clear(),
          db.vocabularyWords.clear(),
          db.studySessions.clear(),
          db.userProgress.clear(),
          db.userSettings.clear()
        ]);
      });
    } catch (error) {
      console.error('Error clearing data:', error);
      throw new Error('Failed to clear data');
    }
  }
}

export const backupService = new BackupService();
