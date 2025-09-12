import { Text, Tooltip } from 'evergreen-ui';
import React, { useEffect, useRef, useState } from 'react';

interface TextOverflowProps {
  children: string;
  maxWidth: number | string;
  className?: string;
  color?: string;
  size?: number;
  fontWeight?: string | number;
  margin?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: string | number;
}

const TextOverflow: React.FC<TextOverflowProps> = ({
  children,
  maxWidth,
  className,
  color,
  size,
  fontWeight,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  textAlign,
  lineHeight,
  ...props
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const element = textRef.current;
        setIsOverflowing(element.scrollWidth > element.clientWidth);
      }
    };

    checkOverflow();

    // Check overflow on window resize
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children, maxWidth]);

  const textElement = (
    <Text
      ref={textRef}
      className={className}
      color={color}
      size={size}
      fontWeight={fontWeight}
      margin={margin}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      textAlign={textAlign}
      lineHeight={lineHeight}
      style={{
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      }}
      {...props}
    >
      {children}
    </Text>
  );

  // Only show tooltip if text is overflowing
  if (isOverflowing) {
    return (
      <Tooltip content={children} position="top">
        {textElement}
      </Tooltip>
    );
  }

  return textElement;
};

export default TextOverflow;
