# Photos des joueurs

## Présentation

Le Scoreboard Editor permet d'associer des photos aux joueurs. Ces photos sont affichées automatiquement dans les types d'affichage qui les supportent (stats joueur et face-à-face). Les photos sont stockées localement dans le navigateur via IndexedDB.

---

## Ajouter une photo

1. Dans le panneau éditeur, ouvrir la section **Photos des joueurs** (groupe Contenu)
2. Sélectionner l'**équipe** du joueur dans le menu déroulant (code NOC)
3. Saisir le **numéro** du joueur
4. Optionnel : saisir le **nom** du joueur
5. Cliquer sur **Ajouter une photo**
6. Sélectionner un fichier image (formats acceptés : PNG, JPEG, WebP)

La photo est automatiquement recadrée en carré et compressée en WebP pour optimiser l'espace de stockage.

---

## Gestion des photos

### Liste des photos

Toutes les photos ajoutées sont affichées dans une liste sous le formulaire d'ajout. Chaque entrée montre :
- La miniature de la photo (cercle)
- L'équipe, le numéro et le nom du joueur

### Supprimer une photo

Cliquer sur l'icône de suppression (corbeille rouge) à droite de la photo à supprimer.

### Remplacer une photo

Pour remplacer la photo d'un joueur existant, ajouter simplement une nouvelle photo avec la même équipe et le même numéro. L'ancienne photo sera automatiquement remplacée.

---

## Affichage dans le scoreboard

### Type 3 : Stats joueur

Quand l'option **Afficher photo joueur** est activée, les photos des joueurs sont affichées dans un cercle à côté de leurs statistiques. La correspondance se fait par le numéro du joueur.

Si aucune photo n'est trouvée pour un joueur, un cercle gris avec le numéro du joueur est affiché en remplacement.

### Type 9 : Face-à-face

Les photos des deux joueurs comparés sont affichées dans des cercles à côté de leurs noms. La correspondance se fait par la combinaison équipe + numéro.

Si aucune photo n'est trouvée, un cercle avec le numéro du joueur est affiché.

---

## Identification des photos

Chaque photo est identifiée par la combinaison **équipe-numéro** (exemple : `CAN-11`). Cela signifie que :
- Un même joueur a la même photo dans tous les types d'affichage
- Si deux joueurs ont le même numéro dans des équipes différentes, ils auront des photos distinctes
- Changer l'équipe ou le numéro d'un joueur dans un type d'affichage mettra à jour la photo affichée

---

## Stockage

Les photos sont stockées dans IndexedDB, ce qui signifie :
- Elles persistent entre les sessions (rechargement de page)
- Elles sont partagées entre toutes les fenêtres de l'application (éditeur, opérateur, sortie)
- Elles ne sont pas incluses dans les exports de templates
- Elles restent disponibles même après changement de template
