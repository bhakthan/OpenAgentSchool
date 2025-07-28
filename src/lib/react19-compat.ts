// React 19 Compatibility - Minimal approach for modern browsers
// React 19 has built-in scheduler, so we only need minimal fixes

declare global {
    interface Window {
        __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
    }
}

// Minimal React 19 compatibility - only for edge cases
export function initReact19Compatibility() {
    if (typeof window === 'undefined') return;

    try {
        // Only ensure React DevTools compatibility for development
        if (import.meta.env.DEV && !window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
                isDisabled: false,
                supportsFiber: true,
                renderers: new Map(),
                onScheduleFiberRoot() {},
                onCommitFiberRoot() {},
                onCommitFiberUnmount() {}
            };
        }

        console.log('React 19 compatibility initialized (minimal)');
    } catch (error) {
        console.warn('React 19 compatibility initialization failed:', error);
    }
}

// Call this before React renders
initReact19Compatibility();