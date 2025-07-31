// Environment configuration helper for Azure Static Web Apps compatibility

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
}

/**
 * Get environment variable value
 * Works with both local development (.env) and Azure Static Web Apps (app settings)
 */
export function getEnvVar(key: keyof AppConfig): string | undefined {
  // For local development - Vite injects these at build time from .env files
  if (import.meta.env && import.meta.env[key]) {
    return import.meta.env[key] as string;
  }
  
  // For Azure Static Web Apps - available at runtime via process.env
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  // For production builds - check window object for runtime injection (fallback)
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

  return providers.some(provider => {
    const value = getEnvVar(provider);
    return value && value.trim() !== '' && !value.includes('your-') && !value.includes('-here');
  });
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
    { name: 'Claude', key: 'VITE_ANTHROPIC_API_KEY' as const }
  ];

  return providerChecks
    .filter(provider => {
      const value = getEnvVar(provider.key);
      return value && value.trim() !== '' && !value.includes('your-') && !value.includes('-here');
    })
    .map(provider => provider.name);
}

/**
 * Get the first available configured LLM provider for Study Mode
 */
export function getFirstAvailableProvider(): string {
  const providerMappings = [
    { name: 'openai', key: 'VITE_OPENAI_API_KEY' as const },
    { name: 'azure', key: 'VITE_AZURE_OPENAI_API_KEY' as const },
    { name: 'gemini', key: 'VITE_GEMINI_API_KEY' as const },
    { name: 'openrouter', key: 'VITE_OPENROUTER_API_KEY' as const },
    { name: 'claude', key: 'VITE_ANTHROPIC_API_KEY' as const },
    { name: 'huggingface', key: 'VITE_HUGGINGFACE_API_KEY' as const }
  ];

  for (const provider of providerMappings) {
    const value = getEnvVar(provider.key);
    if (value && value.trim() !== '' && !value.includes('your-') && !value.includes('-here')) {
      return provider.name;
    }
  }
  
  return 'openai'; // Fallback to openai (will fail gracefully if not configured)
}
