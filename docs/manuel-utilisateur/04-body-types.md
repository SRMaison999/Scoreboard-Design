# Manuel utilisateur - Types d'affichage

Le scoreboard propose 13 types d'affichage prédéfinis pour le corps du scoreboard. Le type est sélectionné dans le panneau **Modes** (1re icône du rail de navigation). Pour le mode **Layout libre**, consulter le [chapitre 3](./03-layout-libre.md).

---

## Type 1 : Stats symétriques

Titre centré et lignes de statistiques avec valeur gauche / label central / valeur droite.

**Idéal pour :** statistiques de match générales (tirs, mises en jeu, pourcentages, etc.)

### Structure visuelle

```
            GAME STATISTICS
  82%          GAME          91%
  87%       TOURNAMENT       85%
```

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre centré** | 1 titre affiché sur toute la largeur du corps |
| **Lignes de stats** | Jusqu'à 8 lignes, chacune avec : valeur gauche, label central, valeur droite |
| **Taille de police** | Automatique selon le nombre de lignes (plus il y a de lignes, plus la police est petite) |
| **Mise à l'échelle** | Slider de 50% à 200% pour ajuster globalement les tailles |

### Mise en page

- Grille CSS 3 colonnes : `1fr [labelW]px 1fr`
- Les valeurs sont centrées dans leurs colonnes respectives
- Le label est centré entre les deux colonnes de valeurs
- L'espacement vertical s'adapte automatiquement au nombre de lignes

### Cas d'utilisation

- Statistiques de match (tirs au but, mises en jeu gagnées, temps de possession)
- Comparaison de performances d'équipes sur un tournoi
- Affichage de pourcentages face à face

---

## Type 2 : Stats asymétriques

Deux titres (gauche et droite) avec des lignes de statistiques.

**Idéal pour :** comparer deux catégories distinctes (jeu de puissance vs infériorité numérique, domicile vs extérieur)

### Structure visuelle

```
POWER PLAY         PENALTY KILLING
    82%     GAME     91%
    87%   TOURNMT    85%
```

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre gauche** | Texte affiché dans la colonne gauche |
| **Titre droit** | Texte affiché dans la colonne droite |
| **Lignes de stats** | Identiques au Type 1 (valeur gauche, label, valeur droite) |
| **Taille de police** | Automatique selon le nombre de lignes |

### Différences avec le Type 1

- Les deux titres sont positionnés dans les colonnes de valeurs (pas centrés)
- Permet de comparer deux contextes différents côte à côte

---

## Type 3 : Stats joueur

Titre centré avec des lignes variable / joueur / valeur, incluant une photo circulaire optionnelle.

**Idéal pour :** leaders statistiques (meilleurs buteurs, passeurs, pointeurs, etc.)

### Structure visuelle

```
           GAME STATISTICS

GOALS     [11]  KOPITAR          12
ASSISTS   [88]  PASTRNAK          8
POINTS    [11]  KOPITAR          18
+/-       [81]  HOSSA            +6
```

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre centré** | 1 titre avec espace vertical dédié |
| **Lignes** | Label (catégorie), numéro du joueur, nom du joueur, valeur |
| **Photo joueur** | Option activable : cercle avec photo du joueur (ou numéro en fallback) |
| **Source des photos** | Les photos sont chargées depuis la galerie de photos joueurs (voir chapitre 11) |

### Mise en page

- Grille auto-centrée : Variable | (Photo) | Nom Prénom | Valeur
- Tous les textes à la même taille de police
- Gap uniforme de 35px entre colonnes

---

## Type 4 : But / Célébration

Affichage d'un but marqué avec détails du buteur et des passeurs.

**Idéal pour :** annonce de but en direct, célébration de but

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Équipe marqueuse** | Gauche ou droite |
| **Buteur** | Nom et numéro du joueur |
| **Temps du but** | Moment du but dans la période |
| **Passeurs** | Jusqu'à 2 passeurs (nom et numéro chacun) |
| **Type de but** | Optionnel (en supériorité numérique, en infériorité, filet désert, etc.) |

### Cas d'utilisation

- Annonce immédiate d'un but pendant le match
- Récapitulatif des buts avec détails complets

---

## Type 5 : Fiche joueur

Grande fiche joueur avec photo, nom, numéro, équipe et statistiques.

**Idéal pour :** joueur du match, MVP, présentation de joueur

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Configurable ("Joueur du match", "MVP", "Meilleur joueur", etc.) |
| **Joueur** | Nom, numéro, équipe |
| **Photo** | Grande photo centrale (ou placeholder) |
| **Statistiques** | Colonnes de statistiques (label + valeur) en bas |

### Cas d'utilisation

- Joueur du match à la fin d'une rencontre
- Présentation de joueur avant le match
- Meilleur joueur d'un tournoi

---

## Type 6 : Classement / Tableau

Tableau de classement avec colonnes configurables.

