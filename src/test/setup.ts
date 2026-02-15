import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';

/* Mock global ResizeObserver (absent de jsdom) */
globalThis.ResizeObserver = class ResizeObserver {
  observe() { /* noop */ }
  unobserve() { /* noop */ }
  disconnect() { /* noop */ }
};

/* Mock global BroadcastChannel (absent de jsdom) */
globalThis.BroadcastChannel = class BroadcastChannel {
  onmessage: ((event: MessageEvent) => void) | null = null;
  constructor(public name: string) { /* noop */ }
  postMessage() { /* noop */ }
  close() { /* noop */ }
  addEventListener() { /* noop */ }
  removeEventListener() { /* noop */ }
  dispatchEvent(): boolean { return true; }
  onmessageerror: ((event: MessageEvent) => void) | null = null;
} as unknown as typeof BroadcastChannel;
