# Manuel utilisateur - Types d'affichage

Le scoreboard propose 13 types d'affichage differents pour le corps du scoreboard. Le type est selectionne dans la section "General" de l'editeur.

## Type 1 : Stats symetriques

Titre centre et lignes de statistiques avec valeur gauche / label central / valeur droite.

Ideal pour : statistiques de match generales (tirs, mises en jeu, etc.)

Configuration :
- 1 titre centre
- Jusqu'a 8 lignes de stats (valeur gauche, label, valeur droite)
- Taille de police automatique selon le nombre de lignes

## Type 2 : Stats asymetriques

Deux titres (gauche et droite) avec des lignes de statistiques.

Ideal pour : comparer deux categories (ex: jeu de puissance vs inferiorite numerique)

Configuration :
- 2 titres (gauche et droite)
- Lignes de stats identiques au type 1

## Type 3 : Stats joueur

Titre centre avec des lignes variable / joueur / valeur, incluant une photo circulaire optionnelle.

Ideal pour : leaders statistiques (meilleurs buteurs, passeurs, etc.)

Configuration :
- 1 titre centre
- Lignes : label, numero de joueur, nom, valeur
- Option photo joueur (cercle avec image ou numero en fallback)
- Les photos sont chargees depuis la galerie de photos joueurs (voir chapitre 10)

## Type 4 : But / Celebration

Affichage d'un but marque avec details du buteur et des passeurs.

Ideal pour : annonce de but en direct

Configuration :
- Equipe marqueuse (gauche ou droite)
- Nom et numero du buteur
- Temps du but
- Jusqu'a 2 passeurs (nom et numero)
- Type de but optionnel

## Type 5 : Fiche joueur

Grande fiche joueur avec photo, nom, numero, equipe et statistiques.

Ideal pour : joueur du match, MVP, presentation de joueur

Configuration :
- Titre configurable
- Nom, numero, equipe du joueur
- Statistiques en colonnes (label + valeur)

## Type 6 : Classement / Tableau

Tableau de classement avec colonnes configurables.

Ideal pour : classements de groupe, de tournoi

Configuration :
- Titre du classement
- Equipes avec drapeaux et valeurs statistiques
- Colonnes standards : MJ, V, D, VP, DP, BP, BC, PTS
- Surlignage des equipes qualifiees/eliminees

## Type 7 : Score final

Affichage grand format du score final avec details par periode.

Ideal pour : ecran de fin de match

Configuration :
- Titre (Score final, Resultat, etc.)
- Scores par periode
- But gagnant (joueur, equipe, temps)
- Mention prolongation / tirs au but

## Type 8 : Texte libre

Zone de texte multiligne avec mise en forme.

Ideal pour : messages, annonces, sponsors, informations

Configuration :
- Lignes de texte individuelles
- Alignement par ligne (gauche, centre, droite)
- Gras optionnel par ligne

## Type 9 : Face-a-face joueurs

Deux joueurs face a face avec comparaison statistique, avec photos circulaires.

Ideal pour : comparaison de joueurs cles

Configuration :
- Titre
- 2 joueurs (nom, numero, equipe) avec photo circulaire
- Lignes de comparaison (label + valeurs gauche/droite)
- Les photos sont chargees depuis la galerie de photos joueurs (voir chapitre 10)

## Type 10 : Chronologie

Liste chronologique des evenements du match.

Ideal pour : resume du match en temps reel

Configuration :
- Titre
- Evenements avec : periode, temps, type, equipe, joueur, detail
- Types : but, penalite, temps mort, debut/fin de periode, tir au but
- Score courant apres chaque but

## Type 11 : Barres comparatives

Barres de progression horizontales face a face.

Ideal pour : visualisation graphique des statistiques comparees

Configuration :
- Titre
- Barres avec label, valeurs gauche/droite
- Format pourcentage ou valeurs absolues

## Type 12 : Roster / Composition

Composition d'equipe avec positions et informations.

Ideal pour : presentation des lineups

Configuration :
- Titre et equipe
- Joueurs avec position, numero, nom
- Nom de l'entraineur
- Statistiques resumees

## Type 13 : Calendrier / Prochains matchs

Liste des matchs a venir ou termines.

Ideal pour : programme du tournoi

Configuration :
- Titre
- Matchs avec date, heure, equipes, lieu
- Statut : a venir, en cours, termine
- Scores pour les matchs termines

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

### Grille et guides

- **Afficher les guides** : superpose une grille en pointillés sur le canvas pour faciliter l'alignement visuel.
- **Taille de la grille** : configurable (8px par défaut).
- **Aimanter à la grille** : les champs s'alignent automatiquement sur les intersections de la grille lors du déplacement.

### Panneau de propriétés

Quand un champ est sélectionné, le panneau de propriétés affiche :

- **Nom** : label personnalisable du champ
- **Position** : X et Y en pixels
- **Taille** : largeur et hauteur en pixels
- **Ordre (Z)** : position dans l'empilement des couches
- **Visibilité** et **verrouillage**
- **Style** : couleur de fond, opacité du fond, couleur de bordure, épaisseur de bordure, rayon de bordure, marge interne
- **Configuration de l'élément** : paramètres spécifiques selon le type (voir ci-dessous)
- **Supprimer** / **Dupliquer**

### Configuration par type d'élément

| Type | Paramètres configurables |
|------|------------------------|
| Bloc de texte | Contenu, taille de police, épaisseur, alignement (gauche/centre/droite), casse (normal/majuscules), espacement |
| Score | Côté (gauche = équipe 1, droite = équipe 2) |
| Nom d'équipe | Côté (gauche/droite) |
| Drapeau | Côté (gauche/droite) |
| Colonne de pénalités | Côté (gauche/droite) |
| Forme | Type (rectangle, cercle, arrondi), couleur de remplissage, couleur de bordure, rayon (pour arrondi) |
| Séparateur | Orientation (horizontale/verticale), épaisseur, couleur |
| Image | URL source, ajustement (couvrir, contenir, étirer) |

### Panneau des couches

La liste des champs affiche tous les éléments dans l'ordre des couches (Z-index). Pour chaque champ :

- **Flèches haut/bas** : réordonner les couches (quel champ passe devant/derrière)
- **Œil** : basculer la visibilité
- **Cadenas** : basculer le verrouillage
- Cliquer sur le nom sélectionne le champ sur le canvas
