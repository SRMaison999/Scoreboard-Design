import type { ManualChapter } from '@/types/userManual';

export const ch02: ManualChapter = {
  id: 'editeur',
  title: 'Panneau \u00e9diteur',
  content: `Le panneau \u00e9diteur est la colonne de gauche de l'application. Il contient tous les contr\u00f4les pour configurer le scoreboard.

## Navigation g\u00e9n\u00e9rale

### Rail d'ic\u00f4nes (bord gauche de l'\u00e9cran)

Un rail vertical d'ic\u00f4nes tout \u00e0 gauche permet de basculer entre 6 groupes :

| Ic\u00f4ne | Groupe | R\u00f4le |
|-------|--------|------|
| Grille | **Modes** | Choisir le type d'affichage (classement, stats, but, etc.) |
| Fichier | **Contenu** | Remplir les donn\u00e9es : \u00e9quipes, scores, stats, p\u00e9nalit\u00e9s |
| Palette | **Apparence** | Personnaliser couleurs, polices, dimensions |
| Horloge | **Horloge** | G\u00e9rer le temps de jeu et les phases |
| Film | **Animations** | R\u00e9gler les animations et exporter vid\u00e9o/GIF |
| Radio | **Int\u00e9grations** | Scores en direct, multi-scoreboard, broadcast |

### Sous-onglets (en haut de chaque panneau)

Chaque groupe peut contenir des sous-onglets horizontaux :

- **Contenu** : G\u00e9n\u00e9ral | \u00c9quipes | Match | M\u00e9dias
- **Apparence** : Style | Polices | Couleurs
- **Animations** : Animations | Export
- **Int\u00e9grations** : Live | Multi | Sync | Broadcast

### Sections d\u00e9pliables

\u00c0 l'int\u00e9rieur de chaque sous-onglet, les sections peuvent \u00eatre repli\u00e9es ou d\u00e9pli\u00e9es en cliquant sur leur titre. Cela permet de gagner de l'espace et de se concentrer sur la section qui vous int\u00e9resse.

## Workflow principal : du choix du mode au scoreboard finalis\u00e9

Voici le parcours typique pour cr\u00e9er un scoreboard :

### 1. Choisir le mode d'affichage

- Cliquez sur l'ic\u00f4ne **Grille** dans le rail (1\u00e8re ic\u00f4ne)
- Le panneau **Modes** affiche 14 types d'affichage class\u00e9s par cat\u00e9gorie
- Cliquez sur le mode souhait\u00e9 (exemple : **Stats sym\u00e9triques**)
- **L'application bascule automatiquement** vers le panneau **Contenu > \u00c9quipes** pour que vous puissiez imm\u00e9diatement remplir les donn\u00e9es

### 2. Remplir le contenu

Le panneau **Contenu > \u00c9quipes** affiche :
- **Header** : s\u00e9lection des \u00e9quipes, saisie des scores
- **Section sp\u00e9cifique au mode** : les champs changent selon le type d'affichage choisi

### 3. Personnaliser

Basculez vers **Apparence** (ic\u00f4ne palette) pour modifier les couleurs, polices et dimensions.

### 4. Utiliser

Capturez, imprimez ou ouvrez la sortie broadcast.

## \u00c9dition directe sur le preview (double-clic)

Vous pouvez modifier certains textes directement dans le preview, sans passer par le panneau \u00e9diteur :

| \u00c9l\u00e9ment | Action |
|---------|--------|
| Nom d'\u00e9quipe (gauche ou droite) | Double-cliquez pour modifier le code pays |
| Score (gauche ou droite) | Double-cliquez pour modifier le score |
| Horloge | Double-cliquez pour modifier le temps |
| P\u00e9riode | Double-cliquez pour modifier le texte de la p\u00e9riode |

**Valider** : appuyez sur **Entr\u00e9e** ou cliquez ailleurs.
**Annuler** : appuyez sur **\u00c9chappement**.

## Panneau Modes (1\u00e8re ic\u00f4ne du rail)

Le panneau Modes propose 14 types d'affichage organis\u00e9s en 4 cat\u00e9gories :

### Personnalis\u00e9
- **Layout libre** : canvas vierge o\u00f9 vous placez les \u00e9l\u00e9ments librement (voir chapitre 3 pour le guide complet)

### Statistiques
- **Stats sym\u00e9triques** : lignes de statistiques avec valeurs gauche/droite
- **Stats asym\u00e9triques** : deux colonnes de statistiques ind\u00e9pendantes
- **Stats joueur** : statistiques individuelles avec photo optionnelle
- **Face-\u00e0-face** : deux joueurs compar\u00e9s avec stats
- **Barres comparatives** : visualisation en barres horizontales

### \u00c9v\u00e9nements de match
- **C\u00e9l\u00e9bration de but** : annonce de but avec buteur et passeurs
- **Fiche joueur** : pr\u00e9sentation d\u00e9taill\u00e9e d'un joueur
- **Score final** : r\u00e9sultat final avec scores par p\u00e9riode
- **Chronologie** : \u00e9v\u00e9nements du match dans l'ordre

### Informations
- **Classement** : tableau de classement avec colonnes configurables
- **Texte libre** : messages, annonces, sponsors
- **Composition** : lineup d'\u00e9quipe (roster)
- **Calendrier** : prochains matchs ou r\u00e9sultats

Chaque bouton affiche le nom du mode et une br\u00e8ve description. Le mode actif est surlign\u00e9 en bleu.

## Panneau Contenu (2\u00e8me ic\u00f4ne du rail)

### Sous-onglet G\u00e9n\u00e9ral

- **Colonnes de p\u00e9nalit\u00e9s** : active/d\u00e9sactive les colonnes de p\u00e9nalit\u00e9s dans le header

### Sous-onglet \u00c9quipes

Le contenu de ce sous-onglet d\u00e9pend du mode d'affichage choisi :

- **Header** : toujours visible, permet de s\u00e9lectionner les \u00e9quipes et les scores
- **Titres** : visibles pour les modes 1 \u00e0 3 (textes au-dessus du corps)
- **Section sp\u00e9cifique** : varie selon le mode (par exemple, lignes de stats pour le mode 1, champs de but pour le mode 4, etc.)

### Sous-onglet Match

- **Temps morts** : activation et compteur par \u00e9quipe
- **Tirs au but** : activation et saisie des tentatives
- **P\u00e9nalit\u00e9s** : ajout/suppression pour chaque \u00e9quipe

### Sous-onglet M\u00e9dias

- **Photos des joueurs** : galerie de photos par \u00e9quipe et num\u00e9ro (voir chapitre 10)
- **Logos** : logos d'\u00e9quipes, comp\u00e9tition et sponsor (voir chapitre 11)

## Panneau Apparence (3\u00e8me ic\u00f4ne du rail)

### Sous-onglet Style

- **Dimensions du template** : taille du canvas (presets HD/4K ou personnalis\u00e9)
- **Arri\u00e8re-plan** : aucun, image ou vid\u00e9o de fond

### Sous-onglet Polices

- **Polices** : 3 zones ind\u00e9pendantes (noms d'\u00e9quipes, horloge, corps)
- **Tailles de police** : contr\u00f4le de chaque \u00e9l\u00e9ment textuel. Maintenez le clic sur + ou - pour ajuster rapidement la taille
- **Mise \u00e0 l'\u00e9chelle** : slider proportionnel par type de corps

### Sous-onglet Couleurs

- **14 canaux de couleur** avec opacit\u00e9 individuelle (voir chapitre 4)
- **5 presets** de couleurs (OMEGA Blue, Dark Mode, Ice White, Hockey Red, Arena Green)

## Panneau Horloge (4\u00e8me ic\u00f4ne du rail)

Section unique contenant l'horloge, les phases et le mode d\u00e9mo (voir chapitre 5).

## Panneau Animations (5\u00e8me ic\u00f4ne du rail)

- **Sous-onglet Animations** : animations d'entr\u00e9e/sortie du scoreboard, effets visuels
- **Sous-onglet Export** : export vid\u00e9o (WebM/MP4), export GIF, sp\u00e9cifications techniques JSON

## Panneau Int\u00e9grations (6\u00e8me ic\u00f4ne du rail)

- **Live** : connexion \u00e0 une API de scores en temps r\u00e9el
- **Multi** : gestion de multi-scoreboards (bande basse, bug, ticker)
- **Sync** : synchronisation multi-poste via WebSocket
- **Broadcast** : int\u00e9gration CasparCG / Viz`,
};
