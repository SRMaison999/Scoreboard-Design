import type { ManualChapter } from '@/types/userManual';

export const ch02: ManualChapter = {
  id: 'editeur',
  title: 'Panneau \u00e9diteur',
  content: `Le panneau \u00e9diteur est la colonne de gauche de l'application. Il contient tous les contr\u00f4les pour configurer le scoreboard.

## Navigation

### Rail d'ic\u00f4nes (bord gauche de l'\u00e9cran)

Un rail vertical d\u2019ic\u00f4nes tout \u00e0 gauche permet de basculer entre 6 groupes :

| Ic\u00f4ne | Groupe | Description |
|-------|--------|-------------|
| Grille | **Modes** | Choix du type d\u2019affichage du scoreboard |
| Fichier | **Contenu** | \u00c9quipes, scores, p\u00e9nalit\u00e9s, m\u00e9dias |
| Palette | **Apparence** | Dimensions, polices, couleurs, fond |
| Horloge | **Horloge** | Temps de jeu, phases, d\u00e9mo |
| Film | **Animations** | Animations d\u2019entr\u00e9e/sortie, export vid\u00e9o/GIF |
| Radio | **Int\u00e9grations** | Scores en direct, multi-scoreboard, sync, broadcast |

### Sous-onglets (en haut du panneau \u00e9diteur)

Les sous-onglets horizontaux apparaissent juste sous le titre du groupe :

- **Modes** : grille de boutons pour choisir le type d\u2019affichage
- **Contenu** : G\u00e9n\u00e9ral | \u00c9quipes | Match | M\u00e9dias
- **Apparence** : Style | Polices | Couleurs
- **Horloge** : section unique (pas de sous-onglets)
- **Animations** : Animations | Export
- **Int\u00e9grations** : Live | Multi | Sync | Broadcast

### Sections d\u00e9pliables

\u00c0 l\u2019int\u00e9rieur de chaque sous-onglet, les sections peuvent \u00eatre repli\u00e9es en cliquant sur leur titre.

## \u00c9dition directe sur le preview

Double-cliquez sur n\u2019importe quel texte du scoreboard (nom d\u2019\u00e9quipe, score, horloge, p\u00e9riode) pour le modifier directement sur le preview. Validez avec Entr\u00e9e, annulez avec \u00c9chappement.

## Panneau Modes (1\u00e8re ic\u00f4ne du rail)

Cliquez sur l\u2019ic\u00f4ne grille (1\u00e8re ic\u00f4ne du rail) pour ouvrir le panneau de choix du mode d\u2019affichage. Les modes sont organis\u00e9s par cat\u00e9gorie :

- **Personnalis\u00e9** : Layout libre \u2014 canvas vierge o\u00f9 vous placez les \u00e9l\u00e9ments librement
- **Statistiques** : Stats sym\u00e9triques, asym\u00e9triques, joueur, face-\u00e0-face, barres comparatives
- **\u00c9v\u00e9nements de match** : C\u00e9l\u00e9bration de but, fiche joueur, score final, chronologie
- **Informations** : Classement, texte libre, composition d\u2019\u00e9quipe, calendrier

Chaque bouton affiche le nom du mode et une br\u00e8ve description. Le mode actif est surlign\u00e9 en bleu.

En mode **Layout libre**, le canvas est enti\u00e8rement vierge (sans header). Ajoutez des \u00e9l\u00e9ments depuis la biblioth\u00e8que et un panneau de propri\u00e9t\u00e9s s\u2019ouvre en deuxi\u00e8me colonne lorsqu\u2019un \u00e9l\u00e9ment est s\u00e9lectionn\u00e9.

## Groupe Contenu (2e ic\u00f4ne du rail)

### Sous-onglet G\u00e9n\u00e9ral

- **Afficher les p\u00e9nalit\u00e9s** : active/d\u00e9sactive les colonnes de p\u00e9nalit\u00e9s

### Sous-onglet \u00c9quipes

- **En-t\u00eate** : s\u00e9lection des \u00e9quipes (31 nations), saisie des scores
- **Titres** : texte(s) affich\u00e9(s) dans le corps du scoreboard
- **Section sp\u00e9cifique au body type** : contenu variable

### Sous-onglet Match

- **Temps morts** : activation et compteur par \u00e9quipe
- **Tirs au but** : activation et saisie des tentatives
- **P\u00e9nalit\u00e9s** : ajout/suppression pour chaque \u00e9quipe

### Sous-onglet M\u00e9dias

- **Photos des joueurs** : galerie de photos par \u00e9quipe et num\u00e9ro
- **Logos** : logos d'\u00e9quipes, comp\u00e9tition et sponsor avec 4 onglets (voir chapitre 11)

## Groupe Apparence (2e ic\u00f4ne du rail)

### Sous-onglet Style

- **Dimensions du template** : taille du canvas (presets HD/4K ou personnalis\u00e9)
- **Arri\u00e8re-plan** : aucun, image ou vid\u00e9o de fond

### Sous-onglet Polices

- **Polices** : 3 zones de police ind\u00e9pendantes (\u00e9quipes, horloge, corps)
- **Tailles de police** : contr\u00f4le granulaire de chaque \u00e9l\u00e9ment textuel
- **Mise \u00e0 l'\u00e9chelle** : slider proportionnel par type de corps

### Sous-onglet Couleurs

- **Couleurs** : 14 canaux de couleur avec opacit\u00e9 individuelle
- **Presets** : sch\u00e9mas de couleurs pr\u00e9d\u00e9finies (5 th\u00e8mes)

## Groupe Horloge (3e ic\u00f4ne du rail)

Section unique contenant l'horloge, les phases et le mode d\u00e9mo (voir chapitre 5).

## Groupe Animations (4e ic\u00f4ne du rail)

### Sous-onglet Animations

- Animations d'entr\u00e9e et de sortie du scoreboard
- Effets sur changement de score, p\u00e9nalit\u00e9s, horloge

### Sous-onglet Export

- **Export vid\u00e9o** : enregistrement en WebM ou MP4
- **Export GIF** : g\u00e9n\u00e9ration de GIF anim\u00e9
- **Sp\u00e9cifications techniques** : bouton "G\u00e9n\u00e9rer les specs" (t\u00e9l\u00e9charge un JSON)

## Groupe Int\u00e9grations (5e ic\u00f4ne du rail)

### Sous-onglet Live

- Connexion \u00e0 une API de scores en temps r\u00e9el

### Sous-onglet Multi

- Gestion de multi-scoreboards (bande basse, bug, ticker)

### Sous-onglet Sync

- Synchronisation multi-poste via WebSocket

### Sous-onglet Broadcast

- Int\u00e9gration CasparCG / Viz pour diffusion broadcast`,
};
