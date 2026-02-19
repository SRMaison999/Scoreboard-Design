# Manuel utilisateur - Types d'affichage

Le scoreboard propose 14 types d'affichage différents pour le corps du scoreboard. Le type est sélectionné dans la section "Général" de l'éditeur.

## Type 1 : Stats symétriques

Titre centré et lignes de statistiques avec valeur gauche / label central / valeur droite.

Idéal pour : statistiques de match générales (tirs, mises en jeu, etc.)

Configuration :
- 1 titre centré
- Jusqu'à 8 lignes de stats (valeur gauche, label, valeur droite)
- Taille de police automatique selon le nombre de lignes

## Type 2 : Stats asymétriques

Deux titres (gauche et droite) avec des lignes de statistiques.

Idéal pour : comparer deux catégories (ex : jeu de puissance vs infériorité numérique)

Configuration :
- 2 titres (gauche et droite)
- Lignes de stats identiques au type 1

## Type 3 : Stats joueur

Titre centré avec des lignes variable / joueur / valeur, incluant une photo circulaire optionnelle.

Idéal pour : leaders statistiques (meilleurs buteurs, passeurs, etc.)

Configuration :
- 1 titre centré
- Lignes : label, numéro de joueur, nom, valeur
- Option photo joueur (cercle avec image ou numéro en fallback)
- Les photos sont chargées depuis la galerie de photos joueurs (voir chapitre 10)

## Type 4 : But / Célébration

Affichage d'un but marqué avec détails du buteur et des passeurs.

Idéal pour : annonce de but en direct

Configuration :
- Équipe marqueuse (gauche ou droite)
- Nom et numéro du buteur
- Temps du but
- Jusqu'à 2 passeurs (nom et numéro)
- Type de but optionnel

## Type 5 : Fiche joueur

Grande fiche joueur avec photo, nom, numéro, équipe et statistiques.

Idéal pour : joueur du match, MVP, présentation de joueur

Configuration :
- Titre configurable
- Nom, numéro, équipe du joueur
- Statistiques en colonnes (label + valeur)

## Type 6 : Classement / Tableau

Tableau de classement avec colonnes configurables.

Idéal pour : classements de groupe, de tournoi

Configuration :
- Titre du classement
- Équipes avec drapeaux et valeurs statistiques
- Colonnes standards : MJ, V, D, VP, DP, BP, BC, PTS
- Surlignage des équipes qualifiées/éliminées

## Type 7 : Score final

Affichage grand format du score final avec détails par période.

Idéal pour : écran de fin de match

Configuration :
- Titre (Score final, Résultat, etc.)
- Scores par période
- But gagnant (joueur, équipe, temps)
- Mention prolongation / tirs au but

## Type 8 : Texte libre

Zone de texte multiligne avec mise en forme.

Idéal pour : messages, annonces, sponsors, informations

Configuration :
- Lignes de texte individuelles
- Alignement par ligne (gauche, centre, droite)
- Gras optionnel par ligne

## Type 9 : Face-à-face joueurs

Deux joueurs face à face avec comparaison statistique, avec photos circulaires.

Idéal pour : comparaison de joueurs clés

Configuration :
- Titre
- 2 joueurs (nom, numéro, équipe) avec photo circulaire
- Lignes de comparaison (label + valeurs gauche/droite)
- Les photos sont chargées depuis la galerie de photos joueurs (voir chapitre 10)

## Type 10 : Chronologie

Liste chronologique des événements du match.

Idéal pour : résumé du match en temps réel

Configuration :
- Titre
- Événements avec : période, temps, type, équipe, joueur, détail
- Types : but, pénalité, temps mort, début/fin de période, tir au but
- Score courant après chaque but

## Type 11 : Barres comparatives

Barres de progression horizontales face à face.

Idéal pour : visualisation graphique des statistiques comparées

Configuration :
- Titre
- Barres avec label, valeurs gauche/droite
- Format pourcentage ou valeurs absolues

## Type 12 : Roster / Composition

