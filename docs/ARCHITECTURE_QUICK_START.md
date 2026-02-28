# Architecture - Guide de demarrage rapide

Guide pour les nouveaux developpeurs souhaitant contribuer a Scoreboard Design - Ice Hockey.

---

## 1. Lancer le projet

```bash
npm install
npm run dev          # Serveur de developpement (Vite)
npm run type-check   # Verification TypeScript
npm run lint         # ESLint
npm run test:run     # Tests Vitest (une fois)
npm run test         # Tests en mode watch
npm run build        # Build de production
```

---

## 2. Architecture en 30 secondes

```
Utilisateur
    |
    v
+-------------------+     BroadcastChannel     +-------------------+
|  Editeur (/)      | -----------------------> |  Sortie (/output) |
|  ou                |     STATE_UPDATE          |  ScoreboardCanvas |
|  Operateur         |                          |  (plein ecran)    |
|  (/operator)       |                          +-------------------+
+-------------------+
    |
    v
+-------------------+
|  Zustand Store    |  <-- persist --> localStorage
|  scoreboardStore  |
+-------------------+
    |
    v
+-------------------+
|  IndexedDB        |  <-- Dexie.js
|  templateStore    |  Templates sauvegardes
+-------------------+
```

**3 routes** :
- `/` : Editeur complet (design + preview)
- `/operator` : Mode operateur live (controles simplifies)
- `/output` : Fenetre de sortie broadcast (canvas seul, capturable par OBS)

---

## 3. Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | React 19 + TypeScript strict |
| State | Zustand + Immer + Persist middleware |
| Styles editeur | Tailwind CSS 4 + `cn()` |
| Styles canvas | Inline styles (capturable en image) |
| Build | Vite 7 |
| Tests | Vitest + Testing Library + jest-dom |
| Persistance | IndexedDB via Dexie.js |
| Communication | BroadcastChannel API |
| Capture | html-to-image |
| Icones | Lucide React |

---

## 4. Structure des dossiers

```
src/
  app/          -> Point d'entree (App.tsx, routes, main)
  components/
    ui/         -> Composants UI reutilisables (SOURCE DE VERITE)
    editor/     -> Panneau editeur (28 sections)
    preview/    -> Zone de preview (ScoreboardCanvas, 14 body types)
    operator/   -> Mode operateur live
    output/     -> Fenetre de sortie broadcast
  hooks/        -> Hooks custom (useTimer, useScaling, useOutputSync...)
  stores/       -> Zustand stores (scoreboard, template, frame)
  types/        -> Interfaces TypeScript par domaine
  constants/    -> Labels, couleurs, polices, phases, body types
  utils/        -> Helpers (color, time, font, screenshot, image)
  api/          -> Frame Data API (export, recorder, delta)
  lib/          -> Utilitaires (cn())
  styles/       -> CSS (index, print)
  data/         -> Etat par defaut, donnees d'exemple
  test/         -> Setup des tests
```

---

## 5. Flux de donnees

### Modification d'etat

```
Composant editeur (ex: ColorSection)
  |
  |-- appelle useScoreboardStore().updateColor('bgTop', '#ff0000')
  |
  v
Zustand store (immer middleware)
  |
  |-- mutation immutable du state
  |-- persist middleware sauvegarde dans localStorage
  |
  v
React re-render
  |
  |-- ScoreboardCanvas re-rendu avec nouvelles couleurs
  |-- useOutputSyncSender() envoie le state via BroadcastChannel
  |
  v
OutputWindow recoit et affiche
```

### Timer (mode demo)

```
useTimer() hook (intervalle 100ms)
  |
  |-- appelle store.tickTimer()
  |
  v
tickTimerDraft() dans timerActions.ts
  |
  |-- decremente le temps de 0.1s
  |-- decremente les penalites
  |-- supprime les penalites expirees
  |-- avance a la phase suivante si temps = 0:00
```

---

## 6. Regles essentielles

### Interdictions absolues

- Pas de `any` (utiliser `unknown` pour les catch)
- Pas de `style={{}}` dans l'editeur (Tailwind uniquement)
- Pas d'imports relatifs profonds (`../../`) -> utiliser `@/`
- Pas de `localStorage` direct -> passer par Zustand persist
- Pas de modale from scratch -> utiliser `Modal` de `@/components/ui/`
- Pas de composant sans test
- Pas de strings hardcodees dans le JSX -> `src/constants/`
- Pas de couleurs hardcodees -> tokens du design system
- Pas de fichier > 300 lignes
- Pas plus de 5 `useState` par composant

### Obligations

