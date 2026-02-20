# Scoreboard Design

Editeur visuel de templates de scoreboard pour retransmissions de hockey sur glace. Application broadcast professionnelle permettant de concevoir, personnaliser et exploiter en direct des affichages de scores, statistiques et classements destines a l'incrustation video.

## Fonctionnalites

### 14 types d'affichage (body types)

| Type | Nom | Description |
|------|-----|-------------|
| 1 | Stats symetriques | Statistiques equipe gauche / droite |
| 2 | Stats asymetriques | Statistiques en colonnes decalees |
| 3 | Stats joueur | Photo joueur + liste label/valeur |
| 4 | But | Ecran de celebration de but |
| 5 | Fiche joueur | Vue detaillee d'un joueur |
| 6 | Classement | Tableau de classement (standings) |
| 7 | Score final | Ecran de fin de match |
| 8 | Texte libre | Message configurable |
| 9 | Face-a-face | Comparaison tete-a-tete |
| 10 | Calendrier | Liste des matchs |
| 11 | Tirs au but | Suivi des tirs au but |
| 12 | Timeline | Frise chronologique des evenements |
| 13 | Barres | Diagramme a barres comparatif |
| 14 | Mise en page libre | Editeur drag-and-drop de champs personnalises |

### Editeur visuel complet

- **6 panneaux d'edition** : Modes, Contenu, Apparence, Horloge, Animations, Integrations
- **12 canaux de couleur** avec opacite independante
- **10 polices Google Fonts** (Oswald, Barlow, Roboto, etc.)
- **Tailles de police configurables** par zone (equipes, horloge, corps)
- **Drapeaux CSS** pour 31 nations (codes NOC)
- **5 presets de couleurs** : Classic Blue, Dark Pro, Ice White, Hockey Red, Arena Green
- **4 presets de mise en page hockey** pour le mode libre
- **Preview responsive** avec scaling automatique (1920x1080 par defaut, configurable)

### Mode mise en page libre (Body Type 14)

