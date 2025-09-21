import React, { useState, useEffect } from 'react';
import {
  Pane,
  Card,
  Heading,
  Text,
  Button,
  Table,
  Badge,
  TextInput,
  Select,
  Alert,
  Spinner,
} from 'evergreen-ui';
import { usePermissions } from '@/hooks/usePermissions';
import { adminService } from '@/services/adminService';
import type { VocabularySet } from '@/types';

type FilterType = 'all' | 'public' | 'private';
type SortType = 'name' | 'created' | 'words' | 'lastStudied';

/**
 * Component for managing vocabulary sets in admin panel
 */
const VocabularySetManagement: React.FC = () => {
  const { canModerate } = usePermissions();

  const [sets, setSets] = useState<VocabularySet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSets, setTotalSets] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // Load vocabulary sets from Firebase
  useEffect(() => {
    loadVocabularySets();
  }, [currentPage, searchQuery, filter]);

  const loadVocabularySets = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await adminService.getVocabularySetsWithPagination(
        currentPage,
        10,
        searchQuery,
        filter
      );

      setSets(result.sets);
      setTotalSets(result.total);
      setHasMore(result.hasMore);
    } catch (err) {
      setError('Failed to load vocabulary sets');
      console.error('Error loading vocabulary sets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModerateSet = async (
    setId: string,
    action: 'approve' | 'reject' | 'feature'
  ) => {
    if (!canModerate()) {
      return;
    }

    try {
      const success = await adminService.moderateVocabularySet(setId, action);
      if (success) {
        // Reload the data
        await loadVocabularySets();
      }
    } catch (error) {
      console.error('Error moderating set:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filtering
  };

  if (loading && sets.length === 0) {
    return (
      <Card padding={20}>
        <Pane display="flex" alignItems="center" gap={12}>
          <Spinner size={20} />
          <Text>Loading vocabulary sets...</Text>
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

  return (
    <Pane>
      <Heading size={500} marginBottom={16}>
        Vocabulary Set Management
      </Heading>

      {/* Filters and Search */}
      <Card marginBottom={16} padding={16} elevation={1}>
        <Pane display="flex" gap={12} flexWrap="wrap" alignItems="center">
          <TextInput
            placeholder="Search sets..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e.target.value)
            }
            width={200}
          />

          <Select
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleFilterChange(e.target.value as FilterType)
            }
            width={120}
          >
            <option value="all">All Sets</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Select>

          <Select
            value={sortBy}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortBy(e.target.value as SortType)
            }
            width={150}
          >
            <option value="created">Created Date</option>
            <option value="name">Name</option>
            <option value="words">Word Count</option>
            <option value="lastStudied">Last Studied</option>
          </Select>
        </Pane>
      </Card>

      {/* Sets Table */}
      <Card elevation={1}>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Name</Table.TextHeaderCell>
            <Table.TextHeaderCell>Languages</Table.TextHeaderCell>
            <Table.TextHeaderCell>Words</Table.TextHeaderCell>
            <Table.TextHeaderCell>Status</Table.TextHeaderCell>
            <Table.TextHeaderCell>Created</Table.TextHeaderCell>
            <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {sets.map((set) => (
              <Table.Row key={set.id}>
                <Table.TextCell>
                  <Text fontWeight={500}>{set.name}</Text>
                </Table.TextCell>
                <Table.TextCell>
                  {set.wordLanguage} → {set.meaningLanguage}
                </Table.TextCell>
                <Table.TextCell>
                  <Badge color="blue">{set.wordCount}</Badge>
                </Table.TextCell>
                <Table.TextCell>
                  <Badge color={set.isPublic ? 'green' : 'neutral'}>
                    {set.isPublic ? 'Public' : 'Private'}
                  </Badge>
                </Table.TextCell>
                <Table.TextCell>
                  {new Date(set.createdAt).toLocaleDateString()}
                </Table.TextCell>
                <Table.TextCell>
                  {canModerate() && (
                    <Pane display="flex" gap={8}>
                      <Button
                        size="small"
                        appearance="minimal"
                        onClick={() => handleModerateSet(set.id, 'approve')}
                      >
                        ✓
                      </Button>
                      <Button
                        size="small"
                        appearance="minimal"
                        onClick={() => handleModerateSet(set.id, 'reject')}
                      >
                        ✗
                      </Button>
                      <Button
                        size="small"
                        appearance="minimal"
                        onClick={() => handleModerateSet(set.id, 'feature')}
                      >
                        ⭐
                      </Button>
                    </Pane>
                  )}
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {sets.length === 0 && !loading && (
          <Pane padding={40} textAlign="center">
            <Text color="muted">No vocabulary sets found</Text>
          </Pane>
        )}
      </Card>

      {/* Summary and Pagination */}
      <Card marginTop={16} padding={16} elevation={1}>
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Text color="muted">
            Showing {sets.length} of {totalSets} vocabulary sets
          </Text>

          <Pane display="flex" gap={8}>
            <Button
              size="small"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              size="small"
              disabled={!hasMore}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </Pane>
        </Pane>
      </Card>
    </Pane>
  );
};

export default VocabularySetManagement;
