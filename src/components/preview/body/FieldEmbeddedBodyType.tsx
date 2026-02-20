/**
 * Rend un body type (1-13) a l'interieur d'un champ personnalise du Layout libre.
 * Reutilise les composants BodyType existants avec le state courant.
 */

import { BodyType1 } from './BodyType1';
import { BodyType2 } from './BodyType2';
import { BodyType3 } from './BodyType3';
import { BodyType4 } from './BodyType4';
import { BodyType5 } from './BodyType5';
import { BodyType6 } from './BodyType6';
import { BodyType7 } from './BodyType7';
import { BodyType8 } from './BodyType8';
import { BodyType9 } from './BodyType9';
import { BodyType10 } from './BodyType10';
import { BodyType11 } from './BodyType11';
import { BodyType12 } from './BodyType12';
import { BodyType13 } from './BodyType13';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';

interface EmbeddedBodyTypeProps {
  readonly bodyTypeId: number;
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
}

const EMPTY_PHOTOS: Record<string, string> = {};

export function EmbeddedBodyType({ bodyTypeId, state, colors, opacities }: EmbeddedBodyTypeProps) {
  const shared = {
    showPenalties: state.showPenalties,
    colors,
    opacities,
    fontBody: state.fontBody,
    fontSizes: state.fontSizes,
  };

  switch (bodyTypeId) {
    case 1:
      return <BodyType1 stats={state.stats} titleCenter={state.titleCenter} {...shared} />;
    case 2:
      return <BodyType2 stats={state.stats} titleLeft={state.titleLeft} titleRight={state.titleRight} {...shared} />;
    case 3:
      return <BodyType3 playerStats={state.playerStats} titleCenter={state.titleCenter} showPlayerPhoto={state.showPlayerPhoto} playerPhotos={EMPTY_PHOTOS} {...shared} />;
    case 4:
      return <BodyType4 goalData={state.goalData} team1={state.team1} team2={state.team2} {...shared} />;
    case 5:
      return <BodyType5 playerCardData={state.playerCardData} {...shared} />;
    case 6:
      return <BodyType6 standingsData={state.standingsData} {...shared} />;
    case 7:
      return <BodyType7 finalScoreData={state.finalScoreData} team1={state.team1} team2={state.team2} score1={state.score1} score2={state.score2} {...shared} />;
    case 8:
      return <BodyType8 freeTextData={state.freeTextData} {...shared} />;
    case 9:
      return <BodyType9 headToHeadData={state.headToHeadData} playerPhotos={EMPTY_PHOTOS} {...shared} />;
    case 10:
      return <BodyType10 timelineData={state.timelineData} {...shared} />;
    case 11:
      return <BodyType11 barChartData={state.barChartData} team1={state.team1} team2={state.team2} {...shared} />;
    case 12:
      return <BodyType12 rosterData={state.rosterData} {...shared} />;
    case 13:
      return <BodyType13 scheduleData={state.scheduleData} {...shared} />;
    default:
      return null;
  }
}
