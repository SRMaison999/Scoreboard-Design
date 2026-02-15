export type BroadcastStatus = 'stopped' | 'running';

export interface BroadcastConfig {
  enabled: boolean;
  wsPort: number;
  httpPort: number;
  fileExportEnabled: boolean;
  fileExportPath: string;
  fileExportInterval: number;
}

export const DEFAULT_BROADCAST_CONFIG: BroadcastConfig = {
  enabled: false,
  wsPort: 8080,
  httpPort: 8081,
  fileExportEnabled: false,
  fileExportPath: './scoreboard-frame.json',
  fileExportInterval: 1000,
};
