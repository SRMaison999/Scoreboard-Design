/**
 * Overlay de s\u00e9lection de zone pour le canvas Layout libre.
 * Affiche le rectangle de s\u00e9lection et l'indication textuelle.
 * Composant canvas : inline styles autoris\u00e9s.
 */

import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

interface ZoneRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

interface ZoneSelectionOverlayProps {
  readonly drawing: boolean;
  readonly currentRect: ZoneRect | null;
}

export function ZoneSelectionOverlay({ drawing, currentRect }: ZoneSelectionOverlayProps) {
  return (
    <div
      data-testid="zone-selection-overlay"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(56, 189, 248, 0.05)',
        pointerEvents: 'none',
        zIndex: 10000,
      }}
    >
      {currentRect && (
        <div
          data-testid="zone-selection-rect"
          style={{
            position: 'absolute',
            left: currentRect.x,
            top: currentRect.y,
            width: currentRect.width,
            height: currentRect.height,
            border: '2px dashed rgba(56, 189, 248, 0.8)',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            borderRadius: 4,
          }}
        />
      )}
      {!drawing && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          color: 'rgba(56, 189, 248, 1)',
          padding: '12px 28px',
          borderRadius: 8,
          fontSize: 20,
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}>
          {CUSTOM_FIELD_LABELS.zoneSelectHint}
        </div>
      )}
    </div>
  );
}
