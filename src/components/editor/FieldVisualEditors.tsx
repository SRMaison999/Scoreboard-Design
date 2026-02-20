/**
 * Sous-éditeurs visuels pour les types d'éléments forme, séparateur et image.
 * Extraits de FieldElementConfigEditor pour respecter la limite de 300 lignes.
 */

import { useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { updateFieldElementConfig } from '@/utils/fieldConfig';
import type { FieldElementConfig } from '@/types/customField';

export function ShapeEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'shape-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

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

export function SeparatorEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'separator-line' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

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

export function ImageEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'image-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateFieldElementConfig(updateElement, fieldId, element, { src: reader.result });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [updateElement, fieldId, element]);

  return (
    <div className="flex flex-col gap-2">
      <InputField
        label={CUSTOM_FIELD_LABELS.configImageSrc}
        value={c.src.startsWith('data:') ? '(fichier local)' : c.src}
        onChange={(v) => patch({ src: v })}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
        data-testid="image-file-input"
      />
      <Button
        variant="ghost"
        className="flex items-center gap-2 w-full justify-start"
        onClick={() => fileRef.current?.click()}
      >
        <Upload size={14} className="flex-shrink-0" />
        {CUSTOM_FIELD_LABELS.configImageBrowse}
      </Button>
      {c.src.startsWith('data:') && (
        <div className="w-full h-16 rounded border border-gray-700 overflow-hidden">
          <img src={c.src} alt="" className="w-full h-full object-contain" />
        </div>
      )}
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