- TypeScript `strict: true`
- Tests pour chaque composant, hook et helper
- Interface en francais avec accents
- Verifier `src/components/ui/` avant de creer un composant
- `npm run type-check && npm run lint && npm run test:run` avant chaque commit

---

## 7. Ajouter un body type

Checklist exhaustive. CHAQUE etape est obligatoire — un oubli provoque des erreurs de type, des tests en echec ou des fonctionnalites manquantes.

### A. Types et donnees

1. Creer `src/types/bodyTypes/xxx.ts` — interface des donnees + constante `DEFAULT_XXX_DATA`
2. Ajouter le nouveau numero a `BodyTypeId` dans `src/types/scoreboard.ts`
3. Ajouter le champ de donnees (`xxxData`) a l'interface `ScoreboardState` dans `src/types/scoreboard.ts`
4. Ajouter les signatures d'actions dans `src/types/storeActions.ts`
5. Ajouter `bodyScaleN` dans `src/types/fontSizes.ts` (interface `FontSizeConfig`, `FONT_SIZE_RANGES`, `DEFAULT_FONT_SIZES`)

### B. Store et etat

6. Ajouter l'etat par defaut (`xxxData: structuredClone(DEFAULT_XXX_DATA)`) dans `src/data/defaultState.ts`
7. Ajouter l'objet vide correspondant dans `src/data/cleanContent.ts`
8. Ajouter les actions immer dans `src/stores/scoreboardStore.ts` + bumper la version de migration
9. Ajouter le champ dans `selectState()` de `src/hooks/useOutputSync.ts` (synchronisation fenetre de sortie)

### C. Constantes et labels

