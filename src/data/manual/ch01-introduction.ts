import type { ManualChapter } from '@/types/userManual';

export const ch01: ManualChapter = {
  id: 'introduction',
  title: 'Introduction',
  content: `## Qu'est-ce que le Scoreboard Editor ?

Le Scoreboard Editor est un \u00e9diteur visuel de scoreboards pour retransmissions de hockey sur glace. Il permet de concevoir, personnaliser et exploiter en direct des affichages de scores, statistiques et classements destin\u00e9s \u00e0 l'incrustation vid\u00e9o.

## \u00c0 qui s'adresse cette application ?

- **Op\u00e9rateurs scoreboard** : manipulation du scoreboard en direct pendant un match (scores, p\u00e9nalit\u00e9s, phases)
- **Designers broadcast** : conception des templates visuels avant l'\u00e9v\u00e9nement (couleurs, polices, layout)
- **Directeurs techniques** : configuration de l'ensemble pour un \u00e9v\u00e9nement (\u00e9quipes, phases, personnalisation)

## D\u00e9marrage rapide : votre premier scoreboard en 5 \u00e9tapes

### \u00c9tape 1 : Ouvrir l'application

Ouvrez l'application dans votre navigateur. Le scoreboard s'affiche avec les param\u00e8tres par d\u00e9faut : deux \u00e9quipes vierges, score 0-0, horloge \u00e0 20:00.

### \u00c9tape 2 : Choisir un mode d'affichage

Dans le **rail d'ic\u00f4nes** (tout \u00e0 gauche), cliquez sur la 1\u00e8re ic\u00f4ne (grille). Le **panneau Modes** s'ouvre et propose 14 types d'affichage organis\u00e9s par cat\u00e9gorie. Cliquez sur le mode souhait\u00e9 (par exemple **Stats sym\u00e9triques**). L'application bascule automatiquement vers le panneau de contenu pour que vous puissiez remplir les donn\u00e9es.

### \u00c9tape 3 : Remplir les donn\u00e9es

Vous \u00eates maintenant dans le panneau **Contenu**, sous-onglet **\u00c9quipes**. C'est ici que vous configurez :
- Le **header** : s\u00e9lectionnez les \u00e9quipes (31 nations disponibles), saisissez les scores
- Le **corps** : selon le mode choisi, remplissez les statistiques, le classement, etc.

**Astuce** : vous pouvez aussi **double-cliquer** directement sur les noms d'\u00e9quipes, les scores, l'horloge ou la p\u00e9riode dans le preview pour les modifier sans passer par le panneau.

### \u00c9tape 4 : Personnaliser l'apparence

Dans le rail, cliquez sur l'ic\u00f4ne **palette** (3\u00e8me ic\u00f4ne) pour acc\u00e9der aux r\u00e9glages d'apparence :
- **Style** : dimensions du canvas (Full HD, 4K, etc.)
- **Polices** : 25 polices professionnelles pour 3 zones (noms, horloge, corps)
- **Couleurs** : 14 canaux de couleur avec opacit\u00e9, ou appliquez un preset (5 th\u00e8mes)

### \u00c9tape 5 : Utiliser le scoreboard

Utilisez les boutons de la **barre d'outils** en haut \u00e0 droite :

| Bouton | Action |
|--------|--------|
| Capture | T\u00e9l\u00e9charge le scoreboard en PNG haute r\u00e9solution |
| Imprimer | Ouvre le dialogue d'impression |
| Mode op\u00e9rateur | Interface simplifi\u00e9e pour contr\u00f4le live pendant un match |
| Ouvrir la sortie | Fen\u00eatre capturable par OBS/vMix pour l'incrustation vid\u00e9o |
| Manuel | Ouvre ce manuel |

## Les trois vues de l'application

| Vue | Acc\u00e8s | Usage |
|-----|-------|-------|
| \u00c9diteur | Page d'accueil | Concevoir et personnaliser le scoreboard |
| Op\u00e9rateur | Bouton "Mode op\u00e9rateur" | Contr\u00f4le live pendant un match (scores, horloge, p\u00e9nalit\u00e9s) |
| Sortie | Bouton "Ouvrir la sortie" | Fen\u00eatre capturable par OBS/vMix |

## Sauvegarde automatique

L'\u00e9tat du scoreboard est sauvegard\u00e9 automatiquement dans le navigateur. En revenant sur l'application, vous retrouvez votre configuration telle que vous l'avez laiss\u00e9e.

## Gestionnaire de templates

Le gestionnaire de templates se trouve en haut \u00e0 gauche de l'\u00e9cran. Il permet de sauvegarder, charger, renommer, dupliquer, exporter et importer des templates (voir chapitre 6).`,
};
