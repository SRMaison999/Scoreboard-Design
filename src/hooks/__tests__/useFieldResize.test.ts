import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFieldResize } from '@/hooks/useFieldResize';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('useFieldResize', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('retourne les handlers de resize', () => {
    const { result } = renderHook(() => useFieldResize(1));
    expect(result.current.onResizeStart).toBeDefined();
    expect(result.current.onResizeMove).toBeDefined();
    expect(result.current.onResizeEnd).toBeDefined();
  });

  it('les handlers sont des fonctions', () => {
    const { result } = renderHook(() => useFieldResize(1));
    expect(typeof result.current.onResizeStart).toBe('function');
    expect(typeof result.current.onResizeMove).toBe('function');
    expect(typeof result.current.onResizeEnd).toBe('function');
  });

  it('onResizeMove ne fait rien sans resize actif', () => {
    const element = { type: 'text-block' as const, config: { content: 'a', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center' as const, textTransform: 'none' as const, letterSpacing: 0 } };
    useScoreboardStore.getState().addCustomField(element, 50, 50, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    const { result } = renderHook(() => useFieldResize(1));

    const fakeEvent = {
      clientX: 200,
      clientY: 200,
    } as unknown as React.PointerEvent;

    result.current.onResizeMove(fakeEvent);

    const fieldAfter = useScoreboardStore.getState().customFieldsData.fields[0];
    expect(fieldAfter?.width).toBe(field?.width);
    expect(fieldAfter?.height).toBe(field?.height);
  });
});
