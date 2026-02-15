import type { ScoreboardState, Penalty } from '@/types/scoreboard';
import type {
  TemplateData,
  MatchData,
  FrameData,
  FullSnapshot,
  FramePenalty,
  BodyDataUnion,
} from '@/types/frameData';
import { parseTime, displayTime } from '@/utils/time';

const TENTHS_PER_SECOND = 10;

const FRAME_DATA_VERSION = '1.0';

function mapPenalties(penalties: Penalty[], tenthsThreshold: number): FramePenalty[] {
  return penalties.map((p) => ({
    playerNumber: p.number,
    remainingTime: displayTime(p.time, tenthsThreshold),
    remainingSeconds: parseTime(p.time) / TENTHS_PER_SECOND,
  }));
}

function resolveBodyData(state: ScoreboardState): BodyDataUnion {
  switch (state.bodyType) {
    case 1:
    case 2:
      return { type: 'stats', data: structuredClone(state.stats) };
    case 3:
      return { type: 'playerStats', data: structuredClone(state.playerStats) };
    case 4:
      return { type: 'goal', data: structuredClone(state.goalData) };
    case 5:
      return { type: 'playerCard', data: structuredClone(state.playerCardData) };
    case 6:
      return { type: 'standings', data: structuredClone(state.standingsData) };
    case 7:
      return { type: 'finalScore', data: structuredClone(state.finalScoreData) };
    case 8:
      return { type: 'freeText', data: structuredClone(state.freeTextData) };
    case 9:
      return { type: 'headToHead', data: structuredClone(state.headToHeadData) };
    case 10:
      return { type: 'timeline', data: structuredClone(state.timelineData) };
    case 11:
      return { type: 'barChart', data: structuredClone(state.barChartData) };
    case 12:
      return { type: 'roster', data: structuredClone(state.rosterData) };
    case 13:
      return { type: 'schedule', data: structuredClone(state.scheduleData) };
    default:
      return { type: 'stats', data: structuredClone(state.stats) };
  }
}

export function toTemplateData(state: ScoreboardState): TemplateData {
  return {
    version: FRAME_DATA_VERSION,
    id: '',
    canvas: { width: state.templateWidth, height: state.templateHeight },
    bodyType: state.bodyType,
    showPenalties: state.showPenalties,
    showClock: state.showClock,
    clockBoxMode: state.clockBoxMode,
    bgMode: state.bgMode,
    colors: { ...state.colors },
    opacities: { ...state.opacities },
    fonts: {
      teams: state.fontTeams,
      clock: state.fontClock,
      body: state.fontBody,
    },
    fontSizes: { ...state.fontSizes },
    backgroundMediaMode: state.backgroundMediaMode,
    backgroundMediaUrl: state.backgroundMediaUrl,
  };
}

export function toMatchData(state: ScoreboardState): MatchData {
  return {
    teamLeft: { noc: state.team1 },
    teamRight: { noc: state.team2 },
    phases: structuredClone(state.periodOptions),
    bodyData: resolveBodyData(state),
    titles: {
      center: state.titleCenter,
      left: state.titleLeft,
      right: state.titleRight,
    },
    showTimeouts: state.showTimeouts,
    timeoutsLeft: state.timeoutsLeft,
    timeoutsRight: state.timeoutsRight,
    showShootout: state.showShootout,
  };
}

export function toFrameData(
  state: ScoreboardState,
  frameNumber: number,
  timestamp: number,
): FrameData {
  return {
    timestamp,
    wallClock: new Date().toISOString(),
    frameNumber,
    score: {
      left: parseInt(state.score1, 10) || 0,
      right: parseInt(state.score2, 10) || 0,
    },
    time: displayTime(state.time, state.clockTenthsThreshold),
    timeSeconds: parseTime(state.time) / TENTHS_PER_SECOND,
    period: state.period,
    clockRunning: state.demoRunning,
    penaltiesLeft: mapPenalties(state.penaltiesLeft, state.clockTenthsThreshold),
    penaltiesRight: mapPenalties(state.penaltiesRight, state.clockTenthsThreshold),
  };
}

export function toFullSnapshot(
  state: ScoreboardState,
  frameNumber: number,
  timestamp: number,
): FullSnapshot {
  return {
    template: toTemplateData(state),
    match: toMatchData(state),
    frame: toFrameData(state, frameNumber, timestamp),
  };
}
