# Vue d'ensemble du systeme

Description detaillee de l'architecture, des modules et du flux de donnees du Scoreboard Editor.

---

## 1. Architecture globale

Le Scoreboard Editor est une application React mono-page avec trois vues :

| Route | Vue | Role |
|-------|-----|------|
| `/` | Editeur | Conception des templates (panneau lateral + preview) |
| `/operator` | Operateur | Controle live du scoreboard pendant un match |
| `/output` | Sortie | Rendu plein ecran du scoreboard (capturable par OBS/vMix) |

Les trois vues partagent le meme state Zustand. La synchronisation entre fenetres se fait via `BroadcastChannel`.

---

## 2. Stores Zustand

### 2.1 `useScoreboardStore` (principal)

**Fichier** : `src/stores/scoreboardStore.ts`

State principal de l'application. Contient toutes les donnees du scoreboard : equipes, scores, couleurs, polices, phases, penalites, et les donnees specifiques aux 13 body types.

**Middleware** :
- `immer` : mutations immutables via draft
- `persist` : sauvegarde automatique dans `localStorage` (cle `scoreboard-state`, version 4)

**Actions principales** :
- `update(key, value)` : mise a jour generique d'un champ
- `updateColor(key, value)` / `updateOpacity(key, value)` : couleurs
- `applyPreset(preset)` : application d'un preset de couleurs
- `addStat/updateStat/removeStat` : stats des types 1-2
- `addPenalty/updatePenalty/removePenalty` : penalites
- `startClock/stopClock/resetClock/tickTimer` : horloge
- `incrementScore/decrementScore` : scores
- `nextPhase` : avancer a la phase suivante
- `loadState/resetState` : charger/reinitialiser
- Actions specifiques par body type (updateGoalField, addRosterPlayer, etc.)
- `addCustomField/updateCustomField/removeCustomField` : champs personnalisés (Body Type 14)
- `selectField/reorderField` : sélection et réordonnancement des couches
- `moveSelectedFields/removeSelectedFields/duplicateSelectedFields` : operations multi-selection
- `distributeSelectedFields` : alignement et distribution automatique
- `pasteFields` : collage depuis le presse-papiers interne
- `selectAllFields/clearFieldSelection/toggleFieldSelection` : gestion de la selection

### 2.2 `useTemplateStore`

**Fichier** : `src/stores/templateStore.ts`

Gestion de la bibliotheque de templates persistee dans IndexedDB.

**State** : `templates: ScoreboardTemplate[]`, `loading: boolean`

**Actions** :
- `fetchTemplates()` : charge depuis IndexedDB, tri par date de modification
- `saveTemplate(name, state)` : cree un nouveau template
- `updateTemplate(id, state)` : met a jour un template existant
- `renameTemplate(id, name)` / `deleteTemplate(id)` / `duplicateTemplate(id)`
- `exportTemplate(id)` : telecharge en `.scoreboard.json`
- `importTemplate(file)` : importe depuis un fichier JSON

### 2.3 `usePhotoStore`

**Fichier** : `src/stores/photoStore.ts`

Gestion des photos de joueurs persistees dans IndexedDB.

**State** : `photos: PlayerPhoto[]`, `loading: boolean`

**Actions** :
- `fetchPhotos()` : charge toutes les photos depuis IndexedDB
- `addPhoto(team, number, playerName, file)` : traite et ajoute/remplace une photo
- `removePhoto(id)` : supprime une photo par son ID
- `getPhoto(team, number)` : retourne le data URL d'une photo (ou chaine vide)

### 2.4 `useLogoStore`

**Fichier** : `src/stores/logoStore.ts`

Gestion des logos (equipe, competition, sponsor) persistes dans IndexedDB.

**State** : `logos: LogoEntry[]`, `loading: boolean`

**Actions** :
- `fetchLogos()` : charge tous les logos depuis IndexedDB
- `addLogo(logoType, key, name, file)` : traite et ajoute/remplace un logo
- `removeLogo(id)` : supprime un logo par son ID
- `getLogo(logoType, key)` : retourne le data URL d'un logo (ou chaine vide)
- `getLogosByType(logoType)` : retourne les logos filtres par type

