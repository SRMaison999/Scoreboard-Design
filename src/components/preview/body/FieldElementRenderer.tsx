/**
 * Renderer pour les elements individuels des champs personnalises.
 * Dispatche vers le bon composant en fonction du type d'element.
 */

import { memo } from 'react';
import {
  ScoreElement,
  ClockElement,
  PeriodElement,
  TeamNameElement,
  FlagElement,
  TimeoutElement,
  ShootoutElement,
} from './FieldMatchElements';
import { StatLineElement, BarCompareElement, PlayerPhotoElement } from './FieldDataElements';
import { HeaderBlockElement, PenaltyColumnElement } from './FieldComposedElements';
import { EmbeddedBodyType } from './FieldEmbeddedBodyType';
import { InlineTextEditor } from './InlineTextEditor';
import { hexToRgba } from '@/utils/color';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FieldElementConfig, TextBlockConfig } from '@/types/customField';

export interface InlineEditProps {
  readonly isEditing: boolean;
  readonly originalContent: string;
  readonly onCommit: (newContent: string) => void;
  readonly onCancel: () => void;
}

interface FieldElementRendererProps {
  readonly element: FieldElementConfig;
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly width: number;
  readonly height: number;
  readonly inlineEdit?: InlineEditProps;
}

function TextBlockElement({ element }: {
  readonly element: { readonly config: {
    readonly content: string; readonly fontSize: number;
    readonly fontWeight: number; readonly fontFamily?: string;
    readonly textAlign: string;
    readonly textTransform: string; readonly letterSpacing: number;
  } };
}) {
  const c = element.config;
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: c.textAlign,
      fontSize: c.fontSize, fontWeight: c.fontWeight,
      fontFamily: c.fontFamily || undefined,
      textAlign: c.textAlign as 'left' | 'center' | 'right',
      textTransform: c.textTransform as 'none' | 'uppercase' | 'lowercase',
      letterSpacing: c.letterSpacing, color: '#ffffff',
      overflow: 'hidden', whiteSpace: 'pre-wrap',
    }}>
      {c.content}
    </div>
  );
}

function ShapeElement({ element }: {
  readonly element: { readonly config: {
    readonly shape: string; readonly fillColor: string; readonly fillOpacity: number;
    readonly borderColor: string; readonly borderWidth: number; readonly borderRadius: number;
  } };
}) {
  const c = element.config;
  const radius = c.shape === 'circle' ? '50%' : `${c.borderRadius}px`;
  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: hexToRgba(c.fillColor || '#ffffff', c.fillOpacity),
      border: c.borderWidth > 0 ? `${c.borderWidth}px solid ${c.borderColor}` : 'none',
      borderRadius: radius,
    }} />
  );
}

function SeparatorElement({ element }: {
  readonly element: { readonly config: {
    readonly orientation: string; readonly thickness: number;
    readonly lineColor: string; readonly lineOpacity: number;
  } };
}) {
  const c = element.config;
  const isHoriz = c.orientation === 'horizontal';
  return (
    <div style={{
      width: isHoriz ? '100%' : `${c.thickness}px`,
      height: isHoriz ? `${c.thickness}px` : '100%',
      backgroundColor: hexToRgba(c.lineColor || '#ffffff', c.lineOpacity),
      margin: 'auto',
    }} />
  );
}

function ImageElement({ element }: {
  readonly element: { readonly config: { readonly src: string; readonly objectFit: string } };
}) {
  if (!element.config.src) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)',
        fontSize: 18, fontWeight: 600, border: '2px dashed rgba(255,255,255,0.4)',
        letterSpacing: 1,
      }}>
        {CUSTOM_FIELD_LABELS.elementTypeLabels['image-block'] ?? 'Image'}
      </div>
    );
  }
  return (
    <img
      src={element.config.src}
      alt=""
      style={{
        width: '100%', height: '100%',
        objectFit: element.config.objectFit as 'cover' | 'contain' | 'fill',
      }}
    />
  );
}

function PlaceholderElement({ label }: { readonly label: string }) {
  const readableLabel = CUSTOM_FIELD_LABELS.elementTypeLabels[label] ?? label;
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.12)',
      border: '2px dashed rgba(255,255,255,0.4)',
      color: 'rgba(255,255,255,0.75)', fontSize: 18, fontWeight: 600,
      letterSpacing: 1,
    }}>
      {readableLabel}
    </div>
  );
}

export const FieldElementRenderer = memo(function FieldElementRenderer({
  element,
  state,
  colors,
  opacities,
  width,
  height,
  inlineEdit,
}: FieldElementRendererProps) {
  switch (element.type) {
    case 'score-display':
      return <ScoreElement state={state} colors={colors} opacities={opacities} element={element} />;
    case 'clock-display':
      return <ClockElement state={state} colors={colors} opacities={opacities} element={element} />;
    case 'period-display':
      return <PeriodElement state={state} colors={colors} opacities={opacities} element={element} />;
    case 'team-name':
      return <TeamNameElement state={state} colors={colors} opacities={opacities} element={element} />;
    case 'flag-display':
      return <FlagElement state={state} element={element} width={width} height={height} />;
    case 'timeout-display':
      return <TimeoutElement state={state} />;
    case 'shootout-display':
      return <ShootoutElement state={state} />;
    case 'text-block':
      if (inlineEdit?.isEditing) {
        return (
          <InlineTextEditor
            config={element.config as TextBlockConfig}
            originalContent={inlineEdit.originalContent}
            onCommit={inlineEdit.onCommit}
            onCancel={inlineEdit.onCancel}
          />
        );
      }
      return <TextBlockElement element={element} />;
    case 'shape-block':
      return <ShapeElement element={element} />;
    case 'separator-line':
      return <SeparatorElement element={element} />;
    case 'image-block':
      return <ImageElement element={element} />;
    case 'stat-line':
      return <StatLineElement state={state} colors={colors} opacities={opacities} element={element} />;
    case 'bar-compare':
      return <BarCompareElement state={state} colors={colors} opacities={opacities} element={element} />;
    case 'player-photo':
      return <PlayerPhotoElement element={element} width={width} height={height} />;
    case 'header-block':
      return <HeaderBlockElement state={state} colors={colors} opacities={opacities} />;
    case 'penalty-column':
      return <PenaltyColumnElement state={state} colors={colors} opacities={opacities} element={element} />;
    default: {
      /* Body types 1-13 imbriques dans le Layout libre */
      const bodyMatch = element.type.match(/^body-type-(\d+)$/);
      if (bodyMatch?.[1]) {
        const bodyId = parseInt(bodyMatch[1], 10);
        return (
          <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <EmbeddedBodyType bodyTypeId={bodyId} state={state} colors={colors} opacities={opacities} />
          </div>
        );
      }
      return <PlaceholderElement label={element.type} />;
    }
  }
});
