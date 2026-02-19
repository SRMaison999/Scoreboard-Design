import type { ManualChapter } from '@/types/userManual';

export const ch03: ManualChapter = {
  id: 'body-types',
  title: "Types d'affichage",
  content: `## Emplacement

Le s\u00e9lecteur de type d'affichage se trouve dans le **panneau gauche**, onglet **Modes** (1re ic\u00f4ne du rail, ic\u00f4ne de grille). Le **Layout libre** est propos\u00e9 en premier car il offre la plus grande flexibilit\u00e9 de conception.

Le scoreboard propose 14 types d'affichage diff\u00e9rents pour le corps du scoreboard.

---

## Layout libre (champs personnalis\u00e9s)

Canvas enti\u00e8rement libre o\u00f9 l'utilisateur compose son propre scoreboard en pla\u00e7ant, d\u00e9pla\u00e7ant et redimensionnant des \u00e9l\u00e9ments visuels individuels.

**Id\u00e9al pour :** cr\u00e9er un affichage sur mesure, concevoir des mises en page originales, assembler des \u00e9l\u00e9ments de diff\u00e9rentes natures sur un m\u00eame \u00e9cran.

### Concept g\u00e9n\u00e9ral

Contrairement aux types pr\u00e9d\u00e9finis (1 \u00e0 13) qui imposent un agencement fixe, le Layout libre offre un canvas vierge. L'utilisateur y d\u00e9pose des \u00e9l\u00e9ments depuis une biblioth\u00e8que, puis les positionne librement par glisser-d\u00e9poser et les redimensionne via des poign\u00e9es dans les coins.

### Mode pleine page

Quand activ\u00e9, le header (drapeaux, noms d'\u00e9quipes, scores, horloge) est masqu\u00e9. Le canvas entier est disponible pour les champs personnalis\u00e9s.

### Biblioth\u00e8que d'\u00e9l\u00e9ments

Plus de 25 \u00e9l\u00e9ments r\u00e9partis en 6 cat\u00e9gories :

- **Match** : Score, Horloge, P\u00e9riode, Nom d'\u00e9quipe, Drapeau, Temps morts, Tirs au but
- **Texte** : Bloc de texte
- **Donn\u00e9es** : Ligne de stat, Barre comparative
- **Joueurs** : Photo joueur
- **M\u00e9dias** : Image, Forme (rectangle, cercle, arrondi), S\u00e9parateur (ligne)
- **Compos\u00e9s** : Header complet, Colonne de p\u00e9nalit\u00e9s, Types 1-13 int\u00e9gr\u00e9s

Un champ de recherche permet de filtrer les \u00e9l\u00e9ments. Cliquer sur un \u00e9l\u00e9ment l'ajoute au canvas.

### Interaction sur le canvas

- **S\u00e9lection** : cliquer sur un champ (bordure bleue). Cliquer sur le fond pour d\u00e9s\u00e9lectionner.
- **D\u00e9placement** : glisser-d\u00e9poser un champ s\u00e9lectionn\u00e9.
- **Redimensionnement** : tirer une des 4 poign\u00e9es dans les coins. La taille de police s'ajuste proportionnellement.
- **Verrouillage** : un champ verrouill\u00e9 ne peut \u00eatre ni d\u00e9plac\u00e9 ni redimensionn\u00e9.

### Raccourcis clavier

- **Suppr** : supprime le champ s\u00e9lectionn\u00e9
- **Ctrl+D** : duplique le champ s\u00e9lectionn\u00e9
- **Fl\u00e8ches** : d\u00e9place le champ de 1 px
- **Ctrl+Z** : annuler
- **Ctrl+Y** : r\u00e9tablir

### Contr\u00f4le de la taille de police

Barre flottante au-dessus du champ s\u00e9lectionn\u00e9 avec boutons +/-, saisie directe et molette de souris. Chaque champ peut avoir sa propre police de caract\u00e8res.

### S\u00e9lection d'images

Les champs Image disposent d'un s\u00e9lecteur de fichier avec aper\u00e7u int\u00e9gr\u00e9 dans le panneau de propri\u00e9t\u00e9s.

### Noms d'\u00e9quipes libres

En plus des 31 codes NOC, possibilit\u00e9 de saisir un nom d'\u00e9quipe libre.

### Grille et guides

Grille en pointill\u00e9s avec taille configurable (8 px par d\u00e9faut) et aimantation optionnelle.

### Panneau de propri\u00e9t\u00e9s

Quand un champ est s\u00e9lectionn\u00e9, ses propri\u00e9t\u00e9s apparaissent dans le panneau lat\u00e9ral : nom, alignement, position, taille, ordre Z, style (fond, bordure, opacit\u00e9, rayon, marge interne), configuration sp\u00e9cifique au type d'\u00e9l\u00e9ment.

### S\u00e9lection de zone

Dessiner un rectangle sur le canvas pour s\u00e9lectionner et regrouper tous les champs inclus, puis les sauvegarder comme preset.

### Presets

- **Sauvegarder le champ** : sauvegarde le champ s\u00e9lectionn\u00e9 (+ \u00e9l\u00e9ments contenus)
- **Sauvegarder l'\u00e9cran** : sauvegarde tout le layout
- **Charger un preset** : remplacer ou ajouter au layout existant
- Export/import de presets en .preset.json

### Historique undo/redo

50 niveaux d'annulation. Ctrl+Z / Ctrl+Y pour naviguer dans l'historique.

---

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

## Type 12 : Composition d'\u00e9quipe (Roster)

Composition d'\u00e9quipe avec positions et informations.
Id\u00e9al pour : pr\u00e9sentation des lineups.

## Type 13 : Calendrier / Prochains matchs

Liste des matchs \u00e0 venir ou termin\u00e9s.
Id\u00e9al pour : programme du tournoi.`,
};
