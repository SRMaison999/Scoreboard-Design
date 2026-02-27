import type { ManualChapter } from '@/types/userManual';

export const ch03b: ManualChapter = {
  id: 'layout-libre',
  title: 'Layout libre - Prise en main',
  content: `Le **Layout libre** (mode 14) est le mode le plus puissant du Scoreboard Editor. Contrairement aux 13 autres modes qui imposent une mise en page fixe, le Layout libre affiche un canvas entièrement vierge sur lequel vous placez librement des éléments visuels.

**Idéal pour :** créer un affichage sur mesure, concevoir des mises en page originales, assembler des éléments de différentes natures sur un même écran.

---

## Principe fondamental : données globales et éléments visuels

Le Layout libre repose sur deux piliers distincts :

1. **Les données du match** (équipes, scores, temps, période) se configurent dans le panneau de gauche, section **Contenu > Équipes > Header**
2. **Les éléments visuels** (ce qui s'affiche sur le canvas) se placent depuis la **Bibliothèque d'éléments**

Les éléments visuels **lisent** les données du match. Par exemple, un élément "Score" affiche la valeur configurée dans le Header. Modifier le score dans le Header met à jour tous les éléments Score du canvas en temps réel.

---

## Étape 1 : Sélectionner le mode Layout libre

1. Le Layout libre est le mode par défaut. Si un autre mode est actif, allez dans les paramètres du body type pour sélectionner **Layout libre** (catégorie "Personnalisé")
2. Le canvas devient entièrement bleu (vierge)
3. Le rail d'icônes à gauche affiche 4 onglets : **Bibliothèque**, **Canvas**, **Calques** et **Presets**

## Étape 2 : Configurer les équipes et le score

**C'est la première chose à faire avant d'ajouter des éléments sur le canvas.**

Dans le panneau de gauche, onglet **Équipes**, la section **Header** contient :

| Champ | Description |
|-------|-------------|
| **Équipe 1** | Liste déroulante avec les 31 nations (codes NOC). C'est l'équipe **gauche** |
| **Équipe 2** | Liste déroulante avec les 31 nations. C'est l'équipe **droite** |
| **Nom affiché 1** | Nom personnalisé pour l'équipe 1 (remplace le code NOC si renseigné) |
| **Nom affiché 2** | Nom personnalisé pour l'équipe 2 |
| **Score 1** | Score de l'équipe 1 (gauche) |
| **Score 2** | Score de l'équipe 2 (droite) |

**Exemple :** sélectionnez "SUI - Suisse" comme Équipe 1 et "CAN - Canada" comme Équipe 2. Saisissez "3" pour Score 1 et "1" pour Score 2.

Ces données seront utilisées par tous les éléments de match que vous placerez ensuite sur le canvas.

## Étape 3 : Configurer les options du canvas

Dans l'onglet **Canvas** (deuxième icône du rail), la section **Layout libre** propose trois options :

| Option | Description |
|--------|-------------|
| Mode pleine page | Les éléments peuvent couvrir l'intégralité du canvas |
| Aimanter à la grille | Les éléments s'alignent sur une grille invisible (10, 20 ou 50 px) |
| Afficher les guides | Affiche la grille en surimpression pour faciliter l'alignement |

**Grille et Smart Guides simultanées :** l'aimantation à la grille et les guides intelligents (Smart Guides) fonctionnent désormais ensemble. La grille fournit la position de base, et les guides intelligents affinent l'alignement par rapport aux autres éléments. Il n'est plus nécessaire de choisir entre les deux.

**Indicateur de coordonnées du curseur :** un petit indicateur (x, y px) apparaît en bas à droite du canvas. Il affiche en permanence la position du curseur en coordonnées canvas, ce qui facilite le positionnement précis des éléments.

## Étape 4 : Ajouter des éléments depuis la bibliothèque

Cliquez sur la première icône du rail (**Bibliothèque**) pour accéder à la palette d'éléments. La bibliothèque regroupe tous les éléments dans un onglet unique avec des **filtres par catégorie** sous forme de puces horizontales (chips). Cliquez sur une catégorie pour filtrer la liste, ou laissez "Tous" pour tout voir.

Les 6 catégories sont :

| Catégorie | Éléments disponibles |
|-----------|----------------------|
| **Match** | Score, Horloge, Période, Nom d'équipe, Drapeau, Temps morts, Tirs au but |
| **Texte** | Bloc de texte |
| **Données** | Ligne de stat, Barre comparative |
| **Joueurs** | Photo joueur |
| **Médias** | Image, Forme géométrique, Séparateur (ligne) |
| **Composés** | Header complet, Colonne de pénalités, et les 13 autres types d'affichage |

**Pour ajouter un élément** : cliquez sur son nom dans la liste. Il apparaît au centre du canvas.

**Astuce** : utilisez le champ de **recherche** en haut de la bibliothèque pour trouver rapidement un élément par son nom.

**Limite** : maximum 50 éléments par canvas.

## Étape 5 : Manipuler les éléments sur le canvas

| Action | Geste |
|--------|-------|
| **Sélectionner** | Cliquez sur l'élément |
| **Déplacer** | Cliquez et glissez l'élément |
| **Redimensionner** | Glissez l'une des 4 poignées aux coins |
| **Taille de police** | Molette de la souris sur l'élément sélectionné, ou barre flottante +/- |
| **Désélectionner** | Cliquez sur le fond du canvas (zone vide) |
| **Supprimer** | Touche Suppr. avec l'élément sélectionné |
| **Dupliquer** | Ctrl+D avec l'élément sélectionné |
| **Déplacer finement** | Flèches du clavier (1 pixel par appui) |

Un élément verrouillé ne peut être ni déplacé ni redimensionné.

## Étape 6 : Configurer un élément (panneau Propriétés)

Le panneau **Propriétés** est désormais **toujours visible en bas de la barre latérale**, quel que soit l'onglet actif (Bibliothèque, Canvas, Calques ou Presets). Il n'est plus nécessaire de basculer entre onglets pour accéder aux propriétés. Le contenu du panneau se met à jour automatiquement en fonction de l'élément sélectionné sur le canvas. Si aucun élément n'est sélectionné, le panneau affiche un message d'invitation.

Le panneau Propriétés est organisé en **sections repliables** que vous pouvez ouvrir ou fermer selon vos besoins :

1. **Nom** : label de l'élément (pour l'identifier dans la liste des couches)
2. **Alignement** : 6 boutons pour positionner rapidement l'élément
3. **Position** (repliable) : coordonnées X et Y, largeur et hauteur en pixels
4. **Z-Index / Rotation** (repliable) : 4 boutons d'action pour le z-index et contrôle de rotation
5. **Style** (repliable) : couleur de fond, bordure, opacité, padding
6. **Configuration spécifique** (repliable) : options qui dépendent du type d'élément (voir le chapitre suivant)
7. **Actions** : boutons Dupliquer et Supprimer

### Contrôle du z-index

L'ordre d'empilement ne se gère plus par un champ numérique, mais par **4 boutons d'action** :

| Bouton | Action |
|--------|--------|
| **Premier plan** | Place l'élément tout devant (z-index maximum) |
| **Avancer** | Monte l'élément d'un niveau |
| **Reculer** | Descend l'élément d'un niveau |
| **Arrière-plan** | Place l'élément tout derrière (z-index minimum) |

---

## Le sélecteur "Côté" (gauche/droite)

Certains éléments sont liés à une équipe. Le panneau Propriétés affiche alors un sélecteur **"Côté"** :

- **Gauche** = Équipe 1 (configurée dans Header > Équipe 1)
- **Droite** = Équipe 2 (configurée dans Header > Équipe 2)

Éléments concernés : **Score**, **Nom d'équipe**, **Drapeau**, **Colonne de pénalités**.

Par défaut, tout nouvel élément est sur le côté **Gauche**.`,
};
