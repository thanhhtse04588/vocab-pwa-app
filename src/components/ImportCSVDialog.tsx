import React, { useRef, useState } from 'react';
import {
  SideSheet,
  Pane,
  Button,
  Text,
  Table,
  Badge,
  Alert,
  Position,
} from 'evergreen-ui';
import { useAppDispatch } from '@/hooks/redux';
import { importCSVWords } from '@/store/slices/vocabularySlice';
import { parseCSV, validateCSVFile } from '@/utils/csvParser';
import type { CSVParseResult } from '@/utils/csvParser';
import { toasterService } from '@/services/toasterService';

interface ImportCSVDialogProps {
  isShown: boolean;
  onClose: () => void;
  setId: string;
}

const ImportCSVDialog: React.FC<ImportCSVDialogProps> = ({
  isShown,
  onClose,
  setId,
}) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<CSVParseResult | null>(null);
  const [currentStep, setCurrentStep] = useState<
    'select' | 'preview' | 'import'
  >('select');

  const handleImportCSV = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file first
      const validation = validateCSVFile(file);
      if (!validation.valid) {
        toasterService.error(validation.error || 'Invalid file');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csvData = e.target?.result as string;
          const result = parseCSV(csvData);
          setPreviewData(result);
          setCurrentStep('preview');
        } catch (error) {
          console.error('CSV parsing error:', error);
          toasterService.error(
            'Error parsing CSV file. Please check the format.'
          );
        }
      };
      reader.readAsText(file);
    }
  };

  const handleConfirmImport = () => {
    if (previewData && previewData.success) {
      dispatch(importCSVWords({ setId, words: previewData.data }));
      onClose();
      resetDialog();
    }
  };

  const resetDialog = () => {
    setSelectedFile(null);
    setPreviewData(null);
    setCurrentStep('select');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetDialog();
    onClose();
  };

  const downloadCSVTemplate = () => {
    const csvContent =
      'word,meaning,pronunciation,example\nhello,greeting,həˈloʊ,Hello, how are you?\nworld,planet,wɜːrld,The world is beautiful';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'vocabulary_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderPreviewTable = () => {
    if (!previewData || !previewData.data.length) return null;

    return (
      <Pane marginTop={16}>
        <Text size={500} fontWeight={600} marginBottom={12}>
          Preview ({previewData.data.length} words)
        </Text>
        <Pane
          maxHeight={300}
          overflowY="auto"
          border="1px solid #E4E7EB"
          borderRadius={4}
        >
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>Word</Table.TextHeaderCell>
              <Table.TextHeaderCell>Meaning</Table.TextHeaderCell>
              <Table.TextHeaderCell>Pronunciation</Table.TextHeaderCell>
              <Table.TextHeaderCell>Example</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {previewData.data.slice(0, 10).map((word, index) => (
                <Table.Row key={index}>
                  <Table.TextCell>{word.word}</Table.TextCell>
                  <Table.TextCell>{word.meaning}</Table.TextCell>
                  <Table.TextCell>{word.pronunciation || '-'}</Table.TextCell>
                  <Table.TextCell>{word.example || '-'}</Table.TextCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Pane>
        {previewData.data.length > 10 && (
          <Text size={300} color="muted" marginTop={8}>
            Showing first 10 rows. {previewData.data.length - 10} more rows will
            be imported.
          </Text>
        )}
      </Pane>
    );
  };

  const renderErrorsAndWarnings = () => {
    if (!previewData) return null;

    return (
      <Pane marginTop={16}>
        {previewData.errors.length > 0 && (
          <Alert intent="danger" title="Errors" marginBottom={12}>
            <Pane is="ul" paddingLeft={20}>
              {previewData.errors.map((error, index) => (
                <Text key={index} is="li" display="block" marginBottom={4}>
                  {error}
                </Text>
              ))}
            </Pane>
          </Alert>
        )}

        {previewData.warnings.length > 0 && (
          <Alert intent="warning" title="Warnings" marginBottom={12}>
            <Pane is="ul" paddingLeft={20}>
              {previewData.warnings.slice(0, 5).map((warning, index) => (
                <Text key={index} is="li" display="block" marginBottom={4}>
                  {warning}
                </Text>
              ))}
              {previewData.warnings.length > 5 && (
                <Text is="li" display="block" marginTop={8} fontWeight={600}>
                  ... and {previewData.warnings.length - 5} more warnings
                </Text>
              )}
            </Pane>
          </Alert>
        )}
      </Pane>
    );
  };

  const getDialogTitle = () => {
    switch (currentStep) {
      case 'select':
        return 'Import CSV';
      case 'preview':
        return 'Preview Import';
      default:
        return 'Import CSV';
    }
  };

  const getConfirmLabel = () => {
    switch (currentStep) {
      case 'select':
        return 'Choose CSV File';
      case 'preview':
        return previewData?.success ? 'Import Words' : 'Back';
      default:
        return 'Choose CSV File';
    }
  };

  const getCancelLabel = () => {
    switch (currentStep) {
      case 'select':
        return 'Cancel';
      case 'preview':
        return 'Back';
      default:
        return 'Cancel';
    }
  };

  const handleConfirm = () => {
    switch (currentStep) {
      case 'select':
        handleImportCSV();
        break;
      case 'preview':
        if (previewData?.success) {
          handleConfirmImport();
        } else {
          setCurrentStep('select');
        }
        break;
    }
  };

  const handleCancel = () => {
    switch (currentStep) {
      case 'select':
        handleClose();
        break;
      case 'preview':
        setCurrentStep('select');
        break;
    }
  };

  return (
    <>
      <SideSheet
        position={Position.BOTTOM}
        isShown={isShown}
        onCloseComplete={handleClose}
      >
        <Pane padding={24}>
          {/* Header */}
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            paddingBottom={16}
            marginBottom={16}
            borderBottom="1px solid #E4E7EB"
          >
            <Text size={500} fontWeight={600}>
              {getDialogTitle()}
            </Text>
          </Pane>

          {currentStep === 'select' && (
            <>
              <Text marginBottom={16}>
                Your CSV file should have the following columns:
              </Text>
              <Pane is="ul" paddingLeft={20} marginBottom={16}>
                <Text is="li" display="block" marginBottom={8}>
                  <Text fontWeight={600}>word</Text> - The vocabulary word
                  (required)
                </Text>
                <Text is="li" display="block" marginBottom={8}>
                  <Text fontWeight={600}>meaning</Text> - The
                  meaning/translation (required)
                </Text>
                <Text is="li" display="block" marginBottom={8}>
                  <Text fontWeight={600}>pronunciation</Text> - Pronunciation
                  guide (optional)
                </Text>
                <Text is="li" display="block" marginBottom={8}>
                  <Text fontWeight={600}>example</Text> - Example sentence
                  (optional)
                </Text>
              </Pane>
              <Button
                appearance="primary"
                intent="success"
                onClick={downloadCSVTemplate}
                width="100%"
                marginBottom={16}
              >
                Download Template
              </Button>
            </>
          )}

          {currentStep === 'preview' && previewData && (
            <>
              <Pane display="flex" alignItems="center" marginBottom={16}>
                <Text size={500} fontWeight={600}>
                  File: {selectedFile?.name}
                </Text>
                <Badge
                  color={previewData.success ? 'green' : 'red'}
                  marginLeft={12}
                >
                  {previewData.success ? 'Valid' : 'Invalid'}
                </Badge>
              </Pane>

              {renderErrorsAndWarnings()}
              {previewData.success && renderPreviewTable()}
            </>
          )}

          {/* Action Buttons */}
          <Pane display="flex" gap={12} marginTop={24}>
            <Button flex={1} onClick={handleCancel} appearance="minimal">
              {getCancelLabel()}
            </Button>
            <Button
              flex={1}
              onClick={handleConfirm}
              intent="success"
              disabled={currentStep === 'preview' && !previewData?.success}
            >
              {getConfirmLabel()}
            </Button>
          </Pane>
        </Pane>
      </SideSheet>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </>
  );
};

export default ImportCSVDialog;
