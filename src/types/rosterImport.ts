import type { RosterPlayer, PlayerPosition } from '@/types/bodyTypes/roster';

export type RosterImportFormat = 'csv' | 'excel' | 'json';

export type RosterImportMode = 'replace' | 'append';

export interface RosterImportResult {
  success: boolean;
  players: RosterPlayer[];
  errors: string[];
  warnings: string[];
}

export interface RosterImportColumn {
  number: string;
  name: string;
  position: string;
}

export const VALID_POSITIONS: readonly PlayerPosition[] = [
  'G', 'D', 'F', 'C', 'LW', 'RW',
] as const;

export const MAX_ROSTER_IMPORT = 25;
