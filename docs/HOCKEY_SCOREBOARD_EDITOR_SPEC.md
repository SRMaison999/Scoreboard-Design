# Hockey Scoreboard Editor — Spécification technique complète

## Document destiné aux développeurs

**Version :** 1.0
**Date :** 14 février 2026
**Statut :** Prototype fonctionnel (artifact React) → Application de production

---

## 1. Vue d'ensemble du projet

### 1.1 Objectif

Éditeur visuel de templates de scoreboard pour retransmissions de hockey sur glace. L'application permet de concevoir, personnaliser et exploiter en direct des affichages de scores, statistiques et classements de joueurs destinés à être incrustés dans un flux vidéo broadcast ou affichés sur un écran dédié.

### 1.2 Contexte d'utilisation

- Matchs de hockey sur glace (compétitions internationales, tournois olympiques, championnats)
- Opérateurs vidéo en régie broadcast
- Directeurs techniques d'événements sportifs
- Diffusion OBS / vMix / Wirecast via capture de fenêtre ou NDI

### 1.3 Utilisateurs cibles

- **Opérateur scoreboard** : manipule le scoreboard en direct pendant un match (scores, pénalités, phases)
- **Designer broadcast** : conçoit les templates visuels avant l'événement (couleurs, polices, layout)
- **Directeur technique** : configure l'ensemble pour un événement (équipes, phases, personnalisation)

---

## 2. État actuel du prototype

### 2.1 Stack technique du prototype

- React (composant fonctionnel unique, hooks)
- Rendu inline styles (pas de CSS externe)
- Google Fonts (chargement dynamique)
- Pas de dépendances externes (drapeaux en CSS pur)
- Fonctionne dans un artifact Claude.ai

### 2.2 Fonctionnalités implémentées

#### 2.2.1 Header — En-tête du scoreboard

