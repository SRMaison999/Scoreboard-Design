import type { ManualChapter } from '@/types/userManual';

export const ch12: ManualChapter = {
  id: 'animations',
  title: 'Animations et export',
  content: `## Animations du scoreboard

### Animation d'entr\u00e9e/sortie

| Animation | Description |
|-----------|-------------|
| Aucune | Apparition/disparition instantan\u00e9e |
| Fondu | Apparition/disparition progressive |
| Glissement haut | Glisse depuis le haut |
| Glissement bas | Glisse depuis le bas |
| Glissement gauche | Glisse depuis la gauche |
| Glissement droite | Glisse depuis la droite |

Param\u00e8tres configurables : dur\u00e9e (100-2000 ms) et easing.

### Pop de score

Lorsqu'un score change, le chiffre effectue une animation d'agrandissement temporaire. Dur\u00e9e configurable : 100-1000 ms.

### Flash de p\u00e9nalit\u00e9

Lorsqu'une nouvelle p\u00e9nalit\u00e9 est ajout\u00e9e, la colonne de p\u00e9nalit\u00e9s clignote bri\u00e8vement. Dur\u00e9e : 200-1500 ms.

### Pulsation de l'horloge

Quand le temps restant descend sous un seuil configurable, l'horloge pulse pour signaler la fin imminente. Seuil : 5-60 secondes.

## Export vid\u00e9o

1. Ouvrir la section **Export vid\u00e9o / GIF**
2. Choisir le **format vid\u00e9o** (WebM ou MP4)
3. Configurer les **FPS** (10-60)
4. Cliquer sur **D\u00e9marrer l'enregistrement**
5. Manipuler le scoreboard normalement
6. Cliquer sur **Arr\u00eater l'enregistrement**

## Export GIF

1. Configurer la **dur\u00e9e** du GIF (1-15 secondes)
2. Configurer les **FPS** (5-30)
3. Choisir la **qualit\u00e9** (Basse, Moyenne, Haute)
4. Cliquer sur **G\u00e9n\u00e9rer le GIF**

| Qualit\u00e9 | Description | Taille de fichier |
|---------|-------------|-------------------|
| Basse | Traitement rapide | Petite |
| Moyenne | Bon compromis | Moyenne |
| Haute | Meilleure fid\u00e9lit\u00e9 | Grande |`,
};
