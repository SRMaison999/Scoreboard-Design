/**
 * Hook pour le zoom et le panning du canvas en mode Layout libre.
 * - Ctrl+molette : zoom centré sur la position de la souris
 * - Espace+glisser : panning
 * - Bouton central de la souris : panning
 * - Curseur 'grab' quand Espace est maintenu
 */

import { useEffect, useRef, useCallback, useState, type RefObject } from 'react';
import { useCanvasViewStore } from '@/stores/canvasViewStore';

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const ZOOM_SENSITIVITY = 0.002;

interface UseCanvasZoomOptions {
  /** Référence vers le conteneur du canvas */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Le zoom/pan n'est actif que si cette valeur est true */
  enabled: boolean;
  /** Facteur de scale automatique (auto-fit) appliqué en dehors du zoom */
  baseScale: number;
}

interface UseCanvasZoomReturn {
  /** True quand l'utilisateur maintient Espace (curseur grab) */
  isSpaceHeld: boolean;
  /** True quand le panning est en cours */
  isPanning: boolean;
}

export function useCanvasZoom({
  containerRef,
  enabled,
  baseScale,
}: UseCanvasZoomOptions): UseCanvasZoomReturn {
  const setZoom = useCanvasViewStore((s) => s.setZoom);
  const setPan = useCanvasViewStore((s) => s.setPan);

  const [isSpaceHeld, setIsSpaceHeld] = useState(false);
  const isPanningRef = useRef(false);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  /* --- Zoom avec Ctrl+molette --- */

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!enabled || !e.ctrlKey) return;
      e.preventDefault();

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const state = useCanvasViewStore.getState();
      const oldZoom = state.zoom;
      const delta = -e.deltaY * ZOOM_SENSITIVITY;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, oldZoom * (1 + delta)));

      /* Zoom centré sur la position de la souris */
      const zoomRatio = newZoom / oldZoom;
      const newPanX = mouseX - zoomRatio * (mouseX - state.panX);
      const newPanY = mouseY - zoomRatio * (mouseY - state.panY);

      setZoom(newZoom);
      setPan(newPanX, newPanY);
    },
    [enabled, containerRef, setZoom, setPan],
  );

  /* --- Panning avec Espace+glisser ou bouton central --- */

  const startPan = useCallback(
    (clientX: number, clientY: number) => {
      const state = useCanvasViewStore.getState();
      isPanningRef.current = true;
      setIsPanning(true);
      panStartRef.current = {
        x: clientX,
        y: clientY,
        panX: state.panX,
        panY: state.panY,
      };
    },
    [],
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;

      /* Bouton central (molette) */
      if (e.button === 1) {
        e.preventDefault();
        startPan(e.clientX, e.clientY);
        return;
      }

      /* Espace maintenu + clic gauche */
      if (e.button === 0 && isSpaceHeld) {
        e.preventDefault();
        startPan(e.clientX, e.clientY);
      }
    },
    [enabled, isSpaceHeld, startPan],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPanningRef.current) return;

      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPan(panStartRef.current.panX + dx, panStartRef.current.panY + dy);
    },
    [setPan],
  );

  const handleMouseUp = useCallback(() => {
    isPanningRef.current = false;
    setIsPanning(false);
  }, []);

  /* --- Espace maintenu : curseur grab --- */

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      if (e.code === 'Space') {
        const target = e.target as HTMLElement;
        const isInput =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT';
        if (isInput) return;
        e.preventDefault();
        setIsSpaceHeld(true);
      }
    },
    [enabled],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpaceHeld(false);
        if (isPanningRef.current) {
          isPanningRef.current = false;
          setIsPanning(false);
        }
      }
    },
    [],
  );

  /* --- Empêcher le menu contextuel sur clic milieu --- */

  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;
      /* Le clic milieu peut déclencher un menu contextuel sur certains navigateurs */
      if (isPanningRef.current) {
        e.preventDefault();
      }
    },
    [enabled],
  );

  /* --- Enregistrement des écouteurs --- */

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    container.addEventListener('contextmenu', handleContextMenu);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      container.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [
    containerRef,
    enabled,
    baseScale,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleKeyDown,
    handleKeyUp,
    handleContextMenu,
  ]);

  return { isSpaceHeld, isPanning };
}
