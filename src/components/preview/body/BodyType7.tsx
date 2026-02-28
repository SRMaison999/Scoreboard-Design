import { resolveElementStyle, resolveColor } from '@/utils/elementStyle';
import { ff } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import type { FinalScoreData } from '@/types/bodyTypes/finalScore';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';

interface BodyType7Props {
  readonly finalScoreData: FinalScoreData;
  readonly team1: string;
  readonly team2: string;
  readonly score1: string;
  readonly score2: string;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
  readonly flagOverrides?: Record<string, string>;
}

const DEFAULTS_TITLE: ElementDefaults = {
  fontSize: 26, fontWeight: 600, letterSpacing: 8,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_TEAM_NAME: ElementDefaults = {
  fontSize: 20, fontWeight: 700, letterSpacing: 4,
  textTransform: 'none', colorKey: 'titleText',
};

const DEFAULTS_SCORE: ElementDefaults = {
  fontSize: 72, fontWeight: 900, letterSpacing: 8,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_PERIOD_SCORES: ElementDefaults = {
  fontSize: 16, fontWeight: 400, letterSpacing: 3,
  textTransform: 'none', colorKey: 'statLabel', hardcodedOpacity: 0.7,
};

const DEFAULTS_OVERTIME_NOTE: ElementDefaults = {
  fontSize: 18, fontWeight: 600, letterSpacing: 4,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_GWG: ElementDefaults = {
  fontSize: 14, fontWeight: 400, letterSpacing: 2,
  textTransform: 'none', colorKey: 'statLabel', hardcodedOpacity: 0.8,
};

export function BodyType7({
  finalScoreData,
  team1,
  team2,
  score1,
  score2,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  flagOverrides,
}: BodyType7Props) {
  const sc = fontSizes?.bodyScale7 ?? 100;
  const pad = showPenalties ? 10 : 40;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const { title, periodScores, showGwg, gwgPlayer, gwgTeam, gwgTime, overtimeNote, styleOverrides } = finalScoreData;
  const ov = styleOverrides ?? {};

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);
  const teamNameStyle = resolveElementStyle(DEFAULTS_TEAM_NAME, ctx, ov.teamName);
  const scoreStyle = resolveElementStyle(DEFAULTS_SCORE, ctx, ov.score);
  const periodScoresStyle = resolveElementStyle(DEFAULTS_PERIOD_SCORES, ctx, ov.periodScores);
  const overtimeNoteStyle = resolveElementStyle(DEFAULTS_OVERTIME_NOTE, ctx, ov.overtimeNote);
  const gwgStyle = resolveElementStyle(DEFAULTS_GWG, ctx, ov.gwg);

  const glowColor = resolveColor(DEFAULTS_SCORE.colorKey, ctx, ov.score);

  const periodSummary = periodScores
    .map((ps) => `${ps.scoreLeft}-${ps.scoreRight}`)
    .join('  /  ');

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `20px ${pad + 20}px`,
        gap: 20,
        fontFamily: ff(fontBody),
      }}
    >
      {/* Titre */}
      <div style={titleStyle}>
        {title}
      </div>

      {/* Score principal */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          marginTop: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Flag code={team1} w={70} h={44} flagOverrides={flagOverrides} />
          <span
            style={{
              lineHeight: 1,
              ...teamNameStyle,
            }}
          >
            {team1}
          </span>
        </div>
        <div
          style={{
            fontVariantNumeric: 'tabular-nums',
            textShadow: `0 0 30px ${glowColor}60`,
            ...scoreStyle,
          }}
        >
          {score1} - {score2}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span
            style={{
              lineHeight: 1,
              ...teamNameStyle,
            }}
          >
            {team2}
          </span>
          <Flag code={team2} w={70} h={44} flagOverrides={flagOverrides} />
        </div>
      </div>

      {/* Note prolongation */}
      {overtimeNote && (
        <div style={overtimeNoteStyle}>
          ({overtimeNote})
        </div>
      )}

      {/* Scores par periode */}
      {periodScores.length > 0 && (
        <div style={periodScoresStyle}>
          {periodSummary}
        </div>
      )}

      {/* But gagnant */}
      {showGwg && gwgPlayer && (
        <div
          style={{
            marginTop: 8,
            ...gwgStyle,
          }}
        >
          GWG : {gwgPlayer} ({gwgTeam}) {gwgTime}
        </div>
      )}
    </div>
  );
}
