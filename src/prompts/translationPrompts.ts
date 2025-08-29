import { LANGUAGES, LanguageCode } from '@/lib/languages';

// Centralized translation prompts: HTML-preserving and narration text-only

export function buildHtmlTranslatePrompt(htmlFragment: string, target: LanguageCode): string {
  const label = LANGUAGES.find(l => l.code === target)?.label || target;
  return `You are a precise translator. Maintain meaning and tone. Preserve headings, lists, paragraphs, emphasis, and links. Output clean HTML only (no <html> or <body>, no scripts/styles). Translate the following HTML fragment into language code: ${target} (${label}).\n\nHTML:\n${htmlFragment}`;
}

export function buildNarrationTranslatePrompt(text: string, target: LanguageCode): string {
  const label = LANGUAGES.find(l => l.code === target)?.label || target;
  return `You are translating for voice narration (text-to-speech). Translate the content into ${label} (language code: ${target}).

STRICT OUTPUT RULES:
- Return ONLY the translated text. Nothing else.
- Do NOT include any preface, notes, labels, or headings (e.g., no "Translation:").
- Do NOT wrap in quotes, code fences, brackets, or tags.
- Plain text only (no HTML/Markdown).

STYLE GUIDELINES (for speech):
- Natural, short clauses with clear punctuation
- Expand acronyms on first use when appropriate
- Neutral, instructive tone in active voice
- Keep lists as simple lines and preserve numbering when important
- Avoid awkward symbols/parentheticals; keep technical terms accurate

TEXT:
${text}`;
}

export function buildStrictNativeScriptRetry(text: string, target: LanguageCode): string {
  const label = LANGUAGES.find(l => l.code === target)?.label || target;
  return `Translate to ${label} (language code: ${target}) and return ONLY the translated text in native script. No English. No romanization. No notes.\n\nTEXT:\n${text}`;
}
