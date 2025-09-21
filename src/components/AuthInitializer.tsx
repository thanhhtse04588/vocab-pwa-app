import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { setUser, setLoading } from '@/store/slices/authSlice';
import { onAuthStateChange } from '@/services/firebaseService';

/**
 * AuthInitializer component handles Firebase authentication state initialization.
 * It sets up the auth state listener and manages the loading state during initialization.
 */
const AuthInitializer: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set loading to true when starting auth initialization
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChange((user) => {
      dispatch(setUser(user));
      // Loading will be set to false in the authSlice when setUser.fulfilled is dispatched
    });

    // Cleanup function to unsubscribe from auth state changes
    return () => unsubscribe();
  }, [dispatch]);

  // This component doesn't render anything - it only manages side effects
  return null;
};

export default AuthInitializer;
