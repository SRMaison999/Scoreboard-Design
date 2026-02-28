/**
 * Sélecteur de police par champ, réutilisable pour tous les types textuels.
 * Affiche les polices groupées par catégorie. Chaîne vide = police globale.
 */

import { useMemo } from 'react';
import { Select } from '@/components/ui/Select';
import type { SelectOptionGroup } from '@/components/ui/Select';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { FONT_OPTIONS, FONT_CATEGORY_LABELS, FONT_CATEGORY_ORDER } from '@/constants/fonts';
import type { FieldElementConfig } from '@/types/customField';
import { updateFieldElementConfig } from '@/utils/fieldConfig';

function useFontFamilyGroups(): readonly SelectOptionGroup[] {
  return useMemo(() => {
    return FONT_CATEGORY_ORDER.map((cat) => ({
      label: FONT_CATEGORY_LABELS[cat],
      options: FONT_OPTIONS
        .filter((f) => f.category === cat)
        .map((f) => ({
          value: f.family,
          label: f.label,
          style: { fontFamily: f.family } as React.CSSProperties,
        })),
    }));
  }, []);
}

interface FontFamilyOverrideSelectProps {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}

export function FontFamilyOverrideSelect({ fieldId, element }: FontFamilyOverrideSelectProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const fontGroups = useFontFamilyGroups();
  const config = element.config as { fontFamily?: string };

  return (
    <Select
      label={CUSTOM_FIELD_LABELS.configFontFamily}
      value={config.fontFamily ?? ''}
      onChange={(v) => updateFieldElementConfig(updateElement, fieldId, element, { fontFamily: v })}
      options={[]}
      groups={fontGroups}
      placeholder={CUSTOM_FIELD_LABELS.configFontFamilyGlobal}
    />
  );
}
