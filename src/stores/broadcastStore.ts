import { create } from 'zustand';
import type { BroadcastConfig, BroadcastStatus } from '@/types/broadcast';
import { DEFAULT_BROADCAST_CONFIG } from '@/types/broadcast';

interface BroadcastStoreState {
  config: BroadcastConfig;
  status: BroadcastStatus;
  connectedClients: number;
  framesSent: number;
  lastFrameTime: string;
}

interface BroadcastStoreActions {
  updateConfig: <K extends keyof BroadcastConfig>(key: K, value: BroadcastConfig[K]) => void;
  setStatus: (status: BroadcastStatus) => void;
  setConnectedClients: (count: number) => void;
  incrementFramesSent: () => void;
  setLastFrameTime: (time: string) => void;
  resetBroadcast: () => void;
}

export type BroadcastStore = BroadcastStoreState & BroadcastStoreActions;

export const useBroadcastStore = create<BroadcastStore>()((set) => ({
  config: { ...DEFAULT_BROADCAST_CONFIG },
  status: 'stopped',
  connectedClients: 0,
  framesSent: 0,
  lastFrameTime: '',

  updateConfig: (key, value) =>
    set((s) => ({ config: { ...s.config, [key]: value } })),

  setStatus: (status) =>
    set({ status }),

  setConnectedClients: (count) =>
    set({ connectedClients: count }),

  incrementFramesSent: () =>
    set((s) => ({ framesSent: s.framesSent + 1, lastFrameTime: new Date().toLocaleTimeString() })),

  setLastFrameTime: (time) =>
    set({ lastFrameTime: time }),

  resetBroadcast: () =>
    set({
      config: { ...DEFAULT_BROADCAST_CONFIG },
      status: 'stopped',
      connectedClients: 0,
      framesSent: 0,
      lastFrameTime: '',
    }),
}));
