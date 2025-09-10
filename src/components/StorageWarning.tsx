import React, { useEffect, useState } from 'react';
import { Alert, Button, Pane, Text } from 'evergreen-ui';
import { useAppDispatch } from '@/hooks/redux';
import { setActiveTab } from '@/store/slices/navigationSlice';

const WARNING_THRESHOLD_PERCENT = 85;

const StorageWarning: React.FC = () => {
  const dispatch = useAppDispatch();
  const [usagePercent, setUsagePercent] = useState<number | null>(null);
  const [usageMB, setUsageMB] = useState<number | null>(null);
  const [quotaMB, setQuotaMB] = useState<number | null>(null);

  useEffect(() => {
    const checkStorage = async () => {
      try {
        if (navigator?.storage && 'estimate' in navigator.storage) {
          const { usage, quota } = await navigator.storage.estimate();
          if (
            typeof usage === 'number' &&
            typeof quota === 'number' &&
            quota > 0
          ) {
            const percent = (usage / quota) * 100;
            setUsagePercent(percent);
            setUsageMB(usage / (1024 * 1024));
            setQuotaMB(quota / (1024 * 1024));
          }
        }
      } catch {
        // ignore best-effort failures
      }
    };

    checkStorage();
  }, []);

  const isNearFull =
    usagePercent !== null && usagePercent >= WARNING_THRESHOLD_PERCENT;
  const format = (num: number) => Math.round(num * 10) / 10;

  if (!isNearFull) return null;

  return (
    <Alert
      intent="warning"
      title="Local storage is nearly full"
      marginBottom={16}
    >
      <Pane
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={12}
      >
        <Text>
          Approximately {format(usagePercent!)}% used (~
          {usageMB ? format(usageMB) : '?'} MB /
          {quotaMB ? format(quotaMB) : '?'} MB). Consider backing up and
          removing unused sets.
        </Text>
        <Button
          onClick={() => dispatch(setActiveTab('settings'))}
          appearance="minimal"
        >
          Manage data
        </Button>
      </Pane>
    </Alert>
  );
};

export default StorageWarning;
