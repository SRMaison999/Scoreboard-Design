import { Flag } from './Flag';
import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface HeaderProps {
  readonly team1: string;
  readonly team2: string;
  readonly score1: string;
  readonly score2: string;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontTeams: FontId;
}

function col(colors: ColorMap, opacities: OpacityMap, key: keyof ColorMap): string {
  return hexToRgba(colors[key], opacities[key] ?? 0);
}

export function Header({
  team1,
  team2,
  score1,
  score2,
  colors,
  opacities,
  fontTeams,
}: HeaderProps) {
  const c = (key: keyof ColorMap) => col(colors, opacities, key);
  const hasScoreBox = !!colors.scoreBox;

  const scoreStyle = (_value: string): React.CSSProperties => ({
    fontSize: 80,
    fontWeight: 700,
    minWidth: 75,
    textAlign: 'center',
    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
    color: c('score'),
    ...(hasScoreBox
      ? {
          background: c('scoreBox'),
          borderRadius: 8,
          padding: '2px 20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }
      : {}),
  });

  const teamStyle: React.CSSProperties = {
    fontSize: 80,
    fontWeight: 700,
    letterSpacing: 6,
    textShadow: '0 3px 15px rgba(0,0,0,0.5)',
    color: c('teamName'),
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: ff(fontTeams),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <Flag code={team1} />
        <div style={teamStyle}>{team1}</div>
        <div style={scoreStyle(score1)}>{score1}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={scoreStyle(score2)}>{score2}</div>
        <div style={teamStyle}>{team2}</div>
        <Flag code={team2} />
      </div>
    </div>
  );
}
