import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { HeadToHeadData } from '@/types/bodyTypes/headToHead';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface BodyType9Props {
  readonly headToHeadData: HeadToHeadData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
}

export function BodyType9({
  headToHeadData,
  showPenalties,
  colors,
  opacities,
  fontBody,
}: BodyType9Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, playerLeft, playerRight, stats } = headToHeadData;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `20px ${pad + 20}px`,
        gap: 10,
        fontFamily: ff(fontBody),
      }}
    >
      {/* Titre */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: col('titleText'),
        }}
      >
        {title}
      </div>

      {/* Noms des joueurs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '8px 20px',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: col('statVal'), letterSpacing: 2 }}>
            {playerLeft.name}
          </div>
          <div style={{ fontSize: 16, color: col('statLabel'), letterSpacing: 2 }}>
            #{playerLeft.number} {playerLeft.team}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: col('statVal'), letterSpacing: 2 }}>
            {playerRight.name}
          </div>
          <div style={{ fontSize: 16, color: col('statLabel'), letterSpacing: 2 }}>
            {playerRight.team} #{playerRight.number}
          </div>
        </div>
      </div>

      {/* Lignes de stats */}
      {stats.map((stat, i) => (
        <div
          key={`h2h-${i}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '6px 20px',
            borderTop: i === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: 'left',
              fontSize: 26,
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
              color: col('statVal'),
            }}
          >
            {stat.valueLeft}
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: col('statLabel'),
            }}
          >
            {stat.label}
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'right',
              fontSize: 26,
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
              color: col('statVal'),
            }}
          >
            {stat.valueRight}
          </div>
        </div>
      ))}
    </div>
  );
}
