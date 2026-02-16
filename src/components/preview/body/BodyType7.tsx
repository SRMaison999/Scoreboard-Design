import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { bodyTitleFs, bodyValueFs, bodyLabelFs } from '@/utils/fontScale';
import { Flag } from '@/components/preview/Flag';
import type { FinalScoreData } from '@/types/bodyTypes/finalScore';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

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
}

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
}: BodyType7Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, periodScores, showGwg, gwgPlayer, gwgTeam, gwgTime, overtimeNote } = finalScoreData;

  const fsTitle = fontSizes ? bodyTitleFs(fontSizes, 32) : 32;
  const fsTeamName = fontSizes ? bodyValueFs(fontSizes, 48) : 48;
  const fsScore = fontSizes ? bodyValueFs(fontSizes, 90) : 90;
  const fsOvertime = fontSizes ? bodyLabelFs(fontSizes, 22) : 22;
  const fsPeriodSummary = fontSizes ? bodyLabelFs(fontSizes, 20) : 20;
  const fsGwg = fontSizes ? bodyLabelFs(fontSizes, 20) : 20;

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
        overflow: 'hidden',
      }}
    >
      {/* Titre */}
      <div
        style={{
          fontSize: fsTitle,
          fontWeight: 600,
          letterSpacing: 8,
          textTransform: 'uppercase',
          color: col('titleText'),
        }}
      >
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
          <Flag code={team1} w={70} h={44} />
          <span
            style={{
              fontSize: fsTeamName,
              fontWeight: 700,
              letterSpacing: 4,
              color: col('statVal'),
            }}
          >
            {team1}
          </span>
        </div>
        <div
          style={{
            fontSize: fsScore,
            fontWeight: 900,
            color: col('statVal'),
            fontVariantNumeric: 'tabular-nums',
            textShadow: `0 0 30px ${col('statVal')}60`,
            letterSpacing: 8,
          }}
        >
          {score1} - {score2}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span
            style={{
              fontSize: fsTeamName,
              fontWeight: 700,
              letterSpacing: 4,
              color: col('statVal'),
            }}
          >
            {team2}
          </span>
          <Flag code={team2} w={70} h={44} />
        </div>
      </div>

      {/* Note prolongation */}
      {overtimeNote && (
        <div style={{ fontSize: fsOvertime, fontWeight: 600, color: col('statLabel'), letterSpacing: 4 }}>
          ({overtimeNote})
        </div>
      )}

      {/* Scores par periode */}
      {periodScores.length > 0 && (
        <div style={{ fontSize: fsPeriodSummary, color: col('statLabel'), letterSpacing: 3, opacity: 0.7 }}>
          {periodSummary}
        </div>
      )}

      {/* But gagnant */}
      {showGwg && gwgPlayer && (
        <div
          style={{
            fontSize: fsGwg,
            color: col('statLabel'),
            letterSpacing: 2,
            marginTop: 8,
            opacity: 0.8,
          }}
        >
          GWG : {gwgPlayer} ({gwgTeam}) {gwgTime}
        </div>
      )}
    </div>
  );
}
