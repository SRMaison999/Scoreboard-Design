import { resolveElementStyle, resolveColor } from '@/utils/elementStyle';
import { ff, scaleFontSize } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import { PhotoCircle } from '@/components/preview/PhotoCircle';
import type { GoalData } from '@/types/bodyTypes/goal';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { ElementDefaults, StyleContext } from '@/utils/elementStyle';
import type { GoalStyleOverrides } from '@/types/elementStyleOverride';

interface BodyType4Props {
  readonly goalData: GoalData;
  readonly team1: string;
  readonly team2: string;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
  readonly flagOverrides?: Record<string, string>;
}

const DEFAULTS_GOAL_TEXT: ElementDefaults = {
  fontSize: 72, fontWeight: 900, letterSpacing: 12,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_TEAM_NAME: ElementDefaults = {
  fontSize: 20, fontWeight: 700, letterSpacing: 6,
  textTransform: 'none', colorKey: 'titleText',
};

const DEFAULTS_SCORER_NAME: ElementDefaults = {
  fontSize: 36, fontWeight: 700, letterSpacing: 4,
  textTransform: 'uppercase', colorKey: 'statVal',
};

const DEFAULTS_ASSIST: ElementDefaults = {
  fontSize: 18, fontWeight: 400, letterSpacing: 2,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_ASSIST_SECONDARY: ElementDefaults = {
  fontSize: 16, fontWeight: 400, letterSpacing: 2,
  textTransform: 'none', colorKey: 'statVal', hardcodedOpacity: 0.8,
};

const DEFAULTS_TIME_PERIOD: ElementDefaults = {
  fontSize: 14, fontWeight: 400, letterSpacing: 3,
  textTransform: 'none', colorKey: 'statLabel', hardcodedOpacity: 0.7,
};

export function BodyType4({
  goalData,
  team1,
  team2,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  flagOverrides,
}: BodyType4Props) {
  const sc = fontSizes?.bodyScale4 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const ov: GoalStyleOverrides = goalData.styleOverrides ?? {};
  const pad = showPenalties ? 10 : 40;
  const scoringTeam = goalData.scoringTeamSide === 'left' ? team1 : team2;
  const hasAssist1 = goalData.assist1Name.trim() !== '';
  const hasAssist2 = goalData.assist2Name.trim() !== '';

  const goalTextStyle = resolveElementStyle(DEFAULTS_GOAL_TEXT, ctx, ov.goalText);
  const goalTextColor = resolveColor('titleText', ctx, ov.goalText);
  const teamNameStyle = resolveElementStyle(DEFAULTS_TEAM_NAME, ctx, ov.teamName);
  const scorerNameStyle = resolveElementStyle(DEFAULTS_SCORER_NAME, ctx, ov.scorerName);
  const assistStyle = resolveElementStyle(DEFAULTS_ASSIST, ctx, ov.assist);
  const assistSecondaryStyle = resolveElementStyle(DEFAULTS_ASSIST_SECONDARY, ctx, ov.assistSecondary);
  const timePeriodStyle = resolveElementStyle(DEFAULTS_TIME_PERIOD, ctx, ov.timePeriod);
  const scorerColor = resolveColor('statVal', ctx, ov.scorerName);
  const statLabelColor = resolveColor('statLabel', ctx, ov.timePeriod);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `20px ${pad + 20}px`,
        gap: 16,
        fontFamily: ff(fontBody),
      }}
    >
      {/* GOAL! */}
      <div
        style={{
          textShadow: `0 0 40px ${goalTextColor}80`,
          ...goalTextStyle,
        }}
      >
        GOAL
      </div>

      {/* Equipe + drapeau */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Flag code={scoringTeam} w={60} h={38} flagOverrides={flagOverrides} />
        <div
          style={{
            lineHeight: 1,
            ...teamNameStyle,
          }}
        >
          {scoringTeam}
        </div>
      </div>

      {/* Photo du buteur */}
      <PhotoCircle
        photo={goalData.scorerPhoto}
        fallbackText={goalData.scorerNumber}
        size={scaleFontSize(140, sc)}
        fontSize={scaleFontSize(48, sc)}
        color={scorerColor}
        fontFamily={ff(fontBody)}
      />

      {/* Nom du buteur */}
      <div style={scorerNameStyle}>
        {goalData.scorerName}
      </div>

      {/* Stats du buteur */}
      <div style={{ display: 'flex', gap: 30, fontSize: scaleFontSize(22, sc), color: statLabelColor }}>
        {goalData.goalCountMatch && (
          <span>{goalData.goalCountMatch}e but du match</span>
        )}
        {goalData.goalCountTournament && (
          <span>{goalData.goalCountTournament}e but du tournoi</span>
        )}
      </div>

      {/* Assists */}
      {hasAssist1 && (
        <div style={assistStyle}>
          Assist : #{goalData.assist1Number} {goalData.assist1Name}
        </div>
      )}
      {hasAssist2 && (
        <div style={assistSecondaryStyle}>
          Assist 2 : #{goalData.assist2Number} {goalData.assist2Name}
        </div>
      )}

      {/* Temps et periode */}
      <div
        style={{
          marginTop: 8,
          ...timePeriodStyle,
        }}
      >
        {goalData.goalTime} - {goalData.goalPeriod}
      </div>
    </div>
  );
}
