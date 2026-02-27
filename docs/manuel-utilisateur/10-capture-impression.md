# Manuel utilisateur - Capture et impression

## Screenshot (capture d'écran)

### Bouton Screenshot

Le bouton Screenshot dans la barre d'outils capture le scoreboard en image PNG haute résolution.

### Caractéristiques

- **Résolution** : taille native du canvas (1920x1080 par défaut, ou selon les dimensions configurées)
- **Format** : PNG
- **Nom du fichier** : `scoreboard_{équipe1}vs{équipe2}_{horodatage}.png`
- **Contenu** : le scoreboard complet (fond, en-tête, corps, pénalités, horloge)

### Copie dans le presse-papier

Le screenshot peut également être copié directement dans le presse-papier du système pour un collage rapide dans un autre logiciel.

### Conseils

- Les polices Google Fonts doivent être chargées avant la capture (elles le sont automatiquement au démarrage)
- La capture se fait à la résolution native, indépendamment du zoom du preview
- Tester avec tous les types d'affichage pour vérifier le rendu

## Impression

### Bouton Imprimer

Le bouton Imprimer dans la barre d'outils ouvre le dialogue d'impression du navigateur.

### Mise en page

- **Orientation** : paysage (automatique)
- **Fond** : les couleurs de fond sont incluses
- **Contenu** : uniquement le scoreboard (le panneau éditeur est masqué)
- **Marges** : minimales

### Conseils

- Activer l'option "Couleurs d'arrière-plan" dans les paramètres d'impression du navigateur
- Format A3 recommandé pour une meilleure lisibilité
- Utile pour l'archivage papier ou l'affichage physique dans les vestiaires

## Spécifications techniques

### Bouton "Specs"

Le bouton **Specs** se trouve dans la barre d'outils au-dessus du canvas, à côté des boutons Capture et Imprimer. Un clic génère et télécharge automatiquement **deux fichiers** :

1. **Fichier de spécifications** (`.specs.json`) : un JSON structuré contenant toutes les propriétés techniques de l'écran actuel.
2. **Fichier d'explication** (`.md`) : un document Markdown lisible qui décrit en détail la disposition de chaque élément à l'écran.

### Contenu du fichier de spécifications (JSON)

Le fichier `.specs.json` contient :

- **Canvas** : dimensions (largeur, hauteur)
- **Fond** : mode (uniforme/dégradé), couleurs, opacités
- **Header** : équipes (code + nom du pays), scores, horloge, période, pénalités, temps morts, tirs au but
- **Polices** : identifiant + famille CSS résolue pour chaque zone (équipes, horloge, corps)
- **Tailles de police** : toutes les tailles configurées
- **Couleurs** : toutes les couleurs de chaque élément
- **Body type** : type actif (1-14) avec son label et toutes les données spécifiques (stats, classement, fiche joueur, etc.)
- **Logos** : mode, positions et tailles des logos compétition et sponsor
- **Animations** : configuration complète des animations d'entrée, sortie, score, pénalités, horloge
- **Visibilité** et **média de fond**

### Contenu du fichier d'explication (Markdown)

Le fichier `.md` contient :

- **Vue d'ensemble** : schéma ASCII de la disposition générale (header, corps, pénalités)
- **Canvas** : dimensions et mode de rendu
- **Fond** : couleurs du dégradé ou couleur uniforme, média de fond éventuel
- **Header** : position de chaque élément (drapeaux, noms, scores, horloge, période)
- **Corps** : description détaillée du body type actif avec toutes les données (tableaux de stats, classement, calendrier, etc.)
- **Polices** : familles et tailles utilisées
- **Couleurs** : tableau récapitulatif de chaque couleur par élément
- **Logos** : positions et tailles des logos affichés
- **Visibilité** : état du scoreboard

### Usage

Ces fichiers sont destinés aux développeurs qui doivent reproduire un écran spécifique. Le JSON fournit les valeurs brutes, le Markdown fournit le contexte visuel et les explications de positionnement.

Fonctionne pour **tous les body types** (1-14), pas uniquement le Layout libre.
