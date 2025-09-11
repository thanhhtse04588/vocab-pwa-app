import React from 'react';
import { Lightbulb } from 'lucide-react';
import SettingsSection from './SettingsSection';
import StudyTipsCard from './StudyTipsCard';

const StudyTipsSection: React.FC = () => {
  return (
    <SettingsSection icon={Lightbulb} title="Study Tips">
      <StudyTipsCard />
    </SettingsSection>
  );
};

export default StudyTipsSection;
