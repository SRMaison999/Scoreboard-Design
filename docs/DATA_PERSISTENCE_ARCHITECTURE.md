# Architecture de persistance

Description des mecanismes de persistance du Scoreboard Editor : localStorage, IndexedDB et Frame Data API.

---

## 1. Vue d'ensemble

Le systeme utilise deux couches de persistance complementaires :

| Couche | Technologie | Contenu | Acces |
|--------|-------------|---------|-------|
| Session | localStorage | State du scoreboard actif | Zustand persist middleware |
| Bibliotheque | IndexedDB (Dexie.js) | Templates sauvegardes | `useTemplateStore` |
| Photos | IndexedDB (Dexie.js) | Photos de joueurs (base64) | `usePhotoStore` |
| Logos | IndexedDB (Dexie.js) | Logos equipe/competition/sponsor (base64) | `useLogoStore` |

```
+------------------+     persist      +------------------+
|  Zustand Store   | --------------> |  localStorage    |
|  scoreboardStore |   automatique    |  scoreboard-state|
+------------------+                 +------------------+

+------------------+     Dexie.js     +------------------+
|  Template Store  | <-------------> |  IndexedDB       |
|  templateStore   |   CRUD          |  scoreboard-editor|
+------------------+                 |  - templates     |
                                     |  - playerPhotos  |
+------------------+     Dexie.js    |                  |
|  Photo Store     | <-------------> |                  |
|  photoStore      |   CRUD          |                  |
+------------------+                 |                  |
                                     |                  |
+------------------+     Dexie.js    |                  |
|  Logo Store      | <-------------> |  - logos         |
|  logoStore       |   CRUD          +------------------+
+------------------+
```

---

## 2. Persistance de session (localStorage)

### Configuration

| Parametre | Valeur |
|-----------|--------|
| Cle | `scoreboard-state` |
| Version | 4 |
| Middleware | Zustand `persist` |
| Format | JSON serialise |

### Fonctionnement

- **Sauvegarde** : automatique a chaque mutation du store
- **Restauration** : automatique au chargement de l'application
- **Migration** : geree par le parametre `version` de Zustand persist
- **Taille** : variable selon le nombre de donnees (typiquement 5-20 Ko)

### Donnees persistees

Le `ScoreboardState` complet : equipes, scores, couleurs, opacites, polices, tailles de police, phases, penalites, stats, donnees de body type, dimensions du template, mode d'arriere-plan, configuration des logos (mode, positions, tailles).

### Donnees NON persistees

- `demoRunning` : reinitialise a `false` au rechargement
- Etat de l'interface editeur (sections ouvertes/fermees)
- Etat de connexion BroadcastChannel

---

## 3. Bibliotheque de templates (IndexedDB)

### Schema de la base

**Fichier** : `src/api/db.ts`

```typescript
class ScoreboardDatabase extends Dexie {
  templates!: Dexie.Table<ScoreboardTemplate, string>;
  playerPhotos!: Dexie.Table<PlayerPhoto, string>;
  logos!: Dexie.Table<LogoEntry, string>;
  fieldPresets!: Dexie.Table<FieldPreset, string>;

  constructor() {
    super('scoreboard-editor');
    this.version(1).stores({
      templates: 'id, name, created, modified'
    });
    this.version(2).stores({
      templates: 'id, name, created, modified',
      playerPhotos: 'id, team, number, playerName'
    });
    this.version(3).stores({
      templates: 'id, name, created, modified',
      playerPhotos: 'id, team, number, playerName',
      logos: 'id, logoType, key, name'
    });
    this.version(4).stores({
      templates: 'id, name, created, modified',
      playerPhotos: 'id, team, number, playerName',
      logos: 'id, logoType, key, name',
      fieldPresets: 'id, name, scope, created, modified'
    });
  }
}
```

| Propriete | Valeur |
|-----------|--------|
| Nom de la base | `scoreboard-editor` |
| Version du schema | 4 |
| Tables | `templates`, `playerPhotos`, `logos`, `fieldPresets` |

**Table `templates`** :
| Cle primaire | `id` |
|---|---|
| Index | `name`, `created`, `modified` |

**Table `playerPhotos`** :
| Cle primaire | `id` (format `TEAM-NUMBER`, ex: `CAN-11`) |
|---|---|
| Index | `team`, `number`, `playerName` |

**Table `fieldPresets`** :
| Cle primaire | `id` (format `preset-{timestamp}-{random}`) |
|---|---|
| Index | `name`, `scope`, `created`, `modified` |

### Structure d'un preset de champ

```typescript
interface FieldPreset {
  id: string;         // ex: "preset-1707932400000-a8f3b2c"
  name: string;       // nom choisi par l'utilisateur
  scope: 'field' | 'layout';  // champ unique ou ecran complet
  created: string;    // ISO 8601
  modified: string;   // ISO 8601
  field?: CustomField;       // present quand scope = 'field'
  layout?: CustomFieldsData; // present quand scope = 'layout'
}
```

