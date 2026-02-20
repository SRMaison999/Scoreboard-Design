/**
 * Body Type 14 : Layout libre avec champs personnalisés.
 * Rend les champs positionnés librement sur un canvas absolu.
 * En mode interactif (éditeur), permet le drag, resize et la sélection.
 */

import { useCallback, useEffect } from 'react';
import { InteractiveField, type DragHandlers } from './InteractiveField';
import { FieldFontToolbar } from './FieldFontToolbar';
import { FieldElementRenderer } from './FieldElementRenderer';
import { fieldBgStyle } from '@/utils/fieldStyle';
import { useFieldDrag } from '@/hooks/useFieldDrag';
import { useFieldResize } from '@/hooks/useFieldResize';
import { useFieldFontSize, hasEditableFontSize } from '@/hooks/useFieldFontSize';
import { useZoneSelection } from '@/hooks/useZoneSelection';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useZoneSelectionStore } from '@/stores/zoneSelectionStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { CustomField } from '@/types/customField';

interface BodyType14Props {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly canvasScale?: number;
}

function StaticField({ field, state, colors, opacities }: {
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

function GridOverlay({ gridSize }: { readonly gridSize: number }) {
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

/** Drag handlers désactivés pendant la sélection de zone */
const disabledDrag: DragHandlers = {
  onPointerDown: () => undefined,
  onPointerMove: () => undefined,
  onPointerUp: () => undefined,
};

function InteractiveCanvas({ state, colors, opacities, canvasScale }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly canvasScale: number;
}) {
  const selectedFieldId = useScoreboardStore((s) => s.customFieldsData.selectedFieldId);
  const zoneSelectionActive = useScoreboardStore((s) => s.customFieldsData.zoneSelectionActive);
  const selectField = useScoreboardStore((s) => s.selectCustomField);
  const updateOption = useScoreboardStore((s) => s.updateCustomFieldsOption);
  const setCapturedFields = useZoneSelectionStore((s) => s.setCapturedFields);
  const { showGuides, gridSize } = state.customFieldsData;

  const drag = useFieldDrag(canvasScale);
  const resize = useFieldResize(canvasScale);
  const { fontInfo, hasFontControl, increase, decrease, setFontSize, adjustFontSize } = useFieldFontSize();

  const fields = state.customFieldsData.fields;
  const sorted = [...fields].sort((a, b) => a.zIndex - b.zIndex);
  const selectedField = selectedFieldId
    ? fields.find((f) => f.id === selectedFieldId)
    : undefined;

  const handleZoneCapture = useCallback((captured: readonly CustomField[]) => {
    updateOption('zoneSelectionActive', false);
    if (captured.length === 0) return;
    setCapturedFields(captured);
  }, [updateOption, setCapturedFields]);

  const zone = useZoneSelection(canvasScale, fields, handleZoneCapture);
  const { active: zoneActive, activate: zoneActivate, cancel: zoneCancel } = zone;

  /* Synchronise l'état du hook avec le store */
  useEffect(() => {
    if (zoneSelectionActive && !zoneActive) {
      zoneActivate();
    } else if (!zoneSelectionActive && zoneActive) {
      zoneCancel();
    }
  }, [zoneSelectionActive, zoneActive, zoneActivate, zoneCancel]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (zone.active) return;
    if (e.target === e.currentTarget) {
      selectField(null);
    }
  };

  /** Molette sur un champ sélectionné = ajuste la taille de police (sans Ctrl) */
  const handleFieldWheel = useCallback((e: React.WheelEvent) => {
    if (!hasFontControl || !selectedFieldId) return;
    /* Vérifier que la molette est sur le champ sélectionné */
    const target = e.target as HTMLElement;
    const fieldEl = target.closest(`[data-field-id="${selectedFieldId}"]`);
    if (!fieldEl) return;
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 1 : -1;
    adjustFontSize(delta);
  }, [hasFontControl, selectedFieldId, adjustFontSize]);

  const showToolbar = selectedField
    && hasFontControl
    && fontInfo
    && hasEditableFontSize(selectedField.element.type);

  return (
    <div
      data-testid="body-type-14"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: 1,
        cursor: zone.active ? 'crosshair' : undefined,
      }}
      onClick={handleBackgroundClick}
      onWheelCapture={handleFieldWheel}
      onPointerDown={zone.active ? zone.onPointerDown : undefined}
      onPointerMove={zone.active ? zone.onPointerMove : undefined}
      onPointerUp={zone.active ? zone.onPointerUp : undefined}
    >
      {showGuides && <GridOverlay gridSize={gridSize} />}

      {sorted.length === 0 && !zone.active && (
        <div
          data-testid="empty-canvas-hint"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 600, color: 'rgba(148, 163, 184, 0.6)' }}>
            {CUSTOM_FIELD_LABELS.emptyCanvasTitle}
          </span>
          <span style={{ fontSize: 13, color: 'rgba(148, 163, 184, 0.4)', maxWidth: 360, textAlign: 'center' }}>
            {CUSTOM_FIELD_LABELS.emptyCanvasHint}
          </span>
        </div>
      )}

      {sorted.map((field) => (
        <InteractiveField
          key={field.id}
          field={field}
          state={state}
          colors={colors}
          opacities={opacities}
          isSelected={selectedFieldId === field.id}
          drag={zone.active ? disabledDrag : drag}
          resize={resize}
        />
      ))}

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

      {/* Overlay de sélection de zone */}
      {zone.active && (
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
          {zone.currentRect && (
            <div
              data-testid="zone-selection-rect"
              style={{
                position: 'absolute',
                left: zone.currentRect.x,
                top: zone.currentRect.y,
                width: zone.currentRect.width,
                height: zone.currentRect.height,
                border: '2px dashed rgba(56, 189, 248, 0.8)',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                borderRadius: 4,
              }}
            />
          )}
          {!zone.drawing && (
            <div style={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'rgba(56, 189, 248, 0.9)',
              padding: '4px 12px',
              borderRadius: 4,
              fontSize: 12,
              whiteSpace: 'nowrap',
            }}>
              {CUSTOM_FIELD_LABELS.zoneSelectHint}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function BodyType14({ state, colors, opacities, canvasScale }: BodyType14Props) {
  const fields = state.customFieldsData.fields;
  const sorted = [...fields].sort((a, b) => a.zIndex - b.zIndex);

  if (canvasScale !== undefined) {
    return (
      <InteractiveCanvas
        state={state}
        colors={colors}
        opacities={opacities}
        canvasScale={canvasScale}
      />
    );
  }

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
        <StaticField
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
