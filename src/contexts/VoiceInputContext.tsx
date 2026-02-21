/**
 * VoiceInputContext – Global voice-input provider with seamless fallback.
 *
 * Wraps the entire app and exposes `useVoiceInput()` to any component.
 *
 * Engine chain (respects user preference in Settings):
 *   1. Web Speech API    (Chrome, Edge, Safari — free, instant)
 *   2. Whisper WASM      (Firefox + any browser with MediaRecorder — lazy ~40 MB)
 *   3. OpenAI Whisper API (cloud, requires API key)
 *   4. Azure Speech       (cloud, enterprise, requires key)
 *   5. Deepgram           (cloud, real-time, requires key)
 *
 * Language is synced from AudioNarrationContext so users configure language once.
 */

import React, { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import { LanguageCode, getLocaleFor } from '@/lib/languages';
import { useWebSpeechRecognition } from '@/hooks/useWebSpeechRecognition';
import { useAudioNarration } from '@/contexts/AudioNarrationContext';
import { loadSettings } from '@/lib/userSettings';
import {
  isWhisperLocalSupported,
  startMicRecording,
  transcribeAudio,
  WhisperProgressCallback,
} from '@/lib/whisperLocal';
import {
  recordMicBlob,
  transcribeOpenAIWhisper,
  transcribeAzureSpeech,
  transcribeDeepgram,
  transcribeGoogle,
  transcribeAWS,
} from '@/lib/cloudSpeech';

// ── Types ────────────────────────────────────────────────────────────────

export type VoiceEngine = 'web-speech' | 'whisper-wasm' | 'openai-whisper' | 'azure-speech' | 'deepgram' | 'google-stt' | 'aws-transcribe' | null;

export interface VoiceInputContextType {
  /** Begin listening — automatically picks the best available engine */
  startVoice: () => void;
  /** Cancel an in-progress recognition */
  stopVoice: () => void;
  /** Current interim/partial transcript (live while speaking) */
  transcript: string;
  /** Committed final transcript (set when recognition ends) */
  finalTranscript: string;
  /** True while the microphone is recording */
  isListening: boolean;
  /** True during first-time Whisper WASM model download */
  isModelLoading: boolean;
  /** 0–100 download progress (Whisper WASM path only) */
  modelProgress: number;
  /** True if at least one STT engine is available */
  isSupported: boolean;
  /** Which engine is (or would be) active */
  engine: VoiceEngine;
  /** Error message, if any */
  error: string | null;
  /** Currently active language for STT (synced from AudioNarration) */
  language: LanguageCode;
  /** Register a callback to receive the final transcript */
  onResult: (cb: (text: string) => void) => () => void;
}

const VoiceInputContext = createContext<VoiceInputContextType | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────────────────

export function VoiceInputProvider({ children }: { children: ReactNode }) {
  // Web Speech API hook
  const webSpeech = useWebSpeechRecognition();

  // Audio narration context for synced language
  let audioLang: LanguageCode = 'en';
  try {
    const narration = useAudioNarration();
    audioLang = narration.state.selectedLanguage;
  } catch {
    // AudioNarrationContext may not be available in tests
  }

  // State
  const [finalTranscript, setFinalTranscript] = useState('');
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelProgress, setModelProgress] = useState(0);
  const [whisperListening, setWhisperListening] = useState(false);
  const [whisperTranscript, setWhisperTranscript] = useState('');
  const [whisperError, setWhisperError] = useState<string | null>(null);

  // Determine which engine to use (respects user STT preference from Settings)
  const sttPref = loadSettings().sttPreference;

  // Cloud STT engines — user explicitly opted in
  const isCloudStt = sttPref === 'openai-whisper' || sttPref === 'azure-speech' || sttPref === 'deepgram' || sttPref === 'google-stt' || sttPref === 'aws-transcribe';
  const useWebSpeech = isCloudStt ? false : (sttPref === 'whisper-wasm' ? false : webSpeech.isSupported);
  const useWhisper = isCloudStt ? false : (sttPref === 'web-speech' ? false : (!useWebSpeech && isWhisperLocalSupported()));
  const isSupported = useWebSpeech || useWhisper || isCloudStt;
  const engine: VoiceEngine = isCloudStt ? sttPref : (useWebSpeech ? 'web-speech' : useWhisper ? 'whisper-wasm' : null);

  // Mic recording ref (Whisper path)
  const recordingRef = useRef<ReturnType<typeof startMicRecording> | null>(null);

  // Result listeners
  const listenersRef = useRef<Set<(text: string) => void>>(new Set());

  const onResult = useCallback((cb: (text: string) => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  const notifyListeners = useCallback((text: string) => {
    for (const cb of listenersRef.current) {
      try { cb(text); } catch { /* listener error — swallow */ }
    }
  }, []);

  // ── Web Speech API result watcher ──────────────────────────────────────
  const prevTranscriptRef = useRef('');

  useEffect(() => {
    if (useWebSpeech && webSpeech.transcript && webSpeech.transcript !== prevTranscriptRef.current) {
      prevTranscriptRef.current = webSpeech.transcript;
      setFinalTranscript(webSpeech.transcript);
      notifyListeners(webSpeech.transcript);
    }
  }, [useWebSpeech, webSpeech.transcript, notifyListeners]);

  // ── Start voice ────────────────────────────────────────────────────────

  // Cloud STT recording ref
  const cloudRecordingAbort = useRef<AbortController | null>(null);

  const startVoice = useCallback(() => {
    setFinalTranscript('');

    if (useWebSpeech) {
      webSpeech.resetTranscript();
      webSpeech.startListening(audioLang);  // 'auto' handled inside hook
      return;
    }

    if (useWhisper) {
      // Whisper WASM path — record mic audio, then transcribe
      setWhisperTranscript('');
      setWhisperError(null);
      setWhisperListening(true);

      const recording = startMicRecording();
      recordingRef.current = recording;

      // Auto-stop after 10 seconds (Whisper-tiny works best with short clips)
      const timeout = setTimeout(() => {
        stopWhisperAndTranscribe();
      }, 10_000);

      // Store timeout ref for cleanup
      (recording as unknown as { _timeout: ReturnType<typeof setTimeout> })._timeout = timeout;
      return;
    }

    if (isCloudStt) {
      // Cloud STT path — record mic, send to cloud API
      setWhisperTranscript('');
      setWhisperError(null);
      setWhisperListening(true);
      const abort = new AbortController();
      cloudRecordingAbort.current = abort;

      (async () => {
        try {
          const blob = await recordMicBlob(10_000);
          if (abort.signal.aborted) return;
          setWhisperListening(false);
          setIsModelLoading(true);

          // When audioLang is 'auto', pass undefined so cloud APIs auto-detect
          const langHint = audioLang === 'auto' ? undefined : getLocaleFor(audioLang);

          let text = '';
          if (sttPref === 'openai-whisper') {
            text = await transcribeOpenAIWhisper(blob, langHint);
          } else if (sttPref === 'azure-speech') {
            text = await transcribeAzureSpeech(blob, langHint);
          } else if (sttPref === 'deepgram') {
            text = await transcribeDeepgram(blob, langHint);
          } else if (sttPref === 'google-stt') {
            text = await transcribeGoogle(blob, langHint);
          } else if (sttPref === 'aws-transcribe') {
            text = await transcribeAWS(blob, langHint);
          }

          setIsModelLoading(false);
          if (text) {
            setWhisperTranscript(text);
            setFinalTranscript(text);
            notifyListeners(text);
          }
        } catch (err) {
          setIsModelLoading(false);
          setWhisperListening(false);
          setWhisperError(err instanceof Error ? err.message : 'Cloud STT failed');
        }
      })();
      return;
    }
  }, [useWebSpeech, useWhisper, isCloudStt, sttPref, audioLang, webSpeech, notifyListeners]);

  // ── Stop Whisper + transcribe ──────────────────────────────────────────

  const stopWhisperAndTranscribe = useCallback(async () => {
    const recording = recordingRef.current;
    if (!recording) return;
    recordingRef.current = null;

    // Clear auto-stop timeout
    const timeout = (recording as unknown as { _timeout: ReturnType<typeof setTimeout> })?._timeout;
    if (timeout) clearTimeout(timeout);

    try {
      const audio = await recording.stop();
      if (audio.length === 0) {
        setWhisperListening(false);
        return;
      }

      setWhisperListening(false);
      setIsModelLoading(true);

      const progressCb: WhisperProgressCallback = (p) => {
        if (p.status === 'progress' && typeof p.progress === 'number') {
          setModelProgress(Math.round(p.progress));
        }
        if (p.status === 'done' || p.status === 'ready') {
          setIsModelLoading(false);
          setModelProgress(100);
        }
      };

      const result = await transcribeAudio(audio, audioLang, progressCb);
      setIsModelLoading(false);
      setModelProgress(100);

      const text = result.text.trim();
      if (text) {
        setWhisperTranscript(text);
        setFinalTranscript(text);
        notifyListeners(text);
      }
    } catch (err) {
      setIsModelLoading(false);
      setWhisperListening(false);
      setWhisperError(err instanceof Error ? err.message : 'Whisper transcription failed');
    }
  }, [audioLang, notifyListeners]);

  // ── Stop voice ─────────────────────────────────────────────────────────

  const stopVoice = useCallback(() => {
    if (useWebSpeech) {
      webSpeech.stopListening();
      return;
    }

    if (useWhisper) {
      stopWhisperAndTranscribe();
      return;
    }

    if (isCloudStt) {
      cloudRecordingAbort.current?.abort();
      cloudRecordingAbort.current = null;
      setWhisperListening(false);
      setIsModelLoading(false);
      return;
    }
  }, [useWebSpeech, useWhisper, isCloudStt, webSpeech, stopWhisperAndTranscribe]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingRef.current) {
        recordingRef.current.cancel();
        recordingRef.current = null;
      }
      cloudRecordingAbort.current?.abort();
    };
  }, []);

  // ── Derived state ──────────────────────────────────────────────────────

  const isListening = useWebSpeech ? webSpeech.isListening : whisperListening;
  const transcript = useWebSpeech
    ? (webSpeech.interimTranscript || webSpeech.transcript)
    : whisperTranscript;
  const error = useWebSpeech ? webSpeech.error : whisperError;

  const value: VoiceInputContextType = {
    startVoice,
    stopVoice,
    transcript,
    finalTranscript,
    isListening,
    isModelLoading,
    modelProgress,
    isSupported,
    engine,
    error,
    language: audioLang,
    onResult,
  };

  return (
    <VoiceInputContext.Provider value={value}>
      {children}
    </VoiceInputContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────

export function useVoiceInput(): VoiceInputContextType {
  const ctx = useContext(VoiceInputContext);
  if (!ctx) {
    throw new Error('useVoiceInput must be used within a VoiceInputProvider');
  }
  return ctx;
}
