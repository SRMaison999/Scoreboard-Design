/**
 * Composants statiques du Body Type 14 : champ en lecture seule et grille.
 * Extraits pour respecter la limite de 300 lignes.
 */

import { FieldElementRenderer } from './FieldElementRenderer';
import { fieldBgStyle } from '@/utils/fieldStyle';
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
