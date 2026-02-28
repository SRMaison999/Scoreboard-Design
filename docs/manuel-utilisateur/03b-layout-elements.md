# Manuel utilisateur - Layout libre : Éléments et presets

Guide détaillé de chaque type d'élément disponible dans la bibliothèque du Layout libre, ainsi que la gestion des couches et des presets.

> **Chapitre parent :** [Layout libre](03-layout-libre.md) | **Voir aussi :** [Tutoriels pas à pas](03c-layout-tutoriels.md)

---

## Sommaire

**Éléments de match**
- [Score](#score)
- [Nom d'équipe](#nom-déquipe)
- [Drapeau](#drapeau)
- [Horloge](#horloge)
- [Période](#période)
- [Temps morts](#temps-morts)
- [Tirs au but](#tirs-au-but)
- [Score par période](#score-par-période)

**Éléments de texte et données**
- [Bloc de texte](#bloc-de-texte)
- [Ligne de stat](#ligne-de-stat)
- [Barre comparative](#barre-comparative)

**Éléments joueurs**
- [Photo joueur](#photo-joueur)
- [Joueur (ligne)](#joueur-ligne)
- [Liste de joueurs](#liste-de-joueurs)
- [Fiche joueur](#fiche-joueur)

**Éléments de but**
- [Buteur](#buteur)
- [Assistants](#assistants)
- [Détails du but](#détails-du-but)

**Éléments d'équipe**
- [Membre du staff](#membre-du-staff)
- [Liste du staff](#liste-du-staff)

**Tableau**
- [Tableau de données](#tableau-de-données)

**Événements et calendrier**
- [Événement](#événement)
- [Chronologie](#chronologie)
- [Match](#match)
- [Programme](#programme)

**Éléments médias**
- [Image](#image)
- [Forme](#forme)
- [Séparateur](#séparateur)

**Éléments composés**
- [Header complet](#header-complet)
- [Colonne de pénalités](#colonne-de-pénalités)
- [Types d'affichage embarqués](#types-daffichage-embarqués)

**Organisation**
- [Organiser les couches](#organiser-les-couches)
- [Presets (sauvegarder et charger des mises en page)](#presets-sauvegarder-et-charger-des-mises-en-page)

---

## Éléments de match

### Score

Affiche le score d'une équipe (la valeur saisie dans Header > Score 1 ou Score 2).

**Comment l'utiliser :**
1. Ajoutez un élément **Score** depuis la bibliothèque
2. Cliquez dessus dans le canvas > ses propriétés s'affichent en bas de la barre latérale
3. Dans **Côté**, choisissez **Gauche** (Score 1) ou **Droite** (Score 2)
4. Optionnel : ajustez la **Taille de police** (0 = valeur globale)

**Pour afficher les deux scores :** ajoutez **deux** éléments Score. Configurez le premier sur "Gauche" et le second sur "Droite".

**Astuce :** placez une **Forme** rectangle sombre derrière chaque Score pour améliorer la lisibilité sur un fond vidéo. Pensez à envoyer la forme en arrière-plan (clic droit > Arrière-plan).

### Nom d'équipe

Affiche le nom de l'équipe (code NOC ou nom personnalisé) accompagné par défaut du drapeau du pays.

**Comment l'utiliser :**
1. Ajoutez un élément **Nom d'équipe** depuis la bibliothèque
2. Cliquez dessus > dans **Côté**, choisissez **Gauche** (Équipe 1) ou **Droite** (Équipe 2)
3. Le drapeau est affiché par défaut. Décochez **"Afficher le drapeau"** si vous ne voulez que le texte
4. Optionnel : ajustez la **Taille de police** (0 = valeur globale)

**Pour afficher les deux équipes :** ajoutez deux éléments Nom d'équipe. Le premier est sur Gauche par défaut ; cliquez sur le second et passez-le en **Droite**.

**Attention :** si vous avez renseigné un **Nom affiché** dans le Header, c'est ce nom qui s'affiche à la place du code NOC. Vérifiez le Header si le nom affiché ne correspond pas à ce que vous attendez.

### Drapeau

Affiche uniquement le drapeau du pays d'une équipe, sans texte.

**Comment l'utiliser :**
1. Ajoutez un élément **Drapeau** depuis la bibliothèque
2. Dans **Côté**, choisissez **Gauche** ou **Droite**
3. Le drapeau s'adapte automatiquement à la taille de l'élément

**Quand l'utiliser plutôt que Nom d'équipe ?** Lorsque vous voulez séparer le drapeau du texte pour les positionner indépendamment. L'élément Nom d'équipe affiche le nom ET le drapeau ensemble ; l'élément Drapeau vous donne un contrôle total sur le placement du drapeau seul.

### Horloge

Affiche le temps du match (configuré dans l'onglet Match ou piloté via l'opérateur live).

**Options dans le panneau Propriétés :**
- **Afficher la période** : ajoute l'indicateur de période sous le temps
- **Afficher le cadre** : entoure l'horloge d'un cadre visuel
- **Taille de police** : 0 = valeur globale

**Astuce :** pour un affichage compact (lower third), décochez "Afficher la période" et utilisez un élément Période séparé, positionné là où vous le souhaitez.

### Période

Affiche la période en cours (ex : "1st", "2nd", "OT").

**Options :** Taille de police (0 = valeur globale).

**Astuce :** combinez un élément Période avec un Bloc de texte ("Période :") pour un affichage plus explicite.

### Temps morts

Affiche les indicateurs de temps morts des deux équipes (points colorés), côte à côte.

L'élément utilise directement les données configurées dans l'onglet **Match > Temps morts**. Aucune configuration supplémentaire n'est nécessaire.

### Tirs au but

Affiche les tentatives de tirs au but des deux équipes (cercles vert/rouge/gris), côte à côte.

L'élément utilise les données de l'onglet **Match > Tirs au but**. Aucune configuration supplémentaire n'est nécessaire.

### Score par période

Affiche un tableau des scores par période (P1, P2, P3, OT...) pour les deux équipes.

**Options dans le panneau Propriétés :**
- **Périodes** : liste des périodes avec le label (ex : "P1", "P2") et les scores gauche/droite pour chaque période
- **Taille de police** : taille du texte
- **Couleur d'en-tête** : couleur des labels de périodes
- **Couleur du texte** : couleur des scores

**Astuce :** placez cet élément sous le header principal pour montrer l'évolution du score au fil des périodes.

---

## Éléments de texte et données

### Bloc de texte

Affiche un texte libre que vous saisissez vous-même. C'est l'élément le plus polyvalent pour ajouter des titres, légendes ou annotations.

**Options dans le panneau Propriétés :**
- **Contenu** : le texte à afficher
- **Taille de police** : taille en pixels
- **Épaisseur** : Normal, Medium, Semi-bold, Bold
- **Police** : police de caractères (ou "Police globale" pour hériter)
- **Alignement** : Gauche, Centre, Droite
- **Casse** : Aucune, MAJUSCULES, minuscules
- **Espacement** : espacement entre les lettres

**Astuce :** double-cliquez sur un bloc de texte dans le canvas pour modifier son contenu directement, sans passer par le panneau Propriétés.

**Attention :** le contenu du bloc de texte n'est PAS lié aux données du match. Si vous voulez afficher un score ou un nom d'équipe qui se met à jour automatiquement, utilisez les éléments Score ou Nom d'équipe.

### Ligne de stat

Affiche une ligne de statistiques sous la forme : valeur gauche + libellé + valeur droite.

**Options :** **Ligne de stat** (index) : sélectionnez quelle ligne afficher (0 = première, 1 = deuxième, etc.). Les statistiques se configurent dans les modes body types 1 à 3 de l'onglet Contenu.

**Astuce :** empilez plusieurs Lignes de stat verticalement avec un espacement régulier (grille à 50 px) pour créer un tableau de statistiques propre.

### Barre comparative

Affiche une barre de comparaison visuelle entre deux valeurs (gauche vs droite). Idéale pour représenter des pourcentages ou des ratios.

**Options :** **Barre** (index) : sélectionnez quelle barre afficher.

**Astuce :** combinez une Ligne de stat (pour les chiffres) avec une Barre comparative (pour le visuel) sur la même statistique. Placez la barre juste en dessous de la ligne pour un rendu riche.

---

## Éléments joueurs

### Photo joueur

Affiche la photo d'un joueur.

**Options :**
- **Clé photo** : identifiant de la photo (configuré dans l'onglet Médias > Photos)
- **Forme** : Cercle ou Carré

**Attention :** la photo doit d'abord être importée dans l'onglet **Médias > Photos** avant de pouvoir être référencée ici.

### Joueur (ligne)

Affiche une ligne individuelle avec le numéro, le nom et la position d'un joueur.

**Options dans le panneau Propriétés :**
- **Nom** : nom du joueur
- **Numéro** : numéro du maillot
- **Position** : poste (ex : C, LW, RW, D, G)
- **Afficher le numéro** : afficher ou masquer le numéro
- **Afficher la position** : afficher ou masquer la position
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur d'affichage

**Astuce :** empilez plusieurs lignes joueur verticalement pour constituer un roster complet. Pour un regroupement automatique, utilisez plutôt l'élément Liste de joueurs.

### Liste de joueurs

Affiche un groupe de joueurs avec un titre (ex : "Attaquants", "Défenseurs", "Gardiens").

**Options dans le panneau Propriétés :**
- **Titre** : intitulé du groupe (ex : "Première ligne")
- **Joueurs** : liste de joueurs (numéro, nom, position pour chacun)
- **Afficher les numéros** : afficher ou masquer les numéros
- **Afficher les positions** : afficher ou masquer les positions
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur des joueurs
- **Couleur du titre** : couleur du titre du groupe

**Astuce :** utilisez plusieurs éléments Liste de joueurs pour séparer les lignes d'attaque, de défense et les gardiens.

### Fiche joueur

Affiche une fiche complète d'un joueur : photo, nom, équipe et statistiques.

**Options dans le panneau Propriétés :**
- **Titre** : titre de la fiche (ex : "Joueur du match")
- **Sous-titre** : sous-titre optionnel
- **Nom** : nom du joueur
- **Numéro** : numéro du maillot
- **Équipe** : nom de l'équipe
- **Photo** : photo du joueur
- **Statistiques** : liste de paires label/valeur (ex : "Buts" / "12", "Assists" / "31")
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur principale
- **Couleur du titre** : couleur du titre

**Astuce :** la fiche joueur est un élément autonome qui combine plusieurs informations. Pour une mise en page plus libre, utilisez séparément les éléments Photo joueur, Bloc de texte et Ligne joueur.

---

## Éléments de but

### Buteur

Affiche le nom, le numéro et optionnellement la photo du buteur.

**Options dans le panneau Propriétés :**
- **Nom** : nom du buteur
- **Numéro** : numéro du maillot
- **Photo** : photo du joueur (optionnelle)
- **Afficher le numéro** : afficher ou masquer le numéro
- **Afficher la photo** : afficher ou masquer la photo
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur d'affichage

**Astuce :** combinez Buteur + Assistants + Détails du but pour composer un affichage de célébration de but complet et personnalisé.

### Assistants

Affiche les noms et numéros des 1 ou 2 assistants du but.

**Options dans le panneau Propriétés :**
- **Assistant 1** : nom et numéro du premier assistant
- **Assistant 2** : nom et numéro du second assistant (optionnel)
- **Afficher les numéros** : afficher ou masquer les numéros
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur d'affichage

### Détails du but

Affiche le temps, la période et les compteurs de buts.

**Options dans le panneau Propriétés :**
- **Temps** : moment du but (ex : "12:34")
- **Période** : période du but (ex : "2e")
- **Décompte match** : numéro du but dans le match (ex : "3e but")
- **Décompte tournoi** : numéro du but dans le tournoi
- **Afficher la période** : afficher ou masquer la période
- **Afficher les décomptes** : afficher ou masquer les compteurs
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur d'affichage

---

## Éléments d'équipe

### Membre du staff

Affiche le rôle et le nom d'un membre du staff technique.

**Options dans le panneau Propriétés :**
- **Rôle** : fonction (ex : "Entraîneur-chef", "Assistant")
- **Nom** : nom de la personne
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur d'affichage

### Liste du staff

Affiche un groupe de membres du staff avec un titre.

**Options dans le panneau Propriétés :**
- **Titre** : intitulé du groupe (ex : "Staff technique")
- **Membres** : liste de paires rôle/nom
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur des membres
- **Couleur du titre** : couleur du titre

---

## Tableau

### Tableau de données

Affiche un tableau configurable avec colonnes et lignes libres. Idéal pour les classements, statistiques tabulaires ou toute donnée structurée.

**Options dans le panneau Propriétés :**
- **Titre** : titre du tableau
- **Colonnes** : liste de colonnes (label, alignement gauche/centre/droite)
- **Lignes** : valeurs par colonne, avec option de surlignage par ligne
- **Afficher l'en-tête** : afficher ou masquer la ligne d'en-tête
- **Taille de police** : taille du texte
- **Couleur d'en-tête** : couleur de la ligne d'en-tête
- **Couleur du texte** : couleur du contenu

**Astuce :** utilisez le surlignage de ligne pour mettre en évidence l'équipe locale ou le leader du classement.

---

## Événements et calendrier

### Événement

Affiche un événement unique du match (but, pénalité, temps mort, changement de période).

**Options dans le panneau Propriétés :**
- **Période** : période de l'événement
- **Temps** : moment de l'événement (ex : "15:23")
- **Type** : nature de l'événement (but, pénalité, temps mort, période)
- **Description** : détail de l'événement (ex : "But en supériorité numérique")
- **Équipe** : équipe concernée
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur d'affichage

### Chronologie

Affiche une liste chronologique de tous les événements du match.

**Options dans le panneau Propriétés :**
- **Titre** : intitulé (ex : "Événements du match")
- **Événements** : liste d'événements (période, temps, type, description, équipe)
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur des événements
- **Couleur du titre** : couleur du titre

**Astuce :** la chronologie est idéale pour les écrans de résumé de période ou de fin de match.

### Match

Affiche les informations d'un match unique : date, heure, équipes, score et statut.

**Options dans le panneau Propriétés :**
- **Date** : date du match
- **Heure** : heure de début
- **Équipe gauche / Équipe droite** : noms des équipes
- **Score gauche / Score droite** : scores
- **Statut** : à venir, en cours ou terminé
- **Lieu** : lieu du match
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur d'affichage

### Programme

Affiche une liste de matchs à venir ou terminés.

**Options dans le panneau Propriétés :**
- **Titre** : intitulé (ex : "Programme de la journée")
- **Matchs** : liste de matchs (date, heure, équipes, scores, statut, lieu)
- **Taille de police** : taille du texte
- **Couleur du texte** : couleur des matchs
- **Couleur du titre** : couleur du titre

**Astuce :** utilisez le Programme pour les écrans d'avant-match ou les tableaux de résultats de la journée.

---

## Éléments médias

### Image

Affiche une image externe (URL ou fichier local). Utile pour incruster un logo de ligue, un sponsor ou un arrière-plan personnalisé.

**Options :**
- **Source image** : URL de l'image ou bouton Parcourir pour charger un fichier
- **Ajustement** : Couvrir (remplit sans déformer), Contenir (affiche en entier), Étirer (remplit en déformant)

**Astuce :** utilisez le mode "Contenir" pour un logo (il restera entier) et "Couvrir" pour un arrière-plan (il remplira la zone sans bandes noires).

### Forme

Affiche une forme géométrique colorée : rectangle, cercle ou rectangle arrondi.

**Options :**
- **Forme** : Rectangle, Cercle, Rectangle arrondi
- **Couleur de remplissage** + opacité
- **Bordure** : couleur, épaisseur, rayon

**Astuce :** les formes sont les briques de base pour construire vos arrière-plans. Créez un rectangle sombre semi-transparent derrière vos scores pour qu'ils soient lisibles sur n'importe quel fond vidéo. N'oubliez pas de l'envoyer en arrière-plan (clic droit > Arrière-plan).

### Séparateur

Affiche une ligne de séparation, idéale pour délimiter visuellement des zones du canvas.

**Options :**
- **Orientation** : Horizontale ou Verticale
- **Épaisseur** : en pixels
- **Couleur** + opacité

**Astuce :** un séparateur vertical fin (2 px, blanc, opacité 50%) entre les deux scores donne un rendu soigné.

---

## Éléments composés

### Header complet

Affiche un bloc complet contenant automatiquement : drapeaux/logos, noms d'équipes, scores, temps morts et tirs au but. C'est l'équivalent du header des modes classiques (1 à 13), mais que vous pouvez repositionner et redimensionner librement.

**Options :** **Afficher l'horloge** (cocher pour inclure le temps dans le header).

**Astuce :** c'est le moyen le plus rapide de démarrer. Ajoutez un Header complet en haut du canvas et vous avez un scoreboard fonctionnel en quelques secondes. Ajoutez ensuite d'autres éléments en dessous pour enrichir l'affichage.

### Colonne de pénalités

Affiche la liste des pénalités d'une équipe.

**Options :** **Côté** : Gauche (Équipe 1) ou Droite (Équipe 2).

**Astuce :** ajoutez deux Colonnes de pénalités (une par côté) de part et d'autre du canvas pour un affichage symétrique complet.

### Types d'affichage embarqués

Les 15 types d'affichage classiques (Stats centrées, Stats gauche/droite, Fiche joueur, Classement, Arbitres, Spectateurs, etc.) peuvent être ajoutés comme éléments dans le canvas du Layout libre. Cela permet de combiner plusieurs types sur un même écran.

**Types disponibles :** Stats centrées (2), Stats gauche/droite (3), Détails du but (4), Fiche joueur (5), Classement (6), Score final (7), Texte libre (8), Face à face (9), Chronologie (10), Barres comparatives (11), Effectif (12), Programme (13), Header complet (14), Arbitres (15), Spectateurs (16).

**Exemple concret :** placez un Header complet en haut, un Classement au centre et une Fiche joueur en bas pour créer un écran de pause publicitaire complet. Vous pouvez aussi intégrer un bloc Arbitres ou Spectateurs pour enrichir vos pages d'information. Consultez le chapitre [Tutoriels pas à pas](03c-layout-tutoriels.md) pour des guides détaillés.

### Arbitres (type 15)

Bloc embarqué présentant les officiels du match avec drapeaux de nationalité, codes NOC et rôles. Les données affichées sont celles configurées dans l'onglet [Body types > Arbitres](04-body-types.md#type-15--arbitres).

**Options :** **Preset d'affichage** (tous, un par un, colonnes par rôle, lignes par rôle, libre), **Drapeaux** (afficher/masquer), **Codes NOC** (afficher/masquer), **Rôles** (afficher/masquer).

**Astuce :** combinez un Header complet en haut avec un bloc Arbitres en dessous pour créer un écran de présentation des officiels avant le match. Ajustez le preset selon l'espace disponible : « Colonnes par rôle » pour un affichage large, « Un par un » pour un bandeau compact.

### Spectateurs (type 16)

Bloc embarqué affichant le nombre de spectateurs présents, avec lieu et capacité optionnels. Les données affichées sont celles configurées dans l'onglet [Body types > Spectateurs](04-body-types.md#type-16--spectateurs).

**Options :** **Preset d'affichage** (centré, bannière, compact, détaillé, libre), **Label personnalisé** (texte affiché autour du nombre), **Lieu** (nom de l'arène), **Capacité** (capacité maximale).

**Astuce :** le preset « Bannière » est idéal pour intégrer l'affluence dans un layout existant sans occuper trop de place. Combinez avec un Header complet et un bloc Classement pour un écran d'information complet pendant les pauses.

---

## Organiser les couches

Cliquez sur la troisième icône du rail (**Calques**) pour accéder à la liste des couches. Tous les éléments du canvas y sont listés :

- Chaque élément affiche son nom et une icône correspondant à son type
- Cliquez sur un élément de la liste pour le sélectionner dans le canvas
- Utilisez les boutons de z-index dans le panneau Propriétés pour réorganiser l'ordre d'affichage :
  - **Premier plan** : place l'élément au-dessus de tous les autres
  - **Avancer** : monte l'élément d'un niveau
  - **Reculer** : descend l'élément d'un niveau
  - **Arrière-plan** : place l'élément derrière tous les autres

**Contrôles supplémentaires dans la liste des calques :**

| Contrôle | Action |
|----------|--------|
| **Clic sur le nom** | Sélectionne l'élément dans le canvas |
| **Double-clic sur le nom** | Renomme l'élément directement dans la liste |
| **Icône oeil** | Bascule la visibilité (masquer/afficher) |
| **Icône cadenas** | Bascule le verrouillage (empêche déplacement et redimensionnement) |
| **Icône poubelle** | Supprime l'élément |
| **Ctrl+Clic** | Ajoute/retire l'élément de la multi-sélection |

**Attention :** l'ordre des couches est important. Un élément au premier plan masque ceux qui sont derrière. Si un élément semble avoir disparu, vérifiez qu'il n'est pas caché derrière un autre (sélectionnez-le dans la liste des calques pour le retrouver).

---

## Presets (sauvegarder et charger des mises en page)

Cliquez sur la quatrième icône du rail (**Presets**) pour accéder aux presets. Cette section permet de sauvegarder et réutiliser vos constructions.

### Sauvegarder un preset

Deux options de sauvegarde sont disponibles :

| Bouton | Action | Condition |
|--------|--------|-----------|
| **Sauvegarder le champ** | Enregistre la configuration d'un seul élément (position, dimensions, style). Si d'autres éléments sont visuellement contenus dans l'élément sélectionné, ils sont automatiquement inclus. | Grisé si aucun élément n'est sélectionné |
| **Sauvegarder l'écran** | Enregistre l'ensemble des éléments du canvas (positions, styles, données, options du canvas) | Grisé si le canvas est vide |

Une modale s'ouvre pour choisir le type de preset et saisir un nom descriptif.

### Charger un preset

Le bouton **Charger un preset** ouvre une modale listant tous les presets sauvegardés, séparés en deux sections (champs individuels et écrans complets).

Deux modes de chargement :

| Mode | Comportement |
|------|-------------|
| **Remplacer** | Le layout actuel est entièrement remplacé par le contenu du preset |
| **Ajouter** | Les éléments du preset sont ajoutés au layout existant (dans la limite de 50 éléments au total) |

### Gestion des presets

| Action | Description |
|--------|-------------|
| **Exporter** | Télécharge le preset au format `.preset.json` pour le partager |
| **Importer** | Charge un fichier `.preset.json` exporté par un autre utilisateur |
| **Supprimer** | Supprime définitivement un preset de la bibliothèque |

**Astuce :** sauvegardez vos mises en page réussies comme presets d'écran. Vous pourrez les recharger instantanément pour vos prochains matchs et n'aurez qu'à mettre à jour les équipes et les scores.

Pour des exemples concrets de création de pages complètes, consultez le chapitre suivant : [Tutoriels pas à pas](03c-layout-tutoriels.md).
