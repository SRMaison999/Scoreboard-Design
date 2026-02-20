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

## Spécifications techniques (JSON)

### Bouton "Générer les specs"

Dans la section **Export** (onglet Animations > Export), le bouton "Générer les specs" télécharge un fichier JSON structuré contenant toutes les propriétés nécessaires pour recréer l'écran actuel.

### Contenu du fichier

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

### Usage

Ce fichier est destiné aux développeurs qui doivent reproduire un écran spécifique. Il contient toutes les valeurs nécessaires sans avoir à ouvrir l'éditeur.

Fonctionne pour **tous les body types** (1-14), pas uniquement le Layout libre.
