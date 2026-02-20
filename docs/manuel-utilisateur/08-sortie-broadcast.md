# Manuel utilisateur - Sortie broadcast

## Fenêtre de sortie

La fenêtre de sortie affiche le scoreboard dans une fenêtre séparée, sans interface éditeur. Cette fenêtre est conçue pour être capturée par un logiciel de diffusion (OBS, vMix, Wirecast).

## Ouvrir la fenêtre de sortie

Cliquer sur le bouton "Ouvrir la sortie" dans la barre d'outils de l'éditeur ou du mode opérateur. Une nouvelle fenêtre s'ouvre aux dimensions du scoreboard.

## Synchronisation

La fenêtre de sortie reçoit automatiquement les mises à jour du scoreboard en temps réel. Chaque modification dans l'éditeur ou le mode opérateur est immédiatement reflétée.

La synchronisation utilise le BroadcastChannel du navigateur :
- Fonctionne uniquement entre fenêtres du même domaine
- Unidirectionnelle : l'éditeur/opérateur envoie, la sortie reçoit
- Temps réel, sans délai perceptible

## Intégration OBS

### Capture de fenêtre

1. Dans OBS, ajouter une source "Capture de fenêtre"
2. Sélectionner la fenêtre de sortie du Scoreboard Editor
3. Ajuster la taille et la position dans la scène OBS

### Source navigateur

1. Dans OBS, ajouter une source "Navigateur"
2. Entrer l'URL `/output` de l'application
3. Définir les dimensions (1920x1080 ou selon le template)

## Intégration vMix

1. Ajouter une entrée "Web Browser"
2. Entrer l'URL de la fenêtre de sortie
3. Définir la résolution souhaitée

## Intégration Wirecast

1. Ajouter une source "Web Page"
2. Entrer l'URL de la fenêtre de sortie
3. Configurer les dimensions

## Fond transparent

Le scoreboard peut être utilisé avec un fond transparent pour l'incrustation en superposition. Le dégradé de fond peut être rendu semi-transparent via les sliders d'opacité des couleurs de fond (bgTop, bgMid, bgBot).

## Conseils

- Utiliser la résolution Full HD (1920x1080) pour une compatibilité maximale
- La fenêtre de sortie doit rester ouverte pendant toute la diffusion
- Si la fenêtre est accidentellement fermée, la rouvrir depuis l'éditeur
- Vérifier que le navigateur n'est pas en mode "économie d'énergie" (peut ralentir les mises à jour)
