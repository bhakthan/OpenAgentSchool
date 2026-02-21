// src/lib/llm.ts
import { getEnvVar } from './config';

export type LlmProvider = 'openai' | 'azure' | 'gemini' | 'huggingface' | 'openrouter' | 'claude' | 'custom';

export interface LlmMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface LlmCallOptions {
    temperature?: number;
    maxTokens?: number;
    /** Hint the API to return JSON (supported by OpenAI, Azure, OpenRouter) */
    responseFormat?: 'json' | 'text';
}

interface LlmResponse {
    content: string;
}

/**
 * Unified multi-provider LLM call with structured messages.
 * Used by SCL and any feature needing system+user message pairs.
 * Resolves provider credentials via getEnvVar (BYOK → env → runtime).
 */
export async function callLlmWithMessages(
    messages: LlmMessage[],
    provider: LlmProvider = 'openrouter',
    options: LlmCallOptions = {}
): Promise<LlmResponse> {
    const { temperature = 0.7, maxTokens = 2000, responseFormat = 'text' } = options;

    switch (provider) {
        case 'openai':
            return callOpenAIWithMessages(messages, temperature, maxTokens, responseFormat);
        case 'azure':
            return callAzureOpenAIWithMessages(messages, temperature, maxTokens, responseFormat);
        case 'gemini':
            return callGeminiWithMessages(messages);
        case 'huggingface': {
            // HuggingFace doesn't support structured messages — concatenate
            const prompt = messages.map(m => m.content).join('\n\n');
            return callHuggingFace(prompt);
        }
        case 'openrouter':
            return callOpenRouterWithMessages(messages, temperature, maxTokens, responseFormat);
        case 'claude':
            return callClaudeWithMessages(messages, temperature, maxTokens);
        case 'custom':
            return callCustomWithMessages(messages, temperature, maxTokens, responseFormat);
        default:
            throw new Error(`Unsupported LLM provider: ${provider}`);
    }
}

export async function callLlm(prompt: string, provider: LlmProvider = 'openai'): Promise<LlmResponse> {
    switch (provider) {
        case 'openai':
            return callOpenAIDirectly(prompt);
        case 'azure':
            return callAzureOpenAI(prompt);
        case 'gemini':
            return callGemini(prompt);
        case 'huggingface':
            return callHuggingFace(prompt);
        case 'openrouter':
            return callOpenRouter(prompt);
        case 'claude':
            return callClaude(prompt);
        case 'custom':
            return callCustomProvider(prompt);
        default:
            throw new Error(`Unsupported LLM provider: ${provider}`);
    }
}

// Helper function to format messages for OpenAI API
async function callOpenAIDirectly(prompt: string): Promise<LlmResponse> {
    const response = await callOpenAI([{ role: 'user', content: prompt }]);
    return { content: response };
}



export async function callOpenAI(
  messages: { role: string; content: string }[],
  model: string = 'gpt-3.5-turbo'
): Promise<string> {
  const apiKey = getEnvVar('VITE_OPENAI_API_KEY');
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your environment variables.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response generated';
}

async function callAzureOpenAI(prompt: string): Promise<LlmResponse> {
    const apiKey = getEnvVar('VITE_AZURE_OPENAI_API_KEY');
    const apiUrl = getEnvVar('VITE_AZURE_OPENAI_API_URL');
    const model = getEnvVar('VITE_AZURE_OPENAI_MODEL');
    if (!apiKey || !apiUrl || !model) {
        throw new Error("VITE_AZURE_OPENAI_API_KEY, VITE_AZURE_OPENAI_API_URL, and VITE_AZURE_OPENAI_MODEL must be set in your environment variables.");
    }
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey
        },
        body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        })
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Azure OpenAI API Error:', errorText);
        
        // Try to parse as JSON, but fall back to text if it fails
        try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error?.message || `API Error: ${response.status} - ${errorText}`);
        } catch (parseError) {
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }
    }
    const data = await response.json();
    return { content: data.choices[0].message.content };
}

