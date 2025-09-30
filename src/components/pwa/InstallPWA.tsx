import React, { useEffect, useState } from 'react';
import { X, Download, Smartphone, Share2 } from 'lucide-react';
import { useStandaloneMode } from '@/hooks/useStandaloneMode';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPWA() {
  // DISABLED: This component is no longer used. Install functionality moved to InstallAppMenuItem in top navigation.
  return null;
}
