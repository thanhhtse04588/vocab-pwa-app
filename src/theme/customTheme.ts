import { mergeTheme, defaultTheme } from 'evergreen-ui';

// Custom theme with #f7ac15 as primary color
export const customTheme = mergeTheme(defaultTheme, {
  colors: {
    // Override primary colors with #f7ac15
    primary: '#f7ac15',
    primaryHover: '#e69a0e', // Slightly darker for hover state
    primaryActive: '#d4880c', // Even darker for active state
    primaryLight: '#f9b833', // Lighter shade
    primaryDark: '#c8960a', // Darker shade

    // Update related colors to work well with the new primary
    blue: '#f7ac15', // Override blue to use our primary
    blue100: '#fef7e6', // Very light tint
    blue200: '#fcecc7', // Light tint
    blue300: '#f9d98a', // Medium light tint
    blue400: '#f5c64d', // Medium tint
    blue500: '#f7ac15', // Our primary color
    blue600: '#e69a0e', // Medium dark
    blue700: '#d4880c', // Dark
    blue800: '#c2760a', // Darker
    blue900: '#b06408', // Darkest
  },
  components: {
    Button: {
      appearances: {
        primary: {
          backgroundColor: '#f7ac15',
          color: '#ffffff',
          selectors: {
            _hover: {
              backgroundColor: '#e69a0e',
            },
            _active: {
              backgroundColor: '#d4880c',
            },
            _focus: {
              boxShadow: '0 0 0 3px rgba(247, 172, 21, 0.3)',
            },
          },
        },
        danger: {
          color: 'white',
          backgroundColor: 'indianred',
          selectors: {
            _hover: {
              backgroundColor: 'firebrick',
            },
            _active: {
              backgroundColor: 'darkred',
            },
            _focus: {
              boxShadow: '0 0 0 2px lightcoral',
            },
          },
        },
      },
    },
    IconButton: {
      appearances: {
        primary: {
          backgroundColor: '#f7ac15',
          color: '#ffffff',
          selectors: {
            _hover: {
              backgroundColor: '#e69a0e',
            },
            _active: {
              backgroundColor: '#d4880c',
            },
            _focus: {
              boxShadow: '0 0 0 3px rgba(247, 172, 21, 0.3)',
            },
          },
        },
      },
    },
    Badge: {
      appearances: {
        primary: {
          backgroundColor: '#f7ac15',
          color: '#ffffff',
        },
      },
    },
    ProgressBar: {
      baseStyle: {
        backgroundColor: '#f7ac15',
      },
    },
  },
});
