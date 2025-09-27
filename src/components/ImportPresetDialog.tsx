import React, { useEffect } from 'react';
import {
  SideSheet,
  Pane,
  Button,
  Spinner,
  Text,
  Card,
  Heading,
  Badge,
  Position,
  IconButton,
} from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  fetchPublicSets,
  downloadPublicSet,
  unpublishSet,
  unpublishSetFromFirebase,
} from '@/store/slices/vocabularySlice';
import { getCurrentUser } from '@/services/firebaseService';
import { toasterService } from '@/services/toasterService';
import { usePermissions } from '@/hooks/usePermissions';
import { useState } from 'react';
import { SearchInput } from 'evergreen-ui';
import { XCircle, CaretLeft, CaretRight, User } from 'phosphor-react';

interface ImportPresetDialogProps {
  isShown: boolean;
  onClose: () => void;
}

// Avatar component
const Avatar: React.FC<{
  src?: string;
  name?: string;
  size?: number;
}> = ({ src, name, size = 24 }) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <Pane
      width={size}
      height={size}
      borderRadius="50%"
      backgroundColor={src ? 'transparent' : '#E4E7EB'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      flexShrink={0}
    >
      {src ? (
        <img
          src={src}
          alt={name || 'User avatar'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-size: ${
                size * 0.4
              }px; font-weight: 600; color: #66788A;">${initials}</div>`;
            }
          }}
        />
      ) : (
        <User size={size * 0.6} color="#66788A" />
      )}
    </Pane>
  );
};

interface PresetSet {
  id: string;
  name: string;
  wordLanguage: string;
  meaningLanguage: string;
  wordCount: number;
  publisherId: string;
  publisherName?: string;
  publisherAvatar?: string;
  publishedAt: string;
}

