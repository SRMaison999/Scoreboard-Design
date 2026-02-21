# Index de la documentation

## Documents techniques

| Document | Description | Public cible |
|----------|-------------|--------------|
| [HOCKEY_SCOREBOARD_EDITOR_SPEC.md](./HOCKEY_SCOREBOARD_EDITOR_SPEC.md) | Specification technique complete (architecture, body types, Frame Data API, interfaces TypeScript, roadmap 9 phases) | Developpeurs |
| [ARCHITECTURE_QUICK_START.md](./ARCHITECTURE_QUICK_START.md) | Guide de demarrage rapide pour les nouveaux developpeurs | Developpeurs |
| [CODEBASE_OVERVIEW.md](./CODEBASE_OVERVIEW.md) | Vue d'ensemble du systeme : flux de donnees, stores, hooks, composants | Developpeurs |
| [DESIGN_SYSTEM_REFERENCE.md](./DESIGN_SYSTEM_REFERENCE.md) | Reference du design system : couleurs, polices, tokens, composants UI | Developpeurs, designers |
| [COMPONENT_STYLE_GUIDE.md](./COMPONENT_STYLE_GUIDE.md) | Guide de style des composants : conventions, patterns, exemples | Developpeurs |
| [DATA_PERSISTENCE_ARCHITECTURE.md](./DATA_PERSISTENCE_ARCHITECTURE.md) | Architecture de persistance : IndexedDB, localStorage, Frame Data API | Developpeurs |

## Manuel utilisateur

| Document | Description |
|----------|-------------|
| [manuel-utilisateur/01-introduction.md](./manuel-utilisateur/01-introduction.md) | Presentation de l'application et prise en main |
| [manuel-utilisateur/02-editeur.md](./manuel-utilisateur/02-editeur.md) | Guide complet du panneau editeur |
| [manuel-utilisateur/03-body-types.md](./manuel-utilisateur/03-body-types.md) | Les 14 types d'affichage (Layout libre en premier, puis types 1-13) |
| [manuel-utilisateur/04-personnalisation.md](./manuel-utilisateur/04-personnalisation.md) | Couleurs, polices, dimensions, presets, mise a l'echelle par corps |
| [manuel-utilisateur/05-horloge-et-phases.md](./manuel-utilisateur/05-horloge-et-phases.md) | Configuration de l'horloge, des phases et du mode demo |
| [manuel-utilisateur/06-templates.md](./manuel-utilisateur/06-templates.md) | Sauvegarde, chargement, import et export de templates |
| [manuel-utilisateur/07-mode-operateur.md](./manuel-utilisateur/07-mode-operateur.md) | Mode operateur live et raccourcis clavier |
| [manuel-utilisateur/08-sortie-broadcast.md](./manuel-utilisateur/08-sortie-broadcast.md) | Fenetre de sortie et integration OBS/vMix |
| [manuel-utilisateur/09-capture-impression.md](./manuel-utilisateur/09-capture-impression.md) | Screenshot et impression |
| [manuel-utilisateur/10-photos-joueurs.md](./manuel-utilisateur/10-photos-joueurs.md) | Gestion des photos de joueurs |
| [manuel-utilisateur/11-logos.md](./manuel-utilisateur/11-logos.md) | Gestion des logos (equipe, competition, sponsor) |
| [manuel-utilisateur/12-animations-export.md](./manuel-utilisateur/12-animations-export.md) | Animations du scoreboard et export video/GIF |
| [manuel-utilisateur/13-integrations.md](./manuel-utilisateur/13-integrations.md) | Integrations : import rosters, API scores, multi-scoreboard, sync, CasparCG/Viz |

## Fichiers projet

| Fichier | Description |
|---------|-------------|
| [../CLAUDE.md](../CLAUDE.md) | Instructions de developpement, interdictions, obligations, checklist |
| [../README.md](../README.md) | Presentation du projet |

## Progression du projet

### Phases completees

| Phase | Description | Statut |
|-------|-------------|--------|
| 1 | Migration du prototype (Vite + React + TypeScript + Zustand + Tailwind) | Termine |
| 2 | Screenshot, impression, tailles de police, dimensions template | Termine |
| 3 | Gestion de templates (IndexedDB, JSON, import/export) | Termine |
| 4 | Frame Data API (serialisation, delta encoding, enregistrement) | Termine |
| 5 | Body types 4-13 (13 types au total) | Termine |
| 6 | Mode operateur live (raccourcis clavier, fenetre de sortie) | Termine |
| 7 | Photos et medias (photos joueurs, logos equipe/competition/sponsor) | Termine |
| 8 | Animations et export video/GIF | Termine |
| 9 | Integrations externes (import rosters, API scores, multi-scoreboard, sync multi-poste, CasparCG/Viz) | Termine |

### Ameliorations du Layout libre (mode editeur avance)

| Fonctionnalite | Description | Statut |
|----------------|-------------|--------|
| Multi-selection | Selection de plusieurs champs (Ctrl+Clic, selection de zone) | Termine |
| Smart guides | Guides d'alignement dynamiques pendant le deplacement | Termine |
| Zoom et panoramique | Zoom molette, Ctrl+0/1/+/-, regles pixel | Termine |
| 8 handles de resize | Poignees coins + bords, Shift (proportionnel), Alt (depuis le centre) | Termine |
| Menu contextuel | Clic droit avec couper/copier/coller/dupliquer/supprimer/calques | Termine |
| Effets visuels | Opacite, ombre portee, flou d'arriere-plan | Termine |
| Drag-and-drop | Glisser-deposer depuis la bibliotheque vers le canvas | Termine |
| Rotation | Poignee de rotation avec snap a 15 degres | Termine |
| Edition inline | Double-clic pour editer le texte directement sur le canvas | Termine |
| Distribution | Alignement et distribution automatique de la multi-selection | Termine |
| Modeles hockey | 4 modeles de layout predefinies pour le hockey | Termine |
| Raccourcis clavier | Modale d'aide avec tous les raccourcis organises par section | Termine |
| Historique debounce | Regroupement intelligent des changements rapides (drag, resize) | Termine |
| Regles canvas | Regles pixel adaptatives le long des bords du canvas | Termine |
| Panneau calques | Renommage inline, icones de type, multi-selection | Termine |
| Performance | React.memo sur les composants de rendu critiques | Termine |
| Rail 4 onglets | Fusion des 10 onglets du rail en 4 (bibliotheque, canvas, calques, presets) avec filtres par categorie | Termine |
| Panneau proprietes lateral droit | Panneau de 300px affiche a droite du canvas quand un champ est selectionne, supporte selection simple et multiple | Termine |
| Sections repliables | Position, z-index/rotation, style et config element dans des sections repliables | Termine |
| Boutons z-index | Remplacement du champ numerique z-index par 4 boutons d'action (premier plan, avancer, reculer, arriere-plan) | Termine |
| Grille + Smart Guides simultanees | La grille et les guides intelligents fonctionnent desormais ensemble (non exclusifs) | Termine |
| Coordonnees curseur | Indicateur de position du curseur (x, y px) en bas a droite du canvas | Termine |
| ZoneSelectionOverlay | Extraction de la zone de selection en composant autonome | Termine |
