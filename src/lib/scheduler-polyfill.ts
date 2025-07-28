// Scheduler Polyfill for React 19 compatibility
// This must run before any React code to prevent vendor chunk errors

(function() {
    'use strict';
    
    if (typeof window === 'undefined') return;
    
    // Create scheduler object if it doesn't exist
    if (!(window as any).scheduler) {
        (window as any).scheduler = {};
    }
    
    const scheduler = (window as any).scheduler;
    
    // Polyfill unstable_now if not present
    if (!scheduler.unstable_now) {
        if (typeof performance !== 'undefined' && performance.now) {
            scheduler.unstable_now = performance.now.bind(performance);
        } else {
            scheduler.unstable_now = Date.now;
        }
    }
    
    // Polyfill other scheduler methods that might be expected
    if (!scheduler.unstable_scheduleCallback) {
        scheduler.unstable_scheduleCallback = function(priority: any, callback: Function) {
            return setTimeout(callback, 0);
        };
    }
    
    if (!scheduler.unstable_cancelCallback) {
        scheduler.unstable_cancelCallback = function(id: any) {
            clearTimeout(id);
        };
    }
    
    if (!scheduler.unstable_shouldYield) {
        scheduler.unstable_shouldYield = function() {
            return false;
        };
    }
    
    if (!scheduler.unstable_requestPaint) {
        scheduler.unstable_requestPaint = function() {};
    }
    
    // Priority constants
    if (!scheduler.unstable_ImmediatePriority) {
        scheduler.unstable_ImmediatePriority = 1;
        scheduler.unstable_UserBlockingPriority = 2;
        scheduler.unstable_NormalPriority = 3;
        scheduler.unstable_LowPriority = 4;
        scheduler.unstable_IdlePriority = 5;
    }
    
    console.log('Scheduler polyfill initialized');
})();
