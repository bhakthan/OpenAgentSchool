/**
 * Skip to main content link — standard a11y pattern.
 * Visually hidden until focused via keyboard.
 */
import React from 'react';

export const SkipToContent: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
               focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
               focus:shadow-lg"
  >
    Skip to main content
  </a>
);
