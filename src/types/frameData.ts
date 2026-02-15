import type { FontSizeConfig } from '@/types/fontSizes';
import type { PeriodOption, StatLine, PlayerStat } from '@/types/scoreboard';
import type { GoalData } from '@/types/bodyTypes/goal';
import type { PlayerCardData } from '@/types/bodyTypes/playerCard';
import type { StandingsData } from '@/types/bodyTypes/standings';
import type { FinalScoreData } from '@/types/bodyTypes/finalScore';
import type { FreeTextData } from '@/types/bodyTypes/freeText';
import type { HeadToHeadData } from '@/types/bodyTypes/headToHead';
import type { TimelineData } from '@/types/bodyTypes/timeline';
import type { BarChartData } from '@/types/bodyTypes/barChart';
import type { RosterData } from '@/types/bodyTypes/roster';
import type { ScheduleData } from '@/types/bodyTypes/schedule';

/* ------------------------------------------------------------------ */
/*  Couche 1 : TemplateData (quasi-statique)                          */
/* ------------------------------------------------------------------ */

export interface TemplateData {
  version: string;
  id: string;
  canvas: { width: number; height: number };
  bodyType: number;
  showPenalties: boolean;
  showClock: boolean;
  clockBoxMode: string;
  bgMode: string;
  colors: Record<string, string>;
  opacities: Record<string, number>;
  fonts: { teams: string; clock: string; body: string };
  fontSizes: FontSizeConfig;
  backgroundMediaMode: string;
  backgroundMediaUrl: string;
}

/* ------------------------------------------------------------------ */
/*  Couche 2 : MatchData (semi-dynamique)                             */
/* ------------------------------------------------------------------ */

export interface MatchTeam {
  noc: string;
}

export interface MatchData {
  teamLeft: MatchTeam;
  teamRight: MatchTeam;
  phases: PeriodOption[];
  bodyData: BodyDataUnion;
  titles: { center: string; left: string; right: string };
  showTimeouts: boolean;
  timeoutsLeft: number;
  timeoutsRight: number;
  showShootout: boolean;
}

export type BodyDataUnion =
  | { type: 'stats'; data: StatLine[] }
  | { type: 'playerStats'; data: PlayerStat[] }
  | { type: 'goal'; data: GoalData }
  | { type: 'playerCard'; data: PlayerCardData }
  | { type: 'standings'; data: StandingsData }
  | { type: 'finalScore'; data: FinalScoreData }
  | { type: 'freeText'; data: FreeTextData }
  | { type: 'headToHead'; data: HeadToHeadData }
  | { type: 'timeline'; data: TimelineData }
  | { type: 'barChart'; data: BarChartData }
  | { type: 'roster'; data: RosterData }
  | { type: 'schedule'; data: ScheduleData };

/* ------------------------------------------------------------------ */
/*  Couche 3 : FrameData (temps r\u00e9el)                                */
/* ------------------------------------------------------------------ */

export interface FramePenalty {
  playerNumber: string;
  remainingTime: string;
  remainingSeconds: number;
}

export interface FrameData {
  timestamp: number;
  wallClock: string;
  frameNumber: number;
  score: { left: number; right: number };
  time: string;
  timeSeconds: number;
  period: string;
  clockRunning: boolean;
  penaltiesLeft: FramePenalty[];
  penaltiesRight: FramePenalty[];
}

/* ------------------------------------------------------------------ */
/*  Agr\u00e9gats                                                          */
/* ------------------------------------------------------------------ */

export interface FullSnapshot {
  template: TemplateData;
  match: MatchData;
  frame: FrameData;
}

export interface FrameDelta {
  frameNumber: number;
  timestamp: number;
  changes: Partial<FrameData>;
}

/* ------------------------------------------------------------------ */
/*  Enregistrement                                                    */
/* ------------------------------------------------------------------ */

export interface FrameRecording {
  config: { template: TemplateData; match: MatchData };
  frames: FrameData[];
  startTime: string;
  endTime: string;
  totalFrames: number;
}
