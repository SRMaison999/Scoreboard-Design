import type { ManualChapter } from '@/types/userManual';

export const ch10: ManualChapter = {
  id: 'photos',
  title: 'Photos des joueurs',
  content: `## Pr\u00e9sentation

Le Scoreboard Editor permet d'associer des photos aux joueurs. Ces photos sont affich\u00e9es automatiquement dans les types d'affichage qui les supportent (stats joueur et face-\u00e0-face). Les photos sont stock\u00e9es localement via IndexedDB.

## Ajouter une photo

1. Ouvrir la section **Photos des joueurs** (groupe Contenu)
2. S\u00e9lectionner l'**\u00e9quipe** du joueur dans le menu d\u00e9roulant
3. Saisir le **num\u00e9ro** du joueur
4. Optionnel : saisir le **nom** du joueur
5. Cliquer sur **Ajouter une photo**
6. S\u00e9lectionner un fichier image (PNG, JPEG, WebP)

La photo est automatiquement recadr\u00e9e en carr\u00e9 et compress\u00e9e en WebP.

## Gestion des photos

### Supprimer une photo

Cliquer sur l'ic\u00f4ne de suppression (\u00e0 droite de la photo \u00e0 supprimer).

### Remplacer une photo

Ajouter une nouvelle photo avec la m\u00eame \u00e9quipe et le m\u00eame num\u00e9ro. L'ancienne photo sera automatiquement remplac\u00e9e.

## Affichage dans le scoreboard

### Type 3 : Stats joueur

Quand l'option **Afficher photo joueur** est activ\u00e9e, les photos sont affich\u00e9es dans un cercle \u00e0 c\u00f4t\u00e9 des statistiques.

### Type 9 : Face-\u00e0-face

Les photos des deux joueurs compar\u00e9s sont affich\u00e9es dans des cercles.

## Identification

Chaque photo est identifi\u00e9e par la combinaison **\u00e9quipe-num\u00e9ro** (exemple : CAN-11).

## Stockage

Les photos persistent entre les sessions, sont partag\u00e9es entre toutes les fen\u00eatres et ne sont pas incluses dans les exports de templates.`,
};
