import type { ColorMap, OpacityMap } from './colors';
import type { FontId } from './fonts';

export type BodyTypeId = 1 | 2 | 3;

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
}
