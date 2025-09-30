import { useEffect, useRef, useState } from 'react';

interface PullToRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number; // Pixels to pull before triggering refresh
  resistance?: number; // How much to resist the pull (1-3)
  enabled?: boolean;
}

/**
 * Pull-to-Refresh Hook
 * Implements pull-to-refresh gesture for mobile devices
 * 
 * @example
 * ```tsx
 * const { isPulling, pullDistance } = usePullToRefresh({
 *   onRefresh: async () => {
 *     await refetchData();
 *   },
 *   enabled: isStandalone && !isLoading
 * });
 * ```
 */
export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  resistance = 2.5,
  enabled = true
}: PullToRefreshOptions) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger if at top of page
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) return;
      
      // Only trigger on body/main content, not on fixed elements
      const target = e.target as HTMLElement;
      if (target.closest('[data-no-pull-refresh]')) return;

      startY.current = e.touches[0].clientY;
      containerRef.current = document.body;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || isRefreshing) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        setIsPulling(false);
        setPullDistance(0);
        return;
      }

      currentY.current = e.touches[0].clientY;
      const delta = currentY.current - startY.current;

      // Only allow pulling down
      if (delta > 0) {
        setIsPulling(true);
        
        // Apply resistance to make it feel natural
        const resistedDistance = Math.min(delta / resistance, threshold * 1.5);
        setPullDistance(resistedDistance);

        // Prevent default scroll behavior when pulling
        if (resistedDistance > 10) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = async () => {
      if (!isPulling || isRefreshing) return;

      if (pullDistance >= threshold) {
        setIsRefreshing(true);
        
        try {
          await onRefresh();
        } catch (error) {
          console.error('Pull-to-refresh error:', error);
        } finally {
          setIsRefreshing(false);
          setIsPulling(false);
          setPullDistance(0);
        }
      } else {
        // Didn't pull far enough, reset
        setIsPulling(false);
        setPullDistance(0);
      }

      containerRef.current = null;
    };

    // Add event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, isPulling, isRefreshing, pullDistance, threshold, resistance, onRefresh]);

  return {
    isPulling,
    isRefreshing,
    pullDistance,
    pullProgress: Math.min(pullDistance / threshold, 1), // 0-1
  };
}

/**
 * Pull-to-Refresh Indicator Component Helper
 * Returns inline styles for the refresh indicator
 */
export function getPullToRefreshStyles(pullDistance: number) {
  return {
    transform: `translateY(${Math.min(pullDistance, 100)}px)`,
    transition: pullDistance === 0 ? 'transform 0.3s ease-out' : 'none',
    opacity: Math.min(pullDistance / 80, 1),
  };
}
