import { Flag } from './Flag';
import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { computeFlagDimensions } from '@/utils/fontScale';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { ShootoutAttempt } from '@/types/bodyTypes/shootout';
import type { LogoMode } from '@/types/logo';
import type { CSSProperties } from 'react';

interface HeaderProps {
  readonly team1: string;
  readonly team2: string;
  readonly score1: string;
  readonly score2: string;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontTeams: FontId;
  readonly fontSizeTeamName?: number;
  readonly fontSizeScore?: number;
  readonly showTimeouts?: boolean;
  readonly timeoutsLeft?: number;
  readonly timeoutsRight?: number;
  readonly showShootout?: boolean;
  readonly shootoutLeft?: readonly ShootoutAttempt[];
  readonly shootoutRight?: readonly ShootoutAttempt[];
  readonly logoMode?: LogoMode;
  readonly teamLogos?: Record<string, string>;
  readonly scorePopLeft?: boolean;
  readonly scorePopRight?: boolean;
}

function col(colors: ColorMap, opacities: OpacityMap, key: keyof ColorMap): string {
  return hexToRgba(colors[key], opacities[key] ?? 0);
}

function TimeoutDots({ count, maxTimeouts }: { readonly count: number; readonly maxTimeouts: number }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: maxTimeouts }, (_, i) => (
        <div
          key={`to-${i}`}
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: i < count ? 'rgba(255,193,7,0.9)' : 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        />
      ))}
    </div>
  );
}

function ShootoutDisplay({ attempts, color }: { readonly attempts: readonly ShootoutAttempt[]; readonly color: string }) {
  if (attempts.length === 0) return null;
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {attempts.map((a, i) => (
        <div
          key={`so-${i}`}
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            fontSize: 11,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            background: a.result === 'scored' ? 'rgba(76,175,80,0.8)'
              : a.result === 'missed' ? 'rgba(244,67,54,0.7)'
              : 'rgba(255,255,255,0.15)',
            color,
          }}
        >
          {a.result === 'scored' ? 'O' : a.result === 'missed' ? 'X' : '-'}
        </div>
      ))}
    </div>
  );
}

function TeamBadge({ code, logoMode, teamLogos, fontSizeTeamName }: {
  readonly code: string;
  readonly logoMode: LogoMode;
  readonly teamLogos: Record<string, string>;
  readonly fontSizeTeamName: number;
}) {
  const logoUrl = teamLogos[`team-${code}`] ?? '';
  const showFlag = logoMode === 'flag' || logoMode === 'both' || !logoUrl;
  const showLogo = (logoMode === 'logo' || logoMode === 'both') && logoUrl;
  const { w: flagW, h: flagH } = computeFlagDimensions(fontSizeTeamName);

  if (showLogo && !showFlag) {
    const logoStyle: CSSProperties = { width: flagW, height: flagH, objectFit: 'contain', flexShrink: 0 };
    return <img src={logoUrl} alt="" style={logoStyle} />;
  }

  if (showLogo && showFlag) {
    const smallH = Math.round(flagH * 0.7);
    const smallW = Math.round(smallH * 1.5);
    const logoStyle: CSSProperties = { width: flagH, height: flagH, objectFit: 'contain', flexShrink: 0 };
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Flag code={code} w={smallW} h={smallH} />
        <img src={logoUrl} alt="" style={logoStyle} />
      </div>
    );
  }

  return <Flag code={code} w={flagW} h={flagH} />;
}

const EMPTY_LOGOS: Record<string, string> = {};

export function Header({
  team1, team2, score1, score2,
  colors, opacities, fontTeams,
  fontSizeTeamName = 80, fontSizeScore = 80,
  showTimeouts = false, timeoutsLeft = 0, timeoutsRight = 0,
  showShootout = false, shootoutLeft = [], shootoutRight = [],
  logoMode = 'flag', teamLogos = EMPTY_LOGOS,
  scorePopLeft = false, scorePopRight = false,
}: HeaderProps) {
  const c = (key: keyof ColorMap) => col(colors, opacities, key);
  const hasScoreBox = !!colors.scoreBox;
  const maxTimeouts = 1;

  const baseScoreStyle: React.CSSProperties = {
    fontSize: fontSizeScore, fontWeight: 700, minWidth: 75, textAlign: 'center',
    textShadow: '0 4px 20px rgba(0,0,0,0.5)', color: c('score'),
    ...(hasScoreBox ? { background: c('scoreBox'), borderRadius: 8, padding: '2px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' } : {}),
  };
  const scorePopAnim = 'sb-score-pop 400ms ease-out';
  const score1Style: React.CSSProperties = { ...baseScoreStyle, ...(scorePopLeft ? { animation: scorePopAnim } : {}) };
  const score2Style: React.CSSProperties = { ...baseScoreStyle, ...(scorePopRight ? { animation: scorePopAnim } : {}) };

  const teamStyle: React.CSSProperties = {
    fontSize: fontSizeTeamName, fontWeight: 700, letterSpacing: 6,
    lineHeight: 1,
    textShadow: '0 3px 15px rgba(0,0,0,0.5)', color: c('teamName'),
  };

  return (
    <div style={{ fontFamily: ff(fontTeams) }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <TeamBadge code={team1} logoMode={logoMode} teamLogos={teamLogos} fontSizeTeamName={fontSizeTeamName} />
            {showShootout && <ShootoutDisplay attempts={shootoutLeft} color={c('teamName')} />}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={teamStyle}>{team1}</div>
            {showTimeouts && <TimeoutDots count={timeoutsLeft} maxTimeouts={maxTimeouts} />}
          </div>
          <div style={score1Style}>{score1}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={score2Style}>{score2}</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={teamStyle}>{team2}</div>
            {showTimeouts && <TimeoutDots count={timeoutsRight} maxTimeouts={maxTimeouts} />}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <TeamBadge code={team2} logoMode={logoMode} teamLogos={teamLogos} fontSizeTeamName={fontSizeTeamName} />
            {showShootout && <ShootoutDisplay attempts={shootoutRight} color={c('teamName')} />}
          </div>
        </div>
      </div>
    </div>
  );
}