async function callGemini(prompt: string): Promise<LlmResponse> {
    const apiKey = getEnvVar('VITE_GEMINI_API_KEY');
    let apiUrl = getEnvVar('VITE_GEMINI_API_URL');
    const model = getEnvVar('VITE_GEMINI_MODEL');
    if (!apiKey || !apiUrl || !model) {
        throw new Error("VITE_GEMINI_API_KEY, VITE_GEMINI_API_URL, and VITE_GEMINI_MODEL must be set in your environment variables.");
    }
    apiUrl = `${apiUrl}?key=${apiKey}`;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model,
            contents: [{
                parts: [{ text: prompt }]
            }]
        })
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error:', errorText);
        
        // Try to parse as JSON, but fall back to text if it fails
        try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error?.message || `API Error: ${response.status} - ${errorText}`);
        } catch (parseError) {
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }
    }
    const data = await response.json();
    return { content: data.candidates[0].content.parts[0].text };
}

// HuggingFace Inference API
async function callHuggingFace(prompt: string): Promise<LlmResponse> {
    const apiKey = getEnvVar('VITE_HUGGINGFACE_API_KEY');
    const apiUrl = getEnvVar('VITE_HUGGINGFACE_API_URL');
    const model = getEnvVar('VITE_HUGGINGFACE_MODEL');
    if (!apiKey || !apiUrl || !model) {
        throw new Error("VITE_HUGGINGFACE_API_KEY, VITE_HUGGINGFACE_API_URL, and VITE_HUGGINGFACE_MODEL must be set in your environment variables.");
    }
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: prompt,
            model
        })
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error('HuggingFace API Error:', errorText);
        
        // Try to parse as JSON, but fall back to text if it fails
        try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error?.message || `API Error: ${response.status} - ${errorText}`);
        } catch (parseError) {
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }
    }
    const data = await response.json();
    return { content: data[0]?.generated_text || '' };
}

// OpenRouter API
async function callOpenRouter(prompt: string): Promise<LlmResponse> {
    const apiKey = getEnvVar('VITE_OPENROUTER_API_KEY');
    let apiUrl = getEnvVar('VITE_OPENROUTER_API_URL') || 'https://openrouter.ai/api/v1';
    // Default to Gemma 3 27B free model if not specified
    const model = getEnvVar('VITE_OPENROUTER_MODEL') || 'google/gemma-3n-e4b-it:free';
    
    if (!apiKey) {
        throw new Error("VITE_OPENROUTER_API_KEY must be set in your environment variables.");
    }

    // Normalize URL: support both base (https://openrouter.ai/api/v1) and full (/chat/completions) forms
    const ensureChatCompletionsUrl = (url: string) => {
        let u = url.trim();
        // If it already includes /chat/completions, keep as-is
        if (/\/chat\/completions\/?$/.test(u)) return u.replace(/\/$/, '');
        // Append path for OpenRouter or OpenAI-style base URLs
        if (/openrouter\.ai|openai\.com/.test(u)) {
            u = u.replace(/\/$/, '') + '/chat/completions';
        }
        return u;
    };
    const finalUrl = ensureChatCompletionsUrl(apiUrl);

    console.log('OpenRouter API Call:', { apiUrl: finalUrl, model }); // Debug info
    
    const requestBody = {
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1024
    };

    console.log('OpenRouter Request Body:', requestBody); // Debug request body
    
    const response = await fetch(finalUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://www.openagentschool.org', // Updated to match your domain
            'X-Title': 'Open Agent School' // Updated to match your site name
        },
        body: JSON.stringify(requestBody)
    });
    console.log('OpenRouter Response Status:', response.status, response.statusText); // Debug response
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenRouter API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            body: errorText
        });
        
        // Try to parse as JSON, but fall back to text if it fails
        try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error?.message || errorData.message || `OpenRouter API Error: ${response.status} - ${errorText}`);
        } catch (parseError) {
            throw new Error(`OpenRouter API Error: ${response.status} - ${errorText}`);
        }
    }
    
    // Proactively check content type; HTML often indicates a proxy or rate-limit page
    const ct = response.headers.get('content-type') || '';
    const responseText = await response.text();
    if (!ct.includes('application/json')) {
        const snippet = responseText.substring(0, 500);
        throw new Error(
            `OpenRouter returned non-JSON (Content-Type: ${ct || 'unknown'}). This usually means the endpoint is wrong or you are rate limited. URL used: ${finalUrl}. Snippet: ${snippet}`
        );
    }
    console.log('OpenRouter Response Text (first 500 chars):', responseText.substring(0, 500)); // Debug response
    
    try {
        const data = JSON.parse(responseText);
        console.log('OpenRouter Parsed Response:', data); // Debug parsed response
        
        // Validate response structure
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('OpenRouter response missing expected structure: choices[0].message');
        }
        
        // Extract only the content field (ignore reasoning, reasoning_details for DeepSeek R1)
        const message = data.choices[0].message;
        const content = message.content || '';
        
        // Log what we're extracting vs ignoring
        if (message.reasoning) {
            console.log('OpenRouter: Ignoring reasoning field, using only content');
        }
        
        if (!content || content.trim() === '') {
            console.warn('OpenRouter: Empty content received, full message:', message);
            throw new Error('OpenRouter returned empty content');
        }
        
        return { content };
    } catch (parseError) {
        console.error('OpenRouter JSON Parse Error:', parseError);
        console.error('Full Response text:', responseText);
        
        // If response looks like HTML, it's likely an error page
        if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
            throw new Error('OpenRouter returned an HTML error page instead of JSON. This usually indicates an API configuration issue or rate limiting.');
        }
        
        // Check if it's a specific OpenRouter error format
        if (responseText.includes('error') && responseText.includes('message')) {
            throw new Error(`OpenRouter Error: ${responseText}`);
        }
        
        // Try to extract any meaningful error message from the text
        const errorMessage = responseText.length > 200 ? responseText.substring(0, 200) + '...' : responseText;
        throw new Error(`OpenRouter returned invalid JSON response: ${errorMessage}`);
    }
}