const ImportPresetDialog: React.FC<ImportPresetDialogProps> = ({
  isShown,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { publicSets, publicLoading, sets } = useAppSelector(
    (state) => state.vocabulary
  );
  const { isAdmin } = usePermissions();
  const [searchQuery, setSearchQuery] = useState('');
  const [unpublishingSets, setUnpublishingSets] = useState<Set<string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12); // 12 items per page (3x4 grid)

  useEffect(() => {
    if (isShown) {
      dispatch(fetchPublicSets());
    }
  }, [isShown, dispatch]);

  const handleImport = async (id: string) => {
    await dispatch(downloadPublicSet(id));
    onClose();
  };

  // Check if current user owns this preset
  const isOwnedByCurrentUser = (preset: PresetSet): boolean => {
    const currentUser = getCurrentUser();
    return currentUser ? preset.publisherId === currentUser.uid : false;
  };

  // Handle unpublish action
  const handleUnpublish = async (preset: PresetSet) => {
    // Allow admins to unpublish any preset, or users to unpublish their own
    if (!isAdmin() && !isOwnedByCurrentUser(preset)) {
      toasterService.error('You can only unpublish your own vocabulary sets');
      return;
    }

    setUnpublishingSets((prev) => new Set(prev).add(preset.id));

    try {
      // Find the local set that has this publicId
      const localSet = sets.find((set) => set.publicId === preset.id);
      if (localSet) {
        // If local set exists, update its publish status
        await dispatch(unpublishSet(localSet.id)).unwrap();
      } else {
        // If no local set exists, just unpublish from Firebase directly
        // This handles the case where the user published but doesn't have the local set anymore
        await dispatch(unpublishSetFromFirebase(preset.id)).unwrap();
      }

      // Refresh the public sets list
      dispatch(fetchPublicSets());
    } catch (error) {
      console.error('Failed to unpublish vocabulary set:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      toasterService.error(`Failed to unpublish: ${errorMessage}`);
    } finally {
      setUnpublishingSets((prev) => {
        const newSet = new Set(prev);
        newSet.delete(preset.id);
        return newSet;
      });
    }
  };

  // Filter sets based on search query
  const filteredSets = publicSets.filter(
    (preset: PresetSet) =>
      preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.wordLanguage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.meaningLanguage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredSets.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedSets = filteredSets.slice(startIndex, endIndex);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <SideSheet
      position={Position.BOTTOM}
      isShown={isShown}
      onCloseComplete={onClose}
    >
      <Pane padding={24}>
        {/* Header */}
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingBottom={16}
          marginBottom={16}
          borderBottom="1px solid #E4E7EB"
        >
          <Text size={500} fontWeight={600}>
            Import Preset Vocabulary Set
          </Text>
        </Pane>

        {publicLoading ? (
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={32}
          >
            <Spinner />
            <Text marginLeft={12} size={400}>
              Loading presets...
            </Text>
          </Pane>
        ) : (
          <>
            {/* Search Bar */}
            <Pane marginBottom={16}>
              <SearchInput
                placeholder="Search presets by name or language..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  if (value.length <= 126) {
                    setSearchQuery(value);
                  }
                }}
                width="100%"
                height={36}
                maxLength={126}
              />
            </Pane>

            {/* Presets Grid */}
            <Pane
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
              gap={12}
              maxHeight="60vh"
              overflowY="auto"
            >
              {paginatedSets.length === 0 ? (
                <Pane
                  gridColumn="1 / -1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  padding={32}
                  textAlign="center"
                >
                  <Text size={400} color="muted">
                    {searchQuery
                      ? 'No presets found matching your search.'
                      : 'No presets available.'}
                  </Text>
                </Pane>
              ) : (
                paginatedSets.map((preset: PresetSet) => (
                  <Card
                    key={preset.id}
                    elevation={1}
                    padding={12}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    minHeight={100}
                    hoverElevation={2}
                    transition="all 0.2s ease"
                    border="1px solid #E4E7EB"
                    borderRadius={6}
                  >
                    {/* Header */}
                    <Pane>
                      <Heading size={400} marginBottom={8} lineHeight={1.3}>
                        {preset.name}
                      </Heading>

                      {/* Language badges */}
                      <Pane
                        display="flex"
                        alignItems="center"
                        marginBottom={6}
                        flexWrap="wrap"
                        gap={3}
                      >
                        <Badge color="blue" size="small">
                          {preset.wordLanguage}
                        </Badge>
                        <Text size={300} marginX={4} color="muted">
                          →
                        </Text>
                        <Badge color="green" size="small">
                          {preset.meaningLanguage}
                        </Badge>
                      </Pane>

                      {/* Word count and publisher */}
                      <Text size={300} color="muted" marginRight={8}>
                        {preset.wordCount} words
                      </Text>

                      {/* Publisher info with avatar */}
                      <Pane
                        display="flex"
                        alignItems="center"
                        marginTop={4}
                        gap={6}
                      >
                        <Avatar
                          src={preset.publisherAvatar}
                          name={preset.publisherName}
                          size={20}
                        />
                        <Text size={300} color="muted">
                          by {preset.publisherName || 'Anonymous'}
                        </Text>
                      </Pane>
                    </Pane>

                    {/* Action buttons */}
                    <Pane marginTop={8} display="flex" gap={8}>
                      <Button
                        appearance="primary"
                        onClick={() => handleImport(preset.id)}
                        flex={1}
                        height={32}
                        size="small"
                      >
                        Import
                      </Button>

                      {(isAdmin() || isOwnedByCurrentUser(preset)) && (
                        <Button
                          iconBefore={<XCircle size={16} />}
                          intent="danger"
                          onClick={() => handleUnpublish(preset)}
                          isLoading={unpublishingSets.has(preset.id)}
                          disabled={unpublishingSets.has(preset.id)}
                          height={32}
                          size="small"
                        >
                          Unpublish
                        </Button>
                      )}
                    </Pane>
                  </Card>
                ))
              )}
            </Pane>

            {/* Pagination Controls */}
            {filteredSets.length > pageSize && (
              <Pane
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                marginTop={16}
                paddingTop={16}
                borderTop="1px solid #E4E7EB"
              >
                {/* Page Info */}
                <Text size={300} color="muted">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredSets.length)} of{' '}
                  {filteredSets.length} presets
                </Text>

                {/* Pagination Buttons */}
                <Pane display="flex" alignItems="center" gap={8}>
                  <IconButton
                    icon={<CaretLeft size={16} />}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    size="small"
                    appearance="minimal"
                  />

                  {/* Page Numbers */}
                  <Pane display="flex" gap={4}>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          size="small"
                          appearance={
                            currentPage === pageNum ? 'primary' : 'minimal'
                          }
                          onClick={() => handlePageChange(pageNum)}
                          minWidth={32}
                          height={28}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </Pane>

                  <IconButton
                    icon={<CaretRight size={16} />}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    size="small"
                    appearance="minimal"
                  />
                </Pane>
              </Pane>
            )}
          </>
        )}
      </Pane>
    </SideSheet>
  );
};

export default ImportPresetDialog;
