import type { CSVWordData } from '@/types';

export interface CSVParseResult {
  success: boolean;
  data: CSVWordData[];
  errors: string[];
  warnings: string[];
}

export const parseCSV = (csvContent: string): CSVParseResult => {
  const result: CSVParseResult = {
    success: true,
    data: [],
    errors: [],
    warnings: []
  };

  try {
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      result.errors.push('CSV file is empty');
      result.success = false;
      return result;
    }

    // Parse header row
    const headerLine = lines[0];
    const headers = parseCSVLine(headerLine);
    
    // Validate headers
    const requiredHeaders = ['word', 'meaning'];
    const missingHeaders = requiredHeaders.filter(header => 
      !headers.some(h => h.toLowerCase().includes(header.toLowerCase()))
    );

    if (missingHeaders.length > 0) {
      result.errors.push(`Missing required columns: ${missingHeaders.join(', ')}`);
      result.success = false;
      return result;
    }

    // Find column indices
    const wordIndex = findColumnIndex(headers, ['word', 'term', 'vocabulary']);
    const meaningIndex = findColumnIndex(headers, ['meaning', 'definition', 'translation']);
    const pronunciationIndex = findColumnIndex(headers, ['pronunciation', 'phonetic', 'sound']);
    const exampleIndex = findColumnIndex(headers, ['example', 'sentence', 'usage']);

    if (wordIndex === -1 || meaningIndex === -1) {
      result.errors.push('Could not find word and meaning columns');
      result.success = false;
      return result;
    }

    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const values = parseCSVLine(line);
        
        if (values.length < Math.max(wordIndex, meaningIndex) + 1) {
          result.warnings.push(`Row ${i + 1}: Insufficient columns`);
          continue;
        }

        const word = values[wordIndex]?.trim();
        const meaning = values[meaningIndex]?.trim();
        const pronunciation = pronunciationIndex !== -1 ? values[pronunciationIndex]?.trim() : undefined;
        const example = exampleIndex !== -1 ? values[exampleIndex]?.trim() : undefined;

        if (!word || !meaning) {
          result.warnings.push(`Row ${i + 1}: Missing word or meaning`);
          continue;
        }

        // Check for duplicates
        const isDuplicate = result.data.some(item => 
          item.word.toLowerCase() === word.toLowerCase()
        );

        if (isDuplicate) {
          result.warnings.push(`Row ${i + 1}: Duplicate word "${word}"`);
          continue;
        }

        result.data.push({
          word,
          meaning,
          pronunciation: pronunciation || undefined,
          example: example || undefined
        });

      } catch (error) {
        result.warnings.push(`Row ${i + 1}: Parse error - ${error}`);
      }
    }

    if (result.data.length === 0) {
      result.errors.push('No valid data rows found');
      result.success = false;
    }

  } catch (error) {
    result.errors.push(`CSV parsing failed: ${error}`);
    result.success = false;
  }

  return result;
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i += 2;
        continue;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current);
      current = '';
    } else {
      current += char;
    }
    i++;
  }

  // Add the last field
  result.push(current);

  return result;
};

const findColumnIndex = (headers: string[], searchTerms: string[]): number => {
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i].toLowerCase().trim();
    if (searchTerms.some(term => header.includes(term.toLowerCase()))) {
      return i;
    }
  }
  return -1;
};

export const validateCSVFile = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  if (!file.name.toLowerCase().endsWith('.csv')) {
    return { valid: false, error: 'File must be a CSV file' };
  }

  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }

  return { valid: true };
};

export const downloadCSVTemplate = (): void => {
  const template = 'word,meaning,pronunciation,example\n"hello","greeting","/həˈloʊ/","Hello, how are you?"\n"goodbye","farewell","/ɡʊdˈbaɪ/","Goodbye, see you later!"';
  
  const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'vocabulary_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
