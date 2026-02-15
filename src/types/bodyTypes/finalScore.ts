export interface PeriodScore {
  period: string;
  scoreLeft: string;
  scoreRight: string;
}

export interface FinalScoreData {
  title: string;
  periodScores: PeriodScore[];
  showGwg: boolean;
  gwgPlayer: string;
  gwgTeam: string;
  gwgTime: string;
  overtimeNote: string;
}

export const DEFAULT_FINAL_SCORE_DATA: FinalScoreData = {
  title: 'SCORE FINAL',
  periodScores: [
    { period: '1re', scoreLeft: '1', scoreRight: '0' },
    { period: '2e', scoreLeft: '0', scoreRight: '1' },
    { period: '3e', scoreLeft: '0', scoreRight: '0' },
  ],
  showGwg: true,
  gwgPlayer: '#11 KOPITAR',
  gwgTeam: 'SVK',
  gwgTime: '58:23',
  overtimeNote: 'PROL.',
};
