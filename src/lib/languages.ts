// Centralized language definitions used across translation and narration
export const LANGUAGES = [
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'de', label: 'German', locale: 'de-DE' },
  { code: 'es', label: 'Spanish', locale: 'es-ES' },
  { code: 'fr', label: 'French', locale: 'fr-FR' },
  { code: 'hi', label: 'Hindi', locale: 'hi-IN' },
  { code: 'ja', label: 'Japanese', locale: 'ja-JP' },
  { code: 'ko', label: 'Korean', locale: 'ko-KR' },
  { code: 'nl', label: 'Dutch', locale: 'nl-NL' },
  { code: 'pt', label: 'Portuguese', locale: 'pt-BR' },
  { code: 'ta', label: 'Tamil', locale: 'ta-IN' },
  { code: 'te', label: 'Telugu', locale: 'te-IN' },
  { code: 'kn', label: 'Kannada', locale: 'kn-IN' },
  { code: 'ml', label: 'Malayalam', locale: 'ml-IN' },
  { code: 'zh', label: 'Chinese', locale: 'zh-CN' },
] as const;

export type Language = (typeof LANGUAGES)[number];
export type LanguageCode = Language['code'];

export const getLocaleFor = (code: LanguageCode): string =>
  LANGUAGES.find(l => l.code === code)?.locale || 'en-US';

export const getLanguagesSorted = (): ReadonlyArray<Language> =>
  [...LANGUAGES].sort((a, b) => a.label.localeCompare(b.label));

// For the translate modal, we typically exclude English as a target
export type TranslateTargetCode = Exclude<LanguageCode, 'en'>;
export type TranslateTarget = { code: TranslateTargetCode; label: string };
export const getTranslateTargets = (): ReadonlyArray<TranslateTarget> =>
  getLanguagesSorted()
    .filter(l => l.code !== 'en')
    .map(l => ({ code: l.code as TranslateTargetCode, label: l.label }));
