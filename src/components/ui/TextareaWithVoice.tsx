import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { VoiceInputButton } from '@/components/ui/VoiceInputButton';
import { cn } from '@/lib/utils';
import { LANGUAGES, getLocaleFor, type LanguageCode } from '@/lib/languages';
import { GlobeHemisphereWest } from '@phosphor-icons/react';

const VOICE_LANG_KEY = 'oas.voice.inputLang';

interface TextareaWithVoiceProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  disabled?: boolean;
  label?: string;
  description?: string;
}

export const TextareaWithVoice: React.FC<TextareaWithVoiceProps> = ({
  value,
  onChange,
  placeholder = "Type your response here...",
  className,
  rows = 10,
  disabled = false,
  label,
  description
}) => {
  // ── Voice language state ─────────────────────────────────────────
  const [voiceLang, setVoiceLang] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(VOICE_LANG_KEY);
      if (saved && LANGUAGES.some(l => l.code === saved)) return saved as LanguageCode;
    } catch { /* ignore */ }
    return 'en';
  });
  const [showLangPicker, setShowLangPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Persist selection
  useEffect(() => {
    try { localStorage.setItem(VOICE_LANG_KEY, voiceLang); } catch { /* ignore */ }
  }, [voiceLang]);

  // Close picker on outside click
  useEffect(() => {
    if (!showLangPicker) return;
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setShowLangPicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showLangPicker]);

  const handleVoiceResult = (transcript: string) => {
    // Append the voice transcript to existing text
    const newValue = value ? `${value} ${transcript}` : transcript;
    onChange(newValue);
  };

  const currentLabel = LANGUAGES.find(l => l.code === voiceLang)?.label ?? 'English';
  const locale = getLocaleFor(voiceLang);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      <div className="relative">
        <Textarea
          className={cn("pr-24", className)}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          disabled={disabled}
        />
        {/* Mic + language selector cluster */}
        <div className="absolute top-2 right-2 flex items-center gap-1" ref={pickerRef}>
          {/* Compact language badge */}
          <button
            type="button"
            onClick={() => setShowLangPicker(prev => !prev)}
            className={cn(
              "flex items-center gap-1 px-1.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wide",
              "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground",
              "border border-transparent hover:border-border transition-colors",
              showLangPicker && "border-primary/40 bg-primary/5 text-primary"
            )}
            title={`Voice language: ${currentLabel} — click to change`}
          >
            <GlobeHemisphereWest size={12} weight="bold" />
            {voiceLang.toUpperCase()}
          </button>

          <VoiceInputButton
            onVoiceResult={handleVoiceResult}
            size="sm"
            disabled={disabled}
            language={locale}
          />

          {/* Language picker dropdown */}
          {showLangPicker && (
            <div className="absolute top-full right-0 mt-1 w-48 max-h-64 overflow-y-auto rounded-lg border bg-popover shadow-lg z-50">
              <div className="p-1.5">
                <p className="text-[10px] text-muted-foreground px-2 py-1 font-medium">Voice input language</p>
                {[...LANGUAGES].sort((a, b) => a.label.localeCompare(b.label)).map(lang => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => { setVoiceLang(lang.code); setShowLangPicker(false); }}
                    className={cn(
                      "w-full text-left px-2 py-1.5 rounded-md text-xs flex items-center justify-between",
                      "hover:bg-accent hover:text-accent-foreground transition-colors",
                      lang.code === voiceLang && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <span>{lang.label}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
