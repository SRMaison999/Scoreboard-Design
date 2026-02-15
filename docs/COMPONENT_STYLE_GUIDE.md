# Guide de style des composants

Conventions, patterns et exemples pour le developpement de composants dans le Scoreboard Editor.

---

## 1. Principes generaux

### Separation canvas / editeur

| Zone | Methode de style | Raison |
|------|-----------------|--------|
| Canvas (preview, sortie) | Inline styles (`style={{}}`) | Capturable en image, styles dynamiques |
| Editeur (panneau lateral) | Tailwind CSS + `cn()` | Performance, maintenabilite |

### Composition

Chaque composant a une seule responsabilite. Un composant d'editeur ne fait pas de rendu de scoreboard, et vice versa.

### Taille maximale

- **300 lignes maximum** par fichier
- **5 `useState` maximum** par composant (au-dela, extraire dans un hook custom)

---

## 2. Structure d'un composant editeur

```typescript
// src/components/editor/ExempleSection.tsx

import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

export function ExempleSection() {
  const { champA, champB, update } = useScoreboardStore();

  return (
    <Section title={EDITOR_LABELS.sectionExemple}>
      <InputField
        label={EDITOR_LABELS.champALabel}
        value={champA}
        onChange={(v) => update('champA', v)}
      />
      <InputField
        label={EDITOR_LABELS.champBLabel}
        value={champB}
        onChange={(v) => update('champB', v)}
      />
    </Section>
  );
}
```

### Points cles

- Envelopper dans `<Section>` pour le panneau collapsible
- Labels depuis `EDITOR_LABELS` (jamais de strings en dur)
- Composants UI de `@/components/ui/` (Button, InputField, Select, ColorPicker, Modal)
- Acces au state via `useScoreboardStore()`
- Imports via `@/` (jamais de `../../`)

---

## 3. Structure d'un body type (preview)

```typescript
// src/components/preview/body/BodyTypeN.tsx

import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { FontId } from '@/types/fonts';
import type { ColorMap } from '@/types/colors';
import type { OpacityMap } from '@/types/colors';

interface BodyTypeNProps {
  readonly donnees: DonneesSpecifiques;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
}

export function BodyTypeN({
  donnees,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyTypeNProps) {
  const padding = showPenalties ? 180 : 80;

  return (
    <div
      style={{
        padding: `20px ${padding}px`,
        fontFamily: ff(fontBody),
        color: hexToRgba(colors.statVal, opacities.statVal),
      }}
    >
      {/* Rendu avec inline styles uniquement */}
    </div>
  );
}
```

### Points cles

- **Inline styles uniquement** (pas de Tailwind)
- Couleurs via `hexToRgba(colors.xxx, opacities.xxx)`
- Police via `ff(fontId)`
- Props en `readonly`
- Padding adaptatif selon `showPenalties`

---

## 4. Structure d'un hook custom

```typescript
// src/hooks/useExemple.ts

import { useEffect, useRef } from 'react';

export function useExemple(param: string): ResultatType {
  const ref = useRef<number | null>(null);

  useEffect(() => {
    // Logique
    return () => {
      // Nettoyage
    };
  }, [param]);

  return resultat;
}
```

### Points cles

- Un hook = une seule responsabilite
- Nettoyage dans le callback de retour de `useEffect`
- Types precis pour les parametres et le retour

---

## 5. Structure d'un test

```typescript
// src/components/editor/__tests__/ExempleSection.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExempleSection } from '../ExempleSection';

// Mock du store
vi.mock('@/stores/scoreboardStore', () => ({
  useScoreboardStore: vi.fn(() => ({
    champA: 'valeur A',
    champB: 'valeur B',
    update: vi.fn(),
  })),
}));

describe('ExempleSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('affiche les champs avec leurs valeurs', () => {
    render(<ExempleSection />);
    expect(screen.getByDisplayValue('valeur A')).toBeInTheDocument();
  });

  it('appelle update lors de la modification', async () => {
    const user = userEvent.setup();
    render(<ExempleSection />);

    const input = screen.getByDisplayValue('valeur A');
    await user.clear(input);
    await user.type(input, 'nouvelle valeur');

    // Verifier que update a ete appele
  });
});
```

