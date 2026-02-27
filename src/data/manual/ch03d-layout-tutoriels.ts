import type { ManualChapter } from '@/types/userManual';

export const ch03d: ManualChapter = {
  id: 'layout-tutoriels',
  title: 'Layout libre - Tutoriels',
  content: `## Tutoriel 1 : Scoreboard classique avec header

**Objectif :** créer un affichage de match standard avec drapeaux, noms, scores et horloge.

**Résultat :** une bande de score en haut du canvas, prête pour la diffusion.

1. Sélectionnez le mode **Layout libre** (mode par défaut)
2. Dans le panneau gauche, onglet **Équipes**, section **Header** :
- Équipe 1 : sélectionnez **SUI - Suisse**
- Équipe 2 : sélectionnez **CAN - Canada**
- Score 1 : saisissez **3**, Score 2 : saisissez **1**
3. Ouvrez la **Bibliothèque** (premier onglet du rail)
4. Ajoutez une **Forme** (catégorie Médias) > dans Propriétés, choisissez "Rectangle", couleur sombre, largeur 1920 px, hauteur 120 px. Positionnez-la en y=0 pour couvrir le haut du canvas
5. Ajoutez un **Nom d'équipe** > il affiche "SUI" + drapeau (côté Gauche par défaut). Placez-le à gauche dans le rectangle
6. Ajoutez un deuxième **Nom d'équipe** > changez le **Côté** à **Droite**. Placez-le à droite dans le rectangle
7. Ajoutez un **Score** (côté Gauche) > placez-le entre le nom et le centre
8. Ajoutez un deuxième **Score** > changez le **Côté** à **Droite**
9. Ajoutez une **Horloge** > placez-la au centre entre les deux scores
10. Ajustez les tailles de police et les positions. Sauvegardez via **Presets > Sauvegarder l'écran**

**Astuces :**
- Activez **Aimanter à la grille** (grille 10 px) pour un alignement régulier
- Utilisez les **Smart Guides** pour aligner les éléments entre eux
- Ajoutez un **Séparateur** vertical entre les scores et l'horloge pour un rendu plus propre

---

## Tutoriel 2 : Bande basse (lower third)

**Objectif :** créer une bande d'information en bas de l'écran, idéale pour la retransmission broadcast.

**Résultat :** une bande compacte en bas du canvas avec drapeaux, noms courts et score.

1. Activez le **Mode pleine page** dans les options du canvas (onglet Canvas)
2. Dans **Header**, configurez les deux équipes et les scores
3. Ajoutez une **Forme** rectangle : largeur 600 px, hauteur 60 px, couleur noire, opacité 85%. Positionnez-la en bas du canvas (y=1020 environ) et centrée horizontalement
4. Ajoutez un **Drapeau** (côté Gauche). Redimensionnez-le à 40x30 px. Placez-le à l'extrémité gauche de la bande
5. Ajoutez un **Nom d'équipe** (côté Gauche), décochez "Afficher le drapeau". Placez-le juste à droite du drapeau. Taille de police : 22
6. Ajoutez un **Score** (côté Gauche). Taille de police : 28. Placez-le au centre-gauche
7. Ajoutez un **Séparateur** vertical (couleur blanche, épaisseur 2 px, hauteur 40 px) au centre exact
8. Répétez les étapes 4 à 6 pour l'équipe de **Droite** (côté Droite), en miroir
9. Optionnel : ajoutez un **Bloc de texte** avec la période ("P1") ou le temps restant

**Astuces :**
- La bande semi-transparente permet de superposer sur le flux vidéo sans masquer l'action
- Exportez comme template pour le réutiliser sur tous vos matchs

---

## Tutoriel 3 : Écran de statistiques comparatives

**Objectif :** créer un écran plein de comparaison entre deux équipes avec barres et chiffres.

**Résultat :** un tableau visuel comparant les performances des deux équipes.

1. Configurez les deux équipes dans **Header**
2. Ajoutez une **Forme** rectangle couvrant tout le canvas (1920x1080), couleur sombre comme arrière-plan. Placez-la en z-index minimum (bouton **Arrière-plan** dans Propriétés)
3. Ajoutez un **Bloc de texte** en haut : contenu "STATISTIQUES DU MATCH", casse MAJUSCULES, taille 36, centré. Positionnez-le en haut du canvas
4. Ajoutez deux **Nom d'équipe** (un par côté), placés sous le titre, à gauche et à droite
5. Ajoutez deux **Score** (un par côté), placés sous les noms d'équipes
6. Ajoutez un **Séparateur** horizontal sous les scores pour séparer le header du corps
7. Allez dans l'onglet **Contenu > Match** et configurez vos lignes de statistiques (ex : Tirs au but, Mises en jeu, Pénalités, Temps de possession)
8. Ajoutez plusieurs **Ligne de stat** (catégorie Données) : une par statistique. Empilez-les verticalement avec un espacement régulier
9. Alternativement, ajoutez des **Barre comparative** pour un rendu plus visuel
10. Ajustez les positions. Les statistiques doivent être alignées et espacées uniformément

**Astuces :**
- Utilisez la grille à 50 px pour un espacement régulier entre les lignes
- Combinez lignes de stat et barres comparatives pour varier le rendu visuel

---

## Tutoriel 4 : Fiche joueur personnalisée

**Objectif :** créer un écran dédié à un joueur avec sa photo, son nom et ses statistiques.

**Résultat :** une fiche joueur sur mesure pour les présentations d'avant-match ou les faits marquants.

1. Configurez l'équipe du joueur dans **Header** (ex : Équipe 1 = SUI)
2. Ajoutez une **Forme** rectangle en arrière-plan (1920x1080, couleur foncée). Z-index minimum
3. Ajoutez un **Drapeau** (côté Gauche) en grand format (200x140 px). Placez-le en haut à gauche
4. Ajoutez un **Bloc de texte** : contenu = nom du joueur (ex : "ROMAN JOSI"), casse MAJUSCULES, taille 48, police Impact. Positionnez-le à droite du drapeau
5. Ajoutez un deuxième **Bloc de texte** : contenu = numéro (ex : "#59"), taille 72, police Impact. Positionnez-le sous le nom
6. Ajoutez une **Photo joueur** (importez d'abord la photo dans l'onglet Médias > Photos). Choisissez la forme Cercle. Placez-la au centre-gauche, taille 300x300 px
7. Ajoutez une **Forme** rectangle fine (400x2 px, couleur blanche) comme séparateur horizontal
8. Ajoutez plusieurs **Bloc de texte** pour les statistiques :
- "Buts : 12" - taille 24
- "Aides : 31" - taille 24
- "Points : 43" - taille 24
- "+/- : +15" - taille 24
9. Alignez les blocs de statistiques verticalement à droite de la photo
10. Sauvegardez via **Presets > Sauvegarder l'écran**

---

## Tutoriel 5 : Écran multi-types (combinaison)

**Objectif :** combiner un scoreboard en header avec un classement dans le corps, sur un seul écran.

**Résultat :** un affichage composite utilisant un élément composé classique dans le Layout libre.

1. Configurez les équipes et scores dans **Header**
2. Ajoutez un **Header complet** (catégorie Composés). Positionnez-le en haut du canvas (y=0). Redimensionnez-le pour qu'il couvre toute la largeur
3. Cochez **Afficher l'horloge** dans les propriétés du Header complet
4. Ajoutez un type d'affichage embarqué **Classement** (catégorie Composés). Positionnez-le dans la moitié inférieure du canvas
5. Configurez le classement dans l'onglet **Contenu** (ajoutez les équipes, scores, etc.)
6. Optionnel : ajoutez un **Bloc de texte** entre le header et le classement (ex : "GROUPE A"), centré, taille 28
7. Ajoutez un **Séparateur** horizontal entre le header et le corps pour délimiter visuellement les zones
8. Ajustez les tailles pour que tout l'écran soit exploité

**Astuces :**
- Les éléments composés embarqués héritent de leurs propres données (configurées dans leur onglet respectif)
- Cette technique est idéale pour les pauses publicitaires ou les écrans d'entre-période`,
};
