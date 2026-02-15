import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_OPACITIES } from '@/constants/colors';
import { tickTimerDraft } from './timerActions';
import type { ScoreboardState, PenaltySide } from '@/types/scoreboard';
import type { ColorKey, ColorPreset } from '@/types/colors';
import type { ScoreboardActions } from '@/types/storeActions';
import type { FontSizeKey } from '@/types/fontSizes';

export type ScoreboardStore = ScoreboardState & ScoreboardActions;

const MAX_LINES = 8;

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

      /* Templates */
      loadState: (state) => set(() => structuredClone(state)),
      resetState: () => set(() => structuredClone(DEFAULT_STATE)),
    })),
    { name: 'scoreboard-state', version: 2 },
  ),
);
