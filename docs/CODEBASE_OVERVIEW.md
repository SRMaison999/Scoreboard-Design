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

---

## 3. Hooks

| Hook | Fichier | Role |
|------|---------|------|
| `useTimer` | `src/hooks/useTimer.ts` | Intervalle 100ms pour le decompte de l'horloge et des penalites |
| `useScaling` | `src/hooks/useScaling.ts` | `ResizeObserver` + calcul du facteur `scale` pour le preview |
| `useFontLoader` | `src/hooks/useFontLoader.ts` | Injection du `<link>` Google Fonts dans le `<head>` |
| `useOutputSyncSender` | `src/hooks/useOutputSync.ts` | Envoie le state via `BroadcastChannel` (cote editeur/operateur) |
| `useOutputSyncReceiver` | `src/hooks/useOutputSync.ts` | Recoit le state via `BroadcastChannel` (cote sortie) |
| `useOperatorKeyboard` | `src/hooks/useOperatorKeyboard.ts` | Raccourcis clavier du mode operateur |
| `usePlayerPhotos` | `src/hooks/usePlayerPhotos.ts` | Map id -> dataUrl des photos de joueurs (charge depuis IndexedDB) |
| `useLogos` | `src/hooks/useLogos.ts` | Map id -> dataUrl de tous les logos (charge depuis IndexedDB) |
| `useAnimationTriggers` | `src/hooks/useAnimationTriggers.ts` | Detection de changements (score, penalites, visibilite) et activation des drapeaux d'animation |
| `useExportConfig` | `src/hooks/useExportConfig.ts` | Configuration d'export video/GIF (etat local) |

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

**BodyContentSection** renvoie la section d'edition appropriee selon le body type actif (StatsSection, PlayerStatsSection, GoalSection, etc.).

**TemplateManager** gere la sauvegarde/chargement/import/export de templates via modale.

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

**13 body types** dans `src/components/preview/body/` :

| Type | Composant | Description |
|------|-----------|-------------|
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

### 5.4 Operateur (`src/components/operator/`)

**OperatorPanel.tsx** : interface simplifiee pour le controle live. Panneau de 420px a gauche avec :
- `ScoreControls` : boutons +/- pour chaque equipe
- `ClockControls` : demarrer/arreter/reinitialiser
- `PhaseControls` : selection de la phase
- `PenaltyControls` : ajout de penalites

Active `useOperatorKeyboard()` pour les raccourcis clavier.

### 5.5 Sortie (`src/components/output/`)

**OutputWindow.tsx** (27 lignes) : recoit le state via `useOutputSyncReceiver()` et affiche `ScoreboardCanvas` en plein ecran. Ouverte via `window.open()` depuis l'editeur.

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

---

## 7. Constantes

**Dossier** : `src/constants/`

| Fichier | Contenu |
|---------|---------|
| `labels.ts` | 380+ labels UI en francais (EDITOR_LABELS) |
| `colors.ts` | DEFAULT_COLORS, DEFAULT_OPACITIES, 5 presets |
| `fonts.ts` | FONT_OPTIONS, FONT_LINK (Google Fonts URL) |
| `fontSizes.ts` | FONT_SIZES (tailles auto par nombre de lignes) |
| `phases.ts` | Phases de match par defaut |
| `bodyTypes.ts` | Definitions des 13 body types |
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

---

## 9. Tests

**Framework** : Vitest + Testing Library + jest-dom

**Setup** : `src/test/setup.ts`

**Couverture** : 84 fichiers de test, 498 tests.

| Categorie | Nombre | Exemples |
|-----------|--------|----------|
| API | 4 | frameExport, frameRecorder, frameDelta, frameConverters |
| Composants | 40+ | editeur, body types, UI, operateur |
| Hooks | 9 | useTimer, useScaling, useOperatorKeyboard, useOutputSync, useFontLoader, usePlayerPhotos, useLogos, useAnimationTriggers, useExportConfig |
| Stores | 4 | scoreboardStore, templateStore, photoStore, logoStore |
| Utilitaires | 8+ | color, time, font, screenshot, image, animation, videoRecorder, gifEncoder |
| Integration | 2 | App, OutputWindow |

Verification avant commit : `npm run type-check && npm run lint && npm run test:run`
