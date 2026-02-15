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