10. Ajouter l'entree dans `src/constants/bodyTypes.ts` (registre des types)
11. Ajouter TOUS les labels dans `src/constants/labels.ts` (section editeur + noms d'echelle)
12. Ajouter l'entree dans `BODY_TYPE_NAMES` de `src/utils/specGenerator.ts`
13. Ajouter l'entree dans `BODY_SCALE_NAMES` de `src/components/editor/FontSizeSection.tsx`

### D. Composants de rendu et editeur

14. Creer `src/components/preview/body/BodyTypeN.tsx` (rendu inline styles)
15. Creer `src/components/editor/XxxSection.tsx` (Tailwind)
16. Ajouter le cas dans le switch de `ScoreboardCanvas.tsx` (`BodyRenderer`)
17. Ajouter le cas dans le switch de `src/components/editor/BodyContentSection.tsx`

### D-bis. Surcharges de style par element (RECOMMANDE)

Pour rendre le body type personnalisable par l'utilisateur au niveau de chaque element :

14b. Definir les roles d'elements du body type dans `src/types/elementStyleOverride.ts` (ex: `type MonTypeStyleRole = 'title' | 'value' | ...`)
14c. Ajouter `StyleOverrideMap<MonTypeStyleRole>` au type `XxxStyleOverrides`, et le champ `styleOverrides: XxxStyleOverrides` a l'interface de donnees du body type
14d. Definir les `ElementDefaults` (valeurs historiquement hardcodees) pour chaque role dans le composant de rendu
14e. Utiliser `resolveElementStyle(defaults, ctx, override)` au lieu de valeurs hardcodees dans le rendu
14f. Ajouter une action `updateXxxStyleOverride(role, override)` au store (`storeActions.ts` + `scoreboardStore.ts`)
14g. Integrer le `StyleOverridePanel` dans la section editeur avec la liste des roles
14h. Ajouter les labels des roles dans `src/constants/labels.ts` (prefixe `styleRoleXxx`)
14i. Mettre a jour `cleanContent.ts` et la migration du store pour inclure `styleOverrides: {}`

Fichiers de reference existants : `BodyType15.tsx`, `BodyType16.tsx`, `RefereesSection.tsx`

### E. Integration Layout libre (NE PAS OUBLIER)

18. Ajouter `'body-type-N'` a `FieldElementType` et `FieldElementConfig` dans `src/types/customField.ts`
19. Ajouter l'element de bibliotheque dans `src/constants/libraryElements.ts` (categorie `'composed'`)
20. Ajouter le cas dans le switch de `src/components/preview/body/FieldEmbeddedBodyType.tsx` (`EmbeddedBodyType`)

### F. Tests

21. Creer `src/components/preview/body/__tests__/BodyTypeN.test.tsx`
22. Creer `src/components/editor/__tests__/XxxSection.test.tsx`
23. Ajouter un test dans `src/components/preview/body/__tests__/FieldEmbeddedBodyType.test.tsx`
24. Verifier que `src/stores/__tests__/scoreboardStore.test.ts` reste compatible (champ dans `plainState` du test `loadState`)

### G. Documentation (NE PAS OUBLIER)

25. Mettre a jour `docs/manuel-utilisateur/04-body-types.md` (description du type, presets, options)
26. Mettre a jour `docs/manuel-utilisateur/03-layout-libre.md` (nombre d'elements, plage des types composes)
27. Mettre a jour `docs/manuel-utilisateur/03b-layout-elements.md` (section « Types d'affichage embarques », liste des types)
28. Mettre a jour `docs/CODEBASE_OVERVIEW.md` (tableau des body types, nombre de types, actions du store, version du store, plage du BodyRenderer)
29. Mettre a jour `docs/DOCUMENTATION_INDEX.md` si necessaire

### H. Verification finale (OBLIGATOIRE — NE JAMAIS SAUTER)

Apres avoir termine toutes les etapes ci-dessus, executer cette passe de controle AVANT le dernier commit. Chaque grep DOIT retourner au moins un resultat. Si un grep ne retourne rien, l'etape correspondante a ete oubliee.

Remplacer `N` par le numero du body type et `NomDuType` par son nom (ex: `Arbitres`, `Spectateurs`).

**30. Verification code** :

```bash
echo "=== VERIFICATION CODE ==="
echo "--- Types ---"
grep -n "BodyTypeN\|bodyTypeN\|body_type_N" src/types/scoreboard.ts
grep -n "BodyTypeN\|bodyTypeN" src/types/storeActions.ts
grep -n "bodyScaleN" src/types/fontSizes.ts
echo "--- Store et etat ---"
grep -n "xxxData\|NomDuType" src/data/defaultState.ts
grep -n "xxxData\|NomDuType" src/data/cleanContent.ts
grep -n "xxxData\|NomDuType" src/stores/scoreboardStore.ts
grep -n "xxxData\|NomDuType" src/hooks/useOutputSync.ts
echo "--- Constantes ---"
grep -n "NomDuType\|body-type-N" src/constants/bodyTypes.ts
grep -n "NomDuType" src/constants/labels.ts
grep -n "NomDuType" src/utils/specGenerator.ts
grep -n "NomDuType\|bodyScaleN" src/components/editor/FontSizeSection.tsx
echo "--- Composants ---"
grep -n "BodyTypeN\|case N:" src/components/preview/body/ScoreboardCanvas.tsx
grep -n "case N:" src/components/editor/BodyContentSection.tsx
```

**31. Verification Layout libre** :

```bash
echo "=== VERIFICATION LAYOUT LIBRE ==="
grep -n "body-type-N" src/types/customField.ts
grep -n "body-type-N\|NomDuType" src/constants/libraryElements.ts
grep -n "body-type-N\|BodyTypeN" src/components/preview/body/FieldEmbeddedBodyType.tsx
```

**32. Verification documentation** :

```bash
echo "=== VERIFICATION DOCUMENTATION ==="
grep -n "NomDuType\|Type N" docs/manuel-utilisateur/04-body-types.md
grep -n "NomDuType\|type N\|N)" docs/manuel-utilisateur/03-layout-libre.md
grep -n "NomDuType\|type N" docs/manuel-utilisateur/03b-layout-elements.md
grep -n "NomDuType\|BodyTypeN" docs/CODEBASE_OVERVIEW.md
grep -n "NomDuType" docs/DOCUMENTATION_INDEX.md
```

**33. Verification tests + build** :

```bash
npm run type-check && npm run lint && npm run test:run
```

> **REGLE** : si un seul grep de l'etape 30, 31 ou 32 ne retourne aucun resultat, CORRIGER l'oubli AVANT de commiter.

---

## 8. Ajouter un composant UI

1. Verifier que le composant n'existe pas deja dans `src/components/ui/`
2. Creer dans `src/components/ui/NouveauComposant.tsx`
3. Utiliser Tailwind CSS + `cn()` pour le style
4. Creer le fichier de test `__tests__/NouveauComposant.test.tsx`
5. Exporter le composant

---

## 9. Documentation de reference

- **Specification complete** : `docs/HOCKEY_SCOREBOARD_EDITOR_SPEC.md`
- **Design system** : `docs/DESIGN_SYSTEM_REFERENCE.md`
- **Vue d'ensemble** : `docs/CODEBASE_OVERVIEW.md`
- **Guide de style composants** : `docs/COMPONENT_STYLE_GUIDE.md`
- **Persistance** : `docs/DATA_PERSISTENCE_ARCHITECTURE.md`
- **Regles de dev** : `CLAUDE.md`
