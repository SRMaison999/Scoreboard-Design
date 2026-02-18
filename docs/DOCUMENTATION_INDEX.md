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
| [manuel-utilisateur/03-body-types.md](./manuel-utilisateur/03-body-types.md) | Les 14 types d'affichage disponibles (dont le Layout libre) |
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

### Phases completees (suite)

| Phase | Description | Statut |
|-------|-------------|--------|
| 7 | Photos et medias (photos joueurs, logos equipe/competition/sponsor) | Termine |
| 8 | Animations et export video/GIF | Termine |
| 9 | Integrations externes (import rosters, API scores, multi-scoreboard, sync multi-poste, CasparCG/Viz) | Termine |
