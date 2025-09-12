import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { UserProgress, MemoryLevel } from '@/types';
import { db } from '@/services/database';
import { generateUUID } from '@/utils/uuid';

interface UserProgressState {
  progress: UserProgress[];
  loading: boolean;
  error: string | null;
  totalWordsToReview: number;
  memoryLevelDistribution: Record<number, number>;
}

const initialState: UserProgressState = {
  progress: [],
  loading: false,
  error: null,
  totalWordsToReview: 0,
  memoryLevelDistribution: {},
};

// Async thunks
export const loadUserProgress = createAsyncThunk(
  'userProgress/load',
  async () => {
    const progress = await db.userProgress.toArray();
    return progress;
  }
);

export const loadProgressForSet = createAsyncThunk(
  'userProgress/loadForSet',
  async (setId: string) => {
    const progress = await db.userProgress
      .where('vocabularySetId')
      .equals(setId)
      .first();
    return progress;
  }
);

export const loadMemoryLevelDistribution = createAsyncThunk(
  'userProgress/loadMemoryDistribution',
  async (setId: string) => {
    const distribution = await db.getMemoryLevelDistribution(setId);
    return { setId, distribution };
  }
);

export const loadTotalWordsToReview = createAsyncThunk(
  'userProgress/loadTotalWordsToReview',
  async () => {
    const count = await db.getTotalWordsToReview();
    return count;
  }
);

export const loadCombinedMemoryLevelDistribution = createAsyncThunk(
  'userProgress/loadCombinedMemoryDistribution',
  async () => {
    // Get all vocabulary sets
    const sets = await db.vocabularySets.toArray();

    // Combine memory level distribution from all sets
    const combinedDistribution: Record<number, number> = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
    };

    for (const set of sets) {
      const distribution = await db.getMemoryLevelDistribution(set.id);
      for (const [level, count] of Object.entries(distribution)) {
        combinedDistribution[parseInt(level)] += count;
      }
    }

    return combinedDistribution;
  }
);

export const updateProgress = createAsyncThunk(
  'userProgress/update',
  async ({
    setId,
    updates,
  }: {
    setId: string;
    updates: Partial<UserProgress>;
  }) => {
    const existingProgress = await db.userProgress
      .where('vocabularySetId')
      .equals(setId)
      .first();

    if (existingProgress) {
      const updatedProgress = { ...existingProgress, ...updates };
      await db.userProgress.update(existingProgress.id, updates);
      return updatedProgress;
    } else {
      const newProgress: UserProgress = {
        id: generateUUID(),
        vocabularySetId: setId,
        totalWordsStudied: 0,
        totalCorrectAnswers: 0,
        totalIncorrectAnswers: 0,
        averageAccuracy: 0,
        streakDays: 0,
        memoryLevelDistribution: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
        },
        ...updates,
      };
      await db.userProgress.add(newProgress);
      return newProgress;
    }
  }
);

export const resetProgress = createAsyncThunk(
  'userProgress/reset',
  async (setId: string) => {
    await db.resetProgressForSet(setId);
    return setId;
  }
);

const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateMemoryDistribution: (
      state,
      action: PayloadAction<{
        setId: string;
        distribution: Record<number, number>;
      }>
    ) => {
      const { setId, distribution } = action.payload;
      const progressIndex = state.progress.findIndex(
        (p) => p.vocabularySetId === setId
      );
      if (progressIndex !== -1) {
        state.progress[progressIndex].memoryLevelDistribution =
          distribution as Record<MemoryLevel, number>;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Load user progress
      .addCase(loadUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(loadUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load user progress';
      })

      // Load progress for set
      .addCase(loadProgressForSet.fulfilled, (state, action) => {
        if (action.payload) {
          const existingIndex = state.progress.findIndex(
            (p) => p.id === action.payload!.id
          );
          if (existingIndex !== -1) {
            state.progress[existingIndex] = action.payload;
          } else {
            state.progress.push(action.payload);
          }
        }
      })

      // Load memory level distribution
      .addCase(loadMemoryLevelDistribution.fulfilled, (state, action) => {
        const { setId, distribution } = action.payload;
        const progressIndex = state.progress.findIndex(
          (p) => p.vocabularySetId === setId
        );
        if (progressIndex !== -1) {
          state.progress[progressIndex].memoryLevelDistribution =
            distribution as Record<MemoryLevel, number>;
        }
        state.memoryLevelDistribution = distribution;
      })

      // Load total words to review
      .addCase(loadTotalWordsToReview.fulfilled, (state, action) => {
        state.totalWordsToReview = action.payload;
      })

      // Load combined memory level distribution
      .addCase(
        loadCombinedMemoryLevelDistribution.fulfilled,
        (state, action) => {
          state.memoryLevelDistribution = action.payload;
        }
      )

      // Update progress
      .addCase(updateProgress.fulfilled, (state, action) => {
        const existingIndex = state.progress.findIndex(
          (p) => p.id === action.payload.id
        );
        if (existingIndex !== -1) {
          state.progress[existingIndex] = action.payload;
        } else {
          state.progress.push(action.payload);
        }
      })

      // Reset progress
      .addCase(resetProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetProgress.fulfilled, (state, action) => {
        state.loading = false;
        // Remove progress for the reset set
        state.progress = state.progress.filter(
          (p) => p.vocabularySetId !== action.payload
        );
        // Reset memory level distribution
        state.memoryLevelDistribution = {};
      })
      .addCase(resetProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to reset progress';
      });
  },
});

export const { clearError, updateMemoryDistribution } =
  userProgressSlice.actions;
export default userProgressSlice.reducer;
