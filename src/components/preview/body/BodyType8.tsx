import { hexToRgba } from '@/utils/color';
import { ff, scaleFontSize } from '@/utils/font';
import type { FreeTextData } from '@/types/bodyTypes/freeText';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType8Props {
  readonly freeTextData: FreeTextData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
}

export function BodyType8({
  freeTextData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType8Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale8 ?? 100;

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
            fontSize: scaleFontSize(line.fontSize, sc),
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
