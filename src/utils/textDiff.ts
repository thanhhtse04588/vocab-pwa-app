/**
 * Utility functions for text comparison and highlighting differences
 */

export interface TextDiffSegment {
  text: string;
  isDifferent: boolean;
}

/**
 * Compare two strings and return segments with difference markers
 * @param correctAnswer - The correct answer
 * @param userAnswer - The user's answer
 * @returns Array of segments with difference information
 */
export function compareTextWithDiff(
  correctAnswer: string,
  userAnswer: string
): TextDiffSegment[] {
  const segments: TextDiffSegment[] = [];
  const maxLength = Math.max(correctAnswer.length, userAnswer.length);

  for (let i = 0; i < maxLength; i++) {
    const correctChar = correctAnswer[i] || '';
    const userChar = userAnswer[i] || '';

    if (correctChar === userChar) {
      // Characters match
      if (segments.length > 0 && !segments[segments.length - 1].isDifferent) {
        // Extend existing correct segment
        segments[segments.length - 1].text += correctChar;
      } else {
        // Start new correct segment
        segments.push({
          text: correctChar,
          isDifferent: false,
        });
      }
    } else {
      // Characters don't match
      if (segments.length > 0 && segments[segments.length - 1].isDifferent) {
        // Extend existing different segment
        segments[segments.length - 1].text += correctChar;
      } else {
        // Start new different segment
        segments.push({
          text: correctChar,
          isDifferent: true,
        });
      }
    }
  }

  return segments;
}

/**
 * Compare two strings character by character and return detailed diff
 * @param correctAnswer - The correct answer
 * @param userAnswer - The user's answer
 * @returns Object with correct and user segments
 */
export function getDetailedTextDiff(
  correctAnswer: string,
  userAnswer: string
): {
  correctSegments: TextDiffSegment[];
  userSegments: TextDiffSegment[];
} {
  const correctSegments: TextDiffSegment[] = [];
  const userSegments: TextDiffSegment[] = [];

  const maxLength = Math.max(correctAnswer.length, userAnswer.length);

  for (let i = 0; i < maxLength; i++) {
    const correctChar = correctAnswer[i] || '';
    const userChar = userAnswer[i] || '';
    const isDifferent = correctChar !== userChar;

    // Add to correct segments
    if (
      correctSegments.length > 0 &&
      correctSegments[correctSegments.length - 1].isDifferent === isDifferent
    ) {
      correctSegments[correctSegments.length - 1].text += correctChar;
    } else {
      correctSegments.push({
        text: correctChar,
        isDifferent,
      });
    }

    // Add to user segments
    if (
      userSegments.length > 0 &&
      userSegments[userSegments.length - 1].isDifferent === isDifferent
    ) {
      userSegments[userSegments.length - 1].text += userChar;
    } else {
      userSegments.push({
        text: userChar,
        isDifferent,
      });
    }
  }

  return {
    correctSegments,
    userSegments,
  };
}
