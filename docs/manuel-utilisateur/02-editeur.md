# Manuel utilisateur - Panneau editeur

Le panneau editeur est la colonne de gauche de l'application. Il contient tous les controles pour configurer le scoreboard, organises en sections depliables.

## Organisation

Les sections sont regroupees en trois categories :

### Contenu

- **En-tete** : selection des equipes (31 nations), saisie des scores
- **Titres** : texte(s) affiche(s) dans le corps du scoreboard (selon le type)
- **Section specifique au body type** : contenu variable selon le type d'affichage choisi (stats, classement, fiche joueur, etc.)
- **Temps morts** : activation et compteur de temps morts par equipe
- **Tirs au but** : activation et saisie des tentatives
- **Penalites** : ajout/suppression de penalites pour chaque equipe (temps + numero)

### Apparence

- **General** : choix du type d'affichage (1-13), affichage des penalites
- **Dimensions** : taille du canvas (presets ou personnalise)
- **Arriere-plan** : mode uniforme ou degrade, couleurs, media de fond
- **Polices** : 3 zones de police independantes (equipes, horloge, corps)
- **Tailles de police** : controle granulaire de chaque element textuel
- **Couleurs** : 14 canaux de couleur avec opacite individuelle + presets

### Horloge

- **Horloge** : temps de jeu, cadre, visibilite, phase active, controles demo

## Sections depliables

Chaque section peut etre repliee en cliquant sur son titre. L'indicateur `v` (ouvert) ou `>` (ferme) indique l'etat.

## Selection des equipes

31 nations de hockey sont disponibles, identifiees par leur code NOC (Comite National Olympique) :

CAN, USA, RUS, SWE, FIN, CZE, SVK, SUI, GER, DEN, NOR, LAT, AUT, FRA, BLR, KAZ, SLO, HUN, GBR, POL, ITA, JPN, KOR, CHN, ROU, CRO, UKR, EST, LTU, SRB, BUL

Chaque equipe est accompagnee de son drapeau, rendu en CSS (sans images externes).

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
