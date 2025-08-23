import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChatCircleDots } from '@phosphor-icons/react';
import EnlightenMe from './EnlightenMe';
import { cn } from '@/lib/utils';
import { useSEOContext } from '@/hooks/useSEOContext';

// NOTE: "Ask AI" is an alias for "EnlightenMe Button" - this component provides AI-powered insights
// It helps users understand complex concepts through interactive AI assistance and contextual prompting

interface EnlightenMeButtonProps {
  title: string;
  conceptId?: string;
  description?: string;
  customPrompt?: string;
  contextDescription?: string;
  className?: string;
  // New: dock anywhere as a fixed FAB
  mode?: 'inline' | 'fixed';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  // New: visual sizing/styling controls for compact placements
  size?: 'xs' | 'sm' | 'md';
  visual?: 'filled' | 'outline' | 'subtle' | 'ghost';
  hideHotkeyHint?: boolean;
  iconOnly?: boolean;
}

export function EnlightenMeButton({ 
  title, 
  conceptId, 
  description, 
  customPrompt, 
  contextDescription, 
  className,
  mode = 'inline',
  position = 'bottom-right',
  size = 'sm',
  visual = 'filled',
  hideHotkeyHint = false,
  iconOnly = false,
}: EnlightenMeButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  
  // Get rich SEO context for enhanced prompts
  const seoContext = useSEOContext();

  // Rotating micro-prompts for discoverability
  const hints = [
    'Summarize this section',
    'Explain key trade-offs',
    'Give examples',
    'Show step-by-step'
  ];

  useEffect(() => {
    const id = setInterval(() => setHintIndex((i) => (i + 1) % hints.length), 6000);
    return () => clearInterval(id);
  }, []);

  // Global hotkey: Shift+E opens the assistant
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsDialogOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Create a detailed prompt based on the context description with SEO enhancement
  const createPrompt = () => {
    if (customPrompt) {
      // If there's a custom prompt and we have rich SEO context, enhance it
      return seoContext.description ? seoContext.enhancedPrompt(customPrompt, title) : customPrompt;
    }
    
    // Base prompt for non-custom prompts
    const basePrompt = `I want to understand more about "${title}" in the context of Azure AI Agents and Large Language Models.
  
Context: ${description || contextDescription || ''}

Please explain this concept in detail, covering:
1. What it is and why it's important
2. How it works and its key components
3. Real-world applications and use cases
4. Best practices when implementing it
5. How it relates to other agent patterns or concepts`;

    // Use SEO context to enhance the prompt if available
    return seoContext.description ? seoContext.enhancedPrompt(basePrompt, title) : basePrompt;
  };
  
  const defaultPrompt = createPrompt();

  // Fixed dock position classes
  const dockClass = (() => {
    switch (position) {
      case 'bottom-left': return 'fixed bottom-6 left-6 z-50';
      case 'top-right': return 'fixed top-6 right-6 z-50';
      case 'top-left': return 'fixed top-6 left-6 z-50';
      case 'bottom-right':
      default: return 'fixed bottom-6 right-6 z-50';
    }
  })();

  return (
    <>
      <div className={cn(mode === 'fixed' ? dockClass : 'relative', className)}>
        <Button
          variant={visual === 'filled' ? 'default' : visual === 'outline' ? 'outline' : visual === 'ghost' ? 'ghost' : 'ghost'}
          size={size === 'xs' ? 'sm' : 'sm'}
          className={cn(
            'rounded-full shadow-sm transition-transform hover:scale-[1.02] min-w-max',
            size === 'xs' ? 'h-7 px-2 text-xs' : '',
            size === 'sm' ? 'h-8 px-3 text-sm' : '',
            size === 'md' ? 'h-10 px-3 text-sm' : '',
            visual === 'subtle' ? 'border border-border/50 bg-transparent hover:bg-muted/50' : '',
            // Keep inline positioning stable to avoid wrapping
            mode === 'inline' ? 'static' : ''
          )}
          onClick={() => setIsDialogOpen(true)}
          aria-label={`Ask AI about ${title}`}
          title={`Ask AI – ${hints[hintIndex]}`}
        >
          <ChatCircleDots size={size === 'xs' ? 14 : 18} className={iconOnly ? '' : 'mr-2'} />
          {!iconOnly && <span className={cn(size === 'xs' ? 'text-xs' : 'text-sm')}>Ask AI</span>}
          {!hideHotkeyHint && !iconOnly && (
            <span className="ml-2 hidden md:inline text-[10px] opacity-70 border border-white/30 rounded px-1 py-0.5">Shift+E</span>
          )}
        </Button>
      </div>

      <EnlightenMe 
        title={title}
        defaultPrompt={defaultPrompt}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}

export default EnlightenMeButton;