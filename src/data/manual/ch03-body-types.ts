import type { ManualChapter } from '@/types/userManual';

export const ch03: ManualChapter = {
  id: 'body-types',
  title: "Types d'affichage",
  content: `Le scoreboard propose 14 types d'affichage (modes) pour le corps du scoreboard. Chaque mode a sa propre mise en page et ses propres champs de donn\u00e9es.

## Comment choisir un mode

1. Cliquez sur l'ic\u00f4ne **Grille** dans le rail (1\u00e8re ic\u00f4ne, tout \u00e0 gauche)
2. Le panneau **Modes** s'ouvre avec 14 types organis\u00e9s par cat\u00e9gorie
3. Cliquez sur le mode souhait\u00e9
4. L'application bascule automatiquement vers **Contenu > \u00c9quipes** pour vous permettre de remplir les donn\u00e9es

## Layout libre (mode 14)

Canvas enti\u00e8rement vierge sur lequel vous placez librement des \u00e9l\u00e9ments visuels. C'est le mode le plus puissant et le plus flexible.

**Consultez le chapitre d\u00e9di\u00e9 "Layout libre" pour le guide complet pas \u00e0 pas** (biblioth\u00e8que d'\u00e9l\u00e9ments, manipulation sur le canvas, panneau Propri\u00e9t\u00e9s, couches, presets).

---

## Stats sym\u00e9triques (mode 1)

Titre centr\u00e9 et lignes de statistiques avec valeur gauche / label central / valeur droite.

**Remplir les donn\u00e9es** :
1. Apr\u00e8s s\u00e9lection du mode, le panneau **Contenu > \u00c9quipes** s'ouvre
2. Section **Header** : choisissez les \u00e9quipes et les scores
3. Section **Titre(s)** : saisissez le titre centr\u00e9 (exemple : "STATISTIQUES DU MATCH")
4. Section **Lignes de stats** : cliquez sur "Ajouter une ligne", puis remplissez : valeur gauche, label, valeur droite
5. Exemple : "15" | "TIRS AU BUT" | "12"

## Stats asym\u00e9triques (mode 2)

Deux titres (gauche et droite) avec des lignes de statistiques.

**Remplir les donn\u00e9es** : m\u00eame proc\u00e9dure que le mode 1, mais avec deux titres au lieu d'un.

## Stats joueur (mode 3)

Titre centr\u00e9 avec des lignes statistiques incluant un nom de joueur, un num\u00e9ro et une photo optionnelle.

**Remplir les donn\u00e9es** :
1. Section **Header** : \u00e9quipes et scores
2. Section **Stats joueur** : ajoutez des lignes avec Variable, Num\u00e9ro, Nom du joueur, Valeur
3. Exemple : "BUTS" | "#91" | "John TAVARES" | "3"
4. Activez optionnellement "Afficher photo joueur" pour un cercle photo

## C\u00e9l\u00e9bration de but (mode 4)

Affichage d'un but marqu\u00e9 avec d\u00e9tails du buteur et des passeurs.

**Remplir les donn\u00e9es** :
1. Section **C\u00e9l\u00e9bration de but** : choisissez le c\u00f4t\u00e9 \u00e9quipe (gauche/droite)
2. Saisissez : nom du buteur, num\u00e9ro, temps du but, p\u00e9riode
3. Optionnel : nom et num\u00e9ro des passeurs (assist 1 et 2)
4. Optionnel : nombre de buts dans le match et dans le tournoi

## Fiche joueur (mode 5)

Grande fiche joueur avec photo, nom, num\u00e9ro, \u00e9quipe et statistiques.

**Remplir les donn\u00e9es** :
1. Section **Fiche joueur** : titre (ex: "JOUEUR DU MATCH"), sous-titre, nom, num\u00e9ro, \u00e9quipe
2. Ajoutez des lignes de statistiques (label + valeur)

## Classement (mode 6)

Tableau de classement avec colonnes configurables.

**Remplir les donn\u00e9es** :
1. Section **Classement** : saisissez le titre (ex: "GROUPE A")
2. Ajoutez des \u00e9quipes avec "Ajouter une \u00e9quipe"
3. Remplissez les colonnes (PJ, V, D, DP, PTS, etc.)
4. Cochez "Surligner" pour mettre en \u00e9vidence une \u00e9quipe

## Score final (mode 7)

Affichage grand format du score final avec d\u00e9tails par p\u00e9riode.

**Remplir les donn\u00e9es** :
1. Section **Score final** : titre, scores par p\u00e9riode (ajoutez-en avec "Ajouter une p\u00e9riode")
2. Optionnel : but gagnant (joueur, \u00e9quipe, temps) et note de prolongation

## Texte libre (mode 8)

Zone de texte multiligne avec mise en forme par ligne.

**Remplir les donn\u00e9es** :
1. Section **Texte libre** : ajoutez des lignes avec "Ajouter une ligne"
2. Pour chaque ligne : texte, taille de police, alignement (gauche/centre/droite), gras

## Face-\u00e0-face joueurs (mode 9)

Deux joueurs face \u00e0 face avec comparaison statistique.

**Remplir les donn\u00e9es** :
1. Section **Face-\u00e0-face** : titre, puis pour chaque joueur (gauche/droite) : nom, num\u00e9ro, \u00e9quipe
2. Ajoutez des lignes de statistiques compar\u00e9es (label, valeur gauche, valeur droite)

## Chronologie (mode 10)

Liste chronologique des \u00e9v\u00e9nements du match.

**Remplir les donn\u00e9es** :
1. Section **Chronologie** : titre, puis ajoutez des \u00e9v\u00e9nements
2. Pour chaque \u00e9v\u00e9nement : p\u00e9riode, temps, type (but/p\u00e9nalit\u00e9/temps mort/p\u00e9riode), description, \u00e9quipe

## Barres comparatives (mode 11)

Barres de progression horizontales face \u00e0 face.

**Remplir les donn\u00e9es** :
1. Section **Barres comparatives** : titre, puis ajoutez des barres
2. Pour chaque barre : label, valeur gauche, valeur droite, format (pourcentage ou absolu)

## Composition d'\u00e9quipe (mode 12)

Liste des joueurs d'une \u00e9quipe avec positions.

**Remplir les donn\u00e9es** :
1. Section **Composition d'\u00e9quipe** : titre, \u00e9quipe, entra\u00eeneur
2. Ajoutez des joueurs : num\u00e9ro, nom, position
3. Vous pouvez aussi **importer** un fichier CSV, Excel ou JSON (bouton "Importer")

## Calendrier (mode 13)

Liste des matchs \u00e0 venir ou termin\u00e9s.

**Remplir les donn\u00e9es** :
1. Section **Calendrier** : titre, puis ajoutez des matchs
2. Pour chaque match : date, heure, \u00e9quipe gauche, \u00e9quipe droite, scores, statut (\u00e0 venir/en cours/termin\u00e9), lieu`,
};
