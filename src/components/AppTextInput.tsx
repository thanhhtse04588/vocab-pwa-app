import React, { useState, useEffect } from 'react';
import { TextInput, Text, Pane } from 'evergreen-ui';
import { CHARACTER_LIMIT } from '@/constants';

interface AppTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  paddingRight?: string | number;
  minWidth?: string | number;
  className?: string;
  showCharacterCount?: boolean;
  maxLength?: number;
  [key: string]: any; // For other TextInput props
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  width = '100%',
  height,
  paddingRight,
  minWidth,
  className,
  showCharacterCount = true,
  maxLength = CHARACTER_LIMIT,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);

  // Sync internal value with external value
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Apply character limit
    if (newValue.length <= maxLength) {
      setInternalValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <Pane>
      <TextInput
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        width={width}
        height={height}
        paddingRight={paddingRight}
        minWidth={minWidth}
        className={className}
        maxLength={maxLength}
        {...props}
      />
      {showCharacterCount && (
        <Text size={300} color="muted" marginTop={4}>
          {internalValue.length}/{maxLength} characters
        </Text>
      )}
    </Pane>
  );
};

export default AppTextInput;
