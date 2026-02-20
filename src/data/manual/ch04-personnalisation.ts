import type { ManualChapter } from '@/types/userManual';

export const ch04: ManualChapter = {
  id: 'personnalisation',
  title: 'Personnalisation',
  content: `## Emplacement

Les options de personnalisation se trouvent dans le **panneau gauche**, onglet **Apparence** (ic\u00f4ne de palette, 2e ic\u00f4ne du rail de navigation). Cet onglet contient trois sous-onglets : **Style** (dimensions, presets), **Polices** (choix des polices) et **Couleurs** (14 canaux de couleur et opacit\u00e9).

## Couleurs

**Emplacement** : panneau gauche > onglet **Apparence** > sous-onglet **Couleurs**.

### 14 canaux de couleur

Chaque \u00e9l\u00e9ment textuel et de fond poss\u00e8de sa propre couleur, modifiable ind\u00e9pendamment :

| Canal | \u00c9l\u00e9ment |
|-------|---------|
| Fond haut | Couleur du haut du d\u00e9grad\u00e9 |
| Fond milieu | Couleur du milieu du d\u00e9grad\u00e9 |
| Fond bas | Couleur du bas du d\u00e9grad\u00e9 |
| Noms d'\u00e9quipes | Texte des codes pays |
| Scores | Chiffres des scores |
| Fond scores | Cadre derri\u00e8re les scores |
| Horloge | Texte du temps |
| Cadre horloge | Fond du cadre de l'horloge |
| P\u00e9riode | Texte du nom de la p\u00e9riode |
| Titres | Texte des titres |
| Valeurs stats | Chiffres des statistiques |
| Labels stats | Texte des labels de statistiques |
| Temps p\u00e9nalit\u00e9 | Temps de p\u00e9nalit\u00e9 |
| Num\u00e9ro p\u00e9nalit\u00e9 | Num\u00e9ro du joueur p\u00e9nalis\u00e9 |

### Opacit\u00e9

Chaque couleur poss\u00e8de un slider d'opacit\u00e9 (0-100).

### Presets de couleurs

5 th\u00e8mes pr\u00e9d\u00e9finis :

| Preset | Description |
|--------|-------------|
| OMEGA Blue | Th\u00e8me bleu hockey (par d\u00e9faut) |
| Dark Mode | Fond noir avec accents cyan |
| Ice White | Tons bleu clair, texte fonc\u00e9 |
| Hockey Red | Rouge profond |
| Arena Green | Vert stade avec accents n\u00e9on |

## Polices

**Emplacement** : panneau gauche > onglet **Apparence** > sous-onglet **Polices**.

### 3 zones de police

| Zone | \u00c9l\u00e9ments concern\u00e9s | Police par d\u00e9faut |
|------|-------------------|-------------------|
| \u00c9quipes | Noms d'\u00e9quipes, scores | Oswald |
| Horloge | Horloge, p\u00e9riode | Barlow Condensed |
| Corps | Titres, stats, p\u00e9nalit\u00e9s | Barlow Condensed |

25 polices professionnelles sont disponibles, organis\u00e9es par cat\u00e9gories (Sport, Condens\u00e9, Moderne, Display, Monospace, Serif). En mode Layout libre, chaque champ peut avoir sa propre police ind\u00e9pendante.

## Dimensions du template

**Emplacement** : panneau gauche > onglet **Apparence** > sous-onglet **Style**.

### Presets de r\u00e9solution

| Preset | Dimensions | Ratio |
|--------|-----------|-------|
| Full HD | 1920 x 1080 | 16:9 |
| 4K UHD | 3840 x 2160 | 16:9 |
| HD 720p | 1280 x 720 | 16:9 |
| SD 4:3 | 1440 x 1080 | 4:3 |
| Carr\u00e9 | 1080 x 1080 | 1:1 |
| Ultra-wide | 2560 x 1080 | 21:9 |

Des dimensions personnalis\u00e9es sont \u00e9galement possibles.`,
};
