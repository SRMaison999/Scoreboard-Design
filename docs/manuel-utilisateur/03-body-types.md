# Manuel utilisateur - Types d'affichage

Le scoreboard propose 14 types d'affichage pour le corps du scoreboard. Le type est sélectionné dans le panneau **Modes** (1re icône du rail de navigation). Le **Layout libre** est proposé en premier car il offre la plus grande flexibilité de conception.

> **Note technique :** dans le code source, le Layout libre porte l'identifiant interne 14 (`bodyType: 14`). Son positionnement en tête de liste dans l'interface reflète son statut de mode principal.

---

## Layout libre (champs personnalisés)

Canvas entièrement libre où l'utilisateur compose son propre scoreboard en plaçant, déplaçant et redimensionnant des éléments visuels individuels.

**Idéal pour :** créer un affichage sur mesure qui ne correspond à aucun des 13 types prédéfinis, concevoir des mises en page originales, assembler des éléments de différentes natures sur un même écran.

### Concept général

Contrairement aux types prédéfinis (1 à 13) qui imposent un agencement fixe, le Layout libre offre un canvas vierge. L'utilisateur y dépose des éléments depuis une bibliothèque, puis les positionne librement par glisser-déposer et les redimensionne via des poignées dans les coins. Chaque élément possède ses propres propriétés de style, de position et de taille.

Le Layout libre est le mode par défaut au lancement de l'application. Il est conçu pour les designers broadcast qui ont besoin d'un contrôle total sur la disposition de chaque élément visuel.

### Mode pleine page

