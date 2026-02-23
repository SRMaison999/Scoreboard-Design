/**
 * Éditeur de configuration pour les blocs de texte (text-block).
 * Contrôles : contenu, police, taille, graisse, alignement, casse, couleur.
 */

import { useMemo } from 'react';
import { InputField } from '@/components/ui/InputField';
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

export function TextBlockEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'text-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);
  const fontGroups = useFontFamilyGroups();

  return (
    <div className="flex flex-col gap-2">
      <InputField
        label={CUSTOM_FIELD_LABELS.configTextContent}
        value={c.content}
        onChange={(v) => patch({ content: v })}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configTextFontSize}</label>
          <input
            type="number"
            min={8}
            max={200}
            value={c.fontSize}
            onChange={(e) => patch({ fontSize: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
        <Select
          label={CUSTOM_FIELD_LABELS.configTextFontWeight}
          value={String(c.fontWeight)}
          onChange={(v) => patch({ fontWeight: Number(v) })}
          options={[
            { value: '400', label: CUSTOM_FIELD_LABELS.fontWeightNormal },
            { value: '500', label: CUSTOM_FIELD_LABELS.fontWeightMedium },
            { value: '600', label: CUSTOM_FIELD_LABELS.fontWeightSemiBold },
            { value: '700', label: CUSTOM_FIELD_LABELS.fontWeightBold },
          ]}
        />
      </div>
      <Select
        label={CUSTOM_FIELD_LABELS.configFontFamily}
        value={c.fontFamily}
        onChange={(v) => patch({ fontFamily: v })}
        options={[]}
        groups={fontGroups}
        placeholder={CUSTOM_FIELD_LABELS.configFontFamilyGlobal}
      />
      <div className="grid grid-cols-2 gap-2">
        <Select
          label={CUSTOM_FIELD_LABELS.configTextAlign}
          value={c.textAlign}
          onChange={(v) => patch({ textAlign: v })}
          options={[
            { value: 'left', label: CUSTOM_FIELD_LABELS.configSideLeft },
            { value: 'center', label: 'Centre' },
            { value: 'right', label: CUSTOM_FIELD_LABELS.configSideRight },
          ]}
        />
        <Select
          label={CUSTOM_FIELD_LABELS.configTextTransform}
          value={c.textTransform}
          onChange={(v) => patch({ textTransform: v })}
          options={[
            { value: 'none', label: 'Aucune' },
            { value: 'uppercase', label: 'MAJUSCULES' },
            { value: 'lowercase', label: 'minuscules' },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configTextLetterSpacing}</label>
          <input
            type="number"
            min={0}
            max={20}
            value={c.letterSpacing}
            onChange={(e) => patch({ letterSpacing: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configTextColor}</label>
          <input
            type="color"
            value={c.textColor || '#ffffff'}
            onChange={(e) => patch({ textColor: e.target.value })}
            className="w-full h-7 bg-gray-800 border border-gray-700 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
