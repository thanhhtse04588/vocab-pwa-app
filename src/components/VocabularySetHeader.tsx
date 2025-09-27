import type { VocabularySet } from '@/types';
import {
  Button,
  Heading,
  IconButton,
  Menu,
  Pane,
  Popover,
  Position,
  useTheme,
} from 'evergreen-ui';
import {
  ArrowClockwise,
  ArrowLeft,
  DotsThreeVertical,
  Globe,
  Trash,
  XCircle,
} from 'phosphor-react';
import React from 'react';

interface VocabularySetHeaderProps {
  set: VocabularySet;
  onBack?: () => void;
  onResetProgress?: () => void;
  onPublish?: () => void;
  onUnpublish?: () => void;
  onDelete?: () => void;
  isPublishing?: boolean;
}

const VocabularySetHeader: React.FC<VocabularySetHeaderProps> = ({
  set,
  onBack,
  onResetProgress,
  onPublish,
  onUnpublish,
  onDelete,
  isPublishing = false,
}) => {
  const theme = useTheme();
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={24}
    >
      <Pane display="flex" alignItems="center" gap={12}>
        {onBack && (
          <Button
            appearance="minimal"
            onClick={() => {
              onBack();
            }}
            padding={8}
            borderRadius={8}
            style={{
              zIndex: 10,
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        <Heading size={600}>{set.name}</Heading>
      </Pane>

      {/* Settings Menu */}
      <Popover
        content={
          <Menu>
            <Menu.Group>
              {onResetProgress && (
                <Menu.Item
                  icon={
                    <ArrowClockwise size={16} color={theme.colors.gray800} />
                  }
                  onSelect={() => {
                    onResetProgress();
                  }}
                >
                  Reset Progress
                </Menu.Item>
              )}

              {onPublish &&
                onUnpublish &&
                (set.isPublic ? (
                  <Menu.Item
                    icon={<XCircle size={16} color={theme.colors.red500} />}
                    intent="danger"
                    onSelect={() => {
                      onUnpublish();
                    }}
                  >
                    {isPublishing ? 'Unpublishing...' : 'Unpublish'}
                  </Menu.Item>
                ) : (
                  <Menu.Item
                    icon={<Globe size={16} color={theme.colors.green500} />}
                    intent="success"
                    onSelect={() => {
                      onPublish();
                    }}
                  >
                    {isPublishing ? 'Publishing...' : 'Publish'}
                  </Menu.Item>
                ))}

              {onDelete && <Menu.Divider />}

              {onDelete && (
                <Menu.Item
                  icon={<Trash size={16} color={theme.colors.red500} />}
                  intent="danger"
                  onSelect={() => {
                    onDelete();
                  }}
                >
                  Delete Set
                </Menu.Item>
              )}
            </Menu.Group>
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
      >
        <IconButton
          icon={<DotsThreeVertical size={16} />}
          appearance="minimal"
          size="small"
        />
      </Popover>
    </Pane>
  );
};

export default VocabularySetHeader;
