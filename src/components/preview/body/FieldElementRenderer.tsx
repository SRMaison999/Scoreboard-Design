/**
 * Renderer pour les éléments individuels des champs personnalisés.
 * Dispatche vers le bon composant en fonction du type d'élément.
 */

import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FieldElementConfig } from '@/types/customField';

interface FieldElementRendererProps {
  readonly element: FieldElementConfig;
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly width: number;
  readonly height: number;
}

function col(colors: ColorMap, opacities: OpacityMap, key: keyof ColorMap): string {
  return hexToRgba(colors[key], opacities[key] ?? 0);
}

function ScoreElement({ state, colors, opacities, element }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly element: { readonly config: { readonly side: string } };
}) {
  const score = element.config.side === 'left' ? state.score1 : state.score2;
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: state.fontSizes.score, fontWeight: 700,
      fontFamily: ff(state.fontTeams), color: col(colors, opacities, 'score'),
    }}>
      {score}
    </div>
  );
}

function ClockElement({ state, colors, opacities }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
}) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: state.fontSizes.clockTime, fontWeight: 700,
      fontFamily: ff(state.fontClock), color: col(colors, opacities, 'time'),
    }}>
      {state.time}
    </div>
  );
}

function PeriodElement({ state, colors, opacities }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
}) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: state.fontSizes.period, fontWeight: 600,
      fontFamily: ff(state.fontClock), color: col(colors, opacities, 'period'),
      textTransform: 'uppercase', letterSpacing: 2,
    }}>
      {state.period}
    </div>
  );
}

function TeamNameElement({ state, colors, opacities, element }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly element: { readonly config: { readonly side: string } };
}) {
  const name = element.config.side === 'left' ? state.team1 : state.team2;
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: state.fontSizes.teamName, fontWeight: 700,
      fontFamily: ff(state.fontTeams), color: col(colors, opacities, 'teamName'),
      letterSpacing: 4, textTransform: 'uppercase',
    }}>
      {name}
    </div>
  );
}

function TextBlockElement({ element }: {
  readonly element: { readonly config: {
    readonly content: string; readonly fontSize: number;
    readonly fontWeight: number; readonly textAlign: string;
    readonly textTransform: string; readonly letterSpacing: number;
  } };
}) {
  const c = element.config;
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: c.textAlign,
      fontSize: c.fontSize, fontWeight: c.fontWeight,
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
        backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)',
        fontSize: 14,
      }}>
        Image
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
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.05)',
      border: '1px dashed rgba(255,255,255,0.2)',
      color: 'rgba(255,255,255,0.4)', fontSize: 12,
    }}>
      {label}
    </div>
  );
}

export function FieldElementRenderer({
  element,
  state,
  colors,
  opacities,
}: FieldElementRendererProps) {
  switch (element.type) {
    case 'score-display':
      return <ScoreElement state={state} colors={colors} opacities={opacities} element={element} />;
    case 'clock-display':
      return <ClockElement state={state} colors={colors} opacities={opacities} />;
    case 'period-display':
      return <PeriodElement state={state} colors={colors} opacities={opacities} />;
    case 'team-name':
      return <TeamNameElement state={state} colors={colors} opacities={opacities} element={element} />;
    case 'text-block':
      return <TextBlockElement element={element} />;
    case 'shape-block':
      return <ShapeElement element={element} />;
    case 'separator-line':
      return <SeparatorElement element={element} />;
    case 'image-block':
      return <ImageElement element={element} />;
    default:
      return <PlaceholderElement label={element.type} />;
  }
}
