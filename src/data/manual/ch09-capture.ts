import type { ManualChapter } from '@/types/userManual';

export const ch09: ManualChapter = {
  id: 'capture',
  title: 'Capture et impression',
  content: `## Screenshot (capture d'\u00e9cran)

### O\u00f9 trouver le bouton

Le bouton **Capture** se trouve dans la **barre d'outils en haut \u00e0 droite** de l'\u00e9cran (1er bouton, avec l'ic\u00f4ne appareil photo).

### Caract\u00e9ristiques

- **R\u00e9solution** : taille native du canvas (1920x1080 par d\u00e9faut)
- **Format** : PNG
- **Nom du fichier** : scoreboard_{equipe1}vs{equipe2}_{horodatage}.png
- **Contenu** : le scoreboard complet (fond, en-t\u00eate, corps, p\u00e9nalit\u00e9s, horloge)

## Impression

### O\u00f9 trouver le bouton

Le bouton **Imprimer** se trouve dans la **barre d'outils en haut \u00e0 droite** de l'\u00e9cran (2e bouton, avec l'ic\u00f4ne imprimante).

### Mise en page

- **Orientation** : paysage (automatique)
- **Fond** : les couleurs de fond sont incluses
- **Contenu** : uniquement le scoreboard (le panneau \u00e9diteur est masqu\u00e9)
- **Marges** : minimales

### Conseils

- Activer l'option "Couleurs d'arri\u00e8re-plan" dans les param\u00e8tres d'impression du navigateur
- Format A3 recommand\u00e9 pour une meilleure lisibilit\u00e9

## Sp\u00e9cifications techniques (JSON)

### O\u00f9 trouver le bouton

Le bouton **G\u00e9n\u00e9rer les specs** se trouve dans le panneau \u00e9diteur : **Animations** (4e ic\u00f4ne du rail) > sous-onglet **Export** > section **Sp\u00e9cifications techniques** (en bas de la section).

### Fonctionnement

Ce bouton t\u00e9l\u00e9charge un fichier JSON structur\u00e9 contenant toutes les propri\u00e9t\u00e9s n\u00e9cessaires pour recr\u00e9er l'\u00e9cran actuel : canvas, fond, header, polices, tailles, couleurs, body type, logos, animations et m\u00e9dia de fond. Ce fichier est destin\u00e9 aux d\u00e9veloppeurs.`,
};
