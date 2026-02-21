import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';
import { DEFAULT_PERIOD_OPTIONS } from '@/constants/phases';
import { DEFAULT_GOAL_DATA } from '@/types/bodyTypes/goal';
import { DEFAULT_PLAYER_CARD_DATA } from '@/types/bodyTypes/playerCard';
import { DEFAULT_STANDINGS_DATA } from '@/types/bodyTypes/standings';
import { DEFAULT_FINAL_SCORE_DATA } from '@/types/bodyTypes/finalScore';
import { DEFAULT_FREE_TEXT_DATA } from '@/types/bodyTypes/freeText';
import { DEFAULT_HEAD_TO_HEAD_DATA } from '@/types/bodyTypes/headToHead';
import { DEFAULT_TIMELINE_DATA } from '@/types/bodyTypes/timeline';
import { DEFAULT_BAR_CHART_DATA } from '@/types/bodyTypes/barChart';
import { DEFAULT_ROSTER_DATA } from '@/types/bodyTypes/roster';
import { DEFAULT_SCHEDULE_DATA } from '@/types/bodyTypes/schedule';
import { DEFAULT_FONT_SIZES } from '@/types/fontSizes';
import { DEFAULT_TEMPLATE_WIDTH, DEFAULT_TEMPLATE_HEIGHT } from '@/constants/resolutions';
import { DEFAULT_ANIMATION_CONFIG } from '@/types/animation';
import { DEFAULT_CUSTOM_FIELDS_DATA } from '@/types/customField';
import type { ScoreboardState } from '@/types/scoreboard';

export const DEFAULT_STATE: ScoreboardState = {
  bodyType: 1,
  bgMode: 'gradient',
  showPenalties: false,

  team1: 'SVK',
  team2: 'FIN',
  teamDisplayName1: '',
  teamDisplayName2: '',
  score1: '1',
  score2: '1',

  time: '20:00',
  period: '1st PERIOD',
  showClock: true,
  clockBoxMode: 'never',
  clockTenthsThreshold: 10,

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

  goalData: { ...DEFAULT_GOAL_DATA },
  playerCardData: structuredClone(DEFAULT_PLAYER_CARD_DATA),
  standingsData: structuredClone(DEFAULT_STANDINGS_DATA),
  finalScoreData: structuredClone(DEFAULT_FINAL_SCORE_DATA),
  freeTextData: structuredClone(DEFAULT_FREE_TEXT_DATA),
  headToHeadData: structuredClone(DEFAULT_HEAD_TO_HEAD_DATA),
  timelineData: structuredClone(DEFAULT_TIMELINE_DATA),
  barChartData: structuredClone(DEFAULT_BAR_CHART_DATA),
  rosterData: structuredClone(DEFAULT_ROSTER_DATA),
  scheduleData: structuredClone(DEFAULT_SCHEDULE_DATA),

  showTimeouts: false,
  timeoutsLeft: 0,
  timeoutsRight: 0,

  showShootout: false,
  shootoutLeft: [],
  shootoutRight: [],

  backgroundMediaMode: 'none',
  backgroundMediaUrl: '',

  templateWidth: DEFAULT_TEMPLATE_WIDTH,
  templateHeight: DEFAULT_TEMPLATE_HEIGHT,

  fontSizes: { ...DEFAULT_FONT_SIZES },

  showFlagTeam1: true,
  showFlagTeam2: true,

  logoMode: 'flag',
  showCompetitionLogo: false,
  competitionLogoPosition: 'top-right',
  competitionLogoSize: 80,
  showSponsorLogo: false,
  sponsorLogoPosition: 'bottom-right',
  sponsorLogoSize: 60,

  scoreboardVisible: true,
  animationConfig: { ...DEFAULT_ANIMATION_CONFIG },

  customFieldsData: structuredClone(DEFAULT_CUSTOM_FIELDS_DATA),
};
