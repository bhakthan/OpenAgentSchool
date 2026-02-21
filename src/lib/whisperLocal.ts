/**
 * whisperLocal.ts – Client-side Whisper speech-to-text via Transformers.js
 *
 * This module is the LAZY-LOADED fallback for browsers that lack the native
 * SpeechRecognition API (primarily Firefox).  The entire Transformers.js library
 * and the whisper-tiny model (~40 MB quantized) are only downloaded when this
 * module is first invoked.  After the first download the model is cached in the
 * browser Cache API, making subsequent uses near-instant.
 *
 * All inference runs in the main thread but via an async pipeline — consider
 * wrapping within a Web Worker if UI jank is observed on low-end devices.
 *
 * Language codes accepted are ISO 639-1 two-letter codes (e.g. 'en', 'hi', 'es').
 */

import type { LanguageCode } from '@/lib/languages';

// ---------- Types ----------

export interface WhisperLocalResult {
  text: string;
}

export type WhisperProgressCallback = (progress: {
  status: string;
  file?: string;
  progress?: number;   // 0–100 when downloading
  loaded?: number;
  total?: number;
}) => void;

// ---------- State ----------

let pipelineInstance: unknown = null;
let pipelineLoading = false;
let pipelineError: string | null = null;

// Queue callers waiting for the pipeline to initialise
let waiters: Array<{ resolve: (pipe: unknown) => void; reject: (err: Error) => void }> = [];

/**
 * Check whether the client can support Whisper WASM
 * (needs MediaDevices for mic capture at minimum).
 */
export function isWhisperLocalSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function'
  );
}

/**
 * Lazy-load the Transformers.js pipeline with Whisper-tiny.
 * The first call downloads ~40 MB; subsequent calls resolve from cache.
 */
async function getPipeline(onProgress?: WhisperProgressCallback): Promise<unknown> {
  if (pipelineInstance) return pipelineInstance;

  if (pipelineLoading) {
    // Another call is already initialising — wait for it
    return new Promise((resolve, reject) => {
      waiters.push({ resolve, reject });
    });
  }

  pipelineLoading = true;
  pipelineError = null;

  try {
    // Dynamic import — tree-shaken out of the main bundle
    const { pipeline, env } = await import('@huggingface/transformers');

    // Prefer WASM backend (broadest browser support)
    // @ts-expect-error – env types vary across builds
    env.backends = { onnx: { wasm: {} } };

    const pipe = await pipeline(
      'automatic-speech-recognition',
      'onnx-community/whisper-tiny',
      {
        dtype: 'q8',            // INT8 quantization (~40 MB vs 150 MB)
        device: 'wasm',         // WASM for max compatibility
        progress_callback: onProgress as (progress: Record<string, unknown>) => void,
      },
    );

    pipelineInstance = pipe;
    pipelineLoading = false;

    // Resolve all waiters
    for (const w of waiters) w.resolve(pipe);
    waiters = [];

    return pipe;
  } catch (err) {
    pipelineLoading = false;
    pipelineError = err instanceof Error ? err.message : String(err);

    // Reject all waiters
    const e = new Error(pipelineError ?? 'Whisper pipeline initialisation failed');
    for (const w of waiters) w.reject(e);
    waiters = [];

    throw e;
  }
}

// ---------- Audio recording helpers ----------

/**
 * Record audio from the microphone via MediaRecorder.
 * Returns a Float32Array (mono, 16 kHz) suitable for Whisper.
 */
export function startMicRecording(): {
  stop: () => Promise<Float32Array>;
  cancel: () => void;
} {
  let mediaRecorder: MediaRecorder | null = null;
  let stream: MediaStream | null = null;
  const chunks: Blob[] = [];
  let cancelled = false;

  const readyPromise = navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
    stream = s;
    if (cancelled) {
      stream.getTracks().forEach(t => t.stop());
      return;
    }
    mediaRecorder = new MediaRecorder(stream, { mimeType: getRecordingMimeType() });
    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
    mediaRecorder.start();
  });

  return {
    stop: async () => {
      await readyPromise;
      if (!mediaRecorder || cancelled) return new Float32Array(0);

      return new Promise<Float32Array>((resolve) => {
        mediaRecorder!.onstop = async () => {
          // Cleanup mic stream
          stream?.getTracks().forEach(t => t.stop());

          const blob = new Blob(chunks, { type: mediaRecorder!.mimeType });
          const audioBuffer = await decodeAudioData(blob);
          resolve(audioBuffer);
        };
        mediaRecorder!.stop();
      });
    },
    cancel: () => {
      cancelled = true;
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        try { mediaRecorder.stop(); } catch { /* noop */ }
      }
      stream?.getTracks().forEach(t => t.stop());
    },
  };
}

function getRecordingMimeType(): string {
  const preferred = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
  for (const mt of preferred) {
    if (MediaRecorder.isTypeSupported(mt)) return mt;
  }
  return ''; // browser default
}

async function decodeAudioData(blob: Blob): Promise<Float32Array> {
  const arrayBuffer = await blob.arrayBuffer();
  const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

  try {
    const decoded = await audioCtx.decodeAudioData(arrayBuffer);
    // Resample to 16 kHz mono (Whisper's expected input)
    const offlineCtx = new OfflineAudioContext(1, decoded.duration * 16000, 16000);
    const source = offlineCtx.createBufferSource();
    source.buffer = decoded;
    source.connect(offlineCtx.destination);
    source.start();
    const resampled = await offlineCtx.startRendering();
    return resampled.getChannelData(0);
  } finally {
    await audioCtx.close();
  }
}

// ---------- Public transcription API ----------

/**
 * Transcribe a Float32Array of audio using the lazy-loaded Whisper pipeline.
 *
 * @param audio  - Mono 16 kHz Float32Array
 * @param language - ISO 639-1 language hint (default 'en')
 * @param onProgress - Progress callback for model download
 */
export async function transcribeAudio(
  audio: Float32Array,
  language: LanguageCode = 'en',
  onProgress?: WhisperProgressCallback,
): Promise<WhisperLocalResult> {
  const pipe = (await getPipeline(onProgress)) as (
    input: Float32Array,
    opts: Record<string, unknown>,
  ) => Promise<{ text: string }>;

  // Whisper uses ISO 639-1 codes; our LanguageCode is already compatible
  // (except 'fil' which maps to Tagalog — Whisper uses 'tl')
  const whisperLang = language === 'fil' ? 'tl' : language === 'nb' ? 'no' : language;

  const result = await pipe(audio, {
    language: whisperLang,
    task: 'transcribe',
    chunk_length_s: 30,
    stride_length_s: 5,
  });

  return { text: (result.text ?? '').trim() };
}

export { pipelineError, pipelineLoading };
