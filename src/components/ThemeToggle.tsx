import React from 'react';
import { Pane, Text } from 'evergreen-ui';
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
            style={{
              minWidth: '60px',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: currentTheme === theme.value ? '600' : '400',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                currentTheme === theme.value
                  ? 'var(--accent-primary-hover)'
                  : 'var(--bg-tertiary)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = 'var(--shadow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                currentTheme === theme.value
                  ? 'var(--accent-primary)'
                  : 'var(--bg-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Pane
              marginBottom={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <theme.icon size={16} />
            </Pane>
            <Text size={300}>{theme.label}</Text>
          </Pane>
        ))}
      </Pane>
    </Pane>
  );
};

export default ThemeToggle;
