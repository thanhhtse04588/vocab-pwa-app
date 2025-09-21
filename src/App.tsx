import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Pane, ThemeProvider } from 'evergreen-ui';
import { lightTheme, darkTheme } from '@/theme/customTheme';
import { store, persistor } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loadSettings } from '@/store/slices/settingsSlice';
import { loadVocabularySets } from '@/store/slices/vocabularySlice';
import { loadTotalWordsToReview } from '@/store/slices/userProgressSlice';
import { audioInitializer } from '@/services/audioInitializer';
import { updateThemeFromSystem } from '@/store/slices/settingsSlice';
// Import pages
import HomePage from '@/pages/HomePage';
import VocabularyPage from '@/pages/VocabularyPage';
import VocabularySetPage from '@/pages/VocabularySetPage';
import LearnPage from '@/pages/LearnPage';
import SettingsPage from '@/pages/SettingsPage';
import UserProfilePage from '@/pages/UserProfilePage';
import AdminPage from '@/pages/AdminPage';
import AuthInitializer from '@/components/AuthInitializer';
import LoadingScreen from '@/components/LoadingScreen';
import LoginPrompt from '@/components/LoginPrompt';
import MainContent from '@/components/MainContent';
import Header from './components/Header';

/**
 * Main application content component that handles routing and authentication state.
 * Manages theme, settings, and renders appropriate content based on user state.
 */
function AppContent(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const { settings, isDark } = useAppSelector((state) => state.settings);
  const { currentPage, vocabularySetId } = useAppSelector(
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

  // Theme is now managed directly in settingsSlice, no need to sync

  useEffect(() => {
    // Apply theme to document
    const currentTheme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.className = currentTheme;
  }, [isDark]);

  useEffect(() => {
    // Listen for system theme changes when auto mode is enabled
    if (settings?.theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => dispatch(updateThemeFromSystem());

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [dispatch, settings?.theme]);

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

  /**
   * Renders the current page based on the navigation state.
   * @returns JSX element for the current page
   */
  const renderCurrentPage = (): JSX.Element => {
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
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  /**
   * Renders the main application content based on authentication and loading state.
   * @returns JSX element for the appropriate app state
   */
  const renderAppContent = (): JSX.Element => {
    if (loading) {
      return <LoadingScreen />;
    }

    if (user) {
      return <MainContent>{renderCurrentPage()}</MainContent>;
    }

    return <LoginPrompt />;
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
      {renderAppContent()}
    </Pane>
  );
}

/**
 * Theme provider component that handles dynamic theme switching
 * @returns JSX element with theme provider
 */
function AppWithTheme(): JSX.Element {
  const { isDark } = useAppSelector((state) => state.settings);

  return (
    <ThemeProvider value={isDark ? darkTheme : lightTheme}>
      <AppContent />
    </ThemeProvider>
  );
}

/**
 * Root App component that provides Redux store, persistence, and theme context.
 * @returns JSX element for the entire application
 */
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWithTheme />
      </PersistGate>
    </Provider>
  );
}

export default App;
