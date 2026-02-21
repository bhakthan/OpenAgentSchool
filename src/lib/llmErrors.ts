// src/lib/llmErrors.ts
// Shared helper to produce friendly, actionable error messages when LLM calls fail
// because no provider is configured or the configured key is invalid.

import { isLlmProviderConfigured } from './config';

/**
 * Common error patterns that indicate a missing or misconfigured provider
 * rather than a transient service error.
 */
const PROVIDER_ERROR_PATTERNS = [
  'failed to fetch',
  'network error',
  'networkerror',
  'err_connection_refused',
  'load failed',
  'fetch error',
  'cors error',
  '401',
  '403',
  'unauthorized',
  'forbidden',
  'invalid api key',
  'invalid_api_key',
  'incorrect api key',
  'authentication',
  'no llm provider',
  'api key is missing',
  'api key not found',
  'no api key',
  'key missing',
  'scl generation failed',
  'timeout',
];

function looksLikeProviderError(error: unknown): boolean {
  if (!isLlmProviderConfigured()) return true;

  const msg = error instanceof Error ? error.message : String(error);
  const lower = msg.toLowerCase();
  return PROVIDER_ERROR_PATTERNS.some(p => lower.includes(p));
}

/**
 * Returns a user-friendly **markdown** string that guides the learner to
 * configure their provider.  Falls back to a generic retry message when
 * the error doesn't look provider-related.
 *
 * @param error  – the caught error
 * @param context – short label shown in the message, e.g. "Ask AI", "Study Mode"
 */
export function formatLlmErrorMessage(error: unknown, context = 'this feature'): string {
  const rawMsg = error instanceof Error ? error.message : String(error);

  if (looksLikeProviderError(error)) {
    return [
      `### ⚙️  AI Provider Not Configured`,
      ``,
      `${context} requires an AI provider to generate responses, but none is set up yet (or the current key may be invalid).`,
      ``,
      `**How to fix it in 30 seconds:**`,
      ``,
      `1. Click the **⚙ gear icon** in the top-right header to open **Settings**.`,
      `2. Scroll to **AI Provider Configuration**.`,
      `3. Pick a provider (OpenAI, Azure OpenAI, Google Gemini, Anthropic Claude, OpenRouter, or a custom/local runner).`,
      `4. Paste your API key (or just the URL + model for local runners like Ollama).`,
      `5. Hit **Save** — you're done!`,
      ``,
      `> 🔒 Your keys are stored **only in your browser** (localStorage) and are never sent to our servers.`,
      ``,
      `Need a free key to get started? [OpenRouter](https://openrouter.ai/) offers free-tier models.`,
      ``,
      `---`,
      `*Technical detail: ${rawMsg}*`,
    ].join('\n');
  }

  // Generic transient error
  return [
    `### Something went wrong`,
    ``,
    `Sorry, ${context} encountered an unexpected error. Please try again in a moment.`,
    ``,
    `If the problem persists check that your API key is still valid in **Settings** (⚙ gear icon).`,
    ``,
    `---`,
    `*Error: ${rawMsg}*`,
  ].join('\n');
}

/**
 * Same intent as `formatLlmErrorMessage` but returns a short **plain-text**
 * string suitable for toast notifications and inline `<p>` error banners
 * (i.e. places that don't render markdown).
 */
export function formatLlmErrorPlain(error: unknown, context = 'this feature'): string {
  const rawMsg = error instanceof Error ? error.message : String(error);

  if (looksLikeProviderError(error)) {
    return `${context} needs an AI provider. Open Settings (⚙ gear icon) to add your API key — it takes 30 seconds! (${rawMsg})`;
  }

  return `${context} encountered an error. Please try again. (${rawMsg})`;
}
