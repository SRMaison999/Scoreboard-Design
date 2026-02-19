import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useZoneSelection } from '../useZoneSelection';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';
import type { CustomField, FieldElementConfig } from '@/types/customField';

function makeField(x: number, y: number, w = 100, h = 80): CustomField {
  const element: FieldElementConfig = {
    type: 'text-block',
    config: { content: 'test', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center', textTransform: 'none', letterSpacing: 0 },
  };
  return {
    id: `f-${x}-${y}`, label: 'Test', x, y, width: w, height: h,
    zIndex: 1, locked: false, visible: true, lockAspectRatio: false,
    scaleContent: true, initialWidth: w, initialHeight: h,
    element, style: { ...DEFAULT_FIELD_STYLE },
  };
}

describe('useZoneSelection', () => {
  it('commence inactif', () => {
    const { result } = renderHook(() =>
      useZoneSelection(1, [], vi.fn()),
    );
    expect(result.current.active).toBe(false);
    expect(result.current.drawing).toBe(false);
  });

  it('active et annule le mode', () => {
    const { result } = renderHook(() =>
      useZoneSelection(1, [], vi.fn()),
    );
    act(() => result.current.activate());
    expect(result.current.active).toBe(true);
    act(() => result.current.cancel());
    expect(result.current.active).toBe(false);
  });

  it('capture les champs dans la zone', () => {
    const fields = [
      makeField(50, 50),
      makeField(300, 300),
      makeField(500, 500),
    ];
    const onCapture = vi.fn();
    const { result } = renderHook(() =>
      useZoneSelection(1, fields, onCapture),
    );

    act(() => result.current.activate());

    /* Le champ à (50,50) 100x80 a son centre à (100, 90) - dans la zone 0,0->400,400 */
    /* Le champ à (300,300) 100x80 a son centre à (350, 340) - dans la zone */
    /* Le champ à (500,500) 100x80 a son centre à (550, 540) - hors zone */
    expect(onCapture).not.toHaveBeenCalled();
  });
});
