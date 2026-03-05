import React from 'react';
import { getLanguagesSorted, type LanguageCode } from '@/lib/languages';

interface ContentLanguageSelectorProps {
  language: LanguageCode;
  onChange: (code: LanguageCode) => void;
  isLlmAvailable: boolean;
  className?: string;
}

const ALL_LANGUAGES = getLanguagesSorted();

/**
 * Shared language selector for Micro-Learning, Micro-Listening, and Byte-Sized Learning.
 * Shows a "Requires LLM *" note when a non-English language is selected and no LLM key is set.
 */
export const ContentLanguageSelector: React.FC<ContentLanguageSelectorProps> = ({
  language,
  onChange,
  isLlmAvailable,
  className = '',
}) => {
  const needsLlm = language !== 'en';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="content-lang" className="text-xs text-muted-foreground whitespace-nowrap">
        🌐 Language
      </label>
      <select
        id="content-lang"
        value={language}
        onChange={(e) => onChange(e.target.value as LanguageCode)}
        className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="en">English</option>
        {ALL_LANGUAGES.filter((l) => l.code !== 'en').map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}{!isLlmAvailable ? ' *' : ''}
          </option>
        ))}
      </select>
      {needsLlm && !isLlmAvailable && (
        <span className="text-[10px] text-amber-600 dark:text-amber-400" title="Set an LLM endpoint and key in Settings to enable translation">
          * Requires LLM key
        </span>
      )}
    </div>
  );
};

export default ContentLanguageSelector;
