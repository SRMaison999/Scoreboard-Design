import type { BodyTypeOption } from '@/types/scoreboard';

export const BODY_TYPES: readonly BodyTypeOption[] = [
  { id: 14, label: 'Layout libre' },
  { id: 1, label: 'Stats symétriques' },
  { id: 2, label: 'Stats asymétriques' },
  { id: 3, label: 'Stats joueur' },
  { id: 4, label: 'Célébration de but' },
  { id: 5, label: 'Fiche joueur' },
  { id: 6, label: 'Classement' },
  { id: 7, label: 'Score final' },
  { id: 8, label: 'Texte libre' },
  { id: 9, label: 'Face-à-face' },
  { id: 10, label: 'Chronologie' },
  { id: 11, label: 'Barres comparatives' },
  { id: 12, label: 'Composition d\u2019équipe' },
  { id: 13, label: 'Calendrier' },
] as const;
