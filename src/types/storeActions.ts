import type { ScoreboardState, PenaltySide } from './scoreboard';
import type { ColorKey, ColorPreset } from './colors';
import type { GoalData } from './bodyTypes/goal';
import type { PlayerCardData } from './bodyTypes/playerCard';
import type { FinalScoreData } from './bodyTypes/finalScore';
import type { ShootoutResult } from './bodyTypes/shootout';
import type { RosterData, RosterPlayer } from './bodyTypes/roster';
import type { RefereesData, RefereeEntry } from './bodyTypes/referees';
import type { SpectatorsData } from './bodyTypes/spectators';
import type { RosterImportMode } from './rosterImport';
import type { FontSizeKey } from './fontSizes';
import type { CustomField, FieldElementConfig, FieldStyle } from './customField';
import type { DistributionAction } from '@/utils/fieldDistribution';
import type {
  ElementStyleOverride,
  StatsStyleRole,
  PlayerStatsStyleRole,
  GoalStyleRole,
  PlayerCardStyleRole,
  StandingsStyleRole,
  FinalScoreStyleRole,
  FreeTextStyleRole,
  HeadToHeadStyleRole,
  TimelineStyleRole,
  BarChartStyleRole,
  RosterStyleRole,
  ScheduleStyleRole,
  RefereesStyleRole,
  SpectatorsStyleRole,
} from './elementStyleOverride';

export interface ScoreboardActions {
  /* Actions generiques */
  update: <K extends keyof ScoreboardState>(key: K, value: ScoreboardState[K]) => void;

  /* Actions couleurs */
  updateColor: (key: ColorKey, value: string) => void;
  updateOpacity: (key: ColorKey, value: number) => void;
  applyPreset: (preset: ColorPreset) => void;

  /* Actions stats (body type 14/2) */
  updateStat: (index: number, field: string, value: string) => void;
  addStat: () => void;
  removeStat: (index: number) => void;
  updateStatsStyleOverride: (role: StatsStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Actions player stats (body type 3) */
  updatePlayerStat: (index: number, field: string, value: string) => void;
  addPlayerStat: () => void;
  removePlayerStat: (index: number) => void;
  updatePlayerStatsStyleOverride: (role: PlayerStatsStyleRole, override: ElementStyleOverride | undefined) => void;

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
  updateGoalStyleOverride: (role: GoalStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Player Card (type 5) */
  updatePlayerCardField: (field: keyof PlayerCardData, value: unknown) => void;
  addPlayerCardStat: () => void;
  removePlayerCardStat: (index: number) => void;
  updatePlayerCardStat: (index: number, field: string, value: string) => void;
  updatePlayerCardStyleOverride: (role: PlayerCardStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Standings (type 6) */
  updateStandingsTitle: (value: string) => void;
  addStandingsRow: () => void;
  removeStandingsRow: (index: number) => void;
  updateStandingsRowField: (index: number, field: string, value: string) => void;
  updateStandingsStyleOverride: (role: StandingsStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Final Score (type 7) */
  updateFinalScoreField: (field: keyof FinalScoreData, value: unknown) => void;
  addPeriodScore: () => void;
  removePeriodScore: (index: number) => void;
  updatePeriodScore: (index: number, field: string, value: string) => void;
  updateFinalScoreStyleOverride: (role: FinalScoreStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Free Text (type 8) */
  addFreeTextLine: () => void;
  removeFreeTextLine: (index: number) => void;
  updateFreeTextLine: (index: number, field: string, value: unknown) => void;
  updateFreeTextStyleOverride: (role: FreeTextStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Head to Head (type 9) */
  updateHeadToHeadTitle: (value: string) => void;
  updateHeadToHeadPlayer: (side: PenaltySide, field: string, value: string) => void;
  addHeadToHeadStat: () => void;
  removeHeadToHeadStat: (index: number) => void;
  updateHeadToHeadStat: (index: number, field: string, value: string) => void;
  updateHeadToHeadStyleOverride: (role: HeadToHeadStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Timeline (type 10) */
  updateTimelineTitle: (value: string) => void;
  addTimelineEvent: () => void;
  removeTimelineEvent: (index: number) => void;
  updateTimelineEvent: (index: number, field: string, value: string) => void;
  updateTimelineStyleOverride: (role: TimelineStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Bar Chart (type 11) */
  updateBarChartTitle: (value: string) => void;
  addBarChartRow: () => void;
  removeBarChartRow: (index: number) => void;
  updateBarChartRow: (index: number, field: string, value: string | number) => void;
  updateBarChartStyleOverride: (role: BarChartStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Roster (type 12) */
  updateRosterField: (field: keyof RosterData, value: string) => void;
  addRosterPlayer: () => void;
  removeRosterPlayer: (index: number) => void;
  updateRosterPlayer: (index: number, field: string, value: string) => void;
  importRosterPlayers: (players: RosterPlayer[], mode: RosterImportMode) => void;
  updateRosterStyleOverride: (role: RosterStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Schedule (type 13) */
  updateScheduleTitle: (value: string) => void;
  addScheduleMatch: () => void;
  removeScheduleMatch: (index: number) => void;
  updateScheduleMatch: (index: number, field: string, value: string) => void;
  updateScheduleStyleOverride: (role: ScheduleStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Referees (type 15) */
  updateRefereesField: (field: keyof RefereesData, value: unknown) => void;
  addReferee: () => void;
  removeReferee: (index: number) => void;
  updateReferee: (index: number, field: keyof RefereeEntry, value: string | boolean) => void;
  updateRefereesStyleOverride: (role: RefereesStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Spectators (type 16) */
  updateSpectatorsField: (field: keyof SpectatorsData, value: unknown) => void;
  updateSpectatorsStyleOverride: (role: SpectatorsStyleRole, override: ElementStyleOverride | undefined) => void;

  /* Shootout */
  addShootoutAttempt: (side: PenaltySide) => void;
  removeShootoutAttempt: (side: PenaltySide, index: number) => void;
  updateShootoutResult: (side: PenaltySide, index: number, result: ShootoutResult) => void;

  /* Tailles de police */
  updateFontSize: (key: FontSizeKey, value: number) => void;

  /* Custom Fields (type 1) */
  addCustomField: (element: FieldElementConfig, x: number, y: number, width: number, height: number, label?: string) => void;
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
  selectFields: (fieldIds: readonly string[]) => void;
  toggleFieldSelection: (fieldId: string) => void;
  selectAllFields: () => void;
  clearFieldSelection: () => void;
  moveSelectedFields: (dx: number, dy: number) => void;
  removeSelectedFields: () => void;
  duplicateSelectedFields: () => void;
  pasteFields: (sourceFields: readonly CustomField[], pasteOffset: number) => void;
  distributeSelectedFields: (action: DistributionAction) => void;
  updateCustomFieldsOption: (key: 'fullPageMode' | 'snapToGrid' | 'showGuides' | 'zoneSelectionActive', value: boolean) => void;
  updateCustomFieldsGridSize: (size: number) => void;

  /* Templates */
  loadState: (state: ScoreboardState) => void;
  resetState: () => void;
  clearContent: () => void;
}
