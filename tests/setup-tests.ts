import '@testing-library/jest-dom';

// Polyfills / stubs for browser APIs used in App
class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}
// @ts-ignore
global.ResizeObserver = global.ResizeObserver || ResizeObserver;

class PerformanceObserver {
	callback: (list: any) => void;
	constructor(cb: (list: any) => void) { this.callback = cb; }
	observe() {}
	disconnect() {}
}
// @ts-ignore
global.PerformanceObserver = global.PerformanceObserver || PerformanceObserver;

// Silence expected ResizeObserver error logs if any custom logic triggers them
const originalError = console.error;
console.error = (...args: any[]) => {
	if (typeof args[0] === 'string' && args[0].includes('ResizeObserver')) return;
	originalError(...args);
};
