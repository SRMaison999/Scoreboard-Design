# Gestion des logos et drapeaux

La section Logos permet d'ajouter des logos d'\u00e9quipe, de comp\u00e9tition et de sponsor/diffuseur sur le scoreboard, ainsi que de personnaliser les drapeaux de pays.

---

## Types de logos

L'application supporte quatre types de logos :

| Type | Description | Affichage |
|------|-------------|-----------|
| \u00c9quipe | Logo de chaque \u00e9quipe (remplace ou accompagne le drapeau) | Dans l'en-t\u00eate, \u00e0 c\u00f4t\u00e9 du nom d'\u00e9quipe |
| Comp\u00e9tition | Logo du tournoi ou de la comp\u00e9tition | En superposition sur le canvas (position configurable) |
| Sponsor | Logo du sponsor ou diffuseur | En superposition sur le canvas (position configurable) |
| Drapeaux | Remplacement personnalis\u00e9 des drapeaux embarqu\u00e9s | Dans l'en-t\u00eate et les body types concern\u00e9s |

---

## Drapeaux

### Drapeaux embarqu\u00e9s

L'application int\u00e8gre 31 drapeaux SVG correspondant aux nations de hockey (codes NOC). Ces drapeaux sont affich\u00e9s automatiquement dans l'en-t\u00eate du scoreboard et dans certains body types (goal, fiche joueur, classement, score final, roster).

### Affichage automatique par \u00e9quipe

Quand un code pays reconnu est s\u00e9lectionn\u00e9 comme \u00e9quipe, le drapeau correspondant s'affiche automatiquement. Deux cases \u00e0 cocher ind\u00e9pendantes (**Drapeau \u00e9quipe 1** et **Drapeau \u00e9quipe 2**) dans la section Header permettent de masquer ou r\u00e9afficher le drapeau individuellement. Lors d'un changement d'\u00e9quipe, la case est automatiquement coch\u00e9e si le nouveau code est un pays, ou d\u00e9coch\u00e9e sinon (par exemple pour un code de club).

### Remplacer un drapeau

1. Dans le panneau \u00e9diteur, ouvrir la section **Logos**
2. S\u00e9lectionner l'onglet **Drapeaux**
3. Choisir le code NOC du drapeau \u00e0 remplacer dans la liste d\u00e9roulante
4. Cliquer sur **Remplacer un drapeau** et s\u00e9lectionner un fichier image (PNG, JPEG ou WebP)

Le drapeau personnalis\u00e9 remplace le SVG embarqu\u00e9 partout dans le scoreboard (en-t\u00eate et body types).

### Restaurer un drapeau

Pour revenir au drapeau SVG embarqu\u00e9, supprimer le drapeau personnalis\u00e9 en cliquant sur l'ic\u00f4ne de corbeille dans la liste.

---

## Ajouter un logo

1. Dans le panneau \u00e9diteur, ouvrir la section **Logos**
2. S\u00e9lectionner l'onglet du type de logo souhait\u00e9 (\u00c9quipe, Comp\u00e9tition, Sponsor)
3. Pour les logos d'\u00e9quipe : s\u00e9lectionner le code \u00e9quipe dans la liste d\u00e9roulante
4. Pour les logos de comp\u00e9tition/sponsor : saisir un identifiant et un nom
5. Cliquer sur **Ajouter un logo** et s\u00e9lectionner un fichier image (PNG, JPEG ou WebP)

Le logo est automatiquement redimensionn\u00e9 (maximum 300 pixels) tout en conservant ses proportions.

---

## Mode d'affichage des logos d'\u00e9quipe

L'onglet \u00c9quipe propose un s\u00e9lecteur de mode d'affichage :

| Mode | Comportement |
|------|-------------|
| Drapeau | Affiche uniquement le drapeau SVG (comportement par d\u00e9faut) |
| Logo | Affiche uniquement le logo upload\u00e9 (fallback au drapeau si aucun logo) |
| Les deux | Affiche le drapeau et le logo c\u00f4te \u00e0 c\u00f4te |

---

## Logos de comp\u00e9tition et sponsor

### Activation

Cocher la case **Afficher le logo** pour activer l'affichage du logo sur le canvas.

### Position

Six positions sont disponibles :

| Position | Description |
|----------|-------------|
| Haut gauche | Coin sup\u00e9rieur gauche |
| Haut centre | Centre sup\u00e9rieur |
| Haut droite | Coin sup\u00e9rieur droit |
| Bas gauche | Coin inf\u00e9rieur gauche |
| Bas centre | Centre inf\u00e9rieur |
| Bas droite | Coin inf\u00e9rieur droit |

### Taille

La taille maximale (en pixels) peut \u00eatre ajust\u00e9e. La valeur par d\u00e9faut est de 80 pixels pour les logos de comp\u00e9tition et 60 pixels pour les logos de sponsor.

---

## Supprimer un logo

Cliquer sur l'ic\u00f4ne de corbeille \u00e0 droite du logo dans la liste pour le supprimer.

---

## Persistance

Les logos et drapeaux personnalis\u00e9s sont stock\u00e9s dans IndexedDB et persistent entre les sessions. Ils sont ind\u00e9pendants des templates : un logo upload\u00e9 reste disponible quel que soit le template charg\u00e9.

Les param\u00e8tres d'affichage (mode, position, taille, activation) font partie du state du scoreboard et sont sauvegard\u00e9s avec les templates.
