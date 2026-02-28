import { resolveElementStyle, resolveColor } from '@/utils/elementStyle';
import type { StatLine } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { ElementDefaults, StyleContext } from '@/utils/elementStyle';
import type { StatsStyleOverrides } from '@/types/elementStyleOverride';

interface BodyType2Props {
  readonly stats: readonly StatLine[];
  readonly titleLeft: string;
  readonly titleRight: string;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
  readonly statsStyleOverrides?: StatsStyleOverrides;
}

const DEFAULTS_TITLE: ElementDefaults = {
  fontSize: 26, fontWeight: 600, letterSpacing: 5,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_STAT_VALUE: ElementDefaults = {
  fontSize: 34, fontWeight: 700, letterSpacing: 2,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_STAT_LABEL: ElementDefaults = {
  fontSize: 18, fontWeight: 500, letterSpacing: 5,
  textTransform: 'uppercase', colorKey: 'statLabel',
};

export function BodyType2({
  stats,
  titleLeft,
  titleRight,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  statsStyleOverrides,
}: BodyType2Props) {
  const n = stats.length;
  const sc = fontSizes?.bodyScale2 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const ov = statsStyleOverrides ?? {};
  const contentPad = showPenalties ? 10 : 40;
  const labelW = showPenalties ? 240 : 300;

  const gridRows: string[] = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) gridRows.push('1fr');
    gridRows.push('auto');
    gridRows.push('1fr');
  }
  if (n === 0) gridRows.push('1fr');

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);
  const statValStyle = resolveElementStyle(DEFAULTS_STAT_VALUE, ctx, ov.statValue);
  const statLabelStyle = resolveElementStyle(DEFAULTS_STAT_LABEL, ctx, ov.statLabel);
  const statValColor = resolveColor('statVal', ctx, ov.statValue);

  return (
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: `1fr ${labelW}px 1fr`,
        gridTemplateRows: gridRows.join(' '),
        padding: `0 ${contentPad}px`,
      }}
    >
      {stats.map((s, i) => {
        const els: React.ReactNode[] = [];

        if (i === 0) {
          els.push(
            <div key="tl" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              whiteSpace: 'nowrap', ...titleStyle,
            }}>
              {titleLeft}
            </div>,
          );
          els.push(<div key="tc" />);
          els.push(
            <div key="tr" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              whiteSpace: 'nowrap', ...titleStyle,
            }}>
              {titleRight}
            </div>,
          );
        }

        els.push(
          <div
            key={`vl-${i}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textShadow: `0 0 16px ${statValColor}5a`,
              ...statValStyle,
            }}
          >
            {s.valLeft}
          </div>,
        );

        els.push(
          <div
            key={`lb-${i}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              ...statLabelStyle,
            }}
          >
            {s.label}
          </div>,
        );

        els.push(
          <div
            key={`vr-${i}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textShadow: `0 0 16px ${statValColor}5a`,
              ...statValStyle,
            }}
          >
            {s.valRight}
          </div>,
        );

        els.push(<div key={`sp-${i}`} style={{ gridColumn: '1 / -1' }} />);

        return els;
      })}
    </div>
  );
}
