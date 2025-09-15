/**
 * Helper function to normalize text by removing special characters and converting to lowercase
 * @param text - The text to normalize
 * @returns Normalized text with special characters removed and converted to lowercase
 */
export const normalizeText = (text: string): string => {
  return (
    text
      .toLowerCase()
      .trim()
      // Remove special characters, keeping letters (including Unicode), numbers, and spaces
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      // Replace multiple spaces with single space
      .replace(/\s+/g, ' ')
      .trim()
  );
};

/**
 * Helper function to compare user answer with correct word
 * @param userAnswer - The user's input answer
 * @param correctWord - The correct word to compare against
 * @returns true if the answers match after normalization, false otherwise
 */
export const compareWords = (
  userAnswer: string,
  correctWord: string
): boolean => {
  const normalizedUserAnswer = normalizeText(userAnswer);
  const normalizedCorrectWord = normalizeText(correctWord);

  return normalizedUserAnswer === normalizedCorrectWord;
};
