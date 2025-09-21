import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import { signInWithGoogle, signOutUser } from '@/services/firebaseService';
import type { UserProfile } from '@/types';
import { createUserProfile } from '@/utils/adminUtils';

// Serializable user interface
interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

interface AuthState {
  user: SerializableUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  userProfile: null,
  loading: false,
  error: null,
};

// Helper function to convert Firebase User to SerializableUser
const serializeUser = (user: User | null): SerializableUser | null => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
};

// Async thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (_, { rejectWithValue }) => {
    try {
      const user = await signInWithGoogle();
      return serializeUser(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOutUser();
      return null;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Logout failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const setUser = createAsyncThunk(
  'auth/setUser',
  async (user: User | null) => {
    const serializedUser = serializeUser(user);
    const userProfile = user ? createUserProfile(user) : null;

    return {
      user: serializedUser,
      userProfile,
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign in
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userProfile = action.payload
          ? createUserProfile(action.payload)
          : null;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Sign out
      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.userProfile = null;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Set user
      .addCase(setUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userProfile = action.payload.userProfile;
        state.loading = false;
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
