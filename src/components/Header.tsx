import { useAppSelector } from '@/hooks/redux';
import { Heading, Pane } from 'evergreen-ui';
import React from 'react';
import LoginButton from './LoginButton';
import UserProfile from './UserProfile';

const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

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
        >
          <Pane
            className="brand-logo"
            width={32}
            height={32}
            borderRadius={8}
            background="linear-gradient(135deg, #f7ac15 0%, #e69a0e 100%)"
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
        <Pane display="flex" alignItems="center">
          {user ? <UserProfile /> : <LoginButton />}
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Header;
