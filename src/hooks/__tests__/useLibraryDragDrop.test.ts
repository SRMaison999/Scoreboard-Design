/**
 * Tests pour le hook useLibraryDragDrop.
 * Verifie le glisser-deposer depuis la bibliotheque vers le canvas.
 */

import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLibraryDragDrop } from '../useLibraryDragDrop';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

const DRAG_MIME = CUSTOM_FIELD_LABELS.dragMimeType;

/** Cree un mock de React.DragEvent minimal */
function makeDragEvent(overrides: {
  types?: string[];
  data?: Record<string, string>;
  clientX?: number;
  clientY?: number;
  currentTargetRect?: DOMRect;
} = {}): React.DragEvent {
  const dataStore: Record<string, string> = overrides.data ?? {};

  return {
    preventDefault: vi.fn(),
    dataTransfer: {
      types: overrides.types ?? Object.keys(dataStore),
      setData: vi.fn((key: string, value: string) => { dataStore[key] = value; }),
      getData: vi.fn((key: string) => dataStore[key] ?? ''),
      effectAllowed: 'uninitialized',
      dropEffect: 'none',
    },
    clientX: overrides.clientX ?? 0,
    clientY: overrides.clientY ?? 0,
    currentTarget: {
      getBoundingClientRect: () => overrides.currentTargetRect ?? ({
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        right: 1920,
        bottom: 1080,
        x: 0,
        y: 0,
        toJSON: () => '',
      } as DOMRect),
    },
    relatedTarget: null,
    target: null,
  } as unknown as React.DragEvent;
}

describe('useLibraryDragDrop', () => {
  it('retourne isDragOver a false par defaut', () => {
    const { result } = renderHook(() => useLibraryDragDrop());
    expect(result.current.isDragOver).toBe(false);
  });

  it('onDragStart definit le type d element dans le dataTransfer', () => {
    const { result } = renderHook(() => useLibraryDragDrop());
    const event = makeDragEvent();

    act(() => {
      result.current.onDragStart(event, 'text-block');
    });

    expect(event.dataTransfer.setData).toHaveBeenCalledWith(
      DRAG_MIME,
      JSON.stringify({ elementType: 'text-block' }),
    );
    expect(event.dataTransfer.effectAllowed).toBe('copy');
  });

  it('onDragOver passe isDragOver a true et appelle preventDefault', () => {
    const { result } = renderHook(() => useLibraryDragDrop());
    const event = makeDragEvent({ types: [DRAG_MIME] });

    act(() => {
      result.current.onDragOver(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(result.current.isDragOver).toBe(true);
  });

  it('onDragOver ignore les drags non-bibliotheque', () => {
    const { result } = renderHook(() => useLibraryDragDrop());
    const event = makeDragEvent({ types: ['text/plain'] });

    act(() => {
      result.current.onDragOver(event);
    });

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(result.current.isDragOver).toBe(false);
  });

  it('onDragLeave remet isDragOver a false', () => {
    const { result } = renderHook(() => useLibraryDragDrop());

    /* Simuler d'abord un dragOver */
    act(() => {
      result.current.onDragOver(makeDragEvent({ types: [DRAG_MIME] }));
    });
    expect(result.current.isDragOver).toBe(true);

    /* Puis un dragLeave */
    const leaveEvent = {
      relatedTarget: null,
      currentTarget: { contains: () => false },
    } as unknown as React.DragEvent;

    act(() => {
      result.current.onDragLeave(leaveEvent);
    });
    expect(result.current.isDragOver).toBe(false);
  });

  it('onDrop retourne les informations du drop avec la position correcte', () => {
    const { result } = renderHook(() => useLibraryDragDrop());
    const payload = JSON.stringify({ elementType: 'text-block' });
    const event = makeDragEvent({
      types: [DRAG_MIME],
      data: { [DRAG_MIME]: payload },
      clientX: 500,
      clientY: 300,
      currentTargetRect: {
        left: 100, top: 50, width: 1920, height: 1080,
        right: 2020, bottom: 1130, x: 100, y: 50,
        toJSON: () => '',
      } as DOMRect,
    });

    let dropResult: ReturnType<typeof result.current.onDrop>;
    act(() => {
      dropResult = result.current.onDrop(event, 0.5);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    /* Position = (clientX - rect.left) / scale = (500 - 100) / 0.5 = 800 */
    expect(dropResult!).toEqual({
      element: expect.objectContaining({ type: 'text-block' }),
      canvasX: 800,
      canvasY: 500,
    });
  });

  it('onDrop retourne null pour un payload invalide', () => {
    const { result } = renderHook(() => useLibraryDragDrop());
    const event = makeDragEvent({
      types: [DRAG_MIME],
      data: { [DRAG_MIME]: 'not-json' },
    });

    let dropResult: ReturnType<typeof result.current.onDrop>;
    act(() => {
      dropResult = result.current.onDrop(event, 1);
    });

    expect(dropResult!).toBeNull();
  });

  it('onDrop retourne null pour un type d element inconnu', () => {
    const { result } = renderHook(() => useLibraryDragDrop());
    const payload = JSON.stringify({ elementType: 'unknown-type-xyz' });
    const event = makeDragEvent({
      types: [DRAG_MIME],
      data: { [DRAG_MIME]: payload },
    });

    let dropResult: ReturnType<typeof result.current.onDrop>;
    act(() => {
      dropResult = result.current.onDrop(event, 1);
    });

    expect(dropResult!).toBeNull();
  });

  it('onDrop remet isDragOver a false', () => {
    const { result } = renderHook(() => useLibraryDragDrop());

    /* Activer isDragOver */
    act(() => {
      result.current.onDragOver(makeDragEvent({ types: [DRAG_MIME] }));
    });
    expect(result.current.isDragOver).toBe(true);

    /* Drop */
    const payload = JSON.stringify({ elementType: 'text-block' });
    const event = makeDragEvent({
      types: [DRAG_MIME],
      data: { [DRAG_MIME]: payload },
    });
    act(() => {
      result.current.onDrop(event, 1);
    });

    expect(result.current.isDragOver).toBe(false);
  });
});