**Store** : `usePresetStore` dans `src/stores/presetStore.ts`

| Operation | Methode du store | Requete Dexie |
|-----------|-----------------|---------------|
| Lister | `fetchPresets()` | `db.fieldPresets.orderBy('modified').reverse().toArray()` |
| Sauvegarder un champ | `saveFieldPreset(name, field)` | `db.fieldPresets.add(preset)` |
| Sauvegarder un layout | `saveLayoutPreset(name, layout)` | `db.fieldPresets.add(preset)` |
| Renommer | `renamePreset(id, name)` | `db.fieldPresets.update(id, {...})` |
| Supprimer | `deletePreset(id)` | `db.fieldPresets.delete(id)` |
| Exporter | `exportPreset(id)` | Telecharge en `.preset.json` |
| Importer | `importPreset(file)` | Parse + `db.fieldPresets.add(preset)` |

### Structure d'un template

```typescript
interface ScoreboardTemplate {
  id: string;         // ex: "1707932400000-a8f3b2c"
  name: string;       // nom choisi par l'utilisateur
  created: string;    // ISO 8601
  modified: string;   // ISO 8601
  state: ScoreboardState;  // snapshot complet
}
```

### Structure d'une photo de joueur

```typescript
interface PlayerPhoto {
  id: string;         // ex: "CAN-11" (cle: equipe-numero)
  team: string;       // code NOC (ex: "CAN")
  number: string;     // numero du joueur (ex: "11")
  playerName: string; // nom du joueur
  dataUrl: string;    // image en base64 (WebP compresse)
  created: string;    // ISO 8601
}
```

### Operations sur les photos

| Operation | Methode du store | Requete Dexie |
|-----------|-----------------|---------------|
| Lister | `fetchPhotos()` | `db.playerPhotos.toArray()` |
| Ajouter | `addPhoto(team, number, name, file)` | `db.playerPhotos.add(photo)` ou `.update(id, ...)` |
| Supprimer | `removePhoto(id)` | `db.playerPhotos.delete(id)` |
| Chercher | `getPhoto(team, number)` | Recherche en memoire dans le state |

### Traitement des images

Avant stockage, les images passent par un pipeline de compression :
1. Validation du format (PNG, JPEG, WebP)
2. Lecture en data URL via `FileReader`
3. Recadrage carre centre (taille maximale 256px)
4. Compression en WebP (qualite 85%)
5. Stockage du data URL en base64

**Table `logos`** :
| Cle primaire | `id` (format `TYPE-KEY`, ex: `team-CAN`, `competition-iihf`) |
|---|---|
| Index | `logoType`, `key`, `name` |

### Structure d'un logo

```typescript
interface LogoEntry {
  id: string;         // ex: "team-CAN" (cle: type-key)
  logoType: LogoType; // 'team' | 'competition' | 'sponsor'
  key: string;        // identifiant unique par type (ex: "CAN", "iihf", "nike")
  name: string;       // nom descriptif
  dataUrl: string;    // image en base64 (WebP compresse, max 300px)
  created: string;    // ISO 8601
}
```

### Operations sur les logos

| Operation | Methode du store | Requete Dexie |
|-----------|-----------------|---------------|
| Lister | `fetchLogos()` | `db.logos.toArray()` |
| Ajouter | `addLogo(type, key, name, file)` | `db.logos.add(logo)` ou `.update(id, ...)` |
| Supprimer | `removeLogo(id)` | `db.logos.delete(id)` |
| Chercher | `getLogo(type, key)` | Recherche en memoire dans le state |
| Filtrer | `getLogosByType(type)` | Filtre en memoire par type |

### Traitement des logos

Avant stockage, les images passent par un pipeline de compression :
1. Validation du format (PNG, JPEG, WebP)
2. Lecture en data URL via `FileReader`
3. Redimensionnement proportionnel (max 300px, ratio conserve)
4. Compression en WebP (qualite 90%)
5. Stockage du data URL en base64

### Generation des IDs

**Templates** :
```typescript
const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
```

### Operations

| Operation | Methode du store | Requete Dexie |
|-----------|-----------------|---------------|
| Lister | `fetchTemplates()` | `db.templates.orderBy('modified').reverse().toArray()` |
| Creer | `saveTemplate(name, state)` | `db.templates.add(template)` |
| Modifier | `updateTemplate(id, state)` | `db.templates.update(id, { state, modified })` |
| Renommer | `renameTemplate(id, name)` | `db.templates.update(id, { name, modified })` |
| Supprimer | `deleteTemplate(id)` | `db.templates.delete(id)` |
| Dupliquer | `duplicateTemplate(id)` | `db.templates.get(id)` + `add(copie)` |

---

## 4. Import / Export de templates

### Format de fichier

