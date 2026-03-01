# Templates, rosters et exports

[Sommaire](./README.md) | [Chapitre précédent](./07-animations-et-overlays.md) | [Chapitre suivant](./09-integrations.md)

---

## Sauvegarde et chargement de templates

Chaque configuration de scoreboard — couleurs, polices, équipes, tailles, type d'affichage, positions des éléments dans le Layout libre — peut être sauvegardée sous forme de template nommé. Les templates sont stockés localement dans IndexedDB et peuvent être chargés, dupliqués, renommés ou supprimés à tout moment.

L'état de travail courant est automatiquement sauvegardé à chaque modification (auto-save permanent), de sorte qu'une fermeture accidentelle du navigateur ne provoque aucune perte de données.

## Export et import de templates

Les templates sont exportables au format `.scoreboard.json` — un fichier portable et lisible contenant la version, le nom, les horodatages et l'intégralité de l'état du scoreboard. Ce fichier peut être partagé entre membres de l'équipe, archivé pour des événements futurs, ou transmis à un autre poste de production.

L'import reconstitue intégralement l'état du scoreboard à partir du fichier, permettant de passer d'un habillage à un autre en quelques secondes.

## Presets de champs

En complément des templates complets, le système de presets permet de sauvegarder et réutiliser des éléments individuels ou des écrans complets du Layout libre. Les presets sont également exportables en `.preset.json` pour le partage et la réutilisation entre projets.

## Import de rosters

L'application accepte les compositions d'équipe depuis trois formats de fichiers :

- **CSV** — Format tabulaire universel, compatible avec tous les tableurs et systèmes de gestion sportive.
- **Excel** (XLSX) — Import direct depuis les fichiers des fédérations ou des organisateurs.
- **JSON** — Intégration avec les systèmes de données programmatiques.

La détection automatique des colonnes (numéro, nom, position) et deux modes d'import (remplacer ou ajouter) permettent de configurer un match complet en quelques secondes. Les rosters importés sont également exportables dans ces trois formats.

## Captures et exports visuels

### Capture d'écran

Un clic génère une image PNG à la résolution native du canvas (1920x1080, 4K, ou toute résolution personnalisée). Le fichier est automatiquement nommé avec les noms des équipes et l'horodatage. Idéal pour les réseaux sociaux, les communiqués de presse ou les archives.

### Impression

Impression directe via le navigateur, optimisée en orientation paysage avec arrière-plans couleur préservés.

### Export vidéo et GIF

**Vidéo** — Enregistrement au format WebM ou MP4, avec une fréquence d'images configurable de 10 à 60 FPS. Pour capturer des séquences d'animation ou des moments de match.

**GIF animé** — Export en GIF avec durée configurable (1 à 15 secondes), fréquence de 5 à 30 FPS, et trois niveaux de qualité (bas, moyen, haut). Pour les réseaux sociaux et les communications rapides.

---

[Chapitre suivant : Intégrations broadcast](./09-integrations.md)