Composition d'équipe avec positions et informations.

Idéal pour : présentation des lineups

Configuration :
- Titre et équipe
- Joueurs avec position, numéro, nom
- Nom de l'entraîneur
- Statistiques résumées

## Type 13 : Calendrier / Prochains matchs

Liste des matchs à venir ou terminés.

Idéal pour : programme du tournoi

Configuration :
- Titre
- Matchs avec date, heure, équipes, lieu
- Statut : à venir, en cours, terminé
- Scores pour les matchs terminés

---

## Type 14 : Layout libre (champs personnalisés)

Canvas entièrement libre où l'utilisateur compose son propre scoreboard en plaçant, déplaçant et redimensionnant des éléments visuels individuels.

Idéal pour : créer un affichage sur mesure qui ne correspond à aucun des 13 types prédéfinis.

### Concept

Contrairement aux types 1-13 qui imposent un agencement fixe, le Layout libre offre un canvas vierge. L'utilisateur y dépose des éléments depuis une bibliothèque, puis les positionne librement par glisser-déposer et les redimensionne via des poignées dans les coins.

### Mode pleine page

Quand activé, le header (drapeaux, noms d'équipes, scores, horloge) est masqué. Le canvas entier est alors disponible pour les champs personnalisés. Ce mode est utile pour créer un scoreboard complètement personnalisé, en plaçant chaque élément exactement où on le souhaite.

### Bibliothèque d'éléments

La bibliothèque propose des éléments répartis en 6 catégories :

| Catégorie | Éléments |
|-----------|----------|
| **Match** | Score, Horloge, Période, Nom d'équipe, Drapeau, Temps morts, Tirs au but |
| **Texte** | Bloc de texte |
| **Données** | Ligne de stat, Barre comparative |
| **Joueurs** | Photo joueur |
| **Médias** | Image, Forme (rectangle, cercle, arrondi), Séparateur (ligne) |
| **Composés** | Header complet, Colonne de pénalités, Types 1-13 intégrés |

Un champ de recherche permet de filtrer les éléments. Cliquer sur un élément l'ajoute au canvas avec des dimensions par défaut.

### Interaction sur le canvas

- **Sélection** : cliquer sur un champ pour le sélectionner (bordure bleue). Cliquer sur le fond du canvas pour désélectionner.
- **Déplacement** : glisser-déposer un champ sélectionné pour le repositionner.
- **Redimensionnement** : tirer une des 4 poignées dans les coins du champ sélectionné.
- **Verrouillage** : un champ verrouillé ne peut être ni déplacé ni redimensionné (curseur interdit).

### Contrôle de la taille de police sur le canvas

Pour les éléments textuels (score, horloge, période, nom d'équipe, bloc de texte), une **barre flottante** apparaît au-dessus du champ sélectionné. Elle affiche la taille de police actuelle et propose deux boutons :

- **-** : diminue la taille de 1 px. **Maintenir le bouton enfoncé** pour une répétition accélérée.
- **+** : augmente la taille de 1 px. **Maintenir le bouton enfoncé** pour une répétition accélérée.
- **Cliquer sur la valeur** : ouvre un champ de saisie directe. Taper la taille souhaitée (8-300), puis appuyer sur Entrée pour valider ou Échap pour annuler.

La valeur affichée apparaît en blanc si elle est propre au champ (override local), ou en gris si le champ utilise la taille globale. Cliquer sur + ou - crée automatiquement un override local.

**Raccourci souris** : la molette de la souris sur un champ sélectionné ajuste directement la taille de police (+1 px par cran vers le haut, -1 px vers le bas).

Si le champ est trop près du bord supérieur du canvas, la barre se repositionne en dessous du champ.

### Grille et guides

- **Afficher les guides** : superpose une grille en pointillés sur le canvas pour faciliter l'alignement visuel.
- **Taille de la grille** : configurable (8 px par défaut).
- **Aimanter à la grille** : les champs s'alignent automatiquement sur les intersections de la grille lors du déplacement.

### Panneau de propriétés (deuxième colonne)

Quand un champ est sélectionné, un **panneau de propriétés séparé** s'ouvre automatiquement entre le panneau éditeur principal et la zone de preview. Ce panneau forme une deuxième colonne indépendante (300 px de large), ce qui permet de garder la bibliothèque et les couches toujours visibles dans le panneau principal.

Le panneau de propriétés affiche :

- **Nom** : label personnalisable du champ
- **Alignement** : 6 boutons (gauche/centre/droite horizontal, haut/centre/bas vertical) + verrouillage des proportions
- **Position** : X et Y en pixels
- **Taille** : largeur et hauteur en pixels
- **Ordre (Z)** : position dans l'empilement des couches
- **Style** : couleur de fond, opacité du fond, couleur de bordure, épaisseur de bordure, rayon de bordure, marge interne
- **Configuration de l'élément** : paramètres spécifiques selon le type (voir ci-dessous)
- **Dupliquer** / **Supprimer**

Un bouton **X** en haut du panneau permet de le fermer (désélectionne le champ). Le panneau se ferme également en cliquant sur le fond du canvas.

### Configuration par type d'élément

| Type | Paramètres configurables |
|------|------------------------|
| Bloc de texte | Contenu, taille de police, épaisseur, alignement (gauche/centre/droite), casse (normal/majuscules), espacement |
| Score | Côté (gauche = équipe 1, droite = équipe 2), taille de police |
| Nom d'équipe | Côté (gauche/droite), taille de police |
| Horloge | Afficher la période, afficher le cadre, taille de police |
| Période | Taille de police |
| Drapeau | Côté (gauche/droite) |
| Colonne de pénalités | Côté (gauche/droite) |
| Forme | Type (rectangle, cercle, arrondi), couleur de remplissage, couleur de bordure, rayon (pour arrondi) |
| Séparateur | Orientation (horizontale/verticale), épaisseur, couleur |
| Image | URL source, ajustement (couvrir, contenir, étirer) |

### Panneau des couches

La liste des champs affiche tous les éléments dans l'ordre des couches (Z-index). Pour chaque champ :

- **Flèches haut/bas** : réordonner les couches (quel champ passe devant/derrière)
- **Oeil** : basculer la visibilité
- **Cadenas** : basculer le verrouillage
- Cliquer sur le nom sélectionne le champ sur le canvas

### Presets (sauvegarde et chargement)

Le système de presets permet de sauvegarder et réutiliser des constructions dans le Layout libre.

**Sauvegarder un preset :**

La section "Presets" dans le panneau éditeur propose deux options :

- **Sauvegarder le champ** : sauvegarde le champ actuellement sélectionné (élément, position, dimensions, style). Si d'autres champs sont visuellement placés à l'intérieur du champ sélectionné (par exemple des éléments dans un header), ils sont automatiquement inclus dans le preset. La modale indique le nombre d'éléments contenus détectés. Le bouton est grisé si aucun champ n'est sélectionné.
- **Sauvegarder l'écran** : sauvegarde l'intégralité du layout (tous les champs placés sur le canvas + les options du canvas comme le mode pleine page, la grille et les guides). Le bouton est grisé si le canvas est vide.

Une modale s'ouvre pour choisir le type de preset et saisir un nom.

**Charger un preset :**

Le bouton "Charger un preset" ouvre une modale listant tous les presets sauvegardés, séparés en deux sections (champs individuels et écrans complets).

Deux modes de chargement sont disponibles :

- **Remplacer** : le layout actuel est entièrement remplacé par le contenu du preset
- **Ajouter** : les champs du preset sont ajoutés au layout existant (dans la limite de 50 champs)

**Gestion des presets :**

- **Exporter** : télécharge le preset au format `.preset.json` (partage entre utilisateurs)
- **Importer** : charge un fichier `.preset.json` exporté par un autre utilisateur
- **Supprimer** : supprime définitivement un preset de la bibliothèque
