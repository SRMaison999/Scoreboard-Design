import type { ManualChapter } from '@/types/userManual';

export const ch03b: ManualChapter = {
  id: 'layout-libre',
  title: 'Layout libre',
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
6. **Configuration spécifique** (repliable) : options qui dépendent du type d'élément (voir ci-dessous)
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

## Guide détaillé par type d'élément

### Score (catégorie Match)

**Ce qu'il affiche :** le score d'une équipe (la valeur saisie dans Header > Score 1 ou Score 2).

**Comment l'utiliser :**
1. Ajoutez un élément **Score** depuis la bibliothèque
2. Cliquez dessus dans le canvas > ses propriétés s'affichent en bas de la barre latérale
3. Dans **Côté**, choisissez **Gauche** (Score 1) ou **Droite** (Score 2)
4. Optionnel : ajustez la **Taille de police** (0 = valeur globale)

**Pour afficher les deux scores :** ajoutez **deux** éléments Score. Configurez le premier sur "Gauche" et le second sur "Droite".

### Nom d'équipe (catégorie Match)

**Ce qu'il affiche :** le nom de l'équipe (code NOC ou nom affiché personnalisé) + optionnellement le drapeau du pays.

**Comment l'utiliser :**
1. Ajoutez un élément **Nom d'équipe** depuis la bibliothèque
2. Cliquez dessus > dans **Côté**, choisissez **Gauche** (Équipe 1) ou **Droite** (Équipe 2)
3. Le drapeau est affiché par défaut. Décochez **"Afficher le drapeau"** si vous ne voulez que le nom
4. Optionnel : ajustez la **Taille de police** (0 = valeur globale)

**Pour afficher les deux équipes :**
1. Ajoutez un premier **Nom d'équipe** > il montre l'équipe 1 (Gauche) par défaut
2. Ajoutez un deuxième **Nom d'équipe**
3. Cliquez sur le deuxième > dans **Côté**, choisissez **Droite**
4. Positionnez-les où vous voulez sur le canvas

### Drapeau (catégorie Match)

**Ce qu'il affiche :** le drapeau du pays d'une équipe, seul (sans nom).

**Comment l'utiliser :**
1. Ajoutez un élément **Drapeau** depuis la bibliothèque
2. Cliquez dessus > dans **Côté**, choisissez **Gauche** (Équipe 1) ou **Droite** (Équipe 2)
3. Le drapeau s'adapte automatiquement à la taille de l'élément

**Différence avec "Nom d'équipe" :** l'élément Drapeau n'affiche QUE le drapeau, sans texte. L'élément Nom d'équipe affiche le nom ET le drapeau ensemble.

### Horloge (catégorie Match)

**Ce qu'il affiche :** le temps du match (configuré dans l'onglet Match > section correspondante, ou via l'opérateur live).

**Options dans le panneau Propriétés :**
- **Afficher la période** : ajoute l'indicateur de période sous le temps
- **Afficher le cadre** : entoure l'horloge d'un cadre visuel
- **Taille de police** : 0 = valeur globale

### Période (catégorie Match)

**Ce qu'il affiche :** la période en cours (ex : "1st", "2nd", "OT").

**Options :** Taille de police (0 = valeur globale).

### Temps morts (catégorie Match)

**Ce qu'il affiche :** les indicateurs de temps morts des deux équipes (points colorés). Affiche automatiquement les deux équipes côte à côte.

**Pas de configuration supplémentaire** : l'élément utilise directement les données configurées dans l'onglet **Match > Temps morts**.

### Tirs au but (catégorie Match)

**Ce qu'il affiche :** les tentatives de tirs au but des deux équipes (cercles vert/rouge/gris). Affiche automatiquement les deux équipes côte à côte.

**Pas de configuration supplémentaire** : l'élément utilise les données de l'onglet **Match > Tirs au but**.

### Bloc de texte (catégorie Texte)

**Ce qu'il affiche :** un texte libre que vous saisissez vous-même.

**Options dans le panneau Propriétés :**
- **Contenu** : le texte à afficher
- **Taille de police** : taille en pixels
- **Épaisseur** : Normal, Medium, Semi-bold, Bold
- **Police** : police de caractères (ou "Police globale" pour hériter)
- **Alignement** : Gauche, Centre, Droite
- **Casse** : Aucune, MAJUSCULES, minuscules
- **Espacement** : espacement entre les lettres

### Ligne de stat (catégorie Données)

**Ce qu'il affiche :** une ligne de statistiques (valeur gauche + libellé + valeur droite).

**Options :** **Ligne de stat** (index) : sélectionnez quelle ligne de statistiques afficher (0 = première, 1 = deuxième, etc.). Les statistiques se configurent dans les modes body types 1 à 3.

### Barre comparative (catégorie Données)

**Ce qu'il affiche :** une barre de comparaison entre deux valeurs (gauche vs droite).

**Options :** **Barre** (index) : sélectionnez quelle barre afficher.

### Photo joueur (catégorie Joueurs)

**Ce qu'il affiche :** la photo d'un joueur.

**Options :**
- **Clé photo** : identifiant de la photo du joueur (configuré dans l'onglet Médias > Photos)
- **Forme** : Cercle ou Carré

### Image (catégorie Médias)

**Ce qu'il affiche :** une image externe (URL ou fichier local).

**Options :**
- **Source image** : URL de l'image ou bouton Parcourir pour charger un fichier
- **Ajustement** : Couvrir (remplit sans déformer), Contenir (affiche en entier), Étirer (remplit en déformant)

### Forme (catégorie Médias)

**Ce qu'il affiche :** une forme géométrique colorée (rectangle, cercle, rectangle arrondi).

**Options :**
- **Forme** : Rectangle, Cercle, Rectangle arrondi
- **Couleur de remplissage** + opacité
- **Bordure** : couleur, épaisseur, rayon

**Astuce :** utilisez les formes comme arrière-plans pour vos éléments de texte ou de score.

### Séparateur (catégorie Médias)

**Ce qu'il affiche :** une ligne de séparation.

**Options :**
- **Orientation** : Horizontale ou Verticale
- **Épaisseur** : en pixels
- **Couleur** + opacité

### Header complet (catégorie Composés)

**Ce qu'il affiche :** un bloc complet contenant automatiquement : drapeaux/logos, noms d'équipes, scores, temps morts et tirs au but. C'est l'équivalent du header des modes classiques (1 à 13).

**Options :** **Afficher l'horloge** (cocher pour inclure le temps dans le header).

**Astuce :** si vous voulez un scoreboard classique rapidement, ajoutez juste un Header complet en haut du canvas.

### Colonne de pénalités (catégorie Composés)

**Ce qu'il affiche :** la liste des pénalités d'une équipe.

**Options :** **Côté** : Gauche (Équipe 1) ou Droite (Équipe 2).

### Types d'affichage embarqués (catégorie Composés)

Les 13 types d'affichage classiques (Stats centrées, Stats gauche/droite, Fiche joueur, Classement, etc.) peuvent être ajoutés comme éléments dans le canvas du Layout libre. Cela permet de combiner plusieurs types sur un même écran.

---

## Le sélecteur "Côté" (gauche/droite)

Certains éléments sont liés à une équipe. Le panneau Propriétés affiche alors un sélecteur **"Côté"** :

- **Gauche** = Équipe 1 (configurée dans Header > Équipe 1)
- **Droite** = Équipe 2 (configurée dans Header > Équipe 2)

Éléments concernés : **Score**, **Nom d'équipe**, **Drapeau**, **Colonne de pénalités**.

Par défaut, tout nouvel élément est sur le côté **Gauche**.

---

## Étape 7 : Organiser les couches

Cliquez sur la troisième icône du rail (**Calques**) pour accéder à la liste des couches. Tous les éléments du canvas y sont listés :
- Chaque élément affiche son nom et une icône correspondant à son type
- Cliquez sur un élément de la liste pour le sélectionner dans le canvas
- Utilisez les boutons de z-index dans le panneau Propriétés (en bas) pour contrôler l'ordre d'affichage

## Presets (sauvegarder et charger des mises en page)

Cliquez sur la quatrième icône du rail (**Presets**) pour accéder aux presets. Cette section permet de :
- **Sauvegarder le champ** : enregistre la configuration d'un seul élément pour le réutiliser
- **Sauvegarder l'écran** : enregistre l'ensemble des éléments du canvas
- **Charger un preset** : applique un preset sauvegardé précédemment

---

## Exemple concret : créer un scoreboard complet pas à pas

Voici comment créer un scoreboard personnalisé avec deux équipes, leurs scores et une horloge :

1. Sélectionnez le mode **Layout libre**
2. Dans le panneau gauche, section **Header** :
   - Équipe 1 : sélectionnez **SUI - Suisse**
   - Équipe 2 : sélectionnez **CAN - Canada**
   - Score 1 : saisissez **3**
   - Score 2 : saisissez **1**
3. Cliquez sur l'onglet **Bibliothèque** dans le rail, puis sur **Forme** (catégorie Médias) > positionnez-la en haut comme fond de votre header
4. Cliquez sur **Nom d'équipe** (catégorie Match) > il affiche "SUI" + drapeau suisse (côté Gauche par défaut)
5. Cliquez à nouveau sur **Nom d'équipe** > cliquez dessus dans le canvas > dans Propriétés, changez le **Côté** à **Droite** > il affiche "CAN" + drapeau canadien
6. Ajoutez un **Score** > il affiche "3" (côté Gauche par défaut)
7. Ajoutez un deuxième **Score** > cliquez dessus > changez le **Côté** à **Droite** > il affiche "1"
8. Ajoutez une **Horloge** > elle affiche le temps du match
9. Positionnez et redimensionnez tous les éléments à votre convenance
10. Sauvegardez votre mise en page via la section **Presets**`,
};
