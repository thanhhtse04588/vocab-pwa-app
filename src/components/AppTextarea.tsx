import React, { useState, useEffect } from 'react';
import { Textarea } from 'evergreen-ui';
import { CHARACTER_LIMIT } from '@/constants';

interface AppTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
  maxLength?: number;
  [key: string]: unknown; // For other Textarea props
}

const AppTextarea: React.FC<AppTextareaProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  width = '100%',
  height,
  className,
  maxLength = CHARACTER_LIMIT,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);

  // Sync internal value with external value
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // Apply character limit
    if (newValue.length <= maxLength) {
      setInternalValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <Textarea
      value={internalValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      width={width}
      height={height}
      className={className}
      maxLength={maxLength}
      {...props}
    />
  );
};

export default AppTextarea;
