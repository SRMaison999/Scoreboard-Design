/**
 * Champ interactif sur le canvas : selection, drag, resize et rotation.
 * Rendu sur le canvas (inline styles autorises).
 */

import { FieldElementRenderer } from './FieldElementRenderer';
import type { InlineEditProps } from './FieldElementRenderer';
import {
  ALL_HANDLES,
  ROTATION_HANDLE_SIZE,
  ROTATION_HANDLE_OFFSET,
  buildHandlePosition,
} from './InteractiveFieldHandles';
import { fieldBgStyle } from '@/utils/fieldStyle';
import type { RotationHandlers } from '@/hooks/useFieldRotation';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { CustomField, ResizeHandle } from '@/types/customField';

export type { RotationHandlers } from '@/hooks/useFieldRotation';

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

export interface InlineEditHandlers {
  readonly isEditing: boolean;
  readonly originalContent: string;
  readonly onDoubleClick: (fieldId: string) => void;
  readonly onCommit: (newContent: string) => void;
  readonly onCancel: () => void;
}

interface InteractiveFieldProps {
  readonly field: CustomField;
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly isSelected: boolean;
  readonly drag: DragHandlers;
  readonly resize: ResizeHandlers;
  readonly rotation?: RotationHandlers;
  readonly inlineEdit?: InlineEditHandlers;
}

export function InteractiveField({
  field,
  state,
  colors,
  opacities,
  isSelected,
  drag,
  resize,
  rotation: rotationHandlers,
  inlineEdit,
}: InteractiveFieldProps) {
  if (!field.visible) return null;

  const isLocked = field.locked;
  const isEditing = inlineEdit?.isEditing ?? false;
  const isTextBlock = field.element.type === 'text-block';
  const hasRotation = field.rotation !== 0;

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!isTextBlock || isLocked || !inlineEdit) return;
    e.stopPropagation();
    inlineEdit.onDoubleClick(field.id);
  };

  /* Construire les props d'edition inline pour le renderer */
  const inlineEditRendererProps: InlineEditProps | undefined =
    isEditing && inlineEdit
      ? {
          isEditing: true,
          originalContent: inlineEdit.originalContent,
          onCommit: inlineEdit.onCommit,
          onCancel: inlineEdit.onCancel,
        }
      : undefined;

  /* Determiner le curseur : text en mode edition, grab sinon */
  const cursorStyle = isEditing ? 'text' : isLocked ? 'not-allowed' : 'grab';

  /* Construire la transformation avec rotation */
  const rotationTransform = hasRotation ? `rotate(${field.rotation}deg)` : undefined;

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
        cursor: cursorStyle,
        transform: rotationTransform,
        transformOrigin: 'center center',
        ...fieldBgStyle(field.style),
      }}
      onPointerDown={(e) => {
        if (isEditing) return;
        if (!isLocked) {
          drag.onPointerDown(e, field.id, field.x, field.y);
        }
      }}
      onPointerMove={isEditing ? undefined : drag.onPointerMove}
      onPointerUp={isEditing ? undefined : drag.onPointerUp}
      onDoubleClick={handleDoubleClick}
    >
      <div style={{
        width: '100%', height: '100%', overflow: 'hidden',
        pointerEvents: isEditing ? 'auto' : 'none',
      }}>
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
              inlineEdit={inlineEditRendererProps}
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
            inlineEdit={inlineEditRendererProps}
          />
        )}
      </div>

      {isSelected && (
        <>
          {/* Bordure de selection */}
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

          {/* Poignees de redimensionnement (coins + bords) */}
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

          {/* Poignee de rotation */}
          {!isLocked && rotationHandlers && (
            <>
              {/* Ligne de connexion vers la poignee */}
              <div
                data-testid="rotation-line"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: -ROTATION_HANDLE_OFFSET,
                  width: 1,
                  height: ROTATION_HANDLE_OFFSET - ROTATION_HANDLE_SIZE / 2,
                  backgroundColor: 'rgba(56, 189, 248, 0.6)',
                  transform: 'translateX(-50%)',
                  pointerEvents: 'none',
                  zIndex: 9999,
                }}
              />
              <div
                data-testid="rotation-handle"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: -(ROTATION_HANDLE_OFFSET + ROTATION_HANDLE_SIZE / 2),
                  width: ROTATION_HANDLE_SIZE,
                  height: ROTATION_HANDLE_SIZE,
                  backgroundColor: '#ffffff',
                  border: '1.5px solid rgba(56, 189, 248, 0.9)',
                  borderRadius: '50%',
                  cursor: 'grab',
                  zIndex: 9999,
                  transform: 'translateX(-50%)',
                }}
                onPointerDown={(e) => {
                  rotationHandlers.onRotateStart(
                    e,
                    field.id,
                    field.x,
                    field.y,
                    field.width,
                    field.height,
                    field.rotation,
                  );
                }}
                onPointerMove={rotationHandlers.onRotateMove}
                onPointerUp={rotationHandlers.onRotateEnd}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
