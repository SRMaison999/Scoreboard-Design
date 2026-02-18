# Manuel utilisateur - Personnalisation

## Couleurs

### 14 canaux de couleur

Chaque element textuel et de fond possede sa propre couleur, modifiable independamment :

| Canal | Element |
|-------|---------|
| Fond haut | Couleur du haut du degrade |
| Fond milieu | Couleur du milieu du degrade |
| Fond bas | Couleur du bas du degrade |
| Noms d'equipes | Texte des codes pays |
| Scores | Chiffres des scores |
| Fond scores | Cadre derriere les scores |
| Horloge | Texte du temps |
| Cadre horloge | Fond du cadre de l'horloge |
| Periode | Texte du nom de la periode |
| Titres | Texte des titres |
| Valeurs stats | Chiffres des statistiques |
| Labels stats | Texte des labels de statistiques |
| Temps penalite | Temps de penalite |
| Numero penalite | Numero du joueur penalise |

### Opacite

Chaque couleur possede un slider d'opacite (0-100). La valeur 0 correspond a une couleur opaque, la valeur 100 a une couleur totalement transparente.

### Presets de couleurs

5 themes predefinis permettent de changer l'apparence globale en un clic :

| Preset | Description |
|--------|-------------|
| OMEGA Blue | Theme bleu hockey (par defaut) |
| Dark Mode | Fond noir avec accents cyan |
| Ice White | Tons bleu clair, texte fonce |
| Hockey Red | Rouge profond |
| Arena Green | Vert stade avec accents neon |

Un preset modifie toutes les couleurs et opacites simultanement. Apres application, chaque couleur reste modifiable individuellement.

### Mode d'arriere-plan

Deux modes disponibles :

- **Uniforme** : une seule couleur de fond
- **Degrade** : transition progressive entre 3 couleurs (haut, milieu, bas)

## Polices

### 3 zones de police

| Zone | Elements concernes | Police par defaut |
|------|-------------------|-------------------|
| Equipes | Noms d'equipes, scores | Oswald |
| Horloge | Horloge, periode | Barlow Condensed |
| Corps | Titres, stats, penalites | Barlow Condensed |

### 10 polices disponibles

Oswald, Barlow Condensed, Bebas Neue, Teko, Anton, Rajdhani, Russo One, Orbitron, Saira Condensed, Chakra Petch.

Toutes sont des polices professionnelles adaptees a l'affichage sportif, chargees automatiquement depuis Google Fonts.

## Tailles de police

Chaque element textuel a un slider de taille individuel :

| Element | Plage |
|---------|-------|
| Noms d'equipes | 24-72px |
| Scores | 40-120px |
| Horloge | 40-120px |
| Periode | 12-40px |
| Titres | 16-60px |
| Valeurs stats | 24-120px |
| Labels stats | 16-60px |
| Temps de penalite | 30-80px |
| Numeros de penalite | 30-80px |

### Mise a l'echelle du corps

En plus des tailles individuelles ci-dessus, un **slider de mise a l'echelle** permet d'ajuster proportionnellement toutes les tailles de texte du corps actif. Ce slider est contextuel : il affiche le nom du type de corps actuellement selectionne.

| Parametre | Valeur |
|-----------|--------|
| Plage | 50% - 200% |
| Pas | 5% |
| Defaut | 100% |

Chaque type de corps (1 a 13) possede son propre facteur d'echelle independant. Modifier le slider pour un type de corps n'affecte pas les autres.

**Exemples d'utilisation :**
- A 100% (defaut), les tailles sont celles d'origine
- A 150%, tous les textes du corps sont agrandis de 50%
- A 75%, tous les textes du corps sont reduits de 25%

Les 14 types de corps concernés :

| Type | Nom |
|------|-----|
| 1 | Stats centrées |
| 2 | Stats gauche/droite |
| 3 | Stats joueur |
| 4 | Célébration de but |
| 5 | Fiche joueur |
| 6 | Classement |
| 7 | Score final |
| 8 | Texte libre |
| 9 | Face à face |
| 10 | Chronologie |
| 11 | Diagramme en barres |
| 12 | Liste de joueurs |
| 13 | Calendrier |
| 14 | Layout libre |

Le type 14 (Layout libre) n'utilise pas la mise à l'échelle proportionnelle. Chaque élément possède sa propre taille configurable individuellement dans le panneau de propriétés (voir chapitre 3, Type 14).

## Dimensions du template

### Presets de resolution

| Preset | Dimensions | Ratio |
|--------|-----------|-------|
| Full HD | 1920 x 1080 | 16:9 |
| 4K UHD | 3840 x 2160 | 16:9 |
| HD 720p | 1280 x 720 | 16:9 |
| SD 4:3 | 1440 x 1080 | 4:3 |
| Carre | 1080 x 1080 | 1:1 |
| Ultra-wide | 2560 x 1080 | 21:9 |

Des dimensions personnalisees sont egalement possibles en saisissant la largeur et la hauteur souhaitees.

Le preview s'adapte automatiquement a la resolution choisie grace au redimensionnement proportionnel.
