import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { ScheduleData, MatchStatus } from '@/types/bodyTypes/schedule';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface BodyType13Props {
  readonly scheduleData: ScheduleData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
}

function statusColor(status: MatchStatus): string {
  switch (status) {
    case 'live': return 'rgba(255,60,60,0.9)';
    case 'finished': return 'rgba(255,255,255,0.35)';
    default: return 'rgba(255,255,255,0.6)';
  }
}

const STATUS_LABELS: Record<MatchStatus, string> = {
  upcoming: 'A VEN.',
  live: 'LIVE',
  finished: 'FIN',
};

export function BodyType13({
  scheduleData,
  showPenalties,
  colors,
  opacities,
  fontBody,
}: BodyType13Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, matches } = scheduleData;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `20px ${pad + 20}px`,
        gap: 8,
        fontFamily: ff(fontBody),
        overflow: 'hidden',
      }}
    >
      {/* Titre */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: col('titleText'),
          marginBottom: 6,
        }}
      >
        {title}
      </div>

      {/* Matchs */}
      {matches.map((match, i) => (
        <div
          key={`sched-${i}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '6px 10px',
            gap: 12,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ width: 50, fontSize: 14, color: col('statLabel'), flexShrink: 0 }}>
            {match.date}
          </div>
          <div
            style={{
              width: 46,
              fontSize: 16,
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              color: col('statVal'),
              flexShrink: 0,
            }}
          >
            {match.time}
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: col('statVal'),
            }}
          >
            <span>{match.teamLeft}</span>
            {match.status === 'finished' || match.status === 'live' ? (
              <span style={{ fontSize: 18, fontVariantNumeric: 'tabular-nums' }}>
                {match.scoreLeft} - {match.scoreRight}
              </span>
            ) : (
              <span style={{ fontSize: 14, color: col('statLabel') }}>vs</span>
            )}
            <span>{match.teamRight}</span>
          </div>
          <div
            style={{
              width: 50,
              fontSize: 12,
              fontWeight: 700,
              textAlign: 'center',
              color: statusColor(match.status),
              letterSpacing: 1,
              flexShrink: 0,
            }}
          >
            {STATUS_LABELS[match.status]}
          </div>
          {match.venue && (
            <div
              style={{
                width: 110,
                fontSize: 12,
                color: col('statLabel'),
                textAlign: 'right',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                flexShrink: 0,
              }}
            >
              {match.venue}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
