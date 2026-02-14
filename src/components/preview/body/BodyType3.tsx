import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { FONT_SIZES } from '@/constants/fontSizes';
import type { PlayerStat } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface BodyType3Props {
  readonly playerStats: readonly PlayerStat[];
  readonly titleCenter: string;
  readonly showPlayerPhoto: boolean;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
}

export function BodyType3({
  playerStats,
  titleCenter,
  showPlayerPhoto,
  showPenalties,
  colors,
  opacities,
  fontBody,
}: BodyType3Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const n = playerStats.length;
  const fs = FONT_SIZES[Math.min(Math.max(n, 1), 8)] ?? FONT_SIZES[1]!;
  const contentPad = showPenalties ? 10 : 40;
  const rowFs = fs.val * 0.55;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: `40px ${contentPad + 20}px`,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 5,
          fontFamily: ff(fontBody),
          textTransform: 'uppercase',
          color: col('titleText'),
          whiteSpace: 'nowrap',
          paddingBottom: 40,
          flexShrink: 0,
        }}
      >
        {titleCenter}
      </div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: showPlayerPhoto
            ? 'auto auto auto auto'
            : 'auto auto auto',
          gridTemplateRows: `repeat(${playerStats.length}, 1fr)`,
          gap: '0 35px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {playerStats.map((s, i) => {
          const nodes: React.ReactNode[] = [];

          nodes.push(
            <div
              key={`lb-${i}`}
              style={{
                fontSize: rowFs,
                fontWeight: 500,
                letterSpacing: 3,
                textTransform: 'uppercase',
                fontFamily: ff(fontBody),
                color: col('statLabel'),
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {s.label}
            </div>,
          );

          if (showPlayerPhoto) {
            nodes.push(
              <div
                key={`ph-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: rowFs * 1.3,
                    height: rowFs * 1.3,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    border: '2px solid rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: rowFs * 0.5,
                      fontWeight: 700,
                      fontFamily: ff(fontBody),
                      color: col('statVal'),
                      lineHeight: 1,
                    }}
                  >
                    {s.playerNumber}
                  </span>
                </div>
              </div>,
            );
          }

          nodes.push(
            <div
              key={`nm-${i}`}
              style={{
                fontSize: rowFs,
                fontWeight: 500,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontFamily: ff(fontBody),
                color: col('statVal'),
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {s.playerName}
            </div>,
          );

          nodes.push(
            <div
              key={`vr-${i}`}
              style={{
                fontSize: rowFs,
                fontWeight: 700,
                textAlign: 'right',
                fontFamily: ff(fontBody),
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: 2,
                color: col('statVal'),
                textShadow: `0 0 16px ${col('statVal')}5a`,
              }}
            >
              {s.value}
            </div>,
          );

          return nodes;
        })}
      </div>
    </div>
  );
}
