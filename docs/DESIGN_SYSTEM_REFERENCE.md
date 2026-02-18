# Design System Reference

Reference complete des tokens visuels, couleurs, polices et composants UI du Scoreboard Editor.

---

## 1. Couleurs du scoreboard (canvas)

### Palette par defaut (`DEFAULT_COLORS`)

Definie dans `src/constants/colors.ts`.

| Token | Hex | Usage |
|-------|-----|-------|
| `bgTop` | `#0b2550` | Degradee fond haut |
| `bgMid` | `#1565c0` | Degradee fond milieu |
| `bgBot` | `#0a2d65` | Degradee fond bas |
| `teamName` | `#ffffff` | Noms d'equipes |
| `score` | `#ffffff` | Scores |
| `scoreBox` | *(vide)* | Fond du cadre score |
| `time` | `#ffffff` | Horloge |
| `clockBox` | `#cc0000` | Fond du cadre horloge |
| `period` | `#ffffff` | Nom de la periode |
| `titleText` | `#ffffff` | Texte des titres |
| `statVal` | `#ffffff` | Valeurs statistiques |
| `statLabel` | `#ffffff` | Labels statistiques |
| `penaltyTime` | `#ff5252` | Temps de penalite |
| `penaltyNumber` | `#ffffff` | Numero de penalite |

### Opacites

Chaque couleur possede un slider d'opacite (0-100). La valeur par defaut est `0` (opaque). La valeur `100` rend l'element entierement transparent.

Conversion : `hexToRgba(hex, opacity)` dans `src/utils/color.ts`.

### Presets de couleurs

5 presets predefinis dans `src/constants/colors.ts` :

| Preset | Description | Couleurs cles |
|--------|-------------|---------------|
| **OMEGA Blue** | Theme bleu hockey (defaut) | bgTop `#0b2550`, bgMid `#1565c0`, clockBox `#cc0000` |
| **Dark Mode** | Fond noir avec accents cyan | bgTop `#0a0a0a`, bgMid `#1a1a2e`, score `#00e5ff` |
| **Ice White** | Tons bleu clair, texte fonce | bgTop `#e3f2fd`, bgMid `#bbdefb`, teamName `#0d47a1` |
| **Hockey Red** | Rouge profond | bgTop `#4a0000`, bgMid `#b71c1c`, penaltyTime `#ffcdd2` |
| **Arena Green** | Vert stade avec accents neon | bgTop `#003300`, bgMid `#1b5e20`, score `#69f0ae` |

---

## 2. Couleurs de l'editeur (Tailwind)

L'editeur utilise un theme sombre base sur les tokens Tailwind.

### Fond et surfaces

| Classe Tailwind | Usage |
|-----------------|-------|
| `bg-gray-950` | Fond principal de l'editeur |
| `bg-gray-900` | Panneaux, modales |
| `bg-gray-800` | Champs de formulaire, inputs |
| `bg-black/60` | Backdrop des modales |

### Texte

| Classe Tailwind | Usage |
|-----------------|-------|
| `text-gray-100` | Texte principal (haute lisibilite) |
| `text-gray-300` | Texte secondaire |
| `text-gray-400` | Labels de formulaire |
| `text-gray-500` | Texte tertiaire, titres de sections |
| `text-gray-600` | Texte desactive, indicateurs |

### Bordures

| Classe Tailwind | Usage |
|-----------------|-------|
| `border-gray-700` | Bordures d'inputs, separateurs |
| `border-gray-800` | Separateurs de sections |

### Accents

| Classe Tailwind | Usage |
|-----------------|-------|
| `bg-green-900` | Bouton principal (action positive) |
| `bg-red-900` | Bouton danger (suppression) |
| `text-red-300` | Texte danger |
| `text-red-400` | Liens de suppression |
| `bg-blue-950` | Bouton ajout |
| `border-blue-600` | Bordure bouton ajout |
| `text-blue-300` | Texte bouton ajout |
| `bg-sky-950` | Fond accent secondaire |
| `border-sky-400` | Bordure accent secondaire, zone de drop active |
| `text-sky-300` | Titre de l'application |
| `accent-sky-300` | Accent des sliders (`<input type="range">`) |

---

## 3. Polices

### Polices du scoreboard (25 polices)

Definies dans `src/constants/fonts.ts`. Chargees via Google Fonts. Organisees en 6 categories.

**Sport / Impact** :

