// Centralized language definitions used across translation and narration
export const LANGUAGES = [
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'ar', label: 'Arabic', locale: 'ar-SA' },
  { code: 'bn', label: 'Bengali', locale: 'bn-IN' },
  { code: 'de', label: 'German', locale: 'de-DE' },
  { code: 'es', label: 'Spanish', locale: 'es-ES' },
  { code: 'fil', label: 'Filipino', locale: 'fil-PH' },
  { code: 'fr', label: 'French', locale: 'fr-FR' },
  { code: 'gu', label: 'Gujarati', locale: 'gu-IN' },
  { code: 'hi', label: 'Hindi', locale: 'hi-IN' },
  { code: 'id', label: 'Indonesian', locale: 'id-ID' },
  { code: 'it', label: 'Italian', locale: 'it-IT' },
  { code: 'ja', label: 'Japanese', locale: 'ja-JP' },
  { code: 'kn', label: 'Kannada', locale: 'kn-IN' },
  { code: 'ko', label: 'Korean', locale: 'ko-KR' },
  { code: 'ml', label: 'Malayalam', locale: 'ml-IN' },
  { code: 'mr', label: 'Marathi', locale: 'mr-IN' },
  { code: 'nb', label: 'Norwegian', locale: 'nb-NO' },
  { code: 'nl', label: 'Dutch', locale: 'nl-NL' },
  { code: 'pl', label: 'Polish', locale: 'pl-PL' },
  { code: 'pt', label: 'Portuguese', locale: 'pt-BR' },
  { code: 'ru', label: 'Russian', locale: 'ru-RU' },
  { code: 'sv', label: 'Swedish', locale: 'sv-SE' },
  { code: 'ta', label: 'Tamil', locale: 'ta-IN' },
  { code: 'te', label: 'Telugu', locale: 'te-IN' },
  { code: 'th', label: 'Thai', locale: 'th-TH' },
  { code: 'tr', label: 'Turkish', locale: 'tr-TR' },
  { code: 'uk', label: 'Ukrainian', locale: 'uk-UA' },
  { code: 'vi', label: 'Vietnamese', locale: 'vi-VN' },
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
