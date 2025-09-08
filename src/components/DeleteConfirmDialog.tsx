import React from 'react';
import { Dialog, Text } from 'evergreen-ui';

interface DeleteConfirmDialogProps {
  isShown: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isShown,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      isShown={isShown}
      title="Delete Vocabulary Set"
      onCloseComplete={onClose}
      confirmLabel="Delete"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      onCancel={onClose}
    >
      <Text>
        Are you sure you want to delete this vocabulary set? This action cannot
        be undone.
      </Text>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