**Idéal pour :** classements de groupe, classements de tournoi, tableaux de poule

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Nom du classement |
| **Équipes** | Lignes avec drapeaux, codes pays et valeurs statistiques |
| **Colonnes** | Standards hockey : MJ, V, D, VP, DP, BP, BC, PTS. Entièrement configurables. |
| **Surlignage** | Couleur de surlignage pour les équipes qualifiées (vert) ou éliminées (rouge) |

### Structure visuelle

```
              GROUP A - STANDINGS
#  [FLAG] TEAM    GP   W   L  OTW  OTL  GF  GA  PTS
1  [CAN]  CAN      3   3   0   0    0   12   3   9
2  [USA]  USA      3   2   0   1    0    8   5   7
3  [SUI]  SUI      3   0   1   0    2    4   8   2
4  [GER]  GER      3   0   2   0    1    3  11   1
```

---

## Type 7 : Score final

Affichage grand format du score final avec détails par période.

**Idéal pour :** écran de fin de match, résultat officiel

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | "Score final", "Résultat", etc. |
| **Scores par période** | Détail de chaque période |
| **But gagnant** | Joueur, équipe, temps du but décisif |
| **Mention spéciale** | Prolongation, tirs au but, double prolongation |

---

## Type 8 : Texte libre

Zone de texte multiligne avec mise en forme.

**Idéal pour :** messages, annonces, sponsors, informations diverses

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Lignes de texte** | Lignes individuelles avec contenu personnalisable |
| **Alignement** | Par ligne : gauche, centre ou droite |
| **Graisse** | Gras optionnel par ligne |

### Cas d'utilisation

- Messages sponsors pendant les intermissions
- Annonces d'événements
- Informations complémentaires (lieu, date, compétition)

---

## Type 9 : Face-à-face joueurs

Deux joueurs face à face avec comparaison statistique et photos circulaires.

**Idéal pour :** comparaison de joueurs clés, duel de gardiens, confrontation de capitaines

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Titre de la comparaison |
| **Joueur gauche** | Nom, numéro, équipe + photo circulaire |
| **Joueur droite** | Nom, numéro, équipe + photo circulaire |
| **Lignes de comparaison** | Label + valeur gauche + valeur droite |
| **Photos** | Chargées depuis la galerie de photos joueurs (voir chapitre 11) |

---

## Type 10 : Chronologie

Liste chronologique des événements du match.

**Idéal pour :** résumé du match en temps réel, déroulement chronologique

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Titre de la chronologie |
| **Événements** | Période, temps, type, équipe, joueur, détail |
| **Types d'événements** | But, pénalité, temps mort, début/fin de période, tir au but |
| **Score courant** | Affiché automatiquement après chaque but |

---

## Type 11 : Barres comparatives

Barres de progression horizontales face à face.

**Idéal pour :** visualisation graphique des statistiques comparées

### Structure visuelle

```
           GAME STATISTICS

SHOTS ON GOAL
████████████████████░░░░░  32        19  ░░░░░░░░░████████████
                    CAN                   SUI
```

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Titre de la section |
| **Barres** | Label, valeur gauche, valeur droite |
| **Format** | Pourcentage ou valeurs absolues |

---

## Type 12 : Composition d'équipe (Roster)

Composition d'équipe avec positions et informations.

**Idéal pour :** présentation des lineups, compositions d'avant-match

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Titre et équipe |
| **Joueurs** | Position (G, D, AG, C, AD), numéro, nom |
| **Entraîneur** | Nom de l'entraîneur |
| **Statistiques** | Statistiques résumées de l'équipe |

---

## Type 13 : Calendrier / Prochains matchs

Liste des matchs à venir ou terminés.

**Idéal pour :** programme du tournoi, résultats de la journée

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Titre de la liste |
| **Matchs** | Date, heure, équipes (avec drapeaux), lieu |
| **Statut** | À venir, en cours, terminé |
| **Scores** | Affichés pour les matchs terminés |

---

## Tableau récapitulatif

| N° | Type | Usage principal | Complexité |
|----|------|----------------|-----------|
| 1 | Stats symétriques | Statistiques de match | Simple |
| 2 | Stats asymétriques | Comparaison de catégories | Simple |
| 3 | Stats joueur | Leaders statistiques | Simple |
| 4 | But / Célébration | Annonce de but | Simple |
| 5 | Fiche joueur | MVP, joueur du match | Simple |
| 6 | Classement | Tableau de poule | Moyen |
| 7 | Score final | Résultat de match | Simple |
| 8 | Texte libre | Messages, annonces | Simple |
| 9 | Face-à-face | Duel de joueurs | Moyen |
| 10 | Chronologie | Résumé du match | Moyen |
| 11 | Barres comparatives | Visualisation de stats | Simple |
| 12 | Composition | Lineups | Moyen |
| 13 | Calendrier | Programme | Simple |

> Pour le **Layout libre** (composition sur mesure, niveau avancé), consulter le [chapitre 3](./03-layout-libre.md).
