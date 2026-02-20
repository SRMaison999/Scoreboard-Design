/**
 * CanvasRulers : regles graduees en pixels affichees sur les bords
 * superieur et gauche du canvas en mode layout libre (BodyType14).
 * Les regles sont de l'interface editeur (Tailwind CSS, pas inline styles).
 */

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

/** Epaisseur (largeur / hauteur) des regles en pixels */
const RULER_THICKNESS = 20;

/** Hauteur des grands traits de graduation */
const MAJOR_TICK_HEIGHT = 10;

/** Hauteur des petits traits de graduation */
const MINOR_TICK_HEIGHT = 5;

interface CanvasRulersProps {
  readonly canvasWidth: number;
  readonly canvasHeight: number;
  readonly scale: number;
  readonly panX: number;
  readonly panY: number;
}

interface TickConfig {
  readonly majorInterval: number;
  readonly minorInterval: number;
}

/** Determine les intervalles de graduation selon le niveau de zoom. */
function getTickConfig(scale: number): TickConfig {
  if (scale > 0.5) {
    return { majorInterval: 50, minorInterval: 10 };
  }
  if (scale > 0.25) {
    return { majorInterval: 100, minorInterval: 50 };
  }
  return { majorInterval: 200, minorInterval: 100 };
}

interface TickMark {
  readonly position: number;
  readonly isMajor: boolean;
  readonly label: string | null;
}

/** Genere la liste des graduations pour un axe donne. */
function generateTicks(
  canvasSize: number,
  pan: number,
  scale: number,
  config: TickConfig,
): readonly TickMark[] {
  const ticks: TickMark[] = [];
  const { majorInterval, minorInterval } = config;

  /* Pixel de debut et de fin visibles dans l'espace canvas */
  const startCanvas = Math.max(0, Math.floor(-pan / scale));
  const viewportSize = canvasSize;

  /* Aligner sur le premier multiple de minorInterval */
  const firstTick = Math.floor(startCanvas / minorInterval) * minorInterval;
  const lastTick = Math.min(viewportSize, Math.ceil((startCanvas + viewportSize) / minorInterval) * minorInterval);

  for (let v = firstTick; v <= lastTick; v += minorInterval) {
    if (v < 0) continue;
    if (v > canvasSize) break;
    const isMajor = v % majorInterval === 0;
    ticks.push({
      position: v,
      isMajor,
      label: isMajor ? `${v}` : null,
    });
  }

  return ticks;
}

/** Regle horizontale (bord superieur du canvas). */
function HorizontalRuler({
  canvasWidth,
  scale,
  panX,
  tickConfig,
}: {
  readonly canvasWidth: number;
  readonly scale: number;
  readonly panX: number;
  readonly tickConfig: TickConfig;
}) {
  const ticks = useMemo(
    () => generateTicks(canvasWidth, panX, scale, tickConfig),
    [canvasWidth, panX, scale, tickConfig],
  );

  const unit = CUSTOM_FIELD_LABELS.rulerUnit;

  return (
    <div
      data-testid="ruler-horizontal"
      className={cn('absolute top-0 h-5 bg-gray-900 overflow-hidden select-none pointer-events-none')}
      style={{
        left: RULER_THICKNESS,
        right: 0,
      }}
    >
      {ticks.map((tick) => {
        const screenX = tick.position * scale + panX;
        return (
          <div
            key={`h-${tick.position}`}
            className="absolute top-0"
            style={{
              left: screenX,
              width: 1,
              height: tick.isMajor ? MAJOR_TICK_HEIGHT : MINOR_TICK_HEIGHT,
            }}
          >
            <div className="w-px h-full bg-gray-600" />
            {tick.label !== null && (
              <span
                className="absolute text-gray-500 whitespace-nowrap"
                style={{
                  fontSize: 9,
                  left: 2,
                  top: tick.isMajor ? MAJOR_TICK_HEIGHT : MINOR_TICK_HEIGHT,
                  lineHeight: 1,
                }}
              >
                {tick.label}{unit}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Regle verticale (bord gauche du canvas). */
function VerticalRuler({
  canvasHeight,
  scale,
  panY,
  tickConfig,
}: {
  readonly canvasHeight: number;
  readonly scale: number;
  readonly panY: number;
  readonly tickConfig: TickConfig;
}) {
  const ticks = useMemo(
    () => generateTicks(canvasHeight, panY, scale, tickConfig),
    [canvasHeight, panY, scale, tickConfig],
  );

  const unit = CUSTOM_FIELD_LABELS.rulerUnit;

  return (
    <div
      data-testid="ruler-vertical"
      className={cn('absolute left-0 w-5 bg-gray-900 overflow-hidden select-none pointer-events-none')}
      style={{
        top: RULER_THICKNESS,
        bottom: 0,
      }}
    >
      {ticks.map((tick) => {
        const screenY = tick.position * scale + panY;
        return (
          <div
            key={`v-${tick.position}`}
            className="absolute left-0"
            style={{
              top: screenY,
              height: 1,
              width: tick.isMajor ? MAJOR_TICK_HEIGHT : MINOR_TICK_HEIGHT,
            }}
          >
            <div className="h-px w-full bg-gray-600" />
            {tick.label !== null && (
              <span
                className="absolute text-gray-500 whitespace-nowrap origin-top-left"
                style={{
                  fontSize: 9,
                  left: tick.isMajor ? MAJOR_TICK_HEIGHT + 2 : MINOR_TICK_HEIGHT + 2,
                  top: 2,
                  lineHeight: 1,
                }}
              >
                {tick.label}{unit}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * CanvasRulers affiche deux regles graduees (horizontale et verticale)
 * ainsi qu'un carre de coin a l'intersection superieure gauche.
 */
export function CanvasRulers({ canvasWidth, canvasHeight, scale, panX, panY }: CanvasRulersProps) {
  const tickConfig = useMemo(() => getTickConfig(scale), [scale]);

  return (
    <div data-testid="canvas-rulers" className="absolute inset-0 pointer-events-none" style={{ zIndex: 9990 }}>
      {/* Carre de coin (intersection haut-gauche) */}
      <div
        data-testid="ruler-corner"
        className="absolute top-0 left-0 w-5 h-5 bg-gray-900"
      />

      <HorizontalRuler
        canvasWidth={canvasWidth}
        scale={scale}
        panX={panX}
        tickConfig={tickConfig}
      />

      <VerticalRuler
        canvasHeight={canvasHeight}
        scale={scale}
        panY={panY}
        tickConfig={tickConfig}
      />
    </div>
  );
}
