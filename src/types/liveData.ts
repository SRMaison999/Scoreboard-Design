export type LiveDataConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface LiveMatchData {
  matchId: string;
  teamLeft: string;
  teamRight: string;
  scoreLeft: number;
  scoreRight: number;
  period: string;
  time: string;
  clockRunning: boolean;
  penaltiesLeft: LivePenaltyData[];
  penaltiesRight: LivePenaltyData[];
}

export interface LivePenaltyData {
  playerNumber: string;
  time: string;
}

export interface LiveDataConfig {
  endpoint: string;
  matchId: string;
  autoUpdate: boolean;
  pollingInterval: number;
}

export const DEFAULT_LIVE_DATA_CONFIG: LiveDataConfig = {
  endpoint: '',
  matchId: '',
  autoUpdate: false,
  pollingInterval: 5000,
};