// ---------------------------------------------------------------------------
// Structured-message variants (used by callLlmWithMessages)
// ---------------------------------------------------------------------------

async function callOpenAIWithMessages(
    messages: LlmMessage[], temperature: number, maxTokens: number, responseFormat: string
): Promise<LlmResponse> {
    const apiKey = getEnvVar('VITE_OPENAI_API_KEY');
    if (!apiKey) throw new Error('OpenAI API key not found. Set VITE_OPENAI_API_KEY.');
    const model = getEnvVar('VITE_OPENAI_MODEL') || 'gpt-4o';
    const apiUrl = getEnvVar('VITE_OPENAI_API_URL') || 'https://api.openai.com/v1';
    const body: any = { model, messages, temperature, max_tokens: maxTokens };
    if (responseFormat === 'json') body.response_format = { type: 'json_object' };
    const response = await fetch(`${apiUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return { content: data.choices?.[0]?.message?.content || '' };
}

async function callAzureOpenAIWithMessages(
    messages: LlmMessage[], temperature: number, maxTokens: number, responseFormat: string
): Promise<LlmResponse> {
    const apiKey = getEnvVar('VITE_AZURE_OPENAI_API_KEY');
    const apiUrl = getEnvVar('VITE_AZURE_OPENAI_API_URL');
    const model = getEnvVar('VITE_AZURE_OPENAI_MODEL');
    if (!apiKey || !apiUrl) {
        throw new Error('Azure OpenAI requires VITE_AZURE_OPENAI_API_KEY and VITE_AZURE_OPENAI_API_URL.');
    }
    const body: any = { messages, temperature, max_tokens: maxTokens };
    if (model) body.model = model;
    if (responseFormat === 'json') body.response_format = { type: 'json_object' };
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Azure OpenAI API error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return { content: data.choices?.[0]?.message?.content || '' };
}

async function callGeminiWithMessages(messages: LlmMessage[]): Promise<LlmResponse> {
    // Gemini uses a different shape — map messages to contents array
    const prompt = messages.map(m => m.content).join('\n\n');
    return callGemini(prompt);
}

async function callOpenRouterWithMessages(
    messages: LlmMessage[], temperature: number, maxTokens: number, responseFormat: string
): Promise<LlmResponse> {
    const apiKey = getEnvVar('VITE_OPENROUTER_API_KEY');
    if (!apiKey) throw new Error('OpenRouter API key not found. Set VITE_OPENROUTER_API_KEY.');
    const model = getEnvVar('VITE_OPENROUTER_MODEL') || 'google/gemma-3n-e4b-it:free';
    let apiUrl = getEnvVar('VITE_OPENROUTER_API_URL') || 'https://openrouter.ai/api/v1';
    if (!/\/chat\/completions\/?$/.test(apiUrl)) {
        apiUrl = apiUrl.replace(/\/$/, '') + '/chat/completions';
    }
    const body: any = { model, messages, temperature, max_tokens: maxTokens };
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://openagentschool.org',
            'X-Title': 'OpenAgentSchool',
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    if (!content) throw new Error('OpenRouter returned empty content');
    return { content };
}

async function callClaudeWithMessages(
    messages: LlmMessage[], temperature: number, maxTokens: number
): Promise<LlmResponse> {
    const apiKey = getEnvVar('VITE_ANTHROPIC_API_KEY');
    const apiUrl = getEnvVar('VITE_ANTHROPIC_API_URL');
    const model = getEnvVar('VITE_ANTHROPIC_MODEL');
    if (!apiKey || !apiUrl || !model) {
        throw new Error('Anthropic requires VITE_ANTHROPIC_API_KEY, VITE_ANTHROPIC_API_URL, and VITE_ANTHROPIC_MODEL.');
    }
    // Claude expects system as a separate param, not in messages
    const systemMsg = messages.find(m => m.role === 'system')?.content;
    const nonSystem = messages.filter(m => m.role !== 'system');
    const body: any = { model, max_tokens: maxTokens, temperature, messages: nonSystem };
    if (systemMsg) body.system = systemMsg;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Claude API error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    let content = data.content || data.choices?.[0]?.message?.content || '';
    if (typeof content !== 'string') content = JSON.stringify(content, null, 2);
    return { content };
}

// Anthropic Claude API
async function callClaude(prompt: string): Promise<LlmResponse> {
    const apiKey = getEnvVar('VITE_ANTHROPIC_API_KEY');
    const apiUrl = getEnvVar('VITE_ANTHROPIC_API_URL');
    const model = getEnvVar('VITE_ANTHROPIC_MODEL');
    if (!apiKey || !apiUrl || !model) {
        throw new Error("VITE_ANTHROPIC_API_KEY, VITE_ANTHROPIC_API_URL, and VITE_ANTHROPIC_MODEL must be set in your environment variables.");
    }
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model,
            max_tokens: 1024,
            temperature: 0.7,
            messages: [
                { role: "user", content: prompt }
            ]
        })
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Claude API Error:', errorText);
        
        // Try to parse as JSON, but fall back to text if it fails
        try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error?.message || `API Error: ${response.status} - ${errorText}`);
        } catch (parseError) {
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }
    }
    const data = await response.json();
    let content = data.content || data.choices?.[0]?.message?.content || '';
    if (typeof content !== 'string') {
        content = JSON.stringify(content, null, 2);
    }
    return { content };
}

// ---------------------------------------------------------------------------
// Custom / International OpenAI-compatible provider
// Supports: DeepSeek, Mistral, Zhipu AI, Moonshot, Volcano Engine,
//           Sarvam AI, BharatGen, and any provider with /chat/completions
// ---------------------------------------------------------------------------

/**
 * Call any OpenAI-compatible provider (structured messages variant).
 * User must configure VITE_CUSTOM_API_KEY, VITE_CUSTOM_API_URL, and VITE_CUSTOM_MODEL.
 */
async function callCustomWithMessages(
    messages: LlmMessage[], temperature: number, maxTokens: number, responseFormat: string
): Promise<{ content: string }> {
    const apiKey = getEnvVar('VITE_CUSTOM_API_KEY');
    const apiUrl = getEnvVar('VITE_CUSTOM_API_URL');
    const model  = getEnvVar('VITE_CUSTOM_MODEL');

    if (!apiKey || !apiUrl || !model) {
        throw new Error(
            'Custom provider requires API Key, Base URL, and Model. ' +
            'Configure them in Settings → Custom / International Provider.'
        );
    }

    // Normalise URL: ensure it ends with /chat/completions
    let endpoint = apiUrl.replace(/\/$/, '');
    if (!/\/chat\/completions\/?$/.test(endpoint)) {
        endpoint += '/chat/completions';
    }

    const body: Record<string, unknown> = { model, messages, temperature, max_tokens: maxTokens };
    if (responseFormat === 'json') body.response_format = { type: 'json_object' };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Custom provider API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    if (!content) throw new Error('Custom provider returned empty content');
    return { content };
}

/** Single-prompt wrapper for backward-compat callLlm() */
async function callCustomProvider(prompt: string): Promise<{ content: string }> {
    return callCustomWithMessages(
        [{ role: 'user', content: prompt }],
        0.7,
        2000,
        'text'
    );
}
