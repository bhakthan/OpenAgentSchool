import { useState, useRef, useCallback, useEffect } from 'react';

// Type declarations for Speech Recognition API
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

interface UseVoiceInputOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

interface UseVoiceInputReturn {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  clearTranscript: () => void;
}

export const useVoiceInput = (options: UseVoiceInputOptions = {}): UseVoiceInputReturn => {
  const {
    language = 'en-US',
    continuous = true, // Back to true for better detection
    interimResults = true,
    onResult,
    onError
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [shouldBeListening, setShouldBeListening] = useState(false); // Track intent to listen

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use refs for callbacks to avoid useEffect dependency issues
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);
  
  // Update refs when callbacks change
  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);
  
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Check for browser support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition && !recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      
      // Configure recognition with more permissive settings
      recognitionRef.current.continuous = continuous;
      recognitionRef.current.interimResults = interimResults;
      recognitionRef.current.lang = language;
      
      // Add more permissive settings for better detection
      if ('maxAlternatives' in recognitionRef.current) {
        (recognitionRef.current as any).maxAlternatives = 1;
      }

      // Handle results
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);
        
        if (finalTranscript && onResultRef.current) {
          onResultRef.current(finalTranscript);
        }
      };

      // Handle errors
      recognitionRef.current.onerror = (event) => {
        // Don't show error for common, expected cases
        if (event.error === 'aborted' || event.error === 'no-speech') {
          setIsListening(false);
          return;
        }
        
        const errorMessage = `Speech recognition error: ${event.error}`;
        setError(errorMessage);
        setIsListening(false);
        
        if (onErrorRef.current && event.error !== 'aborted') {
          onErrorRef.current(errorMessage);
        }
      };

      // Handle end
      recognitionRef.current.onend = () => {
        setIsListening(false);
        
        // If we're supposed to be listening but recognition ended unexpectedly,
        // restart it automatically (common with no-speech timeout)
        if (shouldBeListening && recognitionRef.current) {
          restartTimeoutRef.current = setTimeout(() => {
            if (shouldBeListening && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch (err) {
                setShouldBeListening(false);
              }
            }
          }, 100);
        }
      };

      // Handle start
      recognitionRef.current.onstart = () => {
        setError(null);
        setIsListening(true);
        setShouldBeListening(true);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, [language, continuous, interimResults]); // Removed onResult, onError dependencies

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current || isListening) {
      if (!isSupported) {
        setError('Speech recognition is not supported in this browser');
      }
      return;
    }

    // Check for microphone permission if available
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'microphone' as PermissionName }).catch(() => {
        // Permission query failed, continue anyway
      });
    }

    try {
      setError(null);
      setTranscript('');
      recognitionRef.current.start();
    } catch (err) {
      setError('Failed to start speech recognition');
    }
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    setShouldBeListening(false);
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setShouldBeListening(false);
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    clearTranscript
  };
};
