import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  SyncConnectionStatus,
  SyncConfig,
  SyncPeer,
  SyncRole,
} from '@/types/sync';
import { DEFAULT_SYNC_CONFIG } from '@/types/sync';

interface SyncStoreState {
  config: SyncConfig;
  status: SyncConnectionStatus;
  clientId: string;
  peers: SyncPeer[];
  errorMessage: string;
}

interface SyncStoreActions {
  updateConfig: <K extends keyof SyncConfig>(key: K, value: SyncConfig[K]) => void;
  setStatus: (status: SyncConnectionStatus) => void;
  setClientId: (id: string) => void;
  setPeers: (peers: SyncPeer[]) => void;
  addPeer: (peer: SyncPeer) => void;
  removePeer: (clientId: string) => void;
  setErrorMessage: (message: string) => void;
  setRole: (role: SyncRole) => void;
  resetSync: () => void;
}

export type SyncStore = SyncStoreState & SyncStoreActions;

export const useSyncStore = create<SyncStore>()(
  immer((set) => ({
    config: { ...DEFAULT_SYNC_CONFIG },
    status: 'disconnected',
    clientId: '',
    peers: [],
    errorMessage: '',

    updateConfig: (key, value) =>
      set((s) => { s.config[key] = value; }),

    setStatus: (status) =>
      set((s) => { s.status = status; }),

    setClientId: (id) =>
      set((s) => { s.clientId = id; }),

    setPeers: (peers) =>
      set((s) => { s.peers = peers; }),

    addPeer: (peer) =>
      set((s) => {
        const existing = s.peers.findIndex((p) => p.clientId === peer.clientId);
        if (existing >= 0) {
          s.peers[existing] = peer;
        } else {
          s.peers.push(peer);
        }
      }),

    removePeer: (clientId) =>
      set((s) => {
        const idx = s.peers.findIndex((p) => p.clientId === clientId);
        if (idx >= 0) s.peers.splice(idx, 1);
      }),

    setErrorMessage: (message) =>
      set((s) => { s.errorMessage = message; }),

    setRole: (role) =>
      set((s) => { s.config.role = role; }),

    resetSync: () =>
      set((s) => {
        s.config = { ...DEFAULT_SYNC_CONFIG };
        s.status = 'disconnected';
        s.clientId = '';
        s.peers = [];
        s.errorMessage = '';
      }),
  })),
);
