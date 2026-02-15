import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  OverlayInstance,
  OverlayType,
  OverlayPosition,
  TickerItem,
} from '@/types/multiScoreboard';
import { createOverlay } from '@/types/multiScoreboard';

interface MultiScoreboardState {
  overlays: OverlayInstance[];
  tickerItems: TickerItem[];
  tickerSpeed: number;
}

interface MultiScoreboardActions {
  addOverlay: (type: OverlayType) => void;
  removeOverlay: (id: string) => void;
  updateOverlayVisibility: (id: string, visible: boolean) => void;
  updateOverlayPosition: (id: string, position: OverlayPosition) => void;
  updateOverlayOpacity: (id: string, opacity: number) => void;
  addTickerItem: (text: string) => void;
  removeTickerItem: (index: number) => void;
  updateTickerItem: (index: number, text: string) => void;
  setTickerSpeed: (speed: number) => void;
  resetOverlays: () => void;
}

export type MultiScoreboardStore = MultiScoreboardState & MultiScoreboardActions;

const MAX_OVERLAYS = 10;
const MAX_TICKER_ITEMS = 20;

export const useMultiScoreboardStore = create<MultiScoreboardStore>()(
  immer((set) => ({
    overlays: [],
    tickerItems: [],
    tickerSpeed: 50,

    addOverlay: (type) =>
      set((s) => {
        if (s.overlays.length < MAX_OVERLAYS) {
          s.overlays.push(createOverlay(type));
        }
      }),

    removeOverlay: (id) =>
      set((s) => {
        const idx = s.overlays.findIndex((o) => o.id === id);
        if (idx >= 0) s.overlays.splice(idx, 1);
      }),

    updateOverlayVisibility: (id, visible) =>
      set((s) => {
        const overlay = s.overlays.find((o) => o.id === id);
        if (overlay) overlay.visible = visible;
      }),

    updateOverlayPosition: (id, position) =>
      set((s) => {
        const overlay = s.overlays.find((o) => o.id === id);
        if (overlay) overlay.position = position;
      }),

    updateOverlayOpacity: (id, opacity) =>
      set((s) => {
        const overlay = s.overlays.find((o) => o.id === id);
        if (overlay) overlay.opacity = opacity;
      }),

    addTickerItem: (text) =>
      set((s) => {
        if (s.tickerItems.length < MAX_TICKER_ITEMS) {
          s.tickerItems.push({ text });
        }
      }),

    removeTickerItem: (index) =>
      set((s) => {
        s.tickerItems.splice(index, 1);
      }),

    updateTickerItem: (index, text) =>
      set((s) => {
        const item = s.tickerItems[index];
        if (item) item.text = text;
      }),

    setTickerSpeed: (speed) =>
      set((s) => {
        s.tickerSpeed = speed;
      }),

    resetOverlays: () =>
      set((s) => {
        s.overlays = [];
        s.tickerItems = [];
        s.tickerSpeed = 50;
      }),
  })),
);
