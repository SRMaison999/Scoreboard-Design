import type { BodyTypeOption } from '@/types/scoreboard';

export const BODY_TYPE_CATEGORY_LABELS = {
  custom: 'Personnalis\u00e9',
  stats: 'Statistiques',
  match: '\u00c9v\u00e9nements de match',
  info: 'Informations',
} as const;

export const BODY_TYPES: readonly BodyTypeOption[] = [
  {
    id: 14,
    label: 'Layout libre',
    description: 'Composez votre propre affichage en pla\u00e7ant librement les \u00e9l\u00e9ments',
    category: 'custom',
  },
  {
    id: 1,
    label: 'Stats sym\u00e9triques',
    description: 'Titre centr\u00e9, lignes de stats \u00e9quilibr\u00e9es gauche/droite',
    category: 'stats',
  },
  {
    id: 2,
    label: 'Stats asym\u00e9triques',
    description: 'Deux titres gauche/droite, lignes de stats ind\u00e9pendantes',
    category: 'stats',
  },
  {
    id: 3,
    label: 'Stats joueur',
    description: 'Fiche d\u2019un joueur avec photo et statistiques individuelles',
    category: 'stats',
  },
  {
    id: 4,
    label: 'C\u00e9l\u00e9bration de but',
    description: 'Affichage du buteur, des assistants et du temps du but',
    category: 'match',
  },
  {
    id: 5,
    label: 'Fiche joueur',
    description: 'Carte compl\u00e8te d\u2019un joueur avec nom, num\u00e9ro et stats',
    category: 'match',
  },
  {
    id: 6,
    label: 'Classement',
    description: 'Tableau de classement avec colonnes personnalisables',
    category: 'info',
  },
  {
    id: 7,
    label: 'Score final',
    description: 'R\u00e9sultat du match avec d\u00e9tail par p\u00e9riode et but gagnant',
    category: 'match',
  },
  {
    id: 8,
    label: 'Texte libre',
    description: 'Message texte personnalis\u00e9 avec alignement et taille',
    category: 'info',
  },
  {
    id: 9,
    label: 'Face-\u00e0-face',
    description: 'Comparaison directe de deux joueurs avec stats',
    category: 'stats',
  },
  {
    id: 10,
    label: 'Chronologie',
    description: '\u00c9v\u00e9nements du match en ordre chronologique',
    category: 'match',
  },
  {
    id: 11,
    label: 'Barres comparatives',
    description: 'Graphiques en barres pour comparer les statistiques',
    category: 'stats',
  },
  {
    id: 12,
    label: 'Composition d\u2019\u00e9quipe',
    description: 'Liste des joueurs avec num\u00e9ros et positions',
    category: 'info',
  },
  {
    id: 13,
    label: 'Calendrier',
    description: 'Programme des matchs avec dates, heures et r\u00e9sultats',
    category: 'info',
  },
] as const;
