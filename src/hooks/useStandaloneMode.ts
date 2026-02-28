import { useEffect, useState } from 'react';

export interface StandaloneInfo {
  isStandalone: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isMacOS: boolean;
  isMacSafari: boolean;
  canInstall: boolean;
}

/**
 * Detect if app is running in standalone mode (installed PWA)
 * Covers iOS, Android, macOS (Safari "Add to Dock"), Windows, Linux
 */
export function useStandaloneMode(): StandaloneInfo {
  const [info, setInfo] = useState<StandaloneInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        isStandalone: false,
        isIOS: false,
        isAndroid: false,
        isMacOS: false,
        isMacSafari: false,
        canInstall: false
      };
    }

    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);
    const isMacOS = /Macintosh|MacIntel/.test(ua) && !isIOS;
    // Safari on macOS: no Chrome/Edg/Firefox signature
    const isMacSafari = isMacOS && /Safari/.test(ua) && !/Chrome|Chromium|Edg|Firefox|OPR/.test(ua);
    
    // Check various standalone indicators
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    return {
      isStandalone,
      isIOS,
      isAndroid,
      isMacOS,
      isMacSafari,
      // Installable on: mobile (iOS/Android), macOS Safari ("Add to Dock"),
      // or any desktop with Chromium (handled via beforeinstallprompt in component)
      canInstall: !isStandalone && (isIOS || isAndroid || isMacSafari)
    };
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setInfo(prev => ({
        ...prev,
        isStandalone: e.matches
      }));
    };

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return info;
}

/**
 * Hook to detect iOS Safari
 */
export function useIOSDetection() {
  const [isIOS, setIsIOS] = useState(false);
  const [iOSVersion, setIOSVersion] = useState<number | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua);
    setIsIOS(iOS);

    if (iOS) {
      // Try to detect iOS version
      const match = ua.match(/OS (\d+)_/);
      if (match && match[1]) {
        setIOSVersion(parseInt(match[1], 10));
      }
    }
  }, []);

  return { isIOS, iOSVersion };
}

/**
 * Hook to handle iOS-specific behaviors
 */
export function useIOSBehaviors() {
  const { isIOS, iOSVersion } = useIOSDetection();
  const { isStandalone } = useStandaloneMode();

  useEffect(() => {
    if (!isIOS) return;

    // Prevent bounce/overscroll on iOS
    document.body.style.overscrollBehavior = 'none';

    // Fix iOS viewport height issues
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    // Handle iOS Safari address bar hiding
    if (!isStandalone) {
      // Scroll to hide address bar on load
      window.scrollTo(0, 1);
    }

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, [isIOS, isStandalone]);

  return { isIOS, iOSVersion, isStandalone };
}
