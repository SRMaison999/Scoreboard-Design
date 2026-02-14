import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { Penalty, PenaltySide } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface PenaltyColumnProps {
  readonly side: PenaltySide;
  readonly penalties: readonly Penalty[];
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
}

const PEN_W = 346;

export function PenaltyColumn({
  side,
  penalties,
  colors,
  opacities,
  fontBody,
}: PenaltyColumnProps) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);

  const isLeft = side === 'left';

  return (
    <div
      style={{
        width: PEN_W,
        display: 'grid',
        gridTemplateRows: 'repeat(8, 1fr)',
        padding: '10px 24px',
        flexShrink: 0,
        ...(isLeft
          ? { borderRight: '1px solid rgba(255,255,255,0.05)' }
          : { borderLeft: '1px solid rgba(255,255,255,0.05)' }),
      }}
    >
      {penalties.map((p, i) => (
        <div
          key={`${side}-${i}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: ff(fontBody),
            fontWeight: 600,
          }}
        >
          {isLeft ? (
            <>
              <span
                style={{
                  width: 172,
                  textAlign: 'right',
                  fontSize: 60,
                  color: col('penaltyTime'),
                  textShadow: `0 0 8px ${col('penaltyTime')}66`,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {p.time}
              </span>
              <span
                style={{
                  width: 115,
                  textAlign: 'center',
                  fontSize: 60,
                  color: col('penaltyNumber'),
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {p.number}
              </span>
            </>
          ) : (
            <>
              <span
                style={{
                  width: 115,
                  textAlign: 'center',
                  fontSize: 60,
                  color: col('penaltyNumber'),
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {p.number}
              </span>
              <span
                style={{
                  width: 172,
                  textAlign: 'left',
                  fontSize: 60,
                  color: col('penaltyTime'),
                  textShadow: `0 0 8px ${col('penaltyTime')}66`,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {p.time}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