### 2.5 `useFrameStore`

**Fichier** : `src/stores/frameStore.ts`

Gestion de l'enregistrement de frames pour la Frame Data API.

**State** : `recording: boolean`, `frameCount: number`, `recorder: FrameRecorder`

**Actions** :
- `startRecording(getState, interval?)` : demarre l'enregistrement
- `stopRecording()` : arrete
- `getRecording()` : retourne l'enregistrement complet
- `resetRecording()` : reinitialise

### 2.6 `useLiveDataStore`

**Fichier** : `src/stores/liveDataStore.ts`

Connexion a une API externe de scores en temps reel (WebSocket ou HTTP polling).

**State** : `config: LiveDataConfig`, `status: LiveDataConnectionStatus`, `lastUpdate: string`, `errorMessage: string`

**Actions** :
- `updateConfig(key, value)` : modification de la configuration (endpoint, matchId, autoUpdate)
- `setStatus(status)` : mise a jour du statut de connexion
- `setLastUpdate(time)` / `setErrorMessage(msg)` : suivi d'etat
- `resetLiveData()` : reinitialisation complete

### 2.7 `useMultiScoreboardStore`

**Fichier** : `src/stores/multiScoreboardStore.ts`

Gestion des overlays multi-scoreboard (lower third, score bug, ticker).

**State** : `overlays: OverlayInstance[]`, `tickerItems: TickerItem[]`, `tickerSpeed: number`

**Actions** :
- `addOverlay(type)` : ajoute un overlay (max 10)
- `removeOverlay(id)` / `toggleOverlay(id)` : gestion des overlays
- `updateOverlay(id, updates)` : mise a jour position, opacite
- `addTickerItem(text)` / `removeTickerItem(id)` / `updateTickerItem(id, text)` : elements du ticker
- `setTickerSpeed(speed)` : vitesse de defilement
- `resetMultiScoreboard()` : reinitialisation

### 2.8 `useSyncStore`

**Fichier** : `src/stores/syncStore.ts`

Synchronisation multi-poste via WebSocket (admin, operateur, viewer).

**State** : `config: SyncConfig`, `status: SyncConnectionStatus`, `clientId: string`, `peers: SyncPeer[]`, `errorMessage: string`

**Actions** :
- `updateConfig(key, value)` : modification de la configuration
- `setStatus(status)` / `setRole(role)` : statut et role
- `addPeer(peer)` / `removePeer(clientId)` : gestion des pairs connectes
- `resetSync()` : reinitialisation complete

### 2.9 `useBroadcastStore`

**Fichier** : `src/stores/broadcastStore.ts`

Integration CasparCG / Viz : streaming de donnees vers des systemes broadcast externes.

**State** : `config: BroadcastConfig`, `status: BroadcastStatus`, `connectedClients: number`, `framesSent: number`, `lastFrameTime: string`

**Actions** :
- `updateConfig(key, value)` : modification de la configuration (ports, export fichier)
- `setStatus(status)` / `setConnectedClients(n)` : statut du streaming
- `incrementFramesSent()` : compteur de frames envoyees
- `resetBroadcast()` : reinitialisation complete

### 2.10 `usePresetStore`

**Fichier** : `src/stores/presetStore.ts`

Gestion des presets de champs personnalises et de layouts, persistes dans IndexedDB (table `fieldPresets`).

**State** : `presets: FieldPreset[]`, `loading: boolean`

**Actions** :
- `fetchPresets()` : charge depuis IndexedDB, tri par date de modification
- `saveFieldPreset(name, field)` : sauvegarde un champ individuel
- `saveLayoutPreset(name, layout)` : sauvegarde un ecran complet (tous les champs + options)
- `renamePreset(id, name)` / `deletePreset(id)`
- `exportPreset(id)` : telecharge en `.preset.json`
- `importPreset(file)` : importe depuis un fichier JSON

