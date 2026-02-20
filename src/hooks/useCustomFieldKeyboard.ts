/**
 * Hook pour les raccourcis clavier du mode Layout libre.
 * Supporte la multi-s\u00e9lection et les op\u00e9rations group\u00e9es.
 * G\u00e8re \u00e9galement le copier/couper/coller via le presse-papiers interne.
 */

import { useEffect, useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useUndoRedoStore, flushUndoSnapshot } from '@/stores/undoRedoStore';
import { useCanvasViewStore } from '@/stores/canvasViewStore';
import { useClipboardStore } from '@/stores/clipboardStore';

const MOVE_STEP = 1;
const MOVE_STEP_SHIFT = 10;
const EMPTY_IDS: readonly string[] = [];

export function useCustomFieldKeyboard() {
  const selectedIds = useScoreboardStore((s) => s.customFieldsData?.selectedFieldIds ?? EMPTY_IDS);
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const snapToGrid = useScoreboardStore((s) => s.customFieldsData.snapToGrid);
  const gridSize = useScoreboardStore((s) => s.customFieldsData.gridSize);
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const removeSelectedFields = useScoreboardStore((s) => s.removeSelectedFields);
  const duplicateSelectedFields = useScoreboardStore((s) => s.duplicateSelectedFields);
  const moveSelectedFields = useScoreboardStore((s) => s.moveSelectedFields);
  const selectAllFields = useScoreboardStore((s) => s.selectAllFields);
  const clearSelection = useScoreboardStore((s) => s.clearFieldSelection);
  const pasteFields = useScoreboardStore((s) => s.pasteFields);
  const undo = useUndoRedoStore((s) => s.undo);
  const redo = useUndoRedoStore((s) => s.redo);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (bodyType !== 14) return;

      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT';
      if (isInput) return;

      /* Undo / Redo : flush le snapshot en attente avant de restaurer */
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        flushUndoSnapshot();
        undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        flushUndoSnapshot();
        redo();
        return;
      }

      /* Zoom : Ctrl+0 ajuster, Ctrl+1 100%, Ctrl+= zoom in, Ctrl+- zoom out */
      if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        useCanvasViewStore.getState().zoomToFit();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        useCanvasViewStore.getState().zoomTo100();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        useCanvasViewStore.getState().zoomIn();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        useCanvasViewStore.getState().zoomOut();
        return;
      }

      /* Ctrl+A : tout s\u00e9lectionner */
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        selectAllFields();
        return;
      }

      /* Ctrl+V : coller */
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        const clipboard = useClipboardStore.getState();
        if (clipboard.copiedFields.length === 0) return;
        clipboard.incrementPasteCount();
        pasteFields(clipboard.copiedFields, clipboard.pasteCount);
        return;
      }

      /* \u00c9chap : d\u00e9s\u00e9lectionner tout */
      if (e.key === 'Escape') {
        e.preventDefault();
        clearSelection();
        return;
      }

      if (selectedIds.length === 0) return;

      /* Ctrl+C : copier */
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        const selected = fields.filter((f) => selectedIds.includes(f.id));
        useClipboardStore.getState().copyFields(selected);
        return;
      }

      /* Ctrl+X : couper */
      if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
        e.preventDefault();
        const selected = fields.filter((f) => selectedIds.includes(f.id));
        useClipboardStore.getState().copyFields(selected);
        removeSelectedFields();
        return;
      }

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

      /* Fl\u00e8ches : d\u00e9placer */
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
    [selectedIds, fields, snapToGrid, gridSize, bodyType, removeSelectedFields, duplicateSelectedFields, moveSelectedFields, selectAllFields, clearSelection, pasteFields, undo, redo],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
