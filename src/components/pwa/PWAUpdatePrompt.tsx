/**
 * PWA Update Prompt — Registers the service worker and shows
 * non-intrusive toasts for:
 *  • "App ready for offline use"  (offlineReady)
 *  • "New version available"       (needRefresh → click to update)
 *
 * Relies on vite-plugin-pwa virtual module (registerType: 'prompt').
 */
import { useEffect, useCallback } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function PWAUpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      // Check for updates every 60 minutes
      if (registration) {
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      }
      if (import.meta.env.DEV) {
        console.log('[PWA] SW registered:', swUrl);
      }
    },
    onRegisterError(error) {
      console.error('[PWA] SW registration error:', error);
    },
  });

  // Request persistent storage so the browser won't evict our caches
  useEffect(() => {
    async function requestPersistence() {
      if (navigator.storage?.persist) {
        const persisted = await navigator.storage.persisted();
        if (!persisted) {
          await navigator.storage.persist();
        }
      }
    }
    requestPersistence();
  }, []);

  // Auto-dismiss the "offline ready" toast after 4 seconds
  useEffect(() => {
    if (offlineReady) {
      const timer = setTimeout(() => setOfflineReady(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [offlineReady, setOfflineReady]);

  const handleUpdate = useCallback(() => {
    updateServiceWorker();
  }, [updateServiceWorker]);

  const handleDismiss = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }, [setOfflineReady, setNeedRefresh]);

  if (!offlineReady && !needRefresh) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 animate-in slide-in-from-bottom-4 fade-in duration-300"
    >
      <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/95 px-4 py-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80">
        {/* Pulse indicator */}
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
            needRefresh
              ? 'bg-emerald-500 animate-pulse'
              : 'bg-sky-500'
          }`}
        />

        <span className="text-sm font-medium text-foreground">
          {needRefresh
            ? 'New content available'
            : 'App ready for offline use'}
        </span>

        {needRefresh && (
          <button
            onClick={handleUpdate}
            className="ml-2 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Update
          </button>
        )}

        <button
          onClick={handleDismiss}
          className="ml-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Dismiss notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
