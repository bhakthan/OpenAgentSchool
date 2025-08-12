import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { VoiceInputButton } from '@/components/ui/VoiceInputButton';
import { cn } from '@/lib/utils';

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
  const handleVoiceResult = (transcript: string) => {
    // Append the voice transcript to existing text
    const newValue = value ? `${value} ${transcript}` : transcript;
    onChange(newValue);
  };

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
          className={cn("pr-16", className)}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          disabled={disabled}
        />
        <div className="absolute top-2 right-2">
          <VoiceInputButton
            onVoiceResult={handleVoiceResult}
            size="sm"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};
