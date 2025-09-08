import React from 'react';
import { Pane, Button } from 'evergreen-ui';
import { House, BookOpen, Gear } from 'phosphor-react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setActiveTab } from '@/store/slices/navigationSlice';

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.navigation);

  const handleTabChange = (tabId: string) => {
    dispatch(setActiveTab(tabId as any));
  };

  return (
    <Pane
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={1000}
      background="var(--bg-primary)"
      borderTop="1px solid var(--border-color)"
      padding={8}
      display="flex"
      justifyContent="space-around"
      className="bottom-nav"
    >
      <Button
        appearance={activeTab === 'home' ? 'primary' : 'minimal'}
        intent="none"
        onClick={() => handleTabChange('home')}
        height={48}
        minWidth={60}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <House size={20} />
        <span style={{ fontSize: '12px', marginTop: '2px' }}>Home</span>
      </Button>
      <Button
        appearance={activeTab === 'vocabulary' ? 'primary' : 'minimal'}
        intent="none"
        onClick={() => handleTabChange('vocabulary')}
        height={48}
        minWidth={60}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <BookOpen size={20} />
        <span style={{ fontSize: '12px', marginTop: '2px' }}>Vocabulary</span>
      </Button>
      <Button
        appearance={activeTab === 'settings' ? 'primary' : 'minimal'}
        intent="none"
        onClick={() => handleTabChange('settings')}
        height={48}
        minWidth={60}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Gear size={20} />
        <span style={{ fontSize: '12px', marginTop: '2px' }}>Settings</span>
      </Button>
    </Pane>
  );
};

export default Navigation;
