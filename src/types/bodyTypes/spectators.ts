/** Preset d'affichage des spectateurs */
export type SpectatorsPreset =
  | 'centered'
  | 'banner'
  | 'compact'
  | 'detailed'
  | 'free';

/** Données du body type Spectateurs */
export interface SpectatorsData {
  title: string;
  preset: SpectatorsPreset;
  count: string;
  venue: string;
  capacity: string;
  showVenue: boolean;
  showCapacity: boolean;
  /** Texte de label personnalisé affiché au-dessus / autour du nombre */
  label: string;
}

export const DEFAULT_SPECTATORS_DATA: SpectatorsData = {
  title: 'ATTENDANCE',
  preset: 'centered',
  count: '8 247',
  venue: 'Hallenstadion',
  capacity: '11 200',
  showVenue: true,
  showCapacity: true,
  label: 'SPECTATEURS',
};
