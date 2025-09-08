import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TabId } from '@/types';

type Theme = 'light' | 'dark' | 'auto';

interface NavigationState {
  activeTab: TabId;
  previousTab?: TabId;
  history: TabId[];
  currentPage: string;
  theme: Theme;
  isDark: boolean;
  vocabularySetId?: string;
}

const initialState: NavigationState = {
  activeTab: 'home',
  previousTab: undefined,
  history: ['home'],
  currentPage: 'home',
  theme: 'auto',
  isDark: false,
  vocabularySetId: undefined,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TabId>) => {
      if (state.activeTab !== action.payload) {
        state.previousTab = state.activeTab;
        state.activeTab = action.payload;
        state.currentPage = action.payload;
        
        // Add to history if not already the last item
        if (state.history[state.history.length - 1] !== action.payload) {
          state.history.push(action.payload);
          
          // Keep history limited to 10 items
          if (state.history.length > 10) {
            state.history = state.history.slice(-10);
          }
        }
      }
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setVocabularySetId: (state, action: PayloadAction<string | undefined>) => {
      state.vocabularySetId = action.payload;
    },
    goBack: (state) => {
      if (state.history.length > 1) {
        state.history.pop(); // Remove current tab
        state.previousTab = state.activeTab;
        state.activeTab = state.history[state.history.length - 1];
        state.currentPage = state.activeTab;
      }
    },
    resetNavigation: (state) => {
      state.activeTab = 'home';
      state.previousTab = undefined;
      state.history = ['home'];
      state.currentPage = 'home';
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      
      // Calculate isDark based on theme
      if (action.payload === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        state.isDark = prefersDark;
      } else {
        state.isDark = action.payload === 'dark';
      }
    },
    updateThemeFromSystem: (state) => {
      if (state.theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        state.isDark = prefersDark;
      }
    },
  },
});

export const { 
  setActiveTab, 
  setCurrentPage, 
  setVocabularySetId,
  goBack, 
  resetNavigation, 
  setTheme, 
  updateThemeFromSystem 
} = navigationSlice.actions;
export default navigationSlice.reducer;
