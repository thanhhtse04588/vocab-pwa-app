import React from 'react';
import { Button, Avatar } from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setActiveTab } from '@/store/slices/navigationSlice';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const handleProfileClick = () => {
    dispatch(setActiveTab('profile'));
  };

  if (!user) return null;

  return (
    <Button
      appearance="minimal"
      height={40}
      paddingX={8}
      disabled={loading}
      className={loading ? 'loading' : ''}
      borderRadius={8}
      transition="all 0.2s ease"
      onClick={handleProfileClick}
    >
      <Avatar
        src={user.photoURL || undefined}
        name={user.displayName || 'User'}
        size={32}
      />
    </Button>
  );
};

export default UserProfile;
