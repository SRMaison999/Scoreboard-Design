# Manuel utilisateur - Sortie broadcast

## Fenetre de sortie

La fenetre de sortie affiche le scoreboard dans une fenetre separee, sans interface editeur. Cette fenetre est concue pour etre capturee par un logiciel de diffusion (OBS, vMix, Wirecast).

## Ouvrir la fenetre de sortie

Cliquer sur le bouton "Ouvrir la sortie" dans la barre d'outils de l'editeur ou du mode operateur. Une nouvelle fenetre s'ouvre aux dimensions du scoreboard.

## Synchronisation

La fenetre de sortie recoit automatiquement les mises a jour du scoreboard en temps reel. Chaque modification dans l'editeur ou le mode operateur est immediatement refletee.

La synchronisation utilise le BroadcastChannel du navigateur :
- Fonctionne uniquement entre fenetres du meme domaine
- Unidirectionnelle : l'editeur/operateur envoie, la sortie recoit
- Temps reel, sans delai perceptible

## Integration OBS

### Capture de fenetre

1. Dans OBS, ajouter une source "Capture de fenetre"
2. Selectionner la fenetre de sortie du Scoreboard Editor
3. Ajuster la taille et la position dans la scene OBS

### Source navigateur

1. Dans OBS, ajouter une source "Navigateur"
2. Entrer l'URL `/output` de l'application
3. Definir les dimensions (1920x1080 ou selon le template)

## Integration vMix

1. Ajouter une entree "Web Browser"
2. Entrer l'URL de la fenetre de sortie
3. Definir la resolution souhaitee

## Integration Wirecast

1. Ajouter une source "Web Page"
2. Entrer l'URL de la fenetre de sortie
3. Configurer les dimensions

## Fond transparent

Le scoreboard peut etre utilise avec un fond transparent pour l'incrustation en superposition. Le degrade de fond peut etre rendu semi-transparent via les sliders d'opacite des couleurs de fond (bgTop, bgMid, bgBot).

## Conseils

- Utiliser la resolution Full HD (1920x1080) pour une compatibilite maximale
- La fenetre de sortie doit rester ouverte pendant toute la diffusion
- Si la fenetre est accidentellement fermee, la rouvrir depuis l'editeur
- Verifier que le navigateur n'est pas en mode "economie d'energie" (peut ralentir les mises a jour)
