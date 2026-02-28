import { hexToRgba } from '@/utils/color';
import { ff, scaleFontSize } from '@/utils/font';
import type { SpectatorsData } from '@/types/bodyTypes/spectators';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType16Props {
  readonly spectatorsData: SpectatorsData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
}

function CenteredPreset({
  data,
  col,
  sc,
}: {
  readonly data: SpectatorsData;
  readonly col: (key: keyof ColorMap) => string;
  readonly sc: number;
}) {
  return (
    <>
      {data.label && (
        <div
          style={{
            fontSize: scaleFontSize(18, sc),
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: col('statLabel'),
            opacity: 0.7,
          }}
        >
          {data.label}
        </div>
      )}
      <div
        style={{
          fontSize: scaleFontSize(72, sc),
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: 4,
          lineHeight: 1,
          color: col('statVal'),
        }}
      >
        {data.count}
      </div>
      {data.showVenue && data.venue && (
        <div
          style={{
            fontSize: scaleFontSize(18, sc),
            fontWeight: 500,
            color: col('statLabel'),
            letterSpacing: 2,
            opacity: 0.7,
            marginTop: 8,
          }}
        >
          {data.venue}
        </div>
      )}
      {data.showCapacity && data.capacity && (
        <div
          style={{
            fontSize: scaleFontSize(14, sc),
            fontWeight: 500,
            color: col('statLabel'),
            letterSpacing: 1,
            opacity: 0.5,
          }}
        >
          / {data.capacity}
        </div>
      )}
    </>
  );
}

function BannerPreset({
  data,
  col,
  sc,
}: {
  readonly data: SpectatorsData;
  readonly col: (key: keyof ColorMap) => string;
  readonly sc: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 20,
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {data.label && (
        <div
          style={{
            fontSize: scaleFontSize(24, sc),
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: col('statLabel'),
            opacity: 0.8,
          }}
        >
          {data.label}
        </div>
      )}
      <div
        style={{
          fontSize: scaleFontSize(48, sc),
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: 3,
          color: col('statVal'),
        }}
      >
        {data.count}
      </div>
      {data.showVenue && data.venue && (
        <div
          style={{
            fontSize: scaleFontSize(18, sc),
            fontWeight: 500,
            color: col('statLabel'),
            letterSpacing: 1,
            opacity: 0.6,
          }}
        >
          {data.venue}
        </div>
      )}
    </div>
  );
}

function CompactPreset({
  data,
  col,
  sc,
}: {
  readonly data: SpectatorsData;
  readonly col: (key: keyof ColorMap) => string;
  readonly sc: number;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
      {data.label && (
        <div
          style={{
            fontSize: scaleFontSize(16, sc),
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: col('statLabel'),
            opacity: 0.7,
          }}
        >
          {data.label}
        </div>
      )}
      <div
        style={{
          fontSize: scaleFontSize(36, sc),
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          color: col('statVal'),
        }}
      >
        {data.count}
      </div>
    </div>
  );
}

function DetailedPreset({
  data,
  col,
  sc,
}: {
  readonly data: SpectatorsData;
  readonly col: (key: keyof ColorMap) => string;
  readonly sc: number;
}) {
  return (
    <>
      {data.label && (
        <div
          style={{
            fontSize: scaleFontSize(20, sc),
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: col('statLabel'),
            opacity: 0.7,
          }}
        >
          {data.label}
        </div>
      )}
      <div
        style={{
          fontSize: scaleFontSize(60, sc),
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: 4,
          lineHeight: 1,
          color: col('statVal'),
        }}
      >
        {data.count}
      </div>
      {(data.showVenue || data.showCapacity) && (
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 12,
            alignItems: 'center',
          }}
        >
          {data.showVenue && data.venue && (
            <div
              style={{
                fontSize: scaleFontSize(20, sc),
                fontWeight: 500,
                color: col('statLabel'),
                letterSpacing: 2,
                opacity: 0.7,
              }}
            >
              {data.venue}
            </div>
          )}
          {data.showCapacity && data.capacity && (
            <div
              style={{
                fontSize: scaleFontSize(16, sc),
                fontWeight: 500,
                color: col('statLabel'),
                opacity: 0.5,
                letterSpacing: 1,
                padding: '2px 10px',
                border: `1px solid ${col('statLabel')}`,
                borderRadius: 4,
              }}
            >
              {data.capacity}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function BodyType16({
  spectatorsData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType16Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale16 ?? 100;
  const { title, preset } = spectatorsData;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `16px ${pad + 20}px`,
        gap: 6,
        fontFamily: ff(fontBody),
        overflow: 'hidden',
      }}
    >
      {title && (
        <div
          style={{
            fontSize: scaleFontSize(26, sc),
            fontWeight: 600,
            letterSpacing: 5,
            textTransform: 'uppercase',
            lineHeight: 1,
            color: col('titleText'),
            marginBottom: 12,
          }}
        >
          {title}
        </div>
      )}

      {preset === 'banner' && <BannerPreset data={spectatorsData} col={col} sc={sc} />}
      {preset === 'compact' && <CompactPreset data={spectatorsData} col={col} sc={sc} />}
      {preset === 'detailed' && <DetailedPreset data={spectatorsData} col={col} sc={sc} />}
      {(preset === 'centered' || preset === 'free') && <CenteredPreset data={spectatorsData} col={col} sc={sc} />}
    </div>
  );
}
