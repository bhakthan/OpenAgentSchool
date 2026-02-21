/**
 * VoiceFAB – Global floating action button for voice input.
 *
 * Always visible (when supported) at the bottom-right of the viewport.
 * Stacks below the existing FloatingContextualHelp (bottom-24) and above
 * any bottom nav.
 *
 * States:
 *   idle        → mic icon, subtle hover animation
 *   listening   → pulsing red ring, live transcript bubble
 *   loading     → progress ring during Whisper WASM model download
 *   result      → brief "Opening {concept}…" then navigate
 *   collapsed   → tiny dot (user dismissed)
 *
 * Respects light/dark theme via Tailwind dark: variants.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Microphone, MicrophoneStage, X, GlobeSimple } from '@phosphor-icons/react';
import { useVoiceInput } from '@/contexts/VoiceInputContext';
import { matchVoiceQuery } from '@/lib/voiceNavigation';
import { callLlm } from '@/lib/llm';
import { getFirstAvailableProvider } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const LS_COLLAPSED_KEY = 'oas.voice.fab.collapsed';
const LS_ONBOARDED_KEY = 'oas.voice.onboarded';

export default function VoiceFAB() {
  const navigate = useNavigate();
  const location = useLocation();
  const voice = useVoiceInput();

  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(LS_COLLAPSED_KEY) === '1'; } catch { return false; }
  });
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const onboardingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Don't render if voice not supported
  if (!voice.isSupported) return null;

  // ── Onboarding tooltip (first visit) ───────────────────────────────────

  useEffect(() => {
    try {
      if (localStorage.getItem(LS_ONBOARDED_KEY) !== '1' && !collapsed) {
        // Small delay so page renders first
        const t = setTimeout(() => setShowOnboarding(true), 2000);
        onboardingTimerRef.current = t;
        // Auto-dismiss after 6 seconds
        const t2 = setTimeout(() => {
          setShowOnboarding(false);
          try { localStorage.setItem(LS_ONBOARDED_KEY, '1'); } catch {}
        }, 8000);
        return () => { clearTimeout(t); clearTimeout(t2); };
      }
    } catch {}
  }, [collapsed]);

  // ── Listen for final transcript ────────────────────────────────────────

  useEffect(() => {
    const unsub = voice.onResult(async (text: string) => {
      if (!text.trim()) return;
      setIsProcessing(true);

      try {
        let queryText = text;

        // If non-English, translate to English for matching
        if (voice.language !== 'en') {
          try {
            const result = await callLlm(
              `Translate the following text to English. Return ONLY the translation, nothing else.\n\nText: ${text}`,
              getFirstAvailableProvider() as any,
            );
            if (result.content) queryText = result.content.trim();
          } catch {
            // If translation fails, try matching with original text
          }
        }

        const match = matchVoiceQuery(queryText);

        if (match) {
          setResultMessage(`Opening ${match.title}…`);
          setTimeout(() => {
            navigate(match.path);
            setResultMessage(null);
            setIsProcessing(false);
          }, 800);
        } else {
          // Fallback: navigate to concepts with search pre-filled
          setResultMessage(`Searching for "${text.slice(0, 40)}"…`);
          setTimeout(() => {
            navigate(`/concepts?q=${encodeURIComponent(text)}`);
            setResultMessage(null);
            setIsProcessing(false);
          }, 800);
        }
      } catch {
        setIsProcessing(false);
      }
    });

    return unsub;
  }, [voice, navigate]);

  // ── Handlers ───────────────────────────────────────────────────────────

  const handleClick = useCallback(() => {
    if (collapsed) {
      setCollapsed(false);
      try { localStorage.removeItem(LS_COLLAPSED_KEY); } catch {}
      return;
    }

    if (showOnboarding) {
      setShowOnboarding(false);
      try { localStorage.setItem(LS_ONBOARDED_KEY, '1'); } catch {}
    }

    if (voice.isListening) {
      voice.stopVoice();
    } else {
      setResultMessage(null);
      voice.startVoice();
    }
  }, [collapsed, voice, showOnboarding]);

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsed(true);
    try { localStorage.setItem(LS_COLLAPSED_KEY, '1'); } catch {}
    if (voice.isListening) voice.stopVoice();
  }, [voice]);

  // ── Collapsed state — tiny indicator dot ───────────────────────────────

  if (collapsed) {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'w-8 h-8 rounded-full',
          'bg-primary/80 dark:bg-primary/60',
          'hover:bg-primary dark:hover:bg-primary/80',
          'flex items-center justify-center',
          'shadow-lg backdrop-blur-sm',
          'transition-all duration-200',
          'border border-border/30',
        )}
        aria-label="Expand voice input"
      >
        <Microphone className="w-4 h-4 text-primary-foreground" weight="bold" />
      </button>
    );
  }

  // ── Progress ring for Whisper download ─────────────────────────────────

  const progressRing = voice.isModelLoading && (
    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
      <circle
        cx="24" cy="24" r="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-muted-foreground/20"
      />
      <circle
        cx="24" cy="24" r="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray={`${2 * Math.PI * 21}`}
        strokeDashoffset={`${2 * Math.PI * 21 * (1 - voice.modelProgress / 100)}`}
        strokeLinecap="round"
        className="text-primary transition-[stroke-dashoffset] duration-300"
      />
    </svg>
  );

  // ── Listening pulse animation ──────────────────────────────────────────

  const listeningPulse = voice.isListening && (
    <>
      <span className="absolute inset-0 rounded-full bg-red-500/30 dark:bg-red-400/25 animate-ping" />
      <span className="absolute inset-[-4px] rounded-full border-2 border-red-400/50 dark:border-red-400/40 animate-pulse" />
    </>
  );

  // ── Transcript bubble ──────────────────────────────────────────────────

  const showBubble = voice.isListening || resultMessage || voice.isModelLoading;
  const bubbleText = resultMessage
    ?? (voice.isModelLoading
      ? `Setting up voice (one-time)… ${voice.modelProgress}%`
      : voice.transcript || 'Listening…');

  // ── Language badge ─────────────────────────────────────────────────────

  const langBadge = voice.language !== 'en' && (
    <span className={cn(
      'absolute -top-1 -left-1 z-10',
      'px-1 py-0.5 text-[9px] font-semibold uppercase leading-none rounded',
      'bg-secondary text-secondary-foreground',
      'border border-border shadow-sm',
    )}>
      {voice.language}
    </span>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <div className="fixed bottom-14 right-6 z-50 flex flex-col items-end gap-2">
        {/* Transcript / status bubble */}
        {showBubble && (
          <div
            className={cn(
              'max-w-56 px-3 py-2 rounded-xl text-xs leading-snug',
              'bg-popover text-popover-foreground',
              'shadow-lg border border-border',
              'animate-in fade-in-0 slide-in-from-bottom-2 duration-200',
            )}
            aria-live="polite"
          >
            {bubbleText}
          </div>
        )}

        {/* Onboarding tooltip */}
        {showOnboarding && !voice.isListening && (
          <div
            className={cn(
              'max-w-60 px-3 py-2 rounded-xl text-xs leading-snug',
              'bg-primary text-primary-foreground',
              'shadow-lg',
              'animate-in fade-in-0 slide-in-from-bottom-2 duration-300',
            )}
          >
            <span className="font-medium">Try voice:</span> "What is prompt chaining?" — works in 29 languages!
          </div>
        )}

        {/* FAB button */}
        <div className="relative">
          {langBadge}
          {progressRing}
          {listeningPulse}

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleClick}
                disabled={isProcessing}
                className={cn(
                  'relative w-12 h-12 rounded-full',
                  'flex items-center justify-center',
                  'shadow-lg',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  voice.isListening
                    ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white'
                    : isProcessing
                      ? 'bg-muted text-muted-foreground cursor-wait'
                      : 'bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-foreground',
                )}
                aria-label={voice.isListening ? 'Stop listening' : 'Ask by voice'}
              >
                {voice.isListening ? (
                  <MicrophoneStage className="w-5 h-5" weight="fill" />
                ) : voice.isModelLoading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <Microphone className="w-5 h-5" weight="bold" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-xs">
              {voice.isListening
                ? 'Tap to stop'
                : voice.engine === 'whisper-wasm'
                  ? 'Ask by voice (in-browser Whisper)'
                  : 'Ask by voice'}
            </TooltipContent>
          </Tooltip>

          {/* Dismiss button */}
          {!voice.isListening && !isProcessing && (
            <button
              onClick={handleDismiss}
              className={cn(
                'absolute -top-1 -right-1 w-5 h-5 rounded-full',
                'bg-muted hover:bg-destructive/20 dark:bg-muted dark:hover:bg-destructive/20',
                'text-muted-foreground hover:text-destructive',
                'flex items-center justify-center',
                'opacity-0 group-hover:opacity-100 transition-opacity',
                'border border-border shadow-sm',
              )}
              aria-label="Dismiss voice button"
            >
              <X className="w-3 h-3" weight="bold" />
            </button>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
