/**
 * useWebSpeechRecognition – Hook wrapping the browser-native SpeechRecognition API.
 *
 * Provides a thin, React-friendly interface over the Web Speech API for
 * speech-to-text.  Works in Chrome, Edge, Safari (incl. mobile), and any
 * browser that exposes SpeechRecognition or webkitSpeechRecognition.
 *
 * If the browser lacks the API, `isSupported` is false and start is a no-op.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { getLocaleFor, LanguageCode } from '@/lib/languages';

export interface WebSpeechRecognitionState {
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  isSupported: boolean;
  error: string | null;
}

const getSpeechRecognitionClass = (): (new () => SpeechRecognition) | null => {
  if (typeof window === 'undefined') return null;
  return (window as Window).SpeechRecognition ?? (window as Window).webkitSpeechRecognition ?? null;
};

export function useWebSpeechRecognition() {
  const [state, setState] = useState<WebSpeechRecognitionState>({
    transcript: '',
    interimTranscript: '',
    isListening: false,
    isSupported: getSpeechRecognitionClass() !== null,
    error: null,
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch { /* noop */ }
        recognitionRef.current = null;
      }
    };
  }, []);

  const startListening = useCallback((language: LanguageCode = 'en') => {
    const SpeechRecognitionCtor = getSpeechRecognitionClass();
    if (!SpeechRecognitionCtor) {
      setState(prev => ({ ...prev, error: 'SpeechRecognition not supported in this browser' }));
      return;
    }

    // Abort any previous recognition session
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* noop */ }
    }

    const rec = new SpeechRecognitionCtor();
    rec.lang = getLocaleFor(language);
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setState(prev => ({
        ...prev,
        isListening: true,
        transcript: '',
        interimTranscript: '',
        error: null,
      }));
    };

    rec.onresult = (event: SpeechRecognitionEvent) => {
      let finalText = '';
      let interimText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }

      setState(prev => ({
        ...prev,
        transcript: finalText || prev.transcript,
        interimTranscript: interimText,
      }));
    };

    rec.onerror = (event: SpeechRecognitionErrorEvent) => {
      const msg =
        event.error === 'not-allowed' ? 'Microphone access denied. Please allow microphone permission.' :
        event.error === 'no-speech' ? 'No speech detected. Please try again.' :
        event.error === 'network' ? 'Network error during speech recognition.' :
        event.error === 'aborted' ? '' :  // user-initiated abort — not an error
        `Speech recognition error: ${event.error}`;

      setState(prev => ({
        ...prev,
        isListening: false,
        error: msg || null,
      }));
    };

    rec.onend = () => {
      setState(prev => ({ ...prev, isListening: false }));
    };

    recognitionRef.current = rec;

    try {
      rec.start();
    } catch (err) {
      setState(prev => ({
        ...prev,
        isListening: false,
        error: 'Failed to start speech recognition.',
      }));
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* noop */ }
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setState(prev => ({ ...prev, transcript: '', interimTranscript: '' }));
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    resetTranscript,
  };
}
