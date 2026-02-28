import { resolveElementStyle } from '@/utils/elementStyle';
import { ff } from '@/utils/font';
import type { TimelineData, TimelineEventType } from '@/types/bodyTypes/timeline';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';
import type { TimelineStyleOverrides } from '@/types/elementStyleOverride';

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

const DEFAULTS_TITLE: ElementDefaults = {
  fontSize: 26, fontWeight: 600, letterSpacing: 5,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_SYMBOL: ElementDefaults = {
  fontSize: 14, fontWeight: 700, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_PERIOD: ElementDefaults = {
  fontSize: 14, fontWeight: 400, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statLabel',
};

const DEFAULTS_TIME: ElementDefaults = {
  fontSize: 18, fontWeight: 600, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_TEAM: ElementDefaults = {
  fontSize: 14, fontWeight: 500, letterSpacing: 2,
  textTransform: 'uppercase', colorKey: 'statLabel',
};

const DEFAULTS_DESCRIPTION: ElementDefaults = {
  fontSize: 16, fontWeight: 400, letterSpacing: 1,
  textTransform: 'uppercase', colorKey: 'statVal',
};

export function BodyType10({
  timelineData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType10Props) {
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale10 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const { title, events, styleOverrides } = timelineData;
  const ov: TimelineStyleOverrides = styleOverrides ?? {};

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);
  const symbolStyle = resolveElementStyle(DEFAULTS_SYMBOL, ctx, ov.symbol);
  const periodStyle = resolveElementStyle(DEFAULTS_PERIOD, ctx, ov.period);
  const timeStyle = resolveElementStyle(DEFAULTS_TIME, ctx, ov.time);
  const teamStyle = resolveElementStyle(DEFAULTS_TEAM, ctx, ov.team);
  const descriptionStyle = resolveElementStyle(DEFAULTS_DESCRIPTION, ctx, ov.description);

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
              flexShrink: 0,
              ...symbolStyle,
            }}
          >
            {EVENT_SYMBOLS[event.type]}
          </div>
          <div style={{ width: 40, flexShrink: 0, ...periodStyle }}>
            {event.period}
          </div>
          <div
            style={{
              fontVariantNumeric: 'tabular-nums',
              width: 60,
              flexShrink: 0,
              ...timeStyle,
            }}
          >
            {event.time}
          </div>
          <div
            style={{
              width: 50,
              flexShrink: 0,
              ...teamStyle,
            }}
          >
            {event.team}
          </div>
          <div
            style={{
              flex: 1,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              ...descriptionStyle,
            }}
          >
            {event.description}
          </div>
        </div>
      ))}
    </div>
  );
}
