import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAnimationTriggers } from '@/hooks/useAnimationTriggers';
import { DEFAULT_ANIMATION_CONFIG } from '@/types/animation';

describe('useAnimationTriggers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const baseInputs = {
    visible: true,
    score1: '1',
    score2: '1',
    penaltiesLeftCount: 0,
    penaltiesRightCount: 0,
    timeSeconds: 300,
    config: DEFAULT_ANIMATION_CONFIG,
  };

  it('initialise sans aucun drapeau actif', () => {
    const { result } = renderHook(() => useAnimationTriggers(baseInputs));
    expect(result.current.entering).toBe(false);
    expect(result.current.exiting).toBe(false);
    expect(result.current.scorePopLeft).toBe(false);
    expect(result.current.scorePopRight).toBe(false);
    expect(result.current.penaltyFlashLeft).toBe(false);
    expect(result.current.penaltyFlashRight).toBe(false);
    expect(result.current.clockPulse).toBe(false);
  });

  it('active clockPulse quand le temps est sous le seuil', () => {
    const { result } = renderHook(() => useAnimationTriggers({
      ...baseInputs,
      timeSeconds: 5,
    }));
    expect(result.current.clockPulse).toBe(true);
  });

  it('desactive clockPulse quand le temps est au-dessus du seuil', () => {
    const { result } = renderHook(() => useAnimationTriggers({
      ...baseInputs,
      timeSeconds: 15,
    }));
    expect(result.current.clockPulse).toBe(false);
  });

  it('desactive clockPulse quand clockPulseEnabled est false', () => {
    const { result } = renderHook(() => useAnimationTriggers({
      ...baseInputs,
      timeSeconds: 5,
      config: { ...DEFAULT_ANIMATION_CONFIG, clockPulseEnabled: false },
    }));
    expect(result.current.clockPulse).toBe(false);
  });

  it('active scorePopLeft quand score1 change', () => {
    const { result, rerender } = renderHook(
      (props) => useAnimationTriggers(props),
      { initialProps: baseInputs },
    );

    expect(result.current.scorePopLeft).toBe(false);

    act(() => {
      rerender({ ...baseInputs, score1: '2' });
    });

    expect(result.current.scorePopLeft).toBe(true);

    act(() => { vi.advanceTimersByTime(500); });
    expect(result.current.scorePopLeft).toBe(false);
  });

  it('active scorePopRight quand score2 change', () => {
    const { result, rerender } = renderHook(
      (props) => useAnimationTriggers(props),
      { initialProps: baseInputs },
    );

    act(() => {
      rerender({ ...baseInputs, score2: '3' });
    });

    expect(result.current.scorePopRight).toBe(true);
  });

  it('active penaltyFlashLeft quand le nombre de penalites augmente', () => {
    const { result, rerender } = renderHook(
      (props) => useAnimationTriggers(props),
      { initialProps: baseInputs },
    );

    act(() => {
      rerender({ ...baseInputs, penaltiesLeftCount: 1 });
    });

    expect(result.current.penaltyFlashLeft).toBe(true);

    act(() => { vi.advanceTimersByTime(700); });
    expect(result.current.penaltyFlashLeft).toBe(false);
  });

  it('active entering quand visible passe a true', () => {
    const { result, rerender } = renderHook(
      (props) => useAnimationTriggers(props),
      { initialProps: { ...baseInputs, visible: false } },
    );

    act(() => {
      rerender({ ...baseInputs, visible: true });
    });

    expect(result.current.entering).toBe(true);

    act(() => { vi.advanceTimersByTime(900); });
    expect(result.current.entering).toBe(false);
  });

  it('active exiting quand visible passe a false', () => {
    const { result, rerender } = renderHook(
      (props) => useAnimationTriggers(props),
      { initialProps: baseInputs },
    );

    act(() => {
      rerender({ ...baseInputs, visible: false });
    });

    expect(result.current.exiting).toBe(true);

    act(() => { vi.advanceTimersByTime(700); });
    expect(result.current.exiting).toBe(false);
  });
});
