import { resolveElementStyle, resolveColor } from '@/utils/elementStyle';
import { ff, scaleFontSize } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import { PhotoCircle } from '@/components/preview/PhotoCircle';
import type { PlayerCardData } from '@/types/bodyTypes/playerCard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { ElementDefaults, StyleContext } from '@/utils/elementStyle';
import type { PlayerCardStyleOverrides } from '@/types/elementStyleOverride';

interface BodyType5Props {
  readonly playerCardData: PlayerCardData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
  readonly flagOverrides?: Record<string, string>;
}

const DEFAULTS_TITLE: ElementDefaults = {
  fontSize: 26, fontWeight: 600, letterSpacing: 5,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_SUBTITLE: ElementDefaults = {
  fontSize: 14, fontWeight: 400, letterSpacing: 3,
  textTransform: 'none', colorKey: 'titleText', hardcodedOpacity: 0.7,
};

const DEFAULTS_PLAYER_NAME: ElementDefaults = {
  fontSize: 30, fontWeight: 700, letterSpacing: 4,
  textTransform: 'uppercase', colorKey: 'statVal',
};

const DEFAULTS_TEAM_NAME: ElementDefaults = {
  fontSize: 16, fontWeight: 400, letterSpacing: 4,
  textTransform: 'none', colorKey: 'titleText',
};

const DEFAULTS_STAT_VALUE: ElementDefaults = {
  fontSize: 28, fontWeight: 700, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_STAT_LABEL: ElementDefaults = {
  fontSize: 12, fontWeight: 500, letterSpacing: 2,
  textTransform: 'uppercase', colorKey: 'statLabel',
};

export function BodyType5({
  playerCardData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  flagOverrides,
}: BodyType5Props) {
  const sc = fontSizes?.bodyScale5 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const ov: PlayerCardStyleOverrides = playerCardData.styleOverrides ?? {};
  const pad = showPenalties ? 10 : 40;
  const { title, subtitle, playerName, playerNumber, playerTeam, playerPhoto, stats } = playerCardData;

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);
  const subtitleStyle = resolveElementStyle(DEFAULTS_SUBTITLE, ctx, ov.subtitle);
  const playerNameStyle = resolveElementStyle(DEFAULTS_PLAYER_NAME, ctx, ov.playerName);
  const teamNameStyle = resolveElementStyle(DEFAULTS_TEAM_NAME, ctx, ov.teamName);
  const statValueStyle = resolveElementStyle(DEFAULTS_STAT_VALUE, ctx, ov.statValue);
  const statValueColor = resolveColor('statVal', ctx, ov.statValue);
  const statLabelStyle = resolveElementStyle(DEFAULTS_STAT_LABEL, ctx, ov.statLabel);
  const playerNameColor = resolveColor('statVal', ctx, ov.playerName);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `20px ${pad + 20}px`,
        gap: 14,
        fontFamily: ff(fontBody),
      }}
    >
      {/* Titre */}
      <div style={titleStyle}>
        {title}
      </div>

      {subtitle && (
        <div style={subtitleStyle}>
          {subtitle}
        </div>
      )}

      {/* Photo du joueur */}
      <div style={{ marginTop: 8 }}>
        <PhotoCircle
          photo={playerPhoto}
          fallbackText={playerNumber}
          size={scaleFontSize(180, sc)}
          fontSize={scaleFontSize(56, sc)}
          color={playerNameColor}
          fontFamily={ff(fontBody)}
        />
      </div>

      {/* Nom + equipe */}
      <div style={playerNameStyle}>
        {playerName}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Flag code={playerTeam} w={50} h={32} flagOverrides={flagOverrides} />
        <span style={{ lineHeight: 1, ...teamNameStyle }}>
          {playerTeam}
        </span>
      </div>

      {/* Stats en ligne */}
      {stats.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 16,
            padding: '16px 30px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {stats.map((s, i) => (
            <div key={`st-${i}`} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontVariantNumeric: 'tabular-nums',
                  textShadow: `0 0 12px ${statValueColor}5a`,
                  ...statValueStyle,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  marginTop: 4,
                  ...statLabelStyle,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
