import '@testing-library/jest-dom/vitest';

/* Mock global ResizeObserver (absent de jsdom) */
global.ResizeObserver = class ResizeObserver {
  observe() { /* noop */ }
  unobserve() { /* noop */ }
  disconnect() { /* noop */ }
};

/* Mock global BroadcastChannel (absent de jsdom) */
global.BroadcastChannel = class BroadcastChannel {
  onmessage: ((event: MessageEvent) => void) | null = null;
  constructor(public name: string) { /* noop */ }
  postMessage() { /* noop */ }
  close() { /* noop */ }
  addEventListener() { /* noop */ }
  removeEventListener() { /* noop */ }
  dispatchEvent(): boolean { return true; }
  onmessageerror: ((event: MessageEvent) => void) | null = null;
};
