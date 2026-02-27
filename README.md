# Scoreboard Design

> Éditeur visuel de templates de scoreboard pour retransmissions de hockey sur glace. Application broadcast professionnelle permettant de concevoir, personnaliser et exploiter en direct des affichages de scores, statistiques et classements destinés à l'incrustation vidéo.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange)](https://zustand-demo.pmnd.rs/)
[![Electron](https://img.shields.io/badge/Electron-40.x-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

---

## Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Les 14 types d'affichage](#les-14-types-daffichage)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Démarrage rapide](#démarrage-rapide)
- [Scripts disponibles](#scripts-disponibles)
- [Architecture du projet](#architecture-du-projet)
- [Gestion de l'état](#gestion-de-létat)
- [Persistance des données](#persistance-des-données)
- [Routes et modes](#routes-et-modes)
- [Personnalisation visuelle](#personnalisation-visuelle)
- [Mode mise en page libre](#mode-mise-en-page-libre-body-type-14)
- [Horloge et phases](#horloge-et-phases)
- [Sortie broadcast](#sortie-broadcast)
- [Gestion des données](#gestion-des-données)
- [Export et capture](#export-et-capture)
- [Tests](#tests)
- [Déploiement Electron](#déploiement-electron)
- [Documentation](#documentation)
- [Règles de développement](#règles-de-développement)
- [Phases de développement](#phases-de-développement)
- [Licence](#licence)

---

## Aperçu

**Scoreboard Design** est un éditeur professionnel de scoreboards destiné aux retransmissions de hockey sur glace. Il permet aux réalisateurs et opérateurs broadcast de concevoir des templates d'affichage (scores, statistiques, classements), de les personnaliser visuellement, puis de les exploiter en direct avec un contrôle complet de l'horloge, des scores et des pénalités.

L'application fonctionne en mode **desktop** (via Electron), avec trois interfaces synchronisées en temps réel :

| Interface | Route | Rôle |
|-----------|-------|------|
| Éditeur | `/` | Conception et personnalisation des templates |
| Opérateur | `/operator` | Contrôle en direct (scores, horloge, pénalités) |
| Sortie | `/output` | Fenêtre plein écran capturable (OBS, vMix, CasparCG) |

La synchronisation entre les fenêtres s'effectue via l'API `BroadcastChannel`, garantissant une mise à jour instantanée de la sortie broadcast.

---

## Fonctionnalités

### Éditeur visuel complet

- **6 panneaux d'édition** : Modes, Contenu, Apparence, Horloge, Animations, Intégrations
- **14 canaux de couleur** avec opacité indépendante (0-100 %)
- **25 polices Google Fonts** organisées en 6 catégories (Sport, Condensée, Moderne, Display, Monospace, Serif)
- **3 zones de police indépendantes** : équipes, horloge, corps
- **Tailles automatiques** adaptées au nombre de lignes (1 à 8 lignes de statistiques)
- **5 presets de couleurs** : Classic Blue, Dark Pro, Ice White, Hockey Red, Arena Green
- **4 presets de mise en page** pour le mode libre
- **Drapeaux CSS** pour 31 nations (codes NOC)
- **Preview responsive** avec scaling automatique (1920x1080 par défaut, configurable)

### Mode opérateur live

Interface simplifiée pour le contrôle en direct pendant la retransmission :

- Contrôle des scores (+/- par équipe)
- Contrôle de l'horloge (démarrer, arrêter, réinitialiser)
- Gestion des phases (périodes, intermissions, prolongation, tirs au but)
- Gestion des pénalités (ajout, décompte automatique, disparition à expiration)
- Raccourcis clavier dédiés

### Sortie broadcast

- Fenêtre de sortie plein écran capturable par OBS, vMix, Wirecast, CasparCG
- Synchronisation multi-fenêtres en temps réel via `BroadcastChannel`
- Overlays multi-scoreboard optionnels (bandeau bas, score bug, ticker)

### Gestion des médias

- **Photos joueurs** : upload, compression, stockage IndexedDB, affichage circulaire
- **Logos** : équipe, compétition, sponsors — 6 positions, opacité et taille configurables
- **Import de rosters** : CSV, Excel (.xlsx) et JSON avec mapping flexible des colonnes

### Templates et données

- Sauvegarde/chargement/duplication/renommage/suppression via IndexedDB
- Export et import JSON (format `.scoreboard.json`)
- Horodatage de création et de modification
- Persistance complète de l'état dans IndexedDB

### Export et capture

- Capture d'écran PNG (via html-to-image)
- Impression (feuille de style CSS dédiée)
- Export/import de templates JSON
- Enregistrement vidéo (MediaRecorder)
- Export GIF animé (gif.js)
- Frame Data API (delta encoding, snapshots d'état)

---

## Les 14 types d'affichage

L'application propose 14 **body types**, du format fixe au mode libre complet :

| Type | Nom | Description |
|------|-----|-------------|
| 1 | Stats symétriques | Statistiques équipe gauche / droite en colonnes centrées |
| 2 | Stats asymétriques | Statistiques en colonnes décalées avec double titre |
| 3 | Stats joueur | Photo joueur + liste label/valeur |
| 4 | But | Écran de célébration de but |
| 5 | Fiche joueur | Vue détaillée d'un joueur (statistiques étendues) |
| 6 | Classement | Tableau de classement (standings) |
| 7 | Score final | Écran de fin de match |
| 8 | Texte libre | Message configurable |
| 9 | Face-à-face | Comparaison tête-à-tête entre deux joueurs |
| 10 | Calendrier | Liste des matchs (schedule) |
| 11 | Barres | Diagramme à barres comparatif |
| 12 | Roster | Affichage de l'effectif |
| 13 | Timeline | Frise chronologique des événements |
| 14 | **Mise en page libre** | Éditeur drag-and-drop complet (voir section dédiée) |

---

## Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | React | 19.2 |
| Langage | TypeScript (strict mode) | 5.9 |
| State | Zustand + Immer + Persist | 5.0 |
| Styles (éditeur) | Tailwind CSS | 4.1 |
| Styles (canvas) | Inline styles (capturable par OBS) | -- |
| Build | Vite | 7.3 |
| Desktop | Electron | 40.x |
| Tests | Vitest + Testing Library + jest-dom | 4.0 |
| Persistance | IndexedDB via Dexie.js | 4.3 |
| Import données | PapaParse (CSV) + ExcelJS (Excel) | 5.5 / 4.4 |
| Capture | html-to-image | 1.11 |
| Export GIF | gif.js | 0.2 |
| Icônes | Lucide React | 0.564 |
| Classes CSS | clsx + tailwind-merge | 2.1 / 3.4 |

### Choix d'architecture clés

| Décision | Justification |
|----------|---------------|
| Rendu HTML/CSS (pas Canvas 2D) | Préserve les polices, le texte sélectionnable et la capturabilité |
| Scaling CSS `transform: scale()` | Preview responsive sans perte de qualité |
| Canvas 1920x1080 par défaut | Résolution broadcast standard, configurable par template |
| Tailwind pour l'éditeur, inline pour le canvas | L'éditeur bénéficie de Tailwind ; le canvas doit être capturable en image |
| `BroadcastChannel` pour la synchro | Communication zéro-latence entre fenêtres du même navigateur |
| IndexedDB via Dexie.js | Stockage volumineux (photos, templates) sans limite de localStorage |

---

## Prérequis

- **Node.js** >= 18
- **npm** >= 9

---

## Démarrage rapide

```bash
# Cloner le dépôt
git clone https://github.com/SRMaison999/Scoreboard-Design.git
cd Scoreboard-Design

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Lancer en mode Electron (desktop)
npm run electron:dev
```

L'application est accessible sur `http://localhost:5173` en mode développement.

---

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Build de production (TypeScript + Vite) |
| `npm run preview` | Preview du build de production |
| `npm run type-check` | Vérification des types TypeScript (`tsc --noEmit`) |
| `npm run lint` | Vérification ESLint |
| `npm run test` | Tests en mode watch |
| `npm run test:run` | Exécution unique des tests |
| `npm run electron:dev` | Mode développement Electron (Vite + Electron) |
| `npm run electron:build` | Build Electron (toutes plateformes) |
| `npm run electron:build:win` | Build Electron Windows (installeur NSIS) |
| `npm run electron:build:mac` | Build Electron macOS (DMG) |
| `npm run electron:build:linux` | Build Electron Linux (AppImage + DEB) |

---

## Architecture du projet

```
scoreboard-design/
├── src/
│   ├── app/                        # Point d'entrée (App.tsx, routes, main.tsx)
│   ├── components/
│   │   ├── ui/                     # Composants UI réutilisables (Button, Modal, Section...)
│   │   ├── common/                 # Composants partagés (manuel utilisateur)
│   │   ├── editor/                 # Panneau éditeur (36+ sections d'édition)
│   │   │   ├── panels/            #   6 onglets (Modes, Contenu, Apparence...)
│   │   │   ├── sections/          #   Sections d'édition spécialisées
│   │   │   └── toolbar/           #   Barre d'outils supérieure
│   │   ├── preview/                # Canvas de preview + renderers
│   │   │   ├── body-types/        #   14 renderers de body types
│   │   │   ├── canvas/            #   Composants du canvas (grille, guides, règles)
│   │   │   └── elements/          #   Éléments du mode libre
│   │   ├── operator/               # Mode opérateur live
│   │   └── output/                 # Fenêtre de sortie broadcast + overlays
│   ├── hooks/                      # 25 hooks custom
│   │   ├── useScoreboardStore.ts  #   Accès au store principal
│   │   ├── useFreeLayoutDrag.ts   #   Drag-and-drop pour le mode libre
│   │   ├── useSmartGuides.ts      #   Guides d'alignement dynamiques
│   │   ├── useCanvasZoom.ts       #   Zoom et panoramique du canvas
│   │   ├── useTimer.ts            #   Gestion de l'horloge en temps réel
│   │   ├── useKeyboardShortcuts.ts #  Raccourcis clavier
│   │   ├── useUndoRedo.ts         #   Historique annuler/refaire
│   │   └── ...                    #   18 autres hooks spécialisés
│   ├── stores/                     # 18 stores Zustand
│   │   ├── scoreboardStore.ts     #   Store principal (template, scores, horloge)
│   │   ├── freeLayoutStore.ts     #   Store du mode libre (éléments, sélection)
│   │   ├── templateLibraryStore.ts #  Bibliothèque de templates (IndexedDB)
│   │   ├── photoStore.ts          #   Photos des joueurs
│   │   ├── logoStore.ts           #   Logos (équipe, compétition, sponsors)
│   │   ├── overlayStore.ts        #   Overlays multi-scoreboard
│   │   ├── animationStore.ts      #   Animations et transitions
│   │   └── ...                    #   11 autres stores spécialisés
│   ├── types/                      # 23 modules de types TypeScript
│   ├── constants/                  # 10 modules de constantes
│   │   ├── labels.ts              #   Labels d'interface
│   │   ├── colors.ts              #   Tokens de couleurs
│   │   ├── fonts.ts               #   Catalogue des polices
│   │   ├── nations.ts             #   31 codes NOC + drapeaux
│   │   └── ...                    #   6 autres modules
│   ├── utils/                      # 30 fonctions utilitaires
│   ├── api/                        # 9 modules API
│   │   ├── frameDataApi.ts        #   Frame Data API (delta encoding)
│   │   ├── broadcastSync.ts       #   Synchronisation BroadcastChannel
│   │   ├── liveDataApi.ts         #   Données en temps réel (WebSocket/HTTP)
│   │   └── ...                    #   6 autres modules d'intégration
│   ├── data/                       # État par défaut, presets, contenu du manuel
│   ├── lib/                        # Utilitaires (cn() pour Tailwind)
│   ├── styles/                     # CSS (éditeur, impression)
│   └── test/                       # Configuration des tests (setup.ts)
├── electron/                       # Main process + preload Electron
├── docs/                           # Documentation technique + manuel utilisateur
├── prototype/                      # Prototype React originel (référence historique)
└── public/                         # Fichiers statiques
```

### Métriques du projet

| Métrique | Valeur |
|----------|--------|
| Composants React | ~98 |
| Hooks custom | 25 |
| Stores Zustand | 18 |
| Fichiers de types | 23 |
| Modules de constantes | 10 |
| Fonctions utilitaires | 30 |
| Modules API | 9 |
| Fichiers de tests | 211 |
| Sections d'éditeur | 36+ |
| Renderers de body types | 14 (+ variantes) |

---

## Gestion de l'état

L'application utilise **Zustand** avec les middlewares `immer` (mutations immutables) et `persist` (sauvegarde automatique).

### Stores principaux

| Store | Responsabilité |
|-------|---------------|
| `scoreboardStore` | Store principal : template actif, scores, horloge, phases, pénalités, couleurs, polices |
| `freeLayoutStore` | Mode libre : éléments, sélection, historique undo/redo, clipboard |
| `templateLibraryStore` | Bibliothèque de templates (CRUD via IndexedDB/Dexie.js) |
| `photoStore` | Photos des joueurs (upload, compression, stockage IndexedDB) |
| `logoStore` | Logos d'équipe, de compétition et de sponsors |
| `overlayStore` | Overlays multi-scoreboard (bandeau bas, score bug, ticker) |
| `animationStore` | Animations et transitions des éléments |
| `rosterStore` | Effectifs importés (CSV, Excel, JSON) |
| `fieldPresetStore` | Presets de champs et de mises en page |
| `elementLibraryStore` | Bibliothèque d'éléments réutilisables (50+ éléments) |
| `canvasStore` | État du canvas (zoom, pan, grille, guides, règles) |
| `contextMenuStore` | Menu contextuel (couper, copier, coller, dupliquer) |
| `keyboardShortcutStore` | Raccourcis clavier configurables |
| `frameDataStore` | Frame Data API (enregistrement, snapshots) |
| `liveDataStore` | Données live (WebSocket, polling) |
| `syncStore` | Synchronisation multi-site |
| `integrationStore` | Intégrations CasparCG/Viz |
| `uiStore` | État de l'interface (onglets, panneaux) |

---

## Persistance des données

L'architecture de persistance repose sur **2 couches** complémentaires :

```
Action utilisateur
    │
    ▼
┌─────────────────────────────┐
│  1. Zustand Store           │  En mémoire (réactif, temps réel)
│     + persist middleware    │  → localStorage (session courante)
└─────────────┬───────────────┘
              │ sauvegarde explicite
              ▼
┌─────────────────────────────┐
│  2. IndexedDB (Dexie.js)    │  Stockage permanent (sans limite)
│     - Templates complets    │  → Bibliothèque de templates
│     - Photos joueurs        │  → Binaires compressés
│     - Logos                 │  → Équipe, compétition, sponsors
│     - Presets               │  → Couleurs et mises en page
└─────────────────────────────┘
```

- **localStorage** : état de session (template actif, préférences). Rapide, limité à ~5 Mo.
- **IndexedDB** : données volumineuses (templates, photos, logos). Sans limite pratique.
- **Mode Electron** : accès au système de fichiers pour l'import/export.

Voir [docs/DATA_PERSISTENCE_ARCHITECTURE.md](./docs/DATA_PERSISTENCE_ARCHITECTURE.md) pour l'architecture détaillée.

---

## Routes et modes

L'application s'articule autour de 3 routes, chacune correspondant à un mode d'utilisation :

| Route | Mode | Description |
|-------|------|-------------|
| `/` | Éditeur | Interface complète de conception et personnalisation |
| `/operator` | Opérateur | Contrôle simplifié pour l'exploitation en direct |
| `/output` | Sortie | Fenêtre plein écran pour la capture broadcast |

### Workflow broadcast typique

1. **Conception** (`/`) : créer et personnaliser le template
2. **Préparation** : ouvrir la fenêtre de sortie (`/output`) et la configurer dans OBS/vMix
3. **Direct** (`/operator`) : contrôler les scores, l'horloge et les pénalités en temps réel
4. La sortie se met à jour instantanément via `BroadcastChannel`

---

## Personnalisation visuelle

### 14 canaux de couleur

Chaque canal dispose d'une couleur (hex) et d'une opacité indépendante (0-100 %) :

| Canal | Zone |
|-------|------|
| `headerBg` / `headerText` | En-tête du scoreboard |
| `bodyBg` / `bodyText` | Corps (zone de statistiques) |
| `clockBg` / `clockText` | Affichage de l'horloge |
| `teamLeftBg` / `teamLeftText` | Équipe gauche |
| `teamRightBg` / `teamRightText` | Équipe droite |
| `scoreBg` / `scoreText` | Affichage du score |
| `accent` / `accentText` | Éléments d'accentuation |

### 25 polices Google Fonts

Organisées en 6 catégories :

| Catégorie | Polices |
|-----------|---------|
| Sport / Impact | Oswald, Bebas Neue, Anton, Russo One, Archivo Black, Black Ops One, Bungee |
| Condensée | Barlow Condensed, Saira Condensed, Roboto Condensed, Fjalla One, Teko |
| Moderne | Montserrat, Inter, Poppins, Rajdhani, Chakra Petch |
| Display | Righteous, Audiowide, Exo 2, Orbitron |
| Monospace | Share Tech Mono, JetBrains Mono |
| Serif | Playfair Display, Bitter |

### 5 presets de couleurs

| Preset | Description |
|--------|-------------|
| Classic Blue | Bleu professionnel classique |
| Dark Pro | Thème sombre professionnel |
| Ice White | Thème clair sur fond blanc |
| Hockey Red | Thème rouge vif |
| Arena Green | Thème vert aréna |

### 31 nations supportées

Drapeaux CSS intégrés pour les codes NOC : AUT, BLR, BUL, CAN, CHN, CRO, CZE, DEN, EST, FIN, FRA, GBR, GER, HUN, ITA, JPN, KAZ, KOR, LAT, LTU, NED, NOR, POL, ROU, RUS, SUI, SVK, SWE, TUR, UKR, USA.

---

## Mode mise en page libre (Body Type 14)

Le mode libre offre un éditeur drag-and-drop complet pour créer des mises en page entièrement personnalisées :

### Manipulation des éléments

- **Placement** : glisser-déposer sur le canvas
- **Redimensionnement** : 8 poignées (coins + côtés), `Shift` = proportionnel, `Alt` = depuis le centre
- **Rotation** : accrochage à 15 degrés
- **Multi-sélection** : `Ctrl+Clic` ou boîte de sélection
- **Édition de texte** : double-clic pour édition en ligne

### Outils d'alignement

- Guides d'alignement dynamiques (smart guides)
- Grille avec accrochage configurable
- Distribution et alignement automatiques (horizontal/vertical)
- Règles graduées (horizontale et verticale)

### Navigation

- **Zoom** : molette, `Ctrl+0` (ajuster), `Ctrl+1` (100 %), `Ctrl+`/`Ctrl-`
- **Panoramique** : `Espace+glisser`
- **Panneau de calques** : réordonnancement, visibilité, verrouillage

### Bibliothèque d'éléments

50+ éléments réutilisables organisés en 11 catégories, incluant :

- Lignes de joueurs, affichages de score, photos, listes de staff
- Tableaux, événements, calendriers, texte libre, séparateurs
- Éléments personnalisés avec champs configurables

### Historique et raccourcis

- **Annuler/refaire** : 50 niveaux d'historique (snapshots débounces)
- **Menu contextuel** : couper, copier, coller, dupliquer, supprimer, gestion des calques
- **Raccourcis clavier** : aide accessible via le bouton d'aide

---

## Horloge et phases

### Timer en temps réel

- Intervalle de tick de 100 ms pour une précision broadcast
- Décompte automatique avec affichage configurable (toujours, jamais, en cours, à l'arrêt)
- Seuil d'affichage des dixièmes de seconde configurable
- Mode démo pour les tests

### Gestion des phases

Transitions automatiques à 0:00 entre les phases :

```
Échauffement → Période 1 → Intermission 1 → Période 2 → Intermission 2 →
Période 3 → [Prolongation → [Tirs au but]]
```

- Noms de périodes personnalisables
- Intermissions de 15 minutes (preset)
- Prolongation et tirs au but optionnels

### Pénalités

- Jusqu'à 8 pénalités par équipe affichées simultanément
- Décompte synchronisé avec le timer
- Disparition automatique à expiration
- Nouvelles pénalités insérées en haut de la colonne

---

## Sortie broadcast

### Capture par logiciel tiers

La fenêtre de sortie (`/output`) est conçue pour être capturée par les logiciels de production :

| Logiciel | Méthode de capture |
|----------|-------------------|
| OBS Studio | Capture de fenêtre ou de navigateur |
| vMix | Capture de fenêtre |
| Wirecast | Capture de fenêtre |
| CasparCG | Intégration API (fondation posée) |

### Synchronisation

La communication entre fenêtres utilise l'API `BroadcastChannel` :

```
Éditeur (/)  ──────┐
                    ├──► BroadcastChannel ──► Sortie (/output)
Opérateur (/operator)──┘
```

Latence zéro entre les fenêtres du même navigateur.

### Overlays multi-scoreboard

Support optionnel de plusieurs overlays simultanées :

- **Bandeau bas** (lower third) : informations supplémentaires
- **Score bug** : affichage compact du score
- **Ticker** : bande défilante d'informations

---

## Gestion des données

### Import de rosters

| Format | Bibliothèque |
|--------|-------------|
| CSV | PapaParse 5.5 |
| Excel (.xlsx) | ExcelJS 4.4 |
| JSON | Natif |

Les colonnes sont mappées de manière flexible, avec validation et normalisation des données.

### Templates

Les templates sont stockés dans IndexedDB et contiennent l'intégralité de l'état du scoreboard :

- Couleurs, polices, dimensions
- Contenu (équipes, scores, statistiques)
- Éléments du mode libre (positions, tailles, styles)
- Photos et logos référencés

Format d'export : `.scoreboard.json`

---

## Export et capture

| Fonctionnalité | Technologie | Format |
|----------------|-------------|--------|
| Capture d'écran | html-to-image | PNG |
| Impression | CSS print stylesheet | Papier |
| Export de template | JSON natif | `.scoreboard.json` |
| Enregistrement vidéo | MediaRecorder API | WebM |
| Export GIF | gif.js | GIF animé |
| Frame Data API | Delta encoding | JSON (snapshots) |

---

## Tests

Le projet utilise **Vitest** + **Testing Library** + **jest-dom** avec **211 fichiers de tests**.

```bash
# Tests en mode watch
npm run test

# Exécution unique
npm run test:run
```

La configuration se trouve dans `src/test/setup.ts`.

### Vérification pré-commit (automatique)

```bash
npm run type-check && npm run lint && npm run test:run
```

---

## Déploiement Electron

L'application peut être packagee en exécutable desktop pour les 3 plateformes :

| Plateforme | Format | Commande |
|------------|--------|----------|
| Windows | Installeur NSIS (x64) | `npm run electron:build:win` |
| macOS | DMG | `npm run electron:build:mac` |
| Linux | AppImage + DEB | `npm run electron:build:linux` |
| Toutes | Multi-plateforme | `npm run electron:build` |

La configuration de packaging se trouve dans `electron-builder.config.cjs`.

---

## Documentation

Le projet dispose d'une documentation technique complète dans le répertoire `docs/` :

### Documentation technique

| Document | Description |
|----------|-------------|
| [Spécification technique](docs/HOCKEY_SCOREBOARD_EDITOR_SPEC.md) | Architecture complète, 14 body types, Frame Data API, interfaces TypeScript |
| [Démarrage rapide](docs/ARCHITECTURE_QUICK_START.md) | Guide d'intégration pour les nouveaux développeurs |
| [Vue d'ensemble](docs/CODEBASE_OVERVIEW.md) | Architecture du système, flux de données, organisation des stores |
| [Design system](docs/DESIGN_SYSTEM_REFERENCE.md) | Tokens de couleurs, typographie, composants UI |
| [Guide de style](docs/COMPONENT_STYLE_GUIDE.md) | Conventions et patterns de composants |
| [Persistance](docs/DATA_PERSISTENCE_ARCHITECTURE.md) | Architecture de stockage (IndexedDB, localStorage, Dexie.js) |
| [Index](docs/DOCUMENTATION_INDEX.md) | Index complet de toute la documentation |

### Manuel utilisateur

Le [manuel utilisateur](docs/manuel-utilisateur/) est intégré à l'application et comprend **14 chapitres** en français couvrant l'ensemble des fonctionnalités. Il inclut une **barre de recherche intelligente** (insensible aux accents, surlignage des résultats, extraits de contexte) :

1. Introduction
2. Guide de l'éditeur
3. Types d'affichage (body types)
4. Layout libre (prise en main, éléments, tutoriels)
5. Personnalisation visuelle
6. Horloge et phases
7. Templates
8. Mode opérateur
9. Sortie broadcast
10. Capture et impression
11. Photos de joueurs
12. Logos
13. Animations et export
14. Intégrations

---

## Règles de développement

Le projet applique des conventions strictes documentées dans [CLAUDE.md](./CLAUDE.md) :

### Contraintes de code

| Règle | Limite |
|-------|--------|
| Taille des fichiers | 300 lignes maximum |
| `useState` par composant | 5 maximum |
| Type `any` | Interdit (utiliser `unknown` ou types spécifiques) |
| Styles inline (éditeur) | Interdit (utiliser Tailwind CSS + `cn()`) |
| Imports relatifs profonds | Interdit (utiliser `@/` uniquement) |
| Accès direct à `localStorage` | Interdit (passer par Zustand persist) |
| Modales personnalisées | Interdit (utiliser le composant `Modal`) |
| Chaînes en dur dans le JSX | Interdit (utiliser `src/constants/`) |
| Composants sans tests | Interdit |

### Principes

- **SRP** (Single Responsibility Principle) : une responsabilité par composant/fichier
- **DRY** (Don't Repeat Yourself) : réutiliser helpers, constantes et hooks existants
- **Composition** plutôt que duplication
- **Séparation des préoccupations** : UI (Tailwind) vs canvas (inline styles)

### Langue

- Interface et documentation en **français**
- Accents obligatoires dans les textes d'interface
- Commits Git en français, descriptifs du "pourquoi"

---

## Phases de développement

Les 9 phases de développement sont toutes terminées :

| Phase | Description | Statut |
|-------|-------------|--------|
| 1 | Migration du prototype (Vite + React + TS + Zustand + Tailwind) | Terminé |
| 2 | Capture, impression, dimensionnement des polices, dimensions du template | Terminé |
| 3 | Gestion des templates (IndexedDB, JSON, import/export) | Terminé |
| 4 | Frame Data API (sérialisation, delta encoding, enregistrement) | Terminé |
| 5 | 13 body types prédéfinis (types 1 à 13) | Terminé |
| 6 | Mode opérateur live (raccourcis clavier, fenêtre de sortie) | Terminé |
| 7 | Photos et médias (photos joueurs, logos équipe/sponsors) | Terminé |
| 8 | Animations et export (enregistrement vidéo, export GIF) | Terminé |
| 9 | Intégrations externes (import rosters, API live, multi-scoreboard, sync, CasparCG/Viz) | Terminé |

Le mode **mise en page libre** (Body Type 14) a été développé en parallèle avec des fonctionnalités avancées : multi-sélection, guides intelligents, zoom/pan, redimensionnement à 8 poignées, menu contextuel, rotation, édition en ligne, distribution/alignement, 50+ éléments réutilisables, presets, undo/redo et raccourcis clavier.

---

## Licence

Propriétaire -- Tous droits réservés.
