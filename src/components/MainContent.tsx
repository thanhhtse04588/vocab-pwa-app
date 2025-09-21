import React from 'react';
import { Pane } from 'evergreen-ui';
import Navigation from './Navigation';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <>
      <Pane
        flex={1}
        overflowX="hidden"
        overflowY="auto"
        paddingBottom={80}
        paddingTop={65}
        data-scroll-container
      >
        {children}
      </Pane>
      <Navigation />
    </>
  );
};

export default MainContent;
