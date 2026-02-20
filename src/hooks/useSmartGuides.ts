/**
 * Hook pour les guides dynamiques (smart guides) du mode Layout libre.
 * Detecte l'alignement des champs avec les bords et centres des autres champs
 * et du canvas. Retourne les guides a afficher et les positions snappees.
 */

import { useMemo, useCallback } from 'react';
import type { CustomField } from '@/types/customField';

const SNAP_THRESHOLD = 6;

export interface GuideLine {
  readonly orientation: 'horizontal' | 'vertical';
  /** Position en pixels sur l'axe perpendiculaire */
  readonly position: number;
  /** Debut du segment */
  readonly start: number;
  /** Fin du segment */
  readonly end: number;
}

interface SnapResult {
  readonly x: number;
  readonly y: number;
  readonly guides: readonly GuideLine[];
}

interface EdgeSet {
  readonly left: number;
  readonly centerX: number;
  readonly right: number;
  readonly top: number;
  readonly centerY: number;
  readonly bottom: number;
}

function fieldEdges(f: { x: number; y: number; width: number; height: number }): EdgeSet {
  return {
    left: f.x,
    centerX: f.x + f.width / 2,
    right: f.x + f.width,
    top: f.y,
    centerY: f.y + f.height / 2,
    bottom: f.y + f.height,
  };
}

export function useSmartGuides(
  fields: readonly CustomField[],
  draggedIds: readonly string[],
  canvasWidth: number,
  canvasHeight: number,
  enabled: boolean,
) {
  /** Precalculer les edges de tous les champs non-dragues */
  const otherEdges = useMemo(() => {
    if (!enabled) return [];
    const dragSet = new Set(draggedIds);
    return fields
      .filter((f) => !dragSet.has(f.id) && f.visible)
      .map((f) => fieldEdges(f));
  }, [fields, draggedIds, enabled]);

  /** Ajouter les edges du canvas lui-meme */
  const canvasEdges = useMemo((): EdgeSet => ({
    left: 0,
    centerX: canvasWidth / 2,
    right: canvasWidth,
    top: 0,
    centerY: canvasHeight / 2,
    bottom: canvasHeight,
  }), [canvasWidth, canvasHeight]);

  const computeSnap = useCallback((
    movingRect: { x: number; y: number; width: number; height: number },
  ): SnapResult => {
    if (!enabled) {
      return { x: movingRect.x, y: movingRect.y, guides: [] };
    }

    const me = fieldEdges(movingRect);
    const guides: GuideLine[] = [];
    let snapX: number | null = null;
    let snapY: number | null = null;
    let bestDx = SNAP_THRESHOLD + 1;
    let bestDy = SNAP_THRESHOLD + 1;

    const allEdges = [canvasEdges, ...otherEdges];

    for (const other of allEdges) {
      /* Snap vertical (alignement sur X) */
      const xPairs: [number, number][] = [
        [me.left, other.left],
        [me.left, other.centerX],
        [me.left, other.right],
        [me.centerX, other.left],
        [me.centerX, other.centerX],
        [me.centerX, other.right],
        [me.right, other.left],
        [me.right, other.centerX],
        [me.right, other.right],
      ];

      for (const [mEdge, oEdge] of xPairs) {
        const d = Math.abs(mEdge - oEdge);
        if (d < bestDx) {
          bestDx = d;
          snapX = movingRect.x + (oEdge - mEdge);
        }
      }

      /* Snap horizontal (alignement sur Y) */
      const yPairs: [number, number][] = [
        [me.top, other.top],
        [me.top, other.centerY],
        [me.top, other.bottom],
        [me.centerY, other.top],
        [me.centerY, other.centerY],
        [me.centerY, other.bottom],
        [me.bottom, other.top],
        [me.bottom, other.centerY],
        [me.bottom, other.bottom],
      ];

      for (const [mEdge, oEdge] of yPairs) {
        const d = Math.abs(mEdge - oEdge);
        if (d < bestDy) {
          bestDy = d;
          snapY = movingRect.y + (oEdge - mEdge);
        }
      }
    }

    const finalX = bestDx <= SNAP_THRESHOLD && snapX !== null ? snapX : movingRect.x;
    const finalY = bestDy <= SNAP_THRESHOLD && snapY !== null ? snapY : movingRect.y;

    /* Generer les lignes de guide pour les snaps actifs */
    if (bestDx <= SNAP_THRESHOLD && snapX !== null) {
      const snappedEdges = fieldEdges({ ...movingRect, x: finalX });
      for (const other of allEdges) {
        const matchingXPositions = [other.left, other.centerX, other.right];
        for (const pos of matchingXPositions) {
          if (
            Math.abs(snappedEdges.left - pos) < 1 ||
            Math.abs(snappedEdges.centerX - pos) < 1 ||
            Math.abs(snappedEdges.right - pos) < 1
          ) {
            const minY = Math.min(snappedEdges.top, other.top);
            const maxY = Math.max(snappedEdges.bottom, other.bottom);
            guides.push({
              orientation: 'vertical',
              position: pos,
              start: minY,
              end: maxY,
            });
          }
        }
      }
    }

    if (bestDy <= SNAP_THRESHOLD && snapY !== null) {
      const snappedEdges = fieldEdges({ ...movingRect, y: finalY });
      for (const other of allEdges) {
        const matchingYPositions = [other.top, other.centerY, other.bottom];
        for (const pos of matchingYPositions) {
          if (
            Math.abs(snappedEdges.top - pos) < 1 ||
            Math.abs(snappedEdges.centerY - pos) < 1 ||
            Math.abs(snappedEdges.bottom - pos) < 1
          ) {
            const minX = Math.min(snappedEdges.left, other.left);
            const maxX = Math.max(snappedEdges.right, other.right);
            guides.push({
              orientation: 'horizontal',
              position: pos,
              start: minX,
              end: maxX,
            });
          }
        }
      }
    }

    return { x: finalX, y: finalY, guides };
  }, [enabled, canvasEdges, otherEdges]);

  return { computeSnap };
}
