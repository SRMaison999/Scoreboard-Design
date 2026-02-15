# Architecture de persistance

Description des mecanismes de persistance du Scoreboard Editor : localStorage, IndexedDB et Frame Data API.

---

## 1. Vue d'ensemble

Le systeme utilise deux couches de persistance complementaires :

| Couche | Technologie | Contenu | Acces |
|--------|-------------|---------|-------|
| Session | localStorage | State du scoreboard actif | Zustand persist middleware |
| Bibliotheque | IndexedDB (Dexie.js) | Templates sauvegardes | `useTemplateStore` |

```
+------------------+     persist      +------------------+
|  Zustand Store   | --------------> |  localStorage    |
|  scoreboardStore |   automatique    |  scoreboard-state|
+------------------+                 +------------------+

+------------------+     Dexie.js     +------------------+
|  Template Store  | <-------------> |  IndexedDB       |
|  templateStore   |   CRUD          |  scoreboard-editor|
+------------------+                 +------------------+
```

---

## 2. Persistance de session (localStorage)

### Configuration

| Parametre | Valeur |
|-----------|--------|
| Cle | `scoreboard-state` |
| Version | 2 |
| Middleware | Zustand `persist` |
| Format | JSON serialise |

### Fonctionnement

- **Sauvegarde** : automatique a chaque mutation du store
- **Restauration** : automatique au chargement de l'application
- **Migration** : geree par le parametre `version` de Zustand persist
- **Taille** : variable selon le nombre de donnees (typiquement 5-20 Ko)

### Donnees persistees

Le `ScoreboardState` complet : equipes, scores, couleurs, opacites, polices, tailles de police, phases, penalites, stats, donnees de body type, dimensions du template, mode d'arriere-plan.

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

  constructor() {
    super('scoreboard-editor');
    this.version(1).stores({
      templates: 'id, name, created, modified'
    });
  }
}
```

| Propriete | Valeur |
|-----------|--------|
| Nom de la base | `scoreboard-editor` |
| Version du schema | 1 |
| Table | `templates` |
| Cle primaire | `id` |
| Index | `name`, `created`, `modified` |

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

### Generation des IDs

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
