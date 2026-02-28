import { resolveElementStyle, resolveColor } from '@/utils/elementStyle';
import { ff, scaleFontSize } from '@/utils/font';
import type { ScheduleData, MatchStatus } from '@/types/bodyTypes/schedule';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';
import type { ScheduleStyleOverrides } from '@/types/elementStyleOverride';

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

const DEFAULTS_TITLE: ElementDefaults = {
  fontSize: 26, fontWeight: 600, letterSpacing: 5,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_DATE: ElementDefaults = {
  fontSize: 14, fontWeight: 400, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statLabel',
};

const DEFAULTS_TIME: ElementDefaults = {
  fontSize: 16, fontWeight: 600, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_TEAM_NAME: ElementDefaults = {
  fontSize: 20, fontWeight: 700, letterSpacing: 2,
  textTransform: 'uppercase', colorKey: 'statVal',
};

const DEFAULTS_SCORE: ElementDefaults = {
  fontSize: 18, fontWeight: 700, letterSpacing: 2,
  textTransform: 'uppercase', colorKey: 'statVal',
};

const DEFAULTS_STATUS: ElementDefaults = {
  fontSize: 12, fontWeight: 700, letterSpacing: 1,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_VENUE: ElementDefaults = {
  fontSize: 12, fontWeight: 400, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statLabel',
};

export function BodyType13({
  scheduleData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType13Props) {
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale13 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const { title, matches, styleOverrides } = scheduleData;
  const ov: ScheduleStyleOverrides = styleOverrides ?? {};

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);
  const dateStyle = resolveElementStyle(DEFAULTS_DATE, ctx, ov.date);
  const timeStyle = resolveElementStyle(DEFAULTS_TIME, ctx, ov.time);
  const teamNameStyle = resolveElementStyle(DEFAULTS_TEAM_NAME, ctx, ov.teamName);
  const scoreStyle = resolveElementStyle(DEFAULTS_SCORE, ctx, ov.score);
  const statusBaseStyle = resolveElementStyle(DEFAULTS_STATUS, ctx, ov.status);
  const venueStyle = resolveElementStyle(DEFAULTS_VENUE, ctx, ov.venue);

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
          marginBottom: 6,
          ...titleStyle,
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
          <div style={{ width: 50, flexShrink: 0, ...dateStyle }}>
            {match.date}
          </div>
          <div
            style={{
              width: 46,
              fontVariantNumeric: 'tabular-nums',
              flexShrink: 0,
              ...timeStyle,
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
              ...teamNameStyle,
            }}
          >
            <span>{match.teamLeft}</span>
            {match.status === 'finished' || match.status === 'live' ? (
              <span style={{ fontVariantNumeric: 'tabular-nums', ...scoreStyle }}>
                {match.scoreLeft} - {match.scoreRight}
              </span>
            ) : (
              <span style={{ fontSize: scaleFontSize(14, sc), color: resolveColor('statLabel', ctx) }}>vs</span>
            )}
            <span>{match.teamRight}</span>
          </div>
          <div
            style={{
              width: 50,
              textAlign: 'center',
              flexShrink: 0,
              ...statusBaseStyle,
              color: ov.status?.color ? statusBaseStyle.color : statusColor(match.status),
            }}
          >
            {STATUS_LABELS[match.status]}
          </div>
          {match.venue && (
            <div
              style={{
                width: 110,
                textAlign: 'right',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                flexShrink: 0,
                ...venueStyle,
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
