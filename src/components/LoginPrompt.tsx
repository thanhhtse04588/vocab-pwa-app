import React from 'react';
import { Pane, Text } from 'evergreen-ui';

const LoginPrompt: React.FC = () => {
  return (
    <Pane
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingTop={80}
    >
      <Text size={300} fontWeight="bold" color="muted">
        Please login to continue
      </Text>
    </Pane>
  );
};

export default LoginPrompt;
