import { getLocaleFor, LanguageCode } from '@/lib/languages';

// Filter and sort voices for display in dropdowns.
// Policy: show voices matching selected language first (locale/prefix), prefer female-sounding and Google/Microsoft names, then others.
export function getDisplayVoices(
  voices: SpeechSynthesisVoice[],
  selectedLanguage: LanguageCode
): SpeechSynthesisVoice[] {
  const locale = getLocaleFor(selectedLanguage).toLowerCase();
  const prefix = locale.split('-')[0];

  const score = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    let s = 0;
    if (lang === locale) s += 50;
    else if (lang.startsWith(prefix)) s += 35;
    if (/female|woman|samantha|victoria|allison|karen|susan|aria|ava|zira|eva/.test(name)) s += 10;
    if (/google/.test(name)) s += 8;
    if (/microsoft/.test(name)) s += 6;
    if (/siri|android|samsung/.test(name)) s += 4;
    return s;
  };

  // Deduplicate by name to avoid duplicates across engines
  const byName = new Map<string, SpeechSynthesisVoice>();
  for (const v of voices) {
    if (!byName.has(v.name)) byName.set(v.name, v);
  }
  return Array.from(byName.values()).sort((a, b) => score(b) - score(a));
}

// Per-language preferred voice name patterns (Windows/Chrome friendly hints)
export const PREFERRED_VOICES_BY_LANG: Record<LanguageCode, string[]> = {
  en: [
    'Google US English Female',
    'Microsoft AvaMultilingual',
    'Microsoft Aria',
    'Microsoft Zira',
    'Samantha',
  ],
  de: ['Google Deutsch', 'Microsoft Katja', 'Microsoft Hedda'],
  es: ['Google español', 'Microsoft Helena', 'Microsoft Laura'],
  fr: ['Google français', 'Microsoft Hortense', 'Microsoft Julie'],
  hi: ['Google हिन्दी', 'Microsoft Kalpana'],
  ja: ['Google 日本語', 'Microsoft Haruka'],
  ko: ['Google 한국의', 'Microsoft Heami'],
  nl: ['Google Nederlands', 'Microsoft Frank'],
  pt: ['Google português', 'Microsoft Maria'],
  ta: ['Google தமிழ்'],
  te: ['Google తెలుగు'],
  kn: ['Google ಕನ್ನಡ'],
  ml: ['Google മലയാളം'],
  zh: ['Google 中文', 'Google 國語', 'Microsoft Huihui']
};
