/**
 * Indicateur de coordonn\u00e9es du curseur sur le canvas.
 * Affich\u00e9 en bas \u00e0 droite du canvas pendant le mode \u00e9diteur.
 * Composant canvas : inline styles autoris\u00e9s.
 */

import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

interface CursorCoordinatesProps {
  readonly x: number;
  readonly y: number;
  readonly visible: boolean;
}

export function CursorCoordinates({ x, y, visible }: CursorCoordinatesProps) {
  if (!visible) return null;

  return (
    <div
      data-testid="cursor-coordinates"
      style={{
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        color: 'rgba(148, 163, 184, 1)',
        padding: '3px 8px',
        borderRadius: 4,
        fontSize: 11,
        fontFamily: 'monospace',
        pointerEvents: 'none',
        zIndex: 9998,
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {x},{y} {CUSTOM_FIELD_LABELS.rulerUnit}
    </div>
  );
}
