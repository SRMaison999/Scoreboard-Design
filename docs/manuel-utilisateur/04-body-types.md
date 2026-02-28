# Manuel utilisateur - Types d'affichage

Le scoreboard propose 15 types d'affichage prédéfinis pour le corps du scoreboard. Le type est sélectionné dans le panneau **Modes** (1re icône du rail de navigation). Pour le mode **Layout libre**, consulter le [chapitre 3](./03-layout-libre.md).

---

## Type 1 : Stats centrées

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

## Type 2 : Stats gauche/droite

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

### Différences avec le Type 1 (Stats centrées)

- Les deux titres sont positionnés dans les colonnes de valeurs (pas centrés)
- Permet de comparer deux contextes différents côte à côte

### Mise en forme personnalisée

Rôles disponibles : **Titre**, **Valeurs**, **Labels**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

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

### Mise en forme personnalisée

Rôles disponibles : **Titre**, **Labels**, **Noms de joueurs**, **Valeurs**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

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

### Mise en forme personnalisée

Rôles disponibles : **Texte "BUT"**, **Nom d'équipe**, **Nom du buteur**, **Passeur 1**, **Passeur 2**, **Temps et période**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

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

### Mise en forme personnalisée

Rôles disponibles : **Titre**, **Sous-titre**, **Nom du joueur**, **Nom d'équipe**, **Valeurs**, **Labels**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

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

### Mise en forme personnalisée

Rôles disponibles : **Titre**, **En-têtes de colonnes**, **Rang**, **Noms d'équipes**, **Valeurs**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

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

### Mise en forme personnalisée

Rôles disponibles : **Titre**, **Noms d'équipes**, **Score**, **Scores par période**, **Note prolongation**, **But gagnant**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

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

### Mise en forme personnalisée

Rôles disponibles : **Lignes de texte** (propriétés globales pour toutes les lignes). Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité. Note : les propriétés par ligne (taille, graisse, alignement) restent configurables individuellement.

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

### Mise en forme personnalisée

Rôles disponibles : **Titre**, **Noms de joueurs**, **Infos joueurs**, **Valeurs**, **Labels**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

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

### Mise en forme personnalisée

Rôles disponibles : **Titre**, **Temps**, **Équipe**, **Description**, **Période**, **Symbole**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

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

### Mise en forme personnalisée

Rôles disponibles : **Titre**, **Noms d'équipes**, **Labels**, **Valeurs**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

---

## Type 12 : Composition d'équipe (Roster)

Composition d'équipe avec positions et informations.

**Idéal pour :** présentation des lineups, compositions d'avant-match

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Titre et équipe |
| **Joueurs** | Position (Gardien, Défenseur, Attaquant, Centre, Ailier gauche, Ailier droit), numéro, nom |
| **Entraîneur** | Nom de l'entraîneur |
| **Statistiques** | Statistiques résumées de l'équipe |

### Mise en forme personnalisée

Rôles disponibles : **Titre**, **Entraîneur**, **Numéros**, **Noms de joueurs**, **Position**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

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

### Mise en forme personnalisée

Rôles disponibles : **Titre**, **Date**, **Heure**, **Noms d'équipes**, **Score**, **Statut**, **Lieu**. Propriétés personnalisables : taille, graisse, police, espacement, casse, couleur, opacité.

---

## Type 15 : Arbitres

Présentation des arbitres du match avec drapeaux de nationalité, codes NOC et rôles.

**Idéal pour :** présentation des officiels avant le match, informations sur l'équipe d'arbitrage

### Structure visuelle

```
                   REFEREES

[FLAG] LAT  #15  ANSONS          Arbitre principal
[FLAG] RUS  #23  ROMASKO         Arbitre principal
[FLAG] RUS  #44  GOFMAN          Juge de ligne
[FLAG] CZE  #82  ONDRACEK        Juge de ligne
```

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Titre de la section |
| **Preset d'affichage** | Tous, un par un, colonnes par rôle, lignes par rôle, libre |
| **Drapeaux** | Afficher/masquer les drapeaux (globalement et individuellement) |
| **NOC** | Afficher/masquer les codes NOC (globalement et individuellement) |
| **Rôles** | Afficher/masquer les rôles (globalement et individuellement) |
| **Arbitres** | Nom, numéro, nationalité, rôle (arbitre principal ou juge de ligne) |

### Presets d'affichage

