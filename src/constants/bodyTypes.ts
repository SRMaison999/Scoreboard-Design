import type { BodyTypeOption } from '@/types/scoreboard';

export const BODY_TYPES: readonly BodyTypeOption[] = [
  { id: 1, label: 'Titre centré + lignes symétriques' },
  { id: 2, label: 'Deux titres gauche/droite + lignes asymétriques' },
  { id: 3, label: 'Titre centré + variable / valeur (joueur)' },
] as const;
