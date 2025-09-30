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

  // Show/hide banner logic
  useEffect(() => {
    const shouldShow = (!isOnline || !backendAvailable) && !isDismissed;
    setShowBanner(shouldShow);
  }, [isOnline, backendAvailable, isDismissed]);

  if (!showBanner) return null;

  const isNetworkIssue = !isOnline;
  const isBackendIssue = isOnline && !backendAvailable;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top">
      <Alert variant="destructive" className="rounded-none border-x-0 border-t-0">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {isNetworkIssue ? (
              <WifiSlash className="w-5 h-5" weight="bold" />
            ) : (
              <CloudSlash className="w-5 h-5" weight="bold" />
            )}
            <AlertDescription className="m-0">
              {isNetworkIssue ? (
                <>
                  <strong>You're offline.</strong> Some features may not be available.
                </>
              ) : (
                <>
                  <strong>Backend unavailable.</strong> Using static fallback mode. Some features are limited.
                </>
              )}
            </AlertDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDismissed(true)}
            className="text-white hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Alert>
    </div>
  );
}