### Points cles

- Placement dans `__tests__/` a cote du code source
- Tester le comportement visible (pas l'implementation interne)
- Mocker les stores Zustand via `vi.mock()`
- Cas nominaux ET cas limites
- `vi.clearAllMocks()` dans `beforeEach`

---

## 6. Utilisation des composants UI

### Button

```typescript
import { Button } from '@/components/ui/Button';

<Button variant="primary" onClick={handleSave}>
  {EDITOR_LABELS.sauvegarder}
</Button>

<Button variant="danger" onClick={handleDelete}>
  {EDITOR_LABELS.supprimer}
</Button>

<Button variant="ghost" onClick={handleCancel}>
  {EDITOR_LABELS.annuler}
</Button>

<Button variant="add" onClick={handleAdd}>
  {EDITOR_LABELS.ajouter}
</Button>
```

### Modal

```typescript
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>{EDITOR_LABELS.titreModale}</ModalHeader>
  <ModalBody>
    {/* Contenu du formulaire */}
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      {EDITOR_LABELS.annuler}
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      {EDITOR_LABELS.confirmer}
    </Button>
  </ModalFooter>
</Modal>
```

### Section

```typescript
import { Section } from '@/components/ui/Section';

<Section title={EDITOR_LABELS.titreSection} defaultOpen={true}>
  {/* Contenu de la section */}
</Section>
```

### ColorPicker

```typescript
import { ColorPicker } from '@/components/ui/ColorPicker';

<ColorPicker
  label={EDITOR_LABELS.couleurFond}
  value={colors.bgTop}
  onChange={(v) => updateColor('bgTop', v)}
  opacity={opacities.bgTop}
  onOpacityChange={(v) => updateOpacity('bgTop', v)}
/>
```

### Select

```typescript
import { Select } from '@/components/ui/Select';

<Select
  label={EDITOR_LABELS.policeEquipes}
  options={fontOptions}
  value={fontTeams}
  onChange={(v) => update('fontTeams', v)}
/>
```

### ImageUpload

```typescript
import { ImageUpload } from '@/components/ui/ImageUpload';

<ImageUpload
  label={EDITOR_LABELS.photoJoueur}
  value={photoUrl}
  onUpload={(dataUrl) => handleUpload(dataUrl)}
  onRemove={() => handleRemove()}
/>
```

---

## 7. Icones Lucide React

```typescript
import { Camera, Save, Trash2 } from 'lucide-react';

// Toujours ajouter flex-shrink-0
<Camera size={14} className="flex-shrink-0" />

// Dans un bouton avec texte
<Button variant="primary" onClick={handleCapture}>
  <Camera size={14} className="flex-shrink-0" />
  {EDITOR_LABELS.screenshot}
</Button>
```

---

## 8. Gestion des classes conditionnelles

Toujours utiliser `cn()` de `@/lib/utils` :

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'px-3 py-2 rounded-md',
  isActive && 'bg-sky-950 border-sky-400',
  !isActive && 'bg-gray-800 border-gray-700',
  disabled && 'opacity-50 cursor-not-allowed'
)}>
```

---

## 9. Checklist de creation

Avant de creer un nouveau composant :

- [ ] Verifier qu'il n'existe pas deja dans `src/components/ui/` ou `src/components/common/`
- [ ] Types precis (pas de `any`)
- [ ] Props en `readonly`
- [ ] Labels dans `src/constants/labels.ts`
- [ ] Fichier < 300 lignes
- [ ] < 5 `useState` (sinon hook custom)
- [ ] Fichier de test associe
- [ ] Imports via `@/`
- [ ] Tailwind pour l'editeur, inline pour le canvas
- [ ] Composants UI de `src/components/ui/` utilises
