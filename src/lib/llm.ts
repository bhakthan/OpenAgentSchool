// src/lib/llm.ts
export type LlmProvider = 'openai' | 'azure' | 'gemini' | 'huggingface' | 'openrouter' | 'claude';

interface LlmResponse {
    content: string;
}

export async function callLlm(prompt: string, provider: LlmProvider): Promise<LlmResponse> {
    switch (provider) {
        case 'openai':
            return callOpenAI(prompt);
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

async function callOpenAI(prompt: string): Promise<LlmResponse> {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const apiUrl = import.meta.env.VITE_OPENAI_API_URL;

    if (!apiKey || !apiUrl) {
        throw new Error("VITE_OPENAI_API_KEY and VITE_OPENAI_API_URL must be set in your .env file.");
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(errorData.error.message);
    }

    const data = await response.json();
    return { content: data.choices[0].message.content };
}

async function callAzureOpenAI(prompt: string): Promise<LlmResponse> {
    const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY;
    const apiUrl = import.meta.env.VITE_AZURE_OPENAI_API_URL;
    if (!apiKey || !apiUrl) {
        throw new Error("VITE_AZURE_OPENAI_API_KEY and VITE_AZURE_OPENAI_API_URL must be set in your .env file.");
    }
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey
        },
        body: JSON.stringify({
            model: "gpt-4o",
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
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    let apiUrl = import.meta.env.VITE_GEMINI_API_URL;
    if (!apiKey || !apiUrl) {
        throw new Error("VITE_GEMINI_API_KEY and VITE_GEMINI_API_URL must be set in your .env file.");
    }
    apiUrl = `${apiUrl}?key=${apiKey}`;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "gemini-2.0-flash",
            contents: [{
                parts: [{
                    text: prompt
                }]
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
    const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    const apiUrl = import.meta.env.VITE_HUGGINGFACE_API_URL;
    if (!apiKey || !apiUrl) {
        throw new Error("VITE_HUGGINGFACE_API_KEY and VITE_HUGGINGFACE_API_URL must be set in your .env file.");
    }
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: prompt
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
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const apiUrl = import.meta.env.VITE_OPENROUTER_API_URL;
    if (!apiKey || !apiUrl) {
        throw new Error("VITE_OPENROUTER_API_KEY and VITE_OPENROUTER_API_URL must be set in your .env file.");
    }
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "openrouter",
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
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    const apiUrl = import.meta.env.VITE_ANTHROPIC_API_URL;
    if (!apiKey || !apiUrl) {
        throw new Error("VITE_ANTHROPIC_API_KEY and VITE_ANTHROPIC_API_URL must be set in your .env file.");
    }
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
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
    // Claude's response format may differ; adjust as needed
    return { content: data.content || data.choices?.[0]?.message?.content || '' };
}
