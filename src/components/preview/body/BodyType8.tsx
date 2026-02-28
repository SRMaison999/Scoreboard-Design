import { resolveElementStyle } from '@/utils/elementStyle';
import { ff, scaleFontSize } from '@/utils/font';
import type { FreeTextData } from '@/types/bodyTypes/freeText';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';

interface BodyType8Props {
  readonly freeTextData: FreeTextData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
}

const DEFAULTS_LINE: ElementDefaults = {
  fontSize: 30, fontWeight: 400, letterSpacing: 3,
  textTransform: 'uppercase', colorKey: 'titleText',
};

export function BodyType8({
  freeTextData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType8Props) {
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale8 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const ov = freeTextData.styleOverrides ?? {};

  const baseStyle = resolveElementStyle(DEFAULTS_LINE, ctx, ov.line);

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
            ...baseStyle,
            fontSize: scaleFontSize(line.fontSize, sc),
            fontWeight: line.bold ? 700 : (baseStyle.fontWeight ?? 400),
            textAlign: line.align,
            letterSpacing: line.fontSize > 40 ? 6 : (baseStyle.letterSpacing ?? 3),
            width: '100%',
            lineHeight: 1.3,
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}
