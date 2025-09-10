import React from 'react';
import { Pane, Card, Text } from 'evergreen-ui';
import { Layers } from 'lucide-react';
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
    <Card marginBottom={24} elevation={1}>
      <Pane padding={24}>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={16}
        >
          <Pane display="flex" alignItems="center">
            <Layers
              size={16}
              style={{ marginRight: '8px', color: 'var(--text-muted)' }}
            />
            <Text fontWeight={500}>Words per batch</Text>
          </Pane>
          <Pane
            display="flex"
            alignItems="center"
            backgroundColor="tint1"
            paddingX={12}
            paddingY={4}
            borderRadius={4}
          >
            <Text size={300} fontWeight={600}>
              {settings.batchSize} words
            </Text>
          </Pane>
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
        <Pane display="flex" justifyContent="space-between" marginTop={8}>
          <Text size={300} color="muted">
            5 words
          </Text>
          <Text size={300} color="muted">
            50 words
          </Text>
        </Pane>
      </Pane>
    </Card>
  );
};

export default StudySettingsCard;
