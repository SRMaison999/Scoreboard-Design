import type { ManualChapter } from '@/types/userManual';

export const ch07: ManualChapter = {
  id: 'operateur',
  title: 'Mode op\u00e9rateur',
  content: `## Pr\u00e9sentation

Le mode op\u00e9rateur est une interface simplifi\u00e9e con\u00e7ue pour le contr\u00f4le live du scoreboard pendant un match. Il remplace le panneau \u00e9diteur d\u00e9taill\u00e9 par des contr\u00f4les grands format, tactiles et rapides.

## O\u00f9 trouver le bouton

Le bouton **Mode op\u00e9rateur** se trouve dans la **barre d'outils en haut \u00e0 droite** de l'\u00e9cran (3e bouton, avec l'ic\u00f4ne radio).

### Acc\u00e8s alternatifs

- Acc\u00e8s direct : naviguer vers /operator dans le navigateur
- Retour \u00e0 l'\u00e9diteur : bouton "Retour \u00e0 l'\u00e9diteur" en haut du panneau op\u00e9rateur

## Contr\u00f4les disponibles

### Scores

Boutons +1 et -1 pour chaque \u00e9quipe. Les scores sont affich\u00e9s en grand format entre les boutons.

### Horloge

- **D\u00e9marrer** : lance le d\u00e9compte du temps
- **Arr\u00eater** : met en pause
- **R\u00e9initialiser** : remet le temps \u00e0 la dur\u00e9e de la phase active

### Phase

S\u00e9lecteur de la phase active. Permet de passer rapidement \u00e0 n'importe quelle phase du match.

### P\u00e9nalit\u00e9s

Ajout rapide de p\u00e9nalit\u00e9s : s\u00e9lection de l'\u00e9quipe, saisie du num\u00e9ro de joueur, s\u00e9lection de la dur\u00e9e.

## Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| Espace | D\u00e9marrer / Arr\u00eater l'horloge |
| R | R\u00e9initialiser l'horloge |
| Fl\u00e8che gauche | Score -1 \u00e9quipe 1 |
| Fl\u00e8che droite | Score +1 \u00e9quipe 1 |
| Fl\u00e8che haut | Score +1 \u00e9quipe 2 |
| Fl\u00e8che bas | Score -1 \u00e9quipe 2 |
| P | Phase suivante |
| 1 | Ajouter p\u00e9nalit\u00e9 2:00 \u00e9quipe 1 |
| 2 | Ajouter p\u00e9nalit\u00e9 2:00 \u00e9quipe 2 |
| F11 | Plein \u00e9cran |`,
};
