# Scoreboard Design

Éditeur visuel de templates de scoreboard pour retransmissions de hockey sur glace.

## Objectif

Concevoir, personnaliser et exploiter en direct des affichages de scores, statistiques et classements de joueurs destinés à être incrustés dans un flux vidéo broadcast ou affichés sur un écran dédié.

## État du projet

**Prototype fonctionnel** — Un artifact React complet permet de tester l'ensemble des fonctionnalités de base.

### Fonctionnalités du prototype

- **Header** : drapeaux CSS (31 nations), codes NOC, scores, horloge avec timer temps réel
- **3 modèles de corps** : stats symétriques, stats asymétriques, variable/valeur par joueur
- **Colonnes de pénalités** avec décompte automatique et disparition à 0:00
- **Phases éditables** avec transitions automatiques (warm-up → périodes → intermissions → prolongation)
- **Personnalisation complète** : 12 canaux de couleur avec opacité, 10 polices Google Fonts, 3 zones de police
- **Presets de couleurs** : Classic Blue, Dark Pro, Ice White, Hockey Red, Arena Green
- **Preview responsive** avec scaling automatique (1920×1080)

### Roadmap

Voir la [spécification technique complète](docs/HOCKEY_SCOREBOARD_EDITOR_SPEC.md) pour :

- 13 types de corps planifiés (classement, face-à-face, timeline, barres, fiche joueur, roster, tirs au but...)
- Frame Data API (sérialisation pour reconstruction pixel-perfect)
- Mode opérateur live
- Screenshot / impression
- Tailles de police individuelles
- Dimensions de template configurables
- Animations et transitions
- Intégration broadcast (CasparCG, Viz, OBS)

## Structure

```
scoreboard-design/
├── README.md
├── docs/
│   └── HOCKEY_SCOREBOARD_EDITOR_SPEC.md   # Spécification technique complète
└── prototype/
    └── scoreboard-editor.jsx               # Prototype React fonctionnel
```

## Prototype

Le fichier `prototype/scoreboard-editor.jsx` est un composant React autonome testable dans un artifact Claude.ai ou tout environnement React.

**Dépendances** : React 18+, Google Fonts (chargement dynamique). Aucune autre dépendance externe.

## Stack technique cible

| Couche | Technologie |
|--------|-------------|
| Framework | React 18+ / TypeScript |
| State | Zustand |
| Styles | Tailwind CSS (éditeur) + inline (canvas) |
| Build | Vite |
| Tests | Vitest + Testing Library |
| Persistance | IndexedDB (Dexie.js) |
| Desktop (optionnel) | Electron ou Tauri |

## Licence

Propriétaire — Tous droits réservés.
