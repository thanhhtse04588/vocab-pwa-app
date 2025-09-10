import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { setUser } from '@/store/slices/authSlice';
import { onAuthStateChange } from '@/services/firebaseService';

const AuthInitializer: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default AuthInitializer;
