import { useState, useCallback, useMemo } from 'react';
import { isLlmProviderConfigured } from '@/lib/config';
import type { LanguageCode } from '@/lib/languages';

const STORAGE_KEY = 'oas.contentLanguage';

function loadStoredLanguage(): LanguageCode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return (v as LanguageCode) || 'en';
  } catch {
    return 'en';
  }
}

/**
 * Shared hook for content-language preference across Micro-Learning,
 * Micro-Listening and Byte-Sized Learning.
 *
 * Stores the chosen LanguageCode in localStorage and exposes whether
 * an LLM provider is configured (required for translation).
 */
export function useContentLanguage() {
  const [language, setLanguageState] = useState<LanguageCode>(loadStoredLanguage);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch { /* quota */ }
  }, []);

  const isLlmAvailable = useMemo(() => {
    try {
      return isLlmProviderConfigured();
    } catch {
      return false;
    }
  }, []);

  const needsTranslation = language !== 'en';

  return { language, setLanguage, isLlmAvailable, needsTranslation } as const;
}
