import { useAppSelector } from '@/hooks/redux';
import {
  hasPermission,
  isAdmin,
  isModerator,
  canModerate,
  canManageUsers,
  canViewAnalytics,
  canAccessAdmin,
} from '@/utils/adminUtils';

/**
 * Custom hook for checking user permissions and roles
 */
export const usePermissions = () => {
  const { userProfile } = useAppSelector((state) => state.auth);

  return {
    // Permission checks
    hasPermission: (resource: string, action: string) =>
      hasPermission(userProfile, resource, action),

    // Role checks
    isAdmin: () => isAdmin(userProfile),
    isModerator: () => isModerator(userProfile),

    // Specific permission checks
    canModerate: () => canModerate(userProfile),
    canManageUsers: () => canManageUsers(userProfile),
    canViewAnalytics: () => canViewAnalytics(userProfile),
    canAccessAdmin: () => canAccessAdmin(userProfile),

    // User info
    userRole: userProfile?.role || 'user',
    userProfile,
  };
};

/**
 * Hook for admin-only features
 */
export const useAdminPermissions = () => {
  const permissions = usePermissions();

  if (!permissions.isAdmin()) {
    throw new Error('Admin permissions required');
  }

  return permissions;
};

/**
 * Hook for moderator or higher permissions
 */
export const useModeratorPermissions = () => {
  const permissions = usePermissions();

  if (!permissions.isModerator()) {
    throw new Error('Moderator permissions required');
  }

  return permissions;
};
