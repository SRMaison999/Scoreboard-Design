/**
 * Éditeur de configuration spécifique par type d'élément.
 * Affiche les contrôles adaptés au type du champ sélectionné.
 */

import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';
import { updateFieldElementConfig } from '@/utils/fieldConfig';
import { ShapeEditor, SeparatorEditor, ImageEditor } from './FieldVisualEditors';

interface FieldElementConfigEditorProps {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}

function TextBlockEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'text-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

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
            { value: '400', label: 'Normal' },
            { value: '500', label: 'Medium' },
            { value: '600', label: 'Semi-bold' },
            { value: '700', label: 'Bold' },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Select
          label={CUSTOM_FIELD_LABELS.configTextAlign}
          value={c.textAlign}
          onChange={(v) => patch({ textAlign: v })}
          options={[
            { value: 'left', label: 'Gauche' },
            { value: 'center', label: 'Centre' },
            { value: 'right', label: 'Droite' },
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
      <div>
        <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configSeparatorThickness}</label>
        <input
          type="number"
          min={0}
          max={20}
          value={c.letterSpacing}
          onChange={(e) => patch({ letterSpacing: Number(e.target.value) })}
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
        />
      </div>
    </div>
  );
}

function SideSelector({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const config = element.config as { side: string };

  return (
    <Select
      label={CUSTOM_FIELD_LABELS.configSide}
      value={config.side}
      onChange={(v) => updateFieldElementConfig(updateElement, fieldId, element, { side: v })}
      options={[
        { value: 'left', label: CUSTOM_FIELD_LABELS.configSideLeft },
        { value: 'right', label: CUSTOM_FIELD_LABELS.configSideRight },
      ]}
    />
  );
}

function HeaderBlockEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'header-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;

  return (
    <label className="flex items-center gap-2 text-[12px] text-gray-300">
      <input
        type="checkbox"
        checked={c.showClock}
        onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { showClock: e.target.checked })}
      />
      {CUSTOM_FIELD_LABELS.configShowClock}
    </label>
  );
}

function ClockDisplayEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'clock-display' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input
          type="checkbox"
          checked={c.showPeriod}
          onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { showPeriod: e.target.checked })}
        />
        {CUSTOM_FIELD_LABELS.configShowPeriod}
      </label>
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input
          type="checkbox"
          checked={c.showBox}
          onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { showBox: e.target.checked })}
        />
        {CUSTOM_FIELD_LABELS.configShowBox}
      </label>
    </div>
  );
}

export function FieldElementConfigEditor({ fieldId, element }: FieldElementConfigEditorProps) {
  switch (element.type) {
    case 'text-block':
      return <TextBlockEditor fieldId={fieldId} element={element} />;
    case 'score-display':
    case 'team-name':
    case 'flag-display':
    case 'penalty-column':
      return <SideSelector fieldId={fieldId} element={element} />;
    case 'header-block':
      return <HeaderBlockEditor fieldId={fieldId} element={element} />;
    case 'clock-display':
      return <ClockDisplayEditor fieldId={fieldId} element={element} />;
    case 'shape-block':
      return <ShapeEditor fieldId={fieldId} element={element} />;
    case 'separator-line':
      return <SeparatorEditor fieldId={fieldId} element={element} />;
    case 'image-block':
      return <ImageEditor fieldId={fieldId} element={element} />;
    default:
      return null;
  }
}
