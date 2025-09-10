import React from 'react';
import {
  Pane,
  Text,
  Button,
  Avatar,
  Menu,
  Popover,
  Position,
} from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { signOut } from '@/store/slices/authSlice';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const handleSignOut = async () => {
    try {
      await dispatch(signOut()).unwrap();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  if (!user) return null;

  return (
    <Popover
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item>
              <Pane padding={8}>
                <Text size={300} fontWeight={600}>
                  {user.displayName || 'User'}
                </Text>
                <Text size={200} color="muted">
                  {user.email}
                </Text>
              </Pane>
            </Menu.Item>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item onSelect={handleSignOut} intent="danger">
              Sign Out
            </Menu.Item>
          </Menu.Group>
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      <Button appearance="minimal" height={40} paddingX={8} disabled={loading}>
        <Pane display="flex" alignItems="center" gap={8}>
          <Avatar
            src={user.photoURL || undefined}
            name={user.displayName || 'User'}
            size={24}
          />
          <Text size={300} fontWeight={500}>
            {user.displayName || 'User'}
          </Text>
        </Pane>
      </Button>
    </Popover>
  );
};

export default UserProfile;
