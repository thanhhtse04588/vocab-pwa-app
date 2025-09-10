import React from 'react';
import { Pane, Spinner, Text, Card, Button } from 'evergreen-ui';
import { useAppDispatch } from '@/hooks/redux';
import { setActiveTab } from '@/store/slices/navigationSlice';

interface VocabularySetErrorStatesProps {
  loading: boolean;
  currentSet: any;
  setId: string;
}

const VocabularySetErrorStates: React.FC<VocabularySetErrorStatesProps> = ({
  loading,
  currentSet,
  setId,
}) => {
  const dispatch = useAppDispatch();

  if (!setId) {
    return (
      <Pane className="page-content">
        <Pane padding={24}>
          <Card>
            <Pane padding={24} textAlign="center">
              <Text size={500} marginBottom={16}>
                Vocabulary Set Not Found
              </Text>
              <Text marginBottom={24}>
                The requested vocabulary set could not be found.
              </Text>
              <Button
                appearance="primary"
                intent="none"
                onClick={() => dispatch(setActiveTab('vocabulary'))}
              >
                Back to Vocabulary
              </Button>
            </Pane>
          </Card>
        </Pane>
      </Pane>
    );
  }

  if (loading && !currentSet) {
    return (
      <Pane className="page-content">
        <Pane
          padding={24}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Spinner size={40} />
          <Text marginTop={16}>Loading vocabulary set...</Text>
        </Pane>
      </Pane>
    );
  }

  if (!loading && !currentSet) {
    return (
      <Pane className="page-content">
        <Pane padding={24}>
          <Card>
            <Pane padding={24} textAlign="center">
              <Text size={500} marginBottom={16}>
                Vocabulary Set Not Found
              </Text>
              <Text marginBottom={24}>
                The requested vocabulary set could not be found.
              </Text>
              <Button
                appearance="primary"
                intent="none"
                onClick={() => dispatch(setActiveTab('vocabulary'))}
              >
                Back to Vocabulary
              </Button>
            </Pane>
          </Card>
        </Pane>
      </Pane>
    );
  }

  return null;
};

export default VocabularySetErrorStates;


