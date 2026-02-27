# Manuel utilisateur - Layout libre

Le Layout libre est le mode principal de l'application et le type d'affichage par défaut au lancement. Il offre un canvas entièrement vierge sur lequel l'utilisateur compose son scoreboard en plaçant, déplaçant et redimensionnant librement des éléments visuels. Avec plus de 43 éléments disponibles dans 11 catégories, un système de couches, des guides d'alignement, un historique undo/redo de 50 niveaux et des presets réutilisables, le Layout libre permet de créer n'importe quel design de scoreboard imaginable.

**Cas d'utilisation :**
- Concevoir un affichage sur mesure qui ne correspond à aucun des 13 types à agencement fixe
- Assembler des éléments de différentes natures sur un même écran (score + statistiques + photos)
- Créer des mises en page originales avec un contrôle total sur la position de chaque élément
- Prototyper rapidement différents designs de scoreboard grâce aux presets

---

## Concept général

Contrairement aux types à agencement fixe (types 2 à 14, voir chapitre 4) où la disposition des éléments est prédéterminée, le Layout libre offre un canvas vierge de 1920x1080 pixels (par défaut, configurable). L'utilisateur y dépose des éléments depuis une bibliothèque, puis les positionne librement par glisser-déposer et les redimensionne via 8 poignées (4 coins + 4 bords). Chaque élément possède ses propres propriétés de style, de position, de taille et de rotation.

---

## Mode pleine page

