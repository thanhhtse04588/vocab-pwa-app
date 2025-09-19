import { useEffect, useState, useRef, useCallback } from 'react';

interface SpeechRecognitionInterface {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onresult:
    | ((event: {
        results: {
          [index: number]: { [index: number]: { transcript: string } };
        };
      }) => void)
    | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  isSupported: boolean;
}

export const useSpeechRecognition = (
  onResult: (transcript: string) => void,
  languageCode: string = 'en-US'
): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const speechRecognitionRef = useRef<SpeechRecognitionInterface | null>(null);
  const onResultRef = useRef(onResult);

  // Update the ref when onResult changes
  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (
          window as unknown as {
            SpeechRecognition?: unknown;
            webkitSpeechRecognition?: unknown;
          }
        ).SpeechRecognition ||
        (
          window as unknown as {
            SpeechRecognition?: unknown;
            webkitSpeechRecognition?: unknown;
          }
        ).webkitSpeechRecognition;

      const recognition =
        new (SpeechRecognition as new () => SpeechRecognitionInterface)() as SpeechRecognitionInterface;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = languageCode;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: {
        results: {
          [index: number]: { [index: number]: { transcript: string } };
        };
      }) => {
        const transcript = event.results[0][0].transcript;
        onResultRef.current(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: { error: string }) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
      setIsSupported(true);
    }
  }, [languageCode]); // Recreate when language changes

  const startListening = useCallback(() => {
    if (speechRecognitionRef.current && !isListening) {
      speechRecognitionRef.current.start();
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (speechRecognitionRef.current && isListening) {
      speechRecognitionRef.current.stop();
    }
  }, [isListening]);

  return {
    isListening,
    startListening,
    stopListening,
    isSupported,
  };
};