- Placement par glisser-deposer sur le canvas
- Redimensionnement a 8 poignees (Shift = proportionnel, Alt = depuis le centre)
- Guides d'alignement dynamiques (smart guides)
- Multi-selection (Ctrl+Clic, boite de selection)
- Menu contextuel (couper/copier/coller/dupliquer/supprimer/calques)
- Rotation avec accrochage a 15 degres
- Edition de texte en ligne (double-clic)
- Distribution et alignement automatiques
- Bibliotheque de 50+ elements reutilisables
- Zoom (molette, Ctrl+0/1/+/-) et panoramique (Espace+glisser)
- Regles, panneau de calques, raccourcis clavier
- Annuler/refaire (50 niveaux d'historique)

### Mode operateur live

Interface dediee pour le controle en direct pendant la retransmission :

- Controle des scores (+/- par equipe)
- Controle de l'horloge (demarrer, arreter, reinitialiser)
- Gestion des phases (periodes, intermissions, prolongation)
- Gestion des penalites (ajout, decompte automatique)

### Sortie broadcast

- **Fenetre de sortie** plein ecran (capturable par OBS, vMix, CasparCG)
- **Synchronisation multi-fenetres** via BroadcastChannel (editeur, operateur, sortie)
- **3 routes** : `/` (editeur), `/operator` (operateur), `/output` (sortie)

### Gestion des donnees

- **Templates** : sauvegarde/chargement/export/import JSON via IndexedDB
- **Photos joueurs** : stockage IndexedDB avec affichage dans les body types
- **Logos** : logos d'equipe, de competition et de sponsors en IndexedDB
- **Import de rosters** : CSV, Excel (.xlsx) et JSON
- **Presets** : presets de couleurs et de mise en page persistants

### Export

- Capture d'ecran (PNG via html-to-image)
- Impression (feuille de style CSS dediee)
- Export/import de templates JSON
- Frame Data API (delta encoding, snapshots d'etat)
- Enregistrement video et export GIF

### Horloge et phases

- Timer temps reel avec decompte automatique
- Transitions automatiques de phases (echauffement, periodes, intermissions, prolongation)
- Colonnes de penalites avec decompte et disparition a 0:00
- Mode demo pour les tests

## Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | React / TypeScript strict | 19.2 / 5.9 |
| State | Zustand (persist middleware) | 5.0 |
| Styles | Tailwind CSS (editeur) + inline (canvas) | 4.1 |
| Build | Vite | 7.3 |
| Tests | Vitest + Testing Library + jest-dom | 4.0 |
| Persistance | IndexedDB via Dexie.js | 4.3 |
| Desktop | Electron | 40.x |
| Icones | Lucide React | 0.564 |
| Import donnees | PapaParse (CSV) + ExcelJS (Excel) | 5.5 / 4.4 |
| Capture | html-to-image | 1.11 |

## Demarrage rapide

```bash
# Installation des dependances
npm install

# Lancement en mode developpement
npm run dev

# Lancement en mode Electron (desktop)
npm run electron:dev
```

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement Vite |
| `npm run build` | Build de production (TypeScript + Vite) |
| `npm run preview` | Preview du build de production |
| `npm run type-check` | Verification des types TypeScript |
| `npm run lint` | Verification ESLint |
| `npm run test` | Tests en mode watch |
| `npm run test:run` | Execution unique des tests |
| `npm run electron:dev` | Mode developpement Electron |
| `npm run electron:build` | Build Electron (toutes plateformes) |
| `npm run electron:build:win` | Build Electron Windows |
| `npm run electron:build:mac` | Build Electron macOS |
| `npm run electron:build:linux` | Build Electron Linux |

## Structure du projet

```
scoreboard-design/
├── src/
│   ├── app/                    # Point d'entree (App, routes, main)
│   ├── components/
│   │   ├── ui/                 # Composants UI reutilisables
│   │   ├── common/             # Composants partages (manuel utilisateur)
│   │   ├── editor/             # Panneau editeur (6 onglets, 28+ sections)
│   │   ├── preview/            # Canvas de preview + 14 body types
│   │   ├── operator/           # Mode operateur live
│   │   └── output/             # Fenetre de sortie broadcast
│   ├── hooks/                  # 24 hooks custom
│   ├── stores/                 # 16 stores Zustand
│   ├── types/                  # Interfaces TypeScript (32 fichiers)
│   ├── constants/              # Labels, couleurs, polices, nations
│   ├── utils/                  # Helpers (couleur, temps, export, roster)
│   ├── api/                    # Frame Data API, broadcast, live data
│   ├── lib/                    # Utilitaires (cn())
│   ├── styles/                 # CSS (editeur, impression)
│   ├── data/                   # Etat par defaut, presets, manuel
│   └── test/                   # Setup des tests
├── electron/                   # Main process + preload Electron
├── docs/                       # Documentation technique + manuel utilisateur
├── prototype/                  # Prototype React originel (reference)
└── public/                     # Fichiers statiques
```

## Documentation

La documentation complete se trouve dans le repertoire `docs/` :

| Fichier | Description |
|---------|-------------|
| [Specification technique](docs/HOCKEY_SCOREBOARD_EDITOR_SPEC.md) | Architecture, body types, Frame Data API, interfaces TypeScript |
| [Demarrage rapide](docs/ARCHITECTURE_QUICK_START.md) | Guide pour les nouveaux developpeurs |
| [Vue d'ensemble](docs/CODEBASE_OVERVIEW.md) | Architecture du systeme et flux de donnees |
| [Design system](docs/DESIGN_SYSTEM_REFERENCE.md) | Tokens de couleurs et composants UI |
| [Guide de style](docs/COMPONENT_STYLE_GUIDE.md) | Conventions et patterns de composants |
| [Persistance](docs/DATA_PERSISTENCE_ARCHITECTURE.md) | Architecture de stockage (IndexedDB, localStorage) |
| [Index](docs/DOCUMENTATION_INDEX.md) | Index de toute la documentation |
| [Manuel utilisateur](docs/manuel-utilisateur/) | Manuel complet en francais (13 chapitres) |

## Licence

Proprietaire -- Tous droits reserves.
