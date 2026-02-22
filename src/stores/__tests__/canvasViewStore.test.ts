/**
 * Tests pour le store canvasViewStore.
 * Zoom et panning du canvas en mode Layout libre.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useCanvasViewStore } from '@/stores/canvasViewStore';

describe('canvasViewStore', () => {
  beforeEach(() => {
    useCanvasViewStore.setState({ zoom: 1, panX: 0, panY: 0, baseScale: 1 });
  });

  /* --- Valeurs par défaut --- */

  it('a les valeurs par défaut correctes', () => {
    const state = useCanvasViewStore.getState();
    expect(state.zoom).toBe(1);
    expect(state.panX).toBe(0);
    expect(state.panY).toBe(0);
    expect(state.baseScale).toBe(1);
  });

  /* --- setZoom --- */

  it('setZoom définit le zoom à la valeur spécifiée', () => {
    useCanvasViewStore.getState().setZoom(2);
    expect(useCanvasViewStore.getState().zoom).toBe(2);
  });

  it('setZoom clampe le zoom au minimum (0.25)', () => {
    useCanvasViewStore.getState().setZoom(0.1);
    expect(useCanvasViewStore.getState().zoom).toBe(0.25);
  });

  it('setZoom clampe le zoom au maximum (4)', () => {
    useCanvasViewStore.getState().setZoom(10);
    expect(useCanvasViewStore.getState().zoom).toBe(4);
  });

  it('setZoom accepte les valeurs limites exactes', () => {
    useCanvasViewStore.getState().setZoom(0.25);
    expect(useCanvasViewStore.getState().zoom).toBe(0.25);

    useCanvasViewStore.getState().setZoom(4);
    expect(useCanvasViewStore.getState().zoom).toBe(4);
  });

  /* --- setPan --- */

  it('setPan définit la position de pan', () => {
    useCanvasViewStore.getState().setPan(100, -50);
    const state = useCanvasViewStore.getState();
    expect(state.panX).toBe(100);
    expect(state.panY).toBe(-50);
  });

  it('setPan accepte des valeurs négatives', () => {
    useCanvasViewStore.getState().setPan(-200, -300);
    const state = useCanvasViewStore.getState();
    expect(state.panX).toBe(-200);
    expect(state.panY).toBe(-300);
  });

  /* --- setBaseScale --- */

  it('setBaseScale met à jour le facteur de base', () => {
    useCanvasViewStore.getState().setBaseScale(0.5);
    expect(useCanvasViewStore.getState().baseScale).toBe(0.5);
  });

  /* --- zoomIn --- */

  it('zoomIn multiplie le zoom par 1.2', () => {
    useCanvasViewStore.getState().zoomIn();
    const zoom = useCanvasViewStore.getState().zoom;
    expect(zoom).toBeCloseTo(1.2, 5);
  });

  it('zoomIn respecte le maximum', () => {
    useCanvasViewStore.getState().setZoom(3.5);
    useCanvasViewStore.getState().zoomIn();
    expect(useCanvasViewStore.getState().zoom).toBe(4);
  });

  it('zoomIn ne dépasse jamais 4', () => {
    useCanvasViewStore.getState().setZoom(4);
    useCanvasViewStore.getState().zoomIn();
    expect(useCanvasViewStore.getState().zoom).toBe(4);
  });

  /* --- zoomOut --- */

  it('zoomOut divise le zoom par 1.2', () => {
    useCanvasViewStore.getState().zoomOut();
    const zoom = useCanvasViewStore.getState().zoom;
    expect(zoom).toBeCloseTo(1 / 1.2, 5);
  });

  it('zoomOut respecte le minimum', () => {
    useCanvasViewStore.getState().setZoom(0.3);
    useCanvasViewStore.getState().zoomOut();
    expect(useCanvasViewStore.getState().zoom).toBe(0.25);
  });

  it('zoomOut ne descend jamais en dessous de 0.25', () => {
    useCanvasViewStore.getState().setZoom(0.25);
    useCanvasViewStore.getState().zoomOut();
    expect(useCanvasViewStore.getState().zoom).toBe(0.25);
  });

  /* --- zoomToFit --- */

  it('zoomToFit réinitialise le zoom à 1 et le pan à (0, 0)', () => {
    useCanvasViewStore.getState().setZoom(2.5);
    useCanvasViewStore.getState().setPan(100, -50);
    useCanvasViewStore.getState().zoomToFit();

    const state = useCanvasViewStore.getState();
    expect(state.zoom).toBe(1);
    expect(state.panX).toBe(0);
    expect(state.panY).toBe(0);
  });

  /* --- zoomTo100 --- */

  it('zoomTo100 calcule le zoom pour 100% réel quand baseScale = 0.5', () => {
    useCanvasViewStore.getState().setBaseScale(0.5);
    useCanvasViewStore.getState().setPan(-200, 300);
    useCanvasViewStore.getState().zoomTo100();

    const state = useCanvasViewStore.getState();
    expect(state.zoom).toBe(2);
    expect(state.panX).toBe(0);
    expect(state.panY).toBe(0);
  });

  it('zoomTo100 calcule le zoom pour 100% réel quand baseScale = 0.33', () => {
    useCanvasViewStore.getState().setBaseScale(0.33);
    useCanvasViewStore.getState().zoomTo100();

    const state = useCanvasViewStore.getState();
    expect(state.zoom).toBeCloseTo(1 / 0.33, 2);
  });

  it('zoomTo100 clampe le zoom au maximum si baseScale est très petit', () => {
    useCanvasViewStore.getState().setBaseScale(0.1);
    useCanvasViewStore.getState().zoomTo100();

    const state = useCanvasViewStore.getState();
    expect(state.zoom).toBe(4);
  });

  it('zoomTo100 ne fait rien si baseScale est 0', () => {
    useCanvasViewStore.getState().setBaseScale(0);
    useCanvasViewStore.getState().setZoom(2);
    useCanvasViewStore.getState().zoomTo100();

    expect(useCanvasViewStore.getState().zoom).toBe(2);
  });

  /* --- Enchaînements --- */

  it('plusieurs zoomIn successifs augmentent le zoom de manière composée', () => {
    useCanvasViewStore.getState().zoomIn();
    useCanvasViewStore.getState().zoomIn();
    const zoom = useCanvasViewStore.getState().zoom;
    expect(zoom).toBeCloseTo(1.2 * 1.2, 5);
  });

  it('zoomIn puis zoomOut revient au zoom initial', () => {
    useCanvasViewStore.getState().zoomIn();
    useCanvasViewStore.getState().zoomOut();
    const zoom = useCanvasViewStore.getState().zoom;
    expect(zoom).toBeCloseTo(1, 5);
  });
});
