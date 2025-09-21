import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setActiveTab } from '@/store/slices/navigationSlice';
import { setTheme, updateSettings } from '@/store/slices/settingsSlice';
import { Heading, Pane, useTheme, IconButton } from 'evergreen-ui';
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import LoginButton from './LoginButton';
import UserProfile from './UserProfile';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isDark } = useAppSelector((state) => state.settings);
  const theme = useTheme();

  const handleLogoClick = () => {
    dispatch(setActiveTab('home'));
  };

  const handleThemeToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    dispatch(updateSettings({ theme: newTheme }));
  };

  return (
    <Pane className="header-container">
      <Pane
        className="header"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={16}
        paddingY={12}
        background="var(--bg-primary)"
        borderBottom="1px solid var(--border-color)"
        boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
      >
        {/* Logo and Brand */}
        <Pane
          className="brand-section"
          display="flex"
          alignItems="center"
          gap={12}
          onClick={handleLogoClick}
          cursor="pointer"
        >
          <Pane
            className="brand-logo"
            width={32}
            height={32}
            borderRadius={8}
            background={`linear-gradient(135deg, ${theme.colors.blue500} 0%, ${theme.colors.blue600} 100%)`}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            transition="all 0.3s ease"
            cursor="pointer"
            hoverElevation={2}
            overflow="hidden"
          >
            <img
              src="/bee-icon-192.png"
              alt="BeeVocab Logo"
              width={24}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          </Pane>
          <Pane className="brand-text">
            <Heading
              size={600}
              margin={0}
              color="var(--text-primary)"
              fontWeight={700}
              letterSpacing="-0.025em"
            >
              BeeVocab
            </Heading>
          </Pane>
        </Pane>

        {/* Auth Section */}
        <Pane display="flex" alignItems="center" gap={8}>
          <IconButton
            icon={isDark ? Sun : Moon}
            iconSize={20}
            size="medium"
            appearance="minimal"
            intent="default"
            onClick={handleThemeToggle}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          />
          {user ? <UserProfile /> : <LoginButton />}
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Header;
