/**
 * Hook pour les raccourcis clavier du mode Layout libre.
 * Supporte la multi-selection et les operations groupees.
 */

import { useEffect, useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useUndoRedoStore } from '@/stores/undoRedoStore';

const MOVE_STEP = 1;
const MOVE_STEP_SHIFT = 10;

export function useCustomFieldKeyboard() {
  const selectedIds = useScoreboardStore((s) => s.customFieldsData.selectedFieldIds);
  const snapToGrid = useScoreboardStore((s) => s.customFieldsData.snapToGrid);
  const gridSize = useScoreboardStore((s) => s.customFieldsData.gridSize);
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const removeSelectedFields = useScoreboardStore((s) => s.removeSelectedFields);
  const duplicateSelectedFields = useScoreboardStore((s) => s.duplicateSelectedFields);
  const moveSelectedFields = useScoreboardStore((s) => s.moveSelectedFields);
  const selectAllFields = useScoreboardStore((s) => s.selectAllFields);
  const clearSelection = useScoreboardStore((s) => s.clearFieldSelection);
  const undo = useUndoRedoStore((s) => s.undo);
  const redo = useUndoRedoStore((s) => s.redo);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (bodyType !== 14) return;

      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT';
      if (isInput) return;

      /* Undo / Redo : toujours actifs */
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

      /* Ctrl+A : tout selectionner */
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        selectAllFields();
        return;
      }

      /* Echap : deselectionner tout */
      if (e.key === 'Escape') {
        e.preventDefault();
        clearSelection();
        return;
      }

      if (selectedIds.length === 0) return;

      /* Supprimer */
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        removeSelectedFields();
        return;
      }

      /* Ctrl+D : dupliquer */
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        duplicateSelectedFields();
        return;
      }

      /* Fleches : deplacer */
      const step = e.shiftKey ? MOVE_STEP_SHIFT : (snapToGrid ? gridSize : MOVE_STEP);

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveSelectedFields(-step, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveSelectedFields(step, 0);
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveSelectedFields(0, -step);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveSelectedFields(0, step);
          break;
      }
    },
    [selectedIds, snapToGrid, gridSize, bodyType, removeSelectedFields, duplicateSelectedFields, moveSelectedFields, selectAllFields, clearSelection, undo, redo],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
