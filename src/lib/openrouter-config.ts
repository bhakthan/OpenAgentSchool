/**
 * OpenRouter API Configuration for SCL
 * Replaces OpenAI API with OpenRouter API
 */

export interface OpenRouterConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
  siteName?: string;
  appName?: string;
}

export const OPENROUTER_MODELS = {
  // High-performance models
  'anthropic/claude-3-opus': 'Claude 3 Opus',
  'anthropic/claude-3-sonnet': 'Claude 3 Sonnet', 
  'anthropic/claude-3-haiku': 'Claude 3 Haiku',
  'openai/gpt-4': 'GPT-4',
  'openai/gpt-4-turbo': 'GPT-4 Turbo',
  'openai/gpt-3.5-turbo': 'GPT-3.5 Turbo',
  
  // Cost-effective options
  'meta-llama/llama-2-70b-chat': 'Llama 2 70B',
  'mistralai/mixtral-8x7b-instruct': 'Mixtral 8x7B',
  'microsoft/wizardlm-2-8x22b': 'WizardLM 2 8x22B',
  
  // Specialized models
  'cohere/command-r-plus': 'Command R+',
  'google/gemini-pro': 'Gemini Pro',
} as const;

export type OpenRouterModel = keyof typeof OPENROUTER_MODELS;

export function createOpenRouterConfig(
  apiKey: string,
  model: OpenRouterModel = 'anthropic/claude-3-sonnet'
): OpenRouterConfig {
  return {
    apiKey,
    model,
    baseUrl: 'https://openrouter.ai/api/v1',
    siteName: 'OpenAgentSchool',
    appName: 'SCL-Analysis'
  };
}

/**
 * OpenRouter-compatible LLM API call
 */
export async function callOpenRouter(
  config: OpenRouterConfig,
  systemPrompt: string,
  userPrompt: string,
  options: {
    temperature?: number;
    maxTokens?: number;
    responseFormat?: 'json' | 'text';
  } = {}
): Promise<string> {
  const {
    temperature = 0.7,
    maxTokens = 2000,
    responseFormat = 'json'
  } = options;

  const requestBody: any = {
    model: config.model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature,
    max_tokens: maxTokens,
  };

  // Add JSON format for compatible models
  if (responseFormat === 'json' && supportsJsonMode(config.model)) {
    requestBody.response_format = { type: 'json_object' };
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.apiKey}`,
  };

  // OpenRouter-specific headers
  if (config.siteName) {
    headers['HTTP-Referer'] = config.siteName;
  }
  if (config.appName) {
    headers['X-Title'] = config.appName;
  }

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}\n${errorText}`);
  }

  const data = await response.json();
  
  if (!data.choices || !data.choices[0]) {
    throw new Error('Invalid response from OpenRouter API');
  }

  return data.choices[0].message.content;
}

/**
 * Check if model supports JSON mode
 */
function supportsJsonMode(model: string): boolean {
  const jsonModeModels = [
    'openai/gpt-4',
    'openai/gpt-4-turbo', 
    'openai/gpt-3.5-turbo',
    'anthropic/claude-3-opus',
    'anthropic/claude-3-sonnet'
  ];
  
  return jsonModeModels.some(supported => model.includes(supported));
}

/**
 * Environment configuration helper
 */
export function getOpenRouterConfigFromEnv(): OpenRouterConfig | null {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
  const model = (import.meta.env.VITE_OPENROUTER_MODEL || process.env.OPENROUTER_MODEL) as OpenRouterModel;
  
  if (!apiKey) return null;
  
  return createOpenRouterConfig(apiKey, model || 'anthropic/claude-3-sonnet');
}
