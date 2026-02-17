import { hexToRgba } from '@/utils/color';
import { ff, scaleFontSize } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import { PhotoCircle } from '@/components/preview/PhotoCircle';
import type { GoalData } from '@/types/bodyTypes/goal';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

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
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const sc = fontSizes?.bodyScale4 ?? 100;
  const pad = showPenalties ? 10 : 40;
  const scoringTeam = goalData.scoringTeamSide === 'left' ? team1 : team2;
  const hasAssist1 = goalData.assist1Name.trim() !== '';
  const hasAssist2 = goalData.assist2Name.trim() !== '';

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
          fontSize: scaleFontSize(72, sc),
          fontWeight: 900,
          letterSpacing: 12,
          textTransform: 'uppercase',
          color: col('titleText'),
          textShadow: `0 0 40px ${col('titleText')}80`,
        }}
      >
        GOAL
      </div>

      {/* Equipe + drapeau */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Flag code={scoringTeam} w={60} h={38} flagOverrides={flagOverrides} />
        <div
          style={{
            fontSize: scaleFontSize(36, sc),
            fontWeight: 700,
            letterSpacing: 6,
            color: col('statVal'),
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
        color={col('statVal')}
        fontFamily={ff(fontBody)}
      />

      {/* Nom du buteur */}
      <div
        style={{
          fontSize: scaleFontSize(40, sc),
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: col('statVal'),
        }}
      >
        {goalData.scorerName}
      </div>

      {/* Stats du buteur */}
      <div style={{ display: 'flex', gap: 30, fontSize: scaleFontSize(22, sc), color: col('statLabel') }}>
        {goalData.goalCountMatch && (
          <span>{goalData.goalCountMatch}e but du match</span>
        )}
        {goalData.goalCountTournament && (
          <span>{goalData.goalCountTournament}e but du tournoi</span>
        )}
      </div>

      {/* Assists */}
      {hasAssist1 && (
        <div style={{ fontSize: scaleFontSize(24, sc), color: col('statLabel'), letterSpacing: 2 }}>
          Assist : #{goalData.assist1Number} {goalData.assist1Name}
        </div>
      )}
      {hasAssist2 && (
        <div style={{ fontSize: scaleFontSize(22, sc), color: col('statLabel'), letterSpacing: 2, opacity: 0.8 }}>
          Assist 2 : #{goalData.assist2Number} {goalData.assist2Name}
        </div>
      )}

      {/* Temps et periode */}
      <div
        style={{
          fontSize: scaleFontSize(20, sc),
          color: col('statLabel'),
          opacity: 0.7,
          letterSpacing: 3,
          marginTop: 8,
        }}
      >
        {goalData.goalTime} - {goalData.goalPeriod}
      </div>
    </div>
  );
}
