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
| [03 - Layout libre](./03-layout-libre.md) | Composition sur mesure avec canvas libre |
| [04 - Types d'affichage](./04-body-types.md) | Les 13 types de corps prédéfinis (types 1-13) |
| [05 - Personnalisation](./05-personnalisation.md) | Couleurs, polices, dimensions |
| [06 - Horloge et phases](./06-horloge-et-phases.md) | Configuration du temps de jeu |
| [07 - Templates](./07-templates.md) | Sauvegarde et gestion de templates |
| [08 - Mode opérateur](./08-mode-operateur.md) | Utilisation en match live |
| [09 - Sortie broadcast](./09-sortie-broadcast.md) | Intégration OBS/vMix |
| [10 - Capture et impression](./10-capture-impression.md) | Export image et impression |
| [11 - Photos joueurs](./11-photos-joueurs.md) | Gestion des photos de joueurs |
| [12 - Logos](./12-logos.md) | Gestion des logos (équipe, compétition, sponsor) |
| [13 - Animations et export](./13-animations-export.md) | Animations du scoreboard et export vidéo/GIF |
| [14 - Intégrations](./14-integrations.md) | Import rosters, API scores, multi-scoreboard, sync, CasparCG/Viz |
