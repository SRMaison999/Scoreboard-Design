import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { FONT_SIZES } from '@/constants/fontSizes';
import type { StatLine } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface BodyType2Props {
  readonly stats: readonly StatLine[];
  readonly titleLeft: string;
  readonly titleRight: string;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
}

export function BodyType2({
  stats,
  titleLeft,
  titleRight,
  showPenalties,
  colors,
  opacities,
  fontBody,
}: BodyType2Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const n = stats.length;
  const fs = FONT_SIZES[Math.min(Math.max(n, 1), 8)] ?? FONT_SIZES[1]!;
  const contentPad = showPenalties ? 10 : 40;
  const labelW = showPenalties ? 240 : 300;

  const gridRows: string[] = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) gridRows.push('1fr');
    gridRows.push('auto');
    gridRows.push('1fr');
  }
  if (n === 0) gridRows.push('1fr');

  const titleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 600,
    letterSpacing: 5,
    fontFamily: ff(fontBody),
    textTransform: 'uppercase',
    color: col('titleText'),
    whiteSpace: 'nowrap',
  };

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
          els.push(<div key="tl" style={titleStyle}>{titleLeft}</div>);
          els.push(<div key="tc" />);
          els.push(<div key="tr" style={titleStyle}>{titleRight}</div>);
        }

        els.push(
          <div
            key={`vl-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: fs.val,
              fontWeight: 700,
              fontFamily: ff(fontBody),
              letterSpacing: 2,
              color: col('statVal'),
              textShadow: `0 0 16px ${col('statVal')}5a`,
            }}
          >
            {s.valLeft}
          </div>,
        );

        els.push(
          <div
            key={`lb-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: fs.label,
              fontWeight: 500,
              letterSpacing: 5,
              textTransform: 'uppercase',
              fontFamily: ff(fontBody),
              color: col('statLabel'),
            }}
          >
            {s.label}
          </div>,
        );

        els.push(
          <div
            key={`vr-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: fs.val,
              fontWeight: 700,
              fontFamily: ff(fontBody),
              letterSpacing: 2,
              color: col('statVal'),
              textShadow: `0 0 16px ${col('statVal')}5a`,
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
