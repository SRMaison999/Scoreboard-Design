import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { DEFAULT_STATE } from '@/data/defaultState';
import { CLEAN_CONTENT } from '@/data/cleanContent';
import { DEFAULT_OPACITIES } from '@/constants/colors';
import { DEFAULT_CUSTOM_FIELDS_DATA } from '@/types/customField';
import { tickTimerDraft } from './timerActions';
import {
  addCustomFieldDraft, removeCustomFieldDraft,
  updateCustomFieldPositionDraft, updateCustomFieldSizeDraft,
  updateCustomFieldElementDraft, updateCustomFieldStyleDraft,
  updateCustomFieldPropDraft, duplicateCustomFieldDraft,
  reorderCustomFieldDraft,
} from './customFieldActions';
import type { ScoreboardState, PenaltySide } from '@/types/scoreboard';
import type { ColorKey, ColorPreset } from '@/types/colors';
import type { ScoreboardActions } from '@/types/storeActions';
import type { FontSizeKey } from '@/types/fontSizes';

export type ScoreboardStore = ScoreboardState & ScoreboardActions;

const MAX_LINES = 8;

/* Detection du premier lancement (avant que persist ecrive en storage) */
const IS_FIRST_LAUNCH = typeof window !== 'undefined'
  && typeof window.localStorage !== 'undefined'
  && window.localStorage.getItem('scoreboard-state') === null;

