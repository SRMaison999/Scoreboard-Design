/**
 * Body Type 14 : Layout libre avec champs personnalisés.
 * Rend les champs positionnés librement sur un canvas absolu.
 */

import { FieldElementRenderer } from './FieldElementRenderer';
import { hexToRgba } from '@/utils/color';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { CustomField, FieldStyle } from '@/types/customField';

interface BodyType14Props {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
}

function fieldBgStyle(style: FieldStyle): React.CSSProperties {
  const result: React.CSSProperties = {};

  if (style.backgroundColor) {
    result.backgroundColor = hexToRgba(style.backgroundColor, style.backgroundOpacity);
  }
  if (style.borderWidth > 0 && style.borderColor) {
    result.border = `${style.borderWidth}px solid ${style.borderColor}`;
  }
  if (style.borderRadius > 0) {
    result.borderRadius = `${style.borderRadius}px`;
  }
  if (style.padding > 0) {
    result.padding = `${style.padding}px`;
  }

  return result;
}

function FieldRenderer({ field, state, colors, opacities }: {
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
      <FieldElementRenderer
        element={field.element}
        state={state}
        colors={colors}
        opacities={opacities}
        width={field.width}
        height={field.height}
      />
    </div>
  );
}

export function BodyType14({ state, colors, opacities }: BodyType14Props) {
  const fields = state.customFieldsData.fields;
  const sorted = [...fields].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div
      data-testid="body-type-14"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: 1,
      }}
    >
      {sorted.map((field) => (
        <FieldRenderer
          key={field.id}
          field={field}
          state={state}
          colors={colors}
          opacities={opacities}
        />
      ))}
    </div>
  );
}