Quand activé, le header du scoreboard (drapeaux, noms d'équipes, scores, horloge) est masqué. Le canvas entier (1920x1080 par défaut) est alors disponible pour les champs personnalisés. Ce mode est indispensable pour créer un scoreboard complètement personnalisé, en plaçant chaque élément exactement où on le souhaite.

**Activation :** case à cocher "Mode pleine page" dans la section principale du panneau éditeur, visible uniquement en mode Layout libre.

**Quand l'utiliser :**
- Pour créer un scoreboard entièrement personnalisé sans le header standard
- Pour concevoir un bandeau inférieur (lower third) sans éléments en haut de l'écran
- Pour créer un écran plein d'informations (classements, statistiques complètes)
- Pour intégrer un header personnalisé via l'élément "Header complet" (catégorie Composés) que l'on peut repositionner librement

---

## Bibliothèque d'éléments

La bibliothèque propose plus de 43 éléments répartis en 11 catégories :

| Catégorie | Éléments disponibles | Description |
|-----------|---------------------|-------------|
| **Match** | Score, Horloge, Période, Nom d'équipe, Drapeau, Temps morts, Tirs au but, Score par période | Éléments liés aux données du match en cours. Le score par période affiche un tableau P1/P2/P3/OT avec les scores de chaque équipe. |
| **Texte** | Bloc de texte | Zone de texte libre avec contenu, taille, graisse, alignement et casse configurables. |
| **Données** | Ligne de stat, Barre comparative | Éléments de visualisation statistique. |
| **Joueurs** | Photo joueur, Ligne joueur, Liste de joueurs, Fiche joueur | Photo circulaire, ligne individuelle (nom, numéro, position), liste complète de joueurs, ou fiche joueur complète avec photo, nom, équipe et statistiques. |
| **But** | Buteur, Assistants, Détails du but | Éléments atomiques pour composer des affichages de célébration de but : buteur avec photo, 1 ou 2 assistants, temps et période du but. |
| **Équipe** | Membre du staff, Liste du staff | Ligne individuelle ou liste complète de membres du staff (rôle + nom). |
| **Tableau** | Tableau de données | Tableau configurable avec colonnes, lignes, en-têtes et surlignage. Idéal pour classements, statistiques tabulaires. |
| **Événement** | Événement, Chronologie | Événement unique (but, pénalité, temps mort, changement de période) ou chronologie complète avec liste d'événements triés. |
| **Calendrier** | Match, Programme | Match unique (date, heure, équipes, score, statut) ou programme complet avec liste de matchs à venir et terminés. |
| **Médias** | Image, Forme (rectangle, cercle, arrondi), Séparateur (ligne) | Éléments décoratifs et structurels pour habiller le scoreboard. |
| **Composés** | Header complet, Colonne de pénalités, Types 2-14 intégrés | Blocs complets réutilisant les layouts à agencement fixe comme éléments individuels. |

Un **champ de recherche** en haut de la bibliothèque permet de filtrer les éléments par nom. Cliquer sur un élément l'ajoute immédiatement au canvas avec des dimensions par défaut.

### Dimensions par défaut des éléments

Chaque élément possède des dimensions par défaut et des dimensions minimales. Les dimensions par défaut sont appliquées automatiquement lors de l'ajout au canvas :

| Élément | Dimensions par défaut | Dimensions minimales |
|---------|----------------------|---------------------|
| Score | 180 x 120 px | 60 x 50 px |
| Horloge | 340 x 120 px | 100 x 50 px |
| Période | 250 x 60 px | 80 x 40 px |
| Nom d'équipe | 600 x 160 px | 80 x 40 px |
| Drapeau | 120 x 80 px | 50 x 40 px |
| Temps morts | 280 x 60 px | 80 x 40 px |
| Tirs au but | 400 x 60 px | 120 x 40 px |
| Score par période | 500 x 60 px | 250 x 40 px |
| Bloc de texte | 400 x 80 px | 80 x 40 px |
| Ligne de stat | 500 x 60 px | 200 x 40 px |
| Barre comparative | 500 x 80 px | 200 x 40 px |
| Photo joueur | 150 x 150 px | 60 x 60 px |
| Ligne joueur | 400 x 50 px | 150 x 40 px |
| Liste de joueurs | 450 x 250 px | 200 x 100 px |
| Fiche joueur | 500 x 450 px | 250 x 200 px |
| Buteur | 400 x 120 px | 200 x 60 px |
| Assistants | 400 x 80 px | 200 x 50 px |
| Détails du but | 300 x 80 px | 150 x 50 px |
| Membre du staff | 350 x 50 px | 150 x 40 px |
| Liste du staff | 400 x 200 px | 200 x 100 px |
| Tableau de données | 600 x 300 px | 300 x 120 px |
| Événement | 500 x 50 px | 250 x 40 px |
| Chronologie | 600 x 300 px | 300 x 120 px |
| Match | 550 x 50 px | 300 x 40 px |
| Programme | 650 x 300 px | 350 x 120 px |
| Image | 300 x 200 px | 60 x 60 px |
| Forme | 200 x 200 px | 40 x 40 px |
| Séparateur | 400 x 4 px | 40 x 4 px |
| Header complet | 1920 x 200 px | 400 x 100 px |
| Colonne de pénalités | 200 x 600 px | 100 x 200 px |
| Types 2-14 intégrés | 1200 x 600 px | 400 x 200 px |

---

## Interaction sur le canvas

### Sélection
- **Cliquer** sur un champ pour le sélectionner (bordure bleue avec poignées).
- **Ctrl+Clic** sur un autre champ pour l'ajouter à la sélection (multi-sélection).
- **Cliquer sur le fond** du canvas pour désélectionner.
- **Sélection de zone** : cliquer et glisser sur le fond du canvas pour dessiner un rectangle de sélection. Tous les champs inclus dans la zone sont sélectionnés.
- Le champ sélectionné affiche **8 poignées de redimensionnement** (4 coins + 4 bords) et une **poignée de rotation** au-dessus.

### Déplacement
- **Glisser-déposer** un champ sélectionné pour le repositionner.
- En multi-sélection, le déplacement s'applique à tous les champs sélectionnés.
- Le déplacement tient compte du facteur de zoom du canvas (compensation automatique).
- Si l'aimantation à la grille est activée, le champ s'aligne sur les intersections.
- Les **smart guides** apparaissent automatiquement en rose pendant le déplacement pour indiquer l'alignement avec d'autres champs (bords, centres) ou le canvas.

### Redimensionnement
- **Tirer** l'une des **8 poignées** (coins et bords) du champ sélectionné.
- **Shift** maintenu pendant le redimensionnement : conserve les proportions.
- **Alt** maintenu pendant le redimensionnement : redimensionne depuis le centre.
- Le redimensionnement est proportionnel : la taille de police du champ s'ajuste automatiquement en fonction du ratio de redimensionnement.
- La compensation de scale du canvas est appliquée automatiquement.

### Rotation
- Le champ sélectionné affiche une **poignée de rotation** (cercle) au-dessus, reliée par une ligne.
- **Tirer** la poignée de rotation pour faire pivoter le champ.
- La rotation s'effectue par incréments de **15 degrés** avec magnétisme automatique.
- L'angle de rotation est affiché dans les propriétés du champ (valeur de -360 à +360 degrés).

### Édition de texte inline
- **Double-cliquer** sur un bloc de texte pour passer en mode édition directe.
- Le texte peut être modifié directement sur le canvas, sans passer par le panneau de propriétés.
- **Entrée** pour valider, **Échap** pour annuler.

### Drag-and-drop depuis la bibliothèque
- Les éléments de la bibliothèque peuvent être **glissés-déposés** directement sur le canvas.
- Un indicateur visuel (zone de dépôt) apparaît pendant le survol du canvas.
- Le champ est créé à la position exacte du dépôt.

### Verrouillage
- Un champ verrouillé (icône cadenas dans la liste des couches) ne peut être ni déplacé ni redimensionné.
- Le curseur affiche une icône "interdit" au survol d'un champ verrouillé.
- Le verrouillage protège les éléments déjà positionnés contre les modifications accidentelles.

---

## Menu contextuel (clic droit)

Un clic droit sur le canvas ouvre un menu contextuel avec les actions suivantes :

| Action | Raccourci | Description |
|--------|-----------|-------------|
| Couper | Ctrl+X | Copie et supprime le(s) champ(s) sélectionné(s) |
| Copier | Ctrl+C | Copie le(s) champ(s) sélectionné(s) dans le presse-papiers |
| Coller | Ctrl+V | Colle le contenu du presse-papiers avec un léger décalage |
| Dupliquer | Ctrl+D | Crée une copie immédiate avec décalage |
| Supprimer | Suppr | Supprime le(s) champ(s) sélectionné(s) |
| Verrouiller/Déverrouiller | - | Bascule le verrouillage du champ |
| Masquer/Afficher | - | Bascule la visibilité du champ |
| Premier plan | - | Place le champ au-dessus de tous les autres |
| Arrière-plan | - | Place le champ derrière tous les autres |
| Tout sélectionner | Ctrl+A | Sélectionne tous les champs du canvas |
| Afficher/Masquer la grille | - | Bascule l'affichage de la grille |

---

## Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Suppr` / `Delete` | Supprime le(s) champ(s) sélectionné(s) |
| `Ctrl+D` | Duplique le(s) champ(s) sélectionné(s) |
| `Ctrl+C` | Copier la sélection |
| `Ctrl+X` | Couper la sélection |
| `Ctrl+V` | Coller depuis le presse-papiers |
| `Ctrl+A` | Tout sélectionner |
| `Échap` | Désélectionner |
| Flèches | Déplacer de 1 px (ou taille de grille si activée) |
| `Shift+Flèches` | Déplacer de 10 px |
| `Ctrl+Z` | Annuler la dernière action |
| `Ctrl+Y` | Rétablir l'action annulée |
| `Ctrl+0` | Ajuster le zoom au canvas |
| `Ctrl+1` | Zoom à 100% |
| `Ctrl+=` | Zoom avant |
| `Ctrl+-` | Zoom arrière |

Une modale d'aide affiche tous les raccourcis clavier organisés par section (accessible depuis l'interface).

---

## Multi-sélection et opérations groupées

Quand plusieurs champs sont sélectionnés (via Ctrl+Clic ou sélection de zone), une **barre d'outils multi-sélection** apparaît dans le panneau latéral avec :

### Alignement (6 boutons)
- Aligner les bords gauches / Centrer horizontalement / Aligner les bords droits
- Aligner les bords supérieurs / Centrer verticalement / Aligner les bords inférieurs

### Distribution (pour 3+ champs sélectionnés)
- Distribuer horizontalement (espacement égal entre les champs)
- Distribuer verticalement (espacement égal entre les champs)

### Actions groupées
- Supprimer tous les champs sélectionnés
- Dupliquer tous les champs sélectionnés

---

## Zoom et panoramique

Le canvas supporte le zoom et le panoramique pour travailler sur des détails :

| Contrôle | Action |
|----------|--------|
| `Ctrl+Molette` | Zoom avant/arrière |
| `Ctrl+0` | Ajuster au canvas (zoom pour tout voir) |
| `Ctrl+1` | Zoom 100% (taille réelle) |
| `Ctrl+=` | Zoom avant |
| `Ctrl+-` | Zoom arrière |
| Barre de zoom | Sélection directe du niveau de zoom |