export const useScoreboardStore = create<ScoreboardStore>()(
  persist(
    immer((set) => ({
      ...structuredClone(DEFAULT_STATE),

      update: (key, value) =>
        set((s) => { (s as Record<string, unknown>)[key] = value; }),

      updateColor: (key: ColorKey, value: string) =>
        set((s) => { s.colors[key] = value; }),

      updateOpacity: (key: ColorKey, value: number) =>
        set((s) => { s.opacities[key] = value; }),

      applyPreset: (preset: ColorPreset) =>
        set((s) => { s.colors = { ...preset.colors }; s.opacities = { ...DEFAULT_OPACITIES }; }),

      /* Stats (type 1/2) */
      updateStat: (index: number, field: string, value: string) =>
        set((s) => { const st = s.stats[index]; if (st) (st as Record<string, string>)[field] = value; }),
      addStat: () =>
        set((s) => { if (s.stats.length < MAX_LINES) s.stats.push({ valLeft: '0', label: 'STAT', valRight: '0' }); }),
      removeStat: (index: number) =>
        set((s) => { s.stats.splice(index, 1); }),

      /* Player stats (type 3) */
      updatePlayerStat: (index: number, field: string, value: string) =>
        set((s) => { const st = s.playerStats[index]; if (st) (st as Record<string, string>)[field] = value; }),
      addPlayerStat: () =>
        set((s) => { if (s.playerStats.length < MAX_LINES) s.playerStats.push({ label: 'STAT', value: '0', playerName: 'PLAYER', playerNumber: '00' }); }),
      removePlayerStat: (index: number) =>
        set((s) => { s.playerStats.splice(index, 1); }),

      /* Penalites */
      updatePenalty: (side: PenaltySide, index: number, field: string, value: string) =>
        set((s) => { const list = side === 'left' ? s.penaltiesLeft : s.penaltiesRight; const pen = list[index]; if (pen) (pen as Record<string, string>)[field] = value; }),
      addPenalty: (side: PenaltySide) =>
        set((s) => { const list = side === 'left' ? s.penaltiesLeft : s.penaltiesRight; if (list.length < MAX_LINES) list.unshift({ time: '2:00', number: '0' }); }),
      removePenalty: (side: PenaltySide, index: number) =>
        set((s) => { (side === 'left' ? s.penaltiesLeft : s.penaltiesRight).splice(index, 1); }),

      /* Timer / Live */
      startClock: () => set((s) => { s.demoRunning = true; }),
      stopClock: () => set((s) => { s.demoRunning = false; }),
      resetClock: () =>
        set((s) => { s.demoRunning = false; const cur = s.periodOptions.find((p) => p.label === s.period); s.time = cur ? cur.duration : '20:00'; }),
      tickTimer: () => set((s) => { tickTimerDraft(s); }),
      incrementScore: (side: PenaltySide) =>
        set((s) => { const key = side === 'left' ? 'score1' : 'score2'; s[key] = String((parseInt(s[key], 10) || 0) + 1); }),
      decrementScore: (side: PenaltySide) =>
        set((s) => { const key = side === 'left' ? 'score1' : 'score2'; s[key] = String(Math.max(0, (parseInt(s[key], 10) || 0) - 1)); }),
      nextPhase: () =>
        set((s) => { const cur = s.periodOptions.find((p) => p.label === s.period); if (cur?.next) { const np = s.periodOptions.find((p) => p.label === cur.next); s.period = cur.next; s.time = np?.duration ?? '20:00'; } }),

      /* Phases */
      updatePhase: (index: number, field: string, value: string) =>
        set((s) => { const ph = s.periodOptions[index]; if (ph) { const old = ph.label; (ph as Record<string, string>)[field] = value; if (field === 'label' && s.period === old) s.period = value; } }),
      addPhase: () =>
        set((s) => { s.periodOptions.push({ label: 'NEW PHASE', next: '', duration: '20:00' }); }),
      removePhase: (index: number) =>
        set((s) => { const ph = s.periodOptions[index]; if (ph && s.period === ph.label) s.period = ''; s.periodOptions.splice(index, 1); }),

      /* Goal (type 4) */
      updateGoalField: (field, value) =>
        set((s) => { (s.goalData as Record<string, string>)[field] = value; }),

      /* Player Card (type 5) */
      updatePlayerCardField: (field, value) =>
        set((s) => { (s.playerCardData as Record<string, unknown>)[field] = value; }),
      addPlayerCardStat: () =>
        set((s) => { if (s.playerCardData.stats.length < MAX_LINES) s.playerCardData.stats.push({ label: 'STAT', value: '0' }); }),
      removePlayerCardStat: (index: number) =>
        set((s) => { s.playerCardData.stats.splice(index, 1); }),
      updatePlayerCardStat: (index: number, field: string, value: string) =>
        set((s) => { const st = s.playerCardData.stats[index]; if (st) (st as Record<string, string>)[field] = value; }),

      /* Standings (type 6) */
      updateStandingsTitle: (value: string) =>
        set((s) => { s.standingsData.title = value; }),
      addStandingsRow: () =>
        set((s) => { if (s.standingsData.rows.length < 12) s.standingsData.rows.push({ team: 'TBD', values: {}, highlighted: false }); }),
      removeStandingsRow: (index: number) =>
        set((s) => { s.standingsData.rows.splice(index, 1); }),
      updateStandingsRowField: (index: number, field: string, value: string) =>
        set((s) => { const row = s.standingsData.rows[index]; if (!row) return; if (field === 'team') row.team = value; else if (field === 'highlighted') row.highlighted = value === 'true'; else row.values[field] = value; }),

      /* Final Score (type 7) */
      updateFinalScoreField: (field, value) =>
        set((s) => { (s.finalScoreData as Record<string, unknown>)[field] = value; }),
      addPeriodScore: () =>
        set((s) => { s.finalScoreData.periodScores.push({ period: `${s.finalScoreData.periodScores.length + 1}e`, scoreLeft: '0', scoreRight: '0' }); }),
      removePeriodScore: (index: number) =>
        set((s) => { s.finalScoreData.periodScores.splice(index, 1); }),
      updatePeriodScore: (index: number, field: string, value: string) =>
        set((s) => { const ps = s.finalScoreData.periodScores[index]; if (ps) (ps as Record<string, string>)[field] = value; }),

      /* Free Text (type 8) */
      addFreeTextLine: () =>
        set((s) => { s.freeTextData.lines.push({ text: '', fontSize: 30, align: 'center', bold: false }); }),
      removeFreeTextLine: (index: number) =>
        set((s) => { s.freeTextData.lines.splice(index, 1); }),
      updateFreeTextLine: (index: number, field: string, value: unknown) =>
        set((s) => { const line = s.freeTextData.lines[index]; if (line) (line as Record<string, unknown>)[field] = value; }),

      /* Head to Head (type 9) */
      updateHeadToHeadTitle: (value: string) =>
        set((s) => { s.headToHeadData.title = value; }),
      updateHeadToHeadPlayer: (side, field, value) =>
        set((s) => { const p = side === 'left' ? s.headToHeadData.playerLeft : s.headToHeadData.playerRight; (p as Record<string, string>)[field] = value; }),
      addHeadToHeadStat: () =>
        set((s) => { if (s.headToHeadData.stats.length < MAX_LINES) s.headToHeadData.stats.push({ label: 'STAT', valueLeft: '0', valueRight: '0' }); }),
      removeHeadToHeadStat: (index: number) =>
        set((s) => { s.headToHeadData.stats.splice(index, 1); }),
      updateHeadToHeadStat: (index: number, field: string, value: string) =>
        set((s) => { const st = s.headToHeadData.stats[index]; if (st) (st as Record<string, string>)[field] = value; }),

      /* Timeline (type 10) */
      updateTimelineTitle: (value: string) =>
        set((s) => { s.timelineData.title = value; }),
      addTimelineEvent: () =>
        set((s) => { if (s.timelineData.events.length < MAX_LINES) s.timelineData.events.push({ period: '1st', time: '00:00', type: 'goal', description: '', team: '' }); }),
      removeTimelineEvent: (index: number) =>
        set((s) => { s.timelineData.events.splice(index, 1); }),
      updateTimelineEvent: (index: number, field: string, value: string) =>
        set((s) => { const ev = s.timelineData.events[index]; if (ev) (ev as Record<string, string>)[field] = value; }),

      /* Bar Chart (type 11) */
      updateBarChartTitle: (value: string) =>
        set((s) => { s.barChartData.title = value; }),
      addBarChartRow: () =>
        set((s) => { if (s.barChartData.rows.length < MAX_LINES) s.barChartData.rows.push({ label: 'STAT', valueLeft: 0, valueRight: 0, format: 'absolute' }); }),
      removeBarChartRow: (index: number) =>
        set((s) => { s.barChartData.rows.splice(index, 1); }),
      updateBarChartRow: (index: number, field: string, value: string | number) =>
        set((s) => { const row = s.barChartData.rows[index]; if (row) (row as Record<string, string | number>)[field] = value; }),

      /* Roster (type 12) */
      updateRosterField: (field, value) =>
        set((s) => { (s.rosterData as Record<string, unknown>)[field] = value; }),
      addRosterPlayer: () =>
        set((s) => { if (s.rosterData.players.length < 25) s.rosterData.players.push({ number: '0', name: 'JOUEUR', position: 'F' }); }),
      removeRosterPlayer: (index: number) =>
        set((s) => { s.rosterData.players.splice(index, 1); }),
      updateRosterPlayer: (index: number, field: string, value: string) =>
        set((s) => { const p = s.rosterData.players[index]; if (p) (p as Record<string, string>)[field] = value; }),
      importRosterPlayers: (players, mode) =>
        set((s) => {
          if (mode === 'replace') {
            s.rosterData.players = players;
          } else {
            const remaining = 25 - s.rosterData.players.length;
            s.rosterData.players.push(...players.slice(0, remaining));
          }
        }),

      /* Schedule (type 13) */
      updateScheduleTitle: (value: string) =>
        set((s) => { s.scheduleData.title = value; }),
      addScheduleMatch: () =>
        set((s) => { if (s.scheduleData.matches.length < MAX_LINES) s.scheduleData.matches.push({ date: '', time: '', teamLeft: '', teamRight: '', scoreLeft: '', scoreRight: '', status: 'upcoming', venue: '' }); }),
      removeScheduleMatch: (index: number) =>
        set((s) => { s.scheduleData.matches.splice(index, 1); }),
      updateScheduleMatch: (index: number, field: string, value: string) =>
        set((s) => { const m = s.scheduleData.matches[index]; if (m) (m as Record<string, string>)[field] = value; }),

      /* Shootout */
      addShootoutAttempt: (side: PenaltySide) =>
        set((s) => { (side === 'left' ? s.shootoutLeft : s.shootoutRight).push({ result: 'pending' }); }),
      removeShootoutAttempt: (side: PenaltySide, index: number) =>
        set((s) => { (side === 'left' ? s.shootoutLeft : s.shootoutRight).splice(index, 1); }),
      updateShootoutResult: (side, index, result) =>
        set((s) => { const a = (side === 'left' ? s.shootoutLeft : s.shootoutRight)[index]; if (a) a.result = result; }),

      /* Tailles de police */
      updateFontSize: (key: FontSizeKey, value: number) =>
        set((s) => { s.fontSizes[key] = value; }),

      /* Custom Fields (type 14) */
      addCustomField: (element, x, y, width, height) =>
        set((s) => { addCustomFieldDraft(s, element, x, y, width, height); }),
      removeCustomField: (fieldId) =>
        set((s) => { removeCustomFieldDraft(s, fieldId); }),
      updateCustomFieldPosition: (fieldId, x, y) =>
        set((s) => { updateCustomFieldPositionDraft(s, fieldId, x, y); }),
      updateCustomFieldSize: (fieldId, width, height) =>
        set((s) => { updateCustomFieldSizeDraft(s, fieldId, width, height); }),
      updateCustomFieldElement: (fieldId, element) =>
        set((s) => { updateCustomFieldElementDraft(s, fieldId, element); }),
      updateCustomFieldStyle: (fieldId, style) =>
        set((s) => { updateCustomFieldStyleDraft(s, fieldId, style); }),
      updateCustomFieldProp: (fieldId, key, value) =>
        set((s) => { updateCustomFieldPropDraft(s, fieldId, key, value); }),
      duplicateCustomField: (fieldId) =>
        set((s) => { duplicateCustomFieldDraft(s, fieldId); }),
      reorderCustomField: (fieldId, newZIndex) =>
        set((s) => { reorderCustomFieldDraft(s, fieldId, newZIndex); }),
      selectCustomField: (fieldId) =>
        set((s) => { s.customFieldsData.selectedFieldId = fieldId; }),
      updateCustomFieldsOption: (key, value) =>
        set((s) => { (s.customFieldsData as Record<string, unknown>)[key] = value; }),
      updateCustomFieldsGridSize: (size) =>
        set((s) => { s.customFieldsData.gridSize = size; }),

      /* Templates */
      loadState: (state) => set(() => structuredClone(state)),
      resetState: () => set(() => structuredClone(DEFAULT_STATE)),
      clearContent: () => set((s) => { Object.assign(s, structuredClone(CLEAN_CONTENT)); }),
    })),
    {
      name: 'scoreboard-state',
      version: 7,
      migrate: (persisted: unknown) => {
        const state = persisted as Record<string, unknown>;
        if (state['logoMode'] === undefined) {
          state['logoMode'] = 'flag';
          state['showCompetitionLogo'] = false;
          state['competitionLogoPosition'] = 'top-right';
          state['competitionLogoSize'] = 80;
          state['showSponsorLogo'] = false;
          state['sponsorLogoPosition'] = 'bottom-right';
          state['sponsorLogoSize'] = 60;
        }
        if (state['scoreboardVisible'] === undefined) {
          state['scoreboardVisible'] = true;
          state['animationConfig'] = {
            entryAnimation: 'fade', entryDuration: 800, entryEasing: 'ease-out',
            exitAnimation: 'fade', exitDuration: 600, exitEasing: 'ease-in',
            scorePopEnabled: true, scorePopDuration: 400,
            penaltyFlashEnabled: true, penaltyFlashDuration: 600,
            clockPulseEnabled: true, clockPulseThreshold: 10,
          };
        }
        if (state['clockTenthsThreshold'] === undefined) {
          state['clockTenthsThreshold'] = 10;
        }
        if (state['fontSizes'] && typeof state['fontSizes'] === 'object') {
          const fs = state['fontSizes'] as Record<string, unknown>;
          for (let i = 1; i <= 14; i++) {
            if (fs[`bodyScale${i}`] === undefined) {
              fs[`bodyScale${i}`] = 100;
            }
          }
        }
        if (state['customFieldsData'] === undefined) {
          state['customFieldsData'] = structuredClone(DEFAULT_CUSTOM_FIELDS_DATA);
        }
        return state as unknown as ScoreboardState & ScoreboardActions;
      },
    },
  ),
);

/* Premier lancement : vider le contenu pour un ecran vierge */
if (IS_FIRST_LAUNCH) {
  useScoreboardStore.getState().clearContent();
}
