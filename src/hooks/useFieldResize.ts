/**
 * Hook pour le redimensionnement des champs sur le canvas.
 * Gere les 8 poignees (4 coins + 4 bords), les contraintes de taille,
 * le verrouillage de ratio, et les modificateurs Shift (proportionnel) / Alt (centre).
 */

import { useCallback, useRef } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { ResizeHandle } from '@/types/customField';

interface ResizeState {
  fieldId: string;
  handle: ResizeHandle;
  startMouseX: number;
  startMouseY: number;
  startX: number;
  startY: number;
  startW: number;
  startH: number;
  aspectRatio: number;
  lockAspectRatio: boolean;
  centerX: number;
  centerY: number;
}

const MIN_SIZE = 40;

function isCornerHandle(handle: ResizeHandle): boolean {
  return handle === 'top-left' || handle === 'top-right'
    || handle === 'bottom-left' || handle === 'bottom-right';
}

export function useFieldResize(scale: number) {
  const updatePosition = useScoreboardStore((s) => s.updateCustomFieldPosition);
  const updateSize = useScoreboardStore((s) => s.updateCustomFieldSize);
  const snapToGrid = useScoreboardStore((s) => s.customFieldsData.snapToGrid);
  const gridSize = useScoreboardStore((s) => s.customFieldsData.gridSize);
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);

  const resizeRef = useRef<ResizeState | null>(null);

  const snapValue = useCallback(
    (value: number): number => {
      if (!snapToGrid) return Math.round(value);
      return Math.round(value / gridSize) * gridSize;
    },
    [snapToGrid, gridSize],
  );

  const onResizeStart = useCallback(
    (
      e: React.PointerEvent,
      fieldId: string,
      handle: ResizeHandle,
      fieldX: number,
      fieldY: number,
      fieldW: number,
      fieldH: number,
    ) => {
      e.stopPropagation();
      e.preventDefault();

      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);

      const field = fields.find((f) => f.id === fieldId);

      resizeRef.current = {
        fieldId,
        handle,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startX: fieldX,
        startY: fieldY,
        startW: fieldW,
        startH: fieldH,
        aspectRatio: fieldW / Math.max(fieldH, 1),
        lockAspectRatio: field?.lockAspectRatio ?? false,
        centerX: fieldX + fieldW / 2,
        centerY: fieldY + fieldH / 2,
      };
    },
    [fields],
  );

  const onResizeMove = useCallback(
    (e: React.PointerEvent) => {
      const rs = resizeRef.current;
      if (!rs) return;

      const dx = (e.clientX - rs.startMouseX) / scale;
      const dy = (e.clientY - rs.startMouseY) / scale;
      const shiftHeld = e.shiftKey;
      const altHeld = e.altKey;

      let newX = rs.startX;
      let newY = rs.startY;
      let newW = rs.startW;
      let newH = rs.startH;

      /* --- Calcul des nouvelles dimensions selon la poignee --- */
      if (rs.handle.includes('right')) {
        newW = snapValue(rs.startW + dx);
      }
      if (rs.handle.includes('left')) {
        newW = snapValue(rs.startW - dx);
        newX = snapValue(rs.startX + dx);
      }
      if (rs.handle.includes('bottom')) {
        newH = snapValue(rs.startH + dy);
      }
      if (rs.handle.includes('top')) {
        newH = snapValue(rs.startH - dy);
        newY = snapValue(rs.startY + dy);
      }

      /* Taille minimale */
      newW = Math.max(MIN_SIZE, newW);
      newH = Math.max(MIN_SIZE, newH);

      /* --- Verrouillage proportionnel (champ ou Shift) --- */
      const forceProportional = shiftHeld || rs.lockAspectRatio;
      if (forceProportional && isCornerHandle(rs.handle)) {
        const absW = Math.abs(dx);
        const absH = Math.abs(dy);
        if (absW >= absH) {
          newH = Math.max(MIN_SIZE, Math.round(newW / rs.aspectRatio));
          if (rs.handle.includes('top')) {
            newY = rs.startY + rs.startH - newH;
          }
        } else {
          newW = Math.max(MIN_SIZE, Math.round(newH * rs.aspectRatio));
          if (rs.handle.includes('left')) {
            newX = rs.startX + rs.startW - newW;
          }
        }
      } else if (forceProportional && !isCornerHandle(rs.handle)) {
        /* Poignees de bord avec proportionnel : ajuster l'autre axe */
        if (rs.handle === 'left' || rs.handle === 'right') {
          newH = Math.max(MIN_SIZE, Math.round(newW / rs.aspectRatio));
        } else {
          newW = Math.max(MIN_SIZE, Math.round(newH * rs.aspectRatio));
        }
      }

      /* --- Redimensionnement depuis le centre (Alt) --- */
      if (altHeld) {
        newX = Math.round(rs.centerX - newW / 2);
        newY = Math.round(rs.centerY - newH / 2);

        /* Ajuster si on depasse les limites negatives */
        if (newX < 0) {
          const overflow = -newX;
          newX = 0;
          newW = newW - overflow;
        }
        if (newY < 0) {
          const overflow = -newY;
          newY = 0;
          newH = newH - overflow;
        }
      } else {
        /* Limites classiques sans Alt */
        if (rs.handle.includes('left') && newX < 0) {
          newW = newW + newX;
          newX = 0;
        }
        if (rs.handle.includes('top') && newY < 0) {
          newH = newH + newY;
          newY = 0;
        }
      }

      updatePosition(rs.fieldId, newX, newY);
      updateSize(rs.fieldId, newW, newH);
    },
    [scale, snapValue, updatePosition, updateSize],
  );

  const onResizeEnd = useCallback(() => {
    resizeRef.current = null;
  }, []);

  return { onResizeStart, onResizeMove, onResizeEnd };
}