### 2.11 `useUndoRedoStore`

**Fichier** : `src/stores/undoRedoStore.ts`

Historique undo/redo des champs personnalises (Body Type 14). Non persiste.

**State** : `past: CustomField[][]`, `future: CustomField[][]`, `canUndo: boolean`, `canRedo: boolean`

**Actions** :
- `undo()` : restaure l'etat precedent
- `redo()` : retablit l'etat suivant
- `clear()` : vide l'historique

**Fonctions utilitaires** :
- `initUndoRedoListener()` : initialise l'ecoute des changements avec debounce (300ms)
- `flushUndoSnapshot()` : force le commit immediat du snapshot en attente
- `resetUndoRedoListener()` : reinitialise le listener (tests)

### 2.12 `useClipboardStore`

**Fichier** : `src/stores/clipboardStore.ts`

Presse-papiers interne pour copier/couper/coller des champs personnalises.

**State** : `copiedFields: CustomField[]`, `pasteCount: number`

**Actions** :
- `copyFields(fields)` : copie les champs dans le presse-papiers
- `incrementPasteCount()` : incremente le compteur de collages (pour le decalage)

### 2.13 `useCanvasViewStore`

**Fichier** : `src/stores/canvasViewStore.ts`

Etat du zoom et du panoramique du canvas.

**State** : `scale: number`, `panX: number`, `panY: number`

**Actions** :
- `zoomIn()` / `zoomOut()` : zoom par paliers
- `zoomToFit()` : ajuster au canvas
- `zoomTo100()` : zoom a 100%
- `setPan(x, y)` : definir le decalage

---

## 3. Hooks

| Hook | Fichier | Role |
|------|---------|------|
| `useTimer` | `src/hooks/useTimer.ts` | Intervalle 100ms pour le decompte de l'horloge et des penalites |
| `useScaling` | `src/hooks/useScaling.ts` | `ResizeObserver` + calcul du facteur `scale` pour le preview |
| `useFontLoader` | `src/hooks/useFontLoader.ts` | Injection du `<link>` Google Fonts dans le `<head>` (25 polices) |
| `useOutputSyncSender` | `src/hooks/useOutputSync.ts` | Envoie le state via `BroadcastChannel` (cote editeur/operateur) |
| `useOutputSyncReceiver` | `src/hooks/useOutputSync.ts` | Recoit le state via `BroadcastChannel` (cote sortie) |
| `useOperatorKeyboard` | `src/hooks/useOperatorKeyboard.ts` | Raccourcis clavier du mode operateur |
| `usePlayerPhotos` | `src/hooks/usePlayerPhotos.ts` | Map id -> dataUrl des photos de joueurs (charge depuis IndexedDB) |
| `useLogos` | `src/hooks/useLogos.ts` | Map id -> dataUrl de tous les logos (charge depuis IndexedDB) |
| `useAnimationTriggers` | `src/hooks/useAnimationTriggers.ts` | Detection de changements (score, penalites, visibilite) et activation des drapeaux d'animation |
| `useExportConfig` | `src/hooks/useExportConfig.ts` | Configuration d'export video/GIF (etat local) |
| `useLiveData` | `src/hooks/useLiveData.ts` | Connexion a une API de scores temps reel (WebSocket/polling) |
| `useSync` | `src/hooks/useSync.ts` | Synchronisation multi-poste via WebSocket |
| `useBroadcast` | `src/hooks/useBroadcast.ts` | Streaming de donnees vers CasparCG / Viz |
| `useFieldDrag` | `src/hooks/useFieldDrag.ts` | Drag (déplacement) des champs personnalisés avec compensation de scale |
| `useFieldResize` | `src/hooks/useFieldResize.ts` | Resize (redimensionnement) des champs personnalisés avec compensation de scale |
| `useFieldFontSize` | `src/hooks/useFieldFontSize.ts` | Contrôle de taille de police sur le canvas (barre flottante + molette) |
| `usePressRepeat` | `src/hooks/usePressRepeat.ts` | Répétition accélérée au maintien d'un bouton (utilisé par la barre de police) |
| `useFontSelectGroups` | `src/hooks/useFontSelectGroups.ts` | Construit les groupes de polices par categorie pour le composant Select |
| `useUserManual` | `src/hooks/useUserManual.ts` | État du manuel utilisateur intégré (ouverture, chapitre actif) |
| `useCustomFieldKeyboard` | `src/hooks/useCustomFieldKeyboard.ts` | Raccourcis clavier du Layout libre (Suppr, Ctrl+D, flèches, copier/coller, zoom) |
| `useSmartGuides` | `src/hooks/useSmartGuides.ts` | Guides d'alignement dynamiques pendant le deplacement (snap a 6px) |
| `useZoneSelection` | `src/hooks/useZoneSelection.ts` | Selection de zone par rectangle sur le canvas |
| `useFieldRotation` | `src/hooks/useFieldRotation.ts` | Rotation des champs avec poignee et snap a 15 degres |
| `useInlineEdit` | `src/hooks/useInlineEdit.ts` | Edition de texte inline au double-clic sur les blocs texte |
| `useLibraryDragDrop` | `src/hooks/useLibraryDragDrop.ts` | Drag-and-drop d'elements depuis la bibliotheque vers le canvas |

