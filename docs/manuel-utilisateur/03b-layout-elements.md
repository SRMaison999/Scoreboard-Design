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

**Éléments de texte et données**
- [Bloc de texte](#bloc-de-texte)
- [Ligne de stat](#ligne-de-stat)
- [Barre comparative](#barre-comparative)

**Éléments joueurs et médias**
- [Photo joueur](#photo-joueur)
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

## Éléments joueurs et médias

### Photo joueur

Affiche la photo d'un joueur.

**Options :**
- **Clé photo** : identifiant de la photo (configuré dans l'onglet Médias > Photos)
- **Forme** : Cercle ou Carré

**Attention :** la photo doit d'abord être importée dans l'onglet **Médias > Photos** avant de pouvoir être référencée ici.

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

**Astuce :** un séparateur vertical fin (2 px, blanc, opacité 50%) entre les deux scores donne un rendu broadcast professionnel.

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

Les 13 types d'affichage classiques (Stats centrées, Stats gauche/droite, Fiche joueur, Classement, etc.) peuvent être ajoutés comme éléments dans le canvas du Layout libre. Cela permet de combiner plusieurs types sur un même écran.

**Exemple concret :** placez un Header complet en haut, un Classement au centre et une Fiche joueur en bas pour créer un écran de pause publicitaire complet. Consultez le chapitre [Tutoriels pas à pas](03c-layout-tutoriels.md) pour des guides détaillés.

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
