import type { PlayerPosition } from '@/types/bodyTypes/roster';

/**
 * Labels français complets pour chaque position de joueur de hockey.
 */
export const POSITION_LABELS: Readonly<Record<PlayerPosition, string>> = {
  G: 'Gardien',
  D: 'Défenseur',
  C: 'Centre',
  F: 'Attaquant',
  LW: 'Ailier gauche',
  RW: 'Ailier droit',
};

/**
 * Options de sélection pour les dropdowns de position (sans option vide).
 */
export const POSITION_OPTIONS: readonly { value: PlayerPosition; label: string }[] = [
  { value: 'G', label: POSITION_LABELS.G },
  { value: 'D', label: POSITION_LABELS.D },
  { value: 'C', label: POSITION_LABELS.C },
  { value: 'F', label: POSITION_LABELS.F },
  { value: 'LW', label: POSITION_LABELS.LW },
  { value: 'RW', label: POSITION_LABELS.RW },
];

/**
 * Options de sélection avec une option vide en tête (pour les champs optionnels).
 */
export const POSITION_OPTIONS_WITH_EMPTY: readonly { value: string; label: string }[] = [
  { value: '', label: '-' },
  ...POSITION_OPTIONS,
];

/**
 * Alias français acceptés à l'import (CSV, Excel, JSON).
 * Clés en majuscules pour la comparaison insensible à la casse.
 */
export const FRENCH_POSITION_ALIASES: Readonly<Record<string, PlayerPosition>> = {
  GARDIEN: 'G',
  'DÉFENSEUR': 'D',
  DEFENSEUR: 'D',
  CENTRE: 'C',
  ATTAQUANT: 'F',
  'AILIER GAUCHE': 'LW',
  'AILIER DROIT': 'RW',
  AG: 'LW',
  AD: 'RW',
  A: 'F',
};
