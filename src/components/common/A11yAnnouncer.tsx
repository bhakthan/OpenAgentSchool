/**
 * ARIA live region component for announcing dynamic content changes.
 * Provides useAnnounce() hook for imperatively setting announcements.
 */
import React, { createContext, useCallback, useContext, useState } from 'react';

interface AnnounceContextValue {
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
}

const AnnounceContext = createContext<AnnounceContextValue>({
  announce: () => {},
});

export function useAnnounce() {
  return useContext(AnnounceContext);
}

export const A11yAnnouncer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');

  const announce = useCallback((message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    if (politeness === 'assertive') {
      setAssertiveMessage('');
      // Force re-render so screen readers pick up the new text
      requestAnimationFrame(() => setAssertiveMessage(message));
    } else {
      setPoliteMessage('');
      requestAnimationFrame(() => setPoliteMessage(message));
    }
  }, []);

  return (
    <AnnounceContext.Provider value={{ announce }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        role="status"
        className="sr-only"
      >
        {politeMessage}
      </div>
      <div
        aria-live="assertive"
        aria-atomic="true"
        role="alert"
        className="sr-only"
      >
        {assertiveMessage}
      </div>
    </AnnounceContext.Provider>
  );
};
