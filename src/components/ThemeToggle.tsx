import React from 'react';
import { Pane, Text, Select } from 'evergreen-ui';
import { Sun, Moon, RefreshCw } from 'lucide-react';

interface ThemeToggleProps {
  currentTheme: 'light' | 'dark' | 'auto';
  onThemeChange: (theme: 'light' | 'dark' | 'auto') => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'Auto', icon: RefreshCw },
  ] as const;

  const selectedOption = themes.find((theme) => theme.value === currentTheme);

  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={16}
    >
      <Pane display="flex" alignItems="center" gap={8}>
        <Text>Theme</Text>
        {selectedOption && (
          <selectedOption.icon size={16} color="var(--text-secondary)" />
        )}
      </Pane>
      <Pane width={120}>
        <Select
          value={currentTheme}
          onChange={(e) =>
            onThemeChange(e.target.value as 'light' | 'dark' | 'auto')
          }
          width="100%"
        >
          {themes.map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </Select>
      </Pane>
    </Pane>
  );
};

export default ThemeToggle;
