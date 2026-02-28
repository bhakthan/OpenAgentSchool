/**
 * useScrollDepthNudge — Fires a share nudge after user scrolls 70%+ of the page
 *
 * Uses IntersectionObserver on a sentinel div placed at ~70% of the page.
 * Integrates with ShareNudgeProvider to respect global cooldown logic.
 *
 * Usage in a concept page:
 *   const sentinelRef = useScrollDepthNudge({ conceptId: 'mcp', conceptTitle: 'MCP' });
 *   return <div> ... <div ref={sentinelRef} /> ... </div>
 */

import { useCallback, useEffect, useRef } from 'react';
import { useShareNudgeContext } from '@/components/sharing/ShareNudgeProvider';

interface ScrollDepthOptions {
  conceptId?: string;
  conceptTitle?: string;
  /** Threshold ratio (0-1) for the sentinel's intersection. Default: 0 (any visibility). */
  threshold?: number;
}

export function useScrollDepthNudge(options: ScrollDepthOptions = {}) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);
  const { requestNudge } = useShareNudgeContext();

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          requestNudge({
            trigger: 'scroll-depth',
            conceptId: options.conceptId,
            conceptTitle: options.conceptTitle,
          });
        }
      }
    },
    [requestNudge, options.conceptId, options.conceptTitle],
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: options.threshold ?? 0,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect, options.threshold]);

  return sentinelRef;
}
