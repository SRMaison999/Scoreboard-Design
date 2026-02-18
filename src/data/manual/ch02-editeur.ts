import type { ManualChapter } from '@/types/userManual';

export const ch02: ManualChapter = {
  id: 'editeur',
  title: 'Panneau \u00e9diteur',
  content: `Le panneau \u00e9diteur est la colonne de gauche de l'application. Il contient tous les contr\u00f4les pour configurer le scoreboard.

## Navigation

### Rail d'ic\u00f4nes (navigation principale)

Un rail vertical d'ic\u00f4nes sur le bord gauche permet de basculer entre 5 groupes :

| Ic\u00f4ne | Groupe | Description |
|-------|--------|-------------|
| Fichier | **Contenu** | \u00c9quipes, scores, body type, p\u00e9nalit\u00e9s, m\u00e9dias |
| Palette | **Apparence** | Dimensions, polices, couleurs, fond |
| Horloge | **Horloge** | Temps de jeu, phases, d\u00e9mo |
| Film | **Animations** | Animations d'entr\u00e9e/sortie, export vid\u00e9o/GIF |
| Radio | **Int\u00e9grations** | Scores en direct, multi-scoreboard, sync, broadcast |

### Sous-onglets (navigation secondaire)

- **Contenu** : G\u00e9n\u00e9ral | \u00c9quipes | Match | M\u00e9dias
- **Apparence** : Style | Polices | Couleurs
- **Horloge** : section unique
- **Animations** : Animations | Export
- **Int\u00e9grations** : Live | Multi | Sync | Broadcast

### Sections d\u00e9pliables

\u00c0 l'int\u00e9rieur de chaque sous-onglet, les sections peuvent \u00eatre repli\u00e9es en cliquant sur leur titre.

## Groupe Contenu

### Sous-onglet G\u00e9n\u00e9ral

- **Type de corps** : choix du type d'affichage (1-14)
- **Afficher les p\u00e9nalit\u00e9s** : active/d\u00e9sactive les colonnes de p\u00e9nalit\u00e9s

### Sous-onglet \u00c9quipes

- **En-t\u00eate** : s\u00e9lection des \u00e9quipes (31 nations), saisie des scores
- **Titres** : texte(s) affich\u00e9(s) dans le corps du scoreboard
- **Section sp\u00e9cifique au body type** : contenu variable

### Sous-onglet Match

- **Temps morts** : activation et compteur de temps morts par \u00e9quipe
- **Tirs au but** : activation et saisie des tentatives
- **P\u00e9nalit\u00e9s** : ajout/suppression pour chaque \u00e9quipe

### Sous-onglet M\u00e9dias

- **Photos des joueurs** : galerie de photos par \u00e9quipe et num\u00e9ro
- **Logos** : logos d'\u00e9quipes, comp\u00e9tition et sponsor

## Groupe Apparence

### Sous-onglet Style

- **Dimensions du template** : taille du canvas (presets HD/4K ou personnalis\u00e9)
- **Arri\u00e8re-plan** : aucun, image ou vid\u00e9o de fond

### Sous-onglet Polices

- **Polices** : 3 zones de police ind\u00e9pendantes (\u00e9quipes, horloge, corps)
- **Tailles de police** : contr\u00f4le granulaire de chaque \u00e9l\u00e9ment textuel

### Sous-onglet Couleurs

- **Couleurs** : 14 canaux de couleur avec opacit\u00e9 individuelle
- **Presets** : sch\u00e9mas de couleurs pr\u00e9d\u00e9finies`,
};
