/**
 * Composants statiques du Body Type 14 : champ en lecture seule et grille.
 * Extraits pour respecter la limite de 300 lignes.
 */

import { FieldElementRenderer } from './FieldElementRenderer';
import { fieldBgStyle } from '@/utils/fieldStyle';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { CustomField } from '@/types/customField';

export function StaticField({ field, state, colors, opacities }: {
  readonly field: CustomField;
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
}) {
  if (!field.visible) return null;

  return (
    <div
      data-field-id={field.id}
      style={{
        position: 'absolute',
        left: field.x,
        top: field.y,
        width: field.width,
        height: field.height,
        zIndex: field.zIndex,
        overflow: 'hidden',
        transform: field.rotation !== 0 ? `rotate(${field.rotation}deg)` : undefined,
        transformOrigin: 'center center',
        ...fieldBgStyle(field.style),
      }}
    >
      {field.scaleContent && field.initialWidth > 0 && field.initialHeight > 0 ? (
        <div style={{
          width: field.initialWidth,
          height: field.initialHeight,
          transform: `scale(${field.width / field.initialWidth}, ${field.height / field.initialHeight})`,
          transformOrigin: 'top left',
        }}>
          <FieldElementRenderer
            element={field.element}
            state={state}
            colors={colors}
            opacities={opacities}
            width={field.initialWidth}
            height={field.initialHeight}
          />
        </div>
      ) : (
        <FieldElementRenderer
          element={field.element}
          state={state}
          colors={colors}
          opacities={opacities}
          width={field.width}
          height={field.height}
        />
      )}
    </div>
  );
}

/** Indice affiche sur un canvas vide (aucun champ) */
export function EmptyCanvasHint() {
  return (
    <div
      data-testid="empty-canvas-hint"
      style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 8, pointerEvents: 'none',
      }}
    >
      <span style={{ fontSize: 36, fontWeight: 700, color: 'rgba(148, 163, 184, 0.85)', letterSpacing: 2 }}>
        {CUSTOM_FIELD_LABELS.emptyCanvasTitle}
      </span>
      <span style={{ fontSize: 22, color: 'rgba(148, 163, 184, 0.7)', maxWidth: 560, textAlign: 'center', lineHeight: 1.5 }}>
        {CUSTOM_FIELD_LABELS.emptyCanvasHint}
      </span>
    </div>
  );
}

/** Indicateur visuel de zone de depot lors du glisser-deposer */
export function DropIndicatorOverlay() {
  return (
    <div
      data-testid="drop-indicator"
      style={{
        position: 'absolute', inset: 0,
        border: '3px dashed rgba(56, 189, 248, 0.6)',
        backgroundColor: 'rgba(56, 189, 248, 0.08)',
        borderRadius: 4, pointerEvents: 'none', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <span style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'rgba(56, 189, 248, 1)',
        padding: '12px 28px', borderRadius: 8, fontSize: 20, fontWeight: 600,
      }}>
        {CUSTOM_FIELD_LABELS.dropHint}
      </span>
    </div>
  );
}

export function GridOverlay({ gridSize }: { readonly gridSize: number }) {
  return (
    <div
      data-testid="grid-overlay"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), ` +
          `linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        pointerEvents: 'none',
      }}
    />
  );
}
