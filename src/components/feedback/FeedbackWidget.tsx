/**
 * FeedbackWidget — unobtrusive floating feedback button + popover.
 *
 * Renders a small FAB in the bottom-right corner (only when authenticated).
 * On click, opens a Radix Popover with category pills, a 500-char textarea,
 * and a submit button. Sanitises content client-side before POSTing.
 */

import React, { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import * as Popover from '@radix-ui/react-popover';
import { ChatDots, X, PaperPlaneTilt } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth/AuthContext';
import { submitFeedback, sanitiseInput } from '@/lib/api/feedback';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MAX_CHARS = 500;

const CATEGORIES = [
  { value: 'bug' as const, label: '🐛 Bug', },
  { value: 'idea' as const, label: '💡 Idea', },
  { value: 'praise' as const, label: '🙌 Praise', },
] as const;

type Category = 'bug' | 'idea' | 'praise' | 'other' | undefined;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function FeedbackWidget() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>(undefined);
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Thank you for your feedback! We really appreciate it.');
      setTimeout(() => {
        setOpen(false);
        setContent('');
        setCategory(undefined);
        setSubmitted(false);
      }, 2000);
    },
    onError: () => {
      toast.error('Failed to send feedback. Please try again.');
    },
  });

  const handleSubmit = useCallback(() => {
    const cleaned = sanitiseInput(content);
    if (!cleaned) {
      toast.error('Please enter some feedback text.');
      return;
    }
    mutation.mutate({
      content: cleaned,
      page_url: location.pathname + location.search,
      category: category,
    });
  }, [content, category, location, mutation]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      // Reset after close
      setTimeout(() => {
        setContent('');
        setCategory(undefined);
        setSubmitted(false);
      }, 200);
    }
  }, []);

  // Only show when logged in
  if (!isAuthenticated) return null;

  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHARS;
  const canSubmit = content.trim().length > 0 && !isOverLimit && !mutation.isPending;

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          className="fixed bottom-20 right-4 z-50 flex h-11 w-11 items-center justify-center
                     rounded-full bg-primary text-primary-foreground shadow-lg
                     hover:bg-primary/90 hover:scale-105
                     transition-all duration-200 focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Send feedback"
          title="Send feedback"
        >
          <ChatDots size={22} weight="fill" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50 w-80 rounded-lg border border-border bg-popover text-popover-foreground
                     shadow-xl animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2"
          sideOffset={12}
          align="end"
          side="top"
        >
          {submitted ? (
            /* ── Thank-you state ─────────────────────────────── */
            <div className="flex flex-col items-center justify-center py-8 px-4 gap-2">
              <span className="text-3xl">🎉</span>
              <p className="text-sm font-medium text-foreground">Thank you!</p>
              <p className="text-xs text-muted-foreground text-center">
                Your feedback helps us improve Open Agent School.
              </p>
            </div>
          ) : (
            /* ── Form state ──────────────────────────────────── */
            <div className="p-4 space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Send Feedback
                </h3>
                <Popover.Close asChild>
                  <button
                    className="h-6 w-6 inline-flex items-center justify-center rounded
                               text-muted-foreground hover:text-foreground hover:bg-accent
                               transition-colors"
                    aria-label="Close"
                  >
                    <X size={14} />
                  </button>
                </Popover.Close>
              </div>

              {/* Category pills */}
              <div className="flex gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() =>
                      setCategory((prev) => (prev === cat.value ? undefined : cat.value))
                    }
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors
                      ${
                        category === cat.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent text-accent-foreground hover:bg-accent/80'
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <div className="relative">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind? Bugs, ideas, or just a kind word…"
                  className="min-h-[100px] resize-none text-sm"
                  maxLength={MAX_CHARS + 50} // small buffer; we enforce visually
                />
                <span
                  className={`absolute bottom-2 right-2 text-[11px] ${
                    isOverLimit ? 'text-destructive font-medium' : 'text-muted-foreground/60'
                  }`}
                >
                  {charCount}/{MAX_CHARS}
                </span>
              </div>

              {/* Submit */}
              <Button
                size="sm"
                className="w-full gap-1.5"
                disabled={!canSubmit}
                onClick={handleSubmit}
              >
                {mutation.isPending ? (
                  <>Sending…</>
                ) : (
                  <>
                    <PaperPlaneTilt size={14} weight="fill" />
                    Send Feedback
                  </>
                )}
              </Button>

              {/* Fine print */}
              <p className="text-[10px] text-muted-foreground/50 text-center">
                Feedback is reviewed by the team. No personal data is shared.
              </p>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default FeedbackWidget;
