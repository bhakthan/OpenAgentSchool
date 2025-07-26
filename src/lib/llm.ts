// src/lib/llm.ts
import { getEnvVar } from './config';

export type LlmProvider = 'openai' | 'azure' | 'gemini' | 'huggingface' | 'openrouter' | 'claude';

interface LlmResponse {
    content: string;
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
        const errorData = await response.json();
        console.error('Azure OpenAI API Error:', errorData);
        throw new Error(errorData.error.message);
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
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);
        throw new Error(errorData.error.message);
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
        const errorData = await response.json();
        console.error('HuggingFace API Error:', errorData);
        throw new Error(errorData.error?.message || 'Unknown error');
    }
    const data = await response.json();
    return { content: data[0]?.generated_text || '' };
}

// OpenRouter API
async function callOpenRouter(prompt: string): Promise<LlmResponse> {
    const apiKey = getEnvVar('VITE_OPENROUTER_API_KEY');
    const apiUrl = getEnvVar('VITE_OPENROUTER_API_URL');
    const model = getEnvVar('VITE_OPENROUTER_MODEL');
    if (!apiKey || !apiUrl || !model) {
        throw new Error("VITE_OPENROUTER_API_KEY, VITE_OPENROUTER_API_URL, and VITE_OPENROUTER_MODEL must be set in your environment variables.");
    }
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }]
        })
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenRouter API Error:', errorData);
        throw new Error(errorData.error?.message || 'Unknown error');
    }
    const data = await response.json();
    return { content: data.choices[0].message.content };
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
        const errorData = await response.json();
        console.error('Claude API Error:', errorData);
        throw new Error(errorData.error?.message || 'Unknown error');
    }
    const data = await response.json();
    let content = data.content || data.choices?.[0]?.message?.content || '';
    if (typeof content !== 'string') {
        content = JSON.stringify(content, null, 2);
    }
    return { content };
}
