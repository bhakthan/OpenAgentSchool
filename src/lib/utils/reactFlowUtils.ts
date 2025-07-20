/**
 * Utility functions for ReactFlow
 */
import React from 'react';
import { Instance as ReactFlowInstance } from 'reactflow';

/**
 * Setup error handling for ReactFlow
 */
export function setupReactFlowErrorHandling() {
  // Override console.error to suppress ReactFlow errors
  const originalConsoleError = console.error;
  console.error = function(...args: any[]) {
    if (
      typeof args[0] === 'string' && 
      (
        args[0].includes('ReactFlow') || 
        args[0].includes('Invalid hook call') ||
        args[0].includes('Uncaught Error') ||
        args[0].includes('ResizeObserver')
      )
    ) {
      // Log warning instead of error for better user experience
      console.warn('[ReactFlow Warning]', args[0]);
      return;
    }
    
    // Pass through all other errors
    return originalConsoleError.apply(console, args);
  };
  
  // Add error handler for ReactFlow errors
  window.addEventListener('error', function(e) {
    if (e && e.message && (
      e.message.includes('Invalid hook call') || 
      e.message.includes('can only be called inside the body of a function component')
    )) {
      // Log info about the error and prevent it from propagating
      console.warn(
        '[ReactFlow Hook Warning] An invalid hook call was detected. ' + 
        'This is likely because ReactFlow hooks are being used outside of a ReactFlowProvider. ' +
        'Ensure all components using ReactFlow hooks are wrapped with ReactFlowProvider.'
      );
      
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);
  
  // Return cleanup function
  return () => {
    console.error = originalConsoleError;
  };
}

/**
 * Fix ReactFlow rendering issues
 * @param containerRef Reference to the ReactFlow container element
 */
export function fixReactFlowRendering(containerRef: React.RefObject<HTMLDivElement>) {
  if (!containerRef.current) return;
  
  // Force recalculation of layout
  setTimeout(() => {
    if (containerRef.current) {
      // Force hardware acceleration
      containerRef.current.style.transform = 'translateZ(0)';
      containerRef.current.style.backfaceVisibility = 'hidden';
      containerRef.current.style.webkitBackfaceVisibility = 'hidden';
      
      // Apply force reflow
      void containerRef.current.offsetHeight;
      
      // Ensure height is set
      const parent = containerRef.current.parentElement;
      if (parent && parent.offsetHeight > 10 && containerRef.current.offsetHeight < 10) {
        containerRef.current.style.height = `${parent.offsetHeight}px`;
      }
      
      // Dispatch resize event to trigger ReactFlow recalculation
      window.dispatchEvent(new Event('resize'));
    }
  }, 100);
}

/**
 * Force all nodes to be visible in ReactFlow
 */
export function forceNodesVisible() {
  // Find all nodes in the document
  const nodes = document.querySelectorAll('.react-flow__node');
  nodes.forEach(node => {
    if (node instanceof HTMLElement) {
      node.style.visibility = 'visible';
      node.style.opacity = '1';
      node.style.display = 'block';
    }
  });
  
  // Find all edges
  const edges = document.querySelectorAll('.react-flow__edge');
  edges.forEach(edge => {
    if (edge instanceof HTMLElement) {
      edge.style.visibility = 'visible';
      edge.style.opacity = '1';
    }
    
    // Find paths inside edges
    const paths = edge.querySelectorAll('path');
    paths.forEach(path => {
      path.setAttribute('stroke-opacity', '1');
      path.setAttribute('visibility', 'visible');
    });
  });
}

/**
 * Reset the ReactFlow rendering to fix common issues
 * @param containerRef Reference to the container element
 */
export function resetReactFlowRendering(containerRef: React.RefObject<HTMLDivElement>) {
  if (!containerRef.current) return;
  
  // Force re-render ReactFlow with a size change
  setTimeout(() => {
    if (!containerRef.current) return;
    
    // Capture current scroll position to restore it after manipulation
    const scrollLeft = containerRef.current.scrollLeft;
    const scrollTop = containerRef.current.scrollTop;
    
    // First set explicit height and width to prevent layout collapse
    const height = containerRef.current.offsetHeight;
    const width = containerRef.current.offsetWidth;
    containerRef.current.style.height = `${height}px`;
    containerRef.current.style.width = `${width}px`;
    
    // Trigger reflow
    const displayStyle = containerRef.current.style.display;
    containerRef.current.style.display = 'none';
    void containerRef.current.offsetHeight; // Force reflow
    containerRef.current.style.display = displayStyle;
    
    // Force hardware acceleration for better rendering
    containerRef.current.style.transform = 'translateZ(0)';
    containerRef.current.style.webkitBackfaceVisibility = 'hidden';
    containerRef.current.style.perspective = '1000';
    
    // Find ReactFlow components and ensure they're visible
    const reactFlowElements = containerRef.current.querySelectorAll('.react-flow__node, .react-flow__edge');
    reactFlowElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.transform = 'translateZ(0)';
      }
    });
    
    // Restore scroll position
    containerRef.current.scrollLeft = scrollLeft;
    containerRef.current.scrollTop = scrollTop;
    
    // Fix edge paths visibility
    const paths = containerRef.current.querySelectorAll('.react-flow__edge-path');
    paths.forEach((path) => {
      if (path instanceof SVGElement) {
        path.style.strokeWidth = '1.5px';
        path.style.opacity = '1';
      }
    });
  }, 100);
}

export default {
  setupReactFlowErrorHandling,
  fixReactFlowRendering,
  forceNodesVisible,
  resetReactFlowRendering
};