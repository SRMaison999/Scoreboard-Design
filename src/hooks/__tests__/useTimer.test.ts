import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTimer } from '@/hooks/useTimer';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useScoreboardStore.getState().resetState();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('ne decremente pas quand le timer est arrete', () => {
    useScoreboardStore.getState().update('time', '5:00');
    renderHook(() => useTimer());

    vi.advanceTimersByTime(3000);
    expect(useScoreboardStore.getState().time).toBe('5:00');
  });

  it('decremente chaque seconde quand le timer tourne', () => {
    useScoreboardStore.getState().update('time', '5:00');
    useScoreboardStore.getState().startClock();
    renderHook(() => useTimer());

    vi.advanceTimersByTime(3000);
    expect(useScoreboardStore.getState().time).toBe('4:57');
  });

  it('arrete le decompte quand stopClock est appele', () => {
    useScoreboardStore.getState().update('time', '5:00');
    useScoreboardStore.getState().startClock();
    const { rerender } = renderHook(() => useTimer());

    vi.advanceTimersByTime(2000);
    useScoreboardStore.getState().stopClock();
    rerender();
    vi.advanceTimersByTime(5000);

    expect(useScoreboardStore.getState().time).toBe('4:58');
  });
});
