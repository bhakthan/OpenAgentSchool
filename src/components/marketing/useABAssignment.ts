import { useEffect } from 'react';

/**
 * Handles A/B assignment for CTA pages. Logic:
 * 1. Check query param ?variant=primary|variant – overrides & persists.
 * 2. Else read localStorage.abVariant
 * 3. If none, random 50/50 assign.
 * 4. If current path is /cta and assigned 'variant' redirect to /cta-alt.
 */
export function useCTAVariantAssigner() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    const qp = url.searchParams.get('variant');
    let source: 'query' | 'stored' | 'auto' = 'stored';
    let assigned = localStorage.getItem('abVariant') as 'primary' | 'variant' | null;
    if (qp === 'primary' || qp === 'variant') {
      assigned = qp;
      localStorage.setItem('abVariant', assigned);
      source = 'query';
    }
    if (!assigned) {
      assigned = Math.random() < 0.5 ? 'primary' : 'variant';
      localStorage.setItem('abVariant', assigned);
      source = 'auto';
    }
    // Emit event early
    try { window.dispatchEvent(new CustomEvent('analytics:abVariant', { detail: { variant: assigned, source, timestamp: Date.now() } })); } catch {}
    // Redirect if needed
    if (window.location.pathname === '/cta' && assigned === 'variant' && source !== 'query') {
      window.history.replaceState({}, '', url.pathname + url.search); // clean potential query
      window.location.replace('/cta-alt');
    }
  }, []);
}
