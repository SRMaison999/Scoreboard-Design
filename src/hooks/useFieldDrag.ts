/**
 * Hook pour le drag & drop natif des champs sur le canvas.
 * Supporte le deplacement individuel et multi-selection.
 * Integre les smart guides pour le snapping aux elements.
 */

import { useCallback, useRef, useState } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useSmartGuides, type GuideLine } from '@/hooks/useSmartGuides';
import type { CustomField } from '@/types/customField';

interface DragState {
  fieldId: string;
  startMouseX: number;
  startMouseY: number;
  startPositions: ReadonlyMap<string, { x: number; y: number; width: number; height: number }>;
  /** ID du champ primaire (celui sous le curseur) pour le calcul de snap */
  primaryFieldSize: { width: number; height: number };
}

export function useFieldDrag(scale: number) {
  const updatePosition = useScoreboardStore((s) => s.updateCustomFieldPosition);
  const selectField = useScoreboardStore((s) => s.selectCustomField);
  const toggleSelection = useScoreboardStore((s) => s.toggleFieldSelection);
  const selectedIds = useScoreboardStore((s) => s.customFieldsData.selectedFieldIds);
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const snapToGrid = useScoreboardStore((s) => s.customFieldsData.snapToGrid);
  const gridSize = useScoreboardStore((s) => s.customFieldsData.gridSize);
  const canvasW = useScoreboardStore((s) => s.templateWidth);
  const canvasH = useScoreboardStore((s) => s.templateHeight);

  const dragRef = useRef<DragState | null>(null);
  const [activeGuides, setActiveGuides] = useState<readonly GuideLine[]>([]);
  const [draggedFieldIds, setDraggedFieldIds] = useState<readonly string[]>([]);

  const { computeSnap } = useSmartGuides(fields, draggedFieldIds, canvasW, canvasH, !snapToGrid);

  const snapValue = useCallback(
    (value: number): number => {
      if (!snapToGrid) return Math.round(value);
      return Math.round(value / gridSize) * gridSize;
    },
    [snapToGrid, gridSize],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent, fieldId: string, _fieldX: number, _fieldY: number) => {
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

      const idsToMove = isCtrl
        ? (isAlreadySelected ? selectedIds.filter((id) => id !== fieldId) : [...selectedIds, fieldId])
        : (isAlreadySelected ? selectedIds : [fieldId]);

      const startPositions = new Map<string, { x: number; y: number; width: number; height: number }>();
      for (const id of idsToMove) {
        const f = fields.find((field: CustomField) => field.id === id);
        if (f && !f.locked) {
          startPositions.set(id, { x: f.x, y: f.y, width: f.width, height: f.height });
        }
      }

      const primaryField = fields.find((f) => f.id === fieldId);
      setDraggedFieldIds([...idsToMove]);

      dragRef.current = {
        fieldId,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startPositions,
        primaryFieldSize: {
          width: primaryField?.width ?? 100,
          height: primaryField?.height ?? 100,
        },
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

      /* Calculer la position du champ primaire pour le smart snap */
      const primaryStart = drag.startPositions.get(drag.fieldId);
      if (!primaryStart) return;

      let primaryX: number;
      let primaryY: number;

      if (snapToGrid) {
        /* En mode grille, utiliser le snap classique */
        primaryX = snapValue(primaryStart.x + dx);
        primaryY = snapValue(primaryStart.y + dy);
        setActiveGuides([]);
      } else {
        /* En mode libre, utiliser les smart guides */
        const result = computeSnap({
          x: Math.round(primaryStart.x + dx),
          y: Math.round(primaryStart.y + dy),
          width: drag.primaryFieldSize.width,
          height: drag.primaryFieldSize.height,
        });
        primaryX = result.x;
        primaryY = result.y;
        setActiveGuides(result.guides);
      }

      /* Appliquer le meme delta a tous les champs deplacer */
      const actualDx = primaryX - primaryStart.x;
      const actualDy = primaryY - primaryStart.y;

      for (const [id, start] of drag.startPositions) {
        if (id === drag.fieldId) {
          updatePosition(id, primaryX, primaryY);
        } else {
          updatePosition(id, Math.round(start.x + actualDx), Math.round(start.y + actualDy));
        }
      }
    },
    [scale, snapToGrid, snapValue, computeSnap, updatePosition],
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
    setActiveGuides([]);
    setDraggedFieldIds([]);
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp, activeGuides, isDragging: draggedFieldIds.length > 0 };
}
