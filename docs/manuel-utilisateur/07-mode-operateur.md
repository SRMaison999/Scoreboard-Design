# Manuel utilisateur - Mode opérateur

## Présentation

Le mode opérateur est une interface simplifiée conçue pour le contrôle live du scoreboard pendant un match. Il remplace le panneau éditeur détaillé par des contrôles grands format, tactiles et rapides.

## Accès

- Depuis l'éditeur : cliquer sur le bouton "Mode opérateur" dans la barre d'outils
- Accès direct : naviguer vers `/operator`
- Retour à l'éditeur : bouton "Retour à l'éditeur" en haut du panneau

## Contrôles disponibles

### Scores

Boutons +1 et -1 pour chaque équipe. Les scores sont affichés en grand format entre les boutons.

### Horloge

- **Démarrer** : lance le décompte du temps
- **Arrêter** : met en pause
- **Réinitialiser** : remet le temps à la durée de la phase active

### Phase

Sélecteur de la phase active. Permet de passer rapidement à n'importe quelle phase du match.

### Pénalités

Ajout rapide de pénalités :
- Sélection de l'équipe (gauche ou droite)
- Saisie du numéro de joueur
- Sélection de la durée (2:00, 4:00, 5:00, 10:00)

## Raccourcis clavier

Le mode opérateur active des raccourcis clavier pour un contrôle rapide :

| Raccourci | Action |
|-----------|--------|
| Espace | Démarrer / Arrêter l'horloge |
| R | Réinitialiser l'horloge |
| Flèche gauche | Score -1 équipe 1 |
| Flèche droite | Score +1 équipe 1 |
| Flèche haut | Score +1 équipe 2 |
| Flèche bas | Score -1 équipe 2 |
| P | Phase suivante |
| 1 | Ajouter pénalité 2:00 équipe 1 |
| 2 | Ajouter pénalité 2:00 équipe 2 |
| F11 | Plein écran |

Les raccourcis sont désactivés quand le curseur est dans un champ de saisie.

## Synchronisation

Le mode opérateur synchronise automatiquement le scoreboard avec la fenêtre de sortie via BroadcastChannel. Chaque modification est immédiatement reflétée dans la fenêtre de sortie.

## Conseils d'utilisation en match

- Ouvrir la fenêtre de sortie avant de passer en mode opérateur
- Vérifier que les équipes et la phase initiale sont correctement configurées dans l'éditeur avant de basculer
- Utiliser les raccourcis clavier pour les actions les plus fréquentes (score, horloge)
- Le plein écran (F11) permet de maximiser l'aperçu du scoreboard
