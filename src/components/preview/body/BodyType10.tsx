import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { bodyTitleFs, bodyValueFs, bodyLabelFs } from '@/utils/fontScale';
import type { TimelineData, TimelineEventType } from '@/types/bodyTypes/timeline';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType10Props {
  readonly timelineData: TimelineData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
}

const EVENT_SYMBOLS: Record<TimelineEventType, string> = {
  goal: 'G',
  penalty: 'P',
  timeout: 'T',
  period: '-',
};

export function BodyType10({
  timelineData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType10Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, events } = timelineData;

  const fsTitle = fontSizes ? bodyTitleFs(fontSizes, 26) : 26;
  const fsIcon = fontSizes ? bodyLabelFs(fontSizes, 14) : 14;
  const fsPeriod = fontSizes ? bodyLabelFs(fontSizes, 14) : 14;
  const fsTime = fontSizes ? bodyValueFs(fontSizes, 18) : 18;
  const fsTeam = fontSizes ? bodyLabelFs(fontSizes, 14) : 14;
  const fsDesc = fontSizes ? bodyValueFs(fontSizes, 16) : 16;
  const iconSize = fontSizes ? bodyValueFs(fontSizes, 30) : 30;

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

      {/* Lignes d'evenements */}
      {events.map((event, i) => (
        <div
          key={`tl-${i}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '5px 10px',
            gap: 14,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: '50%',
              background: event.type === 'goal' ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: fsIcon,
              fontWeight: 700,
              color: col('statVal'),
              flexShrink: 0,
            }}
          >
            {EVENT_SYMBOLS[event.type]}
          </div>
          <div style={{ fontSize: fsPeriod, color: col('statLabel'), width: 40, flexShrink: 0 }}>
            {event.period}
          </div>
          <div
            style={{
              fontSize: fsTime,
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              color: col('statVal'),
              width: 60,
              flexShrink: 0,
            }}
          >
            {event.time}
          </div>
          <div
            style={{
              fontSize: fsTeam,
              fontWeight: 500,
              letterSpacing: 2,
              color: col('statLabel'),
              width: 50,
              flexShrink: 0,
              textTransform: 'uppercase',
            }}
          >
            {event.team}
          </div>
          <div
            style={{
              flex: 1,
              fontSize: fsDesc,
              color: col('statVal'),
              textTransform: 'uppercase',
              letterSpacing: 1,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {event.description}
          </div>
        </div>
      ))}
    </div>
  );
}
