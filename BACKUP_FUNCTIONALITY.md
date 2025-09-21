# Backup and Restore Functionality

## Overview

The vocabulary learning app includes backup and restore functionality that ensures data integrity and correctness. This document describes the features and how they work.

## Key Features

### 1. Data Integrity
- **Checksum Verification**: SHA-256 checksums ensure data hasn't been corrupted
- **Schema Validation**: Ensures data structure matches expected format

### 2. Security
- **File Validation**: File type and size validation
- **Input Sanitization**: Protection against malicious file uploads

### 3. Correctness
- **Comprehensive Validation**: Multi-layer validation before and after import
- **Error Handling**: Detailed error messages and recovery suggestions
- **Transaction Safety**: Database operations wrapped in transactions
- **Rollback Capability**: Failed imports don't corrupt existing data

## Technical Implementation

### BackupData Structure

```typescript
interface BackupData {
  // Core data
  vocabularySets: VocabularySet[];
  vocabularyWords: VocabularyWord[];
  userProgress: UserProgress[];
  userSettings: UserSettings;
  studySessions: StudySession[];
  
  // Metadata
  exportedAt: string;
  version: string;
  
  // Integrity
  checksum: string;        // SHA-256 hash for integrity verification
}
```

### Validation Process

1. **File Validation**
   - File type check (must be .json)
   - File size limits (100 bytes - 50MB)

2. **Structure Validation**
   - Required fields presence
   - Data type validation
   - Array structure validation

3. **Integrity Validation**
   - Checksum verification

4. **Schema Validation**
   - Field value ranges
   - Enum value validation
   - Relationship validation

5. **Import Verification**
   - Post-import record count check
   - Data consistency verification

### Security Features

#### File Security
- MIME type validation
- File size limits
- Filename sanitization
- Content type verification

#### Data Security
- SHA-256 hashing for integrity
- Input validation and sanitization

#### Process Security
- Transaction-wrapped operations
- Atomic import/export operations
- Error isolation
- Rollback on failure

## Usage Examples

### Basic Export
```typescript
// Export all data with integrity verification
const backupData = await backupService.exportData();
await backupService.downloadBackup();
```

### Basic Import
```typescript
// Import with comprehensive validation
await backupService.uploadBackup(file);
```

### Advanced Validation
```typescript
// Validate file before import
const validation = await backupService.validateBackupFileContent(file);
if (validation.isValid) {
  await backupService.importData(backupData);
} else {
  console.error('Validation failed:', validation.errors);
}
```

### Encrypted Backup
```typescript
// Create encrypted backup
const encryptedBlob = await backupService.createEncryptedBackup('password');
```

## Error Handling

### Validation Errors
- **Structure Errors**: Missing required fields or arrays
- **Type Errors**: Incorrect data types or values
- **Integrity Errors**: Checksum or hash mismatches
- **Schema Errors**: Invalid field values or relationships

### Import Errors
- **File Errors**: Invalid file format or size
- **Parse Errors**: JSON parsing failures
- **Database Errors**: Transaction failures or constraint violations
- **Verification Errors**: Post-import validation failures

### Recovery
- **Automatic Rollback**: Failed imports don't affect existing data
- **Detailed Logging**: Comprehensive error messages for debugging
- **Graceful Degradation**: Partial failures are handled gracefully

## File Format

### Backup File Naming
```
BeeVocab-backup-YYYY-MM-DD.json
```

### File Structure
```json
{
  "vocabularySets": [...],
  "vocabularyWords": [...],
  "userProgress": [...],
  "userSettings": {...},
  "studySessions": [...],
  "exportedAt": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "checksum": "sha256-hash"
}
```

## Testing

### Test Utilities
The `BackupTestUtils` class provides comprehensive testing:

```typescript
// Run all backup tests
await BackupTestUtils.runBackupTests();

// Test individual components
await BackupTestUtils.testBackupExport();
await BackupTestUtils.testBackupImport(backupData);
await BackupTestUtils.testFileValidation();
```

### Test Coverage
- Export functionality
- Import functionality
- File validation
- Data integrity
- Error handling
- Edge cases

## Performance Considerations

### Export Performance
- Parallel data retrieval
- Efficient JSON serialization
- Minimal memory footprint
- Progress tracking

### Import Performance
- Transaction-wrapped operations
- Bulk insert operations
- Memory-efficient processing
- Validation optimization

### File Size
- Typical backup: 10-100KB
- Maximum size: 50MB
- Compression: Optional future feature
- Chunking: For very large datasets

## Future Enhancements

### Planned Features
- **Compression**: Gzip compression for smaller files
- **Incremental Backups**: Only export changed data
- **Cloud Storage**: Direct cloud backup integration
- **Version History**: Multiple backup versions
- **Scheduled Backups**: Automatic backup creation

### Security Improvements
- **Stronger Encryption**: AES-256 encryption
- **Key Management**: Secure key storage
- **Digital Signatures**: Cryptographic signatures
- **Access Control**: User-based permissions

## Troubleshooting

### Common Issues

1. **"Invalid backup file"**
   - Check file format (must be .json)
   - Verify file size (100 bytes - 50MB)
   - Ensure file isn't corrupted

2. **"Data checksum verification failed"**
   - File may be corrupted
   - Try re-exporting the backup
   - Check file transfer integrity

3. **"Schema validation failed"**
   - Backup may be from different app version
   - Check data structure compatibility
   - Verify all required fields are present

4. **"Import verification failed"**
   - Database transaction failed
   - Check available storage space
   - Verify database permissions

### Debug Information
- Enable console logging for detailed error information
- Use `BackupTestUtils` for testing
- Check browser developer tools for error details
- Verify IndexedDB is available and working

## Conclusion

The enhanced backup and restore functionality provides a robust, secure, and reliable way to protect user data. With comprehensive validation, integrity checks, and error handling, users can confidently backup and restore their vocabulary learning progress without fear of data loss or corruption.
