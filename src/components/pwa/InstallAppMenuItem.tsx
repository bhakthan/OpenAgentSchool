import React, { useEffect, useState } from 'react';
import { Download, Smartphone, Check } from 'lucide-react';
import { useStandaloneMode } from '@/hooks/useStandaloneMode';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Menu item component that allows users to install the PWA
 * Shows different UI based on platform (iOS vs Android/Desktop)
 */
export function InstallAppMenuItem() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const { isIOS, isStandalone, canInstall } = useStandaloneMode();

  useEffect(() => {
    // Listen for beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setInstallSuccess(true);
      setDeferredPrompt(null);
      setTimeout(() => {
        setShowDialog(false);
        setInstallSuccess(false);
      }, 2000);
    }
  };

  const handleClick = () => {
    setShowDialog(true);
  };

  // Don't show if already installed
  if (isStandalone) {
    return null;
  }

  // Show menu item if can install OR on iOS (where manual instructions are needed)
  const shouldShow = canInstall || isIOS || deferredPrompt;
  
  if (!shouldShow) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Download className="mr-2" size={16} />
        Install App
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
