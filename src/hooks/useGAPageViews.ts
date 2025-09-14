import { useEffect, useRef } from 'react';
import { initGA, trackPageView, GA_MEASUREMENT_ID } from '@/lib/analytics/ga';
import { useLocation } from 'react-router-dom';

// Simple debounce to avoid duplicate rapid navigations causing multiple hits.
function useDebouncedCallback(cb: (...args: any[]) => void, delay = 250) {
  const timer = useRef<number | null>(null);
  return (...args: any[]) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => cb(...args), delay);
  };
}

export function useGAPageViews() {
  const location = useLocation();
  const debounced = useDebouncedCallback((path: string) => {
    trackPageView({ path });
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
