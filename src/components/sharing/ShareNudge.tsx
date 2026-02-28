/**
 * ShareNudge — Contextual sharing prompt with multiple visual variants
 *
 * Variants:
 *  - celebration  : Inline card after concept completion (Peak-End Rule)
 *  - inline-bar   : Subtle fixed-bottom bar (scroll depth / return visitor)
 *  - toast-style  : Ephemeral notification (session milestones)
 *
 * All variants are dismissible, auto-hide after timeout, and include
 * the existing ShareButton for frictionless multi-platform sharing.
 */

import React, { useEffect, useState } from 'react';
import { X, Confetti, ShareNetwork, RocketLaunch, Heart } from '@phosphor-icons/react';
import { ShareButton } from '@/components/ui/ShareButton';
import { trackEvent } from '@/lib/analytics/ga';
import type { NudgePayload } from '@/hooks/useShareNudge';
import { cn } from '@/lib/utils';

// ────────────────────────── Copywriting (behavioral framing) ─────────

const COPY: Record<string, { heading: string; body: string; cta: string }> = {
  'concept-complete': {
    heading: 'Nice work!',
    body: 'You just mastered {title}. Share it with someone building with AI.',
    cta: 'Share this concept',
  },
  'session-milestone': {
    heading: 'You\'re on a roll!',
    body: '{count} concepts explored today — share your learning journey.',
    cta: 'Share your streak',
  },
  'scroll-depth': {
    heading: 'Finding this useful?',
    body: 'Your team would benefit from this too.',
    cta: 'Share with your team',
  },
  'return-visitor': {
    heading: 'Welcome back!',
    body: 'You keep coming back — share what keeps you learning.',
    cta: 'Spread the word',
  },
};

function resolveCopy(trigger: string, payload: NudgePayload) {
  const template = COPY[trigger] || COPY['scroll-depth'];
  return {
    heading: template.heading,
    body: template.body
      .replace('{title}', payload.conceptTitle || 'this concept')
      .replace('{count}', String(payload.conceptsVisited || 3)),
    cta: template.cta,
  };
}

// ────────────────────────── Variant selector ──────────────────────────

function getVariant(trigger: string): 'celebration' | 'inline-bar' | 'toast-style' {
  switch (trigger) {
    case 'concept-complete': return 'celebration';
    case 'session-milestone': return 'toast-style';
    case 'scroll-depth':
    case 'return-visitor':
    default:
      return 'inline-bar';
  }
}

// ────────────────────────── Component ──────────────────────────

interface ShareNudgeProps {
  nudge: NudgePayload;
  onDismiss: () => void;
  onConversion: () => void;
  /** Auto-hide timeout in ms (0 = never). Default 12000 for bars, 0 for celebration */
  autoHideMs?: number;
}

const ShareNudge: React.FC<ShareNudgeProps> = ({ nudge, onDismiss, onConversion, autoHideMs }) => {
  const variant = getVariant(nudge.trigger);
  const copy = resolveCopy(nudge.trigger, nudge);
  const [isVisible, setIsVisible] = useState(false);

  // Default auto-hide based on variant
  const timeout = autoHideMs ?? (variant === 'celebration' ? 0 : 12000);

  // Animate in
  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Track impression
  useEffect(() => {
    trackEvent({
      action: 'share_nudge_shown',
      category: 'sharing',
      label: nudge.trigger,
      concept_id: nudge.conceptId,
      page_path: window.location.pathname,
    });
  }, [nudge.trigger, nudge.conceptId]);

  // Auto-hide
  useEffect(() => {
    if (timeout <= 0) return;
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation
      setTimeout(onDismiss, 300);
    }, timeout);
    return () => clearTimeout(timer);
  }, [timeout, onDismiss]);

  const handleDismiss = () => {
    trackEvent({
      action: 'share_nudge_dismissed',
      category: 'sharing',
      label: nudge.trigger,
      page_path: window.location.pathname,
    });
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  const handleShareClick = () => {
    trackEvent({
      action: 'share_nudge_clicked',
      category: 'sharing',
      label: nudge.trigger,
      concept_id: nudge.conceptId,
    });
    onConversion();
  };

  const shareUrl = nudge.conceptId
    ? `${window.location.origin}/concepts/${nudge.conceptId}`
    : window.location.href;

  const shareTitle = nudge.conceptTitle
    ? `${nudge.conceptTitle} — Open Agent School`
    : 'Open Agent School — Learn Agentic AI';

  // ─── Celebration variant (inline card after concept completion) ───
  if (variant === 'celebration') {
    return (
      <div
        className={cn(
          'mt-4 overflow-hidden rounded-lg border border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
          'transition-all duration-500 ease-out',
          isVisible
            ? 'opacity-100 max-h-40 translate-y-0'
            : 'opacity-0 max-h-0 -translate-y-2',
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <Confetti className="w-5 h-5 text-emerald-600 dark:text-emerald-400" weight="fill" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                {copy.heading}
              </p>
              <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 truncate">
                {copy.body}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div onClick={handleShareClick}>
              <ShareButton
                url={shareUrl}
                title={shareTitle}
                description={copy.body}
                variant="default"
                size="sm"
                analyticsCategory="share_nudge"
              />
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-md text-emerald-600/60 hover:text-emerald-800 dark:text-emerald-400/60 dark:hover:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
              aria-label="Dismiss share prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Toast-style variant (session milestones) ───
  if (variant === 'toast-style') {
    return (
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 max-w-sm',
          'rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 shadow-lg',
          'transition-all duration-500 ease-out',
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95',
        )}
      >
        <div className="px-4 py-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mt-0.5">
              <RocketLaunch className="w-4 h-4 text-blue-600 dark:text-blue-400" weight="fill" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {copy.heading}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                {copy.body}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div onClick={handleShareClick}>
                  <ShareButton
                    url={shareUrl}
                    title={shareTitle}
                    description={copy.body}
                    variant="outline"
                    size="sm"
                    analyticsCategory="share_nudge"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
              aria-label="Dismiss share prompt"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Inline-bar variant (scroll depth / return visitor) ───
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40',
        'border-t border-violet-200/80 dark:border-violet-800/60 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm',
        'transition-all duration-500 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-full',
      )}
    >
      <div className="container mx-auto max-w-5xl px-4 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {nudge.trigger === 'return-visitor' ? (
              <Heart className="w-4 h-4 text-violet-500 flex-shrink-0" weight="fill" />
            ) : (
              <ShareNetwork className="w-4 h-4 text-violet-500 flex-shrink-0" />
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
              <span className="font-medium">{copy.heading}</span>{' '}
              {copy.body}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div onClick={handleShareClick}>
              <ShareButton
                url={shareUrl}
                title={shareTitle}
                description={copy.body}
                variant="ghost"
                size="sm"
                iconOnly
                analyticsCategory="share_nudge"
              />
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareNudge;
