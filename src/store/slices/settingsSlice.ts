import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { UserSettings } from '@/types';
import { db } from '@/services/database';

interface SettingsState {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null,
};

// Async thunks
export const loadSettings = createAsyncThunk('settings/load', async () => {
  const settings = await db.getSettings();
  return settings;
});

export const updateSettings = createAsyncThunk(
  'settings/update',
  async (updates: Partial<UserSettings>) => {
    const currentSettings = await db.getSettings();
    const updatedSettings = { ...currentSettings, ...updates };

    await db.userSettings.put(updatedSettings);
    return updatedSettings;
  }
);

export const resetSettings = createAsyncThunk('settings/reset', async () => {
  const defaultSettings = await db.createDefaultSettings();
  return defaultSettings;
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      if (state.settings) {
        state.settings.theme = action.payload;
      }
    },
    toggleNotifications: (state) => {
      if (state.settings) {
        state.settings.enableNotifications =
          !state.settings.enableNotifications;
      }
    },
    toggleSound: (state) => {
      if (state.settings) {
        state.settings.enableSound = !state.settings.enableSound;
      }
    },
    toggleVibration: (state) => {
      if (state.settings) {
        state.settings.enableVibration = !state.settings.enableVibration;
      }
    },
    setBatchSize: (state, action: PayloadAction<number>) => {
      if (state.settings) {
        state.settings.batchSize = action.payload;
      }
    },
    setNotificationTime: (state, action: PayloadAction<string>) => {
      if (state.settings) {
        state.settings.notificationTime = action.payload;
      }
    },
    // TTS Settings
    setTTSGender: (
      state,
      action: PayloadAction<'male' | 'female' | 'neutral'>
    ) => {
      if (state.settings) {
        state.settings.ttsGender = action.payload;
      }
    },
    setTTSRate: (state, action: PayloadAction<number>) => {
      if (state.settings) {
        state.settings.ttsRate = action.payload;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load settings
      .addCase(loadSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(loadSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load settings';
      })

      // Update settings
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update settings';
      })

      // Reset settings
      .addCase(resetSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      });
  },
});

export const {
  setTheme,
  toggleNotifications,
  toggleSound,
  toggleVibration,
  setBatchSize,
  setNotificationTime,
  setTTSGender,
  setTTSRate,
  clearError,
} = settingsSlice.actions;

export default settingsSlice.reducer;
