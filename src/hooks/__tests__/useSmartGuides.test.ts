import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSmartGuides } from '../useSmartGuides';
import type { CustomField } from '@/types/customField';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';

function makeField(overrides: Partial<CustomField> & { id: string }): CustomField {
  return {
    label: 'Test',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    zIndex: 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: true,
    initialWidth: overrides.width ?? 100,
    initialHeight: overrides.height ?? 100,
    element: { type: 'text-block', config: { content: '', fontSize: 24, fontWeight: 400, fontFamily: '', textAlign: 'left', textTransform: 'none', letterSpacing: 0, textColor: '#ffffff' } },
    style: { ...DEFAULT_FIELD_STYLE },
    ...overrides,
  } as CustomField;
}

describe('useSmartGuides', () => {
  it('retourne la position inchangee quand desactive', () => {
    const fields = [makeField({ id: 'a', x: 100, y: 100 })];
    const { result } = renderHook(() => useSmartGuides(fields, [], 1920, 1080, false));
    const snap = result.current.computeSnap({ x: 50, y: 50, width: 100, height: 100 });
    expect(snap.x).toBe(50);
    expect(snap.y).toBe(50);
    expect(snap.guides).toHaveLength(0);
  });

  it('snappe sur le bord gauche d\'un autre champ', () => {
    const fields = [makeField({ id: 'a', x: 200, y: 300, width: 100, height: 50 })];
    const { result } = renderHook(() => useSmartGuides(fields, ['b'], 1920, 1080, true));
    const snap = result.current.computeSnap({ x: 198, y: 50, width: 100, height: 100 });
    expect(snap.x).toBe(200);
  });

  it('snappe sur le centre horizontal du canvas', () => {
    const fields: CustomField[] = [];
    const { result } = renderHook(() => useSmartGuides(fields, ['a'], 1920, 1080, true));
    const snap = result.current.computeSnap({ x: 908, y: 100, width: 100, height: 100 });
    expect(snap.x).toBe(910);
  });

  it('genere des guides verticaux lors du snap', () => {
    const fields = [makeField({ id: 'a', x: 200, y: 300, width: 100, height: 50 })];
    const { result } = renderHook(() => useSmartGuides(fields, ['b'], 1920, 1080, true));
    const snap = result.current.computeSnap({ x: 198, y: 50, width: 100, height: 100 });
    expect(snap.guides.length).toBeGreaterThan(0);
    const verticalGuides = snap.guides.filter((g) => g.orientation === 'vertical');
    expect(verticalGuides.length).toBeGreaterThan(0);
  });

  it('ignore les champs en cours de drag', () => {
    const fields = [
      makeField({ id: 'a', x: 200, y: 100 }),
      makeField({ id: 'b', x: 500, y: 100 }),
    ];
    const { result } = renderHook(() => useSmartGuides(fields, ['a'], 1920, 1080, true));
    const snap = result.current.computeSnap({ x: 498, y: 200, width: 100, height: 100 });
    expect(snap.x).toBe(500);
  });

  it('snappe sur le bord du canvas (position 0)', () => {
    const fields: CustomField[] = [];
    const { result } = renderHook(() => useSmartGuides(fields, ['a'], 1920, 1080, true));
    const snap = result.current.computeSnap({ x: 3, y: 3, width: 100, height: 100 });
    expect(snap.x).toBe(0);
    expect(snap.y).toBe(0);
  });
});
