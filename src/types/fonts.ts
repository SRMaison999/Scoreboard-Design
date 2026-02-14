export type FontId =
  | 'oswald'
  | 'barlow'
  | 'bebas'
  | 'teko'
  | 'anton'
  | 'rajdhani'
  | 'russo'
  | 'orbitron'
  | 'saira'
  | 'chakra';

export interface FontOption {
  readonly id: FontId;
  readonly label: string;
  readonly family: string;
}

export type FontZone = 'fontTeams' | 'fontClock' | 'fontBody';
