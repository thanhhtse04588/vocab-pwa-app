import React, { useEffect, useState } from 'react';
import { Card, Pane, Heading, Text } from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loadMemoryLevelDistribution } from '@/store/slices/userProgressSlice';

interface MemoryLevelChartProps {
  vocabularySetId?: string;
  showTotal?: boolean;
}

const MemoryLevelChart: React.FC<MemoryLevelChartProps> = ({
  vocabularySetId,
  showTotal = true,
}) => {
  const dispatch = useAppDispatch();
  const { memoryLevelDistribution } = useAppSelector(
    (state) => state.userProgress
  );
  const { sets } = useAppSelector((state) => state.vocabulary);
  const [chartData, setChartData] = useState<Record<number, number>>({});

  useEffect(() => {
    if (vocabularySetId) {
      dispatch(loadMemoryLevelDistribution(vocabularySetId));
    } else if (sets.length > 0) {
      // Load combined distribution for all sets
      loadCombinedDistribution();
    }
  }, [vocabularySetId, sets, dispatch]);

  useEffect(() => {
    setChartData(memoryLevelDistribution);
  }, [memoryLevelDistribution]);

  const loadCombinedDistribution = async () => {
    // Use the memoryLevelDistribution from Redux state
    // This should be loaded by loadCombinedMemoryLevelDistribution
    setChartData(memoryLevelDistribution);
  };

  const getMemoryLevelLabel = (level: number): string => {
    const labels = [
      'New (0)',
      'Learning (1)',
      'Familiar (2)',
      'Known (3)',
      'Mastered (4)',
      'Expert (5)',
      'Native (6)',
      'Perfect (7)',
    ];
    return labels[level] || `Level ${level}`;
  };

  const getMemoryLevelColor = (level: number): string => {
    const colors = [
      '#ff6b6b', // Red - New
      '#ffa726', // Orange - Learning
      '#ffeb3b', // Yellow - Familiar
      '#66bb6a', // Green - Known
      '#42a5f5', // Blue - Mastered
      '#ab47bc', // Purple - Expert
      '#26a69a', // Teal - Native
      '#5c6bc0', // Indigo - Perfect
    ];
    return colors[level] || '#9e9e9e';
  };

  const totalWords = Object.values(chartData).reduce(
    (sum, count) => sum + count,
    0
  );

  if (totalWords === 0) {
    return (
      <Card>
        <Pane padding={24} textAlign="center">
          <Text color="muted">No words to display in chart</Text>
        </Pane>
      </Card>
    );
  }

  return (
    <Card>
      <Pane padding={24}>
        <Heading size={500} marginBottom={16}>
          Memory Levels Distribution
        </Heading>
        <Pane className="memory-chart">
          {Object.entries(chartData).map(([level, count]) => {
            const levelNum = parseInt(level);
            const percentage = totalWords > 0 ? (count / totalWords) * 100 : 0;

            return (
              <Pane key={level} className="memory-level-item" marginBottom={12}>
                <Pane
                  className="memory-level-info"
                  display="flex"
                  alignItems="center"
                  marginBottom={4}
                >
                  <Pane
                    className="memory-level-color"
                    width={12}
                    height={12}
                    borderRadius="50%"
                    marginRight={8}
                    flexShrink={0}
                    backgroundColor={getMemoryLevelColor(levelNum)}
                  />
                  <Pane
                    className="memory-level-label"
                    flex={1}
                    fontSize={14}
                    fontWeight={500}
                  >
                    {getMemoryLevelLabel(levelNum)}
                  </Pane>
                  <Pane
                    className="memory-level-count"
                    fontSize={12}
                    color="muted"
                  >
                    {count} ({percentage.toFixed(1)}%)
                  </Pane>
                </Pane>
                <Pane
                  className="memory-level-bar"
                  height={8}
                  backgroundColor="#f7f9fc"
                  borderRadius={4}
                  overflow="hidden"
                >
                  <Pane
                    className="memory-level-fill"
                    height="100%"
                    width={`${percentage}%`}
                    backgroundColor={getMemoryLevelColor(levelNum)}
                    borderRadius={4}
                    transition="width 0.3s ease"
                  />
                </Pane>
              </Pane>
            );
          })}
        </Pane>
        {showTotal && (
          <Pane
            className="memory-chart-summary"
            marginTop={16}
            paddingTop={16}
            borderTop="1px solid #e4e7eb"
            textAlign="center"
          >
            <Text fontSize={14} color="muted">
              Total: {totalWords} words
            </Text>
          </Pane>
        )}
      </Pane>
    </Card>
  );
};

export default MemoryLevelChart;
