# Manuel utilisateur - Mode operateur

## Presentation

Le mode operateur est une interface simplifiee concue pour le controle live du scoreboard pendant un match. Il remplace le panneau editeur detaille par des controles grands format, tactiles et rapides.

## Acces

- Depuis l'editeur : cliquer sur le bouton "Mode operateur" dans la barre d'outils
- Acces direct : naviguer vers `/operator`
- Retour a l'editeur : bouton "Retour a l'editeur" en haut du panneau

## Controles disponibles

### Scores

Boutons +1 et -1 pour chaque equipe. Les scores sont affiches en grand format entre les boutons.

### Horloge

- **Demarrer** : lance le decompte du temps
- **Arreter** : met en pause
- **Reinitialiser** : remet le temps a la duree de la phase active

### Phase

Selecteur de la phase active. Permet de passer rapidement a n'importe quelle phase du match.

### Penalites

Ajout rapide de penalites :
- Selection de l'equipe (gauche ou droite)
- Saisie du numero de joueur
- Selection de la duree (2:00, 4:00, 5:00, 10:00)

## Raccourcis clavier

Le mode operateur active des raccourcis clavier pour un controle rapide :

| Raccourci | Action |
|-----------|--------|
| Espace | Demarrer / Arreter l'horloge |
| R | Reinitialiser l'horloge |
| Fleche gauche | Score -1 equipe 1 |
| Fleche droite | Score +1 equipe 1 |
| Fleche haut | Score +1 equipe 2 |
| Fleche bas | Score -1 equipe 2 |
| P | Phase suivante |
| 1 | Ajouter penalite 2:00 equipe 1 |
| 2 | Ajouter penalite 2:00 equipe 2 |
| F11 | Plein ecran |

Les raccourcis sont desactives quand le curseur est dans un champ de saisie.

## Synchronisation

Le mode operateur synchronise automatiquement le scoreboard avec la fenetre de sortie via BroadcastChannel. Chaque modification est immediatement refletee dans la fenetre de sortie.

## Conseils d'utilisation en match

- Ouvrir la fenetre de sortie avant de passer en mode operateur
- Verifier que les equipes et la phase initiale sont correctement configurees dans l'editeur avant de basculer
- Utiliser les raccourcis clavier pour les actions les plus frequentes (score, horloge)
- Le plein ecran (F11) permet de maximiser l'apercu du scoreboard
