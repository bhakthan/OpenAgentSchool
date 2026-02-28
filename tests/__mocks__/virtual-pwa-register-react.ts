/**
 * Mock for virtual:pwa-register/react — used in tests where the Vite PWA plugin
 * is not available.
 */
import { useState } from 'react';

export function useRegisterSW(_options?: unknown) {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);

  return {
    offlineReady: [offlineReady, setOfflineReady] as const,
    needRefresh: [needRefresh, setNeedRefresh] as const,
    updateServiceWorker: async (_reloadPage?: boolean) => {},
  };
}
