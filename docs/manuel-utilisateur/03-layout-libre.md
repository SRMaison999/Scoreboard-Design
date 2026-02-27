# Manuel utilisateur - Layout libre

Le Layout libre est le mode principal de l'application et le type d'affichage par défaut au lancement. Il offre un canvas entièrement vierge sur lequel l'utilisateur compose son scoreboard en plaçant, déplaçant et redimensionnant librement des éléments visuels. Avec plus de 43 éléments disponibles dans 11 catégories, un système de couches, des guides d'alignement, un historique undo/redo de 50 niveaux et des presets réutilisables, le Layout libre permet de créer n'importe quel design de scoreboard imaginable.

**Cas d'utilisation :**
- Concevoir un affichage sur mesure qui ne correspond à aucun des 13 types à agencement fixe
- Assembler des éléments de différentes natures sur un même écran (score + statistiques + photos)
- Créer des mises en page originales avec un contrôle total sur la position de chaque élément
- Prototyper rapidement différents designs de scoreboard grâce aux presets

## Concept général

Contrairement aux types à agencement fixe (types 2 à 14) où la disposition des éléments est prédéterminée, le Layout libre offre un canvas vierge de 1920x1080 pixels (par défaut, configurable). L'utilisateur y dépose des éléments depuis une bibliothèque, puis les positionne librement par glisser-déposer et les redimensionne via 8 poignées (4 coins + 4 bords). Chaque élément possède ses propres propriétés de style, de position, de taille et de rotation.

## Mode pleine page

