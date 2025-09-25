import React, { useEffect, useMemo } from 'react';
import { Card, Pane, Text, useTheme } from 'evergreen-ui';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loadMemoryLevelDistribution } from '@/store/slices/userProgressSlice';

interface MemoryLevelChartProps {
  vocabularySetId?: string;
}

const MemoryLevelChart: React.FC<MemoryLevelChartProps> = ({
  vocabularySetId,
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { memoryLevelDistribution } = useAppSelector(
    (state) => state.userProgress
  );
  const { sets } = useAppSelector((state) => state.vocabulary);

  useEffect(() => {
    if (vocabularySetId) {
      dispatch(loadMemoryLevelDistribution(vocabularySetId));
    } else if (sets.length > 0) {
      // Load combined distribution for all sets
      // This should be loaded by loadCombinedMemoryLevelDistribution
    }
  }, [vocabularySetId, sets, dispatch]);

  const getMemoryLevelColor = (level: number): string => {
    const colors = [
      '', // Empty for level 0 (not used)
      theme.colors.green200, // Level 1 - Beginner
      theme.colors.green300, // Level 2 - Learning
      theme.colors.green400, // Level 3 - Familiar
      theme.colors.green500, // Level 4 - Known
      theme.colors.green600, // Level 5 - Proficient
      theme.colors.green700, // Level 6 - Advanced
      theme.colors.green800, // Level 7 - Mastered
    ];
    return colors[level] || theme.colors.gray500;
  };

  // Transform data for chart
  const chartData = useMemo(() => {
    return Object.entries(memoryLevelDistribution)
      .filter(([level]) => parseInt(level) >= 1) // Only show levels 1-7
      .map(([level, count]) => {
        const levelNum = parseInt(level);
        return {
          level: levelNum,
          count: count,
          color: getMemoryLevelColor(levelNum),
        };
      })
      .sort((a, b) => a.level - b.level);
  }, [memoryLevelDistribution]);

  const totalWords = chartData.reduce((sum, item) => sum + item.count, 0);

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
      <Pane>
        <Pane marginBottom={16} borderRadius={6} padding={16}>
          {/* Simple CSS Bar Chart */}
          <Pane display="flex" alignItems="end" height={220} gap={4}>
            {chartData.map((item, index) => {
              const maxCount = Math.max(...chartData.map((d) => d.count));
              const height = (item.count / maxCount) * 180; // Max height 180px
              return (
                <Pane
                  key={index}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  flex={1}
                  minWidth={0}
                  position="relative"
                >
                  {/* Count number on top of bar */}
                  {item.count > 0 && (
                    <Text
                      fontSize={10}
                      position="absolute"
                      top={-25}
                      zIndex={2}
                      textAlign="center"
                      paddingY={2}
                    >
                      {`${item.count} words`}
                    </Text>
                  )}

                  <Pane
                    width="100%"
                    height={height}
                    backgroundColor={item.color}
                    borderTopLeftRadius={4}
                    borderTopRightRadius={4}
                    marginBottom={8}
                    paddingY={4}
                    minHeight={item.count > 0 ? 4 : 0}
                  />

                  {/* Level number at bottom */}
                  <Text
                    size={300}
                    textAlign="center"
                    fontWeight={600}
                    color="muted"
                  >
                    {item.level === 7 ? 'Mastered' : `Lv ${item.level}`}
                  </Text>
                </Pane>
              );
            })}
          </Pane>
        </Pane>
      </Pane>
    </Card>
  );
};

export default MemoryLevelChart;