| ID | Label | Famille CSS |
|----|-------|-------------|
| `oswald` | Oswald | `'Oswald', sans-serif` |
| `bebas` | Bebas Neue | `'Bebas Neue', sans-serif` |
| `anton` | Anton | `'Anton', sans-serif` |
| `russo` | Russo One | `'Russo One', sans-serif` |
| `archivo-black` | Archivo Black | `'Archivo Black', sans-serif` |
| `black-ops-one` | Black Ops One | `'Black Ops One', sans-serif` |
| `bungee` | Bungee | `'Bungee', sans-serif` |

**Condensed** :

| ID | Label | Famille CSS |
|----|-------|-------------|
| `barlow` | Barlow Condensed | `'Barlow Condensed', sans-serif` |
| `saira` | Saira Condensed | `'Saira Condensed', sans-serif` |
| `roboto-condensed` | Roboto Condensed | `'Roboto Condensed', sans-serif` |
| `fjalla-one` | Fjalla One | `'Fjalla One', sans-serif` |
| `teko` | Teko | `'Teko', sans-serif` |

**Modernes** :

| ID | Label | Famille CSS |
|----|-------|-------------|
| `montserrat` | Montserrat | `'Montserrat', sans-serif` |
| `inter` | Inter | `'Inter', sans-serif` |
| `poppins` | Poppins | `'Poppins', sans-serif` |
| `rajdhani` | Rajdhani | `'Rajdhani', sans-serif` |
| `chakra` | Chakra Petch | `'Chakra Petch', sans-serif` |

**Display** :

| ID | Label | Famille CSS |
|----|-------|-------------|
| `righteous` | Righteous | `'Righteous', sans-serif` |
| `audiowide` | Audiowide | `'Audiowide', sans-serif` |
| `exo2` | Exo 2 | `'Exo 2', sans-serif` |
| `orbitron` | Orbitron | `'Orbitron', sans-serif` |

**Monospace** :

| ID | Label | Famille CSS |
|----|-------|-------------|
| `share-tech-mono` | Share Tech Mono | `'Share Tech Mono', monospace` |
| `jetbrains-mono` | JetBrains Mono | `'JetBrains Mono', monospace` |

**Serif** :

| ID | Label | Famille CSS |
|----|-------|-------------|
| `playfair` | Playfair Display | `'Playfair Display', serif` |
| `bitter` | Bitter | `'Bitter', serif` |

Graisses disponibles : 400, 500, 600, 700 (variable selon la police).

Les categories sont definies dans `FONT_CATEGORY_LABELS` et l'ordre d'affichage dans `FONT_CATEGORY_ORDER`. Le selecteur de polices dans l'editeur utilise des `<optgroup>` pour regrouper par categorie.

Trois zones de police independantes :

| Zone | Cle | Usage | Defaut |
|------|-----|-------|--------|
| Equipes | `fontTeams` | Noms d'equipes, scores | Oswald |
| Horloge | `fontClock` | Horloge, periode | Barlow Condensed |
| Corps | `fontBody` | Titres, stats, penalites | Barlow Condensed |

Utilitaire de resolution : `ff(fontId)` dans `src/utils/font.ts`.

### Tailles de police automatiques (FONT_SIZES)

Definies dans `src/constants/fontSizes.ts`. Basees sur le nombre de lignes de stats :

| Lignes | Taille valeur (px) | Taille label (px) |
|--------|--------------------|--------------------|
| 1 | 108 | 32 |
| 2 | 108 | 32 |
| 3 | 86 | 30 |
| 4 | 76 | 28 |
| 5 | 65 | 27 |
| 6 | 60 | 26 |
| 7 | 54 | 24 |
| 8 | 48 | 24 |

### Tailles de police de l'editeur

| Classe Tailwind | Taille | Usage |
|-----------------|--------|-------|
| `text-[10px]` | 10px | Indicateurs, labels tres petits |
| `text-[11px]` | 11px | Labels de formulaire |
| `text-xs` | 12px | Boutons secondaires |
| `text-sm` | 14px | Texte d'input, boutons |
| `text-lg` | 18px | Titres de modales |

---

## 4. Espacement

### Echelle utilisee

| Token | Valeur | Usage typique |
|-------|--------|---------------|
| `gap-0` | 0px | Sections fermees |
| `gap-1` | 4px | Espacement minimal |
| `gap-1.5` | 6px | Espacement entre champs |
| `gap-2` | 8px | Espacement standard |
| `px-1.5` | 6px | Padding horizontal input hex |
| `px-2.5` | 10px | Padding horizontal inputs |
| `px-3` | 12px | Padding horizontal boutons |
| `px-6` | 24px | Padding horizontal modales |
| `py-0.5` | 2px | Padding vertical compact |
| `py-1` | 4px | Padding vertical petit |
| `py-1.5` | 6px | Padding vertical standard |
| `py-4` | 16px | Padding vertical modales |
| `p-2` | 8px | Padding uniforme |