---

## 4. Frame Data API

**Dossier** : `src/api/`

Architecture en 3 couches de donnees :

### Couche 1 : TemplateData (quasi-statique)

Design, couleurs, polices, dimensions. Change rarement (1 fois par match/evenement).

### Couche 2 : MatchData (semi-dynamique)

Equipes, rosters, phases, donnees de body type. Change entre les matchs.

### Couche 3 : FrameData (temps reel)

Scores, temps, penalites, phase active. Change chaque seconde.

### Modules

| Fichier | Role |
|---------|------|
| `frameExport.ts` | `getFullSnapshot()`, `getCurrentFrame()`, `getConfiguration()`, export JSON/NDJSON |
| `frameRecorder.ts` | Classe `FrameRecorder` : enregistrement continu avec intervalle configurable |
| `frameDelta.ts` | `computeDelta()` et `applyDelta()` : encodage delta pour optimisation |
| `frameConverters.ts` | Conversion `ScoreboardState` vers `TemplateData`, `MatchData`, `FrameData` |
| `db.ts` | Instance Dexie.js pour IndexedDB |
| `liveData/liveDataClient.ts` | Client WebSocket + HTTP polling pour API de scores externes |
| `liveData/liveDataMapper.ts` | Mapping des donnees live vers `ScoreboardState` |
| `sync/syncClient.ts` | Client WebSocket pour synchronisation multi-poste (reconnexion auto) |
| `broadcast/broadcastStreamer.ts` | Streamer CasparCG/Viz : snapshots, deltas, export JSON |

### Formats d'export

| Format | Extension | Contenu |
|--------|-----------|---------|
| Template | `.scoreboard.json` | Couches 1 + 2 |
| Match complet | `.match.json` | Couches 1 + 2 + 3 (toutes les frames) |
| Frame unique | `.frame.json` | Couche 3 seule |
| Stream | `.stream.ndjson` | Succession de couche 3 (Newline Delimited JSON) |

---

## 5. Composants

### 5.1 Composants UI (`src/components/ui/`)

Source de verite unique pour les composants de base : Button, Modal, Section, InputField, Select, ColorPicker, ImageUpload, SectionGroupLabel.

**Composant de rendu** : `PhotoCircle` (`src/components/preview/PhotoCircle.tsx`) - cercle affichant une photo de joueur ou un numero en fallback.

**Composant de rendu** : `LogoOverlay` (`src/components/preview/LogoOverlay.tsx`) - logo en superposition sur le canvas (competition ou sponsor), positionnable dans 6 positions.

Voir `docs/DESIGN_SYSTEM_REFERENCE.md` pour le detail.

