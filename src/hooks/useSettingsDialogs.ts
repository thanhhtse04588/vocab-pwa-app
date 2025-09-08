import { useState } from 'react';

export const useSettingsDialogs = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmCallback, setConfirmCallback] = useState<(() => void) | null>(null);

  const showAlertDialog = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const showConfirmDialog = (message: string, callback: () => void) => {
    setConfirmMessage(message);
    setConfirmCallback(() => callback);
    setShowConfirm(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  const closeConfirm = () => {
    setShowConfirm(false);
    setConfirmMessage('');
    setConfirmCallback(null);
  };

  const handleConfirm = () => {
    if (confirmCallback) {
      confirmCallback();
    }
    closeConfirm();
  };

  return {
    // Alert dialog
    showAlert,
    alertMessage,
    showAlertDialog,
    closeAlert,
    
    // Confirm dialog
    showConfirm,
    confirmMessage,
    showConfirmDialog,
    closeConfirm,
    handleConfirm,
  };
};
