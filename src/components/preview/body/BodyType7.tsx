import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import type { FinalScoreData } from '@/types/bodyTypes/finalScore';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

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
}: BodyType7Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
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
          fontSize: 32,
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
              fontSize: 48,
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
            fontSize: 90,
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
              fontSize: 48,
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
        <div style={{ fontSize: 22, fontWeight: 600, color: col('statLabel'), letterSpacing: 4 }}>
          ({overtimeNote})
        </div>
      )}

      {/* Scores par periode */}
      {periodScores.length > 0 && (
        <div style={{ fontSize: 20, color: col('statLabel'), letterSpacing: 3, opacity: 0.7 }}>
          {periodSummary}
        </div>
      )}

      {/* But gagnant */}
      {showGwg && gwgPlayer && (
        <div
          style={{
            fontSize: 20,
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
