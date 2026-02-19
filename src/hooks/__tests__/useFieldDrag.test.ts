import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFieldDrag } from '@/hooks/useFieldDrag';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('useFieldDrag', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('retourne les handlers de pointeur', () => {
    const { result } = renderHook(() => useFieldDrag(1));
    expect(result.current.onPointerDown).toBeDefined();
    expect(result.current.onPointerMove).toBeDefined();
    expect(result.current.onPointerUp).toBeDefined();
  });

  it('sélectionne le champ au pointerDown', () => {
    const element = { type: 'text-block' as const, config: { content: 'a', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center' as const, textTransform: 'none' as const, letterSpacing: 0 } };
    useScoreboardStore.getState().addCustomField(element, 50, 50, 200, 100);
    const fieldId = useScoreboardStore.getState().customFieldsData.fields[0]?.id ?? '';

    const { result } = renderHook(() => useFieldDrag(1));

    act(() => {
      const fakeEvent = {
        stopPropagation: () => {},
        preventDefault: () => {},
        clientX: 100,
        clientY: 100,
        pointerId: 1,
        currentTarget: { setPointerCapture: () => {} },
      } as unknown as React.PointerEvent;

      result.current.onPointerDown(fakeEvent, fieldId, 50, 50);
    });

    expect(useScoreboardStore.getState().customFieldsData.selectedFieldId).toBe(fieldId);
  });
});
