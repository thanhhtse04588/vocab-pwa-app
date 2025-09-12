import React from 'react';
import { Pane, Text, Button, Avatar, Heading, Card } from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { signOut } from '@/store/slices/authSlice';
import { setActiveTab } from '@/store/slices/navigationSlice';
import { ArrowLeft } from 'phosphor-react';

const UserProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const handleSignOut = async () => {
    try {
      await dispatch(signOut()).unwrap();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const handleGoBack = () => {
    // Navigate back to home page
    dispatch(setActiveTab('home'));
  };

  if (!user) {
    return (
      <Pane padding={16} textAlign="center">
        <Text>Please log in to view your profile.</Text>
      </Pane>
    );
  }

  return (
    <Pane padding={16} maxWidth={480} display="flex" flexDirection="column">
      {/* Header with back button */}
      <Pane display="flex" alignItems="center" marginBottom={24} gap={12}>
        <Button
          appearance="minimal"
          onClick={handleGoBack}
          padding={8}
          borderRadius={8}
        >
          <ArrowLeft size={20} />
        </Button>
        <Heading size={600} margin={0}>
          Profile
        </Heading>
      </Pane>

      {/* Profile Card */}
      <Card padding={24} marginBottom={16} elevation={1}>
        <Pane
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={16}
        >
          {/* Avatar */}
          <Avatar
            src={user.photoURL || undefined}
            name={user.displayName || 'User'}
            size={80}
            borderRadius={12}
          />

          {/* User Info */}
          <Pane textAlign="center">
            <Heading size={500} marginBottom={8}>
              {user.displayName || 'User'}
            </Heading>
            <Text size={300} color="muted">
              {user.email}
            </Text>
          </Pane>

          {/* Sign Out Button */}
          <Button
            intent="danger"
            appearance="primary"
            onClick={handleSignOut}
            disabled={loading}
            className={loading ? 'loading' : ''}
            size="large"
            width="100%"
            maxWidth={200}
          >
            {loading ? 'Signing Out...' : 'Sign Out'}
          </Button>
        </Pane>
      </Card>
    </Pane>
  );
};

export default UserProfilePage;
