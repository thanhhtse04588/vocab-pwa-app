import React from 'react';
import { Dialog, Text } from 'evergreen-ui';

interface ResetProgressDialogProps {
  isShown: boolean;
  onClose: () => void;
  onConfirm: () => void;
  setName: string;
}

const ResetProgressDialog: React.FC<ResetProgressDialogProps> = ({
  isShown,
  onClose,
  onConfirm,
  setName,
}) => {
  return (
    <Dialog
      isShown={isShown}
      title="Reset Progress"
      onCloseComplete={onClose}
      confirmLabel="Reset"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      onCancel={onClose}
      intent="danger"
    >
      <Text>
        Are you sure you want to reset all progress for "{setName}"? This will:
        <br />
        • Reset all words to memory level 0
        <br />
        • Clear all study statistics
        <br />
        • Delete all study sessions
        <br />
        <br />
        This action cannot be undone.
      </Text>
    </Dialog>
  );
};

export default ResetProgressDialog;