### 5.2 Editeur (`src/components/editor/`)

**EditorPanel.tsx** organise le panneau lateral en 3 groupes :

1. **Contenu** : HeaderSection, TitleSection, BodyContentSection (switch par body type), TimeoutSection, ShootoutSection, PenaltySection, PhotoSection, LogoSection
2. **Apparence** : GeneralSection, TemplateSizeSection, BackgroundSection, FontSection, FontSizeSection, ColorSection
3. **Horloge** : ClockSection
4. **Animations et export** : AnimationSection, ExportSection
5. **Integrations** : LiveDataSection, MultiScoreboardSection, SyncSection, BroadcastSection

**BodyContentSection** renvoie la section d'edition appropriee selon le body type actif (StatsSection, PlayerStatsSection, GoalSection, etc.).

**TemplateManager** gere la sauvegarde/chargement/import/export de templates via modale.

**Composants du constructeur de champs personnalisés (Body Type 14)** :
- `CustomFieldsSection.tsx` : section principale avec rail de 4 onglets (Bibliothèque, Canvas, Calques, Presets) et panneau de propriétés persistant en bas
- `CustomFieldLibrary.tsx` : palette d'éléments unifiée avec filtres horizontaux par catégorie (chips) et recherche
- `CustomFieldList.tsx` : liste des couches avec réordonnancement, visibilité, verrouillage
- `CustomFieldProperties.tsx` : panneau de propriétés persistant (toujours visible en bas de la barre latérale quand un élément est sélectionné), avec sections repliables (position, z-index/rotation, style, config). Le z-index est contrôlé par 4 boutons d'action (premier plan, avancer, reculer, arrière-plan) au lieu d'un champ numérique
- `FieldElementConfigEditor.tsx` : éditeurs de configuration spécifiques par type d'élément

### 5.3 Preview (`src/components/preview/`)

**ScoreboardPreview.tsx** : conteneur avec scaling automatique via `useScaling`. Utilise `AnimatedScoreboard` pour les animations.

**AnimatedScoreboard.tsx** : enveloppe ScoreboardCanvas avec les animations d'entree/sortie, score pop, penalty flash, clock pulse via `useAnimationTriggers`.

**ScoreboardCanvas.tsx** (230 lignes) : composant de rendu principal. Inline styles uniquement. Compose de :
- Fond en degrade (`bgTop` -> `bgMid` -> `bgBot`) ou fond uniforme
- `Header` : drapeaux/logos, noms d'equipes, scores (avec mode TeamBadge : flag/logo/both)
- `ClockOverlay` : horloge et periode
- `BodyRenderer` : switch vers le body type actif (1-13)
- `PenaltyColumn` (gauche et droite) : penalites actives
- `CompetitionLogoRenderer` / `SponsorLogoRenderer` : logos en overlay

**14 body types** dans `src/components/preview/body/` :

Le Layout libre (BodyType14) est le mode principal, proposé en premier dans l'interface.

| Type | Composant | Description |
|------|-----------|-------------|
| 14 | BodyType14 | **Layout libre** (champs personnalises, mode principal) |
| 1 | BodyType1 | Stats symetriques (valeur / label / valeur) |
| 2 | BodyType2 | Stats asymetriques (2 titres) |
| 3 | BodyType3 | Stats joueur avec photo |
| 4 | BodyType4 | But / celebration |
| 5 | BodyType5 | Fiche joueur |
| 6 | BodyType6 | Classement / tableau |
| 7 | BodyType7 | Score final |
| 8 | BodyType8 | Texte libre |
| 9 | BodyType9 | Face-a-face joueurs |
| 10 | BodyType10 | Chronologie / evenements |
| 11 | BodyType11 | Barres comparatives |
| 12 | BodyType12 | Roster / composition |
| 13 | BodyType13 | Calendrier / prochains matchs |

**Sous-composants du Body Type 14** :

