import { resolveElementStyle, resolveColor } from '@/utils/elementStyle';
import { ff, scaleFontSize } from '@/utils/font';
import { PhotoCircle } from '@/components/preview/PhotoCircle';
import { playerPhotoKey } from '@/types/playerPhoto';
import type { HeadToHeadData } from '@/types/bodyTypes/headToHead';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';

interface BodyType9Props {
  readonly headToHeadData: HeadToHeadData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly playerPhotos?: Record<string, string>;
  readonly fontSizes?: FontSizeConfig;
}

const DEFAULTS_TITLE: ElementDefaults = {
  fontSize: 26, fontWeight: 600, letterSpacing: 5,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_PLAYER_NAME: ElementDefaults = {
  fontSize: 22, fontWeight: 700, letterSpacing: 2,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_PLAYER_INFO: ElementDefaults = {
  fontSize: 14, fontWeight: 400, letterSpacing: 2,
  textTransform: 'none', colorKey: 'statLabel',
};

const DEFAULTS_STAT_VALUE: ElementDefaults = {
  fontSize: 28, fontWeight: 700, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_STAT_LABEL: ElementDefaults = {
  fontSize: 14, fontWeight: 500, letterSpacing: 3,
  textTransform: 'uppercase', colorKey: 'statLabel',
};

export function BodyType9({
  headToHeadData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  playerPhotos = {},
  fontSizes,
}: BodyType9Props) {
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale9 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const { title, playerLeft, playerRight, stats, styleOverrides } = headToHeadData;
  const ov = styleOverrides ?? {};
  const photoLeft = playerPhotos[playerPhotoKey(playerLeft.team, playerLeft.number)] ?? '';
  const photoRight = playerPhotos[playerPhotoKey(playerRight.team, playerRight.number)] ?? '';

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);
  const playerNameStyle = resolveElementStyle(DEFAULTS_PLAYER_NAME, ctx, ov.playerName);
  const playerInfoStyle = resolveElementStyle(DEFAULTS_PLAYER_INFO, ctx, ov.playerInfo);
  const statValueStyle = resolveElementStyle(DEFAULTS_STAT_VALUE, ctx, ov.statValue);
  const statLabelStyle = resolveElementStyle(DEFAULTS_STAT_LABEL, ctx, ov.statLabel);

  const photoColor = resolveColor('statVal', ctx, ov.playerName);

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
      <div style={titleStyle}>
        {title}
      </div>

      {/* Photos et noms des joueurs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '8px 20px',
        }}
      >
        <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 16 }}>
          <PhotoCircle
            photo={photoLeft}
            fallbackText={playerLeft.number}
            size={scaleFontSize(64, sc)}
            fontSize={scaleFontSize(24, sc)}
            color={photoColor}
            fontFamily={ff(fontBody)}
          />
          <div>
            <div style={playerNameStyle}>
              {playerLeft.name}
            </div>
            <div style={playerInfoStyle}>
              #{playerLeft.number} {playerLeft.team}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={playerNameStyle}>
              {playerRight.name}
            </div>
            <div style={playerInfoStyle}>
              {playerRight.team} #{playerRight.number}
            </div>
          </div>
          <PhotoCircle
            photo={photoRight}
            fallbackText={playerRight.number}
            size={scaleFontSize(64, sc)}
            fontSize={scaleFontSize(24, sc)}
            color={photoColor}
            fontFamily={ff(fontBody)}
          />
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
              fontVariantNumeric: 'tabular-nums',
              ...statValueStyle,
            }}
          >
            {stat.valueLeft}
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              ...statLabelStyle,
            }}
          >
            {stat.label}
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'right',
              fontVariantNumeric: 'tabular-nums',
              ...statValueStyle,
            }}
          >
            {stat.valueRight}
          </div>
        </div>
      ))}
    </div>
  );
}
