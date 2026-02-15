# 12. Animations et export

## Animations du scoreboard

Le scoreboard prend en charge plusieurs types d'animations configurables depuis le panneau editeur, dans la section **Animations et export > Animations**.

### Animation d'entree/sortie

Le scoreboard peut apparaitre et disparaitre avec une animation configurable :

| Animation | Description |
|-----------|-------------|
| Aucune | Pas d'animation, apparition/disparition instantanee |
| Fondu | Apparition/disparition progressive (opacite) |
| Glissement haut | Le scoreboard glisse depuis le haut de l'ecran |
| Glissement bas | Le scoreboard glisse depuis le bas de l'ecran |
| Glissement gauche | Le scoreboard glisse depuis la gauche |
| Glissement droite | Le scoreboard glisse depuis la droite |

**Parametres configurables :**
- **Duree** : 100 a 2000 ms
- **Easing** : lineaire, ease, ease-in, ease-out, ease-in-out

Le bouton **Afficher/Masquer le scoreboard** permet de declencher l'animation d'entree ou de sortie.

### Pop de score

Lorsqu'un score change, le chiffre du score effectue une animation de « pop » (agrandissement temporaire) pour attirer l'attention.

**Parametres :**
- Activer/desactiver via la case a cocher
- Duree du pop : 100 a 1000 ms

### Flash de penalite

Lorsqu'une nouvelle penalite est ajoutee, la colonne de penalites correspondante clignote brievement.

**Parametres :**
- Activer/desactiver via la case a cocher
- Duree du flash : 200 a 1500 ms

### Pulsation de l'horloge

Quand le temps restant descend sous un seuil configurable, l'horloge pulse (legere pulsation de taille) pour signaler la fin imminente de la periode.

**Parametres :**
- Activer/desactiver via la case a cocher
- Seuil : 5 a 60 secondes

---

## Export video

L'application permet d'enregistrer le scoreboard en video directement depuis le navigateur.

### Demarrer un enregistrement

1. Ouvrir la section **Export video / GIF** dans le panneau editeur
2. Choisir le **format video** (WebM ou MP4)
3. Configurer les **FPS** (10 a 60 images par seconde)
4. Cliquer sur **Demarrer l'enregistrement**
5. Manipuler le scoreboard normalement (changer les scores, lancer l'horloge, etc.)
6. Cliquer sur **Arreter l'enregistrement**

Le fichier video est automatiquement telecharge.

### Notes techniques

- L'enregistrement utilise l'API MediaRecorder du navigateur
- Chaque frame est capturee via html-to-image puis dessinee sur un canvas
- Le format WebM est recommande pour la meilleure compatibilite navigateur
- Le format MP4 peut ne pas etre supporte par tous les navigateurs

---

## Export GIF

L'application permet d'exporter le scoreboard en GIF anime.

### Generer un GIF

1. Ouvrir la section **Export video / GIF**
2. Configurer la **duree** du GIF (1 a 15 secondes)
3. Configurer les **FPS** (5 a 30 images par seconde)
4. Choisir la **qualite** (Basse, Moyenne, Haute)
5. Cliquer sur **Generer le GIF**
6. Attendre la fin de la generation (barre de progression affichee)

Le fichier GIF est automatiquement telecharge.

### Notes sur la qualite

| Qualite | Description | Taille de fichier |
|---------|-------------|-------------------|
| Basse | Traitement rapide, couleurs reduites | Petite |
| Moyenne | Bon compromis qualite/taille | Moyenne |
| Haute | Meilleure fidelite des couleurs | Grande |

### Conseils d'utilisation

- Pour un GIF de transition (intro/outro), utilisez 3 a 5 secondes
- Pour un GIF avec l'horloge en marche, utilisez 5 a 10 secondes
- Reduisez les FPS a 10 pour des fichiers plus legers
- La qualite Moyenne convient a la plupart des usages
