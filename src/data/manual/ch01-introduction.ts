import type { ManualChapter } from '@/types/userManual';

export const ch01: ManualChapter = {
  id: 'introduction',
  title: 'Introduction',
  content: `## Qu'est-ce que le Scoreboard Editor ?

Le Scoreboard Editor est un \u00e9diteur visuel de scoreboards pour retransmissions de hockey sur glace. Il permet de concevoir, personnaliser et exploiter en direct des affichages de scores, statistiques et classements destin\u00e9s \u00e0 l'incrustation vid\u00e9o.

## \u00c0 qui s'adresse cette application ?

- **Op\u00e9rateurs scoreboard** : manipulation du scoreboard en direct pendant un match (scores, p\u00e9nalit\u00e9s, phases)
- **Designers broadcast** : conception des templates visuels avant l'\u00e9v\u00e9nement (couleurs, polices, layout)
- **Directeurs techniques** : configuration de l'ensemble pour un \u00e9v\u00e9nement (\u00e9quipes, phases, personnalisation)

## Prise en main rapide

### D\u00e9marrage

1. Ouvrir l'application dans un navigateur web
2. Le scoreboard s'affiche avec les param\u00e8tres par d\u00e9faut

### Les trois vues

| Vue | Acc\u00e8s | Usage |
|-----|-------|-------|
| \u00c9diteur | Page d'accueil | Concevoir et personnaliser le scoreboard |
| Op\u00e9rateur | Bouton "Mode op\u00e9rateur" | Contr\u00f4le live pendant un match |
| Sortie | Bouton "Ouvrir la sortie" | Fen\u00eatre capturable par OBS/vMix |

### Interface de l'\u00e9diteur

L'\u00e9diteur se divise en deux zones :

- **Panneau lat\u00e9ral gauche** : tous les contr\u00f4les de configuration, organis\u00e9s en sections d\u00e9pliables
- **Zone de preview droite** : aper\u00e7u en temps r\u00e9el du scoreboard

### Barre d'outils

En haut de l'\u00e9cran :

- **Screenshot** : capture le scoreboard en image PNG haute r\u00e9solution
- **Imprimer** : ouvre le dialogue d'impression du navigateur
- **Mode op\u00e9rateur** : bascule vers l'interface de contr\u00f4le live
- **Ouvrir la sortie** : ouvre le scoreboard dans une fen\u00eatre s\u00e9par\u00e9e

### Sauvegarde automatique

L'\u00e9tat du scoreboard est sauvegard\u00e9 automatiquement dans le navigateur. En revenant sur l'application, vous retrouvez votre configuration telle que vous l'avez laiss\u00e9e.`,
};
