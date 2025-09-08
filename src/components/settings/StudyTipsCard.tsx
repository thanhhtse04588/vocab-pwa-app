import React from 'react';
import { Pane, Card, Text, Heading } from 'evergreen-ui';

const StudyTipsCard: React.FC = () => {
  return (
    <Card>
      <Pane padding={24}>
        <Heading size={400} marginBottom={16}>
          Spaced Repetition Schedule
        </Heading>
        <Pane as="ul" paddingLeft={20}>
          <Text as="li" display="block" marginBottom={8}>
            Level 0: 10 minutes
          </Text>
          <Text as="li" display="block" marginBottom={8}>
            Level 1: 15 minutes
          </Text>
          <Text as="li" display="block" marginBottom={8}>
            Level 2: 1 day
          </Text>
          <Text as="li" display="block" marginBottom={8}>
            Level 3: 3 days
          </Text>
          <Text as="li" display="block" marginBottom={8}>
            Level 4: 1 week
          </Text>
          <Text as="li" display="block" marginBottom={8}>
            Level 5: 2 weeks
          </Text>
          <Text as="li" display="block" marginBottom={8}>
            Level 6: 1 month
          </Text>
          <Text as="li" display="block" marginBottom={8}>
            Level 7: 3 months
          </Text>
        </Pane>
      </Pane>
    </Card>
  );
};

export default StudyTipsCard;