| Fichier | Rôle |
|---------|------|
| `InteractiveField.tsx` | Champ interactif avec sélection, drag et resize (poignées de coins) |
| `FieldFontToolbar.tsx` | Barre flottante de contrôle de taille de police au-dessus du champ sélectionné |
| `FieldElementRenderer.tsx` | Rendu visuel d'un élément selon son type (switch/dispatch) |
| `FieldMatchElements.tsx` | Renderers des éléments match : score, horloge, période, nom d'équipe, drapeau, temps morts, tirs au but |
| `ZoneSelectionOverlay.tsx` | Overlay de sélection de zone par rectangle, extrait en composant autonome |

### 5.4 Operateur (`src/components/operator/`)

**OperatorPanel.tsx** : interface simplifiee pour le controle live. Panneau de 420px a gauche avec :
- `ScoreControls` : boutons +/- pour chaque equipe
- `ClockControls` : demarrer/arreter/reinitialiser
- `PhaseControls` : selection de la phase
- `PenaltyControls` : ajout de penalites

Active `useOperatorKeyboard()` pour les raccourcis clavier.

### 5.5 Sortie (`src/components/output/`)

**OutputWindow.tsx** : recoit le state via `useOutputSyncReceiver()` et affiche `ScoreboardCanvas` en plein ecran. Integre `OverlayRenderer` pour les overlays multi-scoreboard. Ouverte via `window.open()` depuis l'editeur.

**Overlays multi-scoreboard** (`src/components/output/`) :
- `LowerThird.tsx` : barre inferieure pleine largeur (equipes, score, temps, periode)
- `ScoreBug.tsx` : affichage compact de score, positionnable en 6 positions
- `Ticker.tsx` : bandeau defilant avec animation CSS
- `OverlayRenderer.tsx` : rendu conditionnel des overlays visibles

---

## 6. Types

**Dossier** : `src/types/`

