import { Card, Pane, Heading, Text } from 'evergreen-ui';
import React from 'react';

interface SessionStatsProps {
  correct: number;
  incorrect: number;
  total: number;
}

const SessionStats: React.FC<SessionStatsProps> = ({
  correct,
  incorrect,
  total,
}) => {
  return (
    <Card>
      <Pane padding={24}>
        <Pane display="flex" gap={16}>
          <Pane flex={1} textAlign="center">
            <Heading size={600} color="success" margin={0}>
              {correct}
            </Heading>
            <Text margin={0} size={300}>
              Correct
            </Text>
          </Pane>
          <Pane flex={1} textAlign="center">
            <Heading size={600} color="danger" margin={0}>
              {incorrect}
            </Heading>
            <Text margin={0} size={300}>
              Incorrect
            </Text>
          </Pane>
          <Pane flex={1} textAlign="center">
            <Heading size={600} color="info" margin={0}>
              {total}
            </Heading>
            <Text margin={0} size={300}>
              Total
            </Text>
          </Pane>
        </Pane>
      </Pane>
    </Card>
  );
};

export default SessionStats;
