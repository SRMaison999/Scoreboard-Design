# Pourquoi Scoreboard Design

[Sommaire](./README.md) | [Chapitre précédent](./09-integrations.md)

---

## Pour les designers visuels

Vous concevez des habillages pour des retransmissions sportives et vous en avez assez des templates figées ? Scoreboard Design vous donne un canvas blanc avec 45 éléments à combiner librement. Guides d'alignement, rotation, multi-sélection, undo illimité, presets réutilisables — tous les outils que vous attendez d'un logiciel de design, au service du broadcast sportif. Et ce que vous concevez dans l'éditeur est exactement ce qui apparaît à l'antenne.

## Pour les directeurs techniques

Un seul outil remplace la chaîne habituelle logiciel de design + fichiers de configuration + outil d'exploitation live. Configurez l'identité visuelle, importez les rosters, préparez les templates, et confiez les commandes à l'opérateur — le tout dans la même application. Les templates sont portables, les exports sont standardisés, et la synchronisation multi-poste permet de coordonner toute l'équipe de production.

## Pour les opérateurs en régie

L'interface opérateur est délibérément minimaliste. Des boutons larges, des raccourcis clavier pour chaque action, et une propagation instantanée vers la sortie broadcast. Pas de menus imbriqués, pas de paramètres à mémoriser. L'opérateur se concentre sur le match, l'outil s'occupe du reste.

## Pour les organisateurs d'événements sportifs

Que vous organisiez un tournoi olympique, un championnat national ou un match amical, Scoreboard Design s'adapte à votre échelle. Import des rosters depuis vos fichiers existants (CSV, Excel, JSON), 31 nations intégrées avec drapeaux, logos personnalisables à tous les niveaux (équipe, compétition, sponsor), résolutions adaptées à tous les supports de diffusion (TV, streaming, réseaux sociaux, affichage in-arena).

## Architecture technique

Scoreboard Design est une application web moderne, fonctionnant entièrement dans le navigateur, sans installation ni serveur requis :

- **React 19** avec TypeScript strict pour une fiabilité totale
- **Rendu HTML/CSS pur** (pas de canvas 2D) — le scoreboard est un document web standard, capturable par n'importe quel outil de capture de fenêtre
- **Canvas virtuel à résolution fixe** (1920x1080 par défaut) avec mise à l'échelle automatique via `transform: scale()`
- **Stockage local** (IndexedDB + localStorage) — toutes les données restent sur le poste, aucune dépendance serveur
- **Synchronisation inter-fenêtres** via BroadcastChannel API — zéro latence entre éditeur et sortie
- **1 584 tests automatisés** sur 211 fichiers de test pour une stabilité en conditions de production

L'application est conçue pour fonctionner hors ligne, sur un réseau local fermé, ou dans n'importe quel environnement de production broadcast où la fiabilité prime sur la connectivité.

---

*Scoreboard Design for Ice Hockey — Quand le design broadcast rencontre la production live.*
