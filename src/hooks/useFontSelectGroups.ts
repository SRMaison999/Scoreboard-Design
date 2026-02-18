import { useMemo } from 'react';
import { FONT_OPTIONS, FONT_CATEGORY_LABELS, FONT_CATEGORY_ORDER } from '@/constants/fonts';
import type { SelectOptionGroup } from '@/components/ui/Select';

/**
 * Construit les groupes de polices pour le composant Select.
 * Regroupe les polices par catégorie dans l'ordre défini.
 */
export function useFontSelectGroups(): readonly SelectOptionGroup[] {
  return useMemo(() =>
    FONT_CATEGORY_ORDER.map((cat) => ({
      label: FONT_CATEGORY_LABELS[cat],
      options: FONT_OPTIONS
        .filter((f) => f.category === cat)
        .map((f) => ({
          value: f.id,
          label: f.label,
          style: { fontFamily: f.family } as React.CSSProperties,
        })),
    })),
  []);
}
