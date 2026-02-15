import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { TimelineData, TimelineEventType } from '@/types/bodyTypes/timeline';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface BodyType10Props {
  readonly timelineData: TimelineData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
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
}: BodyType10Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, events } = timelineData;

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

      {/* Lignes d'événements */}
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
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: event.type === 'goal' ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              color: col('statVal'),
              flexShrink: 0,
            }}
          >
            {EVENT_SYMBOLS[event.type]}
          </div>
          <div style={{ fontSize: 14, color: col('statLabel'), width: 40, flexShrink: 0 }}>
            {event.period}
          </div>
          <div
            style={{
              fontSize: 18,
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
              fontSize: 14,
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
              fontSize: 16,
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
