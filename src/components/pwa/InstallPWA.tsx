import React, { useEffect, useState } from 'react';
import { X, Download, Smartphone, Share2 } from 'lucide-react';
import { useStandaloneMode } from '@/hooks/useStandaloneMode';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const { isIOS, isAndroid, isStandalone, canInstall } = useStandaloneMode();

  useEffect(() => {
    // Don't show if already installed
    if (isStandalone) {
      return;
    }

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      
      // Show prompt after a short delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Check if user dismissed the prompt before
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) {
      // Don't show for 7 days after dismissal
      return;
    }

    // Show iOS prompt after delay if on iOS and not installed
    if (isIOS && canInstall) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, [isIOS, canInstall, isStandalone]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 z-50 animate-slide-up">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Smartphone className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Install App</h3>
                <p className="text-sm opacity-90">Get the full experience</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Dismiss install prompt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {isIOS ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Install this app on your iPhone:
              </p>
              <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-decimal list-inside">
                <li>Tap the <span className="font-semibold">Share</span> button</li>
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
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Add Open Agent School to your home screen for:
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1.5">
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
              <button
                onClick={handleInstall}
                className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Install Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
