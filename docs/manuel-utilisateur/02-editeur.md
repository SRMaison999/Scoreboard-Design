# Manuel utilisateur - Panneau éditeur

Le panneau éditeur est la colonne de gauche de l'application. Il contient tous les contrôles pour configurer le scoreboard.

## Navigation

La navigation est organisée sur deux niveaux :

### Rail d'icônes (navigation principale)

Un rail vertical d'icônes sur le bord gauche permet de basculer entre 5 groupes :

| Icône | Groupe | Description |
|-------|--------|-------------|
| Fichier | **Contenu** | Équipes, scores, body type, pénalités, médias |
| Palette | **Apparence** | Dimensions, polices, couleurs, fond |
| Horloge | **Horloge** | Temps de jeu, phases, démo |
| Film | **Animations** | Animations d'entrée/sortie, export vidéo/GIF |
| Radio | **Intégrations** | Scores en direct, multi-scoreboard, sync, broadcast |

Survoler une icône affiche une infobulle avec le nom du groupe.

### Sous-onglets (navigation secondaire)

À l'intérieur de chaque groupe, des sous-onglets horizontaux permettent d'accéder aux différentes sections :

- **Contenu** : Général | Équipes | Match | Médias
- **Apparence** : Style | Polices | Couleurs
- **Horloge** : pas de sous-onglets (section unique)
- **Animations** : Animations | Export
- **Intégrations** : Live | Multi | Sync | Broadcast

### Sections dépliables

À l'intérieur de chaque sous-onglet, les sections peuvent être repliées en cliquant sur leur titre. L'indicateur `v` (ouvert) ou `>` (fermé) indique l'état.

---

## Groupe Contenu

### Sous-onglet Général

- **Afficher les pénalités** : active/désactive les colonnes de pénalités

Le type d'affichage se choisit dans le panneau **Modes** (1re icône du rail). Le Layout libre est proposé en premier.

Quand le Layout libre est sélectionné, le panneau éditeur principal affiche :
- **Mode pleine page** : masque le header pour utiliser tout le canvas
- **Grille et guides** : affichage d'une grille d'alignement, aimantation, taille configurable
- **Bibliothèque** : palette de 25+ éléments à glisser sur le canvas (voir chapitre 3, Layout libre)
- **Presets** : sauvegarde et chargement de champs individuels ou d'écrans complets (voir chapitre 3, Layout libre)
- **Couches** : liste des champs avec réordonnancement, visibilité et verrouillage

Quand un champ est sélectionné sur le canvas, un **panneau de propriétés séparé** s'ouvre automatiquement en deuxième colonne (entre le panneau éditeur et la preview). Cela permet de consulter la bibliothèque et les couches tout en modifiant les propriétés d'un champ. Voir le chapitre 3 (Layout libre - Panneau de propriétés) pour le détail.

### Sous-onglet Équipes

- **En-tête** : sélection des équipes (31 nations), saisie des scores
- **Titres** : texte(s) affiché(s) dans le corps du scoreboard (selon le type, visible pour les types 1-3)
- **Section spécifique au body type** : contenu variable selon le type d'affichage choisi

### Sous-onglet Match

- **Temps morts** : activation et compteur de temps morts par équipe
- **Tirs au but** : activation et saisie des tentatives
- **Pénalités** : ajout/suppression de pénalités pour chaque équipe (temps + numéro)

### Sous-onglet Médias

- **Photos des joueurs** : galerie de photos par équipe et numéro
- **Logos** : logos d'équipes, compétition et sponsor avec positionnement

---

## Groupe Apparence

### Sous-onglet Style

- **Dimensions du template** : taille du canvas (presets HD/4K ou personnalisé)
- **Arrière-plan** : aucun, image ou vidéo de fond

### Sous-onglet Polices

- **Polices** : 3 zones de police indépendantes (équipes, horloge, corps)
- **Tailles de police** : contrôle granulaire de chaque élément textuel, avec mise à l'échelle proportionnelle par type de corps (50-200%)

### Sous-onglet Couleurs

- **Couleurs** : 14 canaux de couleur avec opacité individuelle
- **Presets** : schémas de couleurs prédéfinies

---

## Groupe Horloge

- **Horloge** : temps de jeu, cadre, visibilité, phase active
- **Phases et transitions** : gestion des phases du match
- **Démo** : contrôles de timer pour tester

---

## Groupe Animations

### Sous-onglet Animations

- Animations d'entrée et de sortie du scoreboard
- Effets sur changement de score, pénalités, horloge

### Sous-onglet Export

- Export vidéo et GIF avec paramètres de qualité

---

## Groupe Intégrations

### Sous-onglet Live

- Connexion à une API de scores en temps réel

### Sous-onglet Multi

- Gestion de multi-scoreboards (bande basse, bug, ticker)

### Sous-onglet Sync

- Synchronisation multi-poste via WebSocket

### Sous-onglet Broadcast

- Intégration CasparCG / Viz pour diffusion broadcast

---

## Sélection des équipes

31 nations de hockey sont disponibles, identifiées par leur code NOC (Comité National Olympique) :

CAN, USA, RUS, SWE, FIN, CZE, SVK, SUI, GER, DEN, NOR, LAT, AUT, FRA, BLR, KAZ, SLO, HUN, GBR, POL, ITA, JPN, KOR, CHN, ROU, CRO, UKR, EST, LTU, SRB, BUL

Chaque équipe est accompagnée de son drapeau SVG embarqué dans l'application. Les drapeaux peuvent être remplacés par des images personnalisées via l'onglet **Drapeaux** de la section Logos.

## Scores

Les scores sont saisis sous forme de texte libre. En mode opérateur, des boutons +/- permettent de les incrémenter/décrémenter rapidement.

## Pénalités

Quand les pénalités sont activées :

- Deux colonnes (gauche et droite) apparaissent sur le scoreboard
- Chaque pénalité est définie par un temps (MM:SS) et un numéro de joueur
- Les pénalités sont ajoutées en tête de liste (les plus récentes en haut)
- En mode démo, les pénalités défilent automatiquement et disparaissent à 0:00
- Maximum 8 pénalités par équipe

## Aperçu en temps réel

Toute modification dans l'éditeur est immédiatement reflétée dans la zone de preview à droite. Le preview est mis à l'échelle automatiquement pour s'adapter à la taille de la fenêtre.
