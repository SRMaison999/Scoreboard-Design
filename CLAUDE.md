# CLAUDE.md — Scoreboard Design

## Projet

Éditeur visuel de templates de scoreboard pour retransmissions de hockey sur glace. Application broadcast professionnelle permettant de concevoir, personnaliser et exploiter en direct des affichages de scores, statistiques et classements destinés à l'incrustation vidéo.

## Lecture obligatoire

À CHAQUE session, AVANT de coder quoi que ce soit, lis ces fichiers :

1. `docs/HOCKEY_SCOREBOARD_EDITOR_SPEC.md` — Spécification technique COMPLÈTE. C'est la bible du projet. Contient l'architecture, les 13 body types, la Frame Data API, toutes les interfaces TypeScript, la structure de fichiers cible, et la roadmap en 9 phases.
2. `prototype/scoreboard-editor.jsx` — Prototype React fonctionnel. RÉFÉRENCE VISUELLE : chaque comportement existant doit être reproduit à l'identique avant d'ajouter de nouvelles fonctionnalités.

## Stack technique

- React 18+ avec TypeScript strict
- Zustand (state management avec persist middleware)
- Tailwind CSS pour l'éditeur, inline styles pour le canvas de rendu
- Vite (build)
- Vitest + Testing Library + jest-dom (tests)
- IndexedDB via Dexie.js (persistance)

---

## INTERDICTIONS — NE JAMAIS ENFREINDRE

| Interdiction | Détail |
|---|---|
| `any` | JAMAIS de `any`. Utiliser `unknown` pour les catch, types précis ou génériques partout ailleurs |
| Styles inline dans l'éditeur | Pas de `style={{}}` dans les composants éditeur. Utiliser Tailwind CSS + `cn()` de `@/lib/utils` |
| Imports relatifs profonds | Pas de `../../`. Utiliser exclusivement `@/` (ex: `@/components/ui/Button`). Seul `./` est autorisé pour le même répertoire |
| Accès direct à localStorage | JAMAIS de `localStorage.getItem/setItem` dans les composants. Passer uniquement par les stores Zustand (persist middleware) |
| Modales from scratch | JAMAIS créer une modale manuellement. Utiliser obligatoirement `Modal` de `@/components/ui/Modal.tsx` et ses sous-composants (`ModalBody`, `ModalFooter`, etc.) |
| Composant sans test | INTERDICTION de créer un composant sans fichier de test associé (`.test.tsx`). Chaque composant, chaque hook = un test |
| Strings hardcodées dans le JSX | JAMAIS de texte en dur dans le rendu. Centraliser tous les labels, messages, statuts dans `src/constants/` |
| Emojis | JAMAIS. Ni dans le code, ni dans les commentaires, ni dans les textes affichés. Application professionnelle |
| Couleurs hardcodées | JAMAIS de `#ffffff` ou `rgb()` en dur. Utiliser les tokens du design system (`primary-`, `gray-`, `red-*`, etc.). Consulter `docs/DESIGN_SYSTEM_REFERENCE.md` |
| Fichier > 300 lignes | JAMAIS. Au-delà, extraire en sous-composants, hooks customs ou helpers |
| Plus de 5 useState | JAMAIS plus de 5 `useState` par composant. Au-delà, extraire dans un hook custom (`useXxxState`, `useXxxForm`, etc.) |
| Créer un composant sans vérifier l'existant | TOUJOURS vérifier `src/components/ui/` et `src/components/common/` AVANT de créer quoi que ce soit |
| Créer/changer de branche | JAMAIS créer une branche ni faire `git checkout` sans permission EXPLICITE de l'utilisateur |

---

## OBLIGATIONS — TOUJOURS RESPECTER

### TypeScript

- `strict: true` dans tsconfig.json
- Interfaces dans `src/types/`, organisées par domaine
- Exporter les interfaces depuis le fichier de domaine concerné
- Types précis partout, génériques quand nécessaire

### Architecture

- **SRP** (Single Responsibility) — chaque composant, hook ou fichier = 1 seule responsabilité
- **DRY** — utiliser les helpers, constantes, hooks et composants existants. Ne JAMAIS recréer ce qui existe déjà
- **Composition** — composants réutilisables plutôt que duplication
- **Séparation des préoccupations** — UI dans les composants, logique dans les hooks, données dans les stores

