# Manuel utilisateur - Horloge et phases

## Horloge

### Affichage

L'horloge affiche le temps de jeu au format MM:SS. Lorsque le temps restant passe sous un seuil configurable, l'affichage bascule automatiquement en format avec dixièmes de seconde (S.t ou M:SS.t) pour une précision broadcast.

### Seuil des dixièmes de seconde

Par défaut, les dixièmes de seconde apparaissent sous 10 secondes. Ce seuil est configurable via le curseur "Dixièmes de seconde sous" dans la section Horloge de l'éditeur :

- **Plage** : de 0 à 120 secondes (par pas de 5 secondes)
- **0 secondes** : les dixièmes ne sont jamais affichés
- **120 secondes** : les dixièmes sont affichés pour les 2 dernières minutes

Ce seuil s'applique à l'horloge principale et aux temps de pénalité.

### Visibilité

L'horloge peut être masquée via le toggle "Afficher l'horloge" dans la section Horloge de l'éditeur.

### Cadre de l'horloge

Le cadre coloré autour de l'horloge a 4 modes d'affichage :

| Mode | Comportement |
|------|-------------|
| Jamais | Le cadre n'est jamais affiché |
| Toujours | Le cadre est toujours visible |
| À l'arrêt | Le cadre apparaît uniquement quand l'horloge est arrêtée |
| En marche | Le cadre apparaît uniquement quand l'horloge tourne |

## Phases de match

Le match est organisé en phases successives. Chaque phase a :

- Un **nom** (ex: "1st PERIOD", "INTERMISSION")
- Une **durée** (ex: "20:00")
- Une **phase suivante** (transition automatique)

### Phases par défaut

```
TO WARM UP (10:00) -> WARM UP (20:00) -> TO GAME (5:00)
-> 1st PERIOD (20:00) -> 1st INTERMISSION (15:00)
-> 2nd PERIOD (20:00) -> 2nd INTERMISSION (15:00)
-> 3rd PERIOD (20:00) -> 3rd INTERMISSION (15:00)
OVERTIME (5:00), OVERTIME 2 (5:00)
```

### Personnalisation

Dans la section "Phases", vous pouvez :

- Modifier le nom de chaque phase
- Modifier la durée de chaque phase
- Ajouter de nouvelles phases
- Supprimer des phases existantes
- Définir les transitions entre phases

### Sélection de la phase active

Un sélecteur dans la section Horloge permet de choisir directement la phase active. Le temps est automatiquement réinitialisé à la durée de la phase sélectionnée.

## Mode démo

Le mode démo simule le déroulement d'un match :

- **Démarrer** : lance le décompte de l'horloge
- **Arrêter** : met en pause le décompte
- **Réinitialiser** : remet le temps à la durée de la phase active

### Comportement automatique

Quand le mode démo est actif :

- L'horloge décrémente à raison de 1 dixième de seconde par cycle (100ms)
- Les pénalités sont décrémentées simultanément
- Les pénalités expirées (temps = 0:00) sont automatiquement supprimées
- À 0:00, l'horloge passe automatiquement à la phase suivante avec sa durée
- Sous le seuil configuré, l'affichage passe en dixièmes de seconde
- Si aucune phase suivante n'existe, le mode démo s'arrête

## Pénalités et horloge

Les pénalités sont liées à l'horloge :

- Quand le mode démo tourne, les pénalités sont décrémentées en parallèle
- Les pénalités expirées disparaissent automatiquement
- L'affichage des pénalités passe également en dixièmes de seconde sous le seuil configuré
