/**
 * Hook pour le drag & drop natif des champs sur le canvas.
 * Gère le déplacement, le snap-to-grid et les contraintes de containment.
 */

import { useCallback, useRef } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';

interface DragState {
  fieldId: string;
  startMouseX: number;
  startMouseY: number;
  startFieldX: number;
  startFieldY: number;
}

export function useFieldDrag(scale: number) {
  const updatePosition = useScoreboardStore((s) => s.updateCustomFieldPosition);
  const selectField = useScoreboardStore((s) => s.selectCustomField);
  const snapToGrid = useScoreboardStore((s) => s.customFieldsData.snapToGrid);
  const gridSize = useScoreboardStore((s) => s.customFieldsData.gridSize);

  const dragRef = useRef<DragState | null>(null);

  const snapValue = useCallback(
    (value: number): number => {
      if (!snapToGrid) return Math.round(value);
      return Math.round(value / gridSize) * gridSize;
    },
    [snapToGrid, gridSize],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent, fieldId: string, fieldX: number, fieldY: number) => {
      e.stopPropagation();
      e.preventDefault();
      selectField(fieldId);

      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);

      dragRef.current = {
        fieldId,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startFieldX: fieldX,
        startFieldY: fieldY,
      };
    },
    [selectField],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      const dx = (e.clientX - drag.startMouseX) / scale;
      const dy = (e.clientY - drag.startMouseY) / scale;

      const newX = snapValue(drag.startFieldX + dx);
      const newY = snapValue(drag.startFieldY + dy);

      updatePosition(drag.fieldId, newX, newY);
    },
    [scale, snapValue, updatePosition],
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp };
}
