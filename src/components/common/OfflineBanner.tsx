/**
 * Offline Indicator Banner
 * Shows when user is offline or backend is unavailable
 */

import { useState, useEffect } from 'react';
import { WifiSlash, CloudSlash, X } from '@phosphor-icons/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { API_CONFIG } from '@/lib/api/config';

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(null);

  // Check browser online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check backend health
  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    let isMounted = true;

    const checkBackendHealth = async () => {
      // Skip if no backend configured
      if (!API_CONFIG.knowledge && !API_CONFIG.orchestrator) {
        if (isMounted) setBackendAvailable(true);
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const healthUrl = API_CONFIG.knowledge 
          ? `${API_CONFIG.knowledge}/health`
          : `${API_CONFIG.orchestrator}/health`;

        const response = await fetch(healthUrl, {
          signal: controller.signal,
          method: 'GET',
        });

        clearTimeout(timeoutId);
        if (isMounted) setBackendAvailable(response.ok);
      } catch (error) {
        if (isMounted) setBackendAvailable(false);
      }
    };

    // Initial check
    checkBackendHealth();

    // Check every 30 seconds
    const interval = setInterval(checkBackendHealth, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Reset dismissed state when connection is restored
  useEffect(() => {
    if (isOnline && backendAvailable) {
      setIsDismissed(false);
    }
  }, [isOnline, backendAvailable]);

  // Show/hide banner logic with auto-dismiss
  useEffect(() => {
    const shouldShow = (!isOnline || !backendAvailable) && !isDismissed;
    setShowBanner(shouldShow);

    // Auto-hide after 8 seconds for backend issues (less critical)
    if (shouldShow && !isOnline === false && !backendAvailable) {
      // Clear any existing timer
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
      }
      
      // Set new timer to auto-dismiss
      const timer = setTimeout(() => {
        setIsDismissed(true);
      }, 8000);
      
      setAutoHideTimer(timer);
    }

    return () => {
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
      }
    };
  }, [isOnline, backendAvailable, isDismissed]);

  if (!showBanner) return null;

  const isNetworkIssue = !isOnline;
  const isBackendIssue = isOnline && !backendAvailable;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-top-5 fade-in duration-300">
      <Alert 
        variant={isNetworkIssue ? "destructive" : "default"}
        className="shadow-lg border-l-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {isNetworkIssue ? (
              <WifiSlash className="w-5 h-5 mt-0.5 flex-shrink-0" weight="bold" />
            ) : (
              <CloudSlash className="w-5 h-5 mt-0.5 flex-shrink-0 text-yellow-600" weight="bold" />
            )}
            <AlertDescription className="m-0 text-sm">
              {isNetworkIssue ? (
                <span>
                  <strong>You're offline.</strong> Some features may not be available.
                </span>
              ) : (
                <span>
                  <strong>Backend unavailable.</strong> Using static fallback mode. Some features are limited.
                </span>
              )}
            </AlertDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDismissed(true)}
            className="h-6 w-6 flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Alert>
    </div>
  );
}
