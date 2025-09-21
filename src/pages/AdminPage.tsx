import React from 'react';
import { Pane, Heading, Text, Alert } from 'evergreen-ui';
import { usePermissions } from '@/hooks/usePermissions';
import AccessDenied from '@/components/admin/AccessDenied';

/**
 * Main admin page - only accessible by admin users
 */
const AdminPage: React.FC = () => {
  const { canAccessAdmin, userRole } = usePermissions();

  // Check if user has admin access
  if (!canAccessAdmin()) {
    return <AccessDenied />;
  }

  return (
    <Pane
      className="page-content"
      width="100%"
      maxWidth="100%"
      boxSizing="border-box"
    >
      <Pane padding={24} width="100%" maxWidth="100%" boxSizing="border-box">
        {/* Header */}
        <Pane marginBottom={24}>
          <Heading size={600} marginBottom={8}>
            Admin Dashboard
          </Heading>
          <Text color="muted">
            Welcome to the admin panel. You have {userRole} privileges.
          </Text>
        </Pane>

        {/* Coming Soon */}
        <Alert intent="info" title="Coming Soon" marginBottom={24}>
          Admin features are under development. This page will be populated with
          management tools soon.
        </Alert>
      </Pane>
    </Pane>
  );
};

export default AdminPage;
