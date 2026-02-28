import { resolveElementStyle, resolveColor } from '@/utils/elementStyle';
import { ff } from '@/utils/font';
import { FONT_SIZES } from '@/constants/fontSizes';
import { PhotoCircle } from '@/components/preview/PhotoCircle';
import type { PlayerStat } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { ElementDefaults, StyleContext } from '@/utils/elementStyle';
import type { PlayerStatsStyleOverrides } from '@/types/elementStyleOverride';

interface BodyType3Props {
  readonly playerStats: readonly PlayerStat[];
  readonly titleCenter: string;
  readonly showPlayerPhoto: boolean;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
  readonly playerPhotos?: Record<string, string>;
  readonly playerStatsStyleOverrides?: PlayerStatsStyleOverrides;
}

const DEFAULTS_TITLE: ElementDefaults = {
  fontSize: 26, fontWeight: 600, letterSpacing: 5,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_STAT_LABEL: ElementDefaults = {
  fontSize: 14, fontWeight: 500, letterSpacing: 3,
  textTransform: 'uppercase', colorKey: 'statLabel',
};

const DEFAULTS_PLAYER_NAME: ElementDefaults = {
  fontSize: 20, fontWeight: 500, letterSpacing: 2,
  textTransform: 'uppercase', colorKey: 'statVal',
};

const DEFAULTS_VALUE: ElementDefaults = {
  fontSize: 26, fontWeight: 700, letterSpacing: 2,
  textTransform: 'none', colorKey: 'statVal',
};

/**
 * Cherche la photo d'un joueur par numero dans la map des photos.
 * Les cles sont au format "TEAM-NUMBER" (ex: "CAN-11").
 */
function findPhotoByNumber(
  playerPhotos: Record<string, string>,
  playerNumber: string,
): string {
  for (const [key, url] of Object.entries(playerPhotos)) {
    if (key.endsWith(`-${playerNumber}`)) {
      return url;
    }
  }
  return '';
}

export function BodyType3({
  playerStats,
  titleCenter,
  showPlayerPhoto,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  playerPhotos = {},
  playerStatsStyleOverrides,
}: BodyType3Props) {
  const n = playerStats.length;
  const fs = FONT_SIZES[Math.min(Math.max(n, 1), 8)] ?? FONT_SIZES[1]!;
  const contentPad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale3 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const ov = playerStatsStyleOverrides ?? {};

  /** Base font size for rows, scaled by the stat count tier */
  const rowBaseFactor = Math.round(fs.val * 0.55);

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);

  const statLabelDefaults: ElementDefaults = { ...DEFAULTS_STAT_LABEL, fontSize: rowBaseFactor };
  const playerNameDefaults: ElementDefaults = { ...DEFAULTS_PLAYER_NAME, fontSize: rowBaseFactor };
  const valueDefaults: ElementDefaults = { ...DEFAULTS_VALUE, fontSize: rowBaseFactor };

  const statLabelStyle = resolveElementStyle(statLabelDefaults, ctx, ov.statLabel);
  const playerNameStyle = resolveElementStyle(playerNameDefaults, ctx, ov.playerName);
  const valueStyle = resolveElementStyle(valueDefaults, ctx, ov.value);
  const valueColor = resolveColor('statVal', ctx, ov.value);

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
          whiteSpace: 'nowrap',
          paddingBottom: 40,
          flexShrink: 0,
          ...titleStyle,
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
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                ...statLabelStyle,
              }}
            >
              {s.label}
            </div>,
          );

          if (showPlayerPhoto) {
            const photo = findPhotoByNumber(playerPhotos, s.playerNumber);
            const resolvedFontSize = valueStyle.fontSize;
            const photoSize = typeof resolvedFontSize === 'number' ? resolvedFontSize * 1.3 : rowBaseFactor * 1.3;
            const photoFallbackSize = typeof resolvedFontSize === 'number' ? resolvedFontSize * 0.5 : rowBaseFactor * 0.5;
            nodes.push(
              <div
                key={`ph-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PhotoCircle
                  photo={photo}
                  fallbackText={s.playerNumber}
                  size={photoSize}
                  fontSize={photoFallbackSize}
                  color={valueColor}
                  fontFamily={ff(fontBody)}
                />
              </div>,
            );
          }

          nodes.push(
            <div
              key={`nm-${i}`}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                ...playerNameStyle,
              }}
            >
              {s.playerName}
            </div>,
          );

          nodes.push(
            <div
              key={`vr-${i}`}
              style={{
                textAlign: 'right',
                fontVariantNumeric: 'tabular-nums',
                textShadow: `0 0 16px ${valueColor}5a`,
                ...valueStyle,
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
