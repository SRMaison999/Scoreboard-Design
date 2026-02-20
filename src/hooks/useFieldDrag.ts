/**
 * Hook pour le drag & drop natif des champs sur le canvas.
 * Supporte le déplacement individuel et multi-sélection.
 * Gère le snap-to-grid et les contraintes de containment.
 */

import { useCallback, useRef } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { CustomField } from '@/types/customField';

interface DragState {
  fieldId: string;
  startMouseX: number;
  startMouseY: number;
  /** Positions initiales de TOUS les champs déplacés */
  startPositions: ReadonlyMap<string, { x: number; y: number }>;
}

export function useFieldDrag(scale: number) {
  const updatePosition = useScoreboardStore((s) => s.updateCustomFieldPosition);
  const selectField = useScoreboardStore((s) => s.selectCustomField);
  const toggleSelection = useScoreboardStore((s) => s.toggleFieldSelection);
  const selectedIds = useScoreboardStore((s) => s.customFieldsData.selectedFieldIds);
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
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

      const isCtrl = e.ctrlKey || e.metaKey;
      const isAlreadySelected = selectedIds.includes(fieldId);

      if (isCtrl) {
        toggleSelection(fieldId);
      } else if (!isAlreadySelected) {
        selectField(fieldId);
      }

      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);

      /* Collecter les positions initiales des champs a deplacer */
      const idsToMove = isCtrl
        ? (isAlreadySelected ? selectedIds.filter((id) => id !== fieldId) : [...selectedIds, fieldId])
        : (isAlreadySelected ? selectedIds : [fieldId]);

      const startPositions = new Map<string, { x: number; y: number }>();
      for (const id of idsToMove) {
        const f = fields.find((field: CustomField) => field.id === id);
        if (f && !f.locked) {
          startPositions.set(id, { x: f.x, y: f.y });
        }
      }

      dragRef.current = {
        fieldId,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startPositions,
      };
    },
    [selectField, toggleSelection, selectedIds, fields],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      const dx = (e.clientX - drag.startMouseX) / scale;
      const dy = (e.clientY - drag.startMouseY) / scale;

      for (const [id, start] of drag.startPositions) {
        const newX = snapValue(start.x + dx);
        const newY = snapValue(start.y + dy);
        updatePosition(id, newX, newY);
      }
    },
    [scale, snapValue, updatePosition],
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp };
}
