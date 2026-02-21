import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { cn } from '@/lib/utils';

interface VoiceInputButtonProps {
  onVoiceResult: (transcript: string) => void;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
  /** BCP-47 locale for speech recognition (e.g. 'es-ES', 'hi-IN'). Empty string = auto-detect. Defaults to 'en-US'. */
  language?: string;
}

export const VoiceInputButton = React.forwardRef<
  HTMLButtonElement,
  VoiceInputButtonProps
>(({
  onVoiceResult,
  size = 'default',
  variant = 'outline',
  className,
  disabled = false,
  language = 'en-US'
}, ref) => {
  const {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    clearTranscript
  } = useVoiceInput({
    language,
    onResult: (finalTranscript) => {
      if (finalTranscript.trim()) {
        onVoiceResult(finalTranscript.trim());
        clearTranscript();
      }
    },
    onError: (errorMessage) => {
      // Silent error handling - errors will be shown in UI state
    }
  });

  const handleClick = () => {
    if (disabled || !isSupported) return;
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const getTooltipContent = () => {
    if (!isSupported) {
      return 'Speech recognition is not supported in this browser';
    }
    if (error) {
      return `Error: ${error}`;
    }
    if (isListening) {
      return 'Listening... Speak now! Click to stop recording.';
    }
    return 'Click to start voice input. Speak immediately after clicking.';
  };

  const getButtonIcon = () => {
    if (!isSupported || error) {
      return <AlertCircle className="h-4 w-4" />;
    }
    if (isListening) {
      return <MicOff className="h-4 w-4" />;
    }
    return <Mic className="h-4 w-4" />;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            onClick={handleClick}
            disabled={disabled || !isSupported}
            size={size}
            variant={variant}
            className={cn(
              'transition-all duration-200',
              isListening && 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200',
              (!isSupported || error) && 'opacity-50 cursor-not-allowed',
              className
            )}
          >
            {getButtonIcon()}
            {isListening && (
              <span className="ml-2 animate-pulse text-xs font-medium">
                Listening...
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipContent()}</p>
          {transcript && (
            <p className="text-xs mt-1 opacity-75">
              Current: "{transcript}"
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

VoiceInputButton.displayName = 'VoiceInputButton';
