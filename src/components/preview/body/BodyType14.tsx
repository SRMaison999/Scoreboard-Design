/**
 * Body Type 14 : Layout libre avec champs personnalis\u00e9s.
 * Rend les champs positionn\u00e9s librement sur un canvas absolu.
 * En mode interactif (\u00e9diteur), permet le drag, resize, la s\u00e9lection,
 * le menu contextuel et l'indicateur de coordonn\u00e9es.
 */

import { useCallback, useEffect, useState } from 'react';
import { InteractiveField, type DragHandlers } from './InteractiveField';
import type { InlineEditHandlers } from './InteractiveField';
import { FieldFontToolbar } from './FieldFontToolbar';
import { SmartGuideOverlay } from './SmartGuideOverlay';
import { StaticField, GridOverlay, EmptyCanvasHint, DropIndicatorOverlay } from './BodyType14Static';
import { AlignmentDiagnosticOverlay } from './AlignmentDiagnosticOverlay';
import { CanvasContextMenu } from './CanvasContextMenu';
import { CursorCoordinates } from './CursorCoordinates';
import { ZoneSelectionOverlay } from './ZoneSelectionOverlay';
import type { ContextMenuPosition } from './CanvasContextMenu';
import { useFieldDrag } from '@/hooks/useFieldDrag';
import { useFieldResize } from '@/hooks/useFieldResize';
import { useFieldRotation } from '@/hooks/useFieldRotation';
import { useFieldFontSize, hasEditableFontSize } from '@/hooks/useFieldFontSize';
import { useInlineEdit } from '@/hooks/useInlineEdit';
import { useZoneSelection } from '@/hooks/useZoneSelection';
import { useLibraryDragDrop } from '@/hooks/useLibraryDragDrop';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useZoneSelectionStore } from '@/stores/zoneSelectionStore';
import { prepareFieldForAdd } from '@/utils/fieldConfig';
import { FIELD_MAX_FIELDS } from '@/types/customField';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { CustomField } from '@/types/customField';

interface BodyType14Props {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly canvasScale?: number;
}

const EMPTY_IDS: readonly string[] = [];

/** Drag handlers d\u00e9sactiv\u00e9s pendant la s\u00e9lection de zone */
const disabledDrag: DragHandlers = {
  onPointerDown: () => undefined,
  onPointerMove: () => undefined,
  onPointerUp: () => undefined,
};

/** Construit les handlers d'\u00e9dition inline pour un champ donn\u00e9 */
function buildInlineEditHandlers(
  fieldId: string,
  edit: {
    editingFieldId: string | null;
    originalContent: string;
    startEditing: (id: string) => void;
    commitEdit: (content: string) => void;
    cancelEdit: () => void;
  },
): InlineEditHandlers {
  return {
    isEditing: edit.editingFieldId === fieldId,
    originalContent: edit.originalContent,
    onDoubleClick: edit.startEditing,
    onCommit: edit.commitEdit,
    onCancel: edit.cancelEdit,
  };
}

