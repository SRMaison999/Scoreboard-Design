import type { PenaltySide } from '@/types/scoreboard';

export interface GoalData {
  readonly scoringTeamSide: PenaltySide;
  scorerName: string;
  scorerNumber: string;
  goalTime: string;
  goalPeriod: string;
  goalCountMatch: string;
  goalCountTournament: string;
  assist1Name: string;
  assist1Number: string;
  assist2Name: string;
  assist2Number: string;
}

export const DEFAULT_GOAL_DATA: GoalData = {
  scoringTeamSide: 'left',
  scorerName: 'KOPITAR',
  scorerNumber: '11',
  goalTime: '14:23',
  goalPeriod: '2nd PERIOD',
  goalCountMatch: '2',
  goalCountTournament: '5',
  assist1Name: 'PASTRNAK',
  assist1Number: '88',
  assist2Name: '',
  assist2Number: '',
};
