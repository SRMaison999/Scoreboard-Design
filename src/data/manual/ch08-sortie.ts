import type { ManualChapter } from '@/types/userManual';

export const ch08: ManualChapter = {
  id: 'sortie',
  title: 'Sortie broadcast',
  content: `## Fen\u00eatre de sortie

La fen\u00eatre de sortie affiche le scoreboard dans une fen\u00eatre s\u00e9par\u00e9e, sans interface \u00e9diteur. Cette fen\u00eatre est con\u00e7ue pour \u00eatre captur\u00e9e par un logiciel de diffusion (OBS, vMix, Wirecast).

## Ouvrir la fen\u00eatre de sortie

Cliquer sur le bouton "Ouvrir la sortie" dans la barre d'outils.

## Synchronisation

La fen\u00eatre de sortie re\u00e7oit automatiquement les mises \u00e0 jour du scoreboard en temps r\u00e9el. La synchronisation utilise le BroadcastChannel du navigateur.

## Int\u00e9gration OBS

### Capture de fen\u00eatre

1. Dans OBS, ajouter une source "Capture de fen\u00eatre"
2. S\u00e9lectionner la fen\u00eatre de sortie du Scoreboard Editor
3. Ajuster la taille et la position dans la sc\u00e8ne OBS

### Source navigateur

1. Dans OBS, ajouter une source "Navigateur"
2. Entrer l'URL /output de l'application
3. D\u00e9finir les dimensions (1920x1080 ou selon le template)

## Int\u00e9gration vMix

1. Ajouter une entr\u00e9e "Web Browser"
2. Entrer l'URL de la fen\u00eatre de sortie
3. D\u00e9finir la r\u00e9solution souhait\u00e9e

## Fond transparent

Le scoreboard peut \u00eatre utilis\u00e9 avec un fond transparent pour l'incrustation en superposition. Le d\u00e9grad\u00e9 de fond peut \u00eatre rendu semi-transparent via les sliders d'opacit\u00e9.`,
};
