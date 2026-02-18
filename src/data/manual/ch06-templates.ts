import type { ManualChapter } from '@/types/userManual';

export const ch06: ManualChapter = {
  id: 'templates',
  title: 'Gestion des templates',
  content: `## O\u00f9 trouver le gestionnaire de templates

Le gestionnaire de templates se trouve dans la **barre d'outils en haut \u00e0 gauche** de l'\u00e9cran, \u00e0 c\u00f4t\u00e9 du nom du template actif. Tous les boutons de gestion (sauvegarder, charger, exporter, importer, etc.) sont regroup\u00e9s dans cette zone.

## Qu'est-ce qu'un template ?

Un template est une sauvegarde compl\u00e8te de la configuration du scoreboard : \u00e9quipes, scores, couleurs, polices, tailles, type d'affichage, phases, stats, et tous les autres param\u00e8tres.

## Sauvegarder un template

1. Cliquer sur le bouton de sauvegarde dans le gestionnaire de templates (en haut \u00e0 gauche)
2. Saisir un nom pour le template
3. Confirmer la sauvegarde

Le template est sauvegard\u00e9 dans la base de donn\u00e9es locale (IndexedDB).

## Charger un template

1. Cliquer sur le bouton de chargement dans le gestionnaire de templates (en haut \u00e0 gauche)
2. La liste de tous les templates sauvegard\u00e9s appara\u00eet
3. Cliquer sur un template pour le charger

## Actions sur un template

Dans la liste des templates, chaque entr\u00e9e dispose d'ic\u00f4nes d'action :

| Ic\u00f4ne | Action |
|-------|--------|
| Crayon | Renommer le template |
| Copie | Dupliquer le template |
| T\u00e9l\u00e9chargement | Exporter en fichier .scoreboard.json |
| Corbeille | Supprimer (avec confirmation) |

## Importer un template

1. Cliquer sur le bouton d'import dans le gestionnaire de templates
2. S\u00e9lectionner un fichier .scoreboard.json
3. Le template est ajout\u00e9 \u00e0 la biblioth\u00e8que`,
};
