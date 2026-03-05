import { useState, useEffect, useRef } from 'react';
import { translateContent } from '@/lib/translateContent';
import type { LanguageCode } from '@/lib/languages';

/**
 * React hook that translates a piece of text into the target language.
 * Returns { translated, isTranslating }.
 * When language is 'en', returns the original text instantly.
 */
export function useTranslatedText(text: string, lang: LanguageCode) {
  const [translated, setTranslated] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);
  const reqId = useRef(0);

  useEffect(() => {
    if (!text || lang === 'en') {
      setTranslated(text);
      setIsTranslating(false);
      return;
    }

    const id = ++reqId.current;
    setIsTranslating(true);

    translateContent(text, lang).then((result) => {
      // Only apply if this is still the latest request
      if (id === reqId.current) {
        setTranslated(result);
        setIsTranslating(false);
      }
    });
  }, [text, lang]);

  return { translated, isTranslating };
}
