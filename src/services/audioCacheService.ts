/**
 * Audio Cache Service
 * Caches audio data to avoid re-synthesizing the same text
 * Uses Dexie for persistent storage
 */

import Dexie, { type Table } from 'dexie';

export interface CachedAudio {
  key: string;
  text: string;
  audioData: string;
  options: AudioCacheOptions;
  timestamp: number;
  size: number;
}

export interface AudioCacheOptions {
  languageCode?: string;
  voiceName?: string;
  ssmlGender?: 'NEUTRAL' | 'MALE' | 'FEMALE';
  speakingRate?: number;
  pitch?: number;
  volumeGainDb?: number;
}

class AudioCacheDB extends Dexie {
  audioCache!: Table<CachedAudio>;

  constructor() {
    super('AudioCacheDB');
    this.version(1).stores({
      audioCache: 'key, text, timestamp, size',
    });
  }
}

class AudioCacheService {
  private db = new AudioCacheDB();
  private memoryCache = new Map<string, CachedAudio>(); // Memory fallback
  private maxCacheSize = 50; // Maximum number of cached items
  private maxCacheAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  private maxTotalSize = 100 * 1024 * 1024; // 100MB total cache size

  constructor() {
    this.initializeDB();
  }

  /**
   * Initialize Dexie database
   */
  private async initializeDB(): Promise<void> {
    try {
      await this.db.open();
      console.log('🎵 Audio cache Dexie database initialized');
    } catch (error) {
      console.warn('Failed to initialize Dexie for audio cache:', error);
    }
  }

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
        console.log(`🎵 Audio cache hit (memory) for: "${text}"`);
        return memoryCached.audioData;
      } else {
        this.memoryCache.delete(key);
      }
    }

    // Check Dexie if available
    try {
      const cached = await this.db.audioCache.get(key);
      if (cached) {
        const now = Date.now();
        if (now - cached.timestamp <= this.maxCacheAge) {
          // Update memory cache
          this.memoryCache.set(key, cached);
          console.log(`🎵 Audio cache hit (Dexie) for: "${text}"`);
          return cached.audioData;
        } else {
          // Remove expired entry
          await this.db.audioCache.delete(key);
        }
      }
    } catch (error) {
      console.warn('Failed to get from Dexie:', error);
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
      await this.db.audioCache.put(cachedAudio);
      await this.cleanupDexie();
    } catch (error) {
      console.warn('Failed to store in Dexie:', error);
    }

    console.log(`🎵 Audio cached for: "${text}" (${audioSize} bytes)`);
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
      const cached = await this.db.audioCache.get(key);
      if (cached) {
        const now = Date.now();
        if (now - cached.timestamp <= this.maxCacheAge) {
          return true;
        } else {
          await this.db.audioCache.delete(key);
        }
      }
    } catch (error) {
      console.warn('Failed to check Dexie:', error);
    }

    return false;
  }

  /**
   * Cleanup Dexie - remove expired entries and enforce limits
   */
  private async cleanupDexie(): Promise<void> {
    try {
      const now = Date.now();

      // Remove expired entries
      await this.db.audioCache
        .where('timestamp')
        .below(now - this.maxCacheAge)
        .delete();

      // Get all remaining entries
      const allEntries = await this.db.audioCache.toArray();

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
          await this.db.audioCache.bulkDelete(keysToRemove);
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
          await this.db.audioCache.delete(sortedEntries[index].key);
          currentSize -= sortedEntries[index].size;
          index++;
        }
      }
    } catch (error) {
      console.warn('Failed to cleanup Dexie:', error);
    }
  }

  /**
   * Clear all cache (both memory and Dexie)
   */
  async clearCache(): Promise<void> {
    // Clear memory cache
    this.memoryCache.clear();

    // Clear Dexie if available
    try {
      await this.db.audioCache.clear();
    } catch (error) {
      console.warn('Failed to clear Dexie:', error);
    }

    console.log('🧹 Audio cache cleared (memory + Dexie)');
  }

  /**
   * Get cache statistics
   */
  async getCacheStats(): Promise<{
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
      dexieEntries = await this.db.audioCache.toArray();
    } catch (error) {
      console.warn('Failed to get Dexie stats:', error);
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
   * Get cache size in human readable format
   */
  async getCacheSizeFormatted(): Promise<string> {
    const stats = await this.getCacheStats();
    const bytes = stats.totalSize;

    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }

  /**
   * Set cache limits
   */
  setCacheLimits(
    maxCacheSize: number,
    maxCacheAge: number,
    maxTotalSize: number
  ): void {
    this.maxCacheSize = maxCacheSize;
    this.maxCacheAge = maxCacheAge;
    this.maxTotalSize = maxTotalSize;
    console.log('🎵 Audio cache limits updated');
  }
}

// Export singleton instance
export const audioCacheService = new AudioCacheService();
