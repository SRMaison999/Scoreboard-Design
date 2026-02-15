import type {
  LiveDataConnectionStatus,
  LiveMatchData,
  LiveDataConfig,
} from '@/types/liveData';

export type LiveDataListener = (data: LiveMatchData) => void;
export type StatusListener = (status: LiveDataConnectionStatus) => void;

/**
 * Client g\u00e9n\u00e9rique pour les donn\u00e9es de match en direct.
 * Supporte 2 modes : WebSocket (temps r\u00e9el) ou polling HTTP.
 */
export class LiveDataClient {
  private ws: WebSocket | null = null;
  private pollingTimer: ReturnType<typeof setInterval> | null = null;
  private config: LiveDataConfig;
  private onData: LiveDataListener;
  private onStatus: StatusListener;
  private status: LiveDataConnectionStatus = 'disconnected';

  constructor(
    config: LiveDataConfig,
    onData: LiveDataListener,
    onStatus: StatusListener,
  ) {
    this.config = config;
    this.onData = onData;
    this.onStatus = onStatus;
  }

  private setStatus(s: LiveDataConnectionStatus): void {
    this.status = s;
    this.onStatus(s);
  }

  connect(): void {
    if (this.status === 'connected' || this.status === 'connecting') return;

    const url = this.config.endpoint;
    if (!url) {
      this.setStatus('error');
      return;
    }

    if (url.startsWith('ws://') || url.startsWith('wss://')) {
      this.connectWebSocket(url);
    } else {
      this.startPolling(url);
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = null;
    }
    this.setStatus('disconnected');
  }

  getStatus(): LiveDataConnectionStatus {
    return this.status;
  }

  updateConfig(config: LiveDataConfig): void {
    this.config = config;
  }

  private connectWebSocket(url: string): void {
    this.setStatus('connecting');
    try {
      const fullUrl = this.config.matchId
        ? `${url}?matchId=${encodeURIComponent(this.config.matchId)}`
        : url;
      this.ws = new WebSocket(fullUrl);

      this.ws.onopen = () => {
        this.setStatus('connected');
      };

      this.ws.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(String(event.data)) as LiveMatchData;
          this.onData(data);
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
          this.setStatus('disconnected');
        }
      };
    } catch {
      this.setStatus('error');
    }
  }

  private startPolling(url: string): void {
    this.setStatus('connecting');

    const poll = async (): Promise<void> => {
      try {
        const fetchUrl = this.config.matchId
          ? `${url}?matchId=${encodeURIComponent(this.config.matchId)}`
          : url;
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          this.setStatus('error');
          return;
        }
        const data = (await response.json()) as LiveMatchData;
        if (this.status !== 'connected') {
          this.setStatus('connected');
        }
        this.onData(data);
      } catch {
        if (this.status !== 'error') {
          this.setStatus('error');
        }
      }
    };

    void poll();
    this.pollingTimer = setInterval(
      () => void poll(),
      this.config.pollingInterval,
    );
  }
}
