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

// Convenience: defensive flush (for future expansion)
export function gaReady() {
  return typeof window !== 'undefined' && !!window.gtag && !!GA_MEASUREMENT_ID;
}