| Élément | Description |
|---------|-------------|
| Drapeaux | 31 nations de hockey, rendus en CSS pur (pas d'images) |
| Codes pays | Codes NOC (CAN, USA, SUI, etc.) |
| Noms d'équipes | Sélection via dropdown, affichage NOC |
| Scores | Chiffres grands format, éditables |
| Horloge | Temps de jeu MM:SS, position centrée superposée |
| Période | Phase actuelle (ex. "1st PERIOD"), affichée sous l'horloge |

#### 2.2.2 Horloge et phases

| Fonctionnalité | Description |
|----------------|-------------|
| Phases éditables | Chaque phase a un nom, une durée, et une transition vers la phase suivante |
| Timer temps réel | Décompte seconde par seconde en mode démo |
| Transitions auto | À 0:00, passage automatique à la phase suivante avec sa durée |
| Cadre horloge | Mode configurable : jamais / toujours / quand arrêtée / quand en marche |
| Afficher/masquer | Toggle de visibilité de l'horloge entière |

Phases par défaut :

```
TO WARM UP (10:00) → WARM UP (20:00) → TO GAME (5:00)
→ 1st PERIOD (20:00) → 1st INTERMISSION (15:00)
→ 2nd PERIOD (20:00) → 2nd INTERMISSION (15:00)
→ 3rd PERIOD (20:00) → 3rd INTERMISSION (15:00)
OVERTIME (5:00), OVERTIME 2 (5:00)
```

#### 2.2.3 Corps — 3 modèles de layout

**Type 1 : Titre centré + lignes symétriques**

```
            GAME STATISTICS
  82%          GAME          91%
  87%       TOURNAMENT       85%
```

- 1 titre centré sur toute la largeur
- Lignes avec valeur gauche / label central / valeur droite
- Grille CSS 3 colonnes : `1fr [labelW]px 1fr`
- Taille de police automatique selon le nombre de lignes (1–8)

**Type 2 : Deux titres + lignes asymétriques**

```
POWER PLAY         PENALTY KILLING
    82%     GAME     91%
    87%   TOURNMT    85%
```

- 2 titres (gauche / droite) dans les colonnes de valeurs
- Valeurs centrées dans leurs colonnes

**Type 3 : Titre centré + variable / valeur (joueur)**

```
           GAME STATISTICS

GOALS     [11]  KOPITAR          12
ASSISTS   [88]  PASTRNAK          8
POINTS    [11]  KOPITAR          18
+/-       [81]  HOSSA            +6
```

- Titre centré avec espace vertical dédié
- Grille `auto` centrée : Variable | (Photo) | Nom Prénom | Valeur
- Photo joueur optionnelle (cercle avec numéro, placeholder pour vraie photo)
- Tous les textes à la même taille
- Gap uniforme de 35px entre colonnes

#### 2.2.4 Colonnes de pénalités

| Fonctionnalité | Description |
|----------------|-------------|
| Toggle global | Afficher/masquer les colonnes de pénalités |
| Colonnes gauche/droite | Temps + numéro de joueur, jusqu'à 8 pénalités par côté |
| Décompte automatique | Le timer fait aussi défiler les temps de pénalité |
| Disparition à 0:00 | Pénalité retirée automatiquement quand elle expire |
| Nouvelles en haut | Chaque nouvelle pénalité est insérée en tête de liste |

#### 2.2.5 Personnalisation visuelle

**Couleurs (12 canaux avec opacité individuelle) :**

| Canal | Usage | Défaut |
|-------|-------|--------|
| `bgTop` | Dégradé fond haut | #0a1628 |
| `bgMid` | Dégradé fond milieu | #1a237e |
| `bgBot` | Dégradé fond bas | #0a1628 |
| `teamName` | Noms d'équipes | #ffffff |
| `score` | Scores | #4fc3f7 |
| `time` | Horloge | #ffffff |
| `period` | Nom de la période | #ffffff |
| `clockBox` | Fond du cadre horloge | #0d47a1 |
| `statVal` | Valeurs statistiques | #ffffff |
| `statLabel` | Labels statistiques | #ffffff |
| `titleText` | Texte des titres | #ffffff |
| `penaltyTime` | Temps de pénalité | #ff5252 |
| `penaltyNumber` | Numéro pénalité | #ffffff |

Chaque couleur a un slider d'opacité 0–100% (0% = opaque, 100% = transparent).

**Presets de couleurs :**

- Classic Blue (défaut)
- Dark Pro (noir/doré)
- Ice White (blanc/bleu)
- Hockey Red (rouge profond)
- Arena Green (vert stade)

**Polices (3 zones indépendantes, 10 polices disponibles) :**

| Zone | Usage | Défaut |
|------|-------|--------|
| `fontTeams` | Noms d'équipes, scores | Oswald |
| `fontClock` | Horloge, période | Barlow Condensed |
| `fontBody` | Titres, stats, pénalités | Barlow Condensed |

Polices disponibles : Oswald, Barlow Condensed, Bebas Neue, Teko, Anton, Rajdhani, Russo One, Orbitron, Saira Condensed, Chakra Petch.

#### 2.2.6 Preview et scaling

- Canvas virtuel fixe : 1920×1080
- Scaling automatique via `ResizeObserver` et `transform: scale()`
- Ratio préservé, centré dans la zone de preview

#### 2.2.7 Sections de l'éditeur (panneau latéral gauche)

1. Configuration générale (type de corps, équipes, scores, pénalités on/off)
2. Polices (3 sélecteurs)
3. Titre(s) (adapté au type de corps sélectionné)
4. Stats joueur OU Lignes de stats (selon le type de corps)
5. Pénalités (si activées)
6. Couleurs — Background / Texte / Pénalités
7. Horloge (cadre, visibilité)
8. Phases et transitions (collapsible)
9. Démo (START/STOP/RESET, sélecteur de phase)
10. Presets de couleurs

### 2.3 Données / État (state)

```typescript
interface ScoreboardState {
  // Layout
  bodyType: 1 | 2 | 3;
  showPenalties: boolean;

  // Teams
  team1: string; // NOC code
  team2: string;
  score1: string;
  score2: string;

  // Clock
  time: string; // "MM:SS"
  period: string;
  showClock: boolean;
  clockBoxMode: "never" | "always" | "stopped" | "running";

  // Phases
  periodOptions: PeriodOption[];

  // Demo
  demoRunning: boolean;

  // Titles
  titleCenter: string;
  titleLeft: string;
  titleRight: string;

  // Fonts
  fontTeams: string; // font id
  fontClock: string;
  fontBody: string;

  // Colors & opacity
  colors: Record<string, string>; // hex values
  opacities: Record<string, number>; // 0-100

  // Type 3 specific
  showPlayerPhoto: boolean;
  playerStats: PlayerStat[];

  // Type 1 & 2
  stats: StatLine[];

  // Penalties
  penaltiesLeft: Penalty[];
  penaltiesRight: Penalty[];
}

interface PeriodOption {
  label: string;
  next: string;
  duration: string; // "MM:SS"
}

interface PlayerStat {
  label: string;
  value: string;
  playerName: string;
  playerNumber: string;
}

interface StatLine {
  valLeft: string;
  label: string;
  valRight: string;
}

interface Penalty {
  time: string; // "MM:SS"
  number: string;
}
```

### 2.4 Nations et drapeaux

31 nations supportées avec codes NOC et drapeaux CSS :

CAN, USA, RUS, SWE, FIN, CZE, SVK, SUI, GER, DEN, NOR, LAT, AUT, FRA, BLR, KAZ, SLO, HUN, GBR, POL, ITA, JPN, KOR, CHN, ROU, CRO, UKR, EST, LTU, SRB, BUL

Technique de rendu des drapeaux :

- Tricolores verticaux/horizontaux : `linear-gradient`
- Croix scandinaves : divs positionnés en `absolute`
- Éléments complexes : superposition de gradients et formes CSS
- Fallback : rectangle gris avec code NOC

---

## 3. Fonctionnalités à implémenter

### 3.1 Priorité haute — Fonctionnalités confirmées

#### 3.1.1 Capture d'écran (Screenshot)

**Objectif :** Exporter le preview en image PNG haute résolution.

**Spécifications :**

- Bouton "Screenshot" dans la barre d'outils
- Capture du canvas 1920×1080 natif (pas du preview réduit)
- Téléchargement automatique en PNG
- Nom de fichier : `scoreboard_{team1}vs{team2}_{timestamp}.png`
- Bibliothèque recommandée : `html2canvas` ou `dom-to-image-more`
- Doit capturer : dégradés, polices web, opacité, drapeaux CSS
- Option : copier dans le presse-papier (Clipboard API)

**Considérations :**

- Les polices Google Fonts doivent être chargées avant la capture
- Le canvas virtuel doit être rendu à taille native temporairement
- Tester avec tous les types de corps et les pénalités

#### 3.1.2 Impression (Print)

**Objectif :** Imprimer le scoreboard (pour affichage physique ou archivage).

**Spécifications :**

- Bouton "Imprimer" dans la barre d'outils
- Ouvre le dialogue d'impression du navigateur
- Page paysage, fond coloré activé
- Contient uniquement le scoreboard (pas le panneau éditeur)
- CSS `@media print` dédié
- Option : format A3/A4 avec marges minimales

#### 3.1.3 Tailles de police individuelles

**Objectif :** Contrôle granulaire de la taille de chaque élément textuel.

**Éléments à rendre configurables :**

| Élément | Taille actuelle | Plage suggérée |
|---------|----------------|----------------|
| Noms d'équipes (NOC) | 46px | 24–72px |
| Scores | 80px | 40–120px |
| Horloge (temps) | 80px | 40–120px |
| Période | 22px | 12–40px |
| Titres | 30px | 16–60px |
| Valeurs stats (type 1/2) | auto (FONT_SIZES) | 24–120px |
| Labels stats | auto (FONT_SIZES) | 16–60px |
| Valeurs/labels (type 3) | fs.val × 0.55 | 20–80px |
| Temps pénalité | 60px | 30–80px |
| Numéro pénalité | 60px | 30–80px |

**Interface :** Sliders numériques dans une section "Tailles de police" de l'éditeur, regroupés par zone (header / corps / pénalités).

**Option :** Mode auto (actuel, basé sur le nombre de lignes) vs mode manuel.

#### 3.1.4 Taille du template

**Objectif :** Modifier les dimensions de base du scoreboard.

**Spécifications :**

- Dimensions actuelles fixes : 1920×1080
- Champs largeur × hauteur éditables
- Presets de résolution :

| Preset | Dimensions | Ratio |
|--------|-----------|-------|
| Full HD | 1920×1080 | 16:9 |
| 4K UHD | 3840×2160 | 16:9 |
| HD 720p | 1280×720 | 16:9 |
| SD 4:3 | 1440×1080 | 4:3 |
| Carré | 1080×1080 | 1:1 |
| Ultra-wide | 2560×1080 | 21:9 |
| Personnalisé | libre | libre |

- Le scaling du preview s'adapte automatiquement
- Les tailles de police et espacements doivent rester proportionnels

### 3.2 Priorité moyenne — Fonctionnalités prévues

#### 3.2.1 Photos de joueurs réelles

**Objectif :** Remplacer les placeholders cercle/numéro par de vraies photos.

**Spécifications :**

- Upload d'image par joueur (drag & drop ou sélection fichier)
- Stockage local (IndexedDB ou FileSystem API)
- Détourage automatique (fond transparent) ou masque circulaire
- Fallback sur le placeholder numéro si pas de photo
- Format : PNG/JPEG/WebP, redimensionné à max 200×200px
- Association photo ↔ joueur (nom + numéro + équipe)

#### 3.2.2 Gestion des templates

**Objectif :** Sauvegarder, charger et partager des configurations complètes.

**Spécifications :**

- Sauvegarder le state complet en JSON
- Nommer les templates
- Liste des templates sauvegardés (localStorage ou fichier)
- Import/export JSON
- Templates prédéfinis par compétition (JO, Mondial, Champions League, etc.)
- Duplication de template

**Format de fichier :** `.scoreboard.json`

```json
{
  "version": "1.0",
  "name": "JO 2026 - Milano",
  "created": "2026-02-14T18:00:00Z",
  "modified": "2026-02-14T18:00:00Z",
  "state": { /* ScoreboardState complet */ },
  "playerPhotos": { /* base64 ou références */ }
}
```

#### 3.2.3 Mode opérateur (live)

**Objectif :** Interface simplifiée pour l'opérateur en match.

**Spécifications :**

- Panneau de contrôle réduit : uniquement les actions live
- Boutons grands format tactiles :
  - Score +1 / -1 pour chaque équipe
  - Start / Stop horloge
  - Sélecteur de phase rapide
  - Ajout de pénalité (numéro + durée prédéfinie : 2:00, 4:00, 5:00, 10:00)
- Raccourcis clavier configurables
- Plein écran pour le preview (F11 ou double-clic)
- Pas d'édition de couleurs/polices/layout en mode opérateur

#### 3.2.4 Sortie NDI / fenêtre dédiée

**Objectif :** Sortir le scoreboard dans une fenêtre séparée capturable.

**Spécifications :**

- Bouton "Ouvrir en fenêtre séparée" (`window.open`)
- Fenêtre sans bordure, sans barre d'adresse
- Dimensions exactes du template (1920×1080 etc.)
- Fond transparent (chroma key optionnel)
- Capturable par OBS (Window Capture / Browser Source)
- Communication temps réel avec l'éditeur (BroadcastChannel API ou SharedWorker)

#### 3.2.5 Export vidéo / GIF animé

**Objectif :** Créer des séquences animées (intro, transitions).

**Spécifications :**

- Enregistrement de la preview en vidéo (MediaRecorder API)
- Export GIF animé (durée configurable)
- Animations d'entrée/sortie configurables (fade, slide, zoom)
- Transitions entre phases

### 3.3 Priorité basse — Fonctionnalités futures

#### 3.3.1 Modèles de corps additionnels

Chaque type de corps est un composant indépendant (`BodyTypeN.tsx`) avec sa propre interface de données. Le système doit être conçu comme un **registre de plugins** : ajouter un nouveau type = ajouter un composant + une entrée dans le registre, sans toucher au reste du code.

**Type 4 : Classement / Tableau (Standings)**

```
              GROUP A - STANDINGS
#  [FLAG] TEAM    GP   W   L  OTW  OTL  GF  GA  PTS
1  [CAN]  CAN      3   3   0   0    0   12   3   9
2  [USA]  USA      3   2   0   1    0    8   5   7
3  [SUI]  SUI      3   0   1   0    2    4   8   2
4  [GER]  GER      3   0   2   0    1    3  11   1
```

- En-têtes de colonnes entièrement configurables (ajouter/supprimer/renommer)
- Colonnes standards hockey : GP, W, L, OTW, OTL, GF, GA, +/-, PTS
- Drapeaux + codes pays dans chaque ligne
- Tri automatique ou manuel
- Surlignage configurable (qualification : vert, élimination : rouge)
- Nombre de lignes variable (4, 6, 8, 12)
- Option : séparateur visuel entre qualifiés et non qualifiés

```typescript
interface StandingsData {
  title: string;
  columns: StandingsColumn[];
  rows: StandingsRow[];
  highlightRules: HighlightRule[];
  sortBy: string; // column id
  sortDirection: 'asc' | 'desc';
}

interface StandingsColumn {
  id: string;
  label: string;
  width: 'auto' | number; // px
  align: 'left' | 'center' | 'right';
}

interface StandingsRow {
  rank: number;
  team: string; // NOC code
  values: Record<string, string>;
  highlighted: boolean;
  highlightColor?: string;
}

interface HighlightRule {
  type: 'top' | 'bottom' | 'range';
  count: number;
  color: string;
  label?: string; // "Qualifié", "Éliminé"
}
```

**Type 5 : Face-à-face joueurs (Head to Head)**

```
           HEAD TO HEAD

[PHOTO]                      [PHOTO]
#11 KOPITAR                  #88 PASTRNAK
─────────────────────────────────────────
   12        GOALS           8
   15        ASSISTS         12
   27        POINTS          20
   +6        +/-             +2
  145        SHOTS           132
 52.3%       FACE-OFF %      47.7%
```

- 2 joueurs face-à-face, avec photo, nom, numéro
- Lignes de comparaison symétriques (valeur G / label / valeur D)
- Mise en évidence automatique de la meilleure valeur (bold ou couleur)
- Option : barre de progression entre les valeurs
- Réutilise le layout du Type 1 pour les lignes de stats

```typescript
interface HeadToHeadData {
  title: string;
  playerLeft: PlayerInfo;
  playerRight: PlayerInfo;
  comparisons: Comparison[];
  highlightBetter: boolean;
  showProgressBar: boolean;
}

interface PlayerInfo {
  name: string;
  number: string;
  team: string; // NOC
  photo?: string; // base64 or URL
}

interface Comparison {
  label: string;
  valueLeft: string;
  valueRight: string;
  higherIsBetter: boolean; // pour le surlignage auto
}
```

**Type 6 : Timeline / Événements du match**

```
           GAME EVENTS

 1st  19:34  [GOAL]  #11 KOPITAR        SUI  1-0
 1st  12:21  [PEN]   #24 SMITH    2:00  CAN
 1st  08:45  [GOAL]  #88 PASTRNAK       CAN  1-1
 2nd  17:02  [GOAL]  #7  KURASHEV       SUI  2-1
 2nd  05:11  [PEN]   #19 HISCHIER 4:00  SUI
 3rd  00:23  [GOAL]  #34 MATTHEWS       CAN  2-2
```

- Liste chronologique des événements
- Types d'événements : GOAL, PENALTY, TIMEOUT, PERIOD START/END
- Icônes ou badges colorés par type
- Affichage du score courant après chaque but
- Scroll automatique ou pagination si beaucoup d'événements
- Option : filtrer par type d'événement

```typescript
interface TimelineData {
  title: string;
  events: GameEvent[];
  filter: EventType[];
  showRunningScore: boolean;
  maxVisible: number; // scroll ou pagination
}

interface GameEvent {
  id: string;
  period: string;
  time: string;
  type: 'goal' | 'penalty' | 'timeout' | 'period_start' | 'period_end' | 'shootout';
  team: string; // NOC
  playerNumber: string;
  playerName: string;
  detail?: string; // assists, penalty duration, etc.
  score?: string; // "2-1" après un but
}
```

**Type 7 : Barres de progression comparatives**

```
           GAME STATISTICS

SHOTS ON GOAL
███████████████████████░░░░░░  32        19  ░░░░░░░░░░░██████████████
                        CAN                   SUI

POWER PLAY
████████████████░░░░░░░░░░░░░  3/7      1/4  ░░░░░░░░░░░░░░░░████████
                        CAN                   SUI

FACE-OFF %
██████████████████████░░░░░░░  54.2%  45.8%  ░░░░░░░░░░░░░████████████
                        CAN                   SUI
```

- Barres horizontales face-à-face
- Couleurs des équipes
- Valeurs numériques aux extrémités
- Pourcentage ou valeurs absolues
- Animation de remplissage progressif
- Labels centrés

```typescript
interface BarChartData {
  title: string;
  bars: BarComparison[];
  useTeamColors: boolean;
  animated: boolean;
}

interface BarComparison {
  label: string;
  valueLeft: number;
  valueRight: number;
  displayLeft: string; // "32", "54.2%", "3/7"
  displayRight: string;
  isPercentage: boolean;
}
```

**Type 8 : Fiche joueur (Player Card)**

```
           PLAYER OF THE MATCH

        ┌──────────────────┐
        │                  │
        │   [GRANDE PHOTO] │
        │                  │
        └──────────────────┘
         #11 ANZE KOPITAR
              SLOVENIA

  GOALS    ASSISTS    POINTS    +/-    TOI
    2         3          5      +4    22:31
```

- Grande photo centrale (ou placeholder)
- Nom, numéro, équipe/drapeau
- Ligne de statistiques clés en bas
- Option : titre configurable ("Player of the Match", "MVP", "Best Player")
- Option : sous-titre ("1st Period", "Tournament")

```typescript
interface PlayerCardData {
  title: string;
  subtitle?: string;
  player: PlayerInfo;
  stats: { label: string; value: string }[];
  photoSize: 'small' | 'medium' | 'large';
}
```

**Type 9 : Roster / Composition d'équipe**

```
           STARTING LINEUP - CANADA

 GK   #35  MURRAY
  D   #44  RIELLY         D   #8   DOUGHTY
 LW   #29  MACKINNON      C   #97  MCDAVID      RW  #87  CROSBY

───────────────────────────────────────────────
COACH: Jon Cooper          PP: 3/7 (42.9%)
```

- Disposition en formation (flexible : 1-2-3, 1-2-2-1, etc.)
- Position + numéro + nom
- Option : photos des joueurs
- Ligne coach + stats résumées en bas
- Support remplacement en direct

```typescript
interface RosterData {
  title: string;
  team: string;
  formation: string; // "1-2-3", "1-2-2-1"
  players: RosterPlayer[];
  coach: string;
  summaryStats: { label: string; value: string }[];
}

interface RosterPlayer {
  position: string; // GK, D, LW, C, RW
  number: string;
  name: string;
  line: number; // rangée dans la formation
  photo?: string;
}
```

**Type 10 : Résultat final / Score final**

```
    ╔══════════════════════════════════════╗
    ║           FINAL SCORE               ║
    ║                                     ║
    ║  [FLAG]  CAN    3  -  2    SUI [FLAG] ║
    ║                                     ║
    ║  PERIODS:  1-0  /  1-1  /  1-1      ║
    ║                                     ║
    ║  GWG: #11 KOPITAR (SUI) 58:23       ║
    ╚══════════════════════════════════════╝
```

- Score final en très grand format
- Scores par période
- But gagnant (GWG) avec détails
- Option : mention prolongation / tirs au but
- Option : meilleur joueur du match

```typescript
interface FinalScoreData {
  title: string;
  periodScores: { period: string; scoreLeft: number; scoreRight: number }[];
  gwg?: { player: string; team: string; time: string; period: string };
  mvp?: PlayerInfo;
  overtimeNote?: string; // "OT", "SO", "2OT"
}
```

**Type 11 : Prochains matchs / Calendrier**

```
           UPCOMING GAMES

  TODAY  18:00   [CAN] CAN  vs  SUI [SUI]    Arena A
  TODAY  20:30   [USA] USA  vs  FIN [FIN]    Arena B
  TOM.   14:00   [CZE] CZE  vs  SWE [SWE]   Arena A
  TOM.   16:30   [SVK] SVK  vs  GER [GER]   Arena B
```

- Liste des prochains matchs
- Date, heure, équipes avec drapeaux, lieu
- Option : résultats des matchs terminés
- Option : statut du match (en cours, terminé, à venir)

```typescript
interface ScheduleData {
  title: string;
  matches: ScheduleMatch[];
  showVenue: boolean;
  showDate: boolean;
}

interface ScheduleMatch {
  date: string;
  time: string;
  teamLeft: string;
  teamRight: string;
  venue?: string;
  status: 'upcoming' | 'live' | 'finished';
  scoreLeft?: number;
  scoreRight?: number;
}
```

**Type 12 : Tirs au but (Shootout)**

```
           SHOOTOUT

   CAN                           SUI
  #97 MCDAVID    ✓     ✗    #11 KOPITAR
  #29 MACKINNON  ✗     ✓    #88 PASTRNAK
  #87 CROSBY     ✓     ✓    #7  KURASHEV
  #34 MATTHEWS   ✓     -    -
                 3  -  2
```

- Tireurs en face-à-face
- Résultat par tir : réussi (✓), raté (✗), pas encore tiré (-)
- Score cumulé en bas
- Ajout dynamique de rounds

```typescript
interface ShootoutData {
  title: string;
  rounds: ShootoutRound[];
  scoreLeft: number;
  scoreRight: number;
}

interface ShootoutRound {
  roundNumber: number;
  shooterLeft: { number: string; name: string; result: 'scored' | 'missed' | 'pending' };
  shooterRight: { number: string; name: string; result: 'scored' | 'missed' | 'pending' };
}
```

**Type 13 : Texte libre / Message**

```
    ╔══════════════════════════════════════╗
    ║                                     ║
    ║     NEXT GAME: SEMIFINAL            ║
    ║                                     ║
    ║     CANADA  vs  SWITZERLAND         ║
    ║     Tomorrow 18:00 - Arena A        ║
    ║                                     ║
    ╚══════════════════════════════════════╝
```

- Zone de texte libre multiligne
- Alignement configurable (gauche, centre, droite)
- Taille de police par ligne
- Option : encadrement, fond dédié
- Utile pour messages sponsors, annonces, informations

```typescript
interface FreeTextData {
  lines: { text: string; fontSize: number; fontWeight: number; align: 'left' | 'center' | 'right' }[];
  border: boolean;
  padding: number;
}
```

#### 3.3.2 Sérialisation et export de frame (Frame Data API)

**Objectif :** Permettre à tout système externe de récupérer les données nécessaires pour recréer exactement chaque frame du scoreboard, indépendamment du moteur de rendu.

Cette fonctionnalité est essentielle pour :

- Enregistrement et replay
- Intégration dans des systèmes broadcast tiers (CasparCG, Viz, Ross)
- Rendu serveur-side (Node.js, FFmpeg overlay)
- Synchronisation multi-écrans
- Archivage et statistiques post-match

**Architecture : 3 couches de données**

```
┌─────────────────────────────────────────────────┐
│  COUCHE 1 : Template (quasi-statique)           │
│  Design, couleurs, polices, layout, dimensions  │
│  Change rarement (1x par match/événement)       │
├─────────────────────────────────────────────────┤
│  COUCHE 2 : Match (semi-dynamique)              │
│  Équipes, rosters, phases, configuration match  │
│  Change entre les matchs                        │
├─────────────────────────────────────────────────┤
│  COUCHE 3 : Frame (temps réel)                  │
│  Scores, temps, pénalités, phase active         │
│  Change chaque seconde                          │
└─────────────────────────────────────────────────┘
```

**Couche 1 : TemplateData**

```typescript
interface TemplateData {
  version: string;
  id: string;

  // Dimensions
  canvas: {
    width: number;   // 1920
    height: number;  // 1080
  };

  // Layout
  bodyType: number;
  showPenalties: boolean;
  showClock: boolean;
  clockBoxMode: string;

  // Design
  colors: Record<string, string>;
  opacities: Record<string, number>;
  fonts: {
    teams: string;    // font family
    clock: string;
    body: string;
  };
  fontSizes: Record<string, number>;

  // Assets
  assets: {
    playerPhotos: Record<string, string>;  // playerKey → base64/URL
    logos: Record<string, string>;
    customFlags: Record<string, string>;
  };
}
```

**Couche 2 : MatchData**

```typescript
interface MatchData {
  id: string;
  competition: string;
  venue: string;
  date: string;

  // Équipes
  teamLeft: {
    noc: string;
    name: string;
    roster: RosterPlayer[];
  };
  teamRight: {
    noc: string;
    name: string;
    roster: RosterPlayer[];
  };

  // Configuration des phases
  phases: PeriodOption[];

  // Body type data (contenu)
  bodyData: StandingsData | HeadToHeadData | TimelineData
    | BarChartData | PlayerCardData | RosterData
    | FinalScoreData | ScheduleData | ShootoutData
    | FreeTextData | StatLine[] | PlayerStat[];

  // Titres
  titles: {
    center?: string;
    left?: string;
    right?: string;
  };
}
```

**Couche 3 : FrameData (temps réel)**

```typescript
interface FrameData {
  timestamp: number;      // ms depuis le début du match
  wallClock: string;      // ISO datetime
  frameNumber: number;    // incrémental

  // État du jeu
  score: { left: number; right: number };
  time: string;           // "MM:SS"
  timeSeconds: number;    // secondes restantes (pour calculs)
  period: string;
  periodIndex: number;
  clockRunning: boolean;

  // Pénalités actives
  penaltiesLeft: {
    playerNumber: string;
    remainingTime: string;
    remainingSeconds: number;
    totalDuration: number;
    type: string;          // "minor", "major", "misconduct"
  }[];
  penaltiesRight: typeof penaltiesLeft;

  // Body data dynamique (si changements en live)
  bodyDataOverrides?: Partial<MatchData['bodyData']>;

  // Métadonnées
  activeBodyType?: number;  // si changement de type en live
  visibility: {
    scoreboard: boolean;
    clock: boolean;
    penalties: boolean;
    body: boolean;
  };
}
```

**Snapshot complet (les 3 couches combinées)**

```typescript
interface FullSnapshot {
  template: TemplateData;
  match: MatchData;
  frame: FrameData;
}
```

Un snapshot complet contient TOUTES les informations nécessaires pour recréer pixel-perfect le scoreboard à un instant donné, sans aucune connaissance préalable.

**API d'export**

```typescript
interface FrameExportAPI {
  // Snapshot complet (toutes les couches)
  getFullSnapshot(): FullSnapshot;

  // Frame courante uniquement (léger, pour streaming)
  getCurrentFrame(): FrameData;

  // Template + match (pour initialisation)
  getConfiguration(): { template: TemplateData; match: MatchData };

  // Historique des frames (pour replay)
  getFrameHistory(from: number, to: number): FrameData[];

  // Stream de frames (WebSocket / SSE)
  subscribeToFrames(callback: (frame: FrameData) => void): () => void;

  // Export fichier
  exportToJSON(options: {
    includeHistory: boolean;
    includeAssets: boolean;
    fromTimestamp?: number;
    toTimestamp?: number;
  }): Blob;
}
```

**Formats d'export**

| Format | Usage | Contenu |
|--------|-------|---------|
| `.scoreboard.json` | Template + configuration | Couches 1 + 2 |
| `.match.json` | Match complet avec historique | Couches 1 + 2 + 3 (toutes les frames) |
| `.frame.json` | Frame unique | Couche 3 seule |
| `.stream.ndjson` | Stream de frames (Newline Delimited JSON) | Succession de couche 3 |

**Enregistrement automatique des frames**

```typescript
interface FrameRecorder {
  // Démarrer l'enregistrement
  start(options: {
    interval: number;      // ms entre chaque capture (1000 = 1fps)
    includeOnlyChanges: boolean; // delta encoding
  }): void;

  stop(): void;

  // Export
  getRecording(): {
    config: { template: TemplateData; match: MatchData };
    frames: FrameData[];
    startTime: string;
    endTime: string;
    totalFrames: number;
  };
}
```

**Delta encoding (optimisation)**

Pour le streaming et l'enregistrement, seuls les champs modifiés sont transmis :

```typescript
interface FrameDelta {
  frameNumber: number;
  timestamp: number;
  changes: Partial<FrameData>;  // uniquement les champs qui ont changé
}
```

Exemple : si seul le temps change d'une frame à l'autre, le delta contient uniquement :

```json
{
  "frameNumber": 1201,
  "timestamp": 1201000,
  "changes": {
    "time": "19:59",
    "timeSeconds": 1199
  }
}
```

**Intégration broadcast (CasparCG / Viz / HTML overlay)**

Le système doit pouvoir exposer les données via :

1. **WebSocket server** : push de FrameData à chaque changement
2. **HTTP REST API** : GET `/api/frame/current`, GET `/api/snapshot`
3. **SSE (Server-Sent Events)** : stream continu de frames
4. **Fichier partagé** : écriture d'un JSON sur disque (pour intégration legacy)

```
┌──────────────┐    WebSocket     ┌──────────────┐
│  Éditeur /   │ ──────────────── │  CasparCG /  │
│  Opérateur   │    FrameData     │  Viz / OBS   │
│              │ ──────────────── │  HTML overlay │
│              │    REST API      │              │
└──────────────┘                  └──────────────┘
```

**Reconstruction d'une frame**

Un consommateur (moteur de rendu externe) reconstruit le scoreboard en :

1. Récupérant la configuration initiale (`getConfiguration()`)
2. S'abonnant au stream de frames (`subscribeToFrames()`)
3. Appliquant chaque FrameData sur le template pour générer le rendu

Le moteur de rendu peut être :

- Le même composant React (dans un navigateur)
- Un renderer Canvas 2D (pour overlay FFmpeg)
- Un template CasparCG HTML
- Un système propriétaire lisant le JSON

#### 3.3.3 Animations et transitions

| Animation | Usage |
|-----------|-------|
| Fade in/out | Apparition/disparition du scoreboard |
| Slide | Entrée par le haut/bas/côtés |
| Score pop | Animation quand un score change |
| Penalty flash | Clignotement lors d'une nouvelle pénalité |
| Phase transition | Animation lors du changement de phase |
| Clock pulse | Pulsation des dernières 10 secondes |

Configuration : durée, easing, direction.

#### 3.3.4 Sons et alertes

- Buzzer fin de période
- Signal de but
- Alerte pénalité
- Sons configurables (upload audio)

#### 3.3.5 Intégration données externes

- API de scores en temps réel (IIHF, NHL)
- Import de roster d'équipe (CSV, Excel, JSON)
- Synchronisation multi-poste (WebSocket)
- Contrôle distant (tablette opérateur → PC régie)

#### 3.3.6 Multi-scoreboard

- Afficher plusieurs scoreboards simultanément
- Lower third (bande en bas d'écran)
- Bug (logo + score permanent en coin)
- Ticker défilant (résultats d'autres matchs)

#### 3.3.7 Thèmes et branding

- Upload de logo (compétition, sponsors, diffuseur)
- Placement configurable du logo (coins, centre)
- Fond image/vidéo personnalisé (au lieu du dégradé)
- Import de charte graphique complète (JSON)

#### 3.3.8 Historique et undo/redo

- Stack d'historique des modifications
- Ctrl+Z / Ctrl+Y
- Sauvegarde automatique périodique

---

## 4. Architecture recommandée

### 4.1 Stack technique recommandé

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| Framework | React 18+ avec TypeScript | Typage strict, écosystème mature |
| State management | Zustand | Léger, performant, persist middleware |
| Styles | Tailwind CSS + CSS-in-JS ciblé | Utilitaire pour l'éditeur, inline pour le canvas |
| Routing | React Router v6 | Mode éditeur / mode opérateur / fenêtre output |
| Build | Vite | Rapide, HMR, bon support TypeScript |
| Tests | Vitest + Testing Library | Cohérent avec Vite |
| Capture | html-to-image | Léger, bonne qualité |
| Persistance | IndexedDB (Dexie.js) | Templates, photos, configuration |
| Communication | BroadcastChannel API | Éditeur ↔ fenêtre de sortie |
| Desktop (optionnel) | Electron ou Tauri | Fenêtre sans bordure, NDI |

### 4.2 Structure de fichiers

```
src/
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   └── main.tsx
│
├── components/
│   ├── ui/                        # Composants UI réutilisables
│   │   ├── ColorPicker.tsx
│   │   ├── FontSelector.tsx
│   │   ├── OpacitySlider.tsx
│   │   ├── NumberInput.tsx
│   │   ├── Section.tsx            # Panneau collapsible
│   │   ├── Button.tsx
│   │   └── Modal.tsx
│   │
│   ├── editor/                    # Panneau éditeur (gauche)
│   │   ├── EditorPanel.tsx        # Conteneur principal
│   │   ├── GeneralSection.tsx     # Config générale
│   │   ├── FontSection.tsx        # Polices
│   │   ├── FontSizeSection.tsx    # Tailles de police
│   │   ├── TitleSection.tsx       # Titres
│   │   ├── StatsSection.tsx       # Lignes de stats (type 1/2)
│   │   ├── PlayerStatsSection.tsx # Stats joueur (type 3)
│   │   ├── PenaltySection.tsx     # Pénalités
│   │   ├── ColorSection.tsx       # Couleurs + presets
│   │   ├── ClockSection.tsx       # Configuration horloge
│   │   ├── PhaseSection.tsx       # Phases et transitions
│   │   ├── DemoSection.tsx        # Contrôles démo
│   │   └── TemplateSizeSection.tsx # Dimensions du template
│   │
│   ├── preview/                   # Zone de preview (droite)
│   │   ├── ScoreboardPreview.tsx  # Conteneur avec scaling
│   │   ├── ScoreboardCanvas.tsx   # Le scoreboard lui-même
│   │   ├── Header.tsx             # En-tête (équipes, scores)
│   │   ├── ClockOverlay.tsx       # Horloge superposée
│   │   ├── body/                  # Registre de body types
│   │   │   ├── BodyTypeRegistry.ts    # Registre dynamique
│   │   │   ├── BodyType1.tsx          # Symétrique
│   │   │   ├── BodyType2.tsx          # Asymétrique
│   │   │   ├── BodyType3.tsx          # Joueur/variable
│   │   │   ├── BodyType4.tsx          # Classement
│   │   │   ├── BodyType5.tsx          # Face-à-face
│   │   │   ├── BodyType6.tsx          # Timeline
│   │   │   ├── BodyType7.tsx          # Barres comparatives
│   │   │   ├── BodyType8.tsx          # Fiche joueur
│   │   │   ├── BodyType9.tsx          # Roster
│   │   │   ├── BodyType10.tsx         # Score final
│   │   │   ├── BodyType11.tsx         # Calendrier
│   │   │   ├── BodyType12.tsx         # Tirs au but
│   │   │   └── BodyType13.tsx         # Texte libre
│   │   ├── PenaltyColumn.tsx      # Colonne de pénalités
│   │   └── Flag.tsx               # Rendu CSS/SVG des drapeaux
│   │
│   ├── operator/                  # Mode opérateur
│   │   ├── OperatorPanel.tsx
│   │   ├── ScoreControls.tsx
│   │   ├── ClockControls.tsx
│   │   ├── PenaltyControls.tsx
│   │   └── PhaseControls.tsx
│   │
│   └── output/                    # Fenêtre de sortie
│       └── OutputWindow.tsx
│
├── hooks/
│   ├── useScoreboardState.ts      # State principal (Zustand store)
│   ├── useTimer.ts                # Logique timer + pénalités
│   ├── useScaling.ts              # ResizeObserver + calcul scale
│   ├── useKeyboardShortcuts.ts    # Raccourcis clavier
│   ├── useScreenshot.ts           # Capture d'écran
│   ├── usePrint.ts                # Impression
│   ├── useOutputSync.ts           # Sync avec fenêtre output
│   └── useFrameRecorder.ts        # Enregistrement de frames
│
├── stores/
│   ├── scoreboardStore.ts         # Zustand : état du scoreboard
│   ├── templateStore.ts           # Zustand : gestion des templates
│   ├── frameStore.ts              # Zustand : frame recording + export
│   └── settingsStore.ts           # Zustand : préférences appli
│
├── types/
│   ├── scoreboard.ts              # Types principaux
│   ├── colors.ts                  # Types couleurs/opacité
│   ├── fonts.ts                   # Types polices
│   ├── nations.ts                 # Types nations/drapeaux
│   ├── templates.ts               # Types sauvegarde
│   ├── frame.ts                   # FrameData, FrameDelta, FullSnapshot
│   └── bodyTypes/                 # Types par body type
│       ├── standings.ts
│       ├── headToHead.ts
│       ├── timeline.ts
│       ├── barChart.ts
│       ├── playerCard.ts
│       ├── roster.ts
│       ├── finalScore.ts
│       ├── schedule.ts
│       ├── shootout.ts
│       └── freeText.ts
│
├── api/                           # Frame Data API
│   ├── frameExport.ts             # getFullSnapshot, getCurrentFrame
│   ├── frameRecorder.ts           # Enregistrement de frames
│   ├── frameStream.ts             # WebSocket / SSE server
│   └── deltaEncoder.ts            # Delta encoding des frames
│
├── constants/
│   ├── nations.ts                 # HOCKEY_NATIONS + FLAG_STYLES
│   ├── fonts.ts                   # FONT_OPTIONS + FONT_LINK
│   ├── colors.ts                  # defaultColors, defaultOpacities, PRESETS
│   ├── phases.ts                  # Phases par défaut
│   ├── fontSizes.ts               # FONT_SIZES (auto-scaling)
│   ├── bodyTypes.ts               # BODY_TYPES definitions
│   ├── resolutions.ts             # Presets de résolution
│   └── labels.ts                  # Tous les textes UI (français)
│
├── utils/
│   ├── color.ts                   # hexToRgba, color manipulation
│   ├── time.ts                    # parseTime, formatTime
│   ├── font.ts                    # ff() resolver
│   ├── screenshot.ts              # Logique de capture
│   └── print.ts                   # Logique d'impression
│
├── styles/
│   ├── editor.css                 # Styles du panneau éditeur
│   └── print.css                  # Styles @media print
│
├── data/
│   ├── defaultState.ts            # État par défaut complet
│   └── sampleData.ts              # Données d'exemple
│
└── test/
    ├── setup.ts
    └── __tests__/
        ├── components/
        ├── hooks/
        └── utils/
```

### 4.3 State management (Zustand)

```typescript
// stores/scoreboardStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ScoreboardStore {
  state: ScoreboardState;

  // Actions génériques
  update: <K extends keyof ScoreboardState>(key: K, value: ScoreboardState[K]) => void;

  // Actions couleurs
  updateColor: (key: string, value: string) => void;
  updateOpacity: (key: string, value: number) => void;
  applyPreset: (preset: ColorPreset) => void;

  // Actions stats
  updateStat: (index: number, field: string, value: string) => void;
  addStat: () => void;
  removeStat: (index: number) => void;

  // Actions player stats (type 3)
  updatePlayerStat: (index: number, field: string, value: string) => void;
  addPlayerStat: () => void;
  removePlayerStat: (index: number) => void;

  // Actions pénalités
  updatePenalty: (side: 'left' | 'right', index: number, field: string, value: string) => void;
  addPenalty: (side: 'left' | 'right', duration?: string) => void;
  removePenalty: (side: 'left' | 'right', index: number) => void;

  // Actions timer
  tickTimer: () => void;
  startDemo: () => void;
  stopDemo: () => void;
  resetDemo: () => void;

  // Actions phases
  updatePhase: (index: number, field: string, value: string) => void;
  addPhase: () => void;
  removePhase: (index: number) => void;

  // Templates
  loadState: (state: ScoreboardState) => void;
  resetState: () => void;

  // Historique (undo/redo)
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
```

### 4.4 Timer — Architecture

```typescript
// hooks/useTimer.ts
export function useTimer(store: ScoreboardStore) {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!store.state.demoRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      store.tickTimer(); // Décrémente horloge + toutes les pénalités
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [store.state.demoRunning]);
}
```

La méthode `tickTimer()` dans le store :

1. Décrémente `time` de 1 seconde
2. Décrémente chaque pénalité de 1 seconde
3. Supprime les pénalités à 0:00
4. À 0:00 du timer principal : transition automatique vers la phase suivante
5. Si pas de phase suivante : arrête le timer

### 4.5 Communication éditeur ↔ sortie

```typescript
// hooks/useOutputSync.ts
const channel = new BroadcastChannel('scoreboard-sync');

// Côté éditeur : envoyer les changements
useEffect(() => {
  channel.postMessage({ type: 'STATE_UPDATE', state: scoreboardState });
}, [scoreboardState]);

// Côté fenêtre de sortie : recevoir
useEffect(() => {
  channel.onmessage = (event) => {
    if (event.data.type === 'STATE_UPDATE') {
      setDisplayState(event.data.state);
    }
  };
}, []);
```

---

## 5. Spécifications techniques détaillées

### 5.1 Rendu du scoreboard (canvas)

Le scoreboard est rendu en HTML/CSS pur (pas de `<canvas>` 2D). Cela permet :

- Texte net à toute résolution
- Polices web
- Transparence CSS native
- Capture facile via `html-to-image`

**Dimensions de référence :** Toutes les tailles (police, padding, gap) sont en pixels absolus pour le canvas natif (1920×1080 par défaut). Le `transform: scale()` réduit le tout pour le preview.

**Quand les dimensions du template changent**, toutes les tailles doivent être proportionnelles :

```typescript
const scaleFactor = templateWidth / 1920;
const scaledFontSize = baseFontSize * scaleFactor;
```

### 5.2 Drapeaux

**Approche actuelle :** CSS pur (gradients + positioned divs). Avantage : aucune dépendance réseau, fonctionne offline.

**Approche recommandée pour la production :**

- SVG inline pour chaque drapeau (précision maximale)
- Fallback CSS si SVG non disponible
- Ou : sprites PNG intégrés en base64

**Extensibilité :** Prévoir un système de plugins pour ajouter des nations/drapeaux personnalisés.

### 5.3 Capture d'écran

```typescript
// utils/screenshot.ts
import { toPng, toJpeg, toSvg } from 'html-to-image';

export async function captureScreenshot(
  element: HTMLElement,
  options: {
    format: 'png' | 'jpeg' | 'svg';
    quality?: number; // 0-1 pour JPEG
    pixelRatio?: number; // 1 = taille native, 2 = @2x
    backgroundColor?: string | null; // null = transparent
  }
): Promise<Blob> {
  const fn = { png: toPng, jpeg: toJpeg, svg: toSvg }[options.format];

  const dataUrl = await fn(element, {
    width: element.scrollWidth,
    height: element.scrollHeight,
    quality: options.quality,
    pixelRatio: options.pixelRatio || 1,
    backgroundColor: options.backgroundColor,
    // Forcer le chargement des fonts
    fontEmbedCSS: await getFontCSS(),
  });

  return dataUrlToBlob(dataUrl);
}
```

### 5.4 Impression

```css
/* styles/print.css */
@media print {
  body * { visibility: hidden; }
  .scoreboard-canvas,
  .scoreboard-canvas * { visibility: visible; }
  .scoreboard-canvas {
    position: absolute;
    left: 0; top: 0;
    width: 100vw; height: 100vh;
    transform: none !important;
  }
  @page {
    size: landscape;
    margin: 0;
  }
}
```

### 5.5 Raccourcis clavier (mode opérateur)

| Raccourci | Action |
|-----------|--------|
| `Espace` | Start/Stop horloge |
| `R` | Reset horloge |
| `←` / `→` | Score -1 / +1 équipe 1 |
| `↑` / `↓` | Score +1 / -1 équipe 2 |
| `P` | Phase suivante |
| `1` | Ajouter pénalité 2:00 équipe 1 |
| `2` | Ajouter pénalité 2:00 équipe 2 |
| `F11` | Plein écran |
| `Ctrl+S` | Sauvegarder template |
| `Ctrl+Z` | Annuler |
| `Ctrl+Y` | Rétablir |

---

## 6. Principes de développement

### 6.1 Règles générales

- **TypeScript strict** — pas de `any`, types précis partout
- **SRP** — chaque composant, hook, utilitaire = 1 responsabilité
- **DRY** — pas de duplication, helpers partagés
- **Fichiers < 300 lignes** — extraire en sous-composants si nécessaire
- **Max 5 `useState` par composant** — au-delà, extraire dans un hook custom
- **Tailwind CSS** pour l'éditeur, inline styles pour le canvas de rendu
- **Pas d'emojis** dans le code ou l'interface
- **Interface en français** — accents obligatoires, textes dans `constants/labels.ts`
- **Tests obligatoires** — chaque composant avec son `.test.tsx`

### 6.2 Séparation canvas / éditeur

Le scoreboard canvas (zone de rendu) utilise des **styles inline** car :

- Il doit être capturable en image (pas de classes CSS)
- Les styles sont dynamiques (couleurs, tailles, polices configurables)
- Il doit être reproductible dans une fenêtre séparée

L'éditeur (panneau latéral) utilise **Tailwind CSS** car :

- Interface classique avec composants réutilisables
- Pas besoin d'être capturé ou reproduit
- Performance et maintenabilité

### 6.3 Performances

- Le canvas ne re-rend que quand le state change (React.memo + shallow compare)
- Les sections de l'éditeur sont lazy-loaded (collapsibles)
- Le timer utilise `useRef` + `setInterval`, pas de re-render de l'éditeur à chaque tick
- Les images de joueurs sont compressées et mises en cache (IndexedDB)

### 6.4 Extensibilité

L'architecture doit permettre d'ajouter facilement :

- **Nouveaux types de corps** : ajouter un composant `BodyTypeN.tsx` + une entrée dans `BODY_TYPES`
- **Nouvelles nations** : ajouter dans `HOCKEY_NATIONS` + `FLAG_STYLES`
- **Nouvelles polices** : ajouter dans `FONT_OPTIONS` + `FONT_LINK`
- **Nouveaux canaux de couleur** : ajouter dans `defaultColors` + `defaultOpacities` + section éditeur
- **Nouveaux presets** : ajouter dans le tableau de presets
- **Nouvelles résolutions** : ajouter dans `resolutions.ts`
- **Nouvelles animations** : système de plugins d'animation

---

## 7. Phases de développement suggérées

### Phase 1 — Migration du prototype (2 semaines)

- [ ] Setup projet Vite + React + TypeScript + Tailwind
- [ ] Migrer le state vers Zustand
- [ ] Découper le composant monolithique en modules (cf. structure 4.2)
- [ ] Créer le registre de body types (plugin system)
- [ ] Typer toutes les interfaces
- [ ] Reproduire le rendu à l'identique (types 1, 2, 3)
- [ ] Tests unitaires des utilitaires (color, time, font)
- [ ] Tests de composants (Flag, Header, chaque BodyType)

### Phase 2 — Fonctionnalités confirmées (2 semaines)

- [ ] Screenshot (html-to-image)
- [ ] Impression (@media print)
- [ ] Tailles de police individuelles (sliders par élément)
- [ ] Taille du template configurable (presets + personnalisé)
- [ ] Raccourcis clavier de base

### Phase 3 — Gestion de templates (1 semaine)

- [ ] Sauvegarde/chargement JSON
- [ ] Liste de templates (IndexedDB)
- [ ] Import/export fichier
- [ ] Templates prédéfinis

### Phase 4 — Frame Data API (2 semaines)

- [ ] Définir les interfaces TemplateData, MatchData, FrameData
- [ ] Implémenter getFullSnapshot(), getCurrentFrame()
- [ ] Implémenter le FrameRecorder (enregistrement continu)
- [ ] Delta encoding pour optimisation
- [ ] Export JSON / NDJSON
- [ ] WebSocket server pour streaming de frames
- [ ] Tests de sérialisation/désérialisation (round-trip)
- [ ] Endpoint REST API (GET /api/frame/current, GET /api/snapshot)

### Phase 5 — Body types additionnels (3 semaines)

- [ ] Type 4 : Classement / Standings
- [ ] Type 5 : Face-à-face joueurs
- [ ] Type 6 : Timeline / Événements
- [ ] Type 7 : Barres de progression comparatives
- [ ] Type 8 : Fiche joueur (Player Card)
- [ ] Type 9 : Roster / Composition d'équipe
- [ ] Type 10 : Score final
- [ ] Type 11 : Calendrier / Prochains matchs
- [ ] Type 12 : Tirs au but (Shootout)
- [ ] Type 13 : Texte libre / Message
- [ ] Sections éditeur correspondantes pour chaque type
- [ ] Tests pour chaque type

### Phase 6 — Mode opérateur (2 semaines)

- [ ] Interface simplifiée
- [ ] Boutons grands format
- [ ] Raccourcis clavier complets
- [ ] Fenêtre de sortie séparée (BroadcastChannel)
- [ ] Mode plein écran

### Phase 7 — Photos et médias (1 semaine)

- [ ] Upload de photos joueurs
- [ ] Stockage IndexedDB
- [ ] Affichage circulaire avec fallback
- [ ] Upload de logos

### Phase 8 — Animations et export (2 semaines)

- [ ] Système d'animations (fade, slide, pop)
- [ ] Export vidéo (MediaRecorder)
- [ ] Export GIF

### Phase 9 — Intégrations (en continu)

- [ ] API scores temps réel
- [ ] Import rosters (CSV, Excel, JSON)
- [ ] Multi-scoreboard
- [ ] Synchronisation multi-poste
- [ ] Intégration CasparCG / Viz (via Frame Data API)

---

## 8. Fichiers de référence

| Fichier | Contenu |
|---------|---------|
| `scoreboard-editor.jsx` | Prototype complet fonctionnel (969 lignes) |
| Ce document | Spécification technique complète |

Le prototype `scoreboard-editor.jsx` sert de **référence visuelle et fonctionnelle**. Chaque comportement implémenté dans le prototype doit être reproduit à l'identique dans l'application de production avant d'ajouter de nouvelles fonctionnalités.

---

## 9. Glossaire

| Terme | Définition |
|-------|------------|
| **NOC** | National Olympic Committee — code pays à 3 lettres (CAN, SUI, etc.) |
| **Body type** | Modèle de mise en page du corps du scoreboard |
| **Canvas** | Zone de rendu du scoreboard (HTML, pas `<canvas>` 2D) |
| **Phase** | Étape du match (période, intermission, prolongation) |
| **Preset** | Configuration prédéfinie (couleurs, résolution) |
| **Template** | Configuration complète sauvegardée (state + médias) |
| **Lower third** | Bande d'information affichée en bas d'écran |
| **Bug** | Petit élément permanent en coin d'écran (logo + score) |
| **NDI** | Network Device Interface — protocole vidéo réseau |
| **OBS** | Open Broadcaster Software — logiciel de diffusion |
| **Chroma key** | Incrustation par couleur (fond vert/bleu) |