Quand activé, le header du scoreboard (drapeaux, noms d'équipes, scores, horloge) est masqué. Le canvas entier (1920x1080 par défaut) est alors disponible pour les champs personnalisés. Ce mode est indispensable pour créer un scoreboard complètement personnalisé, en plaçant chaque élément exactement où on le souhaite.

**Activation :** case à cocher "Mode pleine page" dans la section principale du panneau éditeur, visible uniquement en mode Layout libre.

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
- L'angle de rotation est affiché dans les propriétés du champ.

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

### Menu contextuel (clic droit)

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

### Raccourcis clavier

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

Des **règles pixel** apparaissent le long des bords supérieur et gauche du canvas, avec des graduations adaptées au niveau de zoom.

## Effets visuels

Chaque champ peut avoir des effets visuels configurables dans le panneau de propriétés :

| Effet | Description |
|-------|-------------|
| **Opacité** | Transparence globale du champ (0-100%) |
| **Ombre portée** | Ombre configurable (décalage X/Y, flou, étendue, couleur) |
| **Flou d'arrière-plan** | Effet de flou (backdrop blur) sur le contenu derrière le champ |

## Modèles hockey prédéfinis

4 modèles de layout spécialement conçus pour le hockey sur glace :

| Modèle | Description |
|--------|-------------|
| **Score simple** | Noms d'équipe, score central, horloge et période |
| **Score avec pénalités** | Score complet avec colonnes de pénalités gauche et droite |
| **Bandeau inférieur** | Barre horizontale en bas de l'écran (style lower third) |
| **Statistiques complètes** | Layout complet avec score, horloge, stats et comparaisons |

Ces modèles créent automatiquement les champs pré-positionnés sur le canvas.

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

## Sélection de police par champ

Chaque champ texte peut avoir sa propre police de caractères, indépendante des autres champs et des 3 zones de police globales. Dans le panneau de propriétés du champ, un sélecteur de police permet de choisir parmi les 25 polices disponibles (organisées par catégorie). La police sélectionnée s'applique uniquement au champ concerné.

## Sélection d'images

Les champs de type Image disposent d'un **sélecteur de fichier** intégré au panneau de propriétés. Un bouton "Choisir une image" ouvre le dialogue de sélection du système. L'image sélectionnée s'affiche en aperçu miniature dans le panneau, et le champ sur le canvas affiche l'image choisie.

## Scaling proportionnel au redimensionnement

Quand un champ texte est redimensionné via les poignées, la taille de police s'ajuste proportionnellement. Par exemple, si un champ est élargi de 50%, la taille de police augmente de 50%. Ce comportement garantit que le texte reste visuellement cohérent après un redimensionnement.

**Taille de police visuelle :** la barre flottante au-dessus du champ affiche la taille de police **visuelle** (telle qu'elle apparaît à l'écran), pas la taille brute stockée. Si un champ a été redimensionné, la taille affichée tient compte du facteur d'échelle. Par exemple, un champ avec une police brute de 30 px agrandi à 200% de sa hauteur initiale affichera "60" dans la barre flottante. Saisir une nouvelle valeur dans la barre applique la conversion inverse automatiquement.

## Noms d'équipes libres

Pour les champs "Nom d'équipe", le sélecteur propose à la fois les 31 codes NOC prédéfinis (CAN, USA, SUI...) et la possibilité de saisir un nom libre. Cela permet d'utiliser des noms personnalisés pour les ligues locales, les équipes de club ou tout autre contexte hors compétitions internationales.

## Grille et guides

| Option | Description |
|--------|-------------|
| **Afficher les guides** | Superpose une grille en pointillés sur le canvas pour faciliter l'alignement visuel. |
| **Taille de la grille** | Configurable (8 px par défaut). Les valeurs habituelles sont 8, 16, 24 ou 32 px. |
| **Aimanter à la grille** | Les champs s'alignent automatiquement sur les intersections de la grille lors du déplacement. |

## Diagnostic d'alignement

Quand un champ est sélectionné (sans être en cours de déplacement), le système analyse automatiquement son alignement par rapport aux autres champs et aux bords du canvas. Deux types d'indicateurs visuels apparaissent :

| Indicateur | Apparence | Signification |
|------------|-----------|---------------|
| **Alignement exact** | Ligne verte continue | Le champ est parfaitement aligné (bord, centre) avec un autre champ ou le canvas |
| **Quasi-alignement** | Ligne ambrée en pointillés + badge | Le champ est presque aligné (écart de 1 à 8 pixels) |

Les quasi-alignements affichent un **badge cliquable** indiquant l'écart en pixels (ex : "3px"). Cliquer sur ce badge corrige automatiquement la position du champ pour obtenir un alignement parfait.

Le diagnostic compare 6 points d'ancrage pour chaque champ : bord gauche, centre horizontal, bord droit, bord supérieur, centre vertical et bord inférieur. Le nombre de suggestions de quasi-alignement est limité à 6 pour éviter la surcharge visuelle.

## Panneau de propriétés (à droite du canvas)

Quand un champ est sélectionné, un panneau de propriétés (300 px de large) apparaît à droite du canvas de preview. Cela permet de garder la bibliothèque et les couches toujours visibles à gauche, tout en disposant d'un espace confortable pour configurer les propriétés sans scroller. Un bouton **X** en haut du panneau permet de le fermer (et désélectionne le champ). Le panneau supporte aussi la multi-sélection (alignement et distribution).

Quand aucun champ n'est sélectionné, le panneau affiche un bouton **Données du match** qui permet d'accéder directement à la configuration des équipes (sélection de nation, noms affichés, scores, drapeaux). Ce bouton est également accessible via l'icône dans le header du panneau. Les champs de type Score, Nom d'équipe et Drapeau intègrent aussi un **sélecteur de nation** directement dans leurs propriétés, pour choisir l'équipe sans quitter le panneau.

Le panneau de propriétés affiche :

### Identification
- **Nom** : label personnalisable du champ (pour le repérer dans la liste des couches)

### Alignement
- **6 boutons d'alignement** : gauche/centre/droite (horizontal) + haut/centre/bas (vertical)
- **Verrouillage des proportions** : maintient le ratio largeur/hauteur lors du redimensionnement

### Position et taille
- **X, Y** : position en pixels sur le canvas
- **Largeur, Hauteur** : dimensions en pixels
- **Ordre (Z)** : position dans l'empilement des couches (quel champ passe devant/derrière)

### Style
- **Couleur de fond** : couleur d'arrière-plan du champ
- **Opacité du fond** : transparence de l'arrière-plan (0-100)
- **Couleur de bordure** : couleur du contour
- **Épaisseur de bordure** : largeur du contour en pixels
- **Rayon de bordure** : arrondi des coins
- **Marge interne** : espace entre le bord du champ et son contenu

### Configuration de l'élément
Paramètres spécifiques selon le type d'élément (voir tableau ci-dessous).

### Actions
- **Dupliquer** : crée une copie du champ avec un léger décalage
- **Supprimer** : retire le champ du canvas

## Configuration par type d'élément

| Type | Paramètres configurables |
|------|------------------------|
| **Bloc de texte** | Contenu, taille de police, famille de police, épaisseur (graisse), alignement (gauche/centre/droite), casse (normal/majuscules), espacement des lettres |
| **Score** | Côté (gauche = équipe 1, droite = équipe 2), **sélection de la nation** (dropdown avec toutes les nations de hockey), nom affiché, score, taille de police, famille de police |
| **Nom d'équipe** | Côté (gauche/droite), **sélection de la nation** (dropdown), nom affiché, score, afficher le drapeau, taille de police, famille de police |
| **Horloge** | Afficher la période, afficher le cadre, taille de police, famille de police |
| **Période** | Taille de police, famille de police |
| **Drapeau** | Côté (gauche/droite), **sélection de la nation** (dropdown), nom affiché, score |
| **Colonne de pénalités** | Côté (gauche/droite) |
| **Forme** | Type (rectangle, cercle, arrondi), couleur de remplissage, couleur de bordure, rayon (pour arrondi) |
| **Séparateur** | Orientation (horizontale/verticale), épaisseur, couleur |
| **Image** | Sélecteur de fichier avec aperçu, ajustement (couvrir, contenir, étirer) |
| **Ligne joueur** | Nom, numéro, position, afficher numéro, afficher position, taille de police, couleur du texte |
| **Liste de joueurs** | Titre, liste de joueurs (numéro, nom, position), afficher numéros, afficher positions, couleurs |
| **Buteur** | Nom, numéro, photo (optionnelle), afficher numéro, afficher photo, taille de police, couleur |
| **Assistants** | Noms et numéros des 2 assistants, afficher numéros, taille de police, couleur |
| **Détails du but** | Temps, période, décomptes (match et tournoi), afficher période, afficher décomptes |
| **Membre du staff** | Rôle et nom, taille de police, couleur du texte |
| **Liste du staff** | Titre, liste de membres (rôle + nom), couleur du titre, taille de police, couleur du texte |
| **Tableau de données** | Titre, colonnes (label, alignement), lignes (valeurs par colonne, surlignage), en-tête, couleurs |

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

## Sélection de zone

L'outil de **sélection de zone** permet de dessiner un rectangle sur le canvas. Tous les champs entièrement inclus dans la zone dessinée sont automatiquement sélectionnés et regroupés. Ce regroupement peut ensuite être sauvegardé comme preset pour une réutilisation rapide.

**Utilisation :**
1. Activer l'outil de sélection de zone dans la barre d'outils
2. Cliquer et glisser sur le canvas pour définir la zone
3. Les champs inclus dans la zone sont surlignés
4. Sauvegarder le groupe comme preset si désiré

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

## Historique undo/redo

Chaque action effectuée dans le Layout libre (ajout, suppression, déplacement, redimensionnement, rotation, modification de propriété) est enregistrée dans un historique dédié de 50 niveaux.

| Raccourci | Action |
|-----------|--------|
| `Ctrl+Z` | Annuler la dernière action (revenir en arrière) |
| `Ctrl+Y` | Rétablir l'action annulée (avancer) |

**Regroupement intelligent :** les modifications rapides et successives (par exemple, pendant un glisser-déposer ou un redimensionnement) sont automatiquement regroupées en une seule entrée d'historique grâce à un mécanisme de debounce (300 ms). Cela évite d'encombrer l'historique avec des dizaines d'états intermédiaires et garantit qu'un seul `Ctrl+Z` annule l'ensemble de l'opération de déplacement.

L'historique est propre au Layout libre et ne se mélange pas avec les modifications des autres parties du scoreboard. Il se réinitialise quand on change de type d'affichage.

### Architecture : données du match et éléments visuels

Le Layout libre repose sur une séparation fondamentale entre les **données** et leur **représentation visuelle** :

| Couche | Emplacement | Contenu |
|--------|-------------|---------|
| **Données du match** | Panneau éditeur > Contenu > Équipes | Équipes (codes NOC), noms affichés, scores, drapeaux |
| **Éléments visuels** | Canvas (via la bibliothèque) | Représentations graphiques qui lisent les données du match |

Les éléments visuels sont des **vues** sur les données. Modifier le score dans le panneau éditeur met à jour instantanément tous les éléments Score présents sur le canvas. Ce modèle permet de placer plusieurs fois le même type d'élément (par exemple deux éléments Score pour afficher les deux équipes) sans duplication de données.

### Limites techniques

| Limite | Valeur |
|--------|--------|
| Nombre maximal d'éléments par canvas | 50 |
| Niveaux d'historique undo/redo | 50 |
| Taille de police minimale | 8 px |
| Taille de police maximale | 300 px |
| Taille de grille | 8, 16, 24 ou 32 px |
| Snap de rotation | 15 degrés |

### Bonnes pratiques

**Organisation des couches**
- Placer les arrière-plans (formes, images) en arrière-plan (z-index bas) et les textes au premier plan.
- Utiliser le panneau des couches pour vérifier l'ordre d'empilement.
- Verrouiller les éléments déjà positionnés pour éviter les déplacements accidentels.

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

### Référence rapide

| Besoin | Solution |
|--------|----------|
| Afficher le score des deux équipes | 2 éléments Score (côté Gauche + côté Droite) |
| Afficher les noms des équipes | 2 éléments Nom d'équipe (Gauche + Droite) |
| Afficher les drapeaux seuls | 2 éléments Drapeau (Gauche + Droite) |
| Créer un fond coloré | Élément Forme (rectangle) placé en arrière-plan |
| Ajouter un séparateur visuel | Élément Séparateur (horizontal ou vertical) |
| Reproduire un scoreboard classique | Élément Header complet (catégorie Composés) |
| Intégrer un type prédéfini | Éléments Types 2-14 (catégorie Composés) |
| Déplacer un élément de 1 pixel | Flèches du clavier |
| Déplacer un élément de 10 pixels | Shift + flèches |
| Annuler une erreur | Ctrl+Z (jusqu'à 50 niveaux) |
| Sélectionner tous les éléments | Ctrl+A |
| Dupliquer un élément | Ctrl+D |
| Copier/coller | Ctrl+C puis Ctrl+V |
| Zoom sur le canvas | Ctrl+molette ou Ctrl+=/- |
| Réinitialiser le zoom | Ctrl+0 (ajuster) ou Ctrl+1 (100%) |
