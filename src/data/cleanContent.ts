import type { ScoreboardState } from '@/types/scoreboard';

/**
 * Contenu vierge pour le premier lancement.
 * Seules les proprietes de contenu sont videes ;
 * les reglages techniques (couleurs, polices, dimensions, animations)
 * conservent leurs valeurs par defaut.
 */
export const CLEAN_CONTENT: Partial<ScoreboardState> = {
  team1: '',
  team2: '',
  score1: '0',
  score2: '0',
  period: '',

  titleCenter: '',
  titleLeft: '',
  titleRight: '',

  playerStats: [],
  stats: [],
  penaltiesLeft: [],
  penaltiesRight: [],

  goalData: {
    scoringTeamSide: 'left',
    scorerName: '',
    scorerNumber: '',
    scorerPhoto: '',
    goalTime: '',
    goalPeriod: '',
    goalCountMatch: '',
    goalCountTournament: '',
    assist1Name: '',
    assist1Number: '',
    assist2Name: '',
    assist2Number: '',
  },

  playerCardData: {
    title: '',
    subtitle: '',
    playerName: '',
    playerNumber: '',
    playerTeam: '',
    playerPhoto: '',
    stats: [],
  },

  standingsData: {
    title: '',
    columns: [],
    rows: [],
  },

  finalScoreData: {
    title: '',
    periodScores: [],
    showGwg: false,
    gwgPlayer: '',
    gwgTeam: '',
    gwgTime: '',
    overtimeNote: '',
  },

  freeTextData: {
    lines: [],
  },

  headToHeadData: {
    title: '',
    playerLeft: { name: '', number: '', team: '' },
    playerRight: { name: '', number: '', team: '' },
    stats: [],
  },

  timelineData: {
    title: '',
    events: [],
  },

  barChartData: {
    title: '',
    rows: [],
  },

  rosterData: {
    title: '',
    team: '',
    coach: '',
    players: [],
  },

  scheduleData: {
    title: '',
    matches: [],
  },
};
