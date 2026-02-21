/**
 * User Settings — browser-localStorage-based BYOK (Bring Your Own Keys)
 *
 * ────────────────────────────────────────────────────────────
 *  YOUR KEYS NEVER LEAVE YOUR BROWSER.
 *  They are stored in localStorage under the key "oas.user.apiSettings".
 *  Nothing is sent to any analytics, telemetry, or third-party service.
 * ────────────────────────────────────────────────────────────
 */

// Re-use the canonical AppConfig key names so the mapping is explicit
type AppConfigKey =
  | 'VITE_OPENAI_API_KEY' | 'VITE_OPENAI_API_URL' | 'VITE_OPENAI_MODEL'
  | 'VITE_AZURE_OPENAI_API_KEY' | 'VITE_AZURE_OPENAI_API_URL' | 'VITE_AZURE_OPENAI_MODEL'
  | 'VITE_GEMINI_API_KEY' | 'VITE_GEMINI_API_URL' | 'VITE_GEMINI_MODEL'
  | 'VITE_HUGGINGFACE_API_KEY' | 'VITE_HUGGINGFACE_API_URL' | 'VITE_HUGGINGFACE_MODEL'
  | 'VITE_OPENROUTER_API_KEY' | 'VITE_OPENROUTER_API_URL' | 'VITE_OPENROUTER_MODEL'
  | 'VITE_ANTHROPIC_API_KEY' | 'VITE_ANTHROPIC_API_URL' | 'VITE_ANTHROPIC_MODEL';

export type SttPreference = 'auto' | 'web-speech' | 'whisper-wasm' | 'openai-whisper' | 'azure-speech' | 'deepgram';
export type TtsPreference = 'browser' | 'openai-tts' | 'azure-speech' | 'elevenlabs';

export interface ProviderConfig {
  apiKey?: string;
  apiUrl?: string;
  model?: string;
}

/** Configuration for a cloud Speech service (STT or TTS) */
export interface SpeechServiceConfig {
  apiKey?: string;
  apiUrl?: string;   // e.g. Azure region endpoint or custom proxy
  model?: string;    // e.g. "whisper-1", "tts-1-hd"
  voiceId?: string;  // TTS voice identifier
}

export interface UserSettings {
  /** Which LLM provider the learner prefers (used as default for all LLM features) */
  preferredProvider?: string;
  /** Per-provider configuration */
  providers: {
    openai?: ProviderConfig;
    azure?: ProviderConfig;
    gemini?: ProviderConfig;
    huggingface?: ProviderConfig;
    openrouter?: ProviderConfig;
    claude?: ProviderConfig;
  };
  /** Custom backend URLs (for self-hosted deployments) */
  backends: {
    coreApi?: string;
    orchestrator?: string;
    knowledgeService?: string;
  };
  /** Speech-to-text engine preference */
  sttPreference: SttPreference;
  /** Text-to-speech engine preference */
  ttsPreference: TtsPreference;
  /** Cloud speech service credentials (keyed by service name) */
  speechServices: {
    /** OpenAI Whisper API (STT) + OpenAI TTS */
    openaiSpeech?: SpeechServiceConfig;
    /** Azure Cognitive Services Speech */
    azureSpeech?: SpeechServiceConfig;
    /** Deepgram STT */
    deepgram?: SpeechServiceConfig;
    /** ElevenLabs TTS */
    elevenlabs?: SpeechServiceConfig;
  };
}

const STORAGE_KEY = 'oas.user.apiSettings';

const DEFAULT_SETTINGS: UserSettings = {
  preferredProvider: undefined,
  providers: {},
  backends: {},
  sttPreference: 'auto',
  ttsPreference: 'browser',
  speechServices: {},
};

