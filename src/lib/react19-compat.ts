// React 19 Compatability Shim
// Fixes scheduler conflicts with older libraries

declare global {
    interface Window {
        unstable_now?: () => number;
    }
}

// Fix for React 19 scheduler compatibility issues
export function initReact19Compatibility() {
    // Ensure scheduler compatibility
    if (typeof window !== 'undefined') {
        //React 19 uses performance.now() internally, but some libraries expect unstable_now
        if (!window.unstable_now && typeof performance !== 'undefined' && performance.now) {
            window.unstable_now = () => performance.now();
        } 

        // Fix for MessageChannel timing issues in some older libraries
        if (!window.MessageChannel && typeof MessageChannel !== 'undefined') {
            window.MessageChannel = MessageChannel;
        }
    }

}

// Call this before React renders
initReact19Compatibility();