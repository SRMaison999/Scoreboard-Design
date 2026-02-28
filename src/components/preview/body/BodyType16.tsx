import { resolveElementStyle, resolveColor } from '@/utils/elementStyle';
import { ff } from '@/utils/font';
import type { SpectatorsData } from '@/types/bodyTypes/spectators';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';
import type { SpectatorsStyleOverrides } from '@/types/elementStyleOverride';

interface BodyType16Props {
  readonly spectatorsData: SpectatorsData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
}

const DEFAULTS_TITLE: ElementDefaults = {
  fontSize: 26, fontWeight: 600, letterSpacing: 5,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_LABEL: ElementDefaults = {
  fontSize: 18, fontWeight: 600, letterSpacing: 6,
  textTransform: 'uppercase', colorKey: 'statLabel', hardcodedOpacity: 0.7,
};

const DEFAULTS_COUNT: ElementDefaults = {
  fontSize: 72, fontWeight: 700, letterSpacing: 4,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_VENUE: ElementDefaults = {
  fontSize: 18, fontWeight: 500, letterSpacing: 2,
  textTransform: 'none', colorKey: 'statLabel', hardcodedOpacity: 0.7,
};

const DEFAULTS_CAPACITY: ElementDefaults = {
  fontSize: 14, fontWeight: 500, letterSpacing: 1,
  textTransform: 'none', colorKey: 'statLabel', hardcodedOpacity: 0.5,
};

interface PresetProps {
  readonly data: SpectatorsData;
  readonly ctx: StyleContext;
  readonly ov: SpectatorsStyleOverrides;
}

function CenteredPreset({ data, ctx, ov }: PresetProps) {
  const labelStyle = resolveElementStyle(DEFAULTS_LABEL, ctx, ov.label);
  const countStyle = resolveElementStyle(DEFAULTS_COUNT, ctx, ov.count);
  const venueStyle = resolveElementStyle(DEFAULTS_VENUE, ctx, ov.venue);
  const capacityStyle = resolveElementStyle(DEFAULTS_CAPACITY, ctx, ov.capacity);

  return (
    <>
      {data.label && <div style={labelStyle}>{data.label}</div>}
      <div style={{ fontVariantNumeric: 'tabular-nums', lineHeight: 1, ...countStyle }}>{data.count}</div>
      {data.showVenue && data.venue && (
        <div style={{ marginTop: 8, ...venueStyle }}>{data.venue}</div>
      )}
      {data.showCapacity && data.capacity && (
        <div style={capacityStyle}>/ {data.capacity}</div>
      )}
    </>
  );
}

function BannerPreset({ data, ctx, ov }: PresetProps) {
  const labelStyle = resolveElementStyle(
    { ...DEFAULTS_LABEL, fontSize: 24, letterSpacing: 4, hardcodedOpacity: 0.8 }, ctx, ov.label,
  );
  const countStyle = resolveElementStyle(
    { ...DEFAULTS_COUNT, fontSize: 48, letterSpacing: 3 }, ctx, ov.count,
  );
  const venueStyle = resolveElementStyle(
    { ...DEFAULTS_VENUE, letterSpacing: 1, hardcodedOpacity: 0.6 }, ctx, ov.venue,
  );

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, width: '100%', justifyContent: 'center' }}>
      {data.label && <div style={labelStyle}>{data.label}</div>}
      <div style={{ fontVariantNumeric: 'tabular-nums', ...countStyle }}>{data.count}</div>
      {data.showVenue && data.venue && <div style={venueStyle}>{data.venue}</div>}
    </div>
  );
}

function CompactPreset({ data, ctx, ov }: PresetProps) {
  const labelStyle = resolveElementStyle(
    { ...DEFAULTS_LABEL, fontSize: 16, letterSpacing: 3 }, ctx, ov.label,
  );
  const countStyle = resolveElementStyle(
    { ...DEFAULTS_COUNT, fontSize: 36, letterSpacing: 0 }, ctx, ov.count,
  );

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
      {data.label && <div style={labelStyle}>{data.label}</div>}
      <div style={{ fontVariantNumeric: 'tabular-nums', ...countStyle }}>{data.count}</div>
    </div>
  );
}

function DetailedPreset({ data, ctx, ov }: PresetProps) {
  const labelStyle = resolveElementStyle(
    { ...DEFAULTS_LABEL, fontSize: 20 }, ctx, ov.label,
  );
  const countStyle = resolveElementStyle(
    { ...DEFAULTS_COUNT, fontSize: 60 }, ctx, ov.count,
  );
  const venueStyle = resolveElementStyle(
    { ...DEFAULTS_VENUE, fontSize: 20 }, ctx, ov.venue,
  );
  const capacityStyle = resolveElementStyle(
    { ...DEFAULTS_CAPACITY, fontSize: 16 }, ctx, ov.capacity,
  );
  const borderColor = resolveColor('statLabel', ctx, ov.capacity);

  return (
    <>
      {data.label && <div style={labelStyle}>{data.label}</div>}
      <div style={{ fontVariantNumeric: 'tabular-nums', lineHeight: 1, ...countStyle }}>{data.count}</div>
      {(data.showVenue || data.showCapacity) && (
        <div style={{ display: 'flex', gap: 24, marginTop: 12, alignItems: 'center' }}>
          {data.showVenue && data.venue && <div style={venueStyle}>{data.venue}</div>}
          {data.showCapacity && data.capacity && (
            <div style={{ padding: '2px 10px', border: `1px solid ${borderColor}`, borderRadius: 4, ...capacityStyle }}>
              {data.capacity}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function BodyType16({
  spectatorsData, showPenalties, colors, opacities, fontBody, fontSizes,
}: BodyType16Props) {
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale16 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const { title, preset, styleOverrides } = spectatorsData;
  const ov = styleOverrides ?? {};

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);

  return (
    <div
      style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: `16px ${pad + 20}px`, gap: 6,
        fontFamily: ff(fontBody), overflow: 'hidden',
      }}
    >
      {title && <div style={{ lineHeight: 1, marginBottom: 12, ...titleStyle }}>{title}</div>}
      {preset === 'banner' && <BannerPreset data={spectatorsData} ctx={ctx} ov={ov} />}
      {preset === 'compact' && <CompactPreset data={spectatorsData} ctx={ctx} ov={ov} />}
      {preset === 'detailed' && <DetailedPreset data={spectatorsData} ctx={ctx} ov={ov} />}
      {(preset === 'centered' || preset === 'free') && <CenteredPreset data={spectatorsData} ctx={ctx} ov={ov} />}
    </div>
  );
}
