import React, { useEffect } from 'react';
import { Pane, Heading, Text, Spinner, Dialog } from 'evergreen-ui';
import { Settings } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  loadSettings,
  updateSettings,
  toggleNotifications,
  setBatchSize,
  setNotificationTime,
} from '@/store/slices/settingsSlice';
import { setTheme } from '@/store/slices/navigationSlice';
import { backupService } from '@/services/backupService';
import { pwaService } from '@/services/pwaService';
import { useSettingsDialogs } from '@/hooks/useSettingsDialogs';
import StudySettingsSection from '@/components/settings/StudySettingsSection';
import AppearanceSection from '@/components/settings/AppearanceSection';
import NotificationSection from '@/components/settings/NotificationSection';
import DataManagementSection from '@/components/settings/DataManagementSection';
import AppInfoSection from '@/components/settings/AppInfoSection';
import StudyTipsSection from '@/components/settings/StudyTipsSection';

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

  // Schedule notifications when settings are loaded
  useEffect(() => {
    const scheduleNotifications = async () => {
      if (settings?.enableNotifications) {
        try {
          await pwaService.scheduleNotification(settings);
        } catch (error) {
          console.error('Error scheduling notifications on load:', error);
        }
      }
    };

    if (settings) {
      scheduleNotifications();
    }
  }, [settings]);

  const handleNotificationToggle = async () => {
    dispatch(toggleNotifications());
    if (settings) {
      const newSettings = {
        ...settings,
        enableNotifications: !settings.enableNotifications,
      };
      dispatch(
        updateSettings({ enableNotifications: newSettings.enableNotifications })
      );

      // Schedule or clear notifications based on toggle
      try {
        if (newSettings.enableNotifications) {
          await pwaService.scheduleNotification(newSettings);
        } else {
          await pwaService.clearScheduledNotifications();
        }
      } catch (error) {
        console.error('Error handling notification toggle:', error);
      }
    }
  };

  const handleBatchSizeChange = (value: number) => {
    dispatch(setBatchSize(value));
    dispatch(updateSettings({ batchSize: value }));
  };

  const handleNotificationTimeChange = async (time: string) => {
    dispatch(setNotificationTime(time));
    if (settings) {
      const newSettings = { ...settings, notificationTime: time };
      dispatch(updateSettings({ notificationTime: time }));

      // Reschedule notifications with new time
      try {
        if (newSettings.enableNotifications) {
          await pwaService.scheduleNotification(newSettings);
        }
      } catch (error) {
        console.error('Error updating notification time:', error);
      }
    }
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    dispatch(setTheme(theme));
    dispatch(updateSettings({ theme }));
  };

  const handleTestNotification = async () => {
    try {
      // Check current permission status
      if (!('Notification' in window)) {
        showAlertDialog('This browser does not support notifications.');
        return;
      }

      let permission = Notification.permission;

      // If permission is not granted, request it
      if (permission === 'default') {
        permission = await pwaService.requestNotificationPermission();
      }

      if (permission === 'granted') {
        try {
          // Try PWA service first
          await pwaService.showNotification('BeeVocab - Test Notification', {
            body: 'This is a test notification to check if notifications are working!',
            icon: '/pwa-192x192.png',
            badge: '/pwa-192x192.png',
            tag: 'test-notification',
            requireInteraction: true,
            data: {
              url: '/learn',
            },
          });
          showAlertDialog(
            '✅ Test notification sent! Check your notifications.'
          );
        } catch (pwaError) {
          console.warn('PWA service failed, trying browser API:', pwaError);
          // Fallback to browser notification API
          const notification = new Notification(
            'BeeVocab - Test Notification',
            {
              body: 'This is a test notification to check if notifications are working!',
              icon: '/pwa-192x192.png',
              badge: '/pwa-192x192.png',
              tag: 'test-notification',
              requireInteraction: true,
              data: {
                url: '/learn',
              },
            }
          );

          notification.onclick = () => {
            window.focus();
            notification.close();
          };

          showAlertDialog(
            '✅ Test notification sent! Check your notifications.'
          );
        }
      } else if (permission === 'denied') {
        showAlertDialog(
          '❌ Notification permission denied. Please enable notifications in your browser settings and refresh the page.'
        );
      } else {
        showAlertDialog(
          '❌ Notification permission not granted. Please allow notifications when prompted.'
        );
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
      showAlertDialog(
        '❌ Failed to send test notification. Please check notification permissions in your browser settings.'
      );
    }
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
      <Pane padding={24} maxWidth={800} marginX="auto">
        <Pane display="flex" alignItems="center" marginBottom={32}>
          <Settings size={24} style={{ marginRight: '12px' }} />
          <Heading size={600}>Settings</Heading>
        </Pane>

        {/* Study Settings */}
        <StudySettingsSection
          settings={settings}
          onBatchSizeChange={handleBatchSizeChange}
        />

        {/* Appearance */}
        <AppearanceSection
          settings={settings}
          onThemeChange={handleThemeChange}
        />

        {/* Notifications */}
        <NotificationSection
          settings={settings}
          onNotificationToggle={handleNotificationToggle}
          onNotificationTimeChange={handleNotificationTimeChange}
          onTestNotification={handleTestNotification}
        />

        {/* Data Management */}
        <DataManagementSection
          onBackup={handleBackup}
          onRestore={() => {}} // Handled inside DataManagementCard
          onFileUpload={handleFileUpload}
        />

        {/* App Information */}
        <AppInfoSection />

        {/* Study Tips */}
        <StudyTipsSection />
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
