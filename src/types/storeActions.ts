import type { ScoreboardState, PenaltySide } from './scoreboard';
import type { ColorKey, ColorPreset } from './colors';
import type { GoalData } from './bodyTypes/goal';
import type { PlayerCardData } from './bodyTypes/playerCard';
import type { FinalScoreData } from './bodyTypes/finalScore';
import type { ShootoutResult } from './bodyTypes/shootout';
import type { RosterData, RosterPlayer } from './bodyTypes/roster';
import type { RosterImportMode } from './rosterImport';
import type { FontSizeKey } from './fontSizes';
import type { CustomField, FieldElementConfig, FieldStyle } from './customField';

export interface ScoreboardActions {
  /* Actions generiques */
  update: <K extends keyof ScoreboardState>(key: K, value: ScoreboardState[K]) => void;

  /* Actions couleurs */
  updateColor: (key: ColorKey, value: string) => void;
  updateOpacity: (key: ColorKey, value: number) => void;
  applyPreset: (preset: ColorPreset) => void;

  /* Actions stats (body type 1/2) */
  updateStat: (index: number, field: string, value: string) => void;
  addStat: () => void;
  removeStat: (index: number) => void;

  /* Actions player stats (body type 3) */
  updatePlayerStat: (index: number, field: string, value: string) => void;
  addPlayerStat: () => void;
  removePlayerStat: (index: number) => void;

  /* Actions penalites */
  updatePenalty: (side: PenaltySide, index: number, field: string, value: string) => void;
  addPenalty: (side: PenaltySide) => void;
  removePenalty: (side: PenaltySide, index: number) => void;

  /* Actions live (timer / match) */
  startClock: () => void;
  stopClock: () => void;
  resetClock: () => void;
  tickTimer: () => void;
  incrementScore: (side: PenaltySide) => void;
  decrementScore: (side: PenaltySide) => void;
  nextPhase: () => void;

  /* Actions phases */
  updatePhase: (index: number, field: string, value: string) => void;
  addPhase: () => void;
  removePhase: (index: number) => void;

  /* Goal (type 4) */
  updateGoalField: (field: keyof GoalData, value: string) => void;

  /* Player Card (type 5) */
  updatePlayerCardField: (field: keyof PlayerCardData, value: unknown) => void;
  addPlayerCardStat: () => void;
  removePlayerCardStat: (index: number) => void;
  updatePlayerCardStat: (index: number, field: string, value: string) => void;

  /* Standings (type 6) */
  updateStandingsTitle: (value: string) => void;
  addStandingsRow: () => void;
  removeStandingsRow: (index: number) => void;
  updateStandingsRowField: (index: number, field: string, value: string) => void;

  /* Final Score (type 7) */
  updateFinalScoreField: (field: keyof FinalScoreData, value: unknown) => void;
  addPeriodScore: () => void;
  removePeriodScore: (index: number) => void;
  updatePeriodScore: (index: number, field: string, value: string) => void;

  /* Free Text (type 8) */
  addFreeTextLine: () => void;
  removeFreeTextLine: (index: number) => void;
  updateFreeTextLine: (index: number, field: string, value: unknown) => void;

  /* Head to Head (type 9) */
  updateHeadToHeadTitle: (value: string) => void;
  updateHeadToHeadPlayer: (side: PenaltySide, field: string, value: string) => void;
  addHeadToHeadStat: () => void;
  removeHeadToHeadStat: (index: number) => void;
  updateHeadToHeadStat: (index: number, field: string, value: string) => void;

  /* Timeline (type 10) */
  updateTimelineTitle: (value: string) => void;
  addTimelineEvent: () => void;
  removeTimelineEvent: (index: number) => void;
  updateTimelineEvent: (index: number, field: string, value: string) => void;

  /* Bar Chart (type 11) */
  updateBarChartTitle: (value: string) => void;
  addBarChartRow: () => void;
  removeBarChartRow: (index: number) => void;
  updateBarChartRow: (index: number, field: string, value: string | number) => void;

  /* Roster (type 12) */
  updateRosterField: (field: keyof RosterData, value: string) => void;
  addRosterPlayer: () => void;
  removeRosterPlayer: (index: number) => void;
  updateRosterPlayer: (index: number, field: string, value: string) => void;
  importRosterPlayers: (players: RosterPlayer[], mode: RosterImportMode) => void;

  /* Schedule (type 13) */
  updateScheduleTitle: (value: string) => void;
  addScheduleMatch: () => void;
  removeScheduleMatch: (index: number) => void;
  updateScheduleMatch: (index: number, field: string, value: string) => void;

  /* Shootout */
  addShootoutAttempt: (side: PenaltySide) => void;
  removeShootoutAttempt: (side: PenaltySide, index: number) => void;
  updateShootoutResult: (side: PenaltySide, index: number, result: ShootoutResult) => void;

  /* Tailles de police */
  updateFontSize: (key: FontSizeKey, value: number) => void;

  /* Custom Fields (type 14) */
  addCustomField: (element: FieldElementConfig, x: number, y: number, width: number, height: number) => void;
  removeCustomField: (fieldId: string) => void;
  updateCustomFieldPosition: (fieldId: string, x: number, y: number) => void;
  updateCustomFieldSize: (fieldId: string, width: number, height: number) => void;
  updateCustomFieldElement: (fieldId: string, element: FieldElementConfig) => void;
  updateCustomFieldStyle: (fieldId: string, style: Partial<FieldStyle>) => void;
  updateCustomFieldProp: (fieldId: string, key: keyof CustomField, value: unknown) => void;
  duplicateCustomField: (fieldId: string) => void;
  resetCustomFieldScale: (fieldId: string) => void;
  reorderCustomField: (fieldId: string, newZIndex: number) => void;
  selectCustomField: (fieldId: string | null) => void;
  updateCustomFieldsOption: (key: 'fullPageMode' | 'snapToGrid' | 'showGuides', value: boolean) => void;
  updateCustomFieldsGridSize: (size: number) => void;

  /* Templates */
  loadState: (state: ScoreboardState) => void;
  resetState: () => void;
  clearContent: () => void;
}
