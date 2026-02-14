import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_OPACITIES } from '@/constants/colors';
import { parseTime, formatTime } from '@/utils/time';
import type { ScoreboardState, PenaltySide } from '@/types/scoreboard';
import type { ColorKey } from '@/types/colors';
import type { ColorPreset } from '@/types/colors';

interface ScoreboardActions {
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

  /* Templates */
  loadState: (state: ScoreboardState) => void;
  resetState: () => void;
}

export type ScoreboardStore = ScoreboardState & ScoreboardActions;

const MAX_LINES = 8;

export const useScoreboardStore = create<ScoreboardStore>()(
  persist(
    immer((set) => ({
      ...structuredClone(DEFAULT_STATE),

      /* ── Actions generiques ── */
      update: (key, value) =>
        set((s) => {
          (s as Record<string, unknown>)[key] = value;
        }),

      /* ── Couleurs ── */
      updateColor: (key, value) =>
        set((s) => {
          s.colors[key] = value;
        }),

      updateOpacity: (key, value) =>
        set((s) => {
          s.opacities[key] = value;
        }),

      applyPreset: (preset) =>
        set((s) => {
          s.colors = { ...preset.colors };
          s.opacities = { ...DEFAULT_OPACITIES };
        }),

      /* ── Stats (body type 1/2) ── */
      updateStat: (index, field, value) =>
        set((s) => {
          const stat = s.stats[index];
          if (stat) {
            (stat as Record<string, string>)[field] = value;
          }
        }),

      addStat: () =>
        set((s) => {
          if (s.stats.length < MAX_LINES) {
            s.stats.push({ valLeft: '0', label: 'STAT', valRight: '0' });
          }
        }),

      removeStat: (index) =>
        set((s) => {
          s.stats.splice(index, 1);
        }),

      /* ── Player stats (body type 3) ── */
      updatePlayerStat: (index, field, value) =>
        set((s) => {
          const stat = s.playerStats[index];
          if (stat) {
            (stat as Record<string, string>)[field] = value;
          }
        }),

      addPlayerStat: () =>
        set((s) => {
          if (s.playerStats.length < MAX_LINES) {
            s.playerStats.push({
              label: 'STAT',
              value: '0',
              playerName: 'PLAYER',
              playerNumber: '00',
            });
          }
        }),

      removePlayerStat: (index) =>
        set((s) => {
          s.playerStats.splice(index, 1);
        }),

      /* ── Penalites ── */
      updatePenalty: (side, index, field, value) =>
        set((s) => {
          const list = side === 'left' ? s.penaltiesLeft : s.penaltiesRight;
          const pen = list[index];
          if (pen) {
            (pen as Record<string, string>)[field] = value;
          }
        }),

      addPenalty: (side) =>
        set((s) => {
          const list = side === 'left' ? s.penaltiesLeft : s.penaltiesRight;
          if (list.length < MAX_LINES) {
            list.unshift({ time: '2:00', number: '0' });
          }
        }),

      removePenalty: (side, index) =>
        set((s) => {
          const list = side === 'left' ? s.penaltiesLeft : s.penaltiesRight;
          list.splice(index, 1);
        }),

      /* ── Actions live ── */
      startClock: () =>
        set((s) => {
          s.demoRunning = true;
        }),

      stopClock: () =>
        set((s) => {
          s.demoRunning = false;
        }),

      resetClock: () =>
        set((s) => {
          s.demoRunning = false;
          const cur = s.periodOptions.find((p) => p.label === s.period);
          s.time = cur ? cur.duration : '20:00';
        }),

      tickTimer: () =>
        set((s) => {
          const secs = parseTime(s.time);

          /* Decompte des penalites */
          const tickPenalties = (list: typeof s.penaltiesLeft) => {
            for (let i = list.length - 1; i >= 0; i--) {
              const pen = list[i];
              if (!pen) continue;
              const ps = parseTime(pen.time);
              if (ps <= 1) {
                list.splice(i, 1);
              } else {
                pen.time = formatTime(ps - 1);
              }
            }
          };

          tickPenalties(s.penaltiesLeft);
          tickPenalties(s.penaltiesRight);

          /* Decompte horloge + transition */
          if (secs <= 0) {
            const cur = s.periodOptions.find((p) => p.label === s.period);
            if (cur?.next) {
              const nextPhase = s.periodOptions.find((p) => p.label === cur.next);
              s.period = cur.next;
              s.time = nextPhase?.duration ?? '20:00';
            } else {
              s.demoRunning = false;
            }
          } else {
            s.time = formatTime(secs - 1);
          }
        }),

      incrementScore: (side) =>
        set((s) => {
          const key = side === 'left' ? 'score1' : 'score2';
          const current = parseInt(s[key], 10) || 0;
          s[key] = String(current + 1);
        }),

      decrementScore: (side) =>
        set((s) => {
          const key = side === 'left' ? 'score1' : 'score2';
          const current = parseInt(s[key], 10) || 0;
          s[key] = String(Math.max(0, current - 1));
        }),

      nextPhase: () =>
        set((s) => {
          const cur = s.periodOptions.find((p) => p.label === s.period);
          if (cur?.next) {
            const nextP = s.periodOptions.find((p) => p.label === cur.next);
            s.period = cur.next;
            s.time = nextP?.duration ?? '20:00';
          }
        }),

      /* ── Phases ── */
      updatePhase: (index, field, value) =>
        set((s) => {
          const phase = s.periodOptions[index];
          if (phase) {
            const oldLabel = phase.label;
            (phase as Record<string, string>)[field] = value;
            if (field === 'label' && s.period === oldLabel) {
              s.period = value;
            }
          }
        }),

      addPhase: () =>
        set((s) => {
          s.periodOptions.push({ label: 'NEW PHASE', next: '', duration: '20:00' });
        }),

      removePhase: (index) =>
        set((s) => {
          const phase = s.periodOptions[index];
          if (phase && s.period === phase.label) {
            s.period = '';
          }
          s.periodOptions.splice(index, 1);
        }),

      /* ── Templates ── */
      loadState: (state) =>
        set(() => structuredClone(state)),

      resetState: () =>
        set(() => structuredClone(DEFAULT_STATE)),
    })),
    {
      name: 'scoreboard-state',
      version: 1,
    },
  ),
);
