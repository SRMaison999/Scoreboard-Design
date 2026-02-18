# Manuel utilisateur - Capture et impression

## Screenshot (capture d'ecran)

### Bouton Screenshot

Le bouton Screenshot dans la barre d'outils capture le scoreboard en image PNG haute resolution.

### Caracteristiques

- **Resolution** : taille native du canvas (1920x1080 par defaut, ou selon les dimensions configurees)
- **Format** : PNG
- **Nom du fichier** : `scoreboard_{equipe1}vs{equipe2}_{horodatage}.png`
- **Contenu** : le scoreboard complet (fond, en-tete, corps, penalites, horloge)

### Copie dans le presse-papier

Le screenshot peut egalement etre copie directement dans le presse-papier du systeme pour un collage rapide dans un autre logiciel.

### Conseils

- Les polices Google Fonts doivent etre chargees avant la capture (elles le sont automatiquement au demarrage)
- La capture se fait a la resolution native, independamment du zoom du preview
- Tester avec tous les types d'affichage pour verifier le rendu

## Impression

### Bouton Imprimer

Le bouton Imprimer dans la barre d'outils ouvre le dialogue d'impression du navigateur.

### Mise en page

- **Orientation** : paysage (automatique)
- **Fond** : les couleurs de fond sont incluses
- **Contenu** : uniquement le scoreboard (le panneau editeur est masque)
- **Marges** : minimales

### Conseils

- Activer l'option "Couleurs d'arriere-plan" dans les parametres d'impression du navigateur
- Format A3 recommande pour une meilleure lisibilite
- Utile pour l'archivage papier ou l'affichage physique dans les vestiaires

## Specifications techniques (JSON)

### Bouton "Generer les specs"

Dans la section **Export** (onglet Animations > Export), le bouton "Generer les specs" telecharge un fichier JSON structuré contenant toutes les proprietes necessaires pour recreer l'ecran actuel.

### Contenu du fichier

Le fichier `.specs.json` contient :

- **Canvas** : dimensions (largeur, hauteur)
- **Fond** : mode (uniforme/degrade), couleurs, opacites
- **Header** : equipes (code + nom du pays), scores, horloge, periode, penalites, temps morts, tirs au but
- **Polices** : identifiant + famille CSS resolue pour chaque zone (equipes, horloge, corps)
- **Tailles de police** : toutes les tailles configurees
- **Couleurs** : toutes les couleurs de chaque element
- **Body type** : type actif (1-14) avec son label et toutes les donnees specifiques (stats, classement, fiche joueur, etc.)
- **Logos** : mode, positions et tailles des logos competition et sponsor
- **Animations** : configuration complete des animations d'entree, sortie, score, penalites, horloge
- **Visibilite** et **media de fond**

### Usage

Ce fichier est destine aux developpeurs qui doivent reproduire un ecran specifique. Il contient toutes les valeurs necessaires sans avoir a ouvrir l'editeur.

Fonctionne pour **tous les body types** (1-14), pas uniquement le Layout libre.
