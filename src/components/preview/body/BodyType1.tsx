import { hexToRgba } from '@/utils/color';
import { ff, scaleFontSize } from '@/utils/font';
import { FONT_SIZES } from '@/constants/fontSizes';
import type { StatLine } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType1Props {
  readonly stats: readonly StatLine[];
  readonly titleCenter: string;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
}

export function BodyType1({
  stats,
  titleCenter,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType1Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const n = stats.length;
  const autoFs = FONT_SIZES[Math.min(Math.max(n, 1), 8)] ?? FONT_SIZES[1]!;
  const scale = fontSizes?.bodyScale1 ?? 100;
  const fsVal = scaleFontSize(fontSizes?.statValue || autoFs.val, scale);
  const fsLabel = scaleFontSize(fontSizes?.statLabel || autoFs.label, scale);
  const fsTitle = scaleFontSize(fontSizes?.title || 30, scale);
  const contentPad = showPenalties ? 10 : 40;
  const labelW = showPenalties ? 240 : 300;

  const gridRows: string[] = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) gridRows.push('1fr');
    gridRows.push('auto');
    gridRows.push('1fr');
  }
  if (n === 0) gridRows.push('1fr');

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
            <div
              key="title"
              style={{
                gridColumn: '1 / -1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: fsTitle,
                fontWeight: 600,
                letterSpacing: 5,
                fontFamily: ff(fontBody),
                textTransform: 'uppercase',
                color: col('titleText'),
                whiteSpace: 'nowrap',
              }}
            >
              {titleCenter}
            </div>,
          );
        }

        els.push(
          <div
            key={`vl-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 40,
              fontSize: fsVal,
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
              fontSize: fsLabel,
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
              justifyContent: 'flex-start',
              paddingLeft: 40,
              fontSize: fsVal,
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