### Dimensions fixes

| Classe | Valeur | Usage |
|--------|--------|-------|
| `w-7 h-7` | 28px | Swatch du color picker |
| `w-10 h-10` | 40px | Apercu image upload |
| `w-[72px]` | 72px | Input hex couleur |
| `max-w-lg` | 512px | Largeur max modale |

---

## 5. Composants UI (`src/components/ui/`)

Source de verite unique pour les composants d'interface de l'editeur.

### Button

4 variantes :

| Variante | Classes | Usage |
|----------|---------|-------|
| `primary` | `bg-green-900 text-white font-bold` | Action principale |
| `danger` | `bg-red-900 text-red-300` | Suppression |
| `ghost` | `bg-gray-800 border border-gray-700 text-gray-400` | Action secondaire |
| `add` | `bg-blue-950 border border-blue-600 text-blue-300 w-full` | Ajout d'element |

Base commune : `rounded-md px-3 py-1.5 cursor-pointer text-sm`.

### Modal

Sous-composants : `Modal`, `ModalHeader`, `ModalBody`, `ModalFooter`.

| Element | Classes |
|---------|---------|
| Backdrop | `fixed inset-0 z-50 bg-black/60` |
| Container | `bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-w-lg` |
| Header | `px-6 py-4 border-b border-gray-700` |
| Body | `px-6 py-4` |
| Footer | `px-6 py-3 border-t border-gray-700 flex justify-end gap-2` |

Fermeture via Echap ou clic exterieur. Attributs ARIA inclus.

### Section

Panneau collapsible avec indicateur de fleche.

| Element | Classes |
|---------|---------|
| Titre | `text-xs font-bold text-gray-500 uppercase tracking-widest` |
| Indicateur | `text-[10px] text-gray-600` (v ou >) |

### ColorPicker

Input couleur HTML5 + input hex + slider opacite optionnel.

### InputField

Input texte avec label.

| Element | Classes |
|---------|---------|
| Label | `text-[11px] text-gray-400 font-medium` |
| Input | `bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm` |

### Select

Dropdown avec label optionnel. Meme style que InputField.

### ImageUpload

Zone de drag-and-drop avec apercu circulaire. Gere PNG, JPEG, WebP.

### SectionGroupLabel

Separateur de groupe de sections : `text-[10px] font-semibold text-gray-600 uppercase tracking-wider`.

---

## 6. Icones

Bibliotheque : **Lucide React** (`lucide-react`).

### Regles d'utilisation

- Import nomme : `import { Camera } from 'lucide-react'`
- Toujours ajouter `className="flex-shrink-0"` pour eviter l'ecrasement en flex
- Taille standard : `size={14}` (barre d'outils), `size={24}` (defaut)

### Icones utilisees

| Icone | Usage |
|-------|-------|
| `Camera` | Bouton screenshot |
| `Printer` | Bouton impression |
| `Radio` | Bouton mode operateur |
| `Save` | Sauvegarder template |
| `FolderOpen` | Charger template |
| `Download` | Exporter |
| `Upload` | Importer |
| `Copy` | Dupliquer |
| `Trash2` | Supprimer |
| `Pencil` | Renommer |

---

## 7. Utilitaire `cn()`

Defini dans `src/lib/utils.ts`.

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

Combine des classes Tailwind de maniere conditionnelle en resolvant les conflits. Toujours utiliser `cn()` au lieu de concatenation manuelle.

---

## 8. Regles de style

### Canvas (preview/sortie)

- **Inline styles uniquement** (`style={{}}`)
- Couleurs via le state (jamais hardcodees)
- Tailles en pixels absolus (base 1920x1080)
- Polices via `ff(fontId)` pour la resolution de famille

### Editeur (panneau lateral)

- **Tailwind CSS uniquement** (jamais de `style={{}}`)
- Classes conditionnelles via `cn()`
- Couleurs via tokens Tailwind (jamais de hex en dur)
- Composants UI de `src/components/ui/` obligatoires

### Textes

- Tous les labels dans `src/constants/labels.ts`
- Interface en francais avec accents corrects
- Jamais de strings hardcodees dans le JSX
