import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
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
  const titleScale = fontSizes ? fontSizes.title / 30 : 1;

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
        overflow: 'hidden',
      }}
    >
      {freeTextData.lines.map((line, i) => {
        const scaledFs = Math.max(10, Math.round(line.fontSize * titleScale));
        return (
          <div
            key={`line-${i}`}
            style={{
              fontSize: scaledFs,
              fontWeight: line.bold ? 700 : 400,
              textAlign: line.align,
              width: '100%',
              letterSpacing: scaledFs > 40 ? 6 : 3,
              textTransform: 'uppercase',
              color: col('titleText'),
              lineHeight: 1.3,
            }}
          >
            {line.text}
          </div>
        );
      })}
    </div>
  );
}
