# Manuel utilisateur - Introduction

## Qu'est-ce que le Scoreboard Editor ?

Le Scoreboard Editor est un éditeur visuel de scoreboards pour retransmissions de hockey sur glace. Il permet de concevoir, personnaliser et exploiter en direct des affichages de scores, statistiques et classements destinés à l'incrustation vidéo.

## À qui s'adresse cette application ?

- **Opérateurs scoreboard** : manipulation du scoreboard en direct pendant un match (scores, pénalités, phases)
- **Designers broadcast** : conception des templates visuels avant l'événement (couleurs, polices, layout)
- **Directeurs techniques** : configuration de l'ensemble pour un événement (équipes, phases, personnalisation)

## Prise en main rapide

### Démarrage

1. Ouvrir l'application dans un navigateur web
2. Le scoreboard s'affiche avec les paramètres par défaut

### Les trois vues

| Vue | Accès | Usage |
|-----|-------|-------|
| Éditeur | Page d'accueil (`/`) | Concevoir et personnaliser le scoreboard |
| Opérateur | Bouton "Mode opérateur" ou `/operator` | Contrôle live pendant un match |
| Sortie | Bouton "Ouvrir la sortie" | Fenêtre capturable par OBS/vMix |

### Interface de l'éditeur

L'éditeur se compose de plusieurs zones :

- **Panneau latéral gauche** (360 px) : tous les contrôles de configuration, organisés en sections dépliables
- **Panneau de propriétés** (300 px, optionnel) : s'ouvre automatiquement quand un champ est sélectionné en mode Layout libre. Forme une deuxième colonne entre le panneau éditeur et la preview.
- **Zone de preview droite** : aperçu en temps réel du scoreboard, mis à l'échelle automatiquement

### Barre d'outils

En haut de la zone de preview :

- **Screenshot** : capture le scoreboard en image PNG haute résolution
- **Imprimer** : ouvre le dialogue d'impression du navigateur
- **Mode opérateur** : bascule vers l'interface de contrôle live
- **Ouvrir la sortie** : ouvre le scoreboard dans une fenêtre séparée
- **Manuel utilisateur** : ouvre le manuel intégré à l'application

### Sauvegarde automatique

L'état du scoreboard est sauvegardé automatiquement dans le navigateur. En revenant sur l'application, vous retrouvez votre configuration telle que vous l'avez laissée.

## Navigation dans ce manuel

| Chapitre | Contenu |
|----------|---------|
| [02 - Éditeur](./02-editeur.md) | Guide complet du panneau éditeur |
| [03 - Types d'affichage](./03-body-types.md) | Les 14 types de corps (Layout libre en premier, puis types 1-13) |
| [04 - Personnalisation](./04-personnalisation.md) | Couleurs, polices, dimensions |
| [05 - Horloge et phases](./05-horloge-et-phases.md) | Configuration du temps de jeu |
| [06 - Templates](./06-templates.md) | Sauvegarde et gestion de templates |
| [07 - Mode opérateur](./07-mode-operateur.md) | Utilisation en match live |
| [08 - Sortie broadcast](./08-sortie-broadcast.md) | Intégration OBS/vMix |
| [09 - Capture et impression](./09-capture-impression.md) | Export image et impression |
| [10 - Photos joueurs](./10-photos-joueurs.md) | Gestion des photos de joueurs |
| [11 - Logos](./11-logos.md) | Gestion des logos (équipe, compétition, sponsor) |
| [12 - Animations et export](./12-animations-export.md) | Animations du scoreboard et export vidéo/GIF |
| [13 - Intégrations](./13-integrations.md) | Import rosters, API scores, multi-scoreboard, sync, CasparCG/Viz |
