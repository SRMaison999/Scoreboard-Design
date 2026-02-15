import { useScoreboardStore } from '@/stores/scoreboardStore';
import { displayTime } from '@/utils/time';

interface LowerThirdProps {
  readonly opacity: number;
}

export function LowerThird({ opacity }: LowerThirdProps) {
  const team1 = useScoreboardStore((s) => s.team1);
  const team2 = useScoreboardStore((s) => s.team2);
  const score1 = useScoreboardStore((s) => s.score1);
  const score2 = useScoreboardStore((s) => s.score2);
  const time = useScoreboardStore((s) => s.time);
  const period = useScoreboardStore((s) => s.period);
  const clockTenthsThreshold = useScoreboardStore((s) => s.clockTenthsThreshold);
  const colors = useScoreboardStore((s) => s.colors);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderTop: '2px solid rgba(255, 255, 255, 0.1)',
        fontFamily: 'Oswald, sans-serif',
        color: '#ffffff',
        zIndex: 100,
      }}
      data-testid="lower-third"
    >
      <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>
        {team1}
      </span>
      <span
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: colors.score,
          minWidth: 60,
          textAlign: 'center',
        }}
      >
        {score1} - {score2}
      </span>
      <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>
        {team2}
      </span>
      <span style={{ fontSize: 16, color: colors.time, marginLeft: 16 }}>
        {displayTime(time, clockTenthsThreshold)}
      </span>
      <span style={{ fontSize: 14, color: colors.period, opacity: 0.7 }}>
        {period}
      </span>
    </div>
  );
}