Quand activé, le header du scoreboard (drapeaux, noms d'équipes, scores, horloge) est masqué. Le canvas entier (1920x1080 par défaut) est alors disponible pour les champs personnalisés. Ce mode est indispensable pour créer un scoreboard complètement personnalisé, en plaçant chaque élément exactement où on le souhaite.

**Activation :** case à cocher "Mode pleine page" dans la section principale du panneau éditeur, visible uniquement en mode Layout libre.

### Bibliothèque d'éléments

La bibliothèque propose plus de 25 éléments répartis en 6 catégories :

| Catégorie | Éléments disponibles | Description |
|-----------|---------------------|-------------|
| **Match** | Score, Horloge, Période, Nom d'équipe, Drapeau, Temps morts, Tirs au but | Éléments liés aux données du match en cours. Le score et l'horloge se mettent à jour automatiquement en mode opérateur. |
| **Texte** | Bloc de texte | Zone de texte libre avec contenu, taille, graisse, alignement et casse configurables. |
| **Données** | Ligne de stat, Barre comparative | Éléments de visualisation statistique. |
| **Joueurs** | Photo joueur | Photo circulaire d'un joueur (depuis la galerie de photos). |
| **Médias** | Image, Forme (rectangle, cercle, arrondi), Séparateur (ligne) | Éléments décoratifs et structurels pour habiller le scoreboard. |
| **Composés** | Header complet, Colonne de pénalités, Types 1-13 intégrés | Blocs complets réutilisant les layouts prédéfinis comme éléments individuels. |

Un **champ de recherche** en haut de la bibliothèque permet de filtrer les éléments par nom. Cliquer sur un élément l'ajoute immédiatement au canvas avec des dimensions par défaut.

### Interaction sur le canvas

#### Sélection
- **Cliquer** sur un champ pour le sélectionner (bordure bleue avec poignées).
- **Ctrl+Clic** sur un autre champ pour l'ajouter à la sélection (multi-sélection).
- **Cliquer sur le fond** du canvas pour désélectionner.
- **Sélection de zone** : cliquer et glisser sur le fond du canvas pour dessiner un rectangle de sélection. Tous les champs inclus dans la zone sont sélectionnés.
- Le champ sélectionné affiche **8 poignées de redimensionnement** (4 coins + 4 bords) et une **poignée de rotation** au-dessus.

#### Déplacement
- **Glisser-déposer** un champ sélectionné pour le repositionner.
- En multi-sélection, le déplacement s'applique à tous les champs sélectionnés.
- Le déplacement tient compte du facteur de zoom du canvas (compensation automatique).
- Si l'aimantation à la grille est activée, le champ s'aligne sur les intersections.
- Les **smart guides** apparaissent automatiquement en rose pendant le déplacement pour indiquer l'alignement avec d'autres champs (bords, centres) ou le canvas.

#### Redimensionnement
- **Tirer** l'une des **8 poignées** (coins et bords) du champ sélectionné.
- **Shift** maintenu pendant le redimensionnement : conserve les proportions.
- **Alt** maintenu pendant le redimensionnement : redimensionne depuis le centre.
- Le redimensionnement est proportionnel : la taille de police du champ s'ajuste automatiquement en fonction du ratio de redimensionnement.
- La compensation de scale du canvas est appliquée automatiquement.

#### Rotation
- Le champ sélectionné affiche une **poignée de rotation** (cercle) au-dessus, reliée par une ligne.
- **Tirer** la poignée de rotation pour faire pivoter le champ.
- La rotation s'effectue par incréments de **15 degrés** avec magnétisme automatique.
- L'angle de rotation est affiché dans les propriétés du champ.

#### Édition de texte inline
- **Double-cliquer** sur un bloc de texte pour passer en mode édition directe.
- Le texte peut être modifié directement sur le canvas, sans passer par le panneau de propriétés.
- **Entrée** pour valider, **Échap** pour annuler.

#### Drag-and-drop depuis la bibliothèque
- Les éléments de la bibliothèque peuvent être **glissés-déposés** directement sur le canvas.
- Un indicateur visuel (zone de dépôt) apparaît pendant le survol du canvas.
- Le champ est créé à la position exacte du dépôt.

#### Verrouillage
- Un champ verrouillé (icône cadenas dans la liste des couches) ne peut être ni déplacé ni redimensionné.
- Le curseur affiche une icône "interdit" au survol d'un champ verrouillé.
- Le verrouillage protège les éléments déjà positionnés contre les modifications accidentelles.

#### Menu contextuel (clic droit)

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

#### Raccourcis clavier

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

### Multi-sélection et opérations groupées

Quand plusieurs champs sont sélectionnés (via Ctrl+Clic ou sélection de zone), une **barre d'outils multi-sélection** apparaît dans le panneau latéral avec :

#### Alignement (6 boutons)
- Aligner les bords gauches / Centrer horizontalement / Aligner les bords droits
- Aligner les bords supérieurs / Centrer verticalement / Aligner les bords inférieurs

#### Distribution (pour 3+ champs sélectionnés)
- Distribuer horizontalement (espacement égal entre les champs)
- Distribuer verticalement (espacement égal entre les champs)

#### Actions groupées
- Supprimer tous les champs sélectionnés
- Dupliquer tous les champs sélectionnés

### Zoom et panoramique

Le canvas supporte le zoom et le panoramique pour travailler sur des détails :

| Contrôle | Action |
|----------|--------|
| `Ctrl+Molette` | Zoom avant/arrière |
| `Ctrl+0` | Ajuster au canvas (zoom pour tout voir) |
| `Ctrl+1` | Zoom 100% (taille réelle) |
| `Ctrl+=` | Zoom avant |
| `Ctrl+-` | Zoom arrière |
| Barre de zoom | Sélection directe du niveau de zoom |

Des **règles pixel** apparaissent le long des bords supérieur et gauche du canvas, avec des graduations adaptées au niveau de zoom.

### Effets visuels

Chaque champ peut avoir des effets visuels configurables dans le panneau de propriétés :

| Effet | Description |
|-------|-------------|
| **Opacité** | Transparence globale du champ (0-100%) |
| **Ombre portée** | Ombre configurable (décalage X/Y, flou, étendue, couleur) |
| **Flou d'arrière-plan** | Effet de flou (backdrop blur) sur le contenu derrière le champ |

### Modèles hockey prédéfinis

4 modèles de layout spécialement conçus pour le hockey sur glace :

| Modèle | Description |
|--------|-------------|
| **Score simple** | Noms d'équipe, score central, horloge et période |
| **Score avec pénalités** | Score complet avec colonnes de pénalités gauche et droite |
| **Bandeau inférieur** | Barre horizontale en bas de l'écran (style lower third) |
| **Statistiques complètes** | Layout complet avec score, horloge, stats et comparaisons |

Ces modèles créent automatiquement les champs pré-positionnés sur le canvas.

### Contrôle de la taille de police sur le canvas

Pour les éléments textuels (score, horloge, période, nom d'équipe, bloc de texte), une **barre flottante** apparaît automatiquement au-dessus du champ sélectionné. Elle affiche la taille de police actuelle et propose des contrôles directs :

| Contrôle | Action |
|----------|--------|
| Bouton **-** | Diminue la taille de 1 px. **Maintenir enfoncé** pour une répétition accélérée. |
| Bouton **+** | Augmente la taille de 1 px. **Maintenir enfoncé** pour une répétition accélérée. |
| **Clic sur la valeur** | Ouvre un champ de saisie directe. Taper la taille souhaitée (8-300), puis Entrée pour valider ou Échap pour annuler. |
| **Molette de souris** | Sur un champ sélectionné, ajuste la taille de +1 px (molette haut) ou -1 px (molette bas). |

**Indicateur visuel :** la valeur affichée apparaît en blanc si elle est propre au champ (override local), ou en gris si le champ utilise la taille globale. Cliquer sur + ou - crée automatiquement un override local.

Si le champ est trop près du bord supérieur du canvas, la barre se repositionne automatiquement en dessous du champ.

### Sélection de police par champ

Chaque champ texte peut avoir sa propre police de caractères, indépendante des autres champs et des 3 zones de police globales. Dans le panneau de propriétés du champ, un sélecteur de police permet de choisir parmi les 25 polices disponibles (organisées par catégorie). La police sélectionnée s'applique uniquement au champ concerné.

### Sélection d'images

Les champs de type Image disposent d'un **sélecteur de fichier** intégré au panneau de propriétés. Un bouton "Choisir une image" ouvre le dialogue de sélection du système. L'image sélectionnée s'affiche en aperçu miniature dans le panneau, et le champ sur le canvas affiche l'image choisie.

### Scaling proportionnel au redimensionnement

Quand un champ texte est redimensionné via les poignées, la taille de police s'ajuste proportionnellement. Par exemple, si un champ est élargi de 50%, la taille de police augmente de 50%. Ce comportement garantit que le texte reste visuellement cohérent après un redimensionnement.

### Noms d'équipes libres

Pour les champs "Nom d'équipe", le sélecteur propose à la fois les 31 codes NOC prédéfinis (CAN, USA, SUI...) et la possibilité de saisir un nom libre. Cela permet d'utiliser des noms personnalisés pour les ligues locales, les équipes de club ou tout autre contexte hors compétitions internationales.

### Grille et guides

| Option | Description |
|--------|-------------|
| **Afficher les guides** | Superpose une grille en pointillés sur le canvas pour faciliter l'alignement visuel. |
| **Taille de la grille** | Configurable (8 px par défaut). Les valeurs habituelles sont 8, 16, 24 ou 32 px. |
| **Aimanter à la grille** | Les champs s'alignent automatiquement sur les intersections de la grille lors du déplacement. |

### Panneau de propriétés (sidebar)

Quand un champ est sélectionné, ses propriétés apparaissent directement dans le panneau latéral gauche, sous la bibliothèque et les couches. Un **panneau de propriétés secondaire** (300 px de large) peut aussi s'ouvrir entre le panneau éditeur et la preview, ce qui permet de garder la bibliothèque et les couches toujours visibles.

Le panneau de propriétés affiche :

#### Identification
- **Nom** : label personnalisable du champ (pour le repérer dans la liste des couches)

#### Alignement
- **6 boutons d'alignement** : gauche/centre/droite (horizontal) + haut/centre/bas (vertical)
- **Verrouillage des proportions** : maintient le ratio largeur/hauteur lors du redimensionnement

#### Position et taille
- **X, Y** : position en pixels sur le canvas
- **Largeur, Hauteur** : dimensions en pixels
- **Ordre (Z)** : position dans l'empilement des couches (quel champ passe devant/derrière)

#### Style
- **Couleur de fond** : couleur d'arrière-plan du champ
- **Opacité du fond** : transparence de l'arrière-plan (0-100)
- **Couleur de bordure** : couleur du contour
- **Épaisseur de bordure** : largeur du contour en pixels
- **Rayon de bordure** : arrondi des coins
- **Marge interne** : espace entre le bord du champ et son contenu

#### Configuration de l'élément
Paramètres spécifiques selon le type d'élément (voir tableau ci-dessous).

#### Actions
- **Dupliquer** : crée une copie du champ avec un léger décalage
- **Supprimer** : retire le champ du canvas

### Configuration par type d'élément

| Type | Paramètres configurables |
|------|------------------------|
| **Bloc de texte** | Contenu, taille de police, famille de police, épaisseur (graisse), alignement (gauche/centre/droite), casse (normal/majuscules), espacement des lettres |
| **Score** | Côté (gauche = équipe 1, droite = équipe 2), taille de police, famille de police |
| **Nom d'équipe** | Côté (gauche/droite), taille de police, famille de police, nom libre ou code NOC |
| **Horloge** | Afficher la période, afficher le cadre, taille de police, famille de police |
| **Période** | Taille de police, famille de police |
| **Drapeau** | Côté (gauche/droite) |
| **Colonne de pénalités** | Côté (gauche/droite) |
| **Forme** | Type (rectangle, cercle, arrondi), couleur de remplissage, couleur de bordure, rayon (pour arrondi) |
| **Séparateur** | Orientation (horizontale/verticale), épaisseur, couleur |
| **Image** | Sélecteur de fichier avec aperçu, ajustement (couvrir, contenir, étirer) |

### Panneau des couches

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

### Sélection de zone

L'outil de **sélection de zone** permet de dessiner un rectangle sur le canvas. Tous les champs entièrement inclus dans la zone dessinée sont automatiquement sélectionnés et regroupés. Ce regroupement peut ensuite être sauvegardé comme preset pour une réutilisation rapide.

**Utilisation :**
1. Activer l'outil de sélection de zone dans la barre d'outils
2. Cliquer et glisser sur le canvas pour définir la zone
3. Les champs inclus dans la zone sont surlignés
4. Sauvegarder le groupe comme preset si désiré

### Presets (sauvegarde et chargement)

Le système de presets permet de sauvegarder et réutiliser des constructions dans le Layout libre. Les presets sont persistés dans IndexedDB et disponibles entre les sessions.

#### Sauvegarder un preset

La section "Presets" dans le panneau éditeur propose deux options :

| Bouton | Action | Condition |
|--------|--------|-----------|
| **Sauvegarder le champ** | Sauvegarde le champ sélectionné (élément, position, dimensions, style). Si d'autres champs sont visuellement placés à l'intérieur du champ sélectionné, ils sont automatiquement inclus. La modale indique le nombre d'éléments contenus détectés. | Grisé si aucun champ n'est sélectionné. |
| **Sauvegarder l'écran** | Sauvegarde l'intégralité du layout (tous les champs + options du canvas : mode pleine page, grille, guides). | Grisé si le canvas est vide. |

Une modale s'ouvre pour choisir le type de preset et saisir un nom descriptif.

#### Charger un preset

Le bouton "Charger un preset" ouvre une modale listant tous les presets sauvegardés, séparés en deux sections (champs individuels et écrans complets).

Deux modes de chargement sont disponibles :

| Mode | Comportement |
|------|-------------|
| **Remplacer** | Le layout actuel est entièrement remplacé par le contenu du preset. |
| **Ajouter** | Les champs du preset sont ajoutés au layout existant (dans la limite de 50 champs au total). |

#### Gestion des presets

| Action | Description |
|--------|-------------|
| **Exporter** | Télécharge le preset au format `.preset.json` pour le partager avec d'autres utilisateurs. |
| **Importer** | Charge un fichier `.preset.json` exporté par un autre utilisateur. |
| **Supprimer** | Supprime définitivement un preset de la bibliothèque. |

### Historique undo/redo

Chaque action effectuée dans le Layout libre (ajout, suppression, déplacement, redimensionnement, rotation, modification de propriété) est enregistrée dans un historique dédié de 50 niveaux.

| Raccourci | Action |
|-----------|--------|
| `Ctrl+Z` | Annuler la dernière action (revenir en arrière) |
| `Ctrl+Y` | Rétablir l'action annulée (avancer) |

**Regroupement intelligent :** les modifications rapides et successives (par exemple, pendant un glisser-déposer ou un redimensionnement) sont automatiquement regroupées en une seule entrée d'historique grâce à un mécanisme de debounce (300 ms). Cela évite d'encombrer l'historique avec des dizaines d'états intermédiaires et garantit qu'un seul `Ctrl+Z` annule l'ensemble de l'opération de déplacement.

L'historique est propre au Layout libre et ne se mélange pas avec les modifications des autres parties du scoreboard. Il se réinitialise quand on change de type d'affichage.

---

## Type 1 : Stats symétriques

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

## Type 2 : Stats asymétriques

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

### Différences avec le Type 1

- Les deux titres sont positionnés dans les colonnes de valeurs (pas centrés)
- Permet de comparer deux contextes différents côte à côte

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
| **Source des photos** | Les photos sont chargées depuis la galerie de photos joueurs (voir chapitre 10) |

### Mise en page

- Grille auto-centrée : Variable | (Photo) | Nom Prénom | Valeur
- Tous les textes à la même taille de police
- Gap uniforme de 35px entre colonnes

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
| **Photos** | Chargées depuis la galerie de photos joueurs (voir chapitre 10) |

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

---

## Type 12 : Composition d'équipe (Roster)

Composition d'équipe avec positions et informations.

**Idéal pour :** présentation des lineups, compositions d'avant-match

### Configuration

| Paramètre | Description |
|-----------|-------------|
| **Titre** | Titre et équipe |
| **Joueurs** | Position (G, D, AG, C, AD), numéro, nom |
| **Entraîneur** | Nom de l'entraîneur |
| **Statistiques** | Statistiques résumées de l'équipe |

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

---

## Tableau récapitulatif

| N° | Type | Usage principal | Complexité |
|----|------|----------------|-----------|
| - | **Layout libre** | Composition sur mesure | Avancé |
| 1 | Stats symétriques | Statistiques de match | Simple |
| 2 | Stats asymétriques | Comparaison de catégories | Simple |
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
