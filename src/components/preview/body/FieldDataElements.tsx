/**
 * Renderers pour les elements "donnees" et "joueurs" des champs personnalises :
 * stat-line, bar-compare, player-photo.
 * Rendus sur le canvas (inline styles autorises).
 */

import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';

function col(colors: ColorMap, opacities: OpacityMap, key: keyof ColorMap): string {
  return hexToRgba(colors[key], opacities[key] ?? 0);
}

export function StatLineElement({ state, colors, opacities, element }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly element: { readonly config: { readonly statIndex: number } };
}) {
  const stat = state.stats[element.config.statIndex];
  if (!stat) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 12,
      }}>
        stat-line [{element.config.statIndex}]
      </div>
    );
  }

  const fontSize = state.fontSizes.statValue || 24;
  const labelSize = state.fontSizes.statLabel || 18;

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: ff(state.fontBody), padding: '0 12px',
    }}>
      <span style={{
        fontSize, fontWeight: 700,
        color: col(colors, opacities, 'statVal'),
        minWidth: '20%', textAlign: 'center',
      }}>
        {stat.valLeft}
      </span>
      <span style={{
        fontSize: labelSize, fontWeight: 600,
        color: col(colors, opacities, 'statLabel'),
        textTransform: 'uppercase', letterSpacing: 2,
        flex: 1, textAlign: 'center',
      }}>
        {stat.label}
      </span>
      <span style={{
        fontSize, fontWeight: 700,
        color: col(colors, opacities, 'statVal'),
        minWidth: '20%', textAlign: 'center',
      }}>
        {stat.valRight}
      </span>
    </div>
  );
}

export function BarCompareElement({ state, colors, opacities, element }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly element: { readonly config: { readonly barIndex: number } };
}) {
  const row = state.barChartData.rows[element.config.barIndex];
  if (!row) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 12,
      }}>
        bar-compare [{element.config.barIndex}]
      </div>
    );
  }

  const maxVal = Math.max(row.valueLeft, row.valueRight, 1);
  const leftPct = (row.valueLeft / maxVal) * 100;
  const rightPct = (row.valueRight / maxVal) * 100;

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', gap: 4, padding: '0 8px',
      fontFamily: ff(state.fontBody),
    }}>
      <div style={{
        fontSize: 14, fontWeight: 600, textAlign: 'center',
        color: col(colors, opacities, 'statLabel'),
        textTransform: 'uppercase', letterSpacing: 1,
      }}>
        {row.label}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontSize: 16, fontWeight: 700, minWidth: 40, textAlign: 'right',
          color: col(colors, opacities, 'teamName'),
        }}>
          {row.valueLeft}
        </span>
        <div style={{ flex: 1, display: 'flex', gap: 3, height: 16 }}>
          <div style={{
            width: `${leftPct}%`, height: '100%',
            background: col(colors, opacities, 'score'),
            borderRadius: 2,
          }} />
          <div style={{
            width: `${rightPct}%`, height: '100%',
            background: col(colors, opacities, 'scoreBox'),
            borderRadius: 2,
          }} />
        </div>
        <span style={{
          fontSize: 16, fontWeight: 700, minWidth: 40, textAlign: 'left',
          color: col(colors, opacities, 'teamName'),
        }}>
          {row.valueRight}
        </span>
      </div>
    </div>
  );
}

export function PlayerPhotoElement({ element, width, height }: {
  readonly element: { readonly config: { readonly photoKey: string; readonly shape: string } };
  readonly width: number;
  readonly height: number;
}) {
  const c = element.config;
  const dim = Math.min(width, height);
  const borderRadius = c.shape === 'circle' ? '50%' : 0;

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: dim, height: dim, borderRadius,
        backgroundColor: 'rgba(255,255,255,0.08)',
        border: '2px solid rgba(255,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.4)', fontSize: 11, overflow: 'hidden',
      }}>
        {c.photoKey || 'Photo'}
      </div>
    </div>
  );
}
