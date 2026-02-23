/**
 * Sous-éditeurs visuels pour les types d'éléments forme, séparateur et image.
 * Extraits de FieldElementConfigEditor pour respecter la limite de 300 lignes.
 */

import { useRef, useCallback, useState, type DragEvent } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';
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
  const [dragging, setDragging] = useState(false);
  const hasImage = c.src.length > 0;

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateFieldElementConfig(updateElement, fieldId, element, { src: reader.result });
      }
    };
    reader.readAsDataURL(file);
  }, [updateElement, fieldId, element]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    if (fileRef.current) fileRef.current.value = '';
  }, [processFile]);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {hasImage ? (
        <div className="relative group" data-testid="image-preview">
          <div className="w-full h-24 rounded-lg border border-gray-700 overflow-hidden bg-gray-900">
            <img src={c.src} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="absolute inset-0 rounded-lg bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              className="p-1.5 rounded-md bg-gray-800 text-gray-300 hover:text-sky-300 hover:bg-gray-700 transition-colors"
              onClick={() => fileRef.current?.click()}
              title={CUSTOM_FIELD_LABELS.configImageBrowse}
            >
              <Upload size={14} className="flex-shrink-0" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-md bg-gray-800 text-gray-300 hover:text-red-400 hover:bg-gray-700 transition-colors"
              onClick={() => patch({ src: '' })}
              title={CUSTOM_FIELD_LABELS.configImageRemove}
              data-testid="image-remove-btn"
            >
              <X size={14} className="flex-shrink-0" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragging(false)}
          onClick={() => fileRef.current?.click()}
          data-testid="image-dropzone"
          className={cn(
            'flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed p-4 cursor-pointer transition-colors',
            dragging
              ? 'border-sky-400 bg-sky-950/30'
              : 'border-gray-700 hover:border-gray-500 bg-gray-900/50',
          )}
        >
          <ImageIcon size={20} className={cn('flex-shrink-0', dragging ? 'text-sky-400' : 'text-gray-500')} />
          <span className="text-xs text-gray-400">{CUSTOM_FIELD_LABELS.configImageDropHint}</span>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        data-testid="image-file-input"
      />
      <InputField
        label={CUSTOM_FIELD_LABELS.configImageSrc}
        value={c.src.startsWith('data:') ? '' : c.src}
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
