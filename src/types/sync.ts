export type SyncRole = 'admin' | 'operator' | 'viewer';

export type SyncConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface SyncPeer {
  clientId: string;
  role: SyncRole;
  name: string;
  lastSeen: number;
}

export type SyncMessageType =
  | 'STATE_UPDATE'
  | 'FULL_SYNC'
  | 'PEER_JOIN'
  | 'PEER_LEAVE'
  | 'REQUEST_SYNC'
  | 'ROLE_CHANGE';

export interface SyncMessage {
  type: SyncMessageType;
  clientId: string;
  timestamp: number;
  payload: unknown;
}

export interface SyncConfig {
  serverUrl: string;
  clientName: string;
  role: SyncRole;
}

export const DEFAULT_SYNC_CONFIG: SyncConfig = {
  serverUrl: '',
  clientName: '',
  role: 'operator',
};
