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
}

export const VoiceInputButton = React.forwardRef<
  HTMLButtonElement,
  VoiceInputButtonProps
>(({
  onVoiceResult,
  size = 'default',
  variant = 'outline',
  className,
  disabled = false
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
    onResult: (finalTranscript) => {
      if (finalTranscript.trim()) {
        onVoiceResult(finalTranscript.trim());
        clearTranscript();
      }
    },
    onError: (errorMessage) => {
      console.error('Voice input error:', errorMessage);
    }
  });

  const handleClick = () => {
    console.log('🎤 Voice button clicked', { disabled, isSupported, isListening });
    if (disabled || !isSupported) {
      console.log('🎤 Button click ignored - disabled or not supported');
      return;
    }
    
    if (isListening) {
      console.log('🎤 Stopping listening...');
      stopListening();
    } else {
      console.log('🎤 Starting listening...');
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
      return 'Click to stop recording. Speak now...';
    }
    return 'Click to start voice input';
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
              <span className="ml-2 animate-pulse text-xs">
                Recording...
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
