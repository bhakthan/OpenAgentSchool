// Environment configuration helper for Azure Static Web Apps compatibility
import { getSettingValue, loadSettings } from './userSettings';

interface AppConfig {
  VITE_OPENAI_API_KEY: string;
  VITE_OPENAI_API_URL: string;
  VITE_OPENAI_MODEL: string;
  VITE_AZURE_OPENAI_API_KEY: string;
  VITE_AZURE_OPENAI_API_URL: string;
  VITE_AZURE_OPENAI_MODEL: string;
  VITE_GEMINI_API_KEY: string;
  VITE_GEMINI_API_URL: string;
  VITE_GEMINI_MODEL: string;
  VITE_HUGGINGFACE_API_KEY: string;
  VITE_HUGGINGFACE_API_URL: string;
  VITE_HUGGINGFACE_MODEL: string;
  VITE_OPENROUTER_API_KEY: string;
  VITE_OPENROUTER_API_URL: string;
  VITE_OPENROUTER_MODEL: string;
  VITE_ANTHROPIC_API_KEY: string;
  VITE_ANTHROPIC_API_URL: string;
  VITE_ANTHROPIC_MODEL: string;
  VITE_CUSTOM_API_KEY: string;
  VITE_CUSTOM_API_URL: string;
  VITE_CUSTOM_MODEL: string;
}

/**
 * Get environment variable value
 * Works with both local development (.env) and Azure Static Web Apps (app settings)
 *
 * Resolution order:
 *   1. User-supplied settings (browser localStorage — BYOK)
 *   2. Vite build-time env (.env files)
 *   3. process.env (Azure Static Web Apps runtime)
 *   4. window.__APP_CONFIG__ (runtime injection)
 */
export function getEnvVar(key: keyof AppConfig): string | undefined {
  // 1️⃣ User BYOK settings in localStorage (highest priority)
  const userVal = getSettingValue(key);
  if (userVal) return userVal;

  // 2️⃣ Vite build-time env (.env files)
  if (import.meta.env && import.meta.env[key]) {
    return import.meta.env[key] as string;
  }
  
  // 3️⃣ Azure Static Web Apps - available at runtime via process.env
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  // 4️⃣ Production builds - check window object for runtime injection (fallback)
  if (typeof window !== 'undefined' && (window as any).__APP_CONFIG__ && (window as any).__APP_CONFIG__[key]) {
    return (window as any).__APP_CONFIG__[key];
  }
  
  return undefined;
}

/**
 * Get all app configuration
 */
export function getAppConfig(): Partial<AppConfig> {
  const config: Partial<AppConfig> = {};
  
  const keys: (keyof AppConfig)[] = [
    'VITE_OPENAI_API_KEY',
    'VITE_OPENAI_API_URL',
    'VITE_OPENAI_MODEL',
    'VITE_AZURE_OPENAI_API_KEY',
    'VITE_AZURE_OPENAI_API_URL',
    'VITE_AZURE_OPENAI_MODEL',
    'VITE_GEMINI_API_KEY',
    'VITE_GEMINI_API_URL',
    'VITE_GEMINI_MODEL',
    'VITE_HUGGINGFACE_API_KEY',
    'VITE_HUGGINGFACE_API_URL',
    'VITE_HUGGINGFACE_MODEL',
    'VITE_OPENROUTER_API_KEY',
    'VITE_OPENROUTER_API_URL',
    'VITE_OPENROUTER_MODEL',
    'VITE_ANTHROPIC_API_KEY',
    'VITE_ANTHROPIC_API_URL',
    'VITE_ANTHROPIC_MODEL'
  ];
  
  keys.forEach(key => {
    const value = getEnvVar(key);
    if (value) {
      config[key] = value;
    }
  });
  
  return config;
}

/**
 * Check if running in Azure Static Web Apps
 */
export function isAzureStaticWebApp(): boolean {
  return typeof process !== 'undefined' && 
         process.env && 
         !!process.env.WEBSITE_SITE_NAME; // Azure-specific environment variable
}

/**
 * Get configuration source for debugging
 */
export function getConfigSource(): string {
  if (import.meta.env && import.meta.env.DEV) {
    return 'Local Development (.env files)';
  }
  if (isAzureStaticWebApp()) {
    return 'Azure Static Web Apps (app settings)';
  }
  return 'Production Build (compiled environment)';
}

/**
 * Check if any LLM provider is configured
 */
