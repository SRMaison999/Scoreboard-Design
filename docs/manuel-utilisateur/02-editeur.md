# Manuel utilisateur - Panneau editeur

Le panneau editeur est la colonne de gauche de l'application. Il contient tous les controles pour configurer le scoreboard.

## Navigation

La navigation est organisee sur deux niveaux :

### Rail d'icones (navigation principale)

Un rail vertical d'icones sur le bord gauche permet de basculer entre 5 groupes :

| Icone | Groupe | Description |
|-------|--------|-------------|
| Fichier | **Contenu** | Equipes, scores, body type, penalites, medias |
| Palette | **Apparence** | Dimensions, polices, couleurs, fond |
| Horloge | **Horloge** | Temps de jeu, phases, demo |
| Film | **Animations** | Animations d'entree/sortie, export video/GIF |
| Radio | **Integrations** | Scores en direct, multi-scoreboard, sync, broadcast |

Survoler une icone affiche une infobulle avec le nom du groupe.

### Sous-onglets (navigation secondaire)

A l'interieur de chaque groupe, des sous-onglets horizontaux permettent d'acceder aux differentes sections :

- **Contenu** : General | Equipes | Match | Medias
- **Apparence** : Style | Polices | Couleurs
- **Horloge** : pas de sous-onglets (section unique)
- **Animations** : Animations | Export
- **Integrations** : Live | Multi | Sync | Broadcast

### Sections depliables

A l'interieur de chaque sous-onglet, les sections peuvent etre repliees en cliquant sur leur titre. L'indicateur `v` (ouvert) ou `>` (ferme) indique l'etat.

---

## Groupe Contenu

### Sous-onglet General

- **Type de corps** : choix du type d'affichage (1-13 : stats, classement, fiche joueur, etc. ou 14 : Layout libre)
- **Afficher les penalites** : active/desactive les colonnes de penalites

Quand le type 14 (Layout libre) est sélectionné, une section dédiée apparaît avec :
- **Mode pleine page** : masque le header pour utiliser tout le canvas
- **Grille et guides** : affichage d'une grille d'alignement, aimantation, taille configurable
- **Bibliothèque** : palette de 25+ éléments à glisser sur le canvas (voir chapitre 3, Type 14)
- **Presets** : sauvegarde et chargement de champs individuels ou d'ecrans complets (voir chapitre 3, Type 14)
- **Couches** : liste des champs avec réordonnancement, visibilité et verrouillage
- **Propriétés** : panneau de configuration du champ sélectionné (position, taille, style, config élément)

### Sous-onglet Equipes

- **En-tete** : selection des equipes (31 nations), saisie des scores
- **Titres** : texte(s) affiche(s) dans le corps du scoreboard (selon le type, visible pour les types 1-3)
- **Section specifique au body type** : contenu variable selon le type d'affichage choisi

### Sous-onglet Match

- **Temps morts** : activation et compteur de temps morts par equipe
- **Tirs au but** : activation et saisie des tentatives
- **Penalites** : ajout/suppression de penalites pour chaque equipe (temps + numero)

### Sous-onglet Medias

- **Photos des joueurs** : galerie de photos par equipe et numero
- **Logos** : logos d'equipes, competition et sponsor avec positionnement

---

## Groupe Apparence

### Sous-onglet Style

- **Dimensions du template** : taille du canvas (presets HD/4K ou personnalise)
- **Arriere-plan** : aucun, image ou video de fond

### Sous-onglet Polices

- **Polices** : 3 zones de police independantes (equipes, horloge, corps)
- **Tailles de police** : controle granulaire de chaque element textuel, avec mise a l'echelle proportionnelle par type de corps (50-200%)

### Sous-onglet Couleurs

- **Couleurs** : 14 canaux de couleur avec opacite individuelle
- **Presets** : schemas de couleurs predefinies

---

## Groupe Horloge

- **Horloge** : temps de jeu, cadre, visibilite, phase active
- **Phases et transitions** : gestion des phases du match
- **Demo** : controles de timer pour tester

---

## Groupe Animations

### Sous-onglet Animations

- Animations d'entree et de sortie du scoreboard
- Effets sur changement de score, penalites, horloge

### Sous-onglet Export

- Export video et GIF avec parametres de qualite

---

## Groupe Integrations

### Sous-onglet Live

- Connexion a une API de scores en temps reel

### Sous-onglet Multi

- Gestion de multi-scoreboards (bande basse, bug, ticker)

### Sous-onglet Sync

- Synchronisation multi-poste via WebSocket

### Sous-onglet Broadcast

- Integration CasparCG / Viz pour diffusion broadcast

---

## Selection des equipes

31 nations de hockey sont disponibles, identifiees par leur code NOC (Comite National Olympique) :

CAN, USA, RUS, SWE, FIN, CZE, SVK, SUI, GER, DEN, NOR, LAT, AUT, FRA, BLR, KAZ, SLO, HUN, GBR, POL, ITA, JPN, KOR, CHN, ROU, CRO, UKR, EST, LTU, SRB, BUL

Chaque \u00e9quipe est accompagn\u00e9e de son drapeau SVG embarqu\u00e9 dans l'application. Les drapeaux peuvent \u00eatre remplac\u00e9s par des images personnalis\u00e9es via l'onglet **Drapeaux** de la section Logos.

## Scores

Les scores sont saisis sous forme de texte libre. En mode operateur, des boutons +/- permettent de les incrementer/decrementer rapidement.

## Penalites

Quand les penalites sont activees :

- Deux colonnes (gauche et droite) apparaissent sur le scoreboard
- Chaque penalite est definie par un temps (MM:SS) et un numero de joueur
- Les penalites sont ajoutees en tete de liste (les plus recentes en haut)
- En mode demo, les penalites defilent automatiquement et disparaissent a 0:00
- Maximum 8 penalites par equipe

## Apercu en temps reel

Toute modification dans l'editeur est immediatement refletee dans la zone de preview a droite. Le preview est mis a l'echelle automatiquement pour s'adapter a la taille de la fenetre.
