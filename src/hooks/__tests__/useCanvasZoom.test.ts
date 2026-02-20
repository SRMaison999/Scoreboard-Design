/**
 * Tests pour le hook useCanvasZoom.
 * Zoom avec Ctrl+molette, panning avec Espace+glisser et bouton central.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCanvasZoom } from '@/hooks/useCanvasZoom';
import { useCanvasViewStore } from '@/stores/canvasViewStore';

/* --- Helpers --- */

let container: HTMLDivElement;

function createContainer(): HTMLDivElement {
  const el = document.createElement('div');
  /* Simuler une taille de conteneur */
  Object.defineProperty(el, 'getBoundingClientRect', {
    value: () => ({
      left: 0,
      top: 0,
      width: 800,
      height: 600,
      right: 800,
      bottom: 600,
      x: 0,
      y: 0,
      toJSON: () => '',
    }),
  });
  document.body.appendChild(el);
  return el;
}

function fireWheel(target: HTMLElement, opts: Partial<WheelEventInit> = {}) {
  const event = new WheelEvent('wheel', {
    bubbles: true,
    cancelable: true,
    clientX: 400,
    clientY: 300,
    ...opts,
  });
  target.dispatchEvent(event);
}

function fireMouseDown(target: HTMLElement, button: number, opts: Partial<MouseEventInit> = {}) {
  const event = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    button,
    clientX: 400,
    clientY: 300,
    ...opts,
  });
  target.dispatchEvent(event);
}

function fireMouseMove(clientX: number, clientY: number) {
  const event = new MouseEvent('mousemove', {
    bubbles: true,
    cancelable: true,
    clientX,
    clientY,
  });
  document.dispatchEvent(event);
}

function fireMouseUp() {
  const event = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
  document.dispatchEvent(event);
}

function fireKeyDown(code: string, opts: Partial<KeyboardEventInit> = {}) {
  const event = new KeyboardEvent('keydown', { code, bubbles: true, cancelable: true, ...opts });
  document.dispatchEvent(event);
}

function fireKeyUp(code: string) {
  const event = new KeyboardEvent('keyup', { code, bubbles: true, cancelable: true });
  document.dispatchEvent(event);
}

describe('useCanvasZoom', () => {
  beforeEach(() => {
    useCanvasViewStore.setState({ zoom: 1, panX: 0, panY: 0 });
    container = createContainer();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  /* --- Zoom Ctrl+molette --- */

  it('Ctrl+molette vers le haut zoome', () => {
    const ref = { current: container };
    renderHook(() => useCanvasZoom({ containerRef: ref, enabled: true, baseScale: 0.5 }));

    act(() => {
      fireWheel(container, { deltaY: -100, ctrlKey: true });
    });

    expect(useCanvasViewStore.getState().zoom).toBeGreaterThan(1);
  });

  it('Ctrl+molette vers le bas dézoome', () => {
    const ref = { current: container };
    renderHook(() => useCanvasZoom({ containerRef: ref, enabled: true, baseScale: 0.5 }));

    act(() => {
      fireWheel(container, { deltaY: 100, ctrlKey: true });
    });

    expect(useCanvasViewStore.getState().zoom).toBeLessThan(1);
  });

  it('la molette sans Ctrl ne zoome pas', () => {
    const ref = { current: container };
    renderHook(() => useCanvasZoom({ containerRef: ref, enabled: true, baseScale: 0.5 }));

    act(() => {
      fireWheel(container, { deltaY: -100, ctrlKey: false });
    });

    expect(useCanvasViewStore.getState().zoom).toBe(1);
  });

  it('ne zoome pas quand désactivé', () => {
    const ref = { current: container };
    renderHook(() => useCanvasZoom({ containerRef: ref, enabled: false, baseScale: 0.5 }));

    act(() => {
      fireWheel(container, { deltaY: -100, ctrlKey: true });
    });

    expect(useCanvasViewStore.getState().zoom).toBe(1);
  });

  /* --- Panning avec bouton central --- */

  it('le bouton central démarre le panning', () => {
    const ref = { current: container };
    const { result } = renderHook(() => useCanvasZoom({ containerRef: ref, enabled: true, baseScale: 0.5 }));

    act(() => {
      fireMouseDown(container, 1);
    });

    expect(result.current.isPanning).toBe(true);
  });

  it('le panning met à jour panX et panY', () => {
    const ref = { current: container };
    renderHook(() => useCanvasZoom({ containerRef: ref, enabled: true, baseScale: 0.5 }));

    act(() => {
      fireMouseDown(container, 1, { clientX: 400, clientY: 300 });
    });
    act(() => {
      fireMouseMove(450, 350);
    });

    const state = useCanvasViewStore.getState();
    expect(state.panX).toBe(50);
    expect(state.panY).toBe(50);
  });

  it('le relâchement de la souris arrête le panning', () => {
    const ref = { current: container };
    const { result } = renderHook(() => useCanvasZoom({ containerRef: ref, enabled: true, baseScale: 0.5 }));

    act(() => {
      fireMouseDown(container, 1);
    });
    act(() => {
      fireMouseUp();
    });

    expect(result.current.isPanning).toBe(false);
  });

  /* --- Panning avec Espace+glisser --- */

  it('Espace active le mode grab', () => {
    const ref = { current: container };
    const { result } = renderHook(() => useCanvasZoom({ containerRef: ref, enabled: true, baseScale: 0.5 }));

    act(() => {
      fireKeyDown('Space');
    });

    expect(result.current.isSpaceHeld).toBe(true);
  });

  it('relâcher Espace désactive le mode grab', () => {
    const ref = { current: container };
    const { result } = renderHook(() => useCanvasZoom({ containerRef: ref, enabled: true, baseScale: 0.5 }));

    act(() => {
      fireKeyDown('Space');
    });
    act(() => {
      fireKeyUp('Space');
    });

    expect(result.current.isSpaceHeld).toBe(false);
  });

  it('Espace + clic gauche démarre le panning', () => {
    const ref = { current: container };
    const { result } = renderHook(() => useCanvasZoom({ containerRef: ref, enabled: true, baseScale: 0.5 }));

    act(() => {
      fireKeyDown('Space');
    });
    act(() => {
      fireMouseDown(container, 0);
    });

    expect(result.current.isPanning).toBe(true);
  });

  /* --- Désactivé --- */

  it('ne réagit pas aux événements quand désactivé', () => {
    const ref = { current: container };
    const { result } = renderHook(() => useCanvasZoom({ containerRef: ref, enabled: false, baseScale: 0.5 }));

    act(() => {
      fireMouseDown(container, 1);
    });

    expect(result.current.isPanning).toBe(false);
  });

  it('Espace est ignoré quand désactivé', () => {
    const ref = { current: container };
    const { result } = renderHook(() => useCanvasZoom({ containerRef: ref, enabled: false, baseScale: 0.5 }));

    act(() => {
      fireKeyDown('Space');
    });

    expect(result.current.isSpaceHeld).toBe(false);
  });

  /* --- Nettoyage --- */

  it('les listeners sont retirés au démontage', () => {
    const ref = { current: container };
    const { unmount } = renderHook(() => useCanvasZoom({ containerRef: ref, enabled: true, baseScale: 0.5 }));

    unmount();

    act(() => {
      fireWheel(container, { deltaY: -100, ctrlKey: true });
    });

    expect(useCanvasViewStore.getState().zoom).toBe(1);
  });
});
