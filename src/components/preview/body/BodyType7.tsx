import { hexToRgba } from '@/utils/color';
import { ff, scaleFontSize } from '@/utils/font';
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
  readonly flagOverrides?: Record<string, string>;
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
  flagOverrides,
}: BodyType7Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const sc = fontSizes?.bodyScale7 ?? 100;
  const pad = showPenalties ? 10 : 40;
  const { title, periodScores, showGwg, gwgPlayer, gwgTeam, gwgTime, overtimeNote } = finalScoreData;

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
      <div
        style={{
          fontSize: scaleFontSize(32, sc),
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
          <Flag code={team1} w={70} h={44} flagOverrides={flagOverrides} />
          <span
            style={{
              fontSize: scaleFontSize(48, sc),
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
            fontSize: scaleFontSize(90, sc),
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
              fontSize: scaleFontSize(48, sc),
              fontWeight: 700,
              letterSpacing: 4,
              color: col('statVal'),
            }}
          >
            {team2}
          </span>
          <Flag code={team2} w={70} h={44} flagOverrides={flagOverrides} />
        </div>
      </div>

      {/* Note prolongation */}
      {overtimeNote && (
        <div style={{ fontSize: scaleFontSize(22, sc), fontWeight: 600, color: col('statLabel'), letterSpacing: 4 }}>
          ({overtimeNote})
        </div>
      )}

      {/* Scores par periode */}
      {periodScores.length > 0 && (
        <div style={{ fontSize: scaleFontSize(20, sc), color: col('statLabel'), letterSpacing: 3, opacity: 0.7 }}>
          {periodSummary}
        </div>
      )}

      {/* But gagnant */}
      {showGwg && gwgPlayer && (
        <div
          style={{
            fontSize: scaleFontSize(20, sc),
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
