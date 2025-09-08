import React, { useEffect } from 'react';
import { Pane, Heading, Text, Spinner, Dialog, Card } from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  loadSettings,
  updateSettings,
  toggleNotifications,
  toggleSound,
  toggleVibration,
  setBatchSize,
  setNotificationTime,
} from '@/store/slices/settingsSlice';
import { setTheme } from '@/store/slices/navigationSlice';
import { backupService } from '@/services/backupService';
import { useSettingsDialogs } from '@/hooks/useSettingsDialogs';
import ThemeToggle from '@/components/ThemeToggle';
import StudySettingsCard from '@/components/settings/StudySettingsCard';
import NotificationSettingsCard from '@/components/settings/NotificationSettingsCard';
import SoundVibrationCard from '@/components/settings/SoundVibrationCard';
import DataManagementCard from '@/components/settings/DataManagementCard';
import AppInfoCard from '@/components/settings/AppInfoCard';
import StudyTipsCard from '@/components/settings/StudyTipsCard';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settings, loading } = useAppSelector((state) => state.settings);
  const {
    showAlert,
    alertMessage,
    showConfirm,
    confirmMessage,
    showAlertDialog,
    showConfirmDialog,
    closeAlert,
    closeConfirm,
    handleConfirm,
  } = useSettingsDialogs();

  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  const handleNotificationToggle = () => {
    dispatch(toggleNotifications());
    if (settings) {
      dispatch(
        updateSettings({ enableNotifications: !settings.enableNotifications })
      );
    }
  };

  const handleSoundToggle = () => {
    dispatch(toggleSound());
    if (settings) {
      dispatch(updateSettings({ enableSound: !settings.enableSound }));
    }
  };

  const handleVibrationToggle = () => {
    dispatch(toggleVibration());
    if (settings) {
      dispatch(updateSettings({ enableVibration: !settings.enableVibration }));
    }
  };

  const handleBatchSizeChange = (value: number) => {
    dispatch(setBatchSize(value));
    dispatch(updateSettings({ batchSize: value }));
  };

  const handleNotificationTimeChange = (time: string) => {
    dispatch(setNotificationTime(time));
    dispatch(updateSettings({ notificationTime: time }));
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    dispatch(setTheme(theme));
    dispatch(updateSettings({ theme }));
  };

  const handleBackup = async () => {
    try {
      await backupService.downloadBackup();
    } catch (error) {
      console.error('Backup failed:', error);
      showAlertDialog('Backup failed. Please try again.');
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const validation = backupService.validateBackupFile(file);
      if (!validation.valid) {
        showAlertDialog(validation.error || 'Invalid backup file');
        return;
      }

      showConfirmDialog(
        'This will replace all your current data. Are you sure?',
        async () => {
          try {
            await backupService.uploadBackup(file);
            showAlertDialog('Data restored successfully!');
            // Reload the app to refresh data
            setTimeout(() => window.location.reload(), 1000);
          } catch (error) {
            console.error('Restore failed:', error);
            showAlertDialog('Restore failed. Please check your backup file.');
          }
        }
      );
    } catch (error) {
      console.error('Restore failed:', error);
      showAlertDialog('Restore failed. Please check your backup file.');
    }
  };

  if (loading && !settings) {
    return (
      <Pane className="page-content">
        <Pane
          padding={24}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Spinner size={40} />
          <Text marginTop={16}>Loading settings...</Text>
        </Pane>
      </Pane>
    );
  }

  if (!settings) {
    return (
      <Pane className="page-content">
        <Pane padding={24}>
          <Text>Settings not available</Text>
        </Pane>
      </Pane>
    );
  }

  return (
    <Pane className="page-content">
      <Pane padding={24}>
        <Heading size={600} marginBottom={24}>
          Settings
        </Heading>

        {/* Study Settings */}
        <Heading size={500} marginBottom={16}>
          Study Settings
        </Heading>
        <StudySettingsCard
          settings={settings}
          onBatchSizeChange={handleBatchSizeChange}
        />

        {/* Appearance */}
        <Heading size={500} marginBottom={16}>
          Appearance
        </Heading>
        <Card marginBottom={24}>
          <Pane padding={24}>
            <ThemeToggle
              currentTheme={settings.theme}
              onThemeChange={handleThemeChange}
            />
          </Pane>
        </Card>

        {/* Notifications */}
        <Heading size={500} marginBottom={16}>
          Notifications
        </Heading>
        <NotificationSettingsCard
          settings={settings}
          onNotificationToggle={handleNotificationToggle}
          onNotificationTimeChange={handleNotificationTimeChange}
        />

        {/* Sound & Vibration */}
        <Heading size={500} marginBottom={16}>
          Sound & Vibration
        </Heading>
        <SoundVibrationCard
          settings={settings}
          onSoundToggle={handleSoundToggle}
          onVibrationToggle={handleVibrationToggle}
          onAutoPlayToggle={() =>
            dispatch(
              updateSettings({
                autoPlayPronunciation: !settings.autoPlayPronunciation,
              })
            )
          }
        />

        {/* Data Management */}
        <Heading size={500} marginBottom={16}>
          Data Management
        </Heading>
        <DataManagementCard
          onBackup={handleBackup}
          onRestore={() => {}} // Handled inside DataManagementCard
          onFileUpload={handleFileUpload}
        />

        {/* App Information */}
        <Heading size={500} marginBottom={16}>
          App Information
        </Heading>
        <AppInfoCard />

        {/* Study Tips */}
        <Heading size={500} marginBottom={16}>
          Study Tips
        </Heading>
        <StudyTipsCard />
      </Pane>

      {/* Alert Dialog */}
      <Dialog
        isShown={showAlert}
        title="Alert"
        onCloseComplete={closeAlert}
        confirmLabel="OK"
        onConfirm={closeAlert}
      >
        <Text>{alertMessage}</Text>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog
        isShown={showConfirm}
        title="Confirm"
        onCloseComplete={closeConfirm}
        confirmLabel="Yes"
        cancelLabel="No"
        onConfirm={handleConfirm}
        onCancel={closeConfirm}
      >
        <Text>{confirmMessage}</Text>
      </Dialog>
    </Pane>
  );
};

export default SettingsPage;
