# Manuel utilisateur - Personnalisation

## Couleurs

### 14 canaux de couleur

Chaque élément textuel et de fond possède sa propre couleur, modifiable indépendamment :

| Canal | Élément |
|-------|---------|
| Fond haut | Couleur du haut du dégradé |
| Fond milieu | Couleur du milieu du dégradé |
| Fond bas | Couleur du bas du dégradé |
| Noms d'équipes | Texte des codes pays |
| Scores | Chiffres des scores |
| Fond scores | Cadre derrière les scores |
| Horloge | Texte du temps |
| Cadre horloge | Fond du cadre de l'horloge |
| Période | Texte du nom de la période |
| Titres | Texte des titres |
| Valeurs stats | Chiffres des statistiques |
| Labels stats | Texte des labels de statistiques |
| Temps pénalité | Temps de pénalité |
| Numéro pénalité | Numéro du joueur pénalisé |

### Opacité

Chaque couleur possède un slider d'opacité (0-100). La valeur 0 correspond à une couleur opaque, la valeur 100 à une couleur totalement transparente.

### Presets de couleurs

5 thèmes prédéfinis permettent de changer l'apparence globale en un clic :

| Preset | Description |
|--------|-------------|
| OMEGA Blue | Thème bleu hockey (par défaut) |
| Dark Mode | Fond noir avec accents cyan |
| Ice White | Tons bleu clair, texte foncé |
| Hockey Red | Rouge profond |
| Arena Green | Vert stade avec accents néon |

Un preset modifie toutes les couleurs et opacités simultanément. Après application, chaque couleur reste modifiable individuellement.

### Mode d'arrière-plan

Deux modes disponibles :

- **Uniforme** : une seule couleur de fond
- **Dégradé** : transition progressive entre 3 couleurs (haut, milieu, bas)

## Polices

### 3 zones de police

| Zone | Éléments concernés | Police par défaut |
|------|-------------------|-------------------|
| Équipes | Noms d'équipes, scores | Oswald |
| Horloge | Horloge, période | Barlow Condensed |
| Corps | Titres, stats, pénalités | Barlow Condensed |

### 25 polices disponibles

Les polices sont organisées par catégories dans le sélecteur :

- **Sport / Impact** : Oswald, Bebas Neue, Anton, Russo One, Archivo Black, Black Ops One, Bungee
- **Condensed** : Barlow Condensed, Saira Condensed, Roboto Condensed, Fjalla One, Teko
- **Modernes** : Montserrat, Inter, Poppins, Rajdhani, Chakra Petch
- **Display** : Righteous, Audiowide, Exo 2, Orbitron
- **Monospace** : Share Tech Mono, JetBrains Mono
- **Serif** : Playfair Display, Bitter

Toutes sont des polices professionnelles chargées automatiquement depuis Google Fonts. Le sélecteur affiche chaque police dans son propre rendu pour faciliter le choix.

## Tailles de police

Chaque élément textuel a un slider de taille individuel :

| Élément | Plage |
|---------|-------|
| Noms d'équipes | 24-72px |
| Scores | 40-120px |
| Horloge | 40-120px |
| Période | 12-40px |
| Titres | 16-60px |
| Valeurs stats | 24-120px |
| Labels stats | 16-60px |
| Temps de pénalité | 30-80px |
| Numéros de pénalité | 30-80px |

### Mise à l'échelle du corps

En plus des tailles individuelles ci-dessus, un **slider de mise à l'échelle** permet d'ajuster proportionnellement toutes les tailles de texte du corps actif. Ce slider est contextuel : il affiche le nom du type de corps actuellement sélectionné.

| Paramètre | Valeur |
|-----------|--------|
| Plage | 50% - 200% |
| Pas | 5% |
| Défaut | 100% |

Chaque type de corps (1 à 13) possède son propre facteur d'échelle indépendant. Modifier le slider pour un type de corps n'affecte pas les autres.

**Exemples d'utilisation :**
- À 100% (défaut), les tailles sont celles d'origine
- À 150%, tous les textes du corps sont agrandis de 50%
- À 75%, tous les textes du corps sont réduits de 25%

Les 14 types de corps concernés :

| Type | Nom |
|------|-----|
| Layout libre | Composition sur mesure (en tête de liste) |
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

Le Layout libre n'utilise pas la mise à l'échelle proportionnelle globale. Chaque élément possède sa propre taille configurable individuellement dans le panneau de propriétés (voir chapitre 3, Layout libre).

## Dimensions du template

### Presets de résolution

| Preset | Dimensions | Ratio |
|--------|-----------|-------|
| Full HD | 1920 x 1080 | 16:9 |
| 4K UHD | 3840 x 2160 | 16:9 |
| HD 720p | 1280 x 720 | 16:9 |
| SD 4:3 | 1440 x 1080 | 4:3 |
| Carré | 1080 x 1080 | 1:1 |
| Ultra-wide | 2560 x 1080 | 21:9 |

Des dimensions personnalisées sont également possibles en saisissant la largeur et la hauteur souhaitées.

Le preview s'adapte automatiquement à la résolution choisie grâce au redimensionnement proportionnel.
