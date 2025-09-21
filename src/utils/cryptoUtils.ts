/**
 * Cryptographic utilities for data integrity and security
 * Provides functions for hashing, checksums, and data validation
 */

// Simple SHA-256 implementation using Web Crypto API
export class CryptoUtils {
  /**
   * Generate SHA-256 hash of the given data
   * @param data - String or ArrayBuffer to hash
   * @returns Promise<string> - Hex-encoded hash
   */
  static async sha256(data: string | ArrayBuffer): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = typeof data === 'string' ? encoder.encode(data) : data;
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Generate a simple checksum for data integrity verification
   * @param data - Object to generate checksum for
   * @returns Promise<string> - Checksum string
   */
  static async generateChecksum(data: unknown): Promise<string> {
    const jsonString = JSON.stringify(data, null, 0); // No whitespace for consistency
    return this.sha256(jsonString);
  }

  /**
   * Verify data integrity using checksum
   * @param data - Data to verify
   * @param expectedChecksum - Expected checksum
   * @returns Promise<boolean> - True if checksum matches
   */
  static async verifyChecksum(
    data: unknown,
    expectedChecksum: string
  ): Promise<boolean> {
    const actualChecksum = await this.generateChecksum(data);
    return actualChecksum === expectedChecksum;
  }
}
