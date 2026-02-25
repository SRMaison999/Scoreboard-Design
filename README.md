# Scoreboard Design

> Editeur visuel de templates de scoreboard pour retransmissions de hockey sur glace. Application broadcast professionnelle permettant de concevoir, personnaliser et exploiter en direct des affichages de scores, statistiques et classements destines a l'incrustation video.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange)](https://zustand-demo.pmnd.rs/)
[![Electron](https://img.shields.io/badge/Electron-40.x-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

---

## Table des matieres

- [Apercu](#apercu)
- [Fonctionnalites](#fonctionnalites)
- [Les 14 types d'affichage](#les-14-types-daffichage)
- [Stack technique](#stack-technique)
- [Prerequis](#prerequis)
- [Demarrage rapide](#demarrage-rapide)
- [Scripts disponibles](#scripts-disponibles)
- [Architecture du projet](#architecture-du-projet)
- [Gestion de l'etat](#gestion-de-letat)
- [Persistance des donnees](#persistance-des-donnees)
- [Routes et modes](#routes-et-modes)
- [Personnalisation visuelle](#personnalisation-visuelle)
- [Mode mise en page libre](#mode-mise-en-page-libre-body-type-14)
- [Horloge et phases](#horloge-et-phases)
- [Sortie broadcast](#sortie-broadcast)
- [Gestion des donnees](#gestion-des-donnees)
- [Export et capture](#export-et-capture)
- [Tests](#tests)
- [Deploiement Electron](#deploiement-electron)
- [Documentation](#documentation)
- [Regles de developpement](#regles-de-developpement)
- [Phases de developpement](#phases-de-developpement)
- [Licence](#licence)

---

## Apercu

**Scoreboard Design** est un editeur professionnel de scoreboards destine aux retransmissions de hockey sur glace. Il permet aux realisateurs et operateurs broadcast de concevoir des templates d'affichage (scores, statistiques, classements), de les personnaliser visuellement, puis de les exploiter en direct avec un controle complet de l'horloge, des scores et des penalites.

L'application fonctionne en mode **web** et en mode **desktop** (via Electron), avec trois interfaces synchronisees en temps reel :

| Interface | Route | Role |
|-----------|-------|------|
| Editeur | `/` | Conception et personnalisation des templates |
| Operateur | `/operator` | Controle en direct (scores, horloge, penalites) |
| Sortie | `/output` | Fenetre plein ecran capturable (OBS, vMix, CasparCG) |

La synchronisation entre les fenetres s'effectue via l'API `BroadcastChannel`, garantissant une mise a jour instantanee de la sortie broadcast.

---

## Fonctionnalites

### Editeur visuel complet

- **6 panneaux d'edition** : Modes, Contenu, Apparence, Horloge, Animations, Integrations
- **14 canaux de couleur** avec opacite independante (0-100 %)
- **25 polices Google Fonts** organisees en 6 categories (Sport, Condensee, Moderne, Display, Monospace, Serif)
- **3 zones de police independantes** : equipes, horloge, corps
- **Tailles automatiques** adaptees au nombre de lignes (1 a 8 lignes de statistiques)
- **5 presets de couleurs** : Classic Blue, Dark Pro, Ice White, Hockey Red, Arena Green
- **4 presets de mise en page** pour le mode libre
- **Drapeaux CSS** pour 31 nations (codes NOC)
- **Preview responsive** avec scaling automatique (1920x1080 par defaut, configurable)

### Mode operateur live

Interface simplifiee pour le controle en direct pendant la retransmission :

- Controle des scores (+/- par equipe)
- Controle de l'horloge (demarrer, arreter, reinitialiser)
- Gestion des phases (periodes, intermissions, prolongation, tirs au but)
- Gestion des penalites (ajout, decompte automatique, disparition a expiration)
- Raccourcis clavier dedies

### Sortie broadcast

- Fenetre de sortie plein ecran capturable par OBS, vMix, Wirecast, CasparCG
- Synchronisation multi-fenetres en temps reel via `BroadcastChannel`
- Overlays multi-scoreboard optionnels (bandeau bas, score bug, ticker)

### Gestion des medias

- **Photos joueurs** : upload, compression, stockage IndexedDB, affichage circulaire
- **Logos** : equipe, competition, sponsors — 6 positions, opacite et taille configurables
- **Import de rosters** : CSV, Excel (.xlsx) et JSON avec mapping flexible des colonnes

### Templates et donnees

- Sauvegarde/chargement/duplication/renommage/suppression via IndexedDB
- Export et import JSON (format `.scoreboard.json`)
- Horodatage de creation et de modification
- Persistance complete de l'etat dans IndexedDB

### Export et capture

- Capture d'ecran PNG (via html-to-image)
- Impression (feuille de style CSS dediee)
- Export/import de templates JSON
- Enregistrement video (MediaRecorder)
- Export GIF anime (gif.js)
- Frame Data API (delta encoding, snapshots d'etat)

---

## Les 14 types d'affichage

L'application propose 14 **body types**, du format fixe au mode libre complet :

| Type | Nom | Description |
|------|-----|-------------|
| 1 | Stats symetriques | Statistiques equipe gauche / droite en colonnes centrees |
| 2 | Stats asymetriques | Statistiques en colonnes decalees avec double titre |
| 3 | Stats joueur | Photo joueur + liste label/valeur |
| 4 | But | Ecran de celebration de but |
| 5 | Fiche joueur | Vue detaillee d'un joueur (statistiques etendues) |
| 6 | Classement | Tableau de classement (standings) |
| 7 | Score final | Ecran de fin de match |
| 8 | Texte libre | Message configurable |
| 9 | Face-a-face | Comparaison tete-a-tete entre deux joueurs |
| 10 | Calendrier | Liste des matchs (schedule) |
| 11 | Barres | Diagramme a barres comparatif |
| 12 | Roster | Affichage de l'effectif |
| 13 | Timeline | Frise chronologique des evenements |
| 14 | **Mise en page libre** | Editeur drag-and-drop complet (voir section dediee) |

---

## Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | React | 19.2 |
| Langage | TypeScript (strict mode) | 5.9 |
| State | Zustand + Immer + Persist | 5.0 |
| Styles (editeur) | Tailwind CSS | 4.1 |
| Styles (canvas) | Inline styles (capturable par OBS) | -- |
| Build | Vite | 7.3 |
| Desktop | Electron | 40.x |
| Tests | Vitest + Testing Library + jest-dom | 4.0 |
| Persistance | IndexedDB via Dexie.js | 4.3 |
| Import donnees | PapaParse (CSV) + ExcelJS (Excel) | 5.5 / 4.4 |
| Capture | html-to-image | 1.11 |
| Export GIF | gif.js | 0.2 |
| Icones | Lucide React | 0.564 |
| Classes CSS | clsx + tailwind-merge | 2.1 / 3.4 |

### Choix d'architecture cles

| Decision | Justification |
|----------|---------------|
| Rendu HTML/CSS (pas Canvas 2D) | Preserve les polices, le texte selectionnable et la capturabilite |
| Scaling CSS `transform: scale()` | Preview responsive sans perte de qualite |
| Canvas 1920x1080 par defaut | Resolution broadcast standard, configurable par template |
| Tailwind pour l'editeur, inline pour le canvas | L'editeur beneficie de Tailwind ; le canvas doit etre capturable en image |
| `BroadcastChannel` pour la synchro | Communication zero-latence entre fenetres du meme navigateur |
| IndexedDB via Dexie.js | Stockage volumineux (photos, templates) sans limite de localStorage |

---

## Prerequis

- **Node.js** >= 18
- **npm** >= 9

---

## Demarrage rapide

```bash
# Cloner le depot
git clone https://github.com/SRMaison999/Scoreboard-Design.git
cd Scoreboard-Design

# Installer les dependances
npm install

# Lancer en mode developpement (web)
npm run dev

# Lancer en mode Electron (desktop)
npm run electron:dev
```

L'application est accessible sur `http://localhost:5173`.

---

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement Vite |
| `npm run build` | Build de production (TypeScript + Vite) |
| `npm run preview` | Preview du build de production |
| `npm run type-check` | Verification des types TypeScript (`tsc --noEmit`) |
| `npm run lint` | Verification ESLint |
| `npm run test` | Tests en mode watch |
| `npm run test:run` | Execution unique des tests |
| `npm run electron:dev` | Mode developpement Electron (Vite + Electron) |
| `npm run electron:build` | Build Electron (toutes plateformes) |
| `npm run electron:build:win` | Build Electron Windows (installeur NSIS) |
| `npm run electron:build:mac` | Build Electron macOS (DMG) |
| `npm run electron:build:linux` | Build Electron Linux (AppImage + DEB) |

---

## Architecture du projet

```
scoreboard-design/
├── src/
│   ├── app/                        # Point d'entree (App.tsx, routes, main.tsx)
│   ├── components/
│   │   ├── ui/                     # Composants UI reutilisables (Button, Modal, Section...)
│   │   ├── common/                 # Composants partages (manuel utilisateur)
│   │   ├── editor/                 # Panneau editeur (36+ sections d'edition)
│   │   │   ├── panels/            #   6 onglets (Modes, Contenu, Apparence...)
│   │   │   ├── sections/          #   Sections d'edition specialisees
│   │   │   └── toolbar/           #   Barre d'outils superieure
│   │   ├── preview/                # Canvas de preview + renderers
│   │   │   ├── body-types/        #   14 renderers de body types
│   │   │   ├── canvas/            #   Composants du canvas (grille, guides, regles)
│   │   │   └── elements/          #   Elements du mode libre
│   │   ├── operator/               # Mode operateur live
│   │   └── output/                 # Fenetre de sortie broadcast + overlays
│   ├── hooks/                      # 25 hooks custom
│   │   ├── useScoreboardStore.ts  #   Acces au store principal
│   │   ├── useFreeLayoutDrag.ts   #   Drag-and-drop pour le mode libre
│   │   ├── useSmartGuides.ts      #   Guides d'alignement dynamiques
│   │   ├── useCanvasZoom.ts       #   Zoom et panoramique du canvas
│   │   ├── useTimer.ts            #   Gestion de l'horloge en temps reel
│   │   ├── useKeyboardShortcuts.ts #  Raccourcis clavier
│   │   ├── useUndoRedo.ts         #   Historique annuler/refaire
│   │   └── ...                    #   18 autres hooks specialises
│   ├── stores/                     # 18 stores Zustand
│   │   ├── scoreboardStore.ts     #   Store principal (template, scores, horloge)
│   │   ├── freeLayoutStore.ts     #   Store du mode libre (elements, selection)
│   │   ├── templateLibraryStore.ts #  Bibliotheque de templates (IndexedDB)
│   │   ├── photoStore.ts          #   Photos des joueurs
│   │   ├── logoStore.ts           #   Logos (equipe, competition, sponsors)
│   │   ├── overlayStore.ts        #   Overlays multi-scoreboard
│   │   ├── animationStore.ts      #   Animations et transitions
│   │   └── ...                    #   11 autres stores specialises
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
│   │   ├── liveDataApi.ts         #   Donnees en temps reel (WebSocket/HTTP)
│   │   └── ...                    #   6 autres modules d'integration
│   ├── data/                       # Etat par defaut, presets, contenu du manuel
│   ├── lib/                        # Utilitaires (cn() pour Tailwind)
│   ├── styles/                     # CSS (editeur, impression)
│   └── test/                       # Configuration des tests (setup.ts)
├── electron/                       # Main process + preload Electron
├── docs/                           # Documentation technique + manuel utilisateur
├── prototype/                      # Prototype React originel (reference historique)
└── public/                         # Fichiers statiques
```

### Metriques du projet

| Metrique | Valeur |
|----------|--------|
| Composants React | ~98 |
| Hooks custom | 25 |
| Stores Zustand | 18 |
| Fichiers de types | 23 |
| Modules de constantes | 10 |
| Fonctions utilitaires | 30 |
| Modules API | 9 |
| Fichiers de tests | 211 |
| Sections d'editeur | 36+ |
| Renderers de body types | 14 (+ variantes) |

---

## Gestion de l'etat

L'application utilise **Zustand** avec les middlewares `immer` (mutations immutables) et `persist` (sauvegarde automatique).

### Stores principaux

| Store | Responsabilite |
|-------|---------------|
| `scoreboardStore` | Store principal : template actif, scores, horloge, phases, penalites, couleurs, polices |
| `freeLayoutStore` | Mode libre : elements, selection, historique undo/redo, clipboard |
| `templateLibraryStore` | Bibliotheque de templates (CRUD via IndexedDB/Dexie.js) |
| `photoStore` | Photos des joueurs (upload, compression, stockage IndexedDB) |
| `logoStore` | Logos d'equipe, de competition et de sponsors |
| `overlayStore` | Overlays multi-scoreboard (bandeau bas, score bug, ticker) |
| `animationStore` | Animations et transitions des elements |
| `rosterStore` | Effectifs importes (CSV, Excel, JSON) |
| `fieldPresetStore` | Presets de champs et de mises en page |
| `elementLibraryStore` | Bibliotheque d'elements reutilisables (50+ elements) |
| `canvasStore` | Etat du canvas (zoom, pan, grille, guides, regles) |
| `contextMenuStore` | Menu contextuel (couper, copier, coller, dupliquer) |
| `keyboardShortcutStore` | Raccourcis clavier configurables |
| `frameDataStore` | Frame Data API (enregistrement, snapshots) |
| `liveDataStore` | Donnees live (WebSocket, polling) |
| `syncStore` | Synchronisation multi-site |
| `integrationStore` | Integrations CasparCG/Viz |
| `uiStore` | Etat de l'interface (onglets, panneaux) |

---

## Persistance des donnees

L'architecture de persistance repose sur **2 couches** complementaires :

```
Action utilisateur
    │
    ▼
┌─────────────────────────────┐
│  1. Zustand Store           │  En memoire (reactif, temps reel)
│     + persist middleware    │  → localStorage (session courante)
└─────────────┬───────────────┘
              │ sauvegarde explicite
              ▼
┌─────────────────────────────┐
│  2. IndexedDB (Dexie.js)    │  Stockage permanent (sans limite)
│     - Templates complets    │  → Bibliotheque de templates
│     - Photos joueurs        │  → Binaires compresses
│     - Logos                 │  → Equipe, competition, sponsors
│     - Presets               │  → Couleurs et mises en page
└─────────────────────────────┘
```

- **localStorage** : etat de session (template actif, preferences). Rapide, limite a ~5 Mo.
- **IndexedDB** : donnees volumineuses (templates, photos, logos). Sans limite pratique.
- **Mode Electron** : acces au systeme de fichiers pour l'import/export.

Voir [docs/DATA_PERSISTENCE_ARCHITECTURE.md](./docs/DATA_PERSISTENCE_ARCHITECTURE.md) pour l'architecture detaillee.

---

## Routes et modes

L'application s'articule autour de 3 routes, chacune correspondant a un mode d'utilisation :

| Route | Mode | Description |
|-------|------|-------------|
| `/` | Editeur | Interface complete de conception et personnalisation |
| `/operator` | Operateur | Controle simplifie pour l'exploitation en direct |
| `/output` | Sortie | Fenetre plein ecran pour la capture broadcast |

### Workflow broadcast typique

1. **Conception** (`/`) : creer et personnaliser le template
2. **Preparation** : ouvrir la fenetre de sortie (`/output`) et la configurer dans OBS/vMix
3. **Direct** (`/operator`) : controler les scores, l'horloge et les penalites en temps reel
4. La sortie se met a jour instantanement via `BroadcastChannel`

---

## Personnalisation visuelle

### 14 canaux de couleur

Chaque canal dispose d'une couleur (hex) et d'une opacite independante (0-100 %) :

| Canal | Zone |
|-------|------|
| `headerBg` / `headerText` | En-tete du scoreboard |
| `bodyBg` / `bodyText` | Corps (zone de statistiques) |
| `clockBg` / `clockText` | Affichage de l'horloge |
| `teamLeftBg` / `teamLeftText` | Equipe gauche |
| `teamRightBg` / `teamRightText` | Equipe droite |
| `scoreBg` / `scoreText` | Affichage du score |
| `accent` / `accentText` | Elements d'accentuation |

### 25 polices Google Fonts

Organisees en 6 categories :

| Categorie | Polices |
|-----------|---------|
| Sport / Impact | Oswald, Bebas Neue, Anton, Russo One, Archivo Black, Black Ops One, Bungee |
| Condensee | Barlow Condensed, Saira Condensed, Roboto Condensed, Fjalla One, Teko |
| Moderne | Montserrat, Inter, Poppins, Rajdhani, Chakra Petch |
| Display | Righteous, Audiowide, Exo 2, Orbitron |
| Monospace | Share Tech Mono, JetBrains Mono |
| Serif | Playfair Display, Bitter |

### 5 presets de couleurs

| Preset | Description |
|--------|-------------|
| Classic Blue | Bleu professionnel classique |
| Dark Pro | Theme sombre professionnel |
| Ice White | Theme clair sur fond blanc |
| Hockey Red | Theme rouge vif |
| Arena Green | Theme vert arena |

### 31 nations supportees

Drapeaux CSS integres pour les codes NOC : AUT, BLR, BUL, CAN, CHN, CRO, CZE, DEN, EST, FIN, FRA, GBR, GER, HUN, ITA, JPN, KAZ, KOR, LAT, LTU, NED, NOR, POL, ROU, RUS, SUI, SVK, SWE, TUR, UKR, USA.

---

## Mode mise en page libre (Body Type 14)

Le mode libre offre un editeur drag-and-drop complet pour creer des mises en page entierement personnalisees :

### Manipulation des elements

- **Placement** : glisser-deposer sur le canvas
- **Redimensionnement** : 8 poignees (coins + cotes), `Shift` = proportionnel, `Alt` = depuis le centre
- **Rotation** : accrochage a 15 degres
- **Multi-selection** : `Ctrl+Clic` ou boite de selection
- **Edition de texte** : double-clic pour edition en ligne

### Outils d'alignement

- Guides d'alignement dynamiques (smart guides)
- Grille avec accrochage configurable
- Distribution et alignement automatiques (horizontal/vertical)
- Regles graduees (horizontale et verticale)

### Navigation

- **Zoom** : molette, `Ctrl+0` (ajuster), `Ctrl+1` (100 %), `Ctrl+`/`Ctrl-`
- **Panoramique** : `Espace+glisser`
- **Panneau de calques** : reordonnancement, visibilite, verrouillage

### Bibliotheque d'elements

50+ elements reutilisables organises en 11 categories, incluant :

- Lignes de joueurs, affichages de score, photos, listes de staff
- Tableaux, evenements, calendriers, texte libre, separateurs
- Elements personnalises avec champs configurables

### Historique et raccourcis

- **Annuler/refaire** : 50 niveaux d'historique (snapshots debounces)
- **Menu contextuel** : couper, copier, coller, dupliquer, supprimer, gestion des calques
- **Raccourcis clavier** : aide accessible via le bouton d'aide

---

## Horloge et phases

### Timer en temps reel

- Intervalle de tick de 100 ms pour une precision broadcast
- Decompte automatique avec affichage configurable (toujours, jamais, en cours, a l'arret)
- Seuil d'affichage des dixiemes de seconde configurable
- Mode demo pour les tests

### Gestion des phases

Transitions automatiques a 0:00 entre les phases :

```
Echauffement → Periode 1 → Intermission 1 → Periode 2 → Intermission 2 →
Periode 3 → [Prolongation → [Tirs au but]]
```

- Noms de periodes personnalisables
- Intermissions de 15 minutes (preset)
- Prolongation et tirs au but optionnels

### Penalites

- Jusqu'a 8 penalites par equipe affichees simultanement
- Decompte synchronise avec le timer
- Disparition automatique a expiration
- Nouvelles penalites inserees en haut de la colonne

---

## Sortie broadcast

### Capture par logiciel tiers

La fenetre de sortie (`/output`) est concue pour etre capturee par les logiciels de production :

| Logiciel | Methode de capture |
|----------|-------------------|
| OBS Studio | Capture de fenetre ou de navigateur |
| vMix | Capture de fenetre |
| Wirecast | Capture de fenetre |
| CasparCG | Integration API (fondation posee) |

### Synchronisation

La communication entre fenetres utilise l'API `BroadcastChannel` :

```
Editeur (/)  ──────┐
                    ├──► BroadcastChannel ──► Sortie (/output)
Operateur (/operator)──┘
```

Latence zero entre les fenetres du meme navigateur.

### Overlays multi-scoreboard

Support optionnel de plusieurs overlays simultanees :

- **Bandeau bas** (lower third) : informations supplementaires
- **Score bug** : affichage compact du score
- **Ticker** : bande defilante d'informations

---

## Gestion des donnees

### Import de rosters

| Format | Bibliotheque |
|--------|-------------|
| CSV | PapaParse 5.5 |
| Excel (.xlsx) | ExcelJS 4.4 |
| JSON | Natif |

Les colonnes sont mappees de maniere flexible, avec validation et normalisation des donnees.

### Templates

Les templates sont stockes dans IndexedDB et contiennent l'integralite de l'etat du scoreboard :

- Couleurs, polices, dimensions
- Contenu (equipes, scores, statistiques)
- Elements du mode libre (positions, tailles, styles)
- Photos et logos references

Format d'export : `.scoreboard.json`

---

## Export et capture

| Fonctionnalite | Technologie | Format |
|----------------|-------------|--------|
| Capture d'ecran | html-to-image | PNG |
| Impression | CSS print stylesheet | Papier |
| Export de template | JSON natif | `.scoreboard.json` |
| Enregistrement video | MediaRecorder API | WebM |
| Export GIF | gif.js | GIF anime |
| Frame Data API | Delta encoding | JSON (snapshots) |

---

## Tests

Le projet utilise **Vitest** + **Testing Library** + **jest-dom** avec **211 fichiers de tests**.

```bash
# Tests en mode watch
npm run test

# Execution unique
npm run test:run
```

La configuration se trouve dans `src/test/setup.ts`.

### Verification pre-commit (automatique)

```bash
npm run type-check && npm run lint && npm run test:run
```

---

## Deploiement Electron

L'application peut etre packagee en executable desktop pour les 3 plateformes :

| Plateforme | Format | Commande |
|------------|--------|----------|
| Windows | Installeur NSIS (x64) | `npm run electron:build:win` |
| macOS | DMG | `npm run electron:build:mac` |
| Linux | AppImage + DEB | `npm run electron:build:linux` |
| Toutes | Multi-plateforme | `npm run electron:build` |

La configuration de packaging se trouve dans `electron-builder.config.cjs`.

---

## Documentation

Le projet dispose d'une documentation technique complete dans le repertoire `docs/` :

### Documentation technique

| Document | Description |
|----------|-------------|
| [Specification technique](docs/HOCKEY_SCOREBOARD_EDITOR_SPEC.md) | Architecture complete, 14 body types, Frame Data API, interfaces TypeScript |
| [Demarrage rapide](docs/ARCHITECTURE_QUICK_START.md) | Guide d'integration pour les nouveaux developpeurs |
| [Vue d'ensemble](docs/CODEBASE_OVERVIEW.md) | Architecture du systeme, flux de donnees, organisation des stores |
| [Design system](docs/DESIGN_SYSTEM_REFERENCE.md) | Tokens de couleurs, typographie, composants UI |
| [Guide de style](docs/COMPONENT_STYLE_GUIDE.md) | Conventions et patterns de composants |
| [Persistance](docs/DATA_PERSISTENCE_ARCHITECTURE.md) | Architecture de stockage (IndexedDB, localStorage, Dexie.js) |
| [Index](docs/DOCUMENTATION_INDEX.md) | Index complet de toute la documentation |

### Manuel utilisateur

Le [manuel utilisateur](docs/manuel-utilisateur/) comprend **13 chapitres** en francais couvrant l'ensemble des fonctionnalites :

1. Introduction
2. Guide de l'editeur
3. Types d'affichage (body types)
4. Personnalisation visuelle
5. Horloge et phases
6. Templates
7. Mode operateur
8. Sortie broadcast
9. Capture et impression
10. Photos de joueurs
11. Logos
12. Animations et export
13. Integrations

---

## Regles de developpement

Le projet applique des conventions strictes documentees dans [CLAUDE.md](./CLAUDE.md) :

### Contraintes de code

| Regle | Limite |
|-------|--------|
| Taille des fichiers | 300 lignes maximum |
| `useState` par composant | 5 maximum |
| Type `any` | Interdit (utiliser `unknown` ou types specifiques) |
| Styles inline (editeur) | Interdit (utiliser Tailwind CSS + `cn()`) |
| Imports relatifs profonds | Interdit (utiliser `@/` uniquement) |
| Acces direct a `localStorage` | Interdit (passer par Zustand persist) |
| Modales personnalisees | Interdit (utiliser le composant `Modal`) |
| Chaines en dur dans le JSX | Interdit (utiliser `src/constants/`) |
| Composants sans tests | Interdit |

### Principes

- **SRP** (Single Responsibility Principle) : une responsabilite par composant/fichier
- **DRY** (Don't Repeat Yourself) : reutiliser helpers, constantes et hooks existants
- **Composition** plutot que duplication
- **Separation des preoccupations** : UI (Tailwind) vs canvas (inline styles)

### Langue

- Interface et documentation en **francais**
- Accents obligatoires dans les textes d'interface
- Commits Git en francais, descriptifs du "pourquoi"

---

## Phases de developpement

Les 9 phases de developpement sont toutes terminees :

| Phase | Description | Statut |
|-------|-------------|--------|
| 1 | Migration du prototype (Vite + React + TS + Zustand + Tailwind) | Termine |
| 2 | Capture, impression, dimensionnement des polices, dimensions du template | Termine |
| 3 | Gestion des templates (IndexedDB, JSON, import/export) | Termine |
| 4 | Frame Data API (serialisation, delta encoding, enregistrement) | Termine |
| 5 | 13 body types predefinis (types 1 a 13) | Termine |
| 6 | Mode operateur live (raccourcis clavier, fenetre de sortie) | Termine |
| 7 | Photos et medias (photos joueurs, logos equipe/sponsors) | Termine |
| 8 | Animations et export (enregistrement video, export GIF) | Termine |
| 9 | Integrations externes (import rosters, API live, multi-scoreboard, sync, CasparCG/Viz) | Termine |

Le mode **mise en page libre** (Body Type 14) a ete developpe en parallele avec des fonctionnalites avancees : multi-selection, guides intelligents, zoom/pan, redimensionnement a 8 poignees, menu contextuel, rotation, edition en ligne, distribution/alignement, 50+ elements reutilisables, presets, undo/redo et raccourcis clavier.

---

## Licence

Proprietaire -- Tous droits reserves.
