import React, { useEffect, useState } from 'react';
import ComprehensiveTreeVisualization from '@/components/visualization/ComprehensiveTreeVisualization';

export default function TreeVisualizationPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Check URL parameters for fullscreen mode
    const urlParams = new URLSearchParams(window.location.search);
    const fullscreenParam = urlParams.get('fullscreen');
    
    if (fullscreenParam === 'true') {
      setIsFullscreen(true);
      document.title = 'Open Agent School - Tree Visualization (Fullscreen)';
    }
  }, []);

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-gray-50 dark:bg-gray-900" : "min-h-screen bg-gray-50 dark:bg-gray-900"}>
      {isFullscreen && (
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => window.close()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Close Tab
          </button>
        </div>
      )}
      <ComprehensiveTreeVisualization />
    </div>
  );
}
