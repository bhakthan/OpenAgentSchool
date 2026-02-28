import React, { useEffect, useState, useCallback } from 'react';
import { Download, Smartphone, Check } from 'lucide-react';
import { useStandaloneMode } from '@/hooks/useStandaloneMode';
import { trackEvent } from '@/lib/analytics/ga';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// ── Lightweight local install-event ledger for admin dashboard ────────
const PWA_INSTALL_LOG_KEY = 'oas_pwa_installs';

interface PWAInstallRecord {
  timestamp: string;
  platform: 'android' | 'desktop' | 'ios' | 'unknown';
  method: 'prompt' | 'manual' | 'appinstalled';
}

function logInstallEvent(record: Omit<PWAInstallRecord, 'timestamp'>) {
  try {
    const raw = localStorage.getItem(PWA_INSTALL_LOG_KEY);
    const list: PWAInstallRecord[] = raw ? JSON.parse(raw) : [];
    list.push({ ...record, timestamp: new Date().toISOString() });
    // Keep last 200 entries max
    if (list.length > 200) list.splice(0, list.length - 200);
    localStorage.setItem(PWA_INSTALL_LOG_KEY, JSON.stringify(list));
  } catch {
    // localStorage quota / disabled – silent fail
  }
}

export function getPWAInstallLog(): PWAInstallRecord[] {
  try {
    const raw = localStorage.getItem(PWA_INSTALL_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Menu item component that allows users to install the PWA.
 * Shows platform-specific UI:
 *   - Android / Desktop Chromium → native beforeinstallprompt
 *   - iOS Safari → manual "Add to Home Screen" instructions
 *   - macOS Safari 17+ → manual "Add to Dock" instructions
 */
export function InstallAppMenuItem() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const { isIOS, isMacSafari, isStandalone, canInstall } = useStandaloneMode();

  useEffect(() => {
    // Listen for beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstall = (e: Event) => {
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
    };

    // Browser fires this once the user completes installation (all platforms)
    const handleAppInstalled = () => {
      trackEvent({
        action: 'pwa_install',
        category: 'pwa',
        label: 'appinstalled_event',
        method: 'browser',
      });
      logInstallEvent({ platform: detectPlatform(), method: 'appinstalled' });
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const detectPlatform = useCallback((): PWAInstallRecord['platform'] => {
    if (isIOS) return 'ios';
    if (/android/i.test(navigator.userAgent)) return 'android';
    return 'desktop'; // covers Windows, macOS (Chrome/Edge), Linux
  }, [isIOS]);

  /** True when the platform needs manual install instructions (no beforeinstallprompt) */
  const needsManualInstructions = isIOS || isMacSafari;

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    const platform = detectPlatform();

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      trackEvent({
        action: 'pwa_install',
        category: 'pwa',
        label: 'prompt_accepted',
        platform,
      });
      logInstallEvent({ platform, method: 'prompt' });
      setInstallSuccess(true);
      setDeferredPrompt(null);
      setTimeout(() => {
        setShowDialog(false);
        setInstallSuccess(false);
      }, 2000);
    } else {
      trackEvent({
        action: 'pwa_install_dismissed',
        category: 'pwa',
        label: 'prompt_dismissed',
        platform,
      });
    }
  };

  const handleClick = () => {
    const platform = detectPlatform();
    trackEvent({
      action: 'pwa_install_prompt_shown',
      category: 'pwa',
      label: needsManualInstructions
        ? isIOS ? 'ios_instructions' : 'macos_safari_instructions'
        : 'native_prompt_dialog',
      platform,
    });
    if (needsManualInstructions) {
      logInstallEvent({ platform: isIOS ? 'ios' : 'desktop', method: 'manual' });
    }
    setShowDialog(true);
  };

  // Don't show if already installed
  if (isStandalone) {
    return null;
  }

  // Show if: mobile/macSafari (manual install), OR Chromium desktop (deferred prompt)
  const shouldShow = canInstall || isIOS || isMacSafari || deferredPrompt;
  
  if (!shouldShow) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="group inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Install App"
        aria-label="Install Open Agent School as an app"
      >
        <Download size={18} />
      </button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {installSuccess ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  App Installed!
                </>
              ) : (
                <>
                  <Smartphone className="w-5 h-5" />
                  Install Open Agent School
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {installSuccess ? (
                'You can now access Open Agent School from your home screen!'
              ) : (
                'Get the full app experience with offline access and faster load times.'
              )}
            </DialogDescription>
          </DialogHeader>

          {!installSuccess && (
            <div className="space-y-4">
              {isIOS ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    To install on your iPhone or iPad:
                  </p>
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li>Tap the <span className="font-semibold">Share</span> button <span className="text-blue-500">⎋</span> in Safari</li>
                    <li>Scroll down and tap <span className="font-semibold">"Add to Home Screen"</span></li>
                    <li>Tap <span className="font-semibold">"Add"</span> in the top right</li>
                  </ol>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mt-3">
                    <p className="text-xs text-blue-800 dark:text-blue-300">
                      💡 <span className="font-semibold">Tip:</span> Works offline and loads faster!
                    </p>
                  </div>
                </div>
              ) : isMacSafari ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    To install on your Mac (Safari 17+):
                  </p>
                  <ol className="text-sm space-y-2 list-decimal list-inside">
                    <li>Click <span className="font-semibold">File</span> in the menu bar</li>
                    <li>Select <span className="font-semibold">"Add to Dock"</span></li>
                    <li>Click <span className="font-semibold">"Add"</span> to confirm</li>
                  </ol>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mt-3">
                    <p className="text-xs text-blue-800 dark:text-blue-300">
                      💡 <span className="font-semibold">Tip:</span> The app runs in its own window with offline support!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Benefits:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Quick access from your device</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Offline access to content</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Faster load times</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>App-like experience</span>
                      </li>
                    </ul>
                  </div>
                  <Button
                    onClick={handleInstall}
                    className="w-full"
                    disabled={!deferredPrompt}
                  >
                    <Download className="mr-2 w-4 h-4" />
                    Install Now
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
