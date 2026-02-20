# Manuel utilisateur - Gestion des templates

## Qu'est-ce qu'un template ?

Un template est une sauvegarde complète de la configuration du scoreboard : équipes, scores, couleurs, polices, tailles, type d'affichage, phases, stats, et tous les autres paramètres.

## Sauvegarder un template

1. Cliquer sur le bouton de sauvegarde dans la barre d'outils
2. Saisir un nom pour le template
3. Confirmer la sauvegarde

Le template est sauvegardé dans la base de données locale du navigateur (IndexedDB). Il persiste entre les sessions.

## Charger un template

1. Ouvrir le gestionnaire de templates
2. La liste de tous les templates sauvegardés apparaît, triés par date de modification
3. Cliquer sur un template pour le charger
4. L'état du scoreboard est remplacé par celui du template

## Renommer un template

Dans le gestionnaire de templates, cliquer sur l'icône de crayon à côté du nom du template pour le renommer.

## Dupliquer un template

Cliquer sur l'icône de copie pour créer une copie du template. La copie est nommée avec le suffixe "(copie)".

## Supprimer un template

Cliquer sur l'icône de corbeille pour supprimer un template. Une confirmation est demandée avant la suppression définitive.

## Exporter un template

Pour partager un template ou en garder une copie externe :

1. Cliquer sur l'icône de téléchargement à côté du template
2. Un fichier `.scoreboard.json` est téléchargé

Le fichier JSON contient toute la configuration du template et peut être importé sur un autre poste.

## Importer un template

Pour utiliser un template reçu ou sauvegardé précédemment :

1. Cliquer sur le bouton d'import dans le gestionnaire
2. Sélectionner un fichier `.scoreboard.json`
3. Le template est ajouté à la bibliothèque

## Export rapide

Il est également possible d'exporter l'état courant du scoreboard directement, sans l'avoir sauvegardé au préalable comme template.

## Format du fichier

Les fichiers de template utilisent le format JSON avec l'extension `.scoreboard.json`. Ils contiennent :

- Version du format
- Nom du template
- Dates de création et modification
- État complet du scoreboard
