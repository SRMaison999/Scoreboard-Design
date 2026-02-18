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
  | 'chakra'
  | 'archivo-black'
  | 'black-ops-one'
  | 'bungee'
  | 'montserrat'
  | 'roboto-condensed'
  | 'inter'
  | 'poppins'
  | 'share-tech-mono'
  | 'jetbrains-mono'
  | 'righteous'
  | 'audiowide'
  | 'exo2'
  | 'playfair'
  | 'bitter'
  | 'fjalla-one';

/** Catégorie visuelle pour organiser les polices dans le sélecteur */
export type FontCategory =
  | 'sport'
  | 'modern'
  | 'monospace'
  | 'display'
  | 'serif'
  | 'condensed';

export interface FontOption {
  readonly id: FontId;
  readonly label: string;
  readonly family: string;
  readonly category: FontCategory;
}

export interface FontOption {
  readonly id: FontId;
  readonly label: string;
  readonly family: string;
}

export type FontZone = 'fontTeams' | 'fontClock' | 'fontBody';