### Styles et UI

- Tailwind CSS pour l'éditeur (panneau latéral, contrôles)
- Inline styles UNIQUEMENT pour le canvas de rendu scoreboard (car il doit être capturable en image)
- `cn()` de `@/lib/utils` pour combiner des classes conditionnelles
- Icônes : exclusivement Lucide React. Import nommé depuis `lucide-react`. Toujours ajouter `flex-shrink-0`
- Optimisation de l'espace : layouts compacts, pas de whitespace excessif. Privilégier les tableaux aux listes quand l'information est dense
- Formulaires de création et d'édition dans des modales (composant `Modal`), pas dans des pages séparées
- `src/components/ui/` est la SOURCE DE VÉRITÉ UNIQUE pour les composants UI de base. Ignorer les doublons dans d'autres dossiers

### Textes et interface

- Interface intégralement en français
- ACCENTS OBLIGATOIRES : é, è, ê, ë, à, â, ù, û, ü, ô, î, ï, ç — ne jamais les omettre
- Exemples : "développement" (pas "developpement"), "événementiel" (pas "evenementiel"), "créer" (pas "creer"), "modèle" (pas "modele"), "données" (pas "donnees"), "étapes" (pas "etapes"), "hôtels" (pas "hotels"), "vérification" (pas "verification")
- Orthographe, ponctuation, accents : respecter scrupuleusement dans TOUT texte visible par l'utilisateur (labels, messages, titres, placeholders, tooltips)

### Tests — OBLIGATOIRES

- Framework : Vitest + Testing Library + jest-dom
- **CHAQUE nouveau composant DOIT avoir un fichier de test associé** (`.test.tsx`)
- **CHAQUE nouveau hook DOIT avoir un fichier de test associé** (`.test.ts`)
- **CHAQUE nouveau helper/utilitaire DOIT avoir un fichier de test associé** (`.test.ts`)
- Placement : fichiers `.test.tsx` dans un dossier `__tests__/` à côté du code source, ou dans le même répertoire
- Setup global : `src/test/setup.ts`
- Les tests doivent être fonctionnels : tester le comportement visible, pas l'implémentation interne
- Tester les cas nominaux ET les cas limites (données vides, valeurs extrêmes)
- Pas de test sans assertions significatives — chaque test doit vérifier un comportement précis

### Vérifications avant commit

Exécuter AUTOMATIQUEMENT avant chaque `git commit`, SANS que l'utilisateur ait à le demander :

```bash
npm run type-check && npm run lint && npm run test:run
```

Si des erreurs sont détectées, les CORRIGER AVANT de commiter. Ne JAMAIS commiter du code qui ne passe pas ces vérifications.

### Git

- Ne JAMAIS créer de branche sans permission EXPLICITE de l'utilisateur. Travailler sur la branche actuelle
- Ne JAMAIS changer de branche (`git checkout`) sans permission EXPLICITE
- Commiter et pousser SOUVENT : après chaque modification importante, pas d'accumulation de changements
- Messages de commit : en français, descriptifs, expliquant le "pourquoi" du changement
- Branche de push : doit se terminer par le session ID actuel (format `claude/nom-descriptif-SESSIONID`), sinon erreur 403
- En cas d'erreur 403 au push : PRÉVENIR l'utilisateur et DEMANDER CONFIRMATION avant de créer une nouvelle branche

---

## Documentation — OBLIGATIONS

### Documentation technique (`docs/`)

Après CHAQUE modification significative du code, mettre à jour la documentation :

- Mettre à jour les fichiers existants si les fonctionnalités décrites ont changé
- Créer de nouveaux fichiers si de nouvelles fonctionnalités ou modules sont ajoutés
- Maintenir `docs/DOCUMENTATION_INDEX.md` à jour

Structure cible de `docs/` :

