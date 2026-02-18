import type { ManualChapter } from '@/types/userManual';

export const ch05: ManualChapter = {
  id: 'horloge',
  title: 'Horloge et phases',
  content: `## Emplacement

Les controles de l'horloge et des phases se trouvent dans le **panneau gauche**, onglet **Horloge** (icone d'horloge, 3e icone du rail de navigation).

## Horloge

### Affichage

L'horloge affiche le temps de jeu au format MM:SS. Lorsque le temps restant passe sous un seuil configurable, l'affichage bascule automatiquement en format avec dixi\u00e8mes de seconde.

### Seuil des dixi\u00e8mes de seconde

Par d\u00e9faut, les dixi\u00e8mes de seconde apparaissent sous 10 secondes. Ce seuil est configurable de 0 \u00e0 120 secondes (par pas de 5 secondes).

### Visibilit\u00e9

L'horloge peut \u00eatre masqu\u00e9e via le toggle "Afficher l'horloge".

### Cadre de l'horloge

Le cadre color\u00e9 autour de l'horloge a 4 modes d'affichage :

| Mode | Comportement |
|------|-------------|
| Jamais | Le cadre n'est jamais affich\u00e9 |
| Toujours | Le cadre est toujours visible |
| \u00c0 l'arr\u00eat | Le cadre appara\u00eet uniquement quand l'horloge est arr\u00eat\u00e9e |
| En marche | Le cadre appara\u00eet uniquement quand l'horloge tourne |

## Phases de match

Le match est organis\u00e9 en phases successives. Chaque phase a un nom, une dur\u00e9e et une phase suivante.

### Personnalisation

Vous pouvez modifier le nom et la dur\u00e9e de chaque phase, ajouter de nouvelles phases, supprimer des phases existantes et d\u00e9finir les transitions entre phases.

## Mode d\u00e9mo

Le mode d\u00e9mo simule le d\u00e9roulement d'un match :

- **D\u00e9marrer** : lance le d\u00e9compte de l'horloge
- **Arr\u00eater** : met en pause le d\u00e9compte
- **R\u00e9initialiser** : remet le temps \u00e0 la dur\u00e9e de la phase active

Quand le mode d\u00e9mo est actif, les p\u00e9nalit\u00e9s sont d\u00e9cr\u00e9ment\u00e9es simultan\u00e9ment et les p\u00e9nalit\u00e9s expir\u00e9es sont automatiquement supprim\u00e9es.`,
};
