/**
 * Barre de contrôle du zoom, positionnée en bas de la zone de preview.
 * Affiche le pourcentage de zoom et des boutons pour zoomer, ajuster à l'écran et réinitialiser à 100%.
 */

import { ZoomIn, ZoomOut, Maximize2, Scan } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCanvasViewStore } from '@/stores/canvasViewStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

export function ZoomBar() {
  const zoom = useCanvasViewStore((s) => s.zoom);
  const zoomIn = useCanvasViewStore((s) => s.zoomIn);
  const zoomOut = useCanvasViewStore((s) => s.zoomOut);
  const zoomToFit = useCanvasViewStore((s) => s.zoomToFit);
  const zoomTo100 = useCanvasViewStore((s) => s.zoomTo100);

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div
      data-testid="zoom-bar"
      className={cn(
        'absolute bottom-3 left-1/2 -translate-x-1/2 z-10',
        'flex items-center gap-1.5',
        'bg-gray-900/90 border border-gray-700 rounded-lg',
        'px-2 py-1 backdrop-blur-sm',
      )}
    >
      <button
        type="button"
        onClick={zoomOut}
        title={CUSTOM_FIELD_LABELS.zoomOut}
        className={cn(
          'p-1 rounded text-gray-400 hover:text-gray-100',
          'hover:bg-gray-700 transition-colors',
        )}
      >
        <ZoomOut size={16} className="flex-shrink-0" />
      </button>

      <span
        data-testid="zoom-percentage"
        className="text-xs text-gray-300 tabular-nums min-w-[3.5rem] text-center select-none"
      >
        {zoomPercent}
        {'\u00a0%'}
      </span>

      <button
        type="button"
        onClick={zoomIn}
        title={CUSTOM_FIELD_LABELS.zoomIn}
        className={cn(
          'p-1 rounded text-gray-400 hover:text-gray-100',
          'hover:bg-gray-700 transition-colors',
        )}
      >
        <ZoomIn size={16} className="flex-shrink-0" />
      </button>

      <div className="w-px h-4 bg-gray-700 mx-0.5" />

      <button
        type="button"
        onClick={zoomToFit}
        title={`${CUSTOM_FIELD_LABELS.zoomToFit} (Ctrl+0)`}
        className={cn(
          'p-1 rounded text-gray-400 hover:text-gray-100',
          'hover:bg-gray-700 transition-colors',
        )}
      >
        <Maximize2 size={16} className="flex-shrink-0" />
      </button>

      <button
        type="button"
        onClick={zoomTo100}
        title={`${CUSTOM_FIELD_LABELS.zoom100} (Ctrl+1)`}
        className={cn(
          'p-1 rounded text-gray-400 hover:text-gray-100',
          'hover:bg-gray-700 transition-colors',
        )}
      >
        <Scan size={16} className="flex-shrink-0" />
      </button>
    </div>
  );
}
