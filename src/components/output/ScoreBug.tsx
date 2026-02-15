import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { OverlayPosition } from '@/types/multiScoreboard';

interface ScoreBugProps {
  readonly position: OverlayPosition;
  readonly opacity: number;
}

const POSITION_STYLES: Record<OverlayPosition, React.CSSProperties> = {
  'top-left': { top: 20, left: 20 },
  'top-center': { top: 20, left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: 20, right: 20 },
  'bottom-left': { bottom: 80, left: 20 },
  'bottom-center': { bottom: 80, left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: 80, right: 20 },
};

export function ScoreBug({ position, opacity }: ScoreBugProps) {
  const team1 = useScoreboardStore((s) => s.team1);
  const team2 = useScoreboardStore((s) => s.team2);
  const score1 = useScoreboardStore((s) => s.score1);
  const score2 = useScoreboardStore((s) => s.score2);
  const colors = useScoreboardStore((s) => s.colors);

  return (
    <div
      style={{
        position: 'absolute',
        ...POSITION_STYLES[position],
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderRadius: 6,
        padding: '6px 14px',
        fontFamily: 'Oswald, sans-serif',
        color: '#ffffff',
        zIndex: 101,
      }}
      data-testid="score-bug"
    >
      <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>
        {team1}
      </span>
      <span style={{ fontSize: 20, fontWeight: 700, color: colors.score }}>
        {score1}-{score2}
      </span>
      <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>
        {team2}
      </span>
    </div>
  );
}
