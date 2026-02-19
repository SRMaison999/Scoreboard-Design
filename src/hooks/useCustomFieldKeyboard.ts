/**
 * Hook pour les raccourcis clavier du mode Layout libre.
 * Gere Suppr (supprimer), Ctrl+D (dupliquer), fleches (deplacer).
 */

import { useEffect, useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useUndoRedoStore } from '@/stores/undoRedoStore';

const MOVE_STEP = 1;
const MOVE_STEP_SHIFT = 10;

export function useCustomFieldKeyboard() {
  const selectedId = useScoreboardStore((s) => s.customFieldsData.selectedFieldId);
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const snapToGrid = useScoreboardStore((s) => s.customFieldsData.snapToGrid);
  const gridSize = useScoreboardStore((s) => s.customFieldsData.gridSize);
  const removeField = useScoreboardStore((s) => s.removeCustomField);
  const duplicateField = useScoreboardStore((s) => s.duplicateCustomField);
  const updatePosition = useScoreboardStore((s) => s.updateCustomFieldPosition);
  const undo = useUndoRedoStore((s) => s.undo);
  const redo = useUndoRedoStore((s) => s.redo);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT';
      if (isInput) return;

      /* Undo / Redo : toujours actifs, même sans champ sélectionné */
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
        return;
      }

      if (!selectedId) return;

      const field = fields.find((f) => f.id === selectedId);
      if (!field) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        removeField(selectedId);
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        duplicateField(selectedId);
        return;
      }

      if (field.locked) return;

      const step = e.shiftKey ? MOVE_STEP_SHIFT : (snapToGrid ? gridSize : MOVE_STEP);

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          updatePosition(selectedId, field.x - step, field.y);
          break;
        case 'ArrowRight':
          e.preventDefault();
          updatePosition(selectedId, field.x + step, field.y);
          break;
        case 'ArrowUp':
          e.preventDefault();
          updatePosition(selectedId, field.x, field.y - step);
          break;
        case 'ArrowDown':
          e.preventDefault();
          updatePosition(selectedId, field.x, field.y + step);
          break;
      }
    },
    [selectedId, fields, snapToGrid, gridSize, removeField, duplicateField, updatePosition, undo, redo],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
