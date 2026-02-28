import { useEffect, useRef } from 'react';
import { initGA, trackPageViewEnriched, GA_MEASUREMENT_ID } from '@/lib/analytics/ga';
import { useLocation } from 'react-router-dom';

// Simple debounce to avoid duplicate rapid navigations causing multiple hits.
function useDebouncedCallback(cb: (...args: any[]) => void, delay = 250) {
  const timer = useRef<number | null>(null);
  return (...args: any[]) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => cb(...args), delay);
  };
}

/**
 * Derive a content_group and optional concept_id from the current path.
 * This powers GA4's "Content Group" dimension so you can compare
 * Concepts vs Patterns vs Study Mode vs Community in one report.
 */
function deriveContentGroup(path: string): {
  content_group: string;
  concept_id?: string;
  learning_tier?: string;
} {
  const seg = path.split('/').filter(Boolean); // e.g. ["concepts","agent-architecture"]

  // Concept pages
  if (seg[0] === 'concepts' && seg[1]) return { content_group: 'Concepts', concept_id: seg[1] };
  if (seg[0] === 'concepts') return { content_group: 'Concepts' };

  // Patterns
  if (seg[0] === 'patterns' || seg[0] === 'agent-patterns') return { content_group: 'Patterns', concept_id: seg[1] };

  // Study mode
  if (seg[0] === 'study-mode' || seg[0] === 'study') return { content_group: 'Study Mode' };

  // Quiz
  if (seg[0] === 'quiz') return { content_group: 'Quiz' };

  // Community & collaboration
  if (seg[0] === 'community' || seg[0] === 'cohorts' || seg[0] === 'pair-programming')
    return { content_group: 'Community' };

  // Auth
  if (seg[0] === 'auth') return { content_group: 'Auth' };

  // Practice
  if (seg[0] === 'sandbox' || seg[0] === 'safety-lab' || seg[0] === 'phase1-lab')
    return { content_group: 'Practice' };

  // Tools & utilities
  if (seg[0] === 'tree-view' || seg[0] === 'settings' || seg[0] === 'api-docs' || seg[0] === 'bookmarks')
    return { content_group: 'Tools' };

  // Learning resources
  if (seg[0] === 'skill-passport' || seg[0] === 'achievements' || seg[0] === 'analytics' || seg[0] === 'project-tracks')
    return { content_group: 'Progress' };

  // Marketing / landing
  if (seg[0] === 'get-started' || seg[0] === 'about' || path === '/')
    return { content_group: 'Landing' };

  return { content_group: 'Other' };
}

export function useGAPageViews() {
  const location = useLocation();
  const debounced = useDebouncedCallback((path: string) => {
    const { content_group, concept_id, learning_tier } = deriveContentGroup(path);
    trackPageViewEnriched({ path, content_group, concept_id, learning_tier });
  }, 180);

  // Init once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!GA_MEASUREMENT_ID) return; // Not configured
    initGA();
  }, []);

  // Track on route change
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    debounced(location.pathname + location.search + location.hash);
  }, [location.pathname, location.search, location.hash, debounced]);
}

export default useGAPageViews;
