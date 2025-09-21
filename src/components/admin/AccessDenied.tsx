import React from 'react';
import { Pane, Card, Heading, Text, Button } from 'evergreen-ui';
import { useAppDispatch } from '@/hooks/redux';
import { setActiveTab } from '@/store/slices/navigationSlice';

/**
 * Component shown when user doesn't have admin access
 */
const AccessDenied: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleGoHome = () => {
    dispatch(setActiveTab('home'));
  };

  return (
    <Pane
      className="page-content"
      width="100%"
      maxWidth="100%"
      boxSizing="border-box"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
    >
      <Card elevation={1} padding={32} maxWidth={400} textAlign="center">
        <Heading size={500} marginBottom={16} color="danger">
          Access Denied
        </Heading>

        <Text marginBottom={24} color="muted">
          You don't have permission to access the admin panel. Only
          administrators can view this page.
        </Text>

        <Button appearance="primary" onClick={handleGoHome}>
          Go to Home
        </Button>
      </Card>
    </Pane>
  );
};

export default AccessDenied;
