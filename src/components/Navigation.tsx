import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setActiveTab } from '@/store/slices/navigationSlice';
import type { TabId } from '@/types';
import { Button, Pane } from 'evergreen-ui';
import { BookOpen, Gear, House, Shield } from 'phosphor-react';
import { usePermissions } from '@/hooks/usePermissions';

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.navigation);
  const { canAccessAdmin } = usePermissions();

  const handleTabChange = (tabId: string) => {
    dispatch(setActiveTab(tabId as TabId));
  };

  return (
    <>
      <Pane className="bottom-nav" display="flex" justifyContent="center">
        <Pane
          className="nav-menu"
          width="100%"
          height="100%"
          display="flex"
          paddingX={8}
          paddingTop={8}
          paddingBottom={24}
          justifyContent="space-around"
          background="var(--bg-primary)"
          borderTop="1px solid var(--border-color)"
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
            <span style={{ fontSize: '12px', marginTop: '2px' }}>
              Vocabulary
            </span>
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
          {canAccessAdmin() && (
            <Button
              appearance={activeTab === 'admin' ? 'primary' : 'minimal'}
              intent="none"
              onClick={() => handleTabChange('admin')}
              height={48}
              minWidth={60}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Shield size={20} />
              <span style={{ fontSize: '12px', marginTop: '2px' }}>Admin</span>
            </Button>
          )}
        </Pane>
      </Pane>
    </>
  );
};

export default Navigation;
