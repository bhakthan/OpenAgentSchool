import { useState, useEffect } from 'react';

export type NetworkStatus = 'online' | 'offline' | 'slow';

export interface NetworkInfo {
  online: boolean;
  status: NetworkStatus;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export function useNetworkStatus(): NetworkInfo {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>(() => ({
    online: navigator.onLine,
    status: navigator.onLine ? 'online' : 'offline',
  }));

  useEffect(() => {
    const updateNetworkStatus = () => {
      const isOnline = navigator.onLine;
      
      // Get network connection info if available
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;

      let status: NetworkStatus = isOnline ? 'online' : 'offline';
      
      // Detect slow connection
      if (isOnline && connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          status = 'slow';
        }
      }

      setNetworkInfo({
        online: isOnline,
        status,
        effectiveType: connection?.effectiveType,
        downlink: connection?.downlink,
        rtt: connection?.rtt,
        saveData: connection?.saveData,
      });
    };

    // Initial check
    updateNetworkStatus();

    // Listen for online/offline events
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Listen for connection changes
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return networkInfo;
}

// Hook for simple online/offline state
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
