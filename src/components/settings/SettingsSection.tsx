import React from 'react';
import { Pane, Heading } from 'evergreen-ui';
import type { LucideIcon } from 'lucide-react';

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  icon: Icon,
  title,
  children,
  className,
}) => {
  return (
    <Pane marginBottom={32} className={className}>
      <Pane display="flex" alignItems="center" marginBottom={16}>
        <Icon size={20} style={{ marginRight: '8px' }} />
        <Heading size={500}>{title}</Heading>
      </Pane>
      {children}
    </Pane>
  );
};

export default SettingsSection;
