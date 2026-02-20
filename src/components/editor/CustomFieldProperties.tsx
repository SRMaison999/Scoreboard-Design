/**
 * Panneau de proprietes pour un champ selectionne.
 * Permet de modifier position, taille, style, alignement et configuration.
 */

import {
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal,
  Ratio,
} from 'lucide-react';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { alignField } from '@/utils/fieldAlignment';
import { FieldElementConfigEditor } from './FieldElementConfigEditor';
import type { AlignmentAction } from '@/utils/fieldAlignment';

interface CustomFieldPropertiesProps {
  readonly fieldId: string;
}

export function CustomFieldProperties({ fieldId }: CustomFieldPropertiesProps) {
  const field = useScoreboardStore(
    (s) => s.customFieldsData.fields.find((f) => f.id === fieldId),
  );
  const updatePosition = useScoreboardStore((s) => s.updateCustomFieldPosition);
  const updateSize = useScoreboardStore((s) => s.updateCustomFieldSize);
  const updateProp = useScoreboardStore((s) => s.updateCustomFieldProp);
  const updateStyle = useScoreboardStore((s) => s.updateCustomFieldStyle);
  const duplicateField = useScoreboardStore((s) => s.duplicateCustomField);
  const removeField = useScoreboardStore((s) => s.removeCustomField);
  const resetScale = useScoreboardStore((s) => s.resetCustomFieldScale);
  const canvasW = useScoreboardStore((s) => s.templateWidth);
  const canvasH = useScoreboardStore((s) => s.templateHeight);

  if (!field) return null;

  const handleAlign = (action: AlignmentAction) => {
    const { x, y } = alignField(field, canvasW, canvasH, action);
    updatePosition(fieldId, x, y);
  };

  return (
    <div className="flex flex-col gap-2">
      <InputField
        label={CUSTOM_FIELD_LABELS.fieldLabel}
        value={field.label}
        onChange={(v) => updateProp(fieldId, 'label', v)}
      />

      {/* Alignement */}
      <div className="flex items-center gap-1 border-t border-gray-800 pt-1 mt-1">
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={() => handleAlign('align-left')} title={CUSTOM_FIELD_LABELS.alignLeft}>
          <AlignStartVertical size={14} className="flex-shrink-0" />
        </button>
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={() => handleAlign('align-center-h')} title={CUSTOM_FIELD_LABELS.alignCenterH}>
          <AlignCenterVertical size={14} className="flex-shrink-0" />
        </button>
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={() => handleAlign('align-right')} title={CUSTOM_FIELD_LABELS.alignRight}>
          <AlignEndVertical size={14} className="flex-shrink-0" />
        </button>
        <div className="w-px h-4 bg-gray-700 mx-1" />
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={() => handleAlign('align-top')} title={CUSTOM_FIELD_LABELS.alignTop}>
          <AlignStartHorizontal size={14} className="flex-shrink-0" />
        </button>
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={() => handleAlign('align-center-v')} title={CUSTOM_FIELD_LABELS.alignCenterV}>
          <AlignCenterHorizontal size={14} className="flex-shrink-0" />
        </button>
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={() => handleAlign('align-bottom')} title={CUSTOM_FIELD_LABELS.alignBottom}>
          <AlignEndHorizontal size={14} className="flex-shrink-0" />
        </button>
        <div className="w-px h-4 bg-gray-700 mx-1" />
        <button
          type="button"
          className={`p-1 flex-shrink-0 ${field.lockAspectRatio ? 'text-sky-300' : 'text-gray-400 hover:text-sky-300'}`}
          onClick={() => updateProp(fieldId, 'lockAspectRatio', !field.lockAspectRatio)}
          title={CUSTOM_FIELD_LABELS.fieldLockAspectRatio}
        >
          <Ratio size={14} className="flex-shrink-0" />
        </button>
      </div>

      <div className="text-[10px] text-gray-500 uppercase tracking-wider border-t border-gray-800 pt-1 mt-1">
        {CUSTOM_FIELD_LABELS.fieldPosition}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldX}</label>
          <input
            type="number"
            value={field.x}
            onChange={(e) => updatePosition(fieldId, Number(e.target.value), field.y)}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldY}</label>
          <input
            type="number"
            value={field.y}
            onChange={(e) => updatePosition(fieldId, field.x, Number(e.target.value))}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
      </div>

      <div className="text-[10px] text-gray-500 uppercase tracking-wider border-t border-gray-800 pt-1 mt-1">
        {CUSTOM_FIELD_LABELS.fieldSize}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldWidth}</label>
          <input
            type="number"
            value={field.width}
            onChange={(e) => updateSize(fieldId, Number(e.target.value), field.height)}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldHeight}</label>
          <input
            type="number"
            value={field.height}
            onChange={(e) => updateSize(fieldId, field.width, Number(e.target.value))}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-300">
          <input
            type="checkbox"
            checked={field.scaleContent}
            onChange={(e) => updateProp(fieldId, 'scaleContent', e.target.checked)}
            className="accent-sky-300"
          />
          {CUSTOM_FIELD_LABELS.fieldScaleContent}
        </label>
        {field.scaleContent && (
          <Button
            variant="ghost"
            className="text-[11px] px-2 py-0.5"
            onClick={() => resetScale(fieldId)}
          >
            {CUSTOM_FIELD_LABELS.fieldResetScale}
          </Button>
        )}
      </div>

      <div className="text-[10px] text-gray-500 uppercase tracking-wider border-t border-gray-800 pt-1 mt-1">
        {CUSTOM_FIELD_LABELS.fieldZIndex}
      </div>
      <input
        type="number"
        value={field.zIndex}
        onChange={(e) => updateProp(fieldId, 'zIndex', Number(e.target.value))}
        className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
      />

      <div className="text-[10px] text-gray-500 uppercase tracking-wider border-t border-gray-800 pt-1 mt-1">
        {CUSTOM_FIELD_LABELS.fieldStyleTitle}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBgColor}</label>
          <input
            type="color"
            value={field.style.backgroundColor || '#000000'}
            onChange={(e) => updateStyle(fieldId, { backgroundColor: e.target.value })}
            className="w-full h-6 bg-gray-800 border border-gray-700 rounded cursor-pointer"
          />
        </div>
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBorderColor}</label>
          <input
            type="color"
            value={field.style.borderColor || '#000000'}
            onChange={(e) => updateStyle(fieldId, { borderColor: e.target.value })}
            className="w-full h-6 bg-gray-800 border border-gray-700 rounded cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBgOpacity}</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={100}
            value={field.style.backgroundOpacity}
            onChange={(e) => updateStyle(fieldId, { backgroundOpacity: Number(e.target.value) })}
            className="flex-1 accent-sky-300"
          />
          <span className="text-[11px] text-gray-400 w-8 text-right">{field.style.backgroundOpacity}%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBorderWidth}</label>
          <input
            type="number"
            min={0}
            max={20}
            value={field.style.borderWidth}
            onChange={(e) => updateStyle(fieldId, { borderWidth: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBorderRadius}</label>
          <input
            type="number"
            min={0}
            max={100}
            value={field.style.borderRadius}
            onChange={(e) => updateStyle(fieldId, { borderRadius: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldPadding}</label>
          <input
            type="number"
            min={0}
            max={50}
            value={field.style.padding}
            onChange={(e) => updateStyle(fieldId, { padding: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
      </div>

      {/* Configuration specifique a l'element */}
      <div className="text-[10px] text-gray-500 uppercase tracking-wider border-t border-gray-800 pt-1 mt-1">
        {CUSTOM_FIELD_LABELS.elementTypeLabels[field.element.type] ?? field.element.type}
      </div>
      <FieldElementConfigEditor fieldId={fieldId} element={field.element} />

      <div className="flex gap-2 mt-2">
        <Button variant="ghost" onClick={() => duplicateField(fieldId)}>
          {CUSTOM_FIELD_LABELS.fieldDuplicate}
        </Button>
        <Button variant="danger" onClick={() => removeField(fieldId)}>
          {CUSTOM_FIELD_LABELS.fieldDelete}
        </Button>
      </div>
    </div>
  );
}
