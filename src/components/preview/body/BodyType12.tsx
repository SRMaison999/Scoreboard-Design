import { resolveElementStyle } from '@/utils/elementStyle';
import { ff } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import { POSITION_LABELS } from '@/constants/positions';
import type { RosterData } from '@/types/bodyTypes/roster';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';
import type { RosterStyleOverrides } from '@/types/elementStyleOverride';

interface BodyType12Props {
  readonly rosterData: RosterData;
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

const DEFAULTS_COACH: ElementDefaults = {
  fontSize: 16, fontWeight: 400, letterSpacing: 3,
  textTransform: 'none', colorKey: 'statLabel', hardcodedOpacity: 0.7,
};

const DEFAULTS_PLAYER_NUMBER: ElementDefaults = {
  fontSize: 20, fontWeight: 700, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_PLAYER_NAME: ElementDefaults = {
  fontSize: 20, fontWeight: 600, letterSpacing: 2,
  textTransform: 'uppercase', colorKey: 'statVal',
};

const DEFAULTS_POSITION: ElementDefaults = {
  fontSize: 16, fontWeight: 500, letterSpacing: 1,
  textTransform: 'none', colorKey: 'statLabel',
};

export function BodyType12({
  rosterData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  flagOverrides,
}: BodyType12Props) {
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale12 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const { title, team, coach, players, styleOverrides } = rosterData;
  const ov: RosterStyleOverrides = styleOverrides ?? {};

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);
  const coachStyle = resolveElementStyle(DEFAULTS_COACH, ctx, ov.coach);
  const playerNumberStyle = resolveElementStyle(DEFAULTS_PLAYER_NUMBER, ctx, ov.playerNumber);
  const playerNameStyle = resolveElementStyle(DEFAULTS_PLAYER_NAME, ctx, ov.playerName);
  const positionStyle = resolveElementStyle(DEFAULTS_POSITION, ctx, ov.position);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `16px ${pad + 20}px`,
        gap: 6,
        fontFamily: ff(fontBody),
        overflow: 'hidden',
      }}
    >
      {/* Titre + drapeau */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
        <Flag code={team} w={44} h={28} flagOverrides={flagOverrides} />
        <div
          style={{
            lineHeight: 1,
            ...titleStyle,
          }}
        >
          {title}
        </div>
      </div>

      {/* Entra\u00eeneur */}
      {coach && (
        <div style={{ marginBottom: 4, ...coachStyle }}>
          Coach : {coach}
        </div>
      )}

      {/* Liste des joueurs */}
      {players.map((player, i) => (
        <div
          key={`roster-${i}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '4px 20px',
            gap: 16,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              width: 40,
              fontVariantNumeric: 'tabular-nums',
              textAlign: 'center',
              ...playerNumberStyle,
            }}
          >
            {player.number}
          </div>
          <div
            style={{
              flex: 1,
              ...playerNameStyle,
            }}
          >
            {player.name}
          </div>
          <div
            style={{
              minWidth: 100,
              textAlign: 'right',
              whiteSpace: 'nowrap',
              ...positionStyle,
            }}
          >
            {POSITION_LABELS[player.position] ?? player.position}
          </div>
        </div>
      ))}
    </div>
  );
}
