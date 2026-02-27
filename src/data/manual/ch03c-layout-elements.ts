import type { ManualChapter } from '@/types/userManual';

export const ch03c: ManualChapter = {
  id: 'layout-elements',
  title: 'Layout libre - Éléments et presets',
  content: `Ce chapitre détaille chaque type d'élément disponible dans la bibliothèque du Layout libre, ainsi que la gestion des couches et des presets.

---

## Éléments de match

### Score

**Ce qu'il affiche :** le score d'une équipe (la valeur saisie dans Header > Score 1 ou Score 2).

**Comment l'utiliser :**
1. Ajoutez un élément **Score** depuis la bibliothèque
2. Cliquez dessus dans le canvas > ses propriétés s'affichent en bas de la barre latérale
3. Dans **Côté**, choisissez **Gauche** (Score 1) ou **Droite** (Score 2)
4. Optionnel : ajustez la **Taille de police** (0 = valeur globale)

**Pour afficher les deux scores :** ajoutez **deux** éléments Score. Configurez le premier sur "Gauche" et le second sur "Droite".

### Nom d'équipe

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

### Drapeau

**Ce qu'il affiche :** le drapeau du pays d'une équipe, seul (sans nom).

**Comment l'utiliser :**
1. Ajoutez un élément **Drapeau** depuis la bibliothèque
2. Cliquez dessus > dans **Côté**, choisissez **Gauche** (Équipe 1) ou **Droite** (Équipe 2)
3. Le drapeau s'adapte automatiquement à la taille de l'élément

**Différence avec "Nom d'équipe" :** l'élément Drapeau n'affiche QUE le drapeau, sans texte. L'élément Nom d'équipe affiche le nom ET le drapeau ensemble.

### Horloge

**Ce qu'il affiche :** le temps du match (configuré dans l'onglet Match > section correspondante, ou via l'opérateur live).

**Options dans le panneau Propriétés :**
- **Afficher la période** : ajoute l'indicateur de période sous le temps
- **Afficher le cadre** : entoure l'horloge d'un cadre visuel
- **Taille de police** : 0 = valeur globale

### Période

**Ce qu'il affiche :** la période en cours (ex : "1st", "2nd", "OT").

**Options :** Taille de police (0 = valeur globale).

### Temps morts

**Ce qu'il affiche :** les indicateurs de temps morts des deux équipes (points colorés). Affiche automatiquement les deux équipes côte à côte.

**Pas de configuration supplémentaire** : l'élément utilise directement les données configurées dans l'onglet **Match > Temps morts**.

### Tirs au but

**Ce qu'il affiche :** les tentatives de tirs au but des deux équipes (cercles vert/rouge/gris). Affiche automatiquement les deux équipes côte à côte.

**Pas de configuration supplémentaire** : l'élément utilise les données de l'onglet **Match > Tirs au but**.

---

## Éléments de texte et données

### Bloc de texte

**Ce qu'il affiche :** un texte libre que vous saisissez vous-même.

**Options dans le panneau Propriétés :**
- **Contenu** : le texte à afficher
- **Taille de police** : taille en pixels
- **Épaisseur** : Normal, Medium, Semi-bold, Bold
- **Police** : police de caractères (ou "Police globale" pour hériter)
- **Alignement** : Gauche, Centre, Droite
- **Casse** : Aucune, MAJUSCULES, minuscules
- **Espacement** : espacement entre les lettres

### Ligne de stat

**Ce qu'il affiche :** une ligne de statistiques (valeur gauche + libellé + valeur droite).

**Options :** **Ligne de stat** (index) : sélectionnez quelle ligne de statistiques afficher (0 = première, 1 = deuxième, etc.). Les statistiques se configurent dans les modes body types 1 à 3.

### Barre comparative

**Ce qu'il affiche :** une barre de comparaison entre deux valeurs (gauche vs droite).

**Options :** **Barre** (index) : sélectionnez quelle barre afficher.

---

## Éléments joueurs et médias

### Photo joueur

**Ce qu'il affiche :** la photo d'un joueur.

**Options :**
- **Clé photo** : identifiant de la photo du joueur (configuré dans l'onglet Médias > Photos)
- **Forme** : Cercle ou Carré

### Image

**Ce qu'il affiche :** une image externe (URL ou fichier local).

**Options :**
- **Source image** : URL de l'image ou bouton Parcourir pour charger un fichier
- **Ajustement** : Couvrir (remplit sans déformer), Contenir (affiche en entier), Étirer (remplit en déformant)

### Forme

**Ce qu'il affiche :** une forme géométrique colorée (rectangle, cercle, rectangle arrondi).

**Options :**
- **Forme** : Rectangle, Cercle, Rectangle arrondi
- **Couleur de remplissage** + opacité
- **Bordure** : couleur, épaisseur, rayon

**Astuce :** utilisez les formes comme arrière-plans pour vos éléments de texte ou de score.

### Séparateur

**Ce qu'il affiche :** une ligne de séparation.

**Options :**
- **Orientation** : Horizontale ou Verticale
- **Épaisseur** : en pixels
- **Couleur** + opacité

---

## Éléments composés

### Header complet

**Ce qu'il affiche :** un bloc complet contenant automatiquement : drapeaux/logos, noms d'équipes, scores, temps morts et tirs au but. C'est l'équivalent du header des modes classiques (1 à 13).

**Options :** **Afficher l'horloge** (cocher pour inclure le temps dans le header).

**Astuce :** si vous voulez un scoreboard classique rapidement, ajoutez juste un Header complet en haut du canvas.

### Colonne de pénalités

**Ce qu'il affiche :** la liste des pénalités d'une équipe.

**Options :** **Côté** : Gauche (Équipe 1) ou Droite (Équipe 2).

### Types d'affichage embarqués

Les 13 types d'affichage classiques (Stats centrées, Stats gauche/droite, Fiche joueur, Classement, etc.) peuvent être ajoutés comme éléments dans le canvas du Layout libre. Cela permet de combiner plusieurs types sur un même écran.

---

## Organiser les couches

Cliquez sur la troisième icône du rail (**Calques**) pour accéder à la liste des couches. Tous les éléments du canvas y sont listés :
- Chaque élément affiche son nom et une icône correspondant à son type
- Cliquez sur un élément de la liste pour le sélectionner dans le canvas
- Utilisez les boutons de z-index dans le panneau Propriétés (en bas) pour contrôler l'ordre d'affichage

## Presets (sauvegarder et charger des mises en page)

Cliquez sur la quatrième icône du rail (**Presets**) pour accéder aux presets. Cette section permet de :
- **Sauvegarder le champ** : enregistre la configuration d'un seul élément pour le réutiliser
- **Sauvegarder l'écran** : enregistre l'ensemble des éléments du canvas
- **Charger un preset** : applique un preset sauvegardé précédemment

Pour des exemples concrets de création de pages complètes, consultez le chapitre suivant : **Layout libre - Tutoriels pas à pas**.`,
};
