import type { BodyTypeOption } from '@/types/scoreboard';

export const BODY_TYPES: readonly BodyTypeOption[] = [
  { id: 1, label: 'Titre centré + lignes symétriques' },
  { id: 2, label: 'Deux titres gauche/droite + lignes asymétriques' },
  { id: 3, label: 'Titre centré + variable / valeur (joueur)' },
  { id: 4, label: 'Célébration de but' },
  { id: 5, label: 'Fiche joueur' },
  { id: 6, label: 'Classement / Tableau' },
  { id: 7, label: 'Score final / Résultat' },
  { id: 8, label: 'Texte libre / Message' },
] as const;
