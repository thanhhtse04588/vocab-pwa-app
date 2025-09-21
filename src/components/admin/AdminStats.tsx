import React, { useState, useEffect } from 'react';
import { Pane, Card, Heading, Text, Spinner, Alert } from 'evergreen-ui';
import { adminService } from '@/services/adminService';

interface SystemStats {
  totalVocabularySets: number;
  publicVocabularySets: number;
  totalWords: number;
  totalUsers: number;
  recentActivity: number;
}

/**
 * Simple admin statistics component
 */
const AdminStats: React.FC = () => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const systemStats = await adminService.getSystemStats();
      setStats(systemStats);
    } catch (err) {
      setError('Failed to load statistics');
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card padding={20} elevation={1}>
        <Pane display="flex" alignItems="center" gap={12}>
          <Spinner size={20} />
          <Text>Loading statistics...</Text>
        </Pane>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert intent="danger" title="Error">
        {error}
      </Alert>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <Card marginTop={24} padding={20} elevation={1}>
      <Heading size={400} marginBottom={16}>
        System Statistics
      </Heading>

      <Pane
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
        gap={16}
      >
        <Pane textAlign="center">
          <Text size={300} color="muted">
            Total Sets
          </Text>
          <Heading size={500} color="blue">
            {stats.totalVocabularySets}
          </Heading>
        </Pane>

        <Pane textAlign="center">
          <Text size={300} color="muted">
            Public Sets
          </Text>
          <Heading size={500} color="green">
            {stats.publicVocabularySets}
          </Heading>
        </Pane>

        <Pane textAlign="center">
          <Text size={300} color="muted">
            Total Words
          </Text>
          <Heading size={500} color="purple">
            {stats.totalWords}
          </Heading>
        </Pane>

        <Pane textAlign="center">
          <Text size={300} color="muted">
            Users
          </Text>
          <Heading size={500} color="orange">
            {stats.totalUsers}
          </Heading>
        </Pane>
      </Pane>
    </Card>
  );
};

export default AdminStats;
