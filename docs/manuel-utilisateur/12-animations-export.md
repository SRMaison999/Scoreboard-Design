# 12. Animations et export

## Animations du scoreboard

Le scoreboard prend en charge plusieurs types d'animations configurables depuis le panneau éditeur, dans la section **Animations et export > Animations**.

### Animation d'entrée/sortie

Le scoreboard peut apparaître et disparaître avec une animation configurable :

| Animation | Description |
|-----------|-------------|
| Aucune | Pas d'animation, apparition/disparition instantanée |
| Fondu | Apparition/disparition progressive (opacité) |
| Glissement haut | Le scoreboard glisse depuis le haut de l'écran |
| Glissement bas | Le scoreboard glisse depuis le bas de l'écran |
| Glissement gauche | Le scoreboard glisse depuis la gauche |
| Glissement droite | Le scoreboard glisse depuis la droite |

**Paramètres configurables :**
- **Durée** : 100 à 2000 ms
- **Easing** : linéaire, ease, ease-in, ease-out, ease-in-out

Le bouton **Afficher/Masquer le scoreboard** permet de déclencher l'animation d'entrée ou de sortie.

### Pop de score

Lorsqu'un score change, le chiffre du score effectue une animation de « pop » (agrandissement temporaire) pour attirer l'attention.

**Paramètres :**
- Activer/désactiver via la case à cocher
- Durée du pop : 100 à 1000 ms

### Flash de pénalité

Lorsqu'une nouvelle pénalité est ajoutée, la colonne de pénalités correspondante clignote brièvement.

**Paramètres :**
- Activer/désactiver via la case à cocher
- Durée du flash : 200 à 1500 ms

### Pulsation de l'horloge

Quand le temps restant descend sous un seuil configurable, l'horloge pulse (légère pulsation de taille) pour signaler la fin imminente de la période.

**Paramètres :**
- Activer/désactiver via la case à cocher
- Seuil : 5 à 60 secondes

---

## Export vidéo

L'application permet d'enregistrer le scoreboard en vidéo directement depuis le navigateur.

### Démarrer un enregistrement

1. Ouvrir la section **Export vidéo / GIF** dans le panneau éditeur
2. Choisir le **format vidéo** (WebM ou MP4)
3. Configurer les **FPS** (10 à 60 images par seconde)
4. Cliquer sur **Démarrer l'enregistrement**
5. Manipuler le scoreboard normalement (changer les scores, lancer l'horloge, etc.)
6. Cliquer sur **Arrêter l'enregistrement**

Le fichier vidéo est automatiquement téléchargé.

### Notes techniques

- L'enregistrement utilise l'API MediaRecorder du navigateur
- Chaque frame est capturée via html-to-image puis dessinée sur un canvas
- Le format WebM est recommandé pour la meilleure compatibilité navigateur
- Le format MP4 peut ne pas être supporté par tous les navigateurs

---

## Export GIF

L'application permet d'exporter le scoreboard en GIF animé.

### Générer un GIF

1. Ouvrir la section **Export vidéo / GIF**
2. Configurer la **durée** du GIF (1 à 15 secondes)
3. Configurer les **FPS** (5 à 30 images par seconde)
4. Choisir la **qualité** (Basse, Moyenne, Haute)
5. Cliquer sur **Générer le GIF**
6. Attendre la fin de la génération (barre de progression affichée)

Le fichier GIF est automatiquement téléchargé.

### Notes sur la qualité

| Qualité | Description | Taille de fichier |
|---------|-------------|-------------------|
| Basse | Traitement rapide, couleurs réduites | Petite |
| Moyenne | Bon compromis qualité/taille | Moyenne |
| Haute | Meilleure fidélité des couleurs | Grande |

### Conseils d'utilisation

- Pour un GIF de transition (intro/outro), utilisez 3 à 5 secondes
- Pour un GIF avec l'horloge en marche, utilisez 5 à 10 secondes
- Réduisez les FPS à 10 pour des fichiers plus légers
- La qualité Moyenne convient à la plupart des usages
