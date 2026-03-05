import { callLlm } from '@/lib/llm';
import { getFirstAvailableProvider } from '@/lib/config';
import { LANGUAGES, type LanguageCode } from '@/lib/languages';
import type { LlmProvider } from '@/lib/llm';

// In-memory translation cache keyed by `${langCode}::${text}`
const cache = new Map<string, string>();

function cacheKey(lang: LanguageCode, text: string): string {
  return `${lang}::${text}`;
}

/**
 * Translate plain-text educational content into the target language via LLM.
 * Results are cached in memory so repeated calls for the same text are free.
 * Returns the original text on error or if the target is English.
 */
export async function translateContent(
  text: string,
  targetLang: LanguageCode,
): Promise<string> {
  if (!text || targetLang === 'en') return text;

  const key = cacheKey(targetLang, text);
  const cached = cache.get(key);
  if (cached) return cached;

  const label = LANGUAGES.find((l) => l.code === targetLang)?.label ?? targetLang;

  const prompt = `You are translating educational content about AI and Agents for learners. Translate the following text into ${label} (language code: ${targetLang}).

RULES:
- Return ONLY the translated text. Nothing else.
- Preserve technical terms (e.g. "LLM", "RAG", "MCP", "API") in their original form when they are widely known acronyms.
- Keep the same tone: motivational, concise, plain-language.
- Do NOT add notes, labels, or explanations about the translation.
- Plain text only (no HTML/Markdown).

TEXT:
${text}`;

  try {
    const provider = getFirstAvailableProvider() as LlmProvider;
    const { content } = await callLlm(prompt, provider);
    const translated = (content || '').trim();
    if (translated) {
      cache.set(key, translated);
      return translated;
    }
    return text;
  } catch {
    return text;
  }
}

/**
 * Translate multiple strings in parallel.
 * Returns an array in the same order as the input.
 */
export async function translateBatch(
  texts: string[],
  targetLang: LanguageCode,
): Promise<string[]> {
  if (targetLang === 'en') return texts;
  return Promise.all(texts.map((t) => translateContent(t, targetLang)));
}
