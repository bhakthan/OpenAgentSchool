/**
 * InlineMicButton – Compact mic icon for embedding inside search inputs.
 *
 * Renders as a small clickable mic icon with absolute positioning,
 * designed to sit at the right side of a search <input>.
 *
 * Props:
 *   onTranscript — called with the recognised text once speech ends
 *   className    — optional extra classes for positioning overrides
 *
 * Respects light/dark theme.  Shows a red pulse when listening.
 * Shows download progress hint when Whisper WASM model is loading.
 */

import { useEffect, useRef, useCallback } from 'react';
import { Microphone, MicrophoneStage } from '@phosphor-icons/react';
import { useVoiceInput } from '@/contexts/VoiceInputContext';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InlineMicButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export default function InlineMicButton({ onTranscript, className }: InlineMicButtonProps) {
  const voice = useVoiceInput();
  const callbackRef = useRef(onTranscript);
  callbackRef.current = onTranscript;

  // Listen for results from this inline button's activation
  // We use the context onResult system — the transcript goes to whoever is active
  useEffect(() => {
    const unsub = voice.onResult((text: string) => {
      callbackRef.current(text);
    });
    return unsub;
  }, [voice]);

  // Don't render if not supported
  if (!voice.isSupported) return null;

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (voice.isListening) {
      voice.stopVoice();
    } else {
      voice.startVoice();
    }
  }, [voice]);

  const tooltipText = voice.isListening
    ? 'Tap to stop'
    : voice.isModelLoading
      ? `Setting up voice… ${voice.modelProgress}%`
      : 'Voice search';

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={handleClick}
            className={cn(
              'absolute top-1/2 -translate-y-1/2',
              'w-7 h-7 rounded-md',
              'flex items-center justify-center',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              voice.isListening
                ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/40'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent dark:hover:bg-accent',
              className,
            )}
            aria-label={voice.isListening ? 'Stop voice input' : 'Start voice search'}
          >
            {/* Listening pulse ring */}
            {voice.isListening && (
              <span className="absolute inset-0 rounded-md bg-red-500/15 dark:bg-red-400/15 animate-pulse" />
            )}

            {voice.isListening ? (
              <MicrophoneStage className="w-4 h-4 relative z-10" weight="fill" />
            ) : voice.isModelLoading ? (
              <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <Microphone className="w-4 h-4" weight="regular" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
