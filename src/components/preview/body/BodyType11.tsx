import { hexToRgba } from '@/utils/color';
import { resolveElementStyle } from '@/utils/elementStyle';
import { ff } from '@/utils/font';
import type { BarChartData } from '@/types/bodyTypes/barChart';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';
import type { BarChartStyleOverrides } from '@/types/elementStyleOverride';

interface BodyType11Props {
  readonly barChartData: BarChartData;
  readonly team1: string;
  readonly team2: string;
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

const DEFAULTS_TEAM_NAME: ElementDefaults = {
  fontSize: 18, fontWeight: 700, letterSpacing: 3,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_ROW_LABEL: ElementDefaults = {
  fontSize: 14, fontWeight: 500, letterSpacing: 3,
  textTransform: 'uppercase', colorKey: 'statLabel',
};

const DEFAULTS_ROW_VALUE: ElementDefaults = {
  fontSize: 20, fontWeight: 700, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statVal',
};

function formatValue(value: number, format: 'percent' | 'absolute'): string {
  return format === 'percent' ? `${String(value)}%` : String(value);
}

export function BodyType11({
  barChartData,
  team1,
  team2,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType11Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale11 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const { title, rows, styleOverrides } = barChartData;
  const ov: BarChartStyleOverrides = styleOverrides ?? {};

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);
  const teamNameStyle = resolveElementStyle(DEFAULTS_TEAM_NAME, ctx, ov.teamName);
  const rowLabelStyle = resolveElementStyle(DEFAULTS_ROW_LABEL, ctx, ov.rowLabel);
  const rowValueStyle = resolveElementStyle(DEFAULTS_ROW_VALUE, ctx, ov.rowValue);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `20px ${pad + 20}px`,
        gap: 12,
        fontFamily: ff(fontBody),
      }}
    >
      {/* Titre */}
      <div style={titleStyle}>
        {title}
      </div>

      {/* Noms d'équipes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 10px' }}>
        <div style={teamNameStyle}>{team1}</div>
        <div style={teamNameStyle}>{team2}</div>
      </div>

      {/* Barres */}
      {rows.map((row, i) => {
        const max = row.format === 'percent' ? 100 : Math.max(row.valueLeft, row.valueRight, 1);
        const pctLeft = (row.valueLeft / max) * 100;
        const pctRight = (row.valueRight / max) * 100;

        return (
          <div key={`bar-${i}`} style={{ width: '100%' }}>
            <div
              style={{
                textAlign: 'center',
                marginBottom: 4,
                ...rowLabelStyle,
              }}
            >
              {row.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 55,
                  textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                  ...rowValueStyle,
                }}
              >
                {formatValue(row.valueLeft, row.format)}
              </div>
              <div style={{ flex: 1, display: 'flex', gap: 3, height: 18 }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      width: `${String(pctLeft)}%`,
                      background: `linear-gradient(90deg, transparent, ${col('statVal')})`,
                      borderRadius: 2,
                      opacity: 0.7,
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                  <div
                    style={{
                      width: `${String(pctRight)}%`,
                      background: `linear-gradient(270deg, transparent, ${col('statVal')})`,
                      borderRadius: 2,
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  width: 55,
                  textAlign: 'left',
                  fontVariantNumeric: 'tabular-nums',
                  ...rowValueStyle,
                }}
              >
                {formatValue(row.valueRight, row.format)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
