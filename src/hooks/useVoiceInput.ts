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
    continuous = true,
    interimResults = true,
    onResult,
    onError
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check for browser support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    console.log('Speech Recognition API available:', !!SpeechRecognition);
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      console.log('Speech Recognition instance created');
      
      // Configure recognition
      recognitionRef.current.continuous = continuous;
      recognitionRef.current.interimResults = interimResults;
      recognitionRef.current.lang = language;

      // Handle results
      recognitionRef.current.onresult = (event) => {
        console.log('🎤 Speech recognition result received:', event);
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
        console.log('🎤 Transcript:', { finalTranscript, interimTranscript, fullTranscript });
        setTranscript(fullTranscript);
        
        if (finalTranscript && onResult) {
          console.log('🎤 Calling onResult with:', finalTranscript);
          onResult(finalTranscript);
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
        
        if (onError && event.error !== 'aborted') {
          onError(errorMessage);
        }
      };

      // Handle end
      recognitionRef.current.onend = () => {
        console.log('🎤 Speech recognition ended');
        setIsListening(false);
      };

      // Handle start
      recognitionRef.current.onstart = () => {
        console.log('🎤 Speech recognition started');
        setError(null);
        setIsListening(true);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, continuous, interimResults, onResult, onError]);

  const startListening = useCallback(() => {
    console.log('🎤 startListening called', { isSupported, isListening, recognitionRef: !!recognitionRef.current });
    
    if (!isSupported || !recognitionRef.current || isListening) {
      if (!isSupported) {
        console.log('❌ Speech recognition not supported');
        setError('Speech recognition is not supported in this browser');
      }
      if (isListening) {
        console.log('⚠️ Already listening, ignoring start request');
      }
      return;
    }

    // Check for microphone permission if available
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'microphone' as PermissionName }).then(result => {
        console.log('🎤 Microphone permission state:', result.state);
      }).catch(err => {
        console.log('🎤 Could not check microphone permission:', err);
      });
    }

    try {
      console.log('🚀 Starting speech recognition...');
      setError(null);
      setTranscript('');
      recognitionRef.current.start();
    } catch (err) {
      console.log('❌ Error starting speech recognition:', err);
      setError('Failed to start speech recognition');
      console.error('Speech recognition start error:', err);
    }
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
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
