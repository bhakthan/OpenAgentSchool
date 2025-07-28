// React 19 Compatibility Shim
// Fixes scheduler conflicts with older libraries

declare global {
    interface Window {
        unstable_now?: () => number;
        __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
    }
}

// Fix for React 19 scheduler compatibility issues
export function initReact19Compatibility() {
    if (typeof window === 'undefined') return;

    try {
        // 1. Fix scheduler compatibility - ensure scheduler object exists
        const scheduler = (window as any).scheduler;
        if (!scheduler) {
            (window as any).scheduler = {};
        }

        // 2. Fix unstable_now timing function
        if (!window.unstable_now && typeof performance !== 'undefined' && performance.now) {
            window.unstable_now = () => performance.now();
            
            // Also set it on the scheduler object if it exists
            if ((window as any).scheduler && !((window as any).scheduler.unstable_now)) {
                (window as any).scheduler.unstable_now = window.unstable_now;
            }
        }

        // 3. Fix MessageChannel timing issues in some older libraries
        if (!window.MessageChannel && typeof MessageChannel !== 'undefined') {
            window.MessageChannel = MessageChannel;
        }

        // 4. Ensure React DevTools compatibility
        if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
                isDisabled: false,
                supportsFiber: true,
                renderers: new Map(),
                onScheduleFiberRoot() {},
                onCommitFiberRoot() {},
                onCommitFiberUnmount() {}
            };
        }

        // 5. Fix for React 19's new concurrent features
        if (typeof (window as any).requestIdleCallback === 'undefined') {
            (window as any).requestIdleCallback = function(cb: Function) {
                const start = Date.now();
                return setTimeout(function() {
                    cb({
                        didTimeout: false,
                        timeRemaining: function() {
                            return Math.max(0, 50 - (Date.now() - start));
                        }
                    });
                }, 1);
            };
            
            (window as any).cancelIdleCallback = function(id: number) {
                clearTimeout(id);
            };
        }

        console.log('React 19 compatibility layer initialized');
    } catch (error) {
        console.warn('React 19 compatibility initialization failed:', error);
    }
}

// Call this before React renders
initReact19Compatibility();