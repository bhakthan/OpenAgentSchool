// Google Analytics (GA4) lightweight runtime loader & trackers
// Dynamically injects gtag.js only if measurement ID exists at build time (Vite inlines env vars).
// Safe in SSR/test contexts (no-op), anonymizes IP by default, and debounces double inits.

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    __GA_INITIALIZED__?: boolean;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function initGA(id: string | undefined = GA_MEASUREMENT_ID) {
  if (typeof window === 'undefined') return; // SSR / build safety
  if (!id) return; // Not configured
  if (window.__GA_INITIALIZED__) return; // Already done
  if ((window as any).__VITEST_ENV__) return; // Skip tests

  // Inject script
  const existing = document.querySelector(`script[data-ga-loader='true']`);
  if (!existing) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    script.setAttribute('data-ga-loader','true');
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){(window.dataLayer as any).push(arguments);} as any;
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true, send_page_view: false }); // manual page_view
  window.__GA_INITIALIZED__ = true;
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[GA] Initialized with ID', id);
  }
}

export interface PageViewParams {
  path: string;
  title?: string;
}

export function trackPageView({ path, title }: PageViewParams) {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[GA] page_view', path);
  }
}

export interface TrackEventParams {
  action: string; // event name
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

export function trackEvent({ action, category, label, value, ...rest }: TrackEventParams) {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return;
  const params: Record<string, any> = { event_category: category, event_label: label, value, ...rest };
  Object.keys(params).forEach(k => params[k] === undefined && delete params[k]);
  window.gtag('event', action, params);
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[GA] event', action, params);
  }
}

// ─── User Properties ───────────────────────────────────────────────
// Set once per session after login. GA4 attaches these to every subsequent event.
export interface UserProperties {
  auth_method?: 'email' | 'google' | 'microsoft' | 'github';  // How they signed up
  user_tier?: 'anonymous' | 'registered' | 'admin';            // Access tier
  learning_level?: string;                                      // beginner/intermediate/advanced
  concepts_visited?: number;                                    // Lifetime engagement depth
  [key: string]: any;
}

export function setUserProperties(props: UserProperties) {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag('set', 'user_properties', props);
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[GA] user_properties', props);
  }
}

// ─── Engagement Timing ────────────────────────────────────────────
// Track how long users spend on key learning activities.
export function trackTiming(name: string, milliseconds: number, category?: string) {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag('event', 'timing_complete', {
    name,
    value: Math.round(milliseconds),
    event_category: category || 'engagement',
  });
}

// ─── Content Group / Page Metadata ────────────────────────────────
// Enrich page_view with content_group so GA4 can aggregate by section.
export function trackPageViewEnriched({
  path,
  title,
  content_group,
  concept_id,
  learning_tier,
}: {
  path: string;
  title?: string;
  content_group?: string;  // e.g. "concepts", "patterns", "study-mode", "community"
  concept_id?: string;     // e.g. "agent-architecture"
  learning_tier?: string;  // e.g. "fundamentals", "advanced"
}) {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return;
  const params: Record<string, any> = {
    page_path: path,
    page_title: title || document.title,
  };
  if (content_group) params.content_group = content_group;
  if (concept_id) params.concept_id = concept_id;
  if (learning_tier) params.learning_tier = learning_tier;
  window.gtag('event', 'page_view', params);
}

// Convenience: defensive flush (for future expansion)
export function gaReady() {
  return typeof window !== 'undefined' && !!window.gtag && !!GA_MEASUREMENT_ID;
}
