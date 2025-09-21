import { defaultTheme } from 'evergreen-ui';

// Light theme with #f7ac15 as primary color
export const lightTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    // Override primary colors with #f7ac15
    primary: '#f7ac15',
    primaryHover: '#e69a0e',
    primaryActive: '#d4880c',
    primaryLight: '#f9b833',
    primaryDark: '#c8960a',

    // Update blue colors to use our primary
    blue: '#f7ac15',
    blue100: '#c5c5c5',
    blue200: '#fcecc7',
    blue300: '#f9d98a',
    blue400: '#f5c64d',
    blue500: '#f7ac15',
    blue600: '#e69a0e',
    blue700: '#d4880c',
    blue800: '#c2760a',
    blue900: '#b06408',
  },
};

// Dark theme inspired by Firebase console and Evergreen colors
export const darkTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    // Background colors - Firebase console inspired
    backgroundTint: '#282828',
    backgroundMuted: '#303030',

    // Text colors
    textMuted: '#b3b3b3',
    textDisabled: '#8a8a8a',

    // Gray scale - inverted for dark mode
    gray50: '#1e1e1e', // Darkest
    gray75: '#282828',
    gray100: '#303030',
    gray200: '#404040',
    gray300: '#4a4a4a',
    gray400: '#5a5a5a',
    gray500: '#6a6a6a',
    gray600: '#8a8a8a',
    gray700: '#b3b3b3',
    gray800: '#d3d3d3',
    gray900: '#ffffff', // Lightest

    // Blue colors - Firebase blue
    blue: '#3366ff',
    blue100: '#0a1433',
    blue200: '#142966',
    blue300: '#1f3d99',
    blue400: '#2952cc',
    blue500: '#3366ff',
    blue600: '#5c85ff',
    blue700: '#85a3ff',
    blue800: '#adc2ff',
    blue900: '#d6e0ff',

    // Primary colors - keep bee yellow
    primary: '#f7ac15',
    primaryHover: '#e69a0e',
    primaryActive: '#d4880c',
    primaryLight: '#f9b833',
    primaryDark: '#c8960a',

    // Status colors - Evergreen inspired
    red: '#d14343',
    red100: '#7d2828',
    red200: '#a73636',
    red300: '#d14343',
    red400: '#ee9191',
    red500: '#f9dada',

    green: '#52bd95',
    green100: '#10261e',
    green200: '#214c3c',
    green300: '#317159',
    green400: '#429777',
    green500: '#52bd95',
    green600: '#75caaa',
    green700: '#97d7bf',
    green800: '#bae5d5',
    green900: '#dcf2ea',

    orange: '#ffb020',
    orange100: '#996a13',
    orange200: '#ffb020',
    orange300: '#f8e3da',

    // Override default colors for dark theme
    muted: '#8a8a8a',
    default: '#b3b3b3',
    dark: '#ffffff',
    selected: '#3366ff',
    tint1: '#282828',
    tint2: '#303030',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

// Export the light theme as the default customTheme for backward compatibility
export const customTheme = lightTheme;