| Fichier | Contenu |
|---------|---------|
| `scoreboard.ts` | `ScoreboardState`, `Penalty`, `PeriodOption`, `StatLine`, `PlayerStat` |
| `storeActions.ts` | `ScoreboardActions` (60+ signatures d'actions) |
| `template.ts` | `ScoreboardTemplate`, `TemplateFileFormat` |
| `frameData.ts` | `TemplateData`, `MatchData`, `FrameData`, `FullSnapshot`, `FrameDelta` |
| `colors.ts` | `ColorMap`, `ColorKey`, `ColorPreset`, `OpacityMap` |
| `fonts.ts` | `FontId` (union de tous les IDs de police) |
| `fontSizes.ts` | `FontSizeConfig`, `FontSizeKey` |
| `media.ts` | `BackgroundMediaMode` |
| `playerPhoto.ts` | `PlayerPhoto`, `playerPhotoKey()` |
| `logo.ts` | `LogoEntry`, `LogoType`, `LogoPosition`, `LogoMode`, `logoEntryId()` |
| `animation.ts` | `AnimationConfig`, `EntryAnimation`, `EasingType`, `ExportConfig`, `VideoFormat`, `GifQuality` |
| `nations.ts` | Codes nations |
| `bodyTypes/*.ts` | Types par body type (goal, playerCard, standings, etc.) |
| `rosterImport.ts` | `RosterImportFormat`, `RosterImportMode`, `RosterImportResult`, `RosterImportColumn` |
| `liveData.ts` | `LiveDataConnectionStatus`, `LiveMatchData`, `LiveDataConfig` |
| `multiScoreboard.ts` | `OverlayType`, `OverlayInstance`, `TickerItem`, `MultiScoreboardConfig` |
| `sync.ts` | `SyncRole`, `SyncPeer`, `SyncMessage`, `SyncConfig` |
| `broadcast.ts` | `BroadcastStatus`, `BroadcastConfig`, `DEFAULT_BROADCAST_CONFIG` |
| `customField.ts` | `CustomField`, `FieldElementConfig`, `FieldStyle`, `LibraryElement`, `LibraryCategory` |

---

## 7. Constantes

**Dossier** : `src/constants/`

| Fichier | Contenu |
|---------|---------|
| `labels.ts` | 440+ labels UI en francais (EDITOR_LABELS) |
| `colors.ts` | DEFAULT_COLORS, DEFAULT_OPACITIES, 5 presets |
| `fonts.ts` | FONT_OPTIONS, FONT_LINK (Google Fonts URL) |
| `fontSizes.ts` | FONT_SIZES (tailles auto par nombre de lignes) |
| `phases.ts` | Phases de match par defaut |
| `bodyTypes.ts` | Definitions des 14 body types (Layout libre en premier) |
| `customFields.ts` | Bibliothèque d'éléments (25+), labels et catégories du constructeur de champs |
| `resolutions.ts` | Presets de resolution (Full HD, 4K, 720p, etc.) |
| `nations.ts` | 31 nations de hockey avec codes NOC |

---

## 8. Utilitaires

**Dossier** : `src/utils/`

| Fichier | Fonctions | Role |
|---------|-----------|------|
| `color.ts` | `hexToRgba()` | Conversion hex + opacite vers rgba |
| `time.ts` | `parseTime()`, `formatTime()` | Conversion MM:SS <-> secondes |
| `font.ts` | `ff(fontId)` | Resolution d'un ID vers la famille CSS |
| `screenshot.ts` | `captureScreenshot()` | Capture PNG via html-to-image |
| `image.ts` | Redimensionnement, compression, base64 | Traitement d'images uploadees |
| `animation.ts` | `entryKeyframeName()`, `buildAnimationCss()`, `parseTimeToSeconds()` | Utilitaires d'animation CSS |
| `videoRecorder.ts` | `VideoRecorder` (classe) | Enregistrement video via MediaRecorder + html-to-image |
| `gifEncoder.ts` | `exportGif()`, `downloadGif()` | Export GIF anime via gif.js |
| `roster/csvParser.ts` | `parseCsv()` | Import CSV via PapaParse |
| `roster/excelParser.ts` | `parseExcel()` | Import Excel via xlsx |
| `roster/jsonParser.ts` | `parseJsonRoster()` | Import JSON (array ou objet) |
| `roster/rosterValidator.ts` | `validateAndMapRows()` | Validation et normalisation des rosters importes |
| `roster/rosterExporter.ts` | `exportRosterCsv()`, `exportRosterJson()`, `exportRosterExcel()` | Export de rosters |
| `fieldStyle.ts` | `fieldBgStyle()` | Conversion style de champ (fond, bordure, padding) en CSSProperties |
| `fontScale.ts` | `scaleFontSizes()` | Mise à l'échelle proportionnelle des tailles de police par body type |

---

## 9. Tests

**Framework** : Vitest + Testing Library + jest-dom

**Setup** : `src/test/setup.ts`

**Couverture** : 151 fichiers de test, 997 tests.

| Categorie | Nombre | Exemples |
|-----------|--------|----------|
| API | 8 | frameExport, frameRecorder, frameDelta, frameConverters, liveDataClient, liveDataMapper, syncClient, broadcastStreamer |
| Composants | 50+ | editeur, body types, UI, operateur, overlays, sections integration |
| Hooks | 10+ | useTimer, useScaling, useOperatorKeyboard, useOutputSync, useFontLoader, useFontSelectGroups, usePlayerPhotos, useLogos, useAnimationTriggers, useExportConfig |
| Stores | 10 | scoreboardStore, templateStore, photoStore, logoStore, presetStore, frameStore, liveDataStore, multiScoreboardStore, syncStore, broadcastStore |
| Utilitaires | 15+ | color, time, font, screenshot, image, animation, videoRecorder, gifEncoder, specGenerator, specExplanation, specMarkdownHelpers, fieldContainment, csvParser, excelParser, jsonParser, rosterValidator, rosterExporter |
| Integration | 2 | App, OutputWindow |

Verification avant commit : `npm run type-check && npm run lint && npm run test:run`
