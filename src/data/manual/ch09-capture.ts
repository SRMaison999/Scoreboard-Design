import type { ManualChapter } from '@/types/userManual';

export const ch09: ManualChapter = {
  id: 'capture',
  title: 'Capture et impression',
  content: `## Screenshot (capture d'\u00e9cran)

### Bouton Screenshot

Le bouton Screenshot dans la barre d'outils capture le scoreboard en image PNG haute r\u00e9solution.

### Caract\u00e9ristiques

- **R\u00e9solution** : taille native du canvas (1920x1080 par d\u00e9faut)
- **Format** : PNG
- **Nom du fichier** : scoreboard_{equipe1}vs{equipe2}_{horodatage}.png
- **Contenu** : le scoreboard complet (fond, en-t\u00eate, corps, p\u00e9nalit\u00e9s, horloge)

## Impression

### Bouton Imprimer

Le bouton Imprimer dans la barre d'outils ouvre le dialogue d'impression du navigateur.

### Mise en page

- **Orientation** : paysage (automatique)
- **Fond** : les couleurs de fond sont incluses
- **Contenu** : uniquement le scoreboard (le panneau \u00e9diteur est masqu\u00e9)
- **Marges** : minimales

### Conseils

- Activer l'option "Couleurs d'arri\u00e8re-plan" dans les param\u00e8tres d'impression du navigateur
- Format A3 recommand\u00e9 pour une meilleure lisibilit\u00e9

## Sp\u00e9cifications techniques (JSON)

Le bouton "G\u00e9n\u00e9rer les specs" (section Export) t\u00e9l\u00e9charge un fichier JSON structur\u00e9 contenant toutes les propri\u00e9t\u00e9s n\u00e9cessaires pour recr\u00e9er l'\u00e9cran actuel. Ce fichier est destin\u00e9 aux d\u00e9veloppeurs qui doivent reproduire un \u00e9cran sp\u00e9cifique.`,
};
