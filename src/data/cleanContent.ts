import { DEFAULT_CUSTOM_FIELDS_DATA } from '@/types/customField';
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
  teamDisplayName1: '',
  teamDisplayName2: '',
  showFlagTeam1: false,
  showFlagTeam2: false,
  score1: '0',
  score2: '0',
  period: '',

  titleCenter: '',
  titleLeft: '',
  titleRight: '',

  playerStats: [],
  playerStatsStyleOverrides: {},
  stats: [],
  statsStyleOverrides: {},
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
    styleOverrides: {},
  },

  playerCardData: {
    title: '',
    subtitle: '',
    playerName: '',
    playerNumber: '',
    playerTeam: '',
    playerPhoto: '',
    stats: [],
    styleOverrides: {},
  },

  standingsData: {
    title: '',
    columns: [],
    rows: [],
    styleOverrides: {},
  },

  finalScoreData: {
    title: '',
    periodScores: [],
    showGwg: false,
    gwgPlayer: '',
    gwgTeam: '',
    gwgTime: '',
    overtimeNote: '',
    styleOverrides: {},
  },

  freeTextData: {
    lines: [],
    styleOverrides: {},
  },

  headToHeadData: {
    title: '',
    playerLeft: { name: '', number: '', team: '' },
    playerRight: { name: '', number: '', team: '' },
    stats: [],
    styleOverrides: {},
  },

  timelineData: {
    title: '',
    events: [],
    styleOverrides: {},
  },

  barChartData: {
    title: '',
    rows: [],
    styleOverrides: {},
  },

  rosterData: {
    title: '',
    team: '',
    coach: '',
    players: [],
    styleOverrides: {},
  },

  scheduleData: {
    title: '',
    matches: [],
    styleOverrides: {},
  },

  refereesData: {
    title: '',
    preset: 'all',
    activeIndex: 0,
    showFlags: true,
    showNocs: true,
    showRoles: true,
    referees: [],
    styleOverrides: {},
  },

  spectatorsData: {
    title: '',
    preset: 'centered',
    count: '',
    venue: '',
    capacity: '',
    showVenue: false,
    showCapacity: false,
    label: '',
    styleOverrides: {},
  },

  customFieldsData: structuredClone(DEFAULT_CUSTOM_FIELDS_DATA),
};
