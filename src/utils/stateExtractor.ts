import type { ScoreboardState } from '@/types/scoreboard';
import type { ScoreboardStore } from '@/stores/scoreboardStore';

/** Extracts only the ScoreboardState data from the store, removing action functions. */
const STATE_KEYS: readonly (keyof ScoreboardState)[] = [
  'bodyType', 'bgMode', 'showPenalties',
  'team1', 'team2', 'score1', 'score2',
  'showFlagTeam1', 'showFlagTeam2',
  'time', 'period', 'showClock', 'clockBoxMode', 'clockTenthsThreshold',
  'periodOptions', 'demoRunning',
  'titleCenter', 'titleLeft', 'titleRight',
  'fontTeams', 'fontClock', 'fontBody',
  'colors', 'opacities',
  'showPlayerPhoto', 'playerStats', 'stats',
  'penaltiesLeft', 'penaltiesRight',
  'goalData', 'playerCardData', 'standingsData', 'finalScoreData', 'freeTextData',
  'headToHeadData', 'timelineData', 'barChartData', 'rosterData', 'scheduleData',
  'showTimeouts', 'timeoutsLeft', 'timeoutsRight',
  'showShootout', 'shootoutLeft', 'shootoutRight',
  'backgroundMediaMode', 'backgroundMediaUrl',
  'templateWidth', 'templateHeight', 'fontSizes',
  'logoMode', 'showCompetitionLogo', 'competitionLogoPosition', 'competitionLogoSize',
  'showSponsorLogo', 'sponsorLogoPosition', 'sponsorLogoSize',
  'scoreboardVisible', 'animationConfig',
  'customFieldsData',
];

export function extractState(store: ScoreboardStore): ScoreboardState {
  const state = {} as Record<string, unknown>;
  for (const key of STATE_KEYS) {
    state[key] = store[key];
  }
  return state as unknown as ScoreboardState;
}
