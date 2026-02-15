import { DEFAULT_STATE } from '@/data/defaultState';
import type { ScoreboardState } from '@/types/scoreboard';

export interface PresetTemplate {
  readonly id: string;
  readonly name: string;
  readonly state: ScoreboardState;
}

const olympicsState: ScoreboardState = {
  ...structuredClone(DEFAULT_STATE),
  team1: 'CAN',
  team2: 'SWE',
  score1: '3',
  score2: '2',
  period: '3rd PERIOD',
  time: '08:34',
  bodyType: 1,
  titleCenter: 'GAME STATISTICS',
  titleLeft: 'SHOTS ON GOAL',
  titleRight: 'POWER PLAY',
  stats: [
    { valLeft: '12', label: '1st', valRight: '8' },
    { valLeft: '9', label: '2nd', valRight: '11' },
    { valLeft: '7', label: '3rd', valRight: '6' },
  ],
};

const worldChampionshipState: ScoreboardState = {
  ...structuredClone(DEFAULT_STATE),
  team1: 'FIN',
  team2: 'CZE',
  score1: '1',
  score2: '0',
  period: '2nd PERIOD',
  time: '14:22',
  bodyType: 2,
  titleCenter: 'TOURNAMENT STATS',
  showPenalties: true,
  penaltiesLeft: [
    { time: '2:00', number: '18' },
  ],
  penaltiesRight: [],
};

const standingsState: ScoreboardState = {
  ...structuredClone(DEFAULT_STATE),
  team1: 'GROUP A',
  team2: '',
  score1: '',
  score2: '',
  bodyType: 6,
  showClock: false,
  standingsData: {
    title: 'GROUP A STANDINGS',
    columns: [
      { id: 'gp', label: 'GP' },
      { id: 'w', label: 'W' },
      { id: 'l', label: 'L' },
      { id: 'otl', label: 'OTL' },
      { id: 'pts', label: 'PTS' },
    ],
    rows: [
      { team: 'CAN', values: { gp: '3', w: '3', l: '0', otl: '0', pts: '9' }, highlighted: true },
      { team: 'SWE', values: { gp: '3', w: '2', l: '1', otl: '0', pts: '6' }, highlighted: false },
      { team: 'FIN', values: { gp: '3', w: '1', l: '1', otl: '1', pts: '4' }, highlighted: false },
      { team: 'SVK', values: { gp: '3', w: '0', l: '2', otl: '1', pts: '1' }, highlighted: false },
    ],
  },
};

const minimalState: ScoreboardState = {
  ...structuredClone(DEFAULT_STATE),
  team1: 'HOME',
  team2: 'AWAY',
  score1: '0',
  score2: '0',
  period: '1st PERIOD',
  time: '20:00',
  bodyType: 1,
  showPenalties: false,
  showClock: true,
  stats: [],
  titleCenter: '',
  titleLeft: '',
  titleRight: '',
};

export const PRESET_TEMPLATES: readonly PresetTemplate[] = [
  {
    id: 'preset-olympics',
    name: 'Jeux Olympiques',
    state: olympicsState,
  },
  {
    id: 'preset-worlds',
    name: 'Championnat du monde',
    state: worldChampionshipState,
  },
  {
    id: 'preset-standings',
    name: 'Classement groupe',
    state: standingsState,
  },
  {
    id: 'preset-minimal',
    name: 'Minimal',
    state: minimalState,
  },
];
