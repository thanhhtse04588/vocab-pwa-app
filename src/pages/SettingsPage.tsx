import React, { useEffect, useState } from 'react';
import { Pane, Heading, Text, Spinner, Dialog } from 'evergreen-ui';
import { Settings } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  loadSettings,
  updateSettings,
  setBatchSize,
} from '@/store/slices/settingsSlice';
import { setTheme } from '@/store/slices/navigationSlice';
import { backupService } from '@/services/backupService';
import { audioCacheService } from '@/services/audioCacheService';
import { toasterService } from '@/services/toasterService';
import StudySettingsSection from '@/components/settings/StudySettingsSection';
import AppearanceSection from '@/components/settings/AppearanceSection';
import SoundVibrationSection from '@/components/settings/SoundVibrationSection';
import DataManagementSection from '@/components/settings/DataManagementSection';
import AppInfoSection from '@/components/settings/AppInfoSection';
import StudyTipsSection from '@/components/settings/StudyTipsSection';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settings, loading } = useAppSelector((state) => state.settings);
  const [audioCacheStats, setAudioCacheStats] = useState<string>(
    'Cache: 0 items, 0 B'
  );
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [restoreFile, setRestoreFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  // Load audio cache stats
  useEffect(() => {
    const loadCacheStats = async () => {
      try {
        const stats = await audioCacheService.getCacheStats();
        const sizeFormatted = await audioCacheService.getCacheSizeFormatted();
        setAudioCacheStats(`Cache: ${stats.size} items, ${sizeFormatted}`);
      } catch (error) {
        console.error('Failed to load cache stats:', error);
      }
    };

    loadCacheStats();
  }, []);

  const handleBatchSizeChange = (value: number) => {
    dispatch(setBatchSize(value));
    dispatch(updateSettings({ batchSize: value }));
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    dispatch(setTheme(theme));
    dispatch(updateSettings({ theme }));
  };

  const handleAutoPlayToggle = () => {
    if (settings) {
      dispatch(
        updateSettings({
          autoPlayPronunciation: !settings.autoPlayPronunciation,
        })
      );
    }
  };

  const handleBackup = async () => {
    try {
      await backupService.downloadBackup();
      toasterService.success('Backup downloaded successfully!');
    } catch (error) {
      console.error('Backup failed:', error);
      toasterService.error('Backup failed. Please try again.');
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
        toasterService.error(validation.error || 'Invalid backup file');
        return;
      }

      // Store file and show confirmation dialog
      setRestoreFile(file);
      setShowRestoreConfirm(true);
    } catch (error) {
      console.error('Restore failed:', error);
      toasterService.error('Restore failed. Please check your backup file.');
    }
  };

  const handleConfirmRestore = async () => {
    if (!restoreFile) return;

    try {
      await backupService.uploadBackup(restoreFile);
      toasterService.success('Data restored successfully!');
      setShowRestoreConfirm(false);
      setRestoreFile(null);
      // Reload the app to refresh data
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Restore failed:', error);
      toasterService.error('Restore failed. Please check your backup file.');
      setShowRestoreConfirm(false);
      setRestoreFile(null);
    }
  };

  const handleCancelRestore = () => {
    setShowRestoreConfirm(false);
    setRestoreFile(null);
    toasterService.info('Data restore cancelled.');
  };

  const handleClearAudioCache = async () => {
    try {
      await audioCacheService.clearCache();
      toasterService.success('Audio cache cleared successfully!');
      // Refresh cache stats
      const stats = await audioCacheService.getCacheStats();
      const sizeFormatted = await audioCacheService.getCacheSizeFormatted();
      setAudioCacheStats(`Cache: ${stats.size} items, ${sizeFormatted}`);
    } catch (error) {
      console.error('Failed to clear audio cache:', error);
      toasterService.error('Failed to clear audio cache. Please try again.');
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

        {/* Sound & Vibration */}
        <SoundVibrationSection
          settings={settings}
          onAutoPlayToggle={handleAutoPlayToggle}
        />

        {/* Data Management */}
        <DataManagementSection
          onBackup={handleBackup}
          onRestore={() => {}} // Handled inside DataManagementCard
          onFileUpload={handleFileUpload}
          onClearAudioCache={handleClearAudioCache}
          audioCacheStats={audioCacheStats}
        />

        {/* App Information */}
        <AppInfoSection />

        {/* Study Tips */}
        <StudyTipsSection />
      </Pane>

      {/* Restore Confirmation Dialog */}
      <Dialog
        isShown={showRestoreConfirm}
        title="Confirm Data Restore"
        onCloseComplete={handleCancelRestore}
        confirmLabel="Yes, Restore"
        cancelLabel="Cancel"
        intent="danger"
        onConfirm={handleConfirmRestore}
        onCancel={handleCancelRestore}
      >
        <Text>
          This will replace all your current data with the backup file. This
          action cannot be undone. Are you sure you want to continue?
        </Text>
      </Dialog>
    </Pane>
  );
};

export default SettingsPage;
