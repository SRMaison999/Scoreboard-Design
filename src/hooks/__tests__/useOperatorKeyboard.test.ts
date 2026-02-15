import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useOperatorKeyboard } from '@/hooks/useOperatorKeyboard';
import { useScoreboardStore } from '@/stores/scoreboardStore';

function fireKey(key: string, opts: Partial<KeyboardEventInit> = {}) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, ...opts });
  window.dispatchEvent(event);
}

describe('useOperatorKeyboard', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('Espace toggle le timer', () => {
    renderHook(() => useOperatorKeyboard());
    act(() => fireKey(' '));
    expect(useScoreboardStore.getState().demoRunning).toBe(true);
    act(() => fireKey(' '));
    expect(useScoreboardStore.getState().demoRunning).toBe(false);
  });

  it('R reset le timer', () => {
    useScoreboardStore.getState().update('time', '5:00');
    renderHook(() => useOperatorKeyboard());
    act(() => fireKey('R'));
    expect(useScoreboardStore.getState().time).toBe('20:00');
  });

  it('ArrowRight incrémente le score équipe 1', () => {
    renderHook(() => useOperatorKeyboard());
    act(() => fireKey('ArrowRight'));
    expect(useScoreboardStore.getState().score1).toBe('2');
  });

  it('ArrowLeft décrémente le score équipe 1', () => {
    renderHook(() => useOperatorKeyboard());
    act(() => fireKey('ArrowLeft'));
    expect(useScoreboardStore.getState().score1).toBe('0');
  });

  it('ArrowUp incrémente le score équipe 2', () => {
    renderHook(() => useOperatorKeyboard());
    act(() => fireKey('ArrowUp'));
    expect(useScoreboardStore.getState().score2).toBe('2');
  });

  it('ArrowDown décrémente le score équipe 2', () => {
    renderHook(() => useOperatorKeyboard());
    act(() => fireKey('ArrowDown'));
    expect(useScoreboardStore.getState().score2).toBe('0');
  });

  it('P passe à la phase suivante', () => {
    renderHook(() => useOperatorKeyboard());
    act(() => fireKey('P'));
    expect(useScoreboardStore.getState().period).toBe('1st INTERMISSION');
  });

  it('1 ajoute une pénalité équipe 1', () => {
    const before = useScoreboardStore.getState().penaltiesLeft.length;
    renderHook(() => useOperatorKeyboard());
    act(() => fireKey('1'));
    expect(useScoreboardStore.getState().penaltiesLeft.length).toBe(before + 1);
  });

  it('2 ajoute une pénalité équipe 2', () => {
    const before = useScoreboardStore.getState().penaltiesRight.length;
    renderHook(() => useOperatorKeyboard());
    act(() => fireKey('2'));
    expect(useScoreboardStore.getState().penaltiesRight.length).toBe(before + 1);
  });
});
