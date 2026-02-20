/**
 * Store Zustand pour le zoom et le panning du canvas en mode Layout libre (Body Type 14).
 * Non persisté : le zoom et le pan sont réinitialisés à chaque session.
 */

import { create } from 'zustand';

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const ZOOM_STEP = 1.2;

interface CanvasViewState {
  /** Facteur de zoom (1 = 100%, plage 0.25 à 4) */
  zoom: number;
  /** Décalage horizontal en pixels (espace écran) */
  panX: number;
  /** Décalage vertical en pixels (espace écran) */
  panY: number;
}

interface CanvasViewActions {
  /** Définit le zoom à une valeur précise (clampée entre MIN_ZOOM et MAX_ZOOM) */
  setZoom: (zoom: number) => void;
  /** Définit la position de pan */
  setPan: (x: number, y: number) => void;
  /** Zoom avant (zoom * 1.2) */
  zoomIn: () => void;
  /** Zoom arrière (zoom / 1.2) */
  zoomOut: () => void;
  /** Réinitialise le zoom à 1 et le pan à (0, 0) */
  zoomToFit: () => void;
  /** Réinitialise le zoom à 1 et le pan à (0, 0) */
  zoomTo100: () => void;
}

export type CanvasViewStore = CanvasViewState & CanvasViewActions;

function clampZoom(value: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

export const useCanvasViewStore = create<CanvasViewStore>((set) => ({
  zoom: 1,
  panX: 0,
  panY: 0,

  setZoom: (zoom: number) =>
    set({ zoom: clampZoom(zoom) }),

  setPan: (x: number, y: number) =>
    set({ panX: x, panY: y }),

  zoomIn: () =>
    set((s) => ({ zoom: clampZoom(s.zoom * ZOOM_STEP) })),

  zoomOut: () =>
    set((s) => ({ zoom: clampZoom(s.zoom / ZOOM_STEP) })),

  zoomToFit: () =>
    set({ zoom: 1, panX: 0, panY: 0 }),

  zoomTo100: () =>
    set({ zoom: 1, panX: 0, panY: 0 }),
}));
