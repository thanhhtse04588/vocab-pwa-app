import React from 'react';
import { Database } from 'lucide-react';
import SettingsSection from './SettingsSection';
import DataManagementCard from './DataManagementCard';

interface DataManagementSectionProps {
  onBackup: () => void;
  onRestore: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearAudioCache?: () => void;
  audioCacheStats?: string;
}

const DataManagementSection: React.FC<DataManagementSectionProps> = ({
  onBackup,
  onRestore,
  onFileUpload,
  onClearAudioCache,
  audioCacheStats,
}) => {
  return (
    <SettingsSection icon={Database} title="Data Management">
      <DataManagementCard
        onBackup={onBackup}
        onRestore={onRestore}
        onFileUpload={onFileUpload}
        onClearAudioCache={onClearAudioCache}
        audioCacheStats={audioCacheStats}
      />
    </SettingsSection>
  );
};

export default DataManagementSection;
