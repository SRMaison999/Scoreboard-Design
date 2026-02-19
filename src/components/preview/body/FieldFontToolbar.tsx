/**
 * Barre flottante de contrôle de taille de police.
 * Apparaît au-dessus du champ sélectionné sur le canvas.
 * Rendu dans le canvas (inline styles autorisés).
 */

import { Minus, Plus } from 'lucide-react';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

interface FieldFontToolbarProps {
  readonly fontSize: number;
  readonly isGlobal: boolean;
  readonly fieldX: number;
  readonly fieldY: number;
  readonly fieldWidth: number;
  readonly canvasScale: number;
  readonly onIncrease: (shift?: boolean) => void;
  readonly onDecrease: (shift?: boolean) => void;
}

const TOOLBAR_HEIGHT = 28;
const TOOLBAR_GAP = 6;

export function FieldFontToolbar({
  fontSize,
  isGlobal,
  fieldX,
  fieldY,
  fieldWidth,
  canvasScale,
  onIncrease,
  onDecrease,
}: FieldFontToolbarProps) {
  /* Positionnement au-dessus du champ, centré horizontalement */
  const toolbarTop = fieldY - (TOOLBAR_HEIGHT + TOOLBAR_GAP) / canvasScale;
  const showBelow = toolbarTop < 0;
  const inverseScale = 1 / canvasScale;

  const top = showBelow
    ? fieldY - TOOLBAR_GAP / canvasScale
    : fieldY;
  const translateY = showBelow ? '8px' : `calc(-100% - ${TOOLBAR_GAP}px)`;

  return (
    <div
      data-testid="field-font-toolbar"
      style={{
        position: 'absolute',
        left: fieldX + fieldWidth / 2,
        top,
        transform: `translate(-50%, ${translateY}) scale(${inverseScale})`,
        transformOrigin: 'center bottom',
        zIndex: 10000,
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.5)',
          borderRadius: 6,
          padding: '2px 4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          whiteSpace: 'nowrap',
        }}
      >
        <button
          type="button"
          title={CUSTOM_FIELD_LABELS.fontToolbarDecrease}
          onClick={(e) => {
            e.stopPropagation();
            onDecrease(e.shiftKey);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 22,
            border: 'none',
            borderRadius: 4,
            backgroundColor: 'transparent',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          <Minus size={12} />
        </button>

        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: isGlobal ? '#64748b' : '#e2e8f0',
            minWidth: 32,
            textAlign: 'center',
            fontFamily: 'monospace',
            userSelect: 'none',
          }}
          title={isGlobal ? CUSTOM_FIELD_LABELS.fontToolbarGlobalHint : undefined}
        >
          {Math.round(fontSize)}
        </span>

        <button
          type="button"
          title={CUSTOM_FIELD_LABELS.fontToolbarIncrease}
          onClick={(e) => {
            e.stopPropagation();
            onIncrease(e.shiftKey);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 22,
            border: 'none',
            borderRadius: 4,
            backgroundColor: 'transparent',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}
