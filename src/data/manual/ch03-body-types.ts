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

## Layout libre (mode 14) \u2014 Guide complet

Le Layout libre est le mode le plus puissant : il affiche un canvas enti\u00e8rement vierge (sans header pr\u00e9d\u00e9fini) sur lequel vous placez librement des \u00e9l\u00e9ments visuels.

### \u00c9tape 1 : S\u00e9lectionner le mode Layout libre

1. Rail d'ic\u00f4nes > **Modes** (1\u00e8re ic\u00f4ne)
2. Cliquez sur **Layout libre** (premi\u00e8re option, cat\u00e9gorie "Personnalis\u00e9")
3. Le canvas devient enti\u00e8rement bleu (vierge), et le panneau **Contenu > \u00c9quipes** s'ouvre automatiquement

### \u00c9tape 2 : Configurer les options du canvas

En haut du panneau, la section **Layout libre** propose :

| Option | Description |
|--------|-------------|
| Mode pleine page | Les \u00e9l\u00e9ments peuvent couvrir l'int\u00e9gralit\u00e9 du canvas |
| Aimanter \u00e0 la grille | Les \u00e9l\u00e9ments s'alignent sur une grille invisible (10, 20 ou 50 px) |
| Afficher les guides | Affiche la grille en surimpression pour faciliter l'alignement |

### \u00c9tape 3 : Ajouter des \u00e9l\u00e9ments depuis la biblioth\u00e8que

Juste en dessous des options, la section **Biblioth\u00e8que d'\u00e9l\u00e9ments** affiche tous les \u00e9l\u00e9ments disponibles, class\u00e9s en 6 cat\u00e9gories :

| Cat\u00e9gorie | \u00c9l\u00e9ments disponibles |
|-----------|----------------------|
| **Match** | Score, Horloge, P\u00e9riode, Nom d'\u00e9quipe, Drapeau, Temps morts, Tirs au but |
| **Texte** | Bloc de texte (contenu libre, taille et style configurables) |
| **Donn\u00e9es** | Ligne de stat, Barre comparative |
| **Joueurs** | Photo joueur |
| **M\u00e9dias** | Image, Forme g\u00e9om\u00e9trique, S\u00e9parateur |
| **Compos\u00e9s** | Header complet, Colonne de p\u00e9nalit\u00e9s, et les 13 autres types d'affichage comme blocs embarqu\u00e9s |

**Pour ajouter un \u00e9l\u00e9ment** : cliquez sur son nom dans la liste. Il appara\u00eet au centre du canvas.

**Astuce** : utilisez le champ de **recherche** en haut de la biblioth\u00e8que pour trouver rapidement un \u00e9l\u00e9ment par son nom.

**Limite** : maximum 50 \u00e9l\u00e9ments par canvas.

### \u00c9tape 4 : Manipuler les \u00e9l\u00e9ments sur le canvas

| Action | Geste |
|--------|-------|
| **S\u00e9lectionner** | Cliquez sur l'\u00e9l\u00e9ment |
| **D\u00e9placer** | Cliquez et glissez l'\u00e9l\u00e9ment |
| **Redimensionner** | Glissez l'une des 4 poign\u00e9es aux coins |
| **Taille de police** | Molette de la souris sur l'\u00e9l\u00e9ment s\u00e9lectionn\u00e9 |
| **D\u00e9s\u00e9lectionner** | Cliquez sur le fond du canvas (zone vide) |
| **Supprimer** | Touche Suppr. avec l'\u00e9l\u00e9ment s\u00e9lectionn\u00e9 |
| **Dupliquer** | Ctrl+D avec l'\u00e9l\u00e9ment s\u00e9lectionn\u00e9 |
| **D\u00e9placer finement** | Fl\u00e8ches du clavier (1 pixel par appui) |

### \u00c9tape 5 : Configurer un \u00e9l\u00e9ment (panneau Propri\u00e9t\u00e9s)

Quand vous cliquez sur un \u00e9l\u00e9ment dans le canvas, un **panneau Propri\u00e9t\u00e9s** s'ouvre en deuxi\u00e8me colonne (entre le panneau \u00e9diteur et le preview). Ce panneau contient :

