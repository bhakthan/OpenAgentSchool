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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-gray-50 dark:bg-gray-900" : "min-h-screen bg-gray-50 dark:bg-gray-900"}>
      <div className="no-print">
        {isFullscreen && (
          <div className="absolute top-4 left-4 z-10 flex gap-3">
            <button
              onClick={() => window.close()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Close Tab
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Print Tree
            </button>
          </div>
        )}
        {!isFullscreen && (
          <div className="sticky top-0 z-20 flex justify-end p-4 gap-3 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Print Tree
            </button>
          </div>
        )}
      </div>
      <div className="tree-print" id="tree-root">
        <ComprehensiveTreeVisualization />
      </div>
    </div>
  );
}