```
docs/
├── DOCUMENTATION_INDEX.md              # Index de toute la documentation
├── HOCKEY_SCOREBOARD_EDITOR_SPEC.md    # Spécification technique complète
├── ARCHITECTURE_QUICK_START.md         # Guide de démarrage rapide
├── CODEBASE_OVERVIEW.md                # Vue d'ensemble du système
├── DESIGN_SYSTEM_REFERENCE.md          # Design system (couleurs, tokens)
├── COMPONENT_STYLE_GUIDE.md            # Guide de style des composants
├── DATA_PERSISTENCE_ARCHITECTURE.md    # Architecture de persistance
├── manuel-utilisateur/                 # Manuel utilisateur complet (français)
│   └── ...                             # 1 fichier par fonctionnalité
└── archives/                           # Documentation historique archivée
```

### Manuel utilisateur (`docs/manuel-utilisateur/`)

Créer et maintenir un manuel utilisateur complet en français. Ce manuel décrit chaque fonctionnalité de l'application du point de vue de l'utilisateur final. Chaque fois qu'une fonctionnalité est ajoutée ou modifiée, le manuel doit être mis à jour.

---

## Structure de fichiers cible

```
src/
├── app/                           # Point d'entrée
├── components/
│   ├── ui/                        # Composants UI réutilisables (SOURCE DE VÉRITÉ)
│   ├── common/                    # Composants communs partagés
│   ├── editor/                    # Panneau éditeur (gauche)
│   ├── preview/                   # Zone de preview (droite)
│   │   └── body/                  # Registre de body types (1-13)
│   ├── operator/                  # Mode opérateur live
│   └── output/                    # Fenêtre de sortie
├── hooks/                         # Hooks custom
├── stores/                        # Zustand stores
├── types/                         # Interfaces TypeScript
│   └── bodyTypes/                 # Types par body type
├── constants/                     # Constantes, labels, configs (TOUS les textes ici)
├── utils/                         # Helpers (color, time, font)
├── lib/                           # Utilitaires (cn(), etc.)
├── api/                           # Frame Data API
├── styles/                        # CSS (editor, print)
├── data/                          # État par défaut, données exemple
└── test/                          # Setup tests
```

Détail complet dans `docs/HOCKEY_SCOREBOARD_EDITOR_SPEC.md` section 4.2.

## Principes de rendu du scoreboard

- Le scoreboard est rendu en HTML/CSS pur (PAS de `<canvas>` 2D)
- Canvas virtuel fixe (1920x1080 par défaut, configurable)
- Scaling via `transform: scale()` + `ResizeObserver`
- Toutes les tailles en pixels absolus pour le canvas natif
- Les polices, couleurs et opacités sont dynamiques (contrôlées par le state)

## Phases de développement

1. Migration du prototype vers Vite + React + TypeScript + Tailwind + Zustand
2. Screenshot, impression, tailles de police, dimensions template
3. Gestion de templates (sauvegarde/chargement JSON, IndexedDB)
4. Frame Data API (sérialisation, delta encoding, WebSocket)
5. Body types additionnels (types 4-13)
6. Mode opérateur live
7. Photos et médias
8. Animations et export vidéo/GIF
9. Intégrations externes

Détail complet dans `docs/HOCKEY_SCOREBOARD_EDITOR_SPEC.md` section 7.

---

## Checklist avant CHAQUE modification

- [ ] Lu la spec (`docs/HOCKEY_SCOREBOARD_EDITOR_SPEC.md`) pour la partie concernée
- [ ] Vérifié les composants, hooks, helpers EXISTANTS avant d'en créer
- [ ] Consulté `docs/DESIGN_SYSTEM_REFERENCE.md` pour le style graphique
- [ ] Types précis, pas de `any`
- [ ] Fichier < 300 lignes, < 5 `useState`
- [ ] Tests écrits pour tout nouveau composant/hook/helper
- [ ] Accents corrects dans TOUS les textes visibles
- [ ] Pas d'emojis, pas de styles inline (éditeur), pas de couleurs hardcodées
- [ ] Strings dans `src/constants/`, pas en dur dans le JSX
- [ ] Modales avec le composant `Modal` de `src/components/ui/`
- [ ] Imports via `@/` uniquement
- [ ] `npm run type-check && npm run lint && npm run test:run` passe sans erreur
- [ ] Documentation `docs/` mise à jour si fonctionnalité modifiée
- [ ] Manuel utilisateur mis à jour si impactant pour l'utilisateur final
