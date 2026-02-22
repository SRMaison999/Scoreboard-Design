import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFieldResize } from '@/hooks/useFieldResize';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { FieldElementConfig } from '@/types/customField';
import type { ResizeHandle } from '@/types/customField';

const TEXT_ELEMENT: FieldElementConfig = {
  type: 'text-block',
  config: {
    content: 'a',
    fontSize: 20,
    fontWeight: 400,
    fontFamily: '',
    textAlign: 'center',
    textTransform: 'none',
    letterSpacing: 0,
    textColor: '#ffffff',
  },
};

function addField(x = 100, y = 100, w = 200, h = 100) {
  useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, x, y, w, h);
  const field = useScoreboardStore.getState().customFieldsData.fields[0];
  if (!field) throw new Error('Le champ devrait exister');
  return field;
}

function getField() {
  const field = useScoreboardStore.getState().customFieldsData.fields[0];
  if (!field) throw new Error('Le champ devrait exister');
  return field;
}

function makeFakePointerEvent(overrides: Record<string, unknown> = {}) {
  return {
    clientX: 0,
    clientY: 0,
    pointerId: 1,
    shiftKey: false,
    altKey: false,
    stopPropagation: () => undefined,
    preventDefault: () => undefined,
    currentTarget: {
      setPointerCapture: () => undefined,
    },
    ...overrides,
  } as unknown as React.PointerEvent;
}

function startResize(
  hook: ReturnType<typeof useFieldResize>,
  fieldId: string,
  handle: ResizeHandle,
  x: number,
  y: number,
  w: number,
  h: number,
  clientX = 500,
  clientY = 500,
) {
  act(() => {
    hook.onResizeStart(
      makeFakePointerEvent({ clientX, clientY }),
      fieldId, handle, x, y, w, h,
    );
  });
}

function moveResize(
  hook: ReturnType<typeof useFieldResize>,
  clientX: number,
  clientY: number,
  shiftKey = false,
  altKey = false,
) {
  act(() => {
    hook.onResizeMove(
      makeFakePointerEvent({ clientX, clientY, shiftKey, altKey }),
    );
  });
}

