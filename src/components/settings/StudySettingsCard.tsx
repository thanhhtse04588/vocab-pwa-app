import React from 'react';
import { Pane, Card, Text } from 'evergreen-ui';
import type { UserSettings } from '@/types';

interface StudySettingsCardProps {
  settings: UserSettings;
  onBatchSizeChange: (value: number) => void;
}

const StudySettingsCard: React.FC<StudySettingsCardProps> = ({
  settings,
  onBatchSizeChange,
}) => {
  return (
    <Card marginBottom={24}>
      <Pane padding={24}>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={16}
        >
          <Text>Words per batch</Text>
          <Text>{settings.batchSize} words</Text>
        </Pane>
        <input
          type="range"
          min={5}
          max={50}
          value={settings.batchSize}
          onChange={(e) => onBatchSizeChange(parseInt(e.target.value))}
          style={{
            width: '100%',
            marginTop: '8px',
            background: 'transparent',
            outline: 'none',
            WebkitAppearance: 'none',
            appearance: 'none',
          }}
          className="range-slider"
        />
      </Pane>
    </Card>
  );
};

export default StudySettingsCard;
