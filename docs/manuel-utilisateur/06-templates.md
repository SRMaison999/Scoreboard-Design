# Manuel utilisateur - Gestion des templates

## Qu'est-ce qu'un template ?

Un template est une sauvegarde complete de la configuration du scoreboard : equipes, scores, couleurs, polices, tailles, type d'affichage, phases, stats, et tous les autres parametres.

## Sauvegarder un template

1. Cliquer sur le bouton de sauvegarde dans la barre d'outils
2. Saisir un nom pour le template
3. Confirmer la sauvegarde

Le template est sauvegarde dans la base de donnees locale du navigateur (IndexedDB). Il persiste entre les sessions.

## Charger un template

1. Ouvrir le gestionnaire de templates
2. La liste de tous les templates sauvegardes apparait, tries par date de modification
3. Cliquer sur un template pour le charger
4. L'etat du scoreboard est remplace par celui du template

## Renommer un template

Dans le gestionnaire de templates, cliquer sur l'icone de crayon a cote du nom du template pour le renommer.

## Dupliquer un template

Cliquer sur l'icone de copie pour creer une copie du template. La copie est nommee avec le suffixe "(copie)".

## Supprimer un template

Cliquer sur l'icone de corbeille pour supprimer un template. Une confirmation est demandee avant la suppression definitive.

## Exporter un template

Pour partager un template ou en garder une copie externe :

1. Cliquer sur l'icone de telechargement a cote du template
2. Un fichier `.scoreboard.json` est telecharge

Le fichier JSON contient toute la configuration du template et peut etre importe sur un autre poste.

## Importer un template

Pour utiliser un template recu ou sauvegarde precedemment :

1. Cliquer sur le bouton d'import dans le gestionnaire
2. Selectionner un fichier `.scoreboard.json`
3. Le template est ajoute a la bibliotheque

## Export rapide

Il est egalement possible d'exporter l'etat courant du scoreboard directement, sans l'avoir sauvegarde au prealable comme template.

## Format du fichier

Les fichiers de template utilisent le format JSON avec l'extension `.scoreboard.json`. Ils contiennent :

- Version du format
- Nom du template
- Dates de creation et modification
- Etat complet du scoreboard
