# Gestion des logos et drapeaux

La section Logos permet d'ajouter des logos d'équipe, de compétition et de sponsor/diffuseur sur le scoreboard, ainsi que de personnaliser les drapeaux de pays.

---

## Types de logos

L'application supporte quatre types de logos :

| Type | Description | Affichage |
|------|-------------|-----------|
| Équipe | Logo de chaque équipe (remplace ou accompagne le drapeau) | Dans l'en-tête, à côté du nom d'équipe |
| Compétition | Logo du tournoi ou de la compétition | En superposition sur le canvas (position configurable) |
| Sponsor | Logo du sponsor ou diffuseur | En superposition sur le canvas (position configurable) |
| Drapeaux | Remplacement personnalisé des drapeaux embarqués | Dans l'en-tête et les body types concernés |

---

## Drapeaux

### Drapeaux embarqués

L'application intègre 31 drapeaux SVG correspondant aux nations de hockey (codes NOC). Ces drapeaux sont affichés automatiquement dans l'en-tête du scoreboard et dans certains body types (goal, fiche joueur, classement, score final, roster).

### Affichage automatique par équipe

Quand un code pays reconnu est sélectionné comme équipe, le drapeau correspondant s'affiche automatiquement. Deux cases à cocher indépendantes (**Drapeau équipe 1** et **Drapeau équipe 2**) dans la section Header permettent de masquer ou réafficher le drapeau individuellement. Lors d'un changement d'équipe, la case est automatiquement cochée si le nouveau code est un pays, ou décochée sinon (par exemple pour un code de club).

### Remplacer un drapeau

1. Dans le panneau éditeur, ouvrir la section **Logos**
2. Sélectionner l'onglet **Drapeaux**
3. Choisir le code NOC du drapeau à remplacer dans la liste déroulante
4. Cliquer sur **Remplacer un drapeau** et sélectionner un fichier image (PNG, JPEG ou WebP)

Le drapeau personnalisé remplace le SVG embarqué partout dans le scoreboard (en-tête et body types).

### Restaurer un drapeau

Pour revenir au drapeau SVG embarqué, supprimer le drapeau personnalisé en cliquant sur l'icône de corbeille dans la liste.

---

## Ajouter un logo

1. Dans le panneau éditeur, ouvrir la section **Logos**
2. Sélectionner l'onglet du type de logo souhaité (Équipe, Compétition, Sponsor)
3. Pour les logos d'équipe : sélectionner le code équipe dans la liste déroulante
4. Pour les logos de compétition/sponsor : saisir un identifiant et un nom
5. Cliquer sur **Ajouter un logo** et sélectionner un fichier image (PNG, JPEG ou WebP)

Le logo est automatiquement redimensionné (maximum 300 pixels) tout en conservant ses proportions.

---

## Mode d'affichage des logos d'équipe

L'onglet Équipe propose un sélecteur de mode d'affichage :

| Mode | Comportement |
|------|-------------|
| Drapeau | Affiche uniquement le drapeau SVG (comportement par défaut) |
| Logo | Affiche uniquement le logo uploadé (fallback au drapeau si aucun logo) |
| Les deux | Affiche le drapeau et le logo côte à côte |

---

## Logos de compétition et sponsor

### Activation

Cocher la case **Afficher le logo** pour activer l'affichage du logo sur le canvas.

### Position

Six positions sont disponibles :

| Position | Description |
|----------|-------------|
| Haut gauche | Coin supérieur gauche |
| Haut centre | Centre supérieur |
| Haut droite | Coin supérieur droit |
| Bas gauche | Coin inférieur gauche |
| Bas centre | Centre inférieur |
| Bas droite | Coin inférieur droit |

### Taille

La taille maximale (en pixels) peut être ajustée. La valeur par défaut est de 80 pixels pour les logos de compétition et 60 pixels pour les logos de sponsor.

---

## Supprimer un logo

Cliquer sur l'icône de corbeille à droite du logo dans la liste pour le supprimer.

---

## Persistance

Les logos et drapeaux personnalisés sont stockés dans IndexedDB et persistent entre les sessions. Ils sont indépendants des templates : un logo uploadé reste disponible quel que soit le template chargé.

Les paramètres d'affichage (mode, position, taille, activation) font partie du state du scoreboard et sont sauvegardés avec les templates.
