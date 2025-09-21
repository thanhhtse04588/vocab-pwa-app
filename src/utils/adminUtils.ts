import type { UserRole, UserProfile, Permission } from '@/types';
import { getAdminEmails } from '@/config/admin';

// Check if email is admin
export const isAdminEmail = (email: string | null): boolean => {
  if (!email) return false;
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email.toLowerCase());
};

// Get user role based on email
export const getUserRoleFromEmail = (email: string | null): UserRole => {
  if (!email) return 'user';

  if (isAdminEmail(email)) return 'admin';

  return 'user';
};

// Get permissions for role
export const getRolePermissions = (role: UserRole): Permission[] => {
  switch (role) {
    case 'admin':
      return [
        {
          resource: 'vocabulary_sets',
          actions: ['read', 'write', 'delete', 'publish', 'moderate'],
        },
        { resource: 'users', actions: ['read', 'write', 'delete', 'moderate'] },
        { resource: 'analytics', actions: ['read', 'write'] },
        {
          resource: 'system',
          actions: ['read', 'write', 'delete', 'maintain'],
        },
        {
          resource: 'admin',
          actions: ['read', 'write', 'delete', 'grant_roles'],
        },
      ];

    case 'moderator':
      return [
        { resource: 'vocabulary_sets', actions: ['read', 'moderate'] },
        { resource: 'users', actions: ['read'] },
        { resource: 'analytics', actions: ['read'] },
      ];

    case 'user':
    default:
      return [
        {
          resource: 'vocabulary_sets',
          actions: ['read', 'write', 'delete', 'publish'],
        },
      ];
  }
};

// Create user profile from Firebase user
export const createUserProfile = (user: any): UserProfile => {
  const role = getUserRoleFromEmail(user.email);

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || user.email,
    role,
    permissions: getRolePermissions(role),
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    isActive: true,
  };
};

// Check if user has specific permission
export const hasPermission = (
  userProfile: UserProfile | null,
  resource: string,
  action: string
): boolean => {
  if (!userProfile) return false;

  // Check specific permissions
  return userProfile.permissions.some(
    (permission) =>
      permission.resource === resource && permission.actions.includes(action)
  );
};

// Check if user is admin
export const isAdmin = (userProfile: UserProfile | null): boolean => {
  if (!userProfile) return false;
  return userProfile.role === 'admin';
};

// Check if user is moderator or higher
export const isModerator = (userProfile: UserProfile | null): boolean => {
  if (!userProfile) return false;
  return ['moderator', 'admin'].includes(userProfile.role);
};

// Check if user can moderate content
export const canModerate = (userProfile: UserProfile | null): boolean => {
  return hasPermission(userProfile, 'vocabulary_sets', 'moderate');
};

// Check if user can manage users
export const canManageUsers = (userProfile: UserProfile | null): boolean => {
  return hasPermission(userProfile, 'users', 'write');
};

// Check if user can view analytics
export const canViewAnalytics = (userProfile: UserProfile | null): boolean => {
  return hasPermission(userProfile, 'analytics', 'read');
};

// Check if user can access admin panel
export const canAccessAdmin = (userProfile: UserProfile | null): boolean => {
  return isAdmin(userProfile);
};
