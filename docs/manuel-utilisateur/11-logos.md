# Gestion des logos

La section Logos permet d'ajouter des logos d'equipe, de competition et de sponsor/diffuseur sur le scoreboard.

---

## Types de logos

L'application supporte trois types de logos :

| Type | Description | Affichage |
|------|-------------|-----------|
| Equipe | Logo de chaque equipe (remplace ou accompagne le drapeau) | Dans l'en-tete, a cote du nom d'equipe |
| Competition | Logo du tournoi ou de la competition | En superposition sur le canvas (position configurable) |
| Sponsor | Logo du sponsor ou diffuseur | En superposition sur le canvas (position configurable) |

---

## Ajouter un logo

1. Dans le panneau editeur, ouvrir la section **Logos**
2. Selectionner l'onglet du type de logo souhaite (Equipe, Competition, Sponsor)
3. Pour les logos d'equipe : selectionner le code equipe dans la liste deroulante
4. Pour les logos de competition/sponsor : saisir un identifiant et un nom
5. Cliquer sur **Ajouter un logo** et selectionner un fichier image (PNG, JPEG ou WebP)

Le logo est automatiquement redimensionne (maximum 300 pixels) tout en conservant ses proportions.

---

## Mode d'affichage des logos d'equipe

L'onglet Equipe propose un selecteur de mode d'affichage :

| Mode | Comportement |
|------|-------------|
| Drapeau | Affiche uniquement le drapeau CSS (comportement par defaut) |
| Logo | Affiche uniquement le logo uploade (fallback au drapeau si aucun logo) |
| Les deux | Affiche le drapeau et le logo cote a cote |

---

## Logos de competition et sponsor

### Activation

Cocher la case **Afficher le logo** pour activer l'affichage du logo sur le canvas.

### Position

Six positions sont disponibles :

| Position | Description |
|----------|-------------|
| Haut gauche | Coin superieur gauche |
| Haut centre | Centre superieur |
| Haut droite | Coin superieur droit |
| Bas gauche | Coin inferieur gauche |
| Bas centre | Centre inferieur |
| Bas droite | Coin inferieur droit |

### Taille

La taille maximale (en pixels) peut etre ajustee. La valeur par defaut est de 80 pixels pour les logos de competition et 60 pixels pour les logos de sponsor.

---

## Supprimer un logo

Cliquer sur l'icone de corbeille a droite du logo dans la liste pour le supprimer.

---

## Persistance

Les logos sont stockes dans IndexedDB et persistent entre les sessions. Ils sont independants des templates : un logo uploade reste disponible quel que soit le template charge.

Les parametres d'affichage (mode, position, taille, activation) font partie du state du scoreboard et sont sauvegardes avec les templates.
