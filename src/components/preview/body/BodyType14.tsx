/**
 * Body Type 14 : Layout libre avec champs personnalisés.
 * Rend les champs positionnés librement sur un canvas absolu.
 * En mode interactif (éditeur), permet le drag, resize et la sélection.
 */

import { useCallback } from 'react';
import { InteractiveField } from './InteractiveField';
import { FieldFontToolbar } from './FieldFontToolbar';
import { FieldElementRenderer } from './FieldElementRenderer';
import { fieldBgStyle } from '@/utils/fieldStyle';
import { useFieldDrag } from '@/hooks/useFieldDrag';
import { useFieldResize } from '@/hooks/useFieldResize';
import { useFieldFontSize, hasEditableFontSize } from '@/hooks/useFieldFontSize';
import { useScoreboardStore } from '@/stores/scoreboardStore';
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

function InteractiveCanvas({ state, colors, opacities, canvasScale }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly canvasScale: number;
}) {
  const selectedFieldId = useScoreboardStore((s) => s.customFieldsData.selectedFieldId);
  const selectField = useScoreboardStore((s) => s.selectCustomField);
  const { showGuides, gridSize } = state.customFieldsData;

  const drag = useFieldDrag(canvasScale);
  const resize = useFieldResize(canvasScale);
  const { fontInfo, hasFontControl, increase, decrease, setFontSize, adjustFontSize } = useFieldFontSize();

  const fields = state.customFieldsData.fields;
  const sorted = [...fields].sort((a, b) => a.zIndex - b.zIndex);
  const selectedField = selectedFieldId
    ? fields.find((f) => f.id === selectedFieldId)
    : undefined;

  const handleBackgroundClick = (e: React.MouseEvent) => {
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
      }}
      onClick={handleBackgroundClick}
      onWheelCapture={handleFieldWheel}
    >
      {showGuides && <GridOverlay gridSize={gridSize} />}

      {sorted.map((field) => (
        <InteractiveField
          key={field.id}
          field={field}
          state={state}
          colors={colors}
          opacities={opacities}
          isSelected={selectedFieldId === field.id}
          drag={drag}
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
