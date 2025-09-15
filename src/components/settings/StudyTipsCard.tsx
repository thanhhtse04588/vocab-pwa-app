import React from 'react';
import { Pane, Card, Text, Heading } from 'evergreen-ui';
import { Lightbulb } from 'lucide-react';

const StudyTipsCard: React.FC = () => {
  return (
    <Card>
      <Pane>
        <Pane display="flex" alignItems="center" marginBottom={16}>
          <Lightbulb
            size={20}
            style={{ marginRight: '8px', color: '#fbbf24' }}
          />
          <Heading size={400}>Spaced Repetition Schedule</Heading>
        </Pane>
        <Pane display="grid" gridTemplateColumns="1fr 1fr" paddingLeft={0}>
          {[
            { level: 0, time: '10 minutes', color: 'red' },
            { level: 1, time: '15 minutes', color: 'orange' },
            { level: 2, time: '1 day', color: 'yellow' },
            { level: 3, time: '3 days', color: 'green' },
            { level: 4, time: '1 week', color: 'blue' },
            { level: 5, time: '2 weeks', color: 'purple' },
            { level: 6, time: '1 month', color: 'teal' },
            { level: 7, time: '3 months', color: 'black' },
          ].map(({ level, time, color }) => (
            <Pane
              key={level}
              display="flex"
              alignItems="center"
              padding={12}
              backgroundColor="tint1"
              borderRadius={6}
            >
              <Pane
                width={8}
                height={8}
                borderRadius="50%"
                backgroundColor={color}
                marginRight={12}
                flexShrink={0}
              />
              <Text fontWeight={500} marginRight={8}>
                Level {level}:
              </Text>
              <Text color="muted">{time}</Text>
            </Pane>
          ))}
        </Pane>
      </Pane>
    </Card>
  );
};

export default StudyTipsCard;
