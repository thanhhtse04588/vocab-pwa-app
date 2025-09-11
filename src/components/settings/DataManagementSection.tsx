import React from 'react';
import { Database } from 'lucide-react';
import SettingsSection from './SettingsSection';
import DataManagementCard from './DataManagementCard';

interface DataManagementSectionProps {
  onBackup: () => void;
  onRestore: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DataManagementSection: React.FC<DataManagementSectionProps> = ({
  onBackup,
  onRestore,
  onFileUpload,
}) => {
  return (
    <SettingsSection icon={Database} title="Data Management">
      <DataManagementCard
        onBackup={onBackup}
        onRestore={onRestore}
        onFileUpload={onFileUpload}
      />
    </SettingsSection>
  );
};

export default DataManagementSection;
