/**
 * Champ interactif sur le canvas : sélection, drag et resize.
 * Rendu sur le canvas (inline styles autorisés).
 */

import { FieldElementRenderer } from './FieldElementRenderer';
import { fieldBgStyle } from '@/utils/fieldStyle';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { CustomField, ResizeHandle } from '@/types/customField';

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

/* --- Constantes des poignees de coin --- */

const CORNER_SIZE = 14;
const CORNER_OFFSET = -7;

/* --- Constantes des poignees de bord --- */

const EDGE_LONG = 20;
const EDGE_SHORT = 8;

interface HandleDescriptor {
  handle: ResizeHandle;
  cursor: string;
  width: number;
  height: number;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
}

const CORNER_HANDLES: readonly HandleDescriptor[] = [
  {
    handle: 'top-left', cursor: 'nwse-resize',
    width: CORNER_SIZE, height: CORNER_SIZE,
    top: CORNER_OFFSET, left: CORNER_OFFSET,
  },
  {
    handle: 'top-right', cursor: 'nesw-resize',
    width: CORNER_SIZE, height: CORNER_SIZE,
    top: CORNER_OFFSET, right: CORNER_OFFSET,
  },
  {
    handle: 'bottom-left', cursor: 'nesw-resize',
    width: CORNER_SIZE, height: CORNER_SIZE,
    bottom: CORNER_OFFSET, left: CORNER_OFFSET,
  },
  {
    handle: 'bottom-right', cursor: 'nwse-resize',
    width: CORNER_SIZE, height: CORNER_SIZE,
    bottom: CORNER_OFFSET, right: CORNER_OFFSET,
  },
];

const EDGE_HANDLES: readonly HandleDescriptor[] = [
  {
    handle: 'top', cursor: 'n-resize',
    width: EDGE_LONG, height: EDGE_SHORT,
    top: -(EDGE_SHORT / 2), left: '50%',
  },
  {
    handle: 'bottom', cursor: 's-resize',
    width: EDGE_LONG, height: EDGE_SHORT,
    bottom: -(EDGE_SHORT / 2), left: '50%',
  },
  {
    handle: 'left', cursor: 'w-resize',
    width: EDGE_SHORT, height: EDGE_LONG,
    left: -(EDGE_SHORT / 2), top: '50%',
  },
  {
    handle: 'right', cursor: 'e-resize',
    width: EDGE_SHORT, height: EDGE_LONG,
    right: -(EDGE_SHORT / 2), top: '50%',
  },
];

const ALL_HANDLES: readonly HandleDescriptor[] = [
  ...CORNER_HANDLES,
  ...EDGE_HANDLES,
];

function buildHandlePosition(desc: HandleDescriptor): React.CSSProperties {
  const pos: React.CSSProperties = {};

  if (desc.top !== undefined) pos.top = desc.top;
  if (desc.bottom !== undefined) pos.bottom = desc.bottom;
  if (desc.left !== undefined) pos.left = desc.left;
  if (desc.right !== undefined) pos.right = desc.right;

  /* Centrer les poignees de bord sur l'axe perpendiculaire */
  const needsHorizontalCenter = desc.handle === 'top' || desc.handle === 'bottom';
  const needsVerticalCenter = desc.handle === 'left' || desc.handle === 'right';

  if (needsHorizontalCenter) {
    pos.transform = `translateX(-50%)`;
  } else if (needsVerticalCenter) {
    pos.transform = `translateY(-50%)`;
  }

  return pos;
}

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

          {/* Poignées de redimensionnement (coins + bords) */}
          {!isLocked && ALL_HANDLES.map((desc) => (
            <div
              key={desc.handle}
              data-testid={`resize-handle-${desc.handle}`}
              style={{
                position: 'absolute',
                width: desc.width,
                height: desc.height,
                backgroundColor: '#ffffff',
                border: '1.5px solid rgba(56, 189, 248, 0.9)',
                borderRadius: 2,
                cursor: desc.cursor,
                zIndex: 9999,
                ...buildHandlePosition(desc),
              }}
              onPointerDown={(e) => {
                resize.onResizeStart(
                  e,
                  field.id,
                  desc.handle,
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