| Preset | Description |
|--------|-------------|
| **Tous** | Liste complète de tous les arbitres |
| **Un par un** | Affiche un seul arbitre à la fois (sélectionnable par index) |
| **Colonnes par rôle** | Arbitres principaux à gauche, juges de ligne à droite |
| **Lignes par rôle** | Arbitres principaux en haut, juges de ligne en bas |
| **Libre** | Identique à "Tous", pour personnalisation avancée |

### Mise en forme personnalisée

Chaque élément visuel du type Arbitres peut être personnalisé individuellement via la section **Style par élément** dans le panneau éditeur. Les rôles disponibles sont :

| Rôle | Description |
|------|-------------|
| **Titre** | Le titre principal ("REFEREES") |
| **Noms** | Les noms des arbitres |
| **Numéros** | Les numéros des arbitres |
| **NOC** | Les codes de nationalité |
| **Rôle** | Les libellés "Arbitre principal" / "Juge de ligne" |
| **Titre de catégorie** | Les en-têtes dans les presets colonnes/lignes |

Pour chaque rôle, vous pouvez surcharger :

- **Taille de police** (en pixels, avant application de l'échelle globale)
- **Graisse** (400 à 900)
- **Police** (remplace la police globale du body)
- **Espacement des lettres** (en pixels)
- **Casse** (normal, majuscules, minuscules)
- **Couleur** (remplace la couleur globale du template)
- **Opacité** (transparence de la couleur personnalisée)

Cliquez sur un rôle pour le déplier et modifier ses propriétés. Un badge "Personnaliser" apparaît à côté des rôles ayant des surcharges actives. Le bouton "Réinitialiser" supprime toutes les surcharges d'un rôle.

### Cas d'utilisation

- Présentation de l'équipe d'arbitrage avant le match
- Affichage individuel de chaque arbitre en alternance
- Séparation visuelle entre arbitres principaux et juges de ligne

---

## Type 16 : Spectateurs

Affichage du nombre de spectateurs présents avec plusieurs styles de présentation.

**Idéal pour :** annonce de l'affluence, information sur le lieu

### Structure visuelle (preset centré)

```
                SPECTATEURS

                  8 247

               Hallenstadion
                / 11 200
```

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Titre de la section |
| **Preset d'affichage** | Centré, bannière, compact, détaillé, libre |
| **Nombre de spectateurs** | Le chiffre de l'affluence |
| **Label personnalisé** | Texte affiché autour du nombre ("SPECTATEURS", "AFFLUENCE", etc.) |
| **Lieu** | Nom de l'arène ou du stade (affichage optionnel) |
| **Capacité** | Capacité maximale du lieu (affichage optionnel) |

### Presets d'affichage

| Preset | Description |
|--------|-------------|
| **Centré** | Grand chiffre centré avec label, lieu et capacité en dessous |
| **Bannière** | Présentation horizontale compacte sur une seule ligne |
| **Compact** | Version minimale avec label et chiffre uniquement |
| **Détaillé** | Toutes les informations avec mise en page aérée |
| **Libre** | Identique à "Centré", pour personnalisation avancée |

### Mise en forme personnalisée

Chaque élément visuel du type Spectateurs peut être personnalisé individuellement via la section **Style par élément**. Les rôles disponibles sont :

| Rôle | Description |
|------|-------------|
| **Titre** | Le titre principal ("ATTENDANCE") |
| **Nombre** | Le chiffre d'affluence |
| **Label** | Le texte de label ("SPECTATEURS") |
| **Lieu** | Le nom du lieu / arène |
| **Capacité** | La capacité maximale |

Les propriétés personnalisables sont identiques à celles du type Arbitres : taille, graisse, police, espacement, casse, couleur et opacité.

### Cas d'utilisation

- Annonce de l'affluence officielle pendant le match
- Affichage du nombre de spectateurs en fin de match
- Information sur le lieu et la capacité de l'arène

---

## Tableau récapitulatif

| N° | Type | Usage principal | Complexité |
|----|------|----------------|-----------|
| 1 | Stats centrées | Statistiques de match | Simple |
| 2 | Stats gauche/droite | Comparaison de catégories | Simple |
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
| 15 | Arbitres | Présentation des officiels | Moyen |
| 16 | Spectateurs | Affluence | Simple |

> Pour le **Layout libre** (composition sur mesure, niveau avancé), consulter le [chapitre 3](./03-layout-libre.md).
