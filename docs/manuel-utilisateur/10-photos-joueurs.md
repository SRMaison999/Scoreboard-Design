# Photos des joueurs

## Presentation

Le Scoreboard Editor permet d'associer des photos aux joueurs. Ces photos sont affichees automatiquement dans les types d'affichage qui les supportent (stats joueur et face-a-face). Les photos sont stockees localement dans le navigateur via IndexedDB.

---

## Ajouter une photo

1. Dans le panneau editeur, ouvrir la section **Photos des joueurs** (groupe Contenu)
2. Selectionner l'**equipe** du joueur dans le menu deroulant (code NOC)
3. Saisir le **numero** du joueur
4. Optionnel : saisir le **nom** du joueur
5. Cliquer sur **Ajouter une photo**
6. Selectionner un fichier image (formats acceptes : PNG, JPEG, WebP)

La photo est automatiquement recadree en carre et compressee en WebP pour optimiser l'espace de stockage.

---

## Gestion des photos

### Liste des photos

Toutes les photos ajoutees sont affichees dans une liste sous le formulaire d'ajout. Chaque entree montre :
- La miniature de la photo (cercle)
- L'equipe, le numero et le nom du joueur

### Supprimer une photo

Cliquer sur l'icone de suppression (corbeille rouge) a droite de la photo a supprimer.

### Remplacer une photo

Pour remplacer la photo d'un joueur existant, ajouter simplement une nouvelle photo avec la meme equipe et le meme numero. L'ancienne photo sera automatiquement remplacee.

---

## Affichage dans le scoreboard

### Type 3 : Stats joueur

Quand l'option **Afficher photo joueur** est activee, les photos des joueurs sont affichees dans un cercle a cote de leurs statistiques. La correspondance se fait par le numero du joueur.

Si aucune photo n'est trouvee pour un joueur, un cercle gris avec le numero du joueur est affiche en remplacement.

### Type 9 : Face-a-face

Les photos des deux joueurs compares sont affichees dans des cercles a cote de leurs noms. La correspondance se fait par la combinaison equipe + numero.

Si aucune photo n'est trouvee, un cercle avec le numero du joueur est affiche.

---

## Identification des photos

Chaque photo est identifiee par la combinaison **equipe-numero** (exemple : `CAN-11`). Cela signifie que :
- Un meme joueur a la meme photo dans tous les types d'affichage
- Si deux joueurs ont le meme numero dans des equipes differentes, ils auront des photos distinctes
- Changer l'equipe ou le numero d'un joueur dans un type d'affichage mettra a jour la photo affichee

---

## Stockage

Les photos sont stockees dans IndexedDB, ce qui signifie :
- Elles persistent entre les sessions (rechargement de page)
- Elles sont partagees entre toutes les fenetres de l'application (editeur, operateur, sortie)
- Elles ne sont pas incluses dans les exports de templates
- Elles restent disponibles meme apres changement de template