Des **règles pixel** apparaissent le long des bords supérieur et gauche du canvas, avec des graduations adaptées au niveau de zoom. Un **indicateur de coordonnées** en bas à droite du canvas affiche en permanence la position du curseur en pixels (x, y).

---

## Effets visuels

Chaque champ peut avoir des effets visuels configurables dans le panneau de propriétés. Ces effets se combinent entre eux pour créer des rendus professionnels.

### Opacité globale

L'opacité contrôle la transparence de l'ensemble du champ (contenu + fond + bordure).

| Paramètre | Plage | Défaut | Description |
|-----------|-------|--------|-------------|
| **Opacité** | 0 - 100 % | 100 % | 0 % = totalement invisible, 100 % = totalement opaque |

**Cas d'utilisation :** créer des fonds semi-transparents, des superpositions subtiles, des éléments en filigrane.

### Ombre portée (drop shadow)

L'ombre portée ajoute une ombre projetée derrière le champ, donnant un effet de profondeur et de relief.

| Paramètre | Plage | Défaut | Description |
|-----------|-------|--------|-------------|
| **Décalage X** | -50 à +50 px | 4 px | Décalage horizontal de l'ombre. Positif = vers la droite, négatif = vers la gauche. |
| **Décalage Y** | -50 à +50 px | 4 px | Décalage vertical de l'ombre. Positif = vers le bas, négatif = vers le haut. |
| **Flou** | 0 - 100 px | 10 px | Intensité du flou. 0 = ombre nette, 100 = ombre très diffuse. |
| **Couleur** | Sélecteur de couleur | Noir (#000000) | Couleur de l'ombre. |
| **Opacité** | 0 - 100 % | 50 % | Transparence de l'ombre seule. |

**Astuce :** pour une ombre subtile et réaliste, utiliser un flou de 8-15 px, un décalage de 2-4 px et une opacité de 30-50 %. Pour un effet dramatique, augmenter le flou à 20-40 px et le décalage à 8-12 px.

### Flou d'arrière-plan (backdrop blur)

Le flou d'arrière-plan applique un effet de flou gaussien sur tout ce qui se trouve derrière le champ (autres éléments, fond du canvas). Le champ lui-même reste net.

| Paramètre | Plage | Défaut | Description |
|-----------|-------|--------|-------------|
| **Flou d'arrière-plan** | 0 - 30 px | 0 px | Intensité du flou. 0 = aucun effet, 30 = flou maximal. |

**Cas d'utilisation :** créer un effet "verre dépoli" (glassmorphism) sur un fond coloré semi-transparent. Combiner avec une couleur de fond à faible opacité (10-30 %) et un flou de 8-15 px pour un rendu moderne et élégant.

---

## Éléments médias en détail

### Image

L'élément Image permet d'intégrer une image personnalisée sur le canvas (logo, photo, illustration, fond graphique).

**Sélection d'image :** un bouton "Choisir une image" dans le panneau de propriétés ouvre le dialogue de sélection de fichier du système. Les formats courants sont acceptés (PNG, JPG, SVG, WebP). L'image sélectionnée s'affiche en aperçu miniature dans le panneau.

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Source** | Sélecteur de fichier | Chemin ou données de l'image |
| **Ajustement** | Couvrir / Contenir / Étirer | Mode de remplissage dans le cadre du champ |

**Modes d'ajustement :**

| Mode | Comportement | Quand l'utiliser |
|------|-------------|-----------------|
| **Couvrir** (cover) | L'image remplit tout le champ en conservant ses proportions. Les parties qui dépassent sont rognées. | Photos de joueurs, fonds graphiques, images décoratives |
| **Contenir** (contain) | L'image entière est visible dans le champ, en conservant ses proportions. Des marges (letterbox) peuvent apparaître. | Logos, images dont aucune partie ne doit être coupée |
| **Étirer** (fill) | L'image est déformée pour remplir exactement le champ, sans conserver ses proportions. | Fonds unis, dégradés, cas rares où la déformation est acceptable |

### Forme

L'élément Forme crée des formes géométriques simples, utiles comme arrière-plans, cadres décoratifs ou séparateurs visuels.

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Type de forme** | Rectangle / Cercle / Rectangle arrondi | Géométrie de la forme |
| **Couleur de remplissage** | Sélecteur de couleur | Couleur intérieure de la forme |
| **Opacité du remplissage** | 0 - 100 % | Transparence du remplissage |
| **Couleur de bordure** | Sélecteur de couleur | Couleur du contour |
| **Épaisseur de bordure** | 0 - 20 px | Largeur du contour |
| **Rayon de bordure** | 0 - 100 px | Arrondi des coins (rectangle arrondi uniquement) |

**Types de formes :**

| Type | Rendu | Usage typique |
|------|-------|---------------|
| **Rectangle** | Boîte aux coins droits | Fond de section, cadre, barre de couleur |
| **Cercle** | Forme parfaitement ronde (border-radius: 50 %) | Pastille, indicateur, fond de photo |
| **Rectangle arrondi** | Boîte aux coins arrondis (rayon configurable) | Fond élégant, bouton visuel, badge |

### Séparateur

L'élément Séparateur crée une ligne simple pour séparer visuellement des zones du scoreboard.

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Orientation** | Horizontale / Verticale | Direction de la ligne |
| **Épaisseur** | 1 - 20 px | Largeur de la ligne |
| **Couleur** | Sélecteur de couleur | Couleur de la ligne |
| **Opacité** | 0 - 100 % | Transparence de la ligne |

---

## Éléments composés en détail

La catégorie **Composés** propose des blocs complets qui intègrent des layouts existants comme éléments individuels repositionnables sur le canvas. C'est l'un des concepts les plus puissants du Layout libre.

### Header complet

Le Header complet reproduit le bandeau supérieur standard du scoreboard (drapeaux, noms d'équipes, scores, horloge) sous forme d'un seul élément déplaçable et redimensionnable.

| Paramètre | Description |
|-----------|-------------|
| **Afficher l'horloge** | Active ou désactive l'horloge intégrée dans le header |

**Dimensions par défaut :** 1920 x 200 px (pleine largeur). Peut être redimensionné et repositionné librement.

**Cas d'utilisation :** en mode pleine page, placer un Header complet là où on le souhaite (en haut, au milieu, en bas) tout en ajoutant d'autres éléments autour. Cela donne un contrôle total sur la position du header.

### Colonne de pénalités

La Colonne de pénalités affiche les pénalités en cours pour une équipe, sous forme de colonne verticale.

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Côté** | Gauche / Droite | Équipe dont les pénalités sont affichées |

**Dimensions par défaut :** 200 x 600 px. Idéal pour placer de part et d'autre du canvas.

### Types 2-14 intégrés

Chacun des 13 types d'affichage à agencement fixe (décrits au chapitre 4) peut être intégré comme un élément individuel dans le Layout libre. Cela permet de combiner plusieurs types sur un même écran.

| Élément composé | Type intégré | Description |
|-----------------|-------------|-------------|
| Stats centrées | Type 14 | Statistiques avec titre centré et lignes valeur/label/valeur |
| Stats gauche/droite | Type 2 | Deux titres avec comparaison statistique |
| Stats joueur | Type 3 | Leaders statistiques avec photos |
| But / Célébration | Type 4 | Annonce de but avec buteur et passeurs |
| Fiche joueur | Type 5 | Grande fiche joueur avec photo et statistiques |
| Classement | Type 6 | Tableau de classement avec colonnes |
| Score final | Type 7 | Score final grand format |
| Texte libre | Type 8 | Zone de texte multiligne |
| Face-à-face | Type 9 | Comparaison de deux joueurs |
| Chronologie | Type 10 | Liste des événements du match |
| Barres comparatives | Type 11 | Barres de progression horizontales |
| Composition d'équipe | Type 12 | Lineup avec joueurs et entraîneur |
| Calendrier | Type 13 | Programme de matchs |

**Dimensions par défaut :** 1200 x 600 px pour tous les types intégrés. Peuvent être redimensionnés librement.

**Exemple concret :** créer un écran "résumé de match" en combinant sur le même canvas un Header complet (en haut), un type 10 Chronologie (à gauche), un type 14 Stats centrées (à droite) et un type 4 But/Célébration (en bas) pour le but gagnant.

---

## Modèles hockey prédéfinis

4 modèles de layout spécialement conçus pour le hockey sur glace :

| Modèle | Description |
|--------|-------------|
| **Score simple** | Noms d'équipe, score central, horloge et période |
| **Score avec pénalités** | Score complet avec colonnes de pénalités gauche et droite |
| **Bandeau inférieur** | Barre horizontale en bas de l'écran (style lower third) |
| **Statistiques complètes** | Layout complet avec score, horloge, stats et comparaisons |

Ces modèles créent automatiquement les champs pré-positionnés sur le canvas. Ils constituent un excellent point de départ : l'utilisateur peut ensuite déplacer, redimensionner, supprimer ou ajouter des éléments pour personnaliser le design.

---

## Contrôle de la taille de police sur le canvas

Pour les éléments textuels (score, horloge, période, nom d'équipe, bloc de texte), une **barre flottante** apparaît automatiquement au-dessus du champ sélectionné. Elle affiche la taille de police actuelle et propose des contrôles directs :

| Contrôle | Action |
|----------|--------|
| Bouton **-** | Diminue la taille de 1 px. **Maintenir enfoncé** pour une répétition accélérée. |
| Bouton **+** | Augmente la taille de 1 px. **Maintenir enfoncé** pour une répétition accélérée. |
| **Clic sur la valeur** | Ouvre un champ de saisie directe. Taper la taille souhaitée (8-300), puis Entrée pour valider ou Échap pour annuler. |
| **Molette de souris** | Sur un champ sélectionné, ajuste la taille de +1 px (molette haut) ou -1 px (molette bas). |

**Indicateur visuel :** la valeur affichée apparaît en blanc si elle est propre au champ (override local), ou en gris si le champ utilise la taille globale. Cliquer sur + ou - crée automatiquement un override local.

Si le champ est trop près du bord supérieur du canvas, la barre se repositionne automatiquement en dessous du champ.

---

## Sélection de police par champ

Chaque champ texte peut avoir sa propre police de caractères, indépendante des autres champs et des 3 zones de police globales. Dans le panneau de propriétés du champ, un sélecteur de police permet de choisir parmi les 25 polices disponibles (organisées par catégorie). La police sélectionnée s'applique uniquement au champ concerné.

---

## Sélection d'images

Les champs de type Image disposent d'un **sélecteur de fichier** intégré au panneau de propriétés. Un bouton "Choisir une image" ouvre le dialogue de sélection du système. L'image sélectionnée s'affiche en aperçu miniature dans le panneau, et le champ sur le canvas affiche l'image choisie.

---

## Scaling proportionnel au redimensionnement

Quand un champ texte est redimensionné via les poignées, la taille de police s'ajuste proportionnellement. Par exemple, si un champ est élargi de 50%, la taille de police augmente de 50%. Ce comportement garantit que le texte reste visuellement cohérent après un redimensionnement.

**Taille de police visuelle :** la barre flottante au-dessus du champ affiche la taille de police **visuelle** (telle qu'elle apparaît à l'écran), pas la taille brute stockée. Si un champ a été redimensionné, la taille affichée tient compte du facteur d'échelle. Par exemple, un champ avec une police brute de 30 px agrandi à 200% de sa hauteur initiale affichera "60" dans la barre flottante. Saisir une nouvelle valeur dans la barre applique la conversion inverse automatiquement.

---

## Noms d'équipes libres

Pour les champs "Nom d'équipe", le sélecteur propose à la fois les 31 codes NOC prédéfinis (CAN, USA, SUI...) et la possibilité de saisir un nom libre. Cela permet d'utiliser des noms personnalisés pour les ligues locales, les équipes de club ou tout autre contexte hors compétitions internationales.

---

## Grille et guides

| Option | Description |
|--------|-------------|
| **Afficher les guides** | Superpose une grille en pointillés sur le canvas pour faciliter l'alignement visuel. |
| **Taille de la grille** | Configurable (8 px par défaut). Les valeurs habituelles sont 8, 16, 24 ou 32 px. |
| **Aimanter à la grille** | Les champs s'alignent automatiquement sur les intersections de la grille lors du déplacement. |

La grille et les smart guides fonctionnent simultanément (ils ne sont pas exclusifs). La grille fournit un repère visuel permanent, tandis que les smart guides apparaissent dynamiquement pendant le déplacement pour indiquer les alignements avec d'autres champs.

---

## Diagnostic d'alignement

Quand un champ est sélectionné (sans être en cours de déplacement), le système analyse automatiquement son alignement par rapport aux autres champs et aux bords du canvas. Deux types d'indicateurs visuels apparaissent :

| Indicateur | Apparence | Signification |
|------------|-----------|---------------|
| **Alignement exact** | Ligne verte continue | Le champ est parfaitement aligné (bord, centre) avec un autre champ ou le canvas |
| **Quasi-alignement** | Ligne ambrée en pointillés + badge | Le champ est presque aligné (écart de 1 à 8 pixels) |

Les quasi-alignements affichent un **badge cliquable** indiquant l'écart en pixels (ex : "3px"). Cliquer sur ce badge corrige automatiquement la position du champ pour obtenir un alignement parfait.

Le diagnostic compare 6 points d'ancrage pour chaque champ : bord gauche, centre horizontal, bord droit, bord supérieur, centre vertical et bord inférieur. Le nombre de suggestions de quasi-alignement est limité à 6 pour éviter la surcharge visuelle.

---

## Panneau de propriétés (à droite du canvas)

Quand un champ est sélectionné, un panneau de propriétés (300 px de large) apparaît à droite du canvas de preview. Cela permet de garder la bibliothèque et les couches toujours visibles à gauche, tout en disposant d'un espace confortable pour configurer les propriétés sans scroller. Un bouton **X** en haut du panneau permet de le fermer (et désélectionne le champ). Le panneau supporte aussi la multi-sélection (alignement et distribution).

Quand aucun champ n'est sélectionné, le panneau affiche un bouton **Données du match** qui permet d'accéder directement à la configuration des équipes (sélection de nation, noms affichés, scores, drapeaux). Ce bouton est également accessible via l'icône dans le header du panneau. Les champs de type Score, Nom d'équipe et Drapeau intègrent aussi un **sélecteur de nation** directement dans leurs propriétés, pour choisir l'équipe sans quitter le panneau.

Le panneau de propriétés est organisé en **sections repliables** :

### Identification
- **Nom** : label personnalisable du champ (pour le repérer dans la liste des couches)

### Alignement
- **6 boutons d'alignement** : gauche/centre/droite (horizontal) + haut/centre/bas (vertical)
- **Verrouillage des proportions** : maintient le ratio largeur/hauteur lors du redimensionnement

### Position et taille
- **X, Y** : position en pixels sur le canvas
- **Largeur, Hauteur** : dimensions en pixels
- **Ordre (Z)** : 4 boutons d'action pour gérer l'empilement (premier plan, avancer d'un cran, reculer d'un cran, arrière-plan)
- **Rotation** : angle en degrés (-360 à +360)

### Style
- **Couleur de fond** : couleur d'arrière-plan du champ
- **Opacité du fond** : transparence de l'arrière-plan (0-100)
- **Couleur de bordure** : couleur du contour
- **Épaisseur de bordure** : largeur du contour en pixels (0-20)
- **Rayon de bordure** : arrondi des coins (0-100 px)
- **Marge interne** : espace entre le bord du champ et son contenu (0-50 px)

### Effets
- **Opacité** : transparence globale (0-100 %)
- **Ombre portée** : activable, avec paramètres détaillés (voir section Effets visuels)
- **Flou d'arrière-plan** : intensité du flou (0-30 px)

### Configuration de l'élément
Paramètres spécifiques selon le type d'élément (voir section suivante).

### Actions
- **Dupliquer** : crée une copie du champ avec un léger décalage
- **Supprimer** : retire le champ du canvas

---

## Configuration détaillée par type d'élément

### Éléments Match

#### Score

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Côté** | Gauche / Droite | Équipe dont le score est affiché (gauche = équipe 1, droite = équipe 2) |
| **Sélection de la nation** | Dropdown avec toutes les nations | Permet de changer l'équipe directement depuis les propriétés |
| **Nom affiché** | Texte libre | Nom visible sur le scoreboard |
| **Score** | Numérique | Valeur du score |
| **Afficher le label** | Oui / Non | Affiche ou masque le label |
| **Taille de police** | 8 - 300 px | 0 = utilise la taille globale |
| **Famille de police** | 25 polices disponibles | Police spécifique au champ |

#### Horloge

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Afficher la période** | Oui / Non | Intègre le numéro de période dans l'affichage de l'horloge |
| **Afficher le cadre** | Oui / Non | Entoure l'horloge d'un cadre visuel |
| **Taille de police** | 8 - 300 px | 0 = utilise la taille globale |
| **Famille de police** | 25 polices disponibles | Police spécifique au champ |

#### Période

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Taille de police** | 8 - 300 px | 0 = utilise la taille globale |
| **Famille de police** | 25 polices disponibles | Police spécifique au champ |

#### Nom d'équipe

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Côté** | Gauche / Droite | Équipe affichée |
| **Sélection de la nation** | Dropdown + texte libre | Codes NOC prédéfinis ou nom personnalisé |
| **Nom affiché** | Texte libre | Nom visible (écrase le code NOC si renseigné) |
| **Score** | Numérique | Score associé |
| **Afficher le drapeau** | Oui / Non | Intègre le drapeau à côté du nom |
| **Taille de police** | 8 - 300 px | 0 = utilise la taille globale |
| **Famille de police** | 25 polices disponibles | Police spécifique au champ |

#### Drapeau

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Côté** | Gauche / Droite | Équipe dont le drapeau est affiché |
| **Sélection de la nation** | Dropdown | Permet de changer la nation |
| **Nom affiché** | Texte libre | Nom de l'équipe (pour référence) |
| **Score** | Numérique | Score (pour référence) |

#### Temps morts

Affiche les temps morts restants pour chaque équipe. Utilise les données globales du match, sans paramètres supplémentaires.

#### Tirs au but

Affiche les résultats des tirs au but. Utilise les données globales du match, sans paramètres supplémentaires.

#### Score par période

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Périodes** | Liste dynamique | Chaque période avec son label (P1, P2, P3, OT...) et les scores gauche/droite |
| **Taille de police** | 8 - 300 px | Taille du texte dans le tableau |
| **Couleur d'en-tête** | Sélecteur de couleur | Couleur de la ligne d'en-tête (labels des périodes) |
| **Couleur du texte** | Sélecteur de couleur | Couleur des scores |

### Éléments Texte

#### Bloc de texte

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Contenu** | Texte libre | Le texte affiché. Éditable aussi par double-clic sur le canvas. |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Famille de police** | 25 polices disponibles | Police de caractères |
| **Épaisseur (graisse)** | 400 - 900 | 400 = normal, 700 = gras, 900 = extra-gras |
| **Alignement** | Gauche / Centre / Droite | Alignement horizontal du texte dans le champ |
| **Casse** | Normal / Majuscules / Minuscules | Transformation automatique du texte |
| **Espacement des lettres** | 0 - 20 px | Espace entre les caractères (letter-spacing) |
| **Couleur du texte** | Sélecteur de couleur | Couleur de la police |

### Éléments Données

#### Ligne de stat

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Index de stat** | Numérique | Référence vers la ligne de statistique globale (définie dans le panneau Contenu) |

Les données de la ligne (label, valeur gauche, valeur droite) proviennent du store global. Modifier les statistiques dans le panneau Contenu met à jour automatiquement tous les éléments Ligne de stat référençant cet index.

#### Barre comparative

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Index de barre** | Numérique | Référence vers la barre de comparaison globale |

Même principe que la Ligne de stat : les données proviennent du store global.

### Éléments Joueurs

#### Photo joueur

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Clé photo** | Sélecteur | Référence vers une photo de la galerie (voir chapitre 11) ou données d'image directes |
| **Forme** | Cercle / Carré | Forme du cadre de la photo |

#### Ligne joueur

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Nom** | Texte libre | Nom du joueur |
| **Numéro** | Texte libre | Numéro de maillot |
| **Position** | Texte libre | Position (G, D, AG, C, AD) |
| **Afficher le numéro** | Oui / Non | Visibilité du numéro |
| **Afficher la position** | Oui / Non | Visibilité de la position |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur de la police |

#### Liste de joueurs

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Titre** | Texte libre | Titre de la liste (ex : "Attaquants", "Défenseurs") |
| **Joueurs** | Liste dynamique | Chaque joueur : nom, numéro, position. Boutons ajouter/supprimer. |
| **Afficher les numéros** | Oui / Non | Visibilité des numéros pour toute la liste |
| **Afficher les positions** | Oui / Non | Visibilité des positions pour toute la liste |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur des joueurs |
| **Couleur du titre** | Sélecteur de couleur | Couleur du titre de la liste |

#### Fiche joueur

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Titre** | Texte libre | Intitulé (ex : "Joueur du match", "MVP") |
| **Sous-titre** | Texte libre | Complément (ex : "3 buts, 1 passe") |
| **Nom du joueur** | Texte libre | Nom complet |
| **Numéro** | Texte libre | Numéro de maillot |
| **Équipe** | Texte libre | Nom de l'équipe |
| **Photo** | Sélecteur de fichier | Photo du joueur (depuis la galerie, voir chapitre 11) |
| **Statistiques** | Liste dynamique | Paires label/valeur (ex : "Buts" / "12") |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur principale |
| **Couleur du titre** | Sélecteur de couleur | Couleur du titre |

### Éléments But

#### Buteur

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Nom** | Texte libre | Nom du buteur |
| **Numéro** | Texte libre | Numéro de maillot |
| **Photo** | Sélecteur de fichier | Photo du joueur (optionnelle) |
| **Afficher la photo** | Oui / Non | Visibilité de la photo |
| **Afficher le numéro** | Oui / Non | Visibilité du numéro |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur de la police |

#### Assistants

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Assistant 1 - Nom** | Texte libre | Nom du premier passeur |
| **Assistant 1 - Numéro** | Texte libre | Numéro du premier passeur |
| **Assistant 2 - Nom** | Texte libre | Nom du second passeur |
| **Assistant 2 - Numéro** | Texte libre | Numéro du second passeur |
| **Afficher les numéros** | Oui / Non | Visibilité des numéros pour les deux assistants |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur de la police |

#### Détails du but

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Temps du but** | Texte libre | Moment du but (ex : "12:34") |
| **Période** | Texte libre | Période du but (ex : "2e période") |
| **Décompte match** | Texte libre | Numéro du but dans le match (ex : "3e but") |
| **Décompte tournoi** | Texte libre | Numéro du but dans le tournoi (ex : "47e but") |
| **Afficher la période** | Oui / Non | Visibilité de la période |
| **Afficher les décomptes** | Oui / Non | Visibilité des décomptes |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur de la police |

### Éléments Équipe

#### Membre du staff

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Rôle** | Texte libre | Fonction (ex : "Entraîneur-chef", "Directeur sportif") |
| **Nom** | Texte libre | Nom de la personne |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur de la police |

#### Liste du staff

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Titre** | Texte libre | Titre de la section (ex : "Staff technique") |
| **Membres** | Liste dynamique | Chaque membre : rôle + nom. Boutons ajouter/supprimer. |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur des membres |
| **Couleur du titre** | Sélecteur de couleur | Couleur du titre |

### Éléments Tableau

#### Tableau de données

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Titre** | Texte libre | Titre du tableau (ex : "Classement groupe A") |
| **Colonnes** | Liste dynamique | Chaque colonne : identifiant, label affiché, alignement (gauche/centre/droite) |
| **Lignes** | Liste dynamique | Chaque ligne : valeurs par colonne + option de surlignage |
| **Afficher l'en-tête** | Oui / Non | Visibilité de la ligne d'en-tête |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur d'en-tête** | Sélecteur de couleur | Couleur de fond/texte de l'en-tête |
| **Couleur du texte** | Sélecteur de couleur | Couleur des données |

Le **surlignage** par ligne permet de mettre en évidence certaines lignes (ex : équipes qualifiées en vert, éliminées en rouge). Chaque ligne peut être individuellement marquée comme surlignée.

### Éléments Événement

#### Événement

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Période** | Texte libre | Numéro ou nom de la période |
| **Temps** | Texte libre | Moment de l'événement (ex : "08:45") |
| **Type** | But / Pénalité / Temps mort / Période | Nature de l'événement |
| **Description** | Texte libre | Détails (ex : "Tripping - 2 min") |
| **Équipe** | Texte libre | Équipe concernée |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur de la police |

#### Chronologie

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Titre** | Texte libre | Titre de la chronologie (ex : "Événements du match") |
| **Événements** | Liste dynamique | Chaque événement : période, temps, type, description, équipe. Boutons ajouter/supprimer. |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur des événements |
| **Couleur du titre** | Sélecteur de couleur | Couleur du titre |

### Éléments Calendrier

#### Match

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Date** | Texte libre | Date du match (ex : "15 mars 2026") |
| **Heure** | Texte libre | Heure du match (ex : "20:00") |
| **Équipe gauche** | Texte libre | Nom ou code de l'équipe à domicile |
| **Équipe droite** | Texte libre | Nom ou code de l'équipe visiteuse |
| **Score gauche** | Texte libre | Score de l'équipe à domicile (si terminé) |
| **Score droite** | Texte libre | Score de l'équipe visiteuse (si terminé) |
| **Statut** | À venir / En cours / Terminé | État du match |
| **Lieu** | Texte libre | Nom du lieu (ex : "Centre Bell") |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur de la police |

#### Programme

| Paramètre | Options | Description |
|-----------|---------|-------------|
| **Titre** | Texte libre | Titre du programme (ex : "Matchs du jour") |
| **Matchs** | Liste dynamique | Chaque match : date, heure, équipes, scores, statut, lieu. Boutons ajouter/supprimer. |
| **Taille de police** | 8 - 300 px | Taille du texte |
| **Couleur du texte** | Sélecteur de couleur | Couleur des matchs |
| **Couleur du titre** | Sélecteur de couleur | Couleur du titre |

---

## Panneau des couches

La liste des champs affiche tous les éléments dans l'ordre des couches (Z-index, du plus haut au plus bas). Pour chaque champ :

| Contrôle | Action |
|----------|--------|
| **Icône de type** | Indique le type d'élément (texte, image, horloge, etc.) |
| **Nom du champ** | Cliquer pour sélectionner. **Double-cliquer** pour renommer le champ directement dans la liste. |
| **z-index** | Affiche la position dans l'empilement |
| **Flèches haut/bas** | Réordonner les couches (quel champ passe devant/derrière) |
| **Icône oeil** | Basculer la visibilité (un champ invisible reste dans la liste mais n'apparaît pas sur le canvas) |
| **Icône cadenas** | Basculer le verrouillage (empêche le déplacement et le redimensionnement accidentels). Un champ verrouillé affiche un cadenas doré. |
| **Icône poubelle** | Supprimer le champ |
| **Ctrl+Clic** | Ajouter/retirer le champ de la multi-sélection |

---

## Sélection de zone

L'outil de **sélection de zone** permet de dessiner un rectangle sur le canvas. Tous les champs entièrement inclus dans la zone dessinée sont automatiquement sélectionnés et regroupés. Ce regroupement peut ensuite être sauvegardé comme preset pour une réutilisation rapide.

**Utilisation :**
1. Activer l'outil de sélection de zone dans la barre d'outils
2. Cliquer et glisser sur le canvas pour définir la zone
3. Les champs inclus dans la zone sont surlignés
4. Sauvegarder le groupe comme preset si désiré

---

## Presets (sauvegarde et chargement)

Le système de presets permet de sauvegarder et réutiliser des constructions dans le Layout libre. Les presets sont persistés dans IndexedDB et disponibles entre les sessions.

### Sauvegarder un preset

La section "Presets" dans le panneau éditeur propose deux options :

| Bouton | Action | Condition |
|--------|--------|-----------|
| **Sauvegarder le champ** | Sauvegarde le champ sélectionné (élément, position, dimensions, style). Si d'autres champs sont visuellement placés à l'intérieur du champ sélectionné, ils sont automatiquement inclus. La modale indique le nombre d'éléments contenus détectés. | Grisé si aucun champ n'est sélectionné. |
| **Sauvegarder l'écran** | Sauvegarde l'intégralité du layout (tous les champs + options du canvas : mode pleine page, grille, guides). | Grisé si le canvas est vide. |

Une modale s'ouvre pour choisir le type de preset et saisir un nom descriptif.

### Charger un preset

Le bouton "Charger un preset" ouvre une modale listant tous les presets sauvegardés, séparés en deux sections (champs individuels et écrans complets).

Deux modes de chargement sont disponibles :

| Mode | Comportement |
|------|-------------|
| **Remplacer** | Le layout actuel est entièrement remplacé par le contenu du preset. |
| **Ajouter** | Les champs du preset sont ajoutés au layout existant (dans la limite de 50 champs au total). |

### Gestion des presets

| Action | Description |
|--------|-------------|
| **Exporter** | Télécharge le preset au format `.preset.json` pour le partager avec d'autres utilisateurs. |
| **Importer** | Charge un fichier `.preset.json` exporté par un autre utilisateur. |
| **Supprimer** | Supprime définitivement un preset de la bibliothèque. |

---

## Historique undo/redo

Chaque action effectuée dans le Layout libre (ajout, suppression, déplacement, redimensionnement, rotation, modification de propriété) est enregistrée dans un historique dédié de 50 niveaux.

| Raccourci | Action |
|-----------|--------|
| `Ctrl+Z` | Annuler la dernière action (revenir en arrière) |
| `Ctrl+Y` | Rétablir l'action annulée (avancer) |

**Regroupement intelligent :** les modifications rapides et successives (par exemple, pendant un glisser-déposer ou un redimensionnement) sont automatiquement regroupées en une seule entrée d'historique grâce à un mécanisme de debounce (300 ms). Cela évite d'encombrer l'historique avec des dizaines d'états intermédiaires et garantit qu'un seul `Ctrl+Z` annule l'ensemble de l'opération de déplacement.

L'historique est propre au Layout libre et ne se mélange pas avec les modifications des autres parties du scoreboard. Il se réinitialise quand on change de type d'affichage.

---

## Architecture : données du match et éléments visuels

Le Layout libre repose sur une séparation fondamentale entre les **données** et leur **représentation visuelle** :

| Couche | Emplacement | Contenu |
|--------|-------------|---------|
| **Données du match** | Panneau éditeur > Contenu > Équipes | Équipes (codes NOC), noms affichés, scores, drapeaux |
| **Éléments visuels** | Canvas (via la bibliothèque) | Représentations graphiques qui lisent les données du match |

Les éléments visuels sont des **vues** sur les données. Modifier le score dans le panneau éditeur met à jour instantanément tous les éléments Score présents sur le canvas. Ce modèle permet de placer plusieurs fois le même type d'élément (par exemple deux éléments Score pour afficher les deux équipes) sans duplication de données.

---

## Limites techniques

| Limite | Valeur |
|--------|--------|
| Nombre maximal d'éléments par canvas | 50 |
| Niveaux d'historique undo/redo | 50 |
| Taille de police minimale | 8 px |
| Taille de police maximale | 300 px |
| Taille de grille | 8, 16, 24 ou 32 px |
| Snap de rotation | 15 degrés |
| Épaisseur de bordure maximale | 20 px |
| Rayon de bordure maximal | 100 px |
| Marge interne maximale | 50 px |
| Flou d'arrière-plan maximal | 30 px |
| Flou d'ombre maximal | 100 px |
| Décalage d'ombre maximal | 50 px |

---

## Tutoriel : créer un scoreboard de A à Z

Ce tutoriel guide la création d'un scoreboard simple de hockey avec score, horloge, noms d'équipes et pénalités.

### Étape 1 : préparer le canvas

1. S'assurer que le type d'affichage "Layout libre" est sélectionné (panneau Modes, 1re icône)
2. Activer le **mode pleine page** pour disposer de tout l'espace
3. Activer la grille (taille 16 px) et l'aimantation pour faciliter le positionnement

### Étape 2 : créer le fond

1. Dans la bibliothèque, cliquer sur **Forme** (catégorie Médias)
2. Le rectangle apparaît au centre du canvas
3. Dans le panneau de propriétés, configurer :
   - Type : Rectangle
   - Couleur de remplissage : couleur sombre (ex : bleu foncé)
   - Opacité du remplissage : 90 %
   - Rayon de bordure : 8 px
4. Redimensionner le rectangle pour couvrir la zone souhaitée (ex : 1200 x 120 px)
5. Positionner en haut du canvas
6. Verrouiller le champ (icône cadenas dans les couches) pour ne pas le déplacer par accident

### Étape 3 : ajouter les scores

1. Ajouter un élément **Score** (catégorie Match)
2. Configurer le côté "Gauche" dans les propriétés
3. Sélectionner la nation via le dropdown (ex : CAN)
4. Ajuster la taille de police à 60 px via la barre flottante
5. Positionner au centre-gauche du fond
6. Dupliquer (Ctrl+D) et changer le côté en "Droite" pour l'équipe adverse
7. Positionner symétriquement

### Étape 4 : ajouter les noms d'équipes

1. Ajouter un élément **Nom d'équipe** (catégorie Match)
2. Configurer le côté "Gauche", sélectionner la nation
3. Ajuster la taille de police à 28 px
4. Positionner à gauche du score
5. Dupliquer et configurer le côté "Droite"
6. Positionner symétriquement

### Étape 5 : ajouter l'horloge

1. Ajouter un élément **Horloge** (catégorie Match)
2. Activer "Afficher la période"
3. Ajuster la taille de police à 40 px
4. Positionner au centre, entre les deux scores

### Étape 6 : ajustements finaux

1. Sélectionner tous les éléments texte (Ctrl+Clic sur chacun)
2. Utiliser les boutons d'alignement vertical ("Centrer verticalement") pour harmoniser la ligne
3. Vérifier le diagnostic d'alignement (lignes vertes = alignement parfait)
4. Ajouter une ombre portée au fond (flou 10 px, décalage 4/4, opacité 40 %)
5. Sauvegarder le résultat comme preset ("Score simple personnalisé")

### Étape 7 : tester en mode opérateur

1. Passer en mode opérateur (voir chapitre 8) pour tester l'affichage
2. Vérifier que les scores se mettent à jour correctement
3. Ajuster si nécessaire, puis re-sauvegarder le preset

---

## Bonnes pratiques

**Organisation des couches**
- Placer les arrière-plans (formes, images) en arrière-plan (z-index bas) et les textes au premier plan.
- Utiliser le panneau des couches pour vérifier l'ordre d'empilement.
- Verrouiller les éléments déjà positionnés pour éviter les déplacements accidentels.
- Nommer les champs de manière descriptive (double-cliquer dans le panneau des couches pour renommer) : "Fond principal", "Score CAN", "Horloge centre".

**Alignement précis**
- Activer la grille et l'aimantation pour un positionnement régulier.
- Utiliser les smart guides (lignes roses) pendant le déplacement pour aligner automatiquement avec les autres éléments.
- Exploiter les badges de quasi-alignement (ambre) : cliquer dessus corrige automatiquement la position.
- Pour un alignement parfait de plusieurs éléments, sélectionner le groupe (Ctrl+Clic) puis utiliser les 6 boutons d'alignement.

**Efficacité du travail**
- Commencer par un modèle hockey prédéfini (section Presets > Charger un preset) pour avoir une base de travail.
- Sauvegarder régulièrement des presets de champs et d'écrans complets pour pouvoir revenir en arrière.
- Utiliser les raccourcis clavier pour accélérer le travail (Ctrl+D pour dupliquer, flèches pour déplacer finement).
- Pour créer des structures répétitives, concevoir un élément puis le dupliquer et repositionner les copies.

**Typographie**
- Attribuer une police spécifique à chaque type d'élément pour un rendu professionnel (par exemple : Bebas Neue pour les scores, Inter pour les noms).
- Utiliser la barre flottante de taille de police pour ajuster rapidement la taille directement sur le canvas.
- Attention au scaling proportionnel : quand un élément est redimensionné, sa taille de police visuelle change proportionnellement.

**Effets visuels**
- Utiliser les ombres portées avec parcimonie : un flou de 8-15 px et une opacité de 30-50 % donnent un rendu subtil et professionnel.
- Le flou d'arrière-plan (backdrop blur) combiné à un fond semi-transparent crée un effet "verre dépoli" moderne.
- L'opacité globale permet de créer des éléments discrets sans les masquer complètement (utile pour les fonds décoratifs).

---

## Référence rapide

| Besoin | Solution |
|--------|----------|
| Afficher le score des deux équipes | 2 éléments Score (côté Gauche + côté Droite) |
| Afficher les noms des équipes | 2 éléments Nom d'équipe (Gauche + Droite) |
| Afficher les drapeaux seuls | 2 éléments Drapeau (Gauche + Droite) |
| Créer un fond coloré | Élément Forme (rectangle) placé en arrière-plan |
| Ajouter un séparateur visuel | Élément Séparateur (horizontal ou vertical) |
| Reproduire un scoreboard classique | Élément Header complet (catégorie Composés) |
| Intégrer un type prédéfini | Éléments Types 2-14 (catégorie Composés) |
| Afficher les scores par période | Élément Score par période (catégorie Match) |
| Créer un écran de célébration de but | Éléments Buteur + Assistants + Détails du but |
| Afficher la fiche d'un joueur | Élément Fiche joueur (catégorie Joueurs) |
| Créer un classement | Élément Tableau de données (catégorie Tableau) |
| Afficher le programme des matchs | Élément Programme (catégorie Calendrier) |
| Déplacer un élément de 1 pixel | Flèches du clavier |
| Déplacer un élément de 10 pixels | Shift + flèches |
| Annuler une erreur | Ctrl+Z (jusqu'à 50 niveaux) |
| Sélectionner tous les éléments | Ctrl+A |
| Dupliquer un élément | Ctrl+D |
| Copier/coller | Ctrl+C puis Ctrl+V |
| Zoom sur le canvas | Ctrl+molette ou Ctrl+=/- |
| Réinitialiser le zoom | Ctrl+0 (ajuster) ou Ctrl+1 (100%) |
