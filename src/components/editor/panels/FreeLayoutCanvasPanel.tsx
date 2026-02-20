/**
 * Panneau des options du canvas pour le mode Layout libre.
 * Contient les options de grille, guides, undo/redo et raccourcis.
 */

import { Undo2, Redo2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useUndoRedoStore } from '@/stores/undoRedoStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { GRID_SIZE_OPTIONS } from '@/types/customField';

export function FreeLayoutCanvasPanel() {
  const fullPageMode = useScoreboardStore((s) => s.customFieldsData.fullPageMode);
  const snapToGrid = useScoreboardStore((s) => s.customFieldsData.snapToGrid);
  const showGuides = useScoreboardStore((s) => s.customFieldsData.showGuides);
  const gridSize = useScoreboardStore((s) => s.customFieldsData.gridSize);
  const updateOption = useScoreboardStore((s) => s.updateCustomFieldsOption);
  const updateGridSize = useScoreboardStore((s) => s.updateCustomFieldsGridSize);
  const canUndo = useUndoRedoStore((s) => s.canUndo);
  const canRedo = useUndoRedoStore((s) => s.canRedo);
  const undo = useUndoRedoStore((s) => s.undo);
  const redo = useUndoRedoStore((s) => s.redo);

  return (
    <div className="flex flex-col h-full overflow-hidden" data-testid="free-layout-canvas-panel">
      <div className="px-4 py-3 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-300">
          {CUSTOM_FIELD_LABELS.freeLayoutTabCanvas}
        </h2>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-3">
        {/* Mode pleine page */}
        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={fullPageMode}
            onChange={(e) => updateOption('fullPageMode', e.target.checked)}
            className="accent-sky-300"
          />
          {CUSTOM_FIELD_LABELS.fullPageMode}
        </label>
        <p className="text-[11px] text-gray-500 -mt-2">
          {CUSTOM_FIELD_LABELS.fullPageModeHint}
        </p>

        {/* Grille */}
        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={snapToGrid}
            onChange={(e) => updateOption('snapToGrid', e.target.checked)}
            className="accent-sky-300"
          />
          {CUSTOM_FIELD_LABELS.snapToGrid}
        </label>

        {snapToGrid && (
          <div className="flex items-center gap-2 text-[13px] -mt-1">
            <span className="text-gray-400">{CUSTOM_FIELD_LABELS.gridSize}</span>
            <select
              value={gridSize}
              onChange={(e) => updateGridSize(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
            >
              {GRID_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}px</option>
              ))}
            </select>
          </div>
        )}

        {/* Guides */}
        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={showGuides}
            onChange={(e) => updateOption('showGuides', e.target.checked)}
            className="accent-sky-300"
          />
          {CUSTOM_FIELD_LABELS.showGuides}
        </label>

        {/* Undo / Redo */}
        <div className="flex items-center gap-1 mt-2 pt-3 border-t border-gray-800">
          <Button
            variant="ghost"
            className="flex items-center gap-1.5 px-3 py-1.5"
            onClick={undo}
            disabled={!canUndo}
            title={CUSTOM_FIELD_LABELS.undoRedoHint}
          >
            <Undo2 size={14} className="flex-shrink-0" />
            <span className="text-[12px]">{CUSTOM_FIELD_LABELS.undoAction}</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-1.5 px-3 py-1.5"
            onClick={redo}
            disabled={!canRedo}
            title={CUSTOM_FIELD_LABELS.undoRedoHint}
          >
            <Redo2 size={14} className="flex-shrink-0" />
            <span className="text-[12px]">{CUSTOM_FIELD_LABELS.redoAction}</span>
          </Button>
        </div>
        <p className="text-[10px] text-gray-600">
          {CUSTOM_FIELD_LABELS.undoRedoHint}
        </p>

        {/* Raccourcis */}
        <p className="text-[10px] text-gray-600 mt-1">
          {CUSTOM_FIELD_LABELS.keyboardShortcutsList}
        </p>
      </div>
    </div>
  );
}
