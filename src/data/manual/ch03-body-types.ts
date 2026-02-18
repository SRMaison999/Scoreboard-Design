import type { ManualChapter } from '@/types/userManual';

export const ch03: ManualChapter = {
  id: 'body-types',
  title: "Types d'affichage",
  content: `Le scoreboard propose 14 types d'affichage diff\u00e9rents pour le corps du scoreboard.

## Type 1 : Stats sym\u00e9triques

Titre centr\u00e9 et lignes de statistiques avec valeur gauche / label central / valeur droite.
Id\u00e9al pour : statistiques de match g\u00e9n\u00e9rales (tirs, mises en jeu, etc.)

## Type 2 : Stats asym\u00e9triques

Deux titres (gauche et droite) avec des lignes de statistiques.
Id\u00e9al pour : comparer deux cat\u00e9gories.

## Type 3 : Stats joueur

Titre centr\u00e9 avec des lignes variable / joueur / valeur, incluant une photo circulaire optionnelle.
Id\u00e9al pour : leaders statistiques (meilleurs buteurs, passeurs, etc.)

## Type 4 : But / C\u00e9l\u00e9bration

Affichage d'un but marqu\u00e9 avec d\u00e9tails du buteur et des passeurs.
Id\u00e9al pour : annonce de but en direct.

## Type 5 : Fiche joueur

Grande fiche joueur avec photo, nom, num\u00e9ro, \u00e9quipe et statistiques.
Id\u00e9al pour : joueur du match, MVP, pr\u00e9sentation de joueur.

## Type 6 : Classement / Tableau

Tableau de classement avec colonnes configurables.
Id\u00e9al pour : classements de groupe, de tournoi.

## Type 7 : Score final

Affichage grand format du score final avec d\u00e9tails par p\u00e9riode.
Id\u00e9al pour : \u00e9cran de fin de match.

## Type 8 : Texte libre

Zone de texte multiligne avec mise en forme.
Id\u00e9al pour : messages, annonces, sponsors, informations.

## Type 9 : Face-\u00e0-face joueurs

Deux joueurs face \u00e0 face avec comparaison statistique, avec photos circulaires.
Id\u00e9al pour : comparaison de joueurs cl\u00e9s.

## Type 10 : Chronologie

Liste chronologique des \u00e9v\u00e9nements du match.
Id\u00e9al pour : r\u00e9sum\u00e9 du match en temps r\u00e9el.

## Type 11 : Barres comparatives

Barres de progression horizontales face \u00e0 face.
Id\u00e9al pour : visualisation graphique des statistiques compar\u00e9es.

## Type 12 : Roster / Composition

Composition d'\u00e9quipe avec positions et informations.
Id\u00e9al pour : pr\u00e9sentation des lineups.

## Type 13 : Calendrier / Prochains matchs

Liste des matchs \u00e0 venir ou termin\u00e9s.
Id\u00e9al pour : programme du tournoi.

## Type 14 : Layout libre

Canvas enti\u00e8rement libre o\u00f9 l'utilisateur compose son propre scoreboard en pla\u00e7ant, d\u00e9pla\u00e7ant et redimensionnant des \u00e9l\u00e9ments visuels individuels. Id\u00e9al pour : cr\u00e9er un affichage sur mesure qui ne correspond \u00e0 aucun des 13 types pr\u00e9d\u00e9finis.`,
};
