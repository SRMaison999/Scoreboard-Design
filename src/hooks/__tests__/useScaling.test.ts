import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScaling } from '@/hooks/useScaling';

describe('useScaling', () => {
  it('retourne un scale par defaut de 0.5', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useScaling(ref));
    expect(result.current).toBe(0.5);
  });

  it('observe le conteneur quand la ref est definie', () => {
    const observeSpy = vi.fn();
    const disconnectSpy = vi.fn();

    const MockResizeObserver = vi.fn(function (this: { observe: typeof observeSpy; disconnect: typeof disconnectSpy; unobserve: ReturnType<typeof vi.fn> }) {
      this.observe = observeSpy;
      this.disconnect = disconnectSpy;
      this.unobserve = vi.fn();
    });

    vi.stubGlobal('ResizeObserver', MockResizeObserver);

    const div = document.createElement('div');
    const ref = { current: div };
    const { unmount } = renderHook(() => useScaling(ref));

    expect(observeSpy).toHaveBeenCalledWith(div);
    unmount();
    expect(disconnectSpy).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });
});
