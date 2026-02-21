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
    
    const ctx = description || contextDescription || '';
    const basePrompt = `You are a senior AI architect mentoring a practitioner who is exploring "${title}".

${ctx ? `Context the learner is studying: ${ctx}\n` : ''}Teach this concept the way a great technical book would — start with the *why* (the problem it solves and the insight behind it), then build up the *how* (architecture, moving parts, data flow), and land on the *so what* (when you'd reach for it on a real project and when you wouldn't).

Make your explanation:
• Cloud-neutral — illustrate with examples from Azure, AWS, GCP, or open-source tooling as appropriate, so the learner can map the idea to their own stack.
• Layered — begin with an intuitive mental model, then go deeper into implementation details, trade-offs, and failure modes.
• Opinionated where it helps — share rules of thumb, common anti-patterns, and the questions an experienced engineer would ask before adopting this in production.
• Connected — show how this concept links to adjacent patterns, where it overlaps, and where it diverges.

Use diagrams in Mermaid or ASCII where they clarify architecture. Include a concise code sketch (Python or TypeScript) if it makes the concept more concrete.`;

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