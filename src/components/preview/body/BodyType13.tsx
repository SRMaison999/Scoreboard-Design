import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { bodyTitleFs, bodyValueFs, bodyLabelFs } from '@/utils/fontScale';
import type { ScheduleData, MatchStatus } from '@/types/bodyTypes/schedule';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType13Props {
  readonly scheduleData: ScheduleData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
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
  fontSizes,
}: BodyType13Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, matches } = scheduleData;

  const fsTitle = fontSizes ? bodyTitleFs(fontSizes, 26) : 26;
  const fsDate = fontSizes ? bodyLabelFs(fontSizes, 14) : 14;
  const fsTime = fontSizes ? bodyValueFs(fontSizes, 16) : 16;
  const fsTeams = fontSizes ? bodyValueFs(fontSizes, 20) : 20;
  const fsScore = fontSizes ? bodyValueFs(fontSizes, 18) : 18;
  const fsStatus = fontSizes ? bodyLabelFs(fontSizes, 12) : 12;
  const fsVenue = fontSizes ? bodyLabelFs(fontSizes, 12) : 12;
  const fsVs = fontSizes ? bodyLabelFs(fontSizes, 14) : 14;
  const dateColW = fontSizes ? bodyLabelFs(fontSizes, 50) : 50;
  const timeColW = fontSizes ? bodyValueFs(fontSizes, 46) : 46;
  const statusColW = fontSizes ? bodyLabelFs(fontSizes, 50) : 50;
  const venueColW = fontSizes ? bodyLabelFs(fontSizes, 110) : 110;

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
          fontSize: fsTitle,
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
          <div style={{ width: dateColW, fontSize: fsDate, color: col('statLabel'), flexShrink: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {match.date}
          </div>
          <div
            style={{
              width: timeColW,
              fontSize: fsTime,
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
              fontSize: fsTeams,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: col('statVal'),
            }}
          >
            <span>{match.teamLeft}</span>
            {match.status === 'finished' || match.status === 'live' ? (
              <span style={{ fontSize: fsScore, fontVariantNumeric: 'tabular-nums' }}>
                {match.scoreLeft} - {match.scoreRight}
              </span>
            ) : (
              <span style={{ fontSize: fsVs, color: col('statLabel') }}>vs</span>
            )}
            <span>{match.teamRight}</span>
          </div>
          <div
            style={{
              width: statusColW,
              fontSize: fsStatus,
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
                width: venueColW,
                fontSize: fsVenue,
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
