/**
 * Champ interactif sur le canvas : sélection, drag et resize.
 * Rendu sur le canvas (inline styles autorisés).
 */

import { FieldElementRenderer } from './FieldElementRenderer';
import { fieldBgStyle } from '@/utils/fieldStyle';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { CustomField } from '@/types/customField';

type ResizeHandle = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface DragHandlers {
  readonly onPointerDown: (
    e: React.PointerEvent,
    fieldId: string,
    fieldX: number,
    fieldY: number,
  ) => void;
  readonly onPointerMove: (e: React.PointerEvent) => void;
  readonly onPointerUp: () => void;
}

export interface ResizeHandlers {
  readonly onResizeStart: (
    e: React.PointerEvent,
    fieldId: string,
    handle: ResizeHandle,
    fieldX: number,
    fieldY: number,
    fieldW: number,
    fieldH: number,
  ) => void;
  readonly onResizeMove: (e: React.PointerEvent) => void;
  readonly onResizeEnd: () => void;
}

interface InteractiveFieldProps {
  readonly field: CustomField;
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly isSelected: boolean;
  readonly drag: DragHandlers;
  readonly resize: ResizeHandlers;
}

const HANDLE_SIZE = 14;
const HANDLE_OFFSET = -7;

const HANDLES: readonly { handle: ResizeHandle; cursor: string; top?: number; bottom?: number; left?: number; right?: number }[] = [
  { handle: 'top-left', cursor: 'nwse-resize', top: HANDLE_OFFSET, left: HANDLE_OFFSET },
  { handle: 'top-right', cursor: 'nesw-resize', top: HANDLE_OFFSET, right: HANDLE_OFFSET },
  { handle: 'bottom-left', cursor: 'nesw-resize', bottom: HANDLE_OFFSET, left: HANDLE_OFFSET },
  { handle: 'bottom-right', cursor: 'nwse-resize', bottom: HANDLE_OFFSET, right: HANDLE_OFFSET },
];

export function InteractiveField({
  field,
  state,
  colors,
  opacities,
  isSelected,
  drag,
  resize,
}: InteractiveFieldProps) {
  if (!field.visible) return null;

  const isLocked = field.locked;

  return (
    <div
      data-field-id={field.id}
      data-testid={`interactive-field-${field.id}`}
      style={{
        position: 'absolute',
        left: field.x,
        top: field.y,
        width: field.width,
        height: field.height,
        zIndex: field.zIndex,
        cursor: isLocked ? 'not-allowed' : 'grab',
        ...fieldBgStyle(field.style),
      }}
      onPointerDown={(e) => {
        if (!isLocked) {
          drag.onPointerDown(e, field.id, field.x, field.y);
        }
      }}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
    >
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
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

      {isSelected && (
        <>
          {/* Bordure de sélection */}
          <div
            data-testid="selection-border"
            style={{
              position: 'absolute',
              inset: -1,
              border: '2px solid rgba(56, 189, 248, 0.8)',
              borderRadius: field.style.borderRadius > 0 ? `${field.style.borderRadius}px` : undefined,
              pointerEvents: 'none',
            }}
          />

          {/* Poignées de redimensionnement */}
          {!isLocked && HANDLES.map(({ handle, cursor, ...pos }) => (
            <div
              key={handle}
              data-testid={`resize-handle-${handle}`}
              style={{
                position: 'absolute',
                width: HANDLE_SIZE,
                height: HANDLE_SIZE,
                backgroundColor: '#ffffff',
                border: '1.5px solid rgba(56, 189, 248, 0.9)',
                borderRadius: 2,
                cursor,
                zIndex: 9999,
                ...pos,
              }}
              onPointerDown={(e) => {
                resize.onResizeStart(
                  e,
                  field.id,
                  handle,
                  field.x,
                  field.y,
                  field.width,
                  field.height,
                );
              }}
              onPointerMove={resize.onResizeMove}
              onPointerUp={resize.onResizeEnd}
            />
          ))}
        </>
      )}
    </div>
  );
}
