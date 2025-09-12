import React from 'react';
import { Pane, Card, Text, TextInput } from 'evergreen-ui';
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
    <Card marginBottom={0}>
      <Pane paddingX={24}>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={0}
        >
          <Pane display="flex" alignItems="center">
            <Layers
              size={16}
              style={{ marginRight: '8px', color: 'var(--text-muted)' }}
            />
            <Text fontWeight={500}>Words per batch</Text>
          </Pane>
          <Pane display="flex" alignItems="center" gap={8}>
            <TextInput
              type="number"
              min={5}
              max={50}
              value={settings.batchSize.toString()}
              onChange={(e) => onBatchSizeChange(parseInt(e.target.value) || 5)}
              width={80}
              textAlign="center"
            />
            <Text size={300} color="muted">
              words
            </Text>
          </Pane>
        </Pane>
      </Pane>
    </Card>
  );
};

export default StudySettingsCard;
