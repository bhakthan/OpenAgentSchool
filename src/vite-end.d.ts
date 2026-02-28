/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/client" />
declare const GITHUB_RUNTIME_PERMANENT_NAME: string
declare const BASE_KV_SERVICE_URL: string
declare const __SCHEDULER_POLYFILL__: string

// React 19 scheduler compatibility
declare global {
  interface Window {
    scheduler?: {
      unstable_now?: () => number;
      unstable_scheduleCallback?: (priority: any, callback: Function) => any;
      unstable_cancelCallback?: (id: any) => void;
      unstable_shouldYield?: () => boolean;
      unstable_requestPaint?: () => void;
      unstable_ImmediatePriority?: number;
      unstable_UserBlockingPriority?: number;
      unstable_NormalPriority?: number;
      unstable_LowPriority?: number;
      unstable_IdlePriority?: number;
    };
  }
}