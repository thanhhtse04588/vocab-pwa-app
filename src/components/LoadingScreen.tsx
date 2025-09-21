import React from 'react';
import { Pane, Spinner, Text } from 'evergreen-ui';

const LoadingScreen: React.FC = () => {
  return (
    <Pane
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop={80}
    >
      <Spinner size={32} />
      <Text size={300} fontWeight="bold" color="muted" marginTop={16}>
        Loading...
      </Text>
    </Pane>
  );
};

export default LoadingScreen;