export function isLlmProviderConfigured(): boolean {
  const providers = [
    'VITE_OPENAI_API_KEY',
    'VITE_AZURE_OPENAI_API_KEY', 
    'VITE_GEMINI_API_KEY',
    'VITE_HUGGINGFACE_API_KEY',
    'VITE_OPENROUTER_API_KEY',
    'VITE_ANTHROPIC_API_KEY'
  ] as const;

  const hasStandard = providers.some(provider => {
    const value = getEnvVar(provider);
    return value && value.trim() !== '' && !value.includes('your-') && !value.includes('-here');
  });
  if (hasStandard) return true;

  // Custom provider: configured by URL+model (key optional for local runners)
  const customUrl = getEnvVar('VITE_CUSTOM_API_URL' as keyof AppConfig);
  const customModel = getEnvVar('VITE_CUSTOM_MODEL' as keyof AppConfig);
  return !!(customUrl && customUrl.trim() !== '' && customModel && customModel.trim() !== '');
}

/**
 * Get configured LLM providers
 */
export function getConfiguredProviders(): string[] {
  const providerChecks = [
    { name: 'OpenAI', key: 'VITE_OPENAI_API_KEY' as const },
    { name: 'Azure OpenAI', key: 'VITE_AZURE_OPENAI_API_KEY' as const },
    { name: 'Gemini', key: 'VITE_GEMINI_API_KEY' as const },
    { name: 'HuggingFace', key: 'VITE_HUGGINGFACE_API_KEY' as const },
    { name: 'OpenRouter', key: 'VITE_OPENROUTER_API_KEY' as const },
    { name: 'Claude', key: 'VITE_ANTHROPIC_API_KEY' as const },
  ];

  const result = providerChecks
    .filter(provider => {
      const value = getEnvVar(provider.key);
      return value && value.trim() !== '' && !value.includes('your-') && !value.includes('-here');
    })
    .map(provider => provider.name);

  // Custom provider: detect by URL+model (key optional for local runners)
  const customUrl = getEnvVar('VITE_CUSTOM_API_URL' as keyof AppConfig);
  const customModel = getEnvVar('VITE_CUSTOM_MODEL' as keyof AppConfig);
  if (customUrl && customUrl.trim() !== '' && customModel && customModel.trim() !== '') {
    result.push('Custom');
  }

  return result;
}

/**
 * Get the first available configured LLM provider.
 *
 * Resolution:
 *   1. User's explicit preferredProvider from Settings — ALWAYS honoured.
 *      If the user chose a specific provider, we return it even when the key
 *      hasn't been pasted yet; the actual API call will surface a clear
 *      "key missing" error rather than silently routing to a different provider.
 *   2. Auto-detect: first standard provider with a key → custom (URL+model) → 'openrouter' fallback.
 */
export function getFirstAvailableProvider(): string {
  // 1. Trust the user's explicit choice
  try {
    const settings = loadSettings();
    if (settings.preferredProvider && settings.preferredProvider !== 'auto') {
      const chosen = settings.preferredProvider;

      // Custom provider: valid if URL + model are configured (key is optional for local runners)
      if (chosen === 'custom') {
        const url = getEnvVar('VITE_CUSTOM_API_URL' as keyof AppConfig);
        const model = getEnvVar('VITE_CUSTOM_MODEL' as keyof AppConfig);
        if (url && url.trim() !== '' && model && model.trim() !== '') {
          return 'custom';
        }
        // Custom without URL/model — warn and fall through to auto-detect
        console.warn('[LLM] Custom provider selected but URL/model not configured. Falling back to auto-detect.');
      } else {
        // Standard providers: return the chosen provider unconditionally.
        // The actual LLM call function (callAzureOpenAIWithMessages, etc.) will
        // throw a descriptive error if the API key is missing.
        console.log(`[LLM] Using user-preferred provider: ${chosen}`);
        return chosen;
      }
    }
  } catch {
    // settings unavailable, fall through
  }

  // 2. Auto-detect: first provider with a configured key (or URL+model for custom)
  const providerMappings = [
    { name: 'openai', key: 'VITE_OPENAI_API_KEY' as const },
    { name: 'azure', key: 'VITE_AZURE_OPENAI_API_KEY' as const },
    { name: 'gemini', key: 'VITE_GEMINI_API_KEY' as const },
    { name: 'openrouter', key: 'VITE_OPENROUTER_API_KEY' as const },
    { name: 'claude', key: 'VITE_ANTHROPIC_API_KEY' as const },
    { name: 'huggingface', key: 'VITE_HUGGINGFACE_API_KEY' as const },
  ];

  for (const provider of providerMappings) {
    const value = getEnvVar(provider.key);
    if (value && value.trim() !== '' && !value.includes('your-') && !value.includes('-here')) {
      return provider.name;
    }
  }

  // Custom provider: detect by URL + model (API key is optional for local runners)
  {
    const customUrl = getEnvVar('VITE_CUSTOM_API_URL' as keyof AppConfig);
    const customModel = getEnvVar('VITE_CUSTOM_MODEL' as keyof AppConfig);
    if (customUrl && customUrl.trim() !== '' && customModel && customModel.trim() !== '') {
      return 'custom';
    }
  }
  
  return 'openrouter'; // Fallback (will fail gracefully if not configured)
}
