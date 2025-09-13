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

// matchMedia mock
if (!window.matchMedia) {
	// @ts-ignore
	window.matchMedia = (query: string) => ({
		matches: query.includes('dark') ? false : false,
		media: query,
		onchange: null,
		addListener: () => {}, // deprecated
		removeListener: () => {}, // deprecated
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	});
}

// Always override scrollTo (jsdom's default throws)
// @ts-ignore
window.scrollTo = () => {};
