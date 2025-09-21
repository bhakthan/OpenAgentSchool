import { useEffect } from 'react';
import { gaReady, trackEvent } from './ga';

// Optional: allow a custom dimension index for variant (e.g. dimension1)
// Provide via Vite env: VITE_GA_VARIANT_DIMENSION=dimension1
const VARIANT_DIMENSION_KEY = import.meta.env.VITE_GA_VARIANT_DIMENSION as string | undefined;

// We keep last known variant in memory to attach to subsequent CTA clicks
let currentVariant: 'primary' | 'variant' | undefined;

function sendVariantDimension(variant: 'primary' | 'variant', source: string) {
  if (!gaReady()) return;
  // Set as user property style via event (GA4 doesn't have classic set for custom dims like UA)
  // Approach: send a dedicated event and attach to later interactions manually.
  trackEvent({
    action: 'ab_variant_assigned',
    category: 'ab_testing',
    variant,
    assignment_source: source,
    ...(VARIANT_DIMENSION_KEY ? { [VARIANT_DIMENSION_KEY]: variant } : {})
  });
}

export function useAnalyticsCustomEventBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onVariant = (e: Event) => {
      const detail = (e as CustomEvent<{ variant: 'primary' | 'variant'; source: string }>).detail;
      if (!detail) return;
      currentVariant = detail.variant;
      sendVariantDimension(detail.variant, detail.source);
    };
    const onCTAClick = (e: Event) => {
      const detail = (e as CustomEvent<{ tier: string; source: string }>).detail;
      if (!detail) return;
      trackEvent({
        action: 'cta_click',
        category: 'engagement',
        tier: detail.tier,
        source: detail.source,
        variant: currentVariant,
        ...(VARIANT_DIMENSION_KEY && currentVariant ? { [VARIANT_DIMENSION_KEY]: currentVariant } : {})
      });
    };
    const onCohortFormOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ source: string; ts: number }>).detail;
      if (!detail) return;
      trackEvent({
        action: 'cohort_form_open',
        category: 'lead',
        source: detail.source,
        opened_at: detail.ts,
        variant: currentVariant,
        ...(VARIANT_DIMENSION_KEY && currentVariant ? { [VARIANT_DIMENSION_KEY]: currentVariant } : {})
      });
    };
    window.addEventListener('analytics:abVariant', onVariant as EventListener);
    window.addEventListener('analytics:ctaClick', onCTAClick as EventListener);
    window.addEventListener('analytics:cohortFormOpen', onCohortFormOpen as EventListener);
    return () => {
      window.removeEventListener('analytics:abVariant', onVariant as EventListener);
      window.removeEventListener('analytics:ctaClick', onCTAClick as EventListener);
      window.removeEventListener('analytics:cohortFormOpen', onCohortFormOpen as EventListener);
    };
  }, []);
}
