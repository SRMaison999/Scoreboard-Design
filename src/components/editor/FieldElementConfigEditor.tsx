/**
 * Éditeur de configuration spécifique par type d'élément.
 * Affiche les contrôles adaptés au type du champ sélectionné.
 */

import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';

interface FieldElementConfigEditorProps {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}

function updateConfig(
  updateElement: (id: string, el: FieldElementConfig) => void,
  fieldId: string,
  element: FieldElementConfig,
  patch: Record<string, unknown>,
) {
  const newConfig = { ...element.config, ...patch };
  updateElement(fieldId, { ...element, config: newConfig } as FieldElementConfig);
}

function TextBlockEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'text-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateConfig(updateElement, fieldId, element, p);

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
      onChange={(v) => updateConfig(updateElement, fieldId, element, { side: v })}
      options={[
        { value: 'left', label: CUSTOM_FIELD_LABELS.configSideLeft },
        { value: 'right', label: CUSTOM_FIELD_LABELS.configSideRight },
      ]}
    />
  );
}

function ShapeEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'shape-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateConfig(updateElement, fieldId, element, p);

  return (
    <div className="flex flex-col gap-2">
      <Select
        label={CUSTOM_FIELD_LABELS.configShapeType}
        value={c.shape}
        onChange={(v) => patch({ shape: v })}
        options={[
          { value: 'rectangle', label: CUSTOM_FIELD_LABELS.configShapeRectangle },
          { value: 'circle', label: CUSTOM_FIELD_LABELS.configShapeCircle },
          { value: 'rounded-rect', label: CUSTOM_FIELD_LABELS.configShapeRounded },
        ]}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configShapeFillColor}</label>
          <input
            type="color"
            value={c.fillColor || '#ffffff'}
            onChange={(e) => patch({ fillColor: e.target.value })}
            className="w-full h-6 bg-gray-800 border border-gray-700 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configShapeBorderColor}</label>
          <input
            type="color"
            value={c.borderColor || '#ffffff'}
            onChange={(e) => patch({ borderColor: e.target.value })}
            className="w-full h-6 bg-gray-800 border border-gray-700 rounded cursor-pointer"
          />
        </div>
      </div>
      {c.shape === 'rounded-rect' && (
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBorderRadius}</label>
          <input
            type="number"
            min={0}
            max={100}
            value={c.borderRadius}
            onChange={(e) => patch({ borderRadius: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
      )}
    </div>
  );
}

function SeparatorEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'separator-line' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateConfig(updateElement, fieldId, element, p);

  return (
    <div className="flex flex-col gap-2">
      <Select
        label={CUSTOM_FIELD_LABELS.configSeparatorOrientation}
        value={c.orientation}
        onChange={(v) => patch({ orientation: v })}
        options={[
          { value: 'horizontal', label: CUSTOM_FIELD_LABELS.configSeparatorHorizontal },
          { value: 'vertical', label: CUSTOM_FIELD_LABELS.configSeparatorVertical },
        ]}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configSeparatorThickness}</label>
          <input
            type="number"
            min={1}
            max={20}
            value={c.thickness}
            onChange={(e) => patch({ thickness: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configSeparatorColor}</label>
          <input
            type="color"
            value={c.lineColor || '#ffffff'}
            onChange={(e) => patch({ lineColor: e.target.value })}
            className="w-full h-6 bg-gray-800 border border-gray-700 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

function ImageEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'image-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateConfig(updateElement, fieldId, element, p);

  return (
    <div className="flex flex-col gap-2">
      <InputField
        label={CUSTOM_FIELD_LABELS.configImageSrc}
        value={c.src}
        onChange={(v) => patch({ src: v })}
      />
      <Select
        label={CUSTOM_FIELD_LABELS.configImageFit}
        value={c.objectFit}
        onChange={(v) => patch({ objectFit: v })}
        options={[
          { value: 'cover', label: CUSTOM_FIELD_LABELS.configImageCover },
          { value: 'contain', label: CUSTOM_FIELD_LABELS.configImageContain },
          { value: 'fill', label: CUSTOM_FIELD_LABELS.configImageFill },
        ]}
      />
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
