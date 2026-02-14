import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';
import { DEFAULT_PERIOD_OPTIONS } from '@/constants/phases';
import type { ScoreboardState } from '@/types/scoreboard';

export const DEFAULT_STATE: ScoreboardState = {
  bodyType: 1,
  bgMode: 'gradient',
  showPenalties: false,

  team1: 'SVK',
  team2: 'FIN',
  score1: '1',
  score2: '1',

  time: '20:00',
  period: '1st PERIOD',
  showClock: true,
  clockBoxMode: 'never',

  periodOptions: DEFAULT_PERIOD_OPTIONS.map((p) => ({ ...p })),

  demoRunning: false,

  titleCenter: 'GAME STATISTICS',
  titleLeft: 'POWER PLAY EFFICIENCY',
  titleRight: 'PENALTY KILLING %',

  fontTeams: 'oswald',
  fontClock: 'barlow',
  fontBody: 'barlow',

  colors: { ...DEFAULT_COLORS },
  opacities: { ...DEFAULT_OPACITIES },

  showPlayerPhoto: true,
  playerStats: [
    { label: 'GOALS', value: '12', playerName: 'KOPITAR', playerNumber: '11' },
    { label: 'ASSISTS', value: '8', playerName: 'PASTRNAK', playerNumber: '88' },
    { label: 'POINTS', value: '18', playerName: 'KOPITAR', playerNumber: '11' },
    { label: '+/-', value: '+6', playerName: 'HOSSA', playerNumber: '81' },
  ],

  stats: [
    { valLeft: '82%', label: 'GAME', valRight: '91%' },
    { valLeft: '87%', label: 'TOURNAMENT', valRight: '85%' },
  ],

  penaltiesLeft: [
    { time: '1:52', number: '24' },
    { time: '2:12', number: '7' },
  ],
  penaltiesRight: [
    { time: '0:45', number: '11' },
  ],
};
