import React from 'react';
import { Info } from 'lucide-react';
import SettingsSection from './SettingsSection';
import AppInfoCard from './AppInfoCard';

const AppInfoSection: React.FC = () => {
  return (
    <SettingsSection icon={Info} title="App Information">
      <AppInfoCard />
    </SettingsSection>
  );
};

export default AppInfoSection;
