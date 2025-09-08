import React from 'react';
import { Pane, Text } from 'evergreen-ui';

interface ThemeToggleProps {
  currentTheme: 'light' | 'dark' | 'auto';
  onThemeChange: (theme: 'light' | 'dark' | 'auto') => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'auto', label: 'Auto', icon: '🔄' },
  ] as const;

  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={16}
    >
      <Text>Theme</Text>
      <Pane display="flex" gap={8}>
        {themes.map((theme) => (
          <Pane
            key={theme.value}
            onClick={() => onThemeChange(theme.value)}
            padding={8}
            borderRadius={8}
            cursor="pointer"
            transition="all 0.2s ease"
            backgroundColor={
              currentTheme === theme.value
                ? 'var(--accent-primary)'
                : 'var(--bg-secondary)'
            }
            color={
              currentTheme === theme.value ? 'white' : 'var(--text-primary)'
            }
            border="1px solid"
            borderColor={
              currentTheme === theme.value
                ? 'var(--accent-primary)'
                : 'var(--border-color)'
            }
            _hover={{
              backgroundColor:
                currentTheme === theme.value
                  ? 'var(--accent-primary-hover)'
                  : 'var(--bg-tertiary)',
              transform: 'translateY(-1px)',
              boxShadow: 'var(--shadow)',
            }}
            style={{
              minWidth: '60px',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: currentTheme === theme.value ? '600' : '400',
            }}
          >
            <Pane marginBottom={4} fontSize="16px">
              {theme.icon}
            </Pane>
            <Text size={300}>{theme.label}</Text>
          </Pane>
        ))}
      </Pane>
    </Pane>
  );
};

export default ThemeToggle;
