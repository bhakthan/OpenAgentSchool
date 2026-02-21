/**
 * Cloud Speech APIs — thin wrappers for STT and TTS cloud providers.
 *
 * These functions run entirely in the browser. API keys come from
 * the user-settings stored in localStorage (BYOK).
 *
 * Current support:
 *   STT: OpenAI Whisper API, Azure Speech, Deepgram
 *   TTS: OpenAI TTS, Azure Speech, ElevenLabs
 */

import { loadSettings, type SpeechServiceConfig } from './userSettings';

// ─── Helpers ─────────────────────────────────────────────────────────────

/** Resolve an effective API key for a speech service, falling back to the OpenAI provider key when appropriate. */
function resolveKey(service: SpeechServiceConfig | undefined, fallbackProvider?: string): string | undefined {
  if (service?.apiKey) return service.apiKey;
  if (fallbackProvider) {
    const settings = loadSettings();
    return settings.providers[fallbackProvider as keyof typeof settings.providers]?.apiKey;
  }
  return undefined;
}

/** Record microphone audio and return a Blob (WAV-ish) — reused by cloud STT engines. */
export async function recordMicBlob(maxMs = 10_000): Promise<Blob> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm' });
  const chunks: BlobPart[] = [];

  return new Promise((resolve, reject) => {
    mediaRecorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
    mediaRecorder.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
      resolve(new Blob(chunks, { type: mediaRecorder.mimeType }));
    };
    mediaRecorder.onerror = () => {
      stream.getTracks().forEach(t => t.stop());
      reject(new Error('MediaRecorder error'));
    };
    mediaRecorder.start();
    setTimeout(() => { if (mediaRecorder.state === 'recording') mediaRecorder.stop(); }, maxMs);
  });
}

// ─── STT — OpenAI Whisper API ────────────────────────────────────────────

export async function transcribeOpenAIWhisper(audioBlob: Blob, lang?: string): Promise<string> {
  const settings = loadSettings();
  const cfg = settings.speechServices?.openaiSpeech;
  const apiKey = resolveKey(cfg, 'openai') ?? resolveKey(cfg, 'openrouter');
  if (!apiKey) throw new Error('No API key configured for OpenAI Whisper. Set one in Settings → Provider keys.');

  const url = cfg?.apiUrl || 'https://api.openai.com/v1/audio/transcriptions';
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.webm');
  formData.append('model', cfg?.model || 'whisper-1');
  if (lang) formData.append('language', lang);

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: formData,
  });
  if (!res.ok) throw new Error(`Whisper API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.text?.trim() ?? '';
}

// ─── STT — Azure Speech Services ─────────────────────────────────────────

export async function transcribeAzureSpeech(audioBlob: Blob, lang = 'en-US'): Promise<string> {
  const settings = loadSettings();
  const cfg = settings.speechServices?.azureSpeech;
  if (!cfg?.apiKey) throw new Error('No Azure Speech key configured. Set one in Settings.');

  // Accept either a region name (e.g. "eastus") or a full endpoint URL
  const region = cfg.apiUrl?.replace(/^https?:\/\//, '').split('.')[0] || 'eastus';
  const url = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${lang}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': cfg.apiKey,
      'Content-Type': audioBlob.type || 'audio/webm',
    },
    body: audioBlob,
  });
  if (!res.ok) throw new Error(`Azure Speech STT ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.DisplayText ?? data.Text ?? '';
}

// ─── STT — Deepgram ──────────────────────────────────────────────────────

export async function transcribeDeepgram(audioBlob: Blob, lang = 'en'): Promise<string> {
  const settings = loadSettings();
  const cfg = settings.speechServices?.deepgram;
  if (!cfg?.apiKey) throw new Error('No Deepgram API key configured. Set one in Settings.');

  const model = cfg.model || 'nova-2';
  const url = `https://api.deepgram.com/v1/listen?model=${model}&language=${lang}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${cfg.apiKey}`,
      'Content-Type': audioBlob.type || 'audio/webm',
    },
    body: audioBlob,
  });
  if (!res.ok) throw new Error(`Deepgram ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.results?.channels?.[0]?.alternatives?.[0]?.transcript?.trim() ?? '';
}

// ─── TTS — OpenAI ────────────────────────────────────────────────────────

/**
 * OpenAI TTS — language is auto-detected from the input text.
 * Pass `lang` (BCP-47) for logging/future API support.
 */
export async function speakOpenAI(text: string, _lang?: string): Promise<ArrayBuffer> {
  const settings = loadSettings();
  const cfg = settings.speechServices?.openaiSpeech;
  const apiKey = resolveKey(cfg, 'openai') ?? resolveKey(cfg, 'openrouter');
  if (!apiKey) throw new Error('No API key configured for OpenAI TTS. Set one in Settings.');

  const url = cfg?.apiUrl || 'https://api.openai.com/v1/audio/speech';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: cfg?.model || 'tts-1',
      voice: cfg?.voiceId || 'alloy',
      input: text,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI TTS ${res.status}: ${await res.text()}`);
  return res.arrayBuffer();
}

// ─── TTS — Azure Speech ──────────────────────────────────────────────────

export async function speakAzure(text: string, lang = 'en-US'): Promise<ArrayBuffer> {
  const settings = loadSettings();
  const cfg = settings.speechServices?.azureSpeech;
  if (!cfg?.apiKey) throw new Error('No Azure Speech key configured. Set one in Settings.');

  const region = cfg.apiUrl?.replace(/^https?:\/\//, '').split('.')[0] || 'eastus';
  const voice = cfg.voiceId || 'en-US-JennyNeural';
  const ssml = `<speak version='1.0' xml:lang='${lang}'><voice name='${voice}'>${text}</voice></speak>`;
  const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': cfg.apiKey,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
    },
    body: ssml,
  });
  if (!res.ok) throw new Error(`Azure TTS ${res.status}: ${await res.text()}`);
  return res.arrayBuffer();
}

// ─── TTS — ElevenLabs ────────────────────────────────────────────────────

/**
 * ElevenLabs TTS — `eleven_multilingual_v2` auto-detects language from text.
 * Pass `lang` (BCP-47) for optional language_code hint.
 */
export async function speakElevenLabs(text: string, lang?: string): Promise<ArrayBuffer> {
  const settings = loadSettings();
  const cfg = settings.speechServices?.elevenlabs;
  if (!cfg?.apiKey) throw new Error('No ElevenLabs API key configured. Set one in Settings.');

  const voiceId = cfg.voiceId || '21m00Tcm4TlvDq8ikWAM'; // default "Rachel"
  const model = cfg.model || 'eleven_multilingual_v2';
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const body: Record<string, unknown> = {
    text,
    model_id: model,
  };
  // ElevenLabs multilingual_v2 can accept an optional language_code hint
  if (lang && model.includes('multilingual')) {
    body.language_code = lang;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': cfg.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  return res.arrayBuffer();
}

// ─── Convenience dispatchers ─────────────────────────────────────────────

/** Play audio from an ArrayBuffer through the browser's audio system. */
export function playAudioBuffer(buffer: ArrayBuffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([buffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => { URL.revokeObjectURL(url); resolve(); };
    audio.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Audio playback failed')); };
    audio.play().catch(reject);
  });
}
