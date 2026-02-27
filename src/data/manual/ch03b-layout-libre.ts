import type { ManualChapter } from '@/types/userManual';

export const ch03b: ManualChapter = {
  id: 'layout-libre',
  title: 'Layout libre - Prise en main',
  content: `Le **Layout libre** est le mode le plus puissant du Scoreboard Editor. Contrairement aux 13 autres modes qui imposent une mise en page fixe, il affiche un canvas entièrement vierge sur lequel vous placez librement des éléments visuels.

**Idéal pour :** créer un bandeau de score sur mesure, concevoir une bande basse (lower third), assembler statistiques et fiche joueur sur un même écran.

---

## Dans ce chapitre

**Prise en main**
- Prise en main rapide
- Principe fondamental : données et éléments visuels
- Configurer les équipes et le score
- Options du canvas

**Utilisation du canvas**
- Ajouter des éléments depuis la bibliothèque
- Manipuler les éléments
- Zoom et panoramique
- Menu contextuel (clic droit)
- Copier-coller et historique
- Configurer un élément (panneau Propriétés)
- Le sélecteur "Côté" (gauche/droite)

**Guide des éléments**
- Éléments de match : Score, Nom d'équipe, Drapeau, Horloge, Période, Temps morts, Tirs au but
- Éléments de texte et données : Bloc de texte, Ligne de stat, Barre comparative
- Éléments joueurs et médias : Photo joueur, Image, Forme, Séparateur
- Éléments composés : Header complet, Colonne de pénalités, Types embarqués
- Organiser les couches
- Presets

**Tutoriels pas à pas**
- Scoreboard classique avec header
- Bande basse (lower third)
- Écran de statistiques comparatives
- Fiche joueur personnalisée
- Écran multi-types (combinaison)

---

## Prise en main rapide

Pour créer votre premier scoreboard en 4 étapes :

1. **Configurez les équipes** : dans le panneau gauche, onglet Équipes, section Header, choisissez deux équipes et entrez les scores
2. **Ajoutez un Header complet** : dans la Bibliothèque (premier onglet du rail), catégorie Composés, cliquez sur "Header complet". Un bloc avec drapeaux, noms, scores et horloge apparaît
3. **Positionnez-le** : glissez-le en haut du canvas
4. **Sauvegardez** : allez dans l'onglet Presets et cliquez sur "Sauvegarder l'écran"

Votre premier scoreboard est prêt. Pour aller plus loin et composer élément par élément, lisez la suite.

---

## Principe fondamental : données globales et éléments visuels

Le Layout libre repose sur deux piliers distincts :

1. **Les données du match** (équipes, scores, temps, période) se configurent dans le panneau de gauche, section **Contenu > Équipes > Header**
2. **Les éléments visuels** (ce qui s'affiche sur le canvas) se placent depuis la **Bibliothèque d'éléments**

Les éléments visuels **lisent** les données du match. Par exemple, un élément "Score" affiche la valeur configurée dans le Header. Modifier le score dans le Header met à jour tous les éléments Score du canvas en temps réel.

---

## Configurer les équipes et le score

**C'est la première chose à faire avant d'ajouter des éléments sur le canvas.**

Dans le panneau de gauche, onglet **Équipes**, la section **Header** contient :

| Champ | Description |
|-------|-------------|
| **Équipe 1** | Liste déroulante avec les 31 nations (codes NOC). C'est l'équipe **gauche** |
| **Équipe 2** | Liste déroulante avec les 31 nations. C'est l'équipe **droite** |
| **Nom affiché 1 / 2** | Nom personnalisé (remplace le code NOC si renseigné) |
| **Score 1 / 2** | Score de chaque équipe |

**Exemple :** sélectionnez "SUI - Suisse" et "CAN - Canada", puis entrez les scores 3 et 1.

---

## Options du canvas

Dans l'onglet **Canvas** (deuxième icône du rail), la section **Layout libre** propose :

| Option | Description |
|--------|-------------|
| Mode pleine page | Les éléments peuvent couvrir l'intégralité du canvas |
| Aimanter à la grille | Alignement automatique sur une grille invisible (10, 20 ou 50 px) |
| Afficher les guides | Affiche la grille en surimpression |

**Astuce :** activez le mode pleine page avant de placer vos éléments si vous voulez disposer de tout le canvas (pas uniquement la zone sous le header).

**Grille et Smart Guides simultanées :** la grille fournit la position de base, et les guides intelligents (Smart Guides) affinent l'alignement par rapport aux autres éléments. Les deux fonctionnent ensemble.

**Indicateur de coordonnées :** un indicateur (x, y px) en bas à droite du canvas affiche la position du curseur en permanence.

---

## Ajouter des éléments depuis la bibliothèque

Cliquez sur la première icône du rail (**Bibliothèque**). Les éléments sont regroupés par catégorie via des filtres horizontaux (chips) :

| Catégorie | Éléments |
|-----------|----------|
| **Match** | Score, Horloge, Période, Nom d'équipe, Drapeau, Temps morts, Tirs au but |
| **Texte** | Bloc de texte |
| **Données** | Ligne de stat, Barre comparative |
| **Joueurs** | Photo joueur |
| **Médias** | Image, Forme géométrique, Séparateur (ligne) |
| **Composés** | Header complet, Colonne de pénalités, et les 13 types d'affichage |

**Pour ajouter un élément** : cliquez sur son nom. Il apparaît au centre du canvas.

**Limite** : maximum 50 éléments par canvas.

---

## Manipuler les éléments

| Action | Geste |
|--------|-------|
| **Sélectionner** | Cliquez sur l'élément |
| **Multi-sélection** | Ctrl+Clic, ou tracez un rectangle de sélection sur le canvas |
| **Déplacer** | Cliquez et glissez |
| **Déplacer finement** | Flèches du clavier (1 pixel par appui) |
| **Redimensionner** | Glissez l'une des 8 poignées (coins + bords). Shift = proportionnel, Alt = depuis le centre |
| **Rotation** | Glissez la poignée de rotation au-dessus de l'élément. **Shift = snap à 15 degrés** |
| **Taille de police** | Molette sur l'élément, ou barre flottante +/- |
| **Édition texte** | Double-cliquez sur un bloc de texte pour modifier le contenu directement sur le canvas |
| **Désélectionner** | Cliquez sur le fond (zone vide) |
| **Supprimer** | Touche Suppr. |
| **Dupliquer** | Ctrl+D |
| **Tout sélectionner** | Ctrl+A |

**Attention :** un élément verrouillé ne peut être ni déplacé ni redimensionné. Déverrouillez-le d'abord via le clic droit ou le panneau Propriétés.

---

## Zoom et panoramique

| Action | Geste |
|--------|-------|
| **Zoomer / Dézoomer** | Ctrl + Molette de la souris |
| **Zoom précis** | Ctrl+0 (ajuster), Ctrl+1 (100%), Ctrl+Plus, Ctrl+Moins |
| **Panoramique** | Espace + glisser (mode grab, comme dans Figma ou Photoshop) |
| **Panoramique (alternatif)** | Bouton central de la souris + glisser |

**Plage de zoom :** de 25% à 400%. Les règles pixel le long des bords s'adaptent automatiquement au niveau de zoom.

---

## Menu contextuel (clic droit)

Un **clic droit sur un élément** affiche un menu avec :

| Entrée | Raccourci |
|--------|-----------|
| Couper | Ctrl+X |
| Copier | Ctrl+C |
| Coller | Ctrl+V |
| Dupliquer | Ctrl+D |
| Supprimer | Suppr. |
| Verrouiller / Déverrouiller | |
| Masquer | |
| Premier plan | |
| Avancer (d'un plan) | |
| Reculer (d'un plan) | |
| Arrière-plan | |

Un **clic droit sur le fond du canvas** (sans élément) affiche : Coller, Tout sélectionner, Afficher/Masquer la grille.

---

## Copier-coller et historique

**Copier-coller :** copiez un ou plusieurs éléments (Ctrl+C) puis collez-les (Ctrl+V). Chaque collage successif décale la copie de 20 pixels supplémentaires, pour éviter que les copies se superposent.

**Historique (undo/redo) :** 50 niveaux d'annulation. Ctrl+Z pour annuler, Ctrl+Y pour rétablir.

**Attention :** changer de type d'affichage (passer du Layout libre à un autre mode) réinitialise l'historique undo/redo.

---

## Configurer un élément (panneau Propriétés)

Le panneau **Propriétés** est **toujours visible en bas de la barre latérale**, quel que soit l'onglet actif. Il se met à jour automatiquement selon l'élément sélectionné.

Il est organisé en **sections repliables** :

1. **Nom** : label pour identifier l'élément dans la liste des couches
2. **Alignement** : 6 boutons de positionnement rapide
3. **Position** : coordonnées X/Y, largeur, hauteur en pixels
4. **Z-Index / Rotation** : 4 boutons d'empilement (Premier plan, Avancer, Reculer, Arrière-plan) + contrôle de rotation
5. **Style** : couleur de fond, bordure, opacité, padding
6. **Configuration spécifique** : options selon le type d'élément (voir le chapitre suivant)
7. **Actions** : Dupliquer et Supprimer

---

## Le sélecteur "Côté" (gauche/droite)

Certains éléments sont liés à une équipe. Le panneau Propriétés affiche alors un sélecteur **"Côté"** :

- **Gauche** = Équipe 1
- **Droite** = Équipe 2

Éléments concernés : **Score**, **Nom d'équipe**, **Drapeau**, **Colonne de pénalités**.

Par défaut, tout nouvel élément est sur le côté **Gauche**.`,
};
