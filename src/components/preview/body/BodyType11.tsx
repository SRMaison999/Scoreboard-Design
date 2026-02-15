import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { BarChartData } from '@/types/bodyTypes/barChart';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface BodyType11Props {
  readonly barChartData: BarChartData;
  readonly team1: string;
  readonly team2: string;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
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
}: BodyType11Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, rows } = barChartData;

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
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: col('titleText'),
        }}
      >
        {title}
      </div>

      {/* Noms d'équipes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 10px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: col('statVal'), letterSpacing: 3 }}>{team1}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: col('statVal'), letterSpacing: 3 }}>{team2}</div>
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
                fontSize: 14,
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
                  width: 55,
                  textAlign: 'right',
                  fontSize: 20,
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                  color: col('statVal'),
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
                  fontSize: 20,
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
