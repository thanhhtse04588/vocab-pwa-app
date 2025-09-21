import React from 'react';
import { Pane, Card, Heading, Text, Badge } from 'evergreen-ui';
import { usePermissions } from '@/hooks/usePermissions';
import { useAppSelector } from '@/hooks/redux';
import VocabularySetManagement from './VocabularySetManagement';
import AdminStats from './AdminStats';

/**
 * Simplified admin dashboard
 */
const AdminDashboard: React.FC = () => {
  const { userRole } = usePermissions();
  const { sets } = useAppSelector((state) => state.vocabulary);

  const totalSets = sets.length;
  const publicSets = sets.filter((set) => set.isPublic).length;
  const totalWords = sets.reduce((sum, set) => sum + set.wordCount, 0);

  return (
    <Pane>
      {/* Quick Stats */}
      <Pane
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={16}
        marginBottom={24}
      >
        <Card padding={20} elevation={1}>
          <Text size={300} color="muted" marginBottom={8}>
            Total Vocabulary Sets
          </Text>
          <Heading size={700} color="blue">
            {totalSets}
          </Heading>
        </Card>

        <Card padding={20} elevation={1}>
          <Text size={300} color="muted" marginBottom={8}>
            Public Sets
          </Text>
          <Heading size={700} color="green">
            {publicSets}
          </Heading>
        </Card>

        <Card padding={20} elevation={1}>
          <Text size={300} color="muted" marginBottom={8}>
            Total Words
          </Text>
          <Heading size={700} color="purple">
            {totalWords}
          </Heading>
        </Card>

        <Card padding={20} elevation={1}>
          <Text size={300} color="muted" marginBottom={8}>
            Your Role
          </Text>
          <Badge color="blue" marginTop={8}>
            {userRole.toUpperCase()}
          </Badge>
        </Card>
      </Pane>

      {/* Vocabulary Set Management */}
      <VocabularySetManagement />

      {/* Additional Stats */}
      <AdminStats />
    </Pane>
  );
};

export default AdminDashboard;
