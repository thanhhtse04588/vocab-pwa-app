import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import vocabularySlice from '@/store/slices/vocabularySlice';
import studySlice from '@/store/slices/studySlice';
import settingsSlice from '@/store/slices/settingsSlice';
import navigationSlice from '@/store/slices/navigationSlice';
import userProgressSlice from '@/store/slices/userProgressSlice';
import authSlice from '@/store/slices/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings', 'navigation'] // Only persist settings and navigation
};

const rootReducer = combineReducers({
  vocabulary: vocabularySlice,
  study: studySlice,
  settings: settingsSlice,
  navigation: navigationSlice,
  userProgress: userProgressSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
