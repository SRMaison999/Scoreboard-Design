import type { ManualChapter } from '@/types/userManual';

export const ch11: ManualChapter = {
  id: 'logos',
  title: 'Logos et drapeaux',
  content: `## Types de logos

L'application supporte quatre types de logos :

| Type | Description | Affichage |
|------|-------------|-----------|
| \u00c9quipe | Logo de chaque \u00e9quipe | Dans l'en-t\u00eate, \u00e0 c\u00f4t\u00e9 du nom |
| Comp\u00e9tition | Logo du tournoi | En superposition (position configurable) |
| Sponsor | Logo du sponsor | En superposition (position configurable) |
| Drapeaux | Remplacement personnalis\u00e9 des drapeaux | Dans l'en-t\u00eate et les body types |

## Drapeaux

L'application int\u00e8gre 31 drapeaux SVG correspondant aux nations de hockey. Pour remplacer un drapeau, ouvrir la section Logos > onglet Drapeaux, choisir le code NOC et s\u00e9lectionner une image.

## Ajouter un logo

1. Ouvrir la section **Logos**
2. S\u00e9lectionner l'onglet du type souhait\u00e9
3. Pour les logos d'\u00e9quipe : s\u00e9lectionner le code \u00e9quipe
4. Cliquer sur **Ajouter un logo** et s\u00e9lectionner un fichier image

## Mode d'affichage des logos d'\u00e9quipe

| Mode | Comportement |
|------|-------------|
| Drapeau | Affiche uniquement le drapeau SVG |
| Logo | Affiche uniquement le logo upload\u00e9 |
| Les deux | Affiche le drapeau et le logo c\u00f4te \u00e0 c\u00f4te |

## Logos de comp\u00e9tition et sponsor

### Position

Six positions sont disponibles : haut gauche, haut centre, haut droite, bas gauche, bas centre, bas droite.

### Taille

La taille maximale est ajustable (80px par d\u00e9faut pour comp\u00e9tition, 60px pour sponsor).

## Persistance

Les logos et drapeaux personnalis\u00e9s sont stock\u00e9s dans IndexedDB et persistent entre les sessions. Les param\u00e8tres d'affichage sont sauvegard\u00e9s avec les templates.`,
};