// ---------------------------------------------------------------------------
// Mapping from VITE_* keys → UserSettings fields
// ---------------------------------------------------------------------------
const KEY_MAP: Record<AppConfigKey, (s: UserSettings) => string | undefined> = {
  VITE_OPENAI_API_KEY:        s => s.providers.openai?.apiKey,
  VITE_OPENAI_API_URL:        s => s.providers.openai?.apiUrl,
  VITE_OPENAI_MODEL:          s => s.providers.openai?.model,
  VITE_AZURE_OPENAI_API_KEY:  s => s.providers.azure?.apiKey,
  VITE_AZURE_OPENAI_API_URL:  s => s.providers.azure?.apiUrl,
  VITE_AZURE_OPENAI_MODEL:    s => s.providers.azure?.model,
  VITE_GEMINI_API_KEY:        s => s.providers.gemini?.apiKey,
  VITE_GEMINI_API_URL:        s => s.providers.gemini?.apiUrl,
  VITE_GEMINI_MODEL:          s => s.providers.gemini?.model,
  VITE_HUGGINGFACE_API_KEY:   s => s.providers.huggingface?.apiKey,
  VITE_HUGGINGFACE_API_URL:   s => s.providers.huggingface?.apiUrl,
  VITE_HUGGINGFACE_MODEL:     s => s.providers.huggingface?.model,
  VITE_OPENROUTER_API_KEY:    s => s.providers.openrouter?.apiKey,
  VITE_OPENROUTER_API_URL:    s => s.providers.openrouter?.apiUrl,
  VITE_OPENROUTER_MODEL:      s => s.providers.openrouter?.model,
  VITE_ANTHROPIC_API_KEY:     s => s.providers.claude?.apiKey,
  VITE_ANTHROPIC_API_URL:     s => s.providers.claude?.apiUrl,
  VITE_ANTHROPIC_MODEL:       s => s.providers.claude?.model,
};

// ---------------------------------------------------------------------------
// CRUD helpers
// ---------------------------------------------------------------------------

/** Load settings from localStorage (returns defaults if nothing stored) */
export function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<UserSettings>;
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      providers: { ...DEFAULT_SETTINGS.providers, ...parsed.providers },
      backends: { ...DEFAULT_SETTINGS.backends, ...parsed.backends },
      speechServices: { ...DEFAULT_SETTINGS.speechServices, ...parsed.speechServices },
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/** Persist settings to localStorage */
export function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('[UserSettings] Failed to save:', e);
  }
}

/** Remove all user settings from localStorage */
export function clearSettings(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // swallow
  }
}

/** Check whether the learner has stored any custom settings */
export function isUsingCustomSettings(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Bridge: look up a VITE_* key from user settings (used by getEnvVar patch)
// ---------------------------------------------------------------------------
/**
 * Given an AppConfig key (e.g. VITE_OPENAI_API_KEY), return the user-stored
 * value if one exists.  Returns undefined when nothing is configured.
 */
export function getSettingValue(key: string): string | undefined {
  const accessor = KEY_MAP[key as AppConfigKey];
  if (!accessor) return undefined;
  const settings = loadSettings();
  return accessor(settings) || undefined;
}

// ---------------------------------------------------------------------------
// Export / Import (JSON) — for classroom / workshop sharing
// ---------------------------------------------------------------------------

/** Export settings as a downloadable JSON blob */
export function exportSettingsJSON(): string {
  return JSON.stringify(loadSettings(), null, 2);
}

/** Import settings from a JSON string (merges with existing) */
export function importSettingsJSON(json: string): UserSettings {
  const imported = JSON.parse(json) as Partial<UserSettings>;
  const current = loadSettings();
  const merged: UserSettings = {
    ...current,
    ...imported,
    providers: { ...current.providers, ...imported.providers },
    backends: { ...current.backends, ...imported.backends },
    speechServices: { ...current.speechServices, ...imported.speechServices },
    sttPreference: imported.sttPreference ?? current.sttPreference,
    ttsPreference: imported.ttsPreference ?? current.ttsPreference,
  };
  saveSettings(merged);
  return merged;
}
