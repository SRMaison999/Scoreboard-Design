import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePressRepeat } from '../usePressRepeat';

describe('usePressRepeat', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('appelle l\'action immédiatement au start', () => {
    const action = vi.fn();
    const { result } = renderHook(() => usePressRepeat(action));

    act(() => result.current.start());
    expect(action).toHaveBeenCalledOnce();

    act(() => result.current.stop());
  });

  it('répète l\'action après le délai initial', () => {
    const action = vi.fn();
    const { result } = renderHook(() => usePressRepeat(action));

    act(() => result.current.start());
    expect(action).toHaveBeenCalledTimes(1);

    act(() => { vi.advanceTimersByTime(400); });
    expect(action).toHaveBeenCalledTimes(2);

    act(() => result.current.stop());
  });

  it('accélère progressivement les répétitions', () => {
    const action = vi.fn();
    const { result } = renderHook(() => usePressRepeat(action));

    act(() => result.current.start());
    /* initial call */
    expect(action).toHaveBeenCalledTimes(1);

    /* après 400ms : 2e appel */
    act(() => { vi.advanceTimersByTime(400); });
    expect(action).toHaveBeenCalledTimes(2);

    /* le prochain intervalle est 400*0.85 = 340ms */
    act(() => { vi.advanceTimersByTime(340); });
    expect(action).toHaveBeenCalledTimes(3);

    act(() => result.current.stop());
  });

  it('arrête les répétitions au stop', () => {
    const action = vi.fn();
    const { result } = renderHook(() => usePressRepeat(action));

    act(() => result.current.start());
    act(() => result.current.stop());

    const countAfterStop = action.mock.calls.length;
    act(() => { vi.advanceTimersByTime(2000); });
    expect(action).toHaveBeenCalledTimes(countAfterStop);
  });
});
