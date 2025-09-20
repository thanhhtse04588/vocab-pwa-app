import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Pane, ThemeProvider } from 'evergreen-ui';
import { customTheme } from '@/theme/customTheme';
import { store, persistor } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loadSettings } from '@/store/slices/settingsSlice';
import { loadVocabularySets } from '@/store/slices/vocabularySlice';
import { loadTotalWordsToReview } from '@/store/slices/userProgressSlice';
import { audioInitializer } from '@/services/audioInitializer';
import {
  setTheme,
  updateThemeFromSystem,
} from '@/store/slices/navigationSlice';
// Import pages
import HomePage from '@/pages/HomePage';
import VocabularyPage from '@/pages/VocabularyPage';
import VocabularySetPage from '@/pages/VocabularySetPage';
import LearnPage from '@/pages/LearnPage';
import SettingsPage from '@/pages/SettingsPage';
import UserProfilePage from '@/pages/UserProfilePage';
import Navigation from '@/components/Navigation';
import AuthInitializer from '@/components/AuthInitializer';
import Header from './components/Header';

function AppContent() {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((state) => state.settings);
  const { currentPage, theme, isDark, vocabularySetId } = useAppSelector(
    (state) => state.navigation
  );

  useEffect(() => {
    // Load initial data
    dispatch(loadSettings());
    dispatch(loadVocabularySets());
    dispatch(loadTotalWordsToReview());

    // Initialize audio service
    audioInitializer.initialize();

    // Initialize PWA service
  }, [dispatch]);

  useEffect(() => {
    // Apply theme from settings to navigation
    if (settings?.theme) {
      dispatch(setTheme(settings.theme));
    }
  }, [dispatch, settings?.theme]);

  useEffect(() => {
    // Apply theme to document
    const currentTheme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.className = currentTheme;
  }, [isDark]);

  useEffect(() => {
    // Listen for system theme changes when auto mode is enabled
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => dispatch(updateThemeFromSystem());

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [dispatch, theme]);

  // Auto scroll to top when page changes
  useEffect(() => {
    // Find the scrollable container (the main content area)
    const scrollContainer =
      document.querySelector('[data-scroll-container]') ||
      document.querySelector('.page-content') ||
      document.documentElement;

    // Smooth scroll to top
    scrollContainer.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage, vocabularySetId]); // Trigger when page or vocabulary set changes

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'vocabulary':
        return <VocabularyPage />;
      case 'vocabulary-set':
        return vocabularySetId ? (
          <VocabularySetPage setId={vocabularySetId} />
        ) : (
          <VocabularyPage />
        );
      case 'learn':
        return <LearnPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <UserProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Pane
      height="100vh"
      maxHeight="100vh"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      width="100%"
      maxWidth="100%"
    >
      <AuthInitializer />
      <Header />
      <Pane
        flex={1}
        overflowX="hidden"
        overflowY="auto"
        paddingBottom={80}
        paddingTop={65}
        data-scroll-container
      >
        {renderCurrentPage()}
      </Pane>
      <Navigation />
    </Pane>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={customTheme}>
          <AppContent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
