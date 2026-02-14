import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOutputSyncReceiver } from '@/hooks/useOutputSync';

describe('useOutputSyncReceiver', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
  });

  it('retourne null avant de recevoir un message', () => {
    const { result } = renderHook(() => useOutputSyncReceiver());
    expect(result.current).toBeNull();
  });
});