describe('useFieldResize', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
    /* Desactiver le snap pour des calculs previsibles */
    useScoreboardStore.setState((s) => ({
      customFieldsData: { ...s.customFieldsData, snapToGrid: false },
    }));
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
    const field = addField(50, 50, 200, 100);
    const { result } = renderHook(() => useFieldResize(1));

    moveResize(result.current, 200, 200);

    const fieldAfter = getField();
    expect(fieldAfter?.width).toBe(field?.width);
    expect(fieldAfter?.height).toBe(field?.height);
  });

  /* --- Poignees de coin --- */

  describe('poignees de coin', () => {
    it('bottom-right agrandit largeur et hauteur', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'bottom-right', 100, 100, 200, 100);
      moveResize(result.current, 550, 530);

      const f = getField();
      expect(f.width).toBe(250);
      expect(f.height).toBe(130);
    });

    it('top-left reduit et deplace', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'top-left', 100, 100, 200, 100);
      moveResize(result.current, 530, 520);

      const f = getField();
      expect(f.width).toBe(170);
      expect(f.x).toBe(130);
      expect(f.height).toBe(80);
      expect(f.y).toBe(120);
    });
  });

  /* --- Poignees de bord --- */

  describe('poignees de bord', () => {
    it('right modifie uniquement la largeur', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'right', 100, 100, 200, 100);
      moveResize(result.current, 560, 540);

      const f = getField();
      expect(f.width).toBe(260);
      expect(f.height).toBe(100);
      expect(f.x).toBe(100);
      expect(f.y).toBe(100);
    });

    it('left modifie largeur et position x', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'left', 100, 100, 200, 100);
      moveResize(result.current, 530, 540);

      const f = getField();
      expect(f.width).toBe(170);
      expect(f.x).toBe(130);
      expect(f.height).toBe(100);
      expect(f.y).toBe(100);
    });

    it('bottom modifie uniquement la hauteur', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'bottom', 100, 100, 200, 100);
      moveResize(result.current, 540, 560);

      const f = getField();
      expect(f.width).toBe(200);
      expect(f.height).toBe(160);
      expect(f.x).toBe(100);
      expect(f.y).toBe(100);
    });

    it('top modifie hauteur et position y', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'top', 100, 100, 200, 100);
      moveResize(result.current, 540, 520);

      const f = getField();
      expect(f.width).toBe(200);
      expect(f.height).toBe(80);
      expect(f.y).toBe(120);
      expect(f.x).toBe(100);
    });
  });

  /* --- Modificateur Shift (proportionnel) --- */

  describe('Shift (proportionnel)', () => {
    it('force le ratio sur un coin meme sans lockAspectRatio', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'bottom-right', 100, 100, 200, 100);
      /* dx=100, dy=20 => absW > absH => ajuste H = W / ratio */
      moveResize(result.current, 600, 520, true, false);

      const f = getField();
      /* ratio = 200/100 = 2. newW = 300, newH = 300/2 = 150 */
      expect(f.width).toBe(300);
      expect(f.height).toBe(150);
    });

    it('force le ratio sur une poignee de bord', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'right', 100, 100, 200, 100);
      moveResize(result.current, 600, 500, true, false);

      const f = getField();
      /* ratio = 2, newW = 300, newH = 300/2 = 150 */
      expect(f.width).toBe(300);
      expect(f.height).toBe(150);
    });

    it('force le ratio sur bord top', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'bottom', 100, 100, 200, 100);
      moveResize(result.current, 500, 550, true, false);

      const f = getField();
      /* ratio = 2, newH = 150, newW = 150 * 2 = 300 */
      expect(f.height).toBe(150);
      expect(f.width).toBe(300);
    });
  });

  /* --- Modificateur Alt (centre) --- */

  describe('Alt (depuis le centre)', () => {
    it('redimensionne symetriquement depuis le centre', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      /* centre = (200, 150) */
      startResize(result.current, field.id, 'right', 100, 100, 200, 100);
      moveResize(result.current, 560, 500, false, true);

      const f = getField();
      /* newW = 200 + 60 = 260, centreX = 200. newX = 200 - 130 = 70 */
      expect(f.width).toBe(260);
      expect(f.x).toBe(70);
      /* newH reste 100, centreY = 150. newY = 150 - 50 = 100 */
      expect(f.height).toBe(100);
      expect(f.y).toBe(100);
    });

    it('redimensionne depuis le centre en vertical', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'bottom', 100, 100, 200, 100);
      moveResize(result.current, 500, 540, false, true);

      const f = getField();
      /* newH = 100 + 40 = 140, centreY = 150. newY = 150 - 70 = 80 */
      expect(f.height).toBe(140);
      expect(f.y).toBe(80);
    });
  });

  /* --- Shift + Alt combine --- */

  describe('Shift + Alt (proportionnel + centre)', () => {
    it('combine proportionnel et centre sur un coin', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'bottom-right', 100, 100, 200, 100);
      /* dx=100 > dy=20 => width-driven. newW=300 newH=150 */
      moveResize(result.current, 600, 520, true, true);

      const f = getField();
      /* proportionnel : newW=300 newH=150 */
      /* centre : centreX=200, centreY=150 */
      /* newX = 200 - 150 = 50, newY = 150 - 75 = 75 */
      expect(f.width).toBe(300);
      expect(f.height).toBe(150);
      expect(f.x).toBe(50);
      expect(f.y).toBe(75);
    });
  });

  /* --- Taille minimale --- */

  describe('taille minimale', () => {
    it('ne descend pas sous 40px', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'bottom-right', 100, 100, 200, 100);
      moveResize(result.current, 300, 400);

      const f = getField();
      expect(f.width).toBeGreaterThanOrEqual(40);
      expect(f.height).toBeGreaterThanOrEqual(40);
    });
  });

  /* --- onResizeEnd --- */

  describe('onResizeEnd', () => {
    it('arrete le resize en cours', () => {
      const field = addField(100, 100, 200, 100);
      const { result } = renderHook(() => useFieldResize(1));

      startResize(result.current, field.id, 'bottom-right', 100, 100, 200, 100);
      act(() => { result.current.onResizeEnd(); });

      /* Apres end, un move ne devrait rien faire */
      const before = getField();
      moveResize(result.current, 700, 700);
      const after = getField();
      expect(after.width).toBe(before.width);
      expect(after.height).toBe(before.height);
    });
  });
});
