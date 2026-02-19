/**
 * Renderers pour les elements "match" des champs personnalises :
 * score, horloge, periode, nom d'equipe, drapeau, temps morts, tirs au but.
 * Chaque element supporte un fontSizeOverride local (0 = utiliser la valeur globale).
 */

import { Flag } from '@/components/preview/Flag';
import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';

function col(colors: ColorMap, opacities: OpacityMap, key: keyof ColorMap): string {
  return hexToRgba(colors[key], opacities[key] ?? 0);
}

function resolveFontSize(override: number | undefined, fallback: number): number {
  return (override && override > 0) ? override : fallback;
}

export function ScoreElement({ state, colors, opacities, element }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly element: { readonly config: { readonly side: string; readonly fontSizeOverride?: number } };
}) {
  const score = element.config.side === 'left' ? state.score1 : state.score2;
  const fontSize = resolveFontSize(element.config.fontSizeOverride, state.fontSizes.score);
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize, fontWeight: 700,
      fontFamily: ff(state.fontTeams), color: col(colors, opacities, 'score'),
    }}>
      {score}
    </div>
  );
}

export function ClockElement({ state, colors, opacities, element }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly element?: { readonly config: { readonly fontSizeOverride?: number } };
}) {
  const fontSize = resolveFontSize(element?.config.fontSizeOverride, state.fontSizes.clockTime);
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize, fontWeight: 700,
      fontFamily: ff(state.fontClock), color: col(colors, opacities, 'time'),
    }}>
      {state.time}
    </div>
  );
}

export function PeriodElement({ state, colors, opacities, element }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly element?: { readonly config: { readonly fontSizeOverride?: number } };
}) {
  const fontSize = resolveFontSize(element?.config.fontSizeOverride, state.fontSizes.period);
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize, fontWeight: 600,
      fontFamily: ff(state.fontClock), color: col(colors, opacities, 'period'),
      textTransform: 'uppercase', letterSpacing: 2,
    }}>
      {state.period}
    </div>
  );
}

export function TeamNameElement({ state, colors, opacities, element }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly element: { readonly config: { readonly side: string; readonly fontSizeOverride?: number } };
}) {
  const isLeft = element.config.side === 'left';
  const displayName = isLeft ? state.teamDisplayName1 : state.teamDisplayName2;
  const name = displayName || (isLeft ? state.team1 : state.team2);
  const fontSize = resolveFontSize(element.config.fontSizeOverride, state.fontSizes.teamName);
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize, fontWeight: 700,
      fontFamily: ff(state.fontTeams), color: col(colors, opacities, 'teamName'),
      letterSpacing: 4, textTransform: 'uppercase',
    }}>
      {name}
    </div>
  );
}

export function FlagElement({ state, element, width, height }: {
  readonly state: ScoreboardState;
  readonly element: { readonly config: { readonly side: string } };
  readonly width: number;
  readonly height: number;
}) {
  const code = element.config.side === 'left' ? state.team1 : state.team2;
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Flag code={code} w={Math.min(width, height * 1.5)} h={Math.min(height, width / 1.5)} />
    </div>
  );
}

export function TimeoutElement({ state }: { readonly state: ScoreboardState }) {
  const dots = [
    { label: state.team1, count: state.timeoutsLeft },
    { label: state.team2, count: state.timeoutsRight },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      color: '#ffffff', fontSize: 12,
    }}>
      {dots.map((d) => (
        <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ opacity: 0.6 }}>{d.label}</span>
          <div style={{
            width: 14, height: 14, borderRadius: '50%',
            background: d.count > 0 ? 'rgba(255,193,7,0.9)' : 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
          }} />
        </div>
      ))}
    </div>
  );
}

export function ShootoutElement({ state }: { readonly state: ScoreboardState }) {
  const sides = [
    { label: state.team1, attempts: state.shootoutLeft },
    { label: state.team2, attempts: state.shootoutRight },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      color: '#ffffff', fontSize: 12,
    }}>
      {sides.map((s) => (
        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ opacity: 0.6, marginRight: 4 }}>{s.label}</span>
          {s.attempts.map((a, i) => (
            <div key={`${s.label}-${i}`} style={{
              width: 16, height: 16, borderRadius: '50%',
              fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: a.result === 'scored' ? 'rgba(76,175,80,0.8)'
                : a.result === 'missed' ? 'rgba(244,67,54,0.8)'
                : 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              {a.result === 'scored' ? 'O' : a.result === 'missed' ? 'X' : '-'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