function InteractiveCanvas({ state, colors, opacities, canvasScale }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly canvasScale: number;
}) {
  const selectedIds = useScoreboardStore((s) => s.customFieldsData?.selectedFieldIds ?? EMPTY_IDS);
  const zoneSelectionActive = useScoreboardStore((s) => s.customFieldsData.zoneSelectionActive);
  const clearSelection = useScoreboardStore((s) => s.clearFieldSelection);
  const selectField = useScoreboardStore((s) => s.selectCustomField);
  const updateOption = useScoreboardStore((s) => s.updateCustomFieldsOption);
  const setCapturedFields = useZoneSelectionStore((s) => s.setCapturedFields);
  const { showGuides, gridSize } = state.customFieldsData;

  const addField = useScoreboardStore((s) => s.addCustomField);

  const drag = useFieldDrag(canvasScale);
  const resize = useFieldResize(canvasScale);
  const rotationHandlers = useFieldRotation(canvasScale);
  const { fontInfo, hasFontControl, increase, decrease, setFontSize, adjustFontSize } = useFieldFontSize();
  const inlineEdit = useInlineEdit();
  const libraryDrag = useLibraryDragDrop();

  const fields = state.customFieldsData.fields;
  const isFull = fields.length >= FIELD_MAX_FIELDS;
  const sorted = [...fields].sort((a, b) => a.zIndex - b.zIndex);
  const singleSelectedId = selectedIds.length === 1 ? selectedIds[0] ?? null : null;
  const selectedField = singleSelectedId ? fields.find((f) => f.id === singleSelectedId) : undefined;

  /* Coordonn\u00e9es du curseur */
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / canvasScale);
    const y = Math.round((e.clientY - rect.top) / canvasScale);
    setCursorPos({ x, y });
  }, [canvasScale]);

  const handleMouseLeave = useCallback(() => setCursorPos(null), []);

  /* S\u00e9lection de zone */
  const handleZoneCapture = useCallback((captured: readonly CustomField[]) => {
    updateOption('zoneSelectionActive', false);
    if (captured.length === 0) return;
    setCapturedFields(captured);
  }, [updateOption, setCapturedFields]);

  const zone = useZoneSelection(canvasScale, fields, handleZoneCapture);
  const { active: zoneActive, activate: zoneActivate, cancel: zoneCancel } = zone;

  /* Menu contextuel */
  const [contextMenu, setContextMenu] = useState<{
    position: ContextMenuPosition;
    targetField: CustomField | null;
  } | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (zone.active) return;

    const target = e.target as HTMLElement;
    const fieldEl = target.closest('[data-field-id]');
    const fieldId = fieldEl?.getAttribute('data-field-id');
    const targetField = fieldId ? fields.find((f) => f.id === fieldId) ?? null : null;

    if (targetField && !selectedIds.includes(targetField.id)) {
      selectField(targetField.id);
    }

    setContextMenu({ position: { x: e.clientX, y: e.clientY }, targetField });
  }, [fields, selectedIds, selectField, zone.active]);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  useEffect(() => {
    if (zoneSelectionActive && !zoneActive) zoneActivate();
    else if (!zoneSelectionActive && zoneActive) zoneCancel();
  }, [zoneSelectionActive, zoneActive, zoneActivate, zoneCancel]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (zone.active) return;
    if (inlineEdit.editingFieldId && e.target === e.currentTarget) {
      inlineEdit.cancelEdit();
    }
    if (e.target === e.currentTarget) clearSelection();
  };

  const handleFieldWheel = useCallback((e: React.WheelEvent) => {
    if (!hasFontControl || !singleSelectedId) return;
    const target = e.target as HTMLElement;
    const fieldEl = target.closest(`[data-field-id="${singleSelectedId}"]`);
    if (!fieldEl) return;
    e.stopPropagation();
    adjustFontSize(e.deltaY < 0 ? 1 : -1);
  }, [hasFontControl, singleSelectedId, adjustFontSize]);

  /** Gestion du drop d'un \u00e9l\u00e9ment depuis la biblioth\u00e8que */
  const handleDrop = useCallback((e: React.DragEvent) => {
    if (isFull) return;
    const result = libraryDrag.onDrop(e, canvasScale);
    if (!result) return;

    const { element: el, canvasX, canvasY } = result;
    const { config, label } = prepareFieldForAdd(el, fields);

    const w = Math.min(el.defaultWidth, state.templateWidth);
    const h = Math.min(el.defaultHeight, state.templateHeight);
    const x = Math.max(0, Math.min(canvasX - Math.round(w / 2), state.templateWidth - w));
    const y = Math.max(0, Math.min(canvasY - Math.round(h / 2), state.templateHeight - h));

    addField(config, x, y, w, h, label);
  }, [isFull, libraryDrag, canvasScale, fields, state.templateWidth, state.templateHeight, addField]);

  const showToolbar = selectedField && hasFontControl && fontInfo && hasEditableFontSize(selectedField.element.type);

  return (
    <div
      data-testid="body-type-14"
      data-canvas-container
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: 1,
        cursor: zone.active ? 'crosshair' : undefined,
      }}
      onClick={handleBackgroundClick}
      onWheelCapture={handleFieldWheel}
      onContextMenu={handleContextMenu}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onDragOver={libraryDrag.onDragOver}
      onDragLeave={libraryDrag.onDragLeave}
      onDrop={handleDrop}
      onPointerDown={zone.active ? zone.onPointerDown : undefined}
      onPointerMove={zone.active ? zone.onPointerMove : undefined}
      onPointerUp={zone.active ? zone.onPointerUp : undefined}
    >
      {showGuides && <GridOverlay gridSize={gridSize} />}

      {libraryDrag.isDragOver && !isFull && <DropIndicatorOverlay />}

      {sorted.length === 0 && !zone.active && !libraryDrag.isDragOver && <EmptyCanvasHint />}

      {sorted.map((field) => (
        <InteractiveField
          key={field.id}
          field={field}
          state={state}
          colors={colors}
          opacities={opacities}
          isSelected={selectedIds.includes(field.id)}
          drag={zone.active ? disabledDrag : drag}
          resize={resize}
          rotation={rotationHandlers}
          inlineEdit={buildInlineEditHandlers(field.id, inlineEdit)}
        />
      ))}

      {drag.isDragging && <SmartGuideOverlay guides={drag.activeGuides} />}

      {!drag.isDragging && selectedField && (
        <AlignmentDiagnosticOverlay
          field={selectedField}
          fields={fields}
          canvasWidth={state.templateWidth}
          canvasHeight={state.templateHeight}
        />
      )}

      {showToolbar && selectedField && fontInfo && (
        <FieldFontToolbar
          fontSize={fontInfo.value}
          isGlobal={fontInfo.isGlobal}
          fieldX={selectedField.x}
          fieldY={selectedField.y}
          fieldWidth={selectedField.width}
          canvasScale={canvasScale}
          onIncrease={increase}
          onDecrease={decrease}
          onSetFontSize={setFontSize}
        />
      )}

      <CursorCoordinates
        x={cursorPos?.x ?? 0}
        y={cursorPos?.y ?? 0}
        visible={cursorPos !== null}
      />

      {zone.active && (
        <ZoneSelectionOverlay drawing={zone.drawing} currentRect={zone.currentRect} />
      )}

      {contextMenu && (
        <CanvasContextMenu
          position={contextMenu.position}
          targetField={contextMenu.targetField}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
}

export function BodyType14({ state, colors, opacities, canvasScale }: BodyType14Props) {
  const fields = state.customFieldsData.fields;
  const sorted = [...fields].sort((a, b) => a.zIndex - b.zIndex);

  if (canvasScale !== undefined) {
    return <InteractiveCanvas state={state} colors={colors} opacities={opacities} canvasScale={canvasScale} />;
  }

  return (
    <div data-testid="body-type-14" style={{ position: 'relative', width: '100%', height: '100%', flex: 1 }}>
      {sorted.map((field) => (
        <StaticField key={field.id} field={field} state={state} colors={colors} opacities={opacities} />
      ))}
    </div>
  );
}
