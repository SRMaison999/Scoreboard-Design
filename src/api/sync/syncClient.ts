import type {
  SyncConnectionStatus,
  SyncConfig,
  SyncMessage,
  SyncPeer,
} from '@/types/sync';

export type SyncDataListener = (message: SyncMessage) => void;
export type SyncStatusListener = (status: SyncConnectionStatus) => void;
export type SyncPeerListener = (peers: SyncPeer[]) => void;

/**
 * Client WebSocket pour la synchronisation multi-poste.
 * G\u00e8re la connexion, reconnexion et le protocole de sync.
 */
export class SyncClient {
  private ws: WebSocket | null = null;
  private config: SyncConfig;
  private clientId: string;
  private onData: SyncDataListener;
  private onStatus: SyncStatusListener;
  private status: SyncConnectionStatus = 'disconnected';
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(
    config: SyncConfig,
    clientId: string,
    onData: SyncDataListener,
    onStatus: SyncStatusListener,
  ) {
    this.config = config;
    this.clientId = clientId;
    this.onData = onData;
    this.onStatus = onStatus;
  }

  private setStatus(s: SyncConnectionStatus): void {
    this.status = s;
    this.onStatus(s);
  }

  connect(): void {
    if (this.status === 'connected' || this.status === 'connecting') return;
    if (!this.config.serverUrl) {
      this.setStatus('error');
      return;
    }

    this.setStatus('connecting');
    this.reconnectAttempts = 0;

    try {
      const url = `${this.config.serverUrl}?clientId=${encodeURIComponent(this.clientId)}&role=${encodeURIComponent(this.config.role)}&name=${encodeURIComponent(this.config.clientName)}`;
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        this.setStatus('connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event: MessageEvent) => {
        try {
          const message = JSON.parse(String(event.data)) as SyncMessage;
          this.onData(message);
        } catch {
          /* Ignorer les messages non-JSON */
        }
      };

      this.ws.onerror = () => {
        this.setStatus('error');
      };

      this.ws.onclose = () => {
        this.ws = null;
        if (this.status !== 'disconnected') {
          this.attemptReconnect();
        }
      };
    } catch {
      this.setStatus('error');
    }
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.setStatus('disconnected');
  }

  send(message: SyncMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  sendStateUpdate(payload: unknown): void {
    this.send({
      type: 'STATE_UPDATE',
      clientId: this.clientId,
      timestamp: Date.now(),
      payload,
    });
  }

  requestFullSync(): void {
    this.send({
      type: 'REQUEST_SYNC',
      clientId: this.clientId,
      timestamp: Date.now(),
      payload: null,
    });
  }

  getStatus(): SyncConnectionStatus {
    return this.status;
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.setStatus('error');
      return;
    }

    this.reconnectAttempts += 1;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 16000);

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, delay);
  }
}
