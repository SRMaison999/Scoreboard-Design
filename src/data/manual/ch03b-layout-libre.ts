import type { ManualChapter } from '@/types/userManual';

export const ch03b: ManualChapter = {
  id: 'layout-libre',
  title: 'Layout libre',
  content: `Le **Layout libre** (mode 14) est le mode le plus puissant du Scoreboard Editor. Contrairement aux 13 autres modes qui imposent une mise en page fixe, le Layout libre affiche un canvas enti\u00e8rement vierge sur lequel vous placez librement des \u00e9l\u00e9ments visuels.

**Id\u00e9al pour :** cr\u00e9er un affichage sur mesure, concevoir des mises en page originales, assembler des \u00e9l\u00e9ments de diff\u00e9rentes natures sur un m\u00eame \u00e9cran.

## \u00c9tape 1 : S\u00e9lectionner le mode Layout libre

1. Dans le **rail d'ic\u00f4nes** (bord gauche), cliquez sur la 1\u00e8re ic\u00f4ne (**Modes**)
2. Dans le panneau Modes, cliquez sur **Layout libre** (premi\u00e8re option, cat\u00e9gorie "Personnalis\u00e9")
3. Le canvas devient enti\u00e8rement bleu (vierge), et le panneau **Contenu > \u00c9quipes** s'ouvre automatiquement

## \u00c9tape 2 : Configurer les options du canvas

En haut du panneau, la section **Layout libre** propose trois options :

| Option | Description |
|--------|-------------|
| Mode pleine page | Les \u00e9l\u00e9ments peuvent couvrir l'int\u00e9gralit\u00e9 du canvas |
| Aimanter \u00e0 la grille | Les \u00e9l\u00e9ments s'alignent sur une grille invisible (10, 20 ou 50 px) |
| Afficher les guides | Affiche la grille en surimpression pour faciliter l'alignement |

## \u00c9tape 3 : Ajouter des \u00e9l\u00e9ments depuis la biblioth\u00e8que

Juste en dessous des options, la section **Biblioth\u00e8que d'\u00e9l\u00e9ments** affiche tous les \u00e9l\u00e9ments disponibles, class\u00e9s en 6 cat\u00e9gories :

| Cat\u00e9gorie | \u00c9l\u00e9ments disponibles |
|-----------|----------------------|
| **Match** | Score, Horloge, P\u00e9riode, Nom d'\u00e9quipe, Drapeau, Temps morts, Tirs au but |
| **Texte** | Bloc de texte (contenu libre, taille et style configurables) |
| **Donn\u00e9es** | Ligne de stat, Barre comparative |
| **Joueurs** | Photo joueur |
| **M\u00e9dias** | Image, Forme g\u00e9om\u00e9trique (rectangle, cercle, arrondi), S\u00e9parateur (ligne) |
| **Compos\u00e9s** | Header complet, Colonne de p\u00e9nalit\u00e9s, et les 13 autres types d'affichage comme blocs embarqu\u00e9s |

**Pour ajouter un \u00e9l\u00e9ment** : cliquez sur son nom dans la liste. Il appara\u00eet au centre du canvas.

**Astuce** : utilisez le champ de **recherche** en haut de la biblioth\u00e8que pour trouver rapidement un \u00e9l\u00e9ment par son nom.

**Limite** : maximum 50 \u00e9l\u00e9ments par canvas.

## \u00c9tape 4 : Manipuler les \u00e9l\u00e9ments sur le canvas

| Action | Geste |
|--------|-------|
| **S\u00e9lectionner** | Cliquez sur l'\u00e9l\u00e9ment |
| **D\u00e9placer** | Cliquez et glissez l'\u00e9l\u00e9ment |
| **Redimensionner** | Glissez l'une des 4 poign\u00e9es aux coins |
| **Taille de police** | Molette de la souris sur l'\u00e9l\u00e9ment s\u00e9lectionn\u00e9, ou barre flottante +/- |
| **D\u00e9s\u00e9lectionner** | Cliquez sur le fond du canvas (zone vide) |
| **Supprimer** | Touche Suppr. avec l'\u00e9l\u00e9ment s\u00e9lectionn\u00e9 |
| **Dupliquer** | Ctrl+D avec l'\u00e9l\u00e9ment s\u00e9lectionn\u00e9 |
| **D\u00e9placer finement** | Fl\u00e8ches du clavier (1 pixel par appui) |

Un \u00e9l\u00e9ment verrouill\u00e9 ne peut \u00eatre ni d\u00e9plac\u00e9 ni redimensionn\u00e9. En plus des 31 codes NOC, il est possible de saisir un nom d'\u00e9quipe libre.

## \u00c9tape 5 : Configurer un \u00e9l\u00e9ment (panneau Propri\u00e9t\u00e9s)

Le panneau **Propri\u00e9t\u00e9s** n'est pas visible par d\u00e9faut. Il appara\u00eet uniquement quand vous **cliquez sur un \u00e9l\u00e9ment dans le canvas**. Une colonne suppl\u00e9mentaire s'ins\u00e8re alors entre le panneau \u00e9diteur (colonne de gauche) et le preview (zone principale). Quand aucun \u00e9l\u00e9ment n'est s\u00e9lectionn\u00e9, cette colonne dispara\u00eet.

**Pour ouvrir le panneau Propri\u00e9t\u00e9s** : cliquez sur un \u00e9l\u00e9ment dans le canvas.
**Pour fermer le panneau** : cliquez sur le bouton X en haut du panneau, ou cliquez sur une zone vide du canvas.

Le panneau Propri\u00e9t\u00e9s contient :

1. **Nom** : label de l'\u00e9l\u00e9ment (pour l'identifier dans la liste des couches)
2. **Alignement** : 6 boutons pour positionner rapidement l'\u00e9l\u00e9ment (gauche, centre horizontal, droite, haut, centre vertical, bas)
3. **Position** : coordonn\u00e9es X et Y en pixels
4. **Taille** : largeur et hauteur en pixels
5. **Z-Index** : ordre d'empilement (les \u00e9l\u00e9ments avec un z-index \u00e9lev\u00e9 passent devant)
6. **Style** : couleur de fond, bordure (couleur, \u00e9paisseur, rayon), opacit\u00e9, padding
7. **Configuration sp\u00e9cifique** : options qui d\u00e9pendent du type d'\u00e9l\u00e9ment (voir tableaux ci-dessous)
8. **Actions** : boutons Dupliquer et Supprimer

### Le s\u00e9lecteur "C\u00f4t\u00e9" (gauche/droite)

Certains \u00e9l\u00e9ments sont li\u00e9s \u00e0 une \u00e9quipe. Le panneau Propri\u00e9t\u00e9s affiche alors un s\u00e9lecteur **"C\u00f4t\u00e9"** avec deux options : **Gauche** (\u00e9quipe 1) ou **Droite** (\u00e9quipe 2).

Par d\u00e9faut, tout nouvel \u00e9l\u00e9ment est sur le c\u00f4t\u00e9 **Gauche**. Pour afficher les deux \u00e9quipes, il faut ajouter **deux \u00e9l\u00e9ments du m\u00eame type** et configurer l'un sur Gauche et l'autre sur Droite.

**Exemple : afficher les deux \u00e9quipes avec drapeaux**
1. Ajoutez un \u00e9l\u00e9ment **Nom d'\u00e9quipe** depuis la biblioth\u00e8que (cat\u00e9gorie Match) > il affiche automatiquement le **drapeau + le nom** de l'\u00e9quipe gauche
2. Ajoutez un **deuxi\u00e8me** \u00e9l\u00e9ment **Nom d'\u00e9quipe**
3. Cliquez sur ce deuxi\u00e8me \u00e9l\u00e9ment dans le canvas > le panneau Propri\u00e9t\u00e9s appara\u00eet
4. Dans le s\u00e9lecteur **C\u00f4t\u00e9**, choisissez **Droite** > il affiche maintenant le drapeau + le nom de l'\u00e9quipe droite
5. Positionnez les deux \u00e9l\u00e9ments o\u00f9 vous le souhaitez sur le canvas

**Astuce** : le drapeau est affich\u00e9 par d\u00e9faut \u00e0 c\u00f4t\u00e9 du nom. D\u00e9cochez **"Afficher le drapeau"** dans le panneau Propri\u00e9t\u00e9s si vous ne voulez afficher que le nom.

Les \u00e9l\u00e9ments concern\u00e9s par le s\u00e9lecteur "C\u00f4t\u00e9" sont : **Nom d'\u00e9quipe**, **Score**, **Drapeau**, **Colonne de p\u00e9nalit\u00e9s**.

### Configuration sp\u00e9cifique par type d'\u00e9l\u00e9ment

| Type d'\u00e9l\u00e9ment | Options sp\u00e9cifiques |
|-----------------|---------------------|
| **Bloc de texte** | Contenu, taille de police, graisse, alignement, casse, espacement |
| **Score** | C\u00f4t\u00e9 (gauche/droite), afficher le label, taille de police |
| **Horloge** | Afficher la p\u00e9riode, afficher le cadre, taille de police |
| **P\u00e9riode** | Taille de police |
| **Nom d'\u00e9quipe** | C\u00f4t\u00e9 (gauche/droite), afficher le drapeau (activ\u00e9 par d\u00e9faut), taille de police |
| **Drapeau** | C\u00f4t\u00e9 (gauche/droite) |
| **Ligne de stat** | Index de la statistique \u00e0 afficher |
| **Barre comparative** | Index de la barre \u00e0 afficher |
| **Photo joueur** | Cl\u00e9 photo, forme (cercle/carr\u00e9) |
| **Image** | Source (URL ou fichier), ajustement (cover/contain/fill) |
| **Forme** | Type, couleur de remplissage, opacit\u00e9, bordure, rayon |
| **S\u00e9parateur** | Orientation, \u00e9paisseur, couleur, opacit\u00e9 |

## \u00c9tape 6 : Organiser les couches

En bas du panneau \u00e9diteur, la section **Couches** liste tous les \u00e9l\u00e9ments du canvas :
- Chaque \u00e9l\u00e9ment affiche son nom et son z-index
- Cliquez sur un \u00e9l\u00e9ment de la liste pour le s\u00e9lectionner dans le canvas
- Ajustez le z-index pour contr\u00f4ler l'ordre d'affichage

## Presets (sauvegarder et charger des mises en page)

La section **Presets** permet de :
- **Sauvegarder un \u00e9l\u00e9ment** : enregistre la configuration d'un seul \u00e9l\u00e9ment pour le r\u00e9utiliser
- **Sauvegarder la mise en page** : enregistre l'ensemble des \u00e9l\u00e9ments du canvas
- **Charger un preset** : applique un preset sauvegard\u00e9 pr\u00e9c\u00e9demment

## Exemple concret : cr\u00e9er un scoreboard personnalis\u00e9

Voici un exemple pas \u00e0 pas pour cr\u00e9er un scoreboard de statistiques personnalis\u00e9 :

1. **Modes** > cliquez sur **Layout libre**
2. Le canvas est vierge. Dans la biblioth\u00e8que, cliquez sur **Header complet** (cat\u00e9gorie "Compos\u00e9s") pour ajouter un header en haut
3. Ajoutez un **Bloc de texte** (cat\u00e9gorie "Texte") et saisissez "STATISTIQUES DU MATCH" dans les propri\u00e9t\u00e9s
4. Ajoutez plusieurs **Lignes de stat** (cat\u00e9gorie "Donn\u00e9es") et positionnez-les en dessous du titre
5. Ajoutez un **S\u00e9parateur** (cat\u00e9gorie "M\u00e9dias") entre le titre et les stats
6. Ajustez les positions et les tailles via le panneau Propri\u00e9t\u00e9s ou par glisser-d\u00e9poser
7. Sauvegardez votre mise en page via la section **Presets** pour la r\u00e9utiliser`,
};
