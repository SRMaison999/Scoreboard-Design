# Manuel utilisateur - Horloge et phases

## Horloge

### Affichage

L'horloge affiche le temps de jeu au format MM:SS. Lorsque le temps restant passe sous un seuil configurable, l'affichage bascule automatiquement en format avec dixiemes de seconde (S.t ou M:SS.t) pour une precision broadcast.

### Seuil des dixiemes de seconde

Par defaut, les dixiemes de seconde apparaissent sous 10 secondes. Ce seuil est configurable via le curseur "Dixiemes de seconde sous" dans la section Horloge de l'editeur :

- **Plage** : de 0 a 120 secondes (par pas de 5 secondes)
- **0 secondes** : les dixiemes ne sont jamais affiches
- **120 secondes** : les dixiemes sont affiches pour les 2 dernieres minutes

Ce seuil s'applique a l'horloge principale et aux temps de penalite.

### Visibilite

L'horloge peut etre masquee via le toggle "Afficher l'horloge" dans la section Horloge de l'editeur.

### Cadre de l'horloge

Le cadre colore autour de l'horloge a 4 modes d'affichage :

| Mode | Comportement |
|------|-------------|
| Jamais | Le cadre n'est jamais affiche |
| Toujours | Le cadre est toujours visible |
| A l'arret | Le cadre apparait uniquement quand l'horloge est arretee |
| En marche | Le cadre apparait uniquement quand l'horloge tourne |

## Phases de match

Le match est organise en phases successives. Chaque phase a :

- Un **nom** (ex: "1st PERIOD", "INTERMISSION")
- Une **duree** (ex: "20:00")
- Une **phase suivante** (transition automatique)

### Phases par defaut

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
- Modifier la duree de chaque phase
- Ajouter de nouvelles phases
- Supprimer des phases existantes
- Definir les transitions entre phases

### Selection de la phase active

Un selecteur dans la section Horloge permet de choisir directement la phase active. Le temps est automatiquement reinitialise a la duree de la phase selectionnee.

## Mode demo

Le mode demo simule le deroulement d'un match :

- **Demarrer** : lance le decompte de l'horloge
- **Arreter** : met en pause le decompte
- **Reinitialiser** : remet le temps a la duree de la phase active

### Comportement automatique

Quand le mode demo est actif :

- L'horloge decremente a raison de 1 dixieme de seconde par cycle (100ms)
- Les penalites sont decrementees simultanement
- Les penalites expirees (temps = 0:00) sont automatiquement supprimees
- A 0:00, l'horloge passe automatiquement a la phase suivante avec sa duree
- Sous le seuil configure, l'affichage passe en dixiemes de seconde
- Si aucune phase suivante n'existe, le mode demo s'arrete

## Penalites et horloge

Les penalites sont liees a l'horloge :

- Quand le mode demo tourne, les penalites sont decrementees en parallele
- Les penalites expirees disparaissent automatiquement
- L'affichage des penalites passe egalement en dixiemes de seconde sous le seuil configure