1. **Nom** : label de l'\u00e9l\u00e9ment (pour l'identifier dans la liste des couches)
2. **Alignement** : 6 boutons pour positionner rapidement l'\u00e9l\u00e9ment (gauche, centre horizontal, droite, haut, centre vertical, bas)
3. **Position** : coordonn\u00e9es X et Y en pixels
4. **Taille** : largeur et hauteur en pixels
5. **Z-Index** : ordre d'empilement (les \u00e9l\u00e9ments avec un z-index \u00e9lev\u00e9 passent devant)
6. **Style** : couleur de fond, bordure (couleur, \u00e9paisseur, rayon), opacit\u00e9, padding
7. **Configuration sp\u00e9cifique** : options qui d\u00e9pendent du type d'\u00e9l\u00e9ment (voir tableau ci-dessous)
8. **Actions** : boutons Dupliquer et Supprimer

**Pour fermer le panneau** : cliquez sur le bouton X en haut, ou cliquez sur une zone vide du canvas.

### Configuration sp\u00e9cifique par type d'\u00e9l\u00e9ment

| Type d'\u00e9l\u00e9ment | Options sp\u00e9cifiques |
|-----------------|---------------------|
| **Bloc de texte** | Contenu, taille de police, graisse, alignement, casse, espacement |
| **Score** | C\u00f4t\u00e9 (gauche/droite), afficher le label, taille de police |
| **Horloge** | Afficher la p\u00e9riode, afficher le cadre, taille de police |
| **P\u00e9riode** | Taille de police |
| **Nom d'\u00e9quipe** | C\u00f4t\u00e9 (gauche/droite), afficher le drapeau, taille de police |
| **Drapeau** | C\u00f4t\u00e9 (gauche/droite) |
| **Ligne de stat** | Index de la statistique \u00e0 afficher |
| **Barre comparative** | Index de la barre \u00e0 afficher |
| **Photo joueur** | Cl\u00e9 photo, forme (cercle/carr\u00e9) |
| **Image** | Source (URL), ajustement (cover/contain/fill) |
| **Forme** | Type, couleur de remplissage, opacit\u00e9, bordure |
| **S\u00e9parateur** | Orientation, \u00e9paisseur, couleur, opacit\u00e9 |

### \u00c9tape 6 : Organiser les couches

En bas du panneau \u00e9diteur, la section **Couches** liste tous les \u00e9l\u00e9ments du canvas :
- Chaque \u00e9l\u00e9ment affiche son nom et son z-index
- Cliquez sur un \u00e9l\u00e9ment de la liste pour le s\u00e9lectionner dans le canvas
- Ajustez le z-index pour contr\u00f4ler l'ordre d'affichage

### Presets (sauvegarder et charger des mises en page)

La section **Presets** permet de :
- **Sauvegarder un \u00e9l\u00e9ment** : enregistre la configuration d'un seul \u00e9l\u00e9ment pour le r\u00e9utiliser
- **Sauvegarder la mise en page** : enregistre l'ensemble des \u00e9l\u00e9ments du canvas
- **Charger un preset** : applique un preset sauvegard\u00e9 pr\u00e9c\u00e9demment

### Exemple concret : cr\u00e9er un scoreboard personnalis\u00e9

1. **Modes** > cliquez sur **Layout libre**
2. Le canvas est vierge. Dans la biblioth\u00e8que, cliquez sur **Header complet** (cat\u00e9gorie "Compos\u00e9s") pour ajouter un header en haut
3. Ajoutez un **Bloc de texte** (cat\u00e9gorie "Texte") et saisissez "STATISTIQUES DU MATCH" dans les propri\u00e9t\u00e9s
4. Ajoutez plusieurs **Lignes de stat** (cat\u00e9gorie "Donn\u00e9es") et positionnez-les en dessous du titre
5. Ajoutez un **S\u00e9parateur** (cat\u00e9gorie "M\u00e9dias") entre le titre et les stats
6. Ajustez les positions et les tailles via le panneau Propri\u00e9t\u00e9s ou par glisser-d\u00e9poser

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
