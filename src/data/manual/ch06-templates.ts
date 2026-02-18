import type { ManualChapter } from '@/types/userManual';

export const ch06: ManualChapter = {
  id: 'templates',
  title: 'Gestion des templates',
  content: `## Qu'est-ce qu'un template ?

Un template est une sauvegarde compl\u00e8te de la configuration du scoreboard : \u00e9quipes, scores, couleurs, polices, tailles, type d'affichage, phases, stats, et tous les autres param\u00e8tres.

## Sauvegarder un template

1. Cliquer sur le bouton de sauvegarde dans la barre d'outils
2. Saisir un nom pour le template
3. Confirmer la sauvegarde

Le template est sauvegard\u00e9 dans la base de donn\u00e9es locale du navigateur (IndexedDB).

## Charger un template

1. Ouvrir le gestionnaire de templates
2. La liste de tous les templates sauvegard\u00e9s appara\u00eet
3. Cliquer sur un template pour le charger

## Renommer un template

Cliquer sur l'ic\u00f4ne de crayon \u00e0 c\u00f4t\u00e9 du nom du template pour le renommer.

## Dupliquer un template

Cliquer sur l'ic\u00f4ne de copie pour cr\u00e9er une copie du template.

## Supprimer un template

Cliquer sur l'ic\u00f4ne de corbeille. Une confirmation est demand\u00e9e avant la suppression d\u00e9finitive.

## Exporter un template

1. Cliquer sur l'ic\u00f4ne de t\u00e9l\u00e9chargement
2. Un fichier \`.scoreboard.json\` est t\u00e9l\u00e9charg\u00e9

## Importer un template

1. Cliquer sur le bouton d'import dans le gestionnaire
2. S\u00e9lectionner un fichier \`.scoreboard.json\`
3. Le template est ajout\u00e9 \u00e0 la biblioth\u00e8que`,
};
