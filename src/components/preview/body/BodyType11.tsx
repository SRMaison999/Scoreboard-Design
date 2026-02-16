import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { bodyTitleFs, bodyValueFs, bodyLabelFs } from '@/utils/fontScale';
import type { BarChartData } from '@/types/bodyTypes/barChart';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

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
  const { title, rows } = barChartData;

  const fsTitle = fontSizes ? bodyTitleFs(fontSizes, 26) : 26;
  const fsTeam = fontSizes ? bodyValueFs(fontSizes, 18) : 18;
  const fsRowLabel = fontSizes ? bodyLabelFs(fontSizes, 14) : 14;
  const fsRowValue = fontSizes ? bodyValueFs(fontSizes, 20) : 20;
  const barH = fontSizes ? bodyValueFs(fontSizes, 18) : 18;
  const valueColW = fontSizes ? bodyValueFs(fontSizes, 55) : 55;

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
      <div
        style={{
          fontSize: fsTitle,
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: col('titleText'),
        }}
      >
        {title}
      </div>

      {/* Noms d'equipes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 10px' }}>
        <div style={{ fontSize: fsTeam, fontWeight: 700, color: col('statVal'), letterSpacing: 3 }}>{team1}</div>
        <div style={{ fontSize: fsTeam, fontWeight: 700, color: col('statVal'), letterSpacing: 3 }}>{team2}</div>
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
                fontSize: fsRowLabel,
                fontWeight: 500,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: col('statLabel'),
                marginBottom: 4,
              }}
            >
              {row.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: valueColW,
                  textAlign: 'right',
                  fontSize: fsRowValue,
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                  color: col('statVal'),
                }}
              >
                {formatValue(row.valueLeft, row.format)}
              </div>
              <div style={{ flex: 1, display: 'flex', gap: 3, height: barH }}>
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
                  width: valueColW,
                  textAlign: 'left',
                  fontSize: fsRowValue,
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                  color: col('statVal'),
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
