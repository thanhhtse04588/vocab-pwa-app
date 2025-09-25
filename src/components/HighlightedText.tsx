import React from 'react';
import { Text } from 'evergreen-ui';
import type { TextDiffSegment } from '@/utils/textDiff';

interface HighlightedTextProps {
  segments: TextDiffSegment[];
  size?: number;
  color?: string;
  highlightColor?: string;
  highlightBackgroundColor?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  segments,
  size = 400,
  color = 'default',
  highlightColor = 'danger',
  highlightBackgroundColor = '#ffebee',
}) => {
  return (
    <Text size={size} color={color}>
      {segments.map((segment, index) => (
        <span
          key={index}
          style={{
            backgroundColor: segment.isDifferent
              ? highlightBackgroundColor
              : 'transparent',
            color: segment.isDifferent ? highlightColor : 'inherit',
            padding: segment.isDifferent ? '2px 4px' : '0',
            borderRadius: segment.isDifferent ? '3px' : '0',
            fontWeight: segment.isDifferent ? 'bold' : 'normal',
          }}
        >
          {segment.text}
        </span>
      ))}
    </Text>
  );
};

export default HighlightedText;
