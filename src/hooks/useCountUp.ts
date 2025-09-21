import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  durationMs?: number; // total animation duration
  easing?: (t: number) => number; // easing function for progress (0-1)
  start?: number;
  onComplete?: () => void;
}

// Default easeOutCubic
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useCountUp(target: number, { durationMs = 900, easing = easeOutCubic, start = 0, onComplete }: UseCountUpOptions = {}) {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(start);
  const toRef = useRef(target);

  useEffect(() => {
    fromRef.current = value; // animate from current displayed value
    toRef.current = target;
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const progress = Math.min(1, (ts - startRef.current) / durationMs);
      const eased = easing(progress);
      const next = Math.round(fromRef.current + (toRef.current - fromRef.current) * eased);
      setValue(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (onComplete) {
        onComplete();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

export function formatNumber(n: number): string {
  if (n >= 1000) return Intl.NumberFormat(undefined, { notation: 'compact' }).format(n);
  return String(n);
}
