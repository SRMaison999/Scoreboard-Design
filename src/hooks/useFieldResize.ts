/**
 * Hook pour le redimensionnement des champs sur le canvas.
 * Gère les 4 poignées de coin et les contraintes de taille.
 */

import { useCallback, useRef } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';

type ResizeHandle = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ResizeState {
  fieldId: string;
  handle: ResizeHandle;
  startMouseX: number;
  startMouseY: number;
  startX: number;
  startY: number;
  startW: number;
  startH: number;
}

export function useFieldResize(scale: number) {
  const updatePosition = useScoreboardStore((s) => s.updateCustomFieldPosition);
  const updateSize = useScoreboardStore((s) => s.updateCustomFieldSize);
  const snapToGrid = useScoreboardStore((s) => s.customFieldsData.snapToGrid);
  const gridSize = useScoreboardStore((s) => s.customFieldsData.gridSize);

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

      resizeRef.current = {
        fieldId,
        handle,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startX: fieldX,
        startY: fieldY,
        startW: fieldW,
        startH: fieldH,
      };
    },
    [],
  );

  const onResizeMove = useCallback(
    (e: React.PointerEvent) => {
      const rs = resizeRef.current;
      if (!rs) return;

      const dx = (e.clientX - rs.startMouseX) / scale;
      const dy = (e.clientY - rs.startMouseY) / scale;

      let newX = rs.startX;
      let newY = rs.startY;
      let newW = rs.startW;
      let newH = rs.startH;

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

      newW = Math.max(40, newW);
      newH = Math.max(40, newH);

      if (rs.handle.includes('left') && newX < 0) {
        newW = newW + newX;
        newX = 0;
      }
      if (rs.handle.includes('top') && newY < 0) {
        newH = newH + newY;
        newY = 0;
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
