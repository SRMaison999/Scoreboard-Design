import { create } from 'zustand';
import type {
  LiveDataConnectionStatus,
  LiveDataConfig,
} from '@/types/liveData';
import { DEFAULT_LIVE_DATA_CONFIG } from '@/types/liveData';

interface LiveDataStoreState {
  config: LiveDataConfig;
  status: LiveDataConnectionStatus;
  lastUpdate: string;
  errorMessage: string;
}

interface LiveDataStoreActions {
  updateConfig: <K extends keyof LiveDataConfig>(key: K, value: LiveDataConfig[K]) => void;
  setStatus: (status: LiveDataConnectionStatus) => void;
  setLastUpdate: (timestamp: string) => void;
  setErrorMessage: (message: string) => void;
  resetConfig: () => void;
}

export type LiveDataStore = LiveDataStoreState & LiveDataStoreActions;

export const useLiveDataStore = create<LiveDataStore>()((set) => ({
  config: { ...DEFAULT_LIVE_DATA_CONFIG },
  status: 'disconnected',
  lastUpdate: '',
  errorMessage: '',

  updateConfig: (key, value) =>
    set((s) => ({ config: { ...s.config, [key]: value } })),

  setStatus: (status) =>
    set({ status }),

  setLastUpdate: (timestamp) =>
    set({ lastUpdate: timestamp }),

  setErrorMessage: (message) =>
    set({ errorMessage: message }),

  resetConfig: () =>
    set({ config: { ...DEFAULT_LIVE_DATA_CONFIG }, status: 'disconnected', lastUpdate: '', errorMessage: '' }),
}));
