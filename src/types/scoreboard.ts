import type { ColorMap, OpacityMap } from './colors';
import type { FontId } from './fonts';
import type { GoalData } from './bodyTypes/goal';
import type { PlayerCardData } from './bodyTypes/playerCard';
import type { StandingsData } from './bodyTypes/standings';
import type { FinalScoreData } from './bodyTypes/finalScore';
import type { FreeTextData } from './bodyTypes/freeText';
import type { ShootoutAttempt } from './bodyTypes/shootout';
import type { BackgroundMediaMode } from './media';
import type { FontSizeConfig } from './fontSizes';

export type BodyTypeId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BgMode = 'uniform' | 'gradient';

export type ClockBoxMode = 'never' | 'always' | 'stopped' | 'running';

export interface BodyTypeOption {
  readonly id: BodyTypeId;
  readonly label: string;
}

export interface PeriodOption {
  label: string;
  next: string;
  duration: string;
}

export interface PlayerStat {
  label: string;
  value: string;
  playerName: string;
  playerNumber: string;
}

export interface StatLine {
  valLeft: string;
  label: string;
  valRight: string;
}

export interface Penalty {
  time: string;
  number: string;
}

export type PenaltySide = 'left' | 'right';

export interface FontSizeEntry {
  readonly val: number;
  readonly label: number;
}

export interface ScoreboardState {
  bodyType: BodyTypeId;
  bgMode: BgMode;
  showPenalties: boolean;

  team1: string;
  team2: string;
  score1: string;
  score2: string;

  time: string;
  period: string;
  showClock: boolean;
  clockBoxMode: ClockBoxMode;

  periodOptions: PeriodOption[];

  demoRunning: boolean;

  titleCenter: string;
  titleLeft: string;
  titleRight: string;

  fontTeams: FontId;
  fontClock: FontId;
  fontBody: FontId;

  colors: ColorMap;
  opacities: OpacityMap;

  showPlayerPhoto: boolean;
  playerStats: PlayerStat[];

  stats: StatLine[];

  penaltiesLeft: Penalty[];
  penaltiesRight: Penalty[];

  /* Type 4 : Celebration de but */
  goalData: GoalData;

  /* Type 5 : Fiche joueur */
  playerCardData: PlayerCardData;

  /* Type 6 : Classement */
  standingsData: StandingsData;

  /* Type 7 : Score final */
  finalScoreData: FinalScoreData;

  /* Type 8 : Texte libre */
  freeTextData: FreeTextData;

  /* Header : timeouts */
  showTimeouts: boolean;
  timeoutsLeft: number;
  timeoutsRight: number;

  /* Header : tirs au but */
  showShootout: boolean;
  shootoutLeft: ShootoutAttempt[];
  shootoutRight: ShootoutAttempt[];

  /* Média de fond */
  backgroundMediaMode: BackgroundMediaMode;
  backgroundMediaUrl: string;

  /* Dimensions du template */
  templateWidth: number;
  templateHeight: number;

  /* Tailles de police individuelles */
  fontSizes: FontSizeConfig;
}
