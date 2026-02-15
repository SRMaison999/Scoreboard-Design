export type PlayerPosition = 'G' | 'D' | 'F' | 'C' | 'LW' | 'RW';

export interface RosterPlayer {
  number: string;
  name: string;
  position: PlayerPosition;
}

export interface RosterData {
  title: string;
  team: string;
  coach: string;
  players: RosterPlayer[];
}

export const DEFAULT_ROSTER_DATA: RosterData = {
  title: 'ROSTER',
  team: 'SVK',
  coach: 'RAMSAY',
  players: [
    { number: '1', name: 'HUET', position: 'G' },
    { number: '3', name: 'CERNAK', position: 'D' },
    { number: '6', name: 'FEHERVARY', position: 'D' },
    { number: '11', name: 'KOPITAR', position: 'C' },
    { number: '18', name: 'SLAFKOVSKY', position: 'LW' },
    { number: '81', name: 'HOSSA', position: 'RW' },
  ],
};
