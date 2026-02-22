/**
 * Barre de contrôle du zoom, positionnée en bas de la zone de preview.
 * Affiche le pourcentage de zoom et des boutons pour zoomer, ajuster à l'écran et réinitialiser à 100%.
 */

import { ZoomIn, ZoomOut, Maximize2, Scan, Undo2, Redo2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCanvasViewStore } from '@/stores/canvasViewStore';
import { useUndoRedoStore } from '@/stores/undoRedoStore';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

export function ZoomBar() {
  const zoom = useCanvasViewStore((s) => s.zoom);
  const baseScale = useCanvasViewStore((s) => s.baseScale);
  const zoomIn = useCanvasViewStore((s) => s.zoomIn);
  const zoomOut = useCanvasViewStore((s) => s.zoomOut);
  const zoomToFit = useCanvasViewStore((s) => s.zoomToFit);
  const zoomTo100 = useCanvasViewStore((s) => s.zoomTo100);

  const isLayoutLibre = useScoreboardStore((s) => s.bodyType === 14);
  const canUndo = useUndoRedoStore((s) => s.canUndo);
  const canRedo = useUndoRedoStore((s) => s.canRedo);
  const undo = useUndoRedoStore((s) => s.undo);
  const redo = useUndoRedoStore((s) => s.redo);

  const zoomPercent = Math.round(zoom * baseScale * 100);

  return (
    <div
      data-testid="zoom-bar"
      className={cn(
        'absolute bottom-3 left-1/2 -translate-x-1/2 z-10',
        'flex items-center gap-2',
        'bg-gray-900/90 border border-gray-700 rounded-lg',
        'px-3 py-1.5 backdrop-blur-sm',
      )}
    >
      <button
        type="button"
        onClick={zoomOut}
        title={CUSTOM_FIELD_LABELS.zoomOut}
        aria-label={CUSTOM_FIELD_LABELS.zoomOut}
        className={cn(
          'p-1 rounded text-gray-400 hover:text-gray-100',
          'hover:bg-gray-700 transition-colors',
        )}
      >
        <ZoomOut size={18} className="flex-shrink-0" />
      </button>

      <span
        data-testid="zoom-percentage"
        className="text-sm text-gray-300 tabular-nums min-w-[4rem] text-center select-none font-medium"
      >
        {zoomPercent}
        {'\u00a0%'}
      </span>

      <button
        type="button"
        onClick={zoomIn}
        title={CUSTOM_FIELD_LABELS.zoomIn}
        aria-label={CUSTOM_FIELD_LABELS.zoomIn}
        className={cn(
          'p-1 rounded text-gray-400 hover:text-gray-100',
          'hover:bg-gray-700 transition-colors',
        )}
      >
        <ZoomIn size={18} className="flex-shrink-0" />
      </button>

      {isLayoutLibre && (
        <>
          <div className="w-px h-4 bg-gray-700 mx-0.5" />
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo}
            title={`${CUSTOM_FIELD_LABELS.undoAction} (Ctrl+Z)`}
            aria-label={`${CUSTOM_FIELD_LABELS.undoAction} (Ctrl+Z)`}
            className={cn(
              'p-1 rounded transition-colors',
              canUndo ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-700' : 'text-gray-600 cursor-not-allowed',
            )}
          >
            <Undo2 size={16} className="flex-shrink-0" />
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={!canRedo}
            title={`${CUSTOM_FIELD_LABELS.redoAction} (Ctrl+Y)`}
            aria-label={`${CUSTOM_FIELD_LABELS.redoAction} (Ctrl+Y)`}
            className={cn(
              'p-1 rounded transition-colors',
              canRedo ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-700' : 'text-gray-600 cursor-not-allowed',
            )}
          >
            <Redo2 size={16} className="flex-shrink-0" />
          </button>
        </>
      )}

      <div className="w-px h-4 bg-gray-700 mx-0.5" />

      <button
        type="button"
        onClick={zoomToFit}
        title={`${CUSTOM_FIELD_LABELS.zoomToFit} (Ctrl+0)`}
        aria-label={`${CUSTOM_FIELD_LABELS.zoomToFit} (Ctrl+0)`}
        className={cn(
          'p-1 rounded text-gray-400 hover:text-gray-100',
          'hover:bg-gray-700 transition-colors',
        )}
      >
        <Maximize2 size={18} className="flex-shrink-0" />
      </button>

      <button
        type="button"
        onClick={zoomTo100}
        title={`${CUSTOM_FIELD_LABELS.zoom100} (Ctrl+1)`}
        aria-label={`${CUSTOM_FIELD_LABELS.zoom100} (Ctrl+1)`}
        className={cn(
          'p-1 rounded text-gray-400 hover:text-gray-100',
          'hover:bg-gray-700 transition-colors',
        )}
      >
        <Scan size={18} className="flex-shrink-0" />
      </button>
    </div>
  );
}