Extension : `.scoreboard.json`

```json
{
  "version": "1.0",
  "name": "Nom du template",
  "created": "2026-02-14T18:00:00.000Z",
  "modified": "2026-02-14T18:30:00.000Z",
  "state": {
    "bodyType": 1,
    "team1": "CAN",
    "team2": "SUI",
    "score1": "3",
    "score2": "2",
    "colors": { "bgTop": "#0b2550", "..." : "..." },
    "...": "..."
  }
}
```

### Export

1. Recuperation du template depuis IndexedDB (ou du state courant)
2. Serialisation en JSON avec indentation
3. Creation d'un `Blob` (`application/json`)
4. Telechargement via `URL.createObjectURL` + clic sur un lien invisible

### Import

1. Lecture du fichier via `FileReader`
2. Parse JSON et validation de la structure
3. Creation d'un nouveau template dans IndexedDB avec un nouvel ID
4. Rafraichissement de la liste

---

## 5. Frame Data API - Formats d'export

### Architecture en 3 couches

```
+--------------------------------------+
| Couche 1 : TemplateData              |
| Design, couleurs, polices, dimensions |
| Change rarement                       |
+--------------------------------------+
| Couche 2 : MatchData                 |
| Equipes, rosters, body data          |
| Change entre les matchs              |
+--------------------------------------+
| Couche 3 : FrameData                 |
| Scores, temps, penalites             |
| Change chaque seconde                |
+--------------------------------------+
```

### FrameData (couche 3)

```typescript
interface FrameData {
  timestamp: number;         // ms depuis le debut
  wallClock: string;         // ISO timestamp
  frameNumber: number;
  score: { left: number; right: number };
  time: string;              // "MM:SS" ou "M:SS.t"
  timeSeconds: number;
  period: string;
  clockRunning: boolean;
  penaltiesLeft: FramePenalty[];
  penaltiesRight: FramePenalty[];
}
```

### Delta encoding

Pour optimiser la taille des enregistrements, seuls les champs modifies entre deux frames sont stockes :

```typescript
interface FrameDelta {
  frameNumber: number;
  timestamp: number;
  changes: Partial<FrameData>;
}
```

Reduction de taille typique : ~70%.

**Fonctions** :
- `computeDelta(prev, next)` : calcule les differences, retourne `null` si aucun changement
- `applyDelta(base, delta)` : reconstruit une frame complete a partir d'une base et d'un delta

### Enregistrement

Le `FrameRecorder` capture des frames a intervalle regulier :

```typescript
recorder.start(getState, {
  interval: 1000,            // 1 frame par seconde
  includeOnlyChanges: true   // delta encoding active
});

// ... pendant le match ...

recorder.stop();
const recording = recorder.getRecording();
// { config, frames[], startTime, endTime, totalFrames }
```

### Formats de fichier

| Format | Usage | API |
|--------|-------|-----|
| `.frame.json` | Frame unique (snapshot) | `exportFrameJson(snapshot)` |
| `.match.json` | Match complet (config + frames) | `exportMatchJson(recording)` |
| `.stream.ndjson` | Stream de frames (NDJSON) | `exportStreamNdjson(frames)` |

---

## 6. Communication inter-fenetres

### BroadcastChannel

| Parametre | Valeur |
|-----------|--------|
| Nom du canal | `scoreboard-sync` |
| Direction | Editeur/Operateur -> Sortie (unidirectionnel) |
| Format du message | `{ type: 'STATE_UPDATE', state: ScoreboardState }` |

### Flux

```
Editeur (/)                        Sortie (/output)
    |                                    |
    |-- useOutputSyncSender()            |-- useOutputSyncReceiver()
    |                                    |
    |-- state change                     |
    |                                    |
    |== BroadcastChannel ===============>|
    |   { type: 'STATE_UPDATE',          |-- setState(event.data.state)
    |     state: ScoreboardState }       |
    |                                    |-- Re-render ScoreboardCanvas
```

### Limitations

- Meme origine uniquement (meme domaine)
- Pas de garantie de livraison
- Unidirectionnel (l'editeur est la source de verite)
- Transmet le state complet (pas de delta)

---

## 7. Diagramme de flux complet

```
Utilisateur
    |
    v
[Composant editeur]
    |
    v
[useScoreboardStore] -- persist --> [localStorage]
    |                                    |
    |                              (restauration au
    |                               rechargement)
    |
    |-- saveTemplate() --> [useTemplateStore]
    |                           |
    |                           v
    |                      [IndexedDB / Dexie]
    |                      (templates sauvegardes)
    |
    |-- useOutputSyncSender()
    |       |
    |       v
    |  [BroadcastChannel]
    |       |
    |       v
    |  [OutputWindow]
    |
    |-- startRecording()
    |       |
    |       v
    |  [FrameRecorder]
    |       |
    |       v
    |  [Export JSON/NDJSON]
```
