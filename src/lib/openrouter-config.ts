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
  // DeepSeek R1 - free on OpenRouter (recommended)
  'deepseek/deepseek-r1-0528:free': 'DeepSeek R1 (Free)',
  
  // DeepSeek Chat - free alternative
  'deepseek/deepseek-chat-v3-0324:free': 'DeepSeek Chat V3 (Free)',
  
  // Google Gemma - free alternative
  'google/gemma-3-27b-it:free': 'Google Gemma 3 27B (Free)',
  
  // Direct OpenAI models (when using OpenAI API directly)
  'gpt-4o': 'GPT-4o',
  'gpt-4o-mini': 'GPT-4o Mini',
} as const;

export type OpenRouterModel = keyof typeof OPENROUTER_MODELS;

export function createOpenRouterConfig(
  apiKey: string,
  model: OpenRouterModel = 'google/gemma-3-27b-it:free'
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
  };

  // Handle model-specific parameters
  if (config.model === 'gpt-5' && isDirectOpenAI(config.baseUrl)) {
    // GPT-5 specific parameters
    requestBody.temperature = 1; // GPT-5 requires temperature = 1
    requestBody.max_completion_tokens = maxTokens;
  } else if (config.model.includes('gpt-4o') && isDirectOpenAI(config.baseUrl)) {
    // GPT-4o models use max_completion_tokens but support custom temperature
    requestBody.temperature = temperature;
    requestBody.max_completion_tokens = maxTokens;
  } else {
    // Standard models and OpenRouter
    requestBody.temperature = temperature;
    requestBody.max_tokens = maxTokens;
  }

  // Add JSON format only for direct OpenAI API calls, not OpenRouter
  if (responseFormat === 'json' && isDirectOpenAI(config.baseUrl) && supportsJsonMode(config.model)) {
    requestBody.response_format = { type: 'json_object' };
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.apiKey}`,
  };

  // OpenRouter-specific headers (required for proper attribution)
  if (!isDirectOpenAI(config.baseUrl)) {
    headers['HTTP-Referer'] = 'https://openagentschool.org';
    headers['X-Title'] = config.appName || 'OpenAgentSchool';
  }

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    const apiProvider = config.baseUrl.includes('openrouter') ? 'OpenRouter' : 
                       config.baseUrl.includes('openai') ? 'OpenAI' : 'API';
    throw new Error(`${apiProvider} API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  console.log('Full API Response:', JSON.stringify(data, null, 2));
  
  if (!data.choices || !data.choices[0]) {
    const apiProvider = config.baseUrl.includes('openrouter') ? 'OpenRouter' : 
                       config.baseUrl.includes('openai') ? 'OpenAI' : 'API';
    console.error('Invalid response structure:', data);
    throw new Error(`Invalid response from ${apiProvider} API`);
  }

  const choice = data.choices[0];
  const message = choice.message;
  
  // Extract only the content field (DeepSeek R1 also returns 'reasoning' which we ignore)
  const content = message?.content || '';
  
  console.log('Choice details:', choice);
  console.log('Finish reason:', choice.finish_reason);
  
  // Log if reasoning was present but ignored
  if (message?.reasoning) {
    console.log('Note: DeepSeek reasoning field present but filtered out');
  }
  
  // Debug logging for SCL
  console.log('OpenRouter Request:', {
    model: config.model,
    temperature,
    maxTokens,
    responseFormat,
    hasJsonMode: supportsJsonMode(config.model)
  });
  console.log('OpenRouter Response Content:', content);
  
  if (!content || content.trim() === '') {
    console.error('Empty content in response. Full message object:', message);
    throw new Error('Empty response content from API');
  }
  
  return content;
}

/**
 * Check if we're using direct OpenAI API vs OpenRouter
 */
function isDirectOpenAI(baseUrl: string): boolean {
  return baseUrl.includes('openai.com');
}

/**
 * Check if model supports JSON mode (only for direct OpenAI API)
 */
function supportsJsonMode(model: string): boolean {
  // Only apply JSON mode for direct OpenAI API calls
  const openAIJsonModeModels = [
    'gpt-5',
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-4',
    'gpt-4-turbo', 
    'gpt-3.5-turbo'
  ];
  
  return openAIJsonModeModels.includes(model);
}

/**
 * Environment configuration helper
 */
export function getOpenRouterConfigFromEnv(): OpenRouterConfig | null {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
  const model = (import.meta.env.VITE_OPENROUTER_MODEL || process.env.OPENROUTER_MODEL) as OpenRouterModel;
  const baseUrl = import.meta.env.VITE_OPENROUTER_API_URL || process.env.OPENROUTER_API_URL;
  
  if (!apiKey) return null;
  
  // Determine base URL - if it contains openai.com, strip the /chat/completions part
  let finalBaseUrl = baseUrl || 'https://openrouter.ai/api/v1';
  if (finalBaseUrl.includes('openai.com') && finalBaseUrl.includes('/chat/completions')) {
    finalBaseUrl = finalBaseUrl.replace('/chat/completions', '');
  }
  
  return {
    apiKey,
    model: model || 'google/gemma-3-27b-it:free', // Use Gemma 3 27B free model as default
    baseUrl: finalBaseUrl,
    siteName: 'OpenAgentSchool',
    appName: 'SCL-Analysis'
  };
}
