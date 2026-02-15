import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { FreeTextData } from '@/types/bodyTypes/freeText';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface BodyType8Props {
  readonly freeTextData: FreeTextData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
}

export function BodyType8({
  freeTextData,
  showPenalties,
  colors,
  opacities,
  fontBody,
}: BodyType8Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `40px ${pad + 40}px`,
        gap: 12,
        fontFamily: ff(fontBody),
      }}
    >
      {freeTextData.lines.map((line, i) => (
        <div
          key={`line-${i}`}
          style={{
            fontSize: line.fontSize,
            fontWeight: line.bold ? 700 : 400,
            textAlign: line.align,
            width: '100%',
            letterSpacing: line.fontSize > 40 ? 6 : 3,
            textTransform: 'uppercase',
            color: col('titleText'),
            lineHeight: 1.3,
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}
