/**
 * Panneau de propri\u00e9t\u00e9s pour un champ s\u00e9lectionn\u00e9.
 * Sections repliables pour position, taille, ordre, rotation, style et configuration.
 * Boutons d'action pour l'ordre d'affichage au lieu d'un champ z-index num\u00e9rique.
 */

import {
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal,
  Ratio, RotateCcw,
  ChevronsUp, ChevronUp, ChevronDown, ChevronsDown,
} from 'lucide-react';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { alignField } from '@/utils/fieldAlignment';
import { FieldElementConfigEditor } from './FieldElementConfigEditor';
import { FieldEffectsEditor } from './FieldEffectsEditor';
import type { AlignmentAction } from '@/utils/fieldAlignment';

interface CustomFieldPropertiesProps {
  readonly fieldId: string;
}

export function CustomFieldProperties({ fieldId }: CustomFieldPropertiesProps) {
  const field = useScoreboardStore(
    (s) => s.customFieldsData.fields.find((f) => f.id === fieldId),
  );
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const updatePosition = useScoreboardStore((s) => s.updateCustomFieldPosition);
  const updateSize = useScoreboardStore((s) => s.updateCustomFieldSize);
  const updateProp = useScoreboardStore((s) => s.updateCustomFieldProp);
  const updateStyle = useScoreboardStore((s) => s.updateCustomFieldStyle);
  const duplicateField = useScoreboardStore((s) => s.duplicateCustomField);
  const removeField = useScoreboardStore((s) => s.removeCustomField);
  const resetScale = useScoreboardStore((s) => s.resetCustomFieldScale);
  const reorderField = useScoreboardStore((s) => s.reorderCustomField);
  const canvasW = useScoreboardStore((s) => s.templateWidth);
  const canvasH = useScoreboardStore((s) => s.templateHeight);

  if (!field) return null;

  const handleAlign = (action: AlignmentAction) => {
    const { x, y } = alignField(field, canvasW, canvasH, action);
    updatePosition(fieldId, x, y);
  };

  const maxZ = fields.reduce((max, f) => Math.max(max, f.zIndex), 0);
  const minZ = fields.reduce((min, f) => Math.min(min, f.zIndex), Infinity);

  const handleBringToFront = () => reorderField(fieldId, maxZ + 1);
  const handleBringForward = () => reorderField(fieldId, field.zIndex + 1);
  const handleSendBackward = () => reorderField(fieldId, Math.max(0, field.zIndex - 1));
  const handleSendToBack = () => reorderField(fieldId, Math.max(0, minZ - 1));

  return (
    <div className="flex flex-col gap-1">
      <InputField
        label={CUSTOM_FIELD_LABELS.fieldLabel}
        value={field.label}
        onChange={(v) => updateProp(fieldId, 'label', v)}
      />

      {/* Alignement + verrouillage proportions */}
      <div className="flex items-center gap-1 pt-1">
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

      {/* Position et taille */}
      <Section title={CUSTOM_FIELD_LABELS.fieldPosition} defaultOpen>
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
          <Button variant="ghost" className="text-[11px] px-2 py-0.5" onClick={() => resetScale(fieldId)}>
            {CUSTOM_FIELD_LABELS.fieldResetScale}
          </Button>
        )}
      </Section>

      {/* Ordre d'affichage + rotation */}
      <Section title={CUSTOM_FIELD_LABELS.zIndexOrderTitle} defaultOpen>
        <div className="flex items-center gap-1" data-testid="z-index-buttons">
          <button type="button" className="p-1 hover:text-sky-300 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed" onClick={handleBringToFront} disabled={field.zIndex >= maxZ} title={CUSTOM_FIELD_LABELS.zIndexBringToFront}>
            <ChevronsUp size={14} className="flex-shrink-0" />
          </button>
          <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={handleBringForward} title={CUSTOM_FIELD_LABELS.zIndexBringForward}>
            <ChevronUp size={14} className="flex-shrink-0" />
          </button>
          <button type="button" className="p-1 hover:text-sky-300 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed" onClick={handleSendBackward} disabled={field.zIndex <= 0} title={CUSTOM_FIELD_LABELS.zIndexSendBackward}>
            <ChevronDown size={14} className="flex-shrink-0" />
          </button>
          <button type="button" className="p-1 hover:text-sky-300 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed" onClick={handleSendToBack} disabled={field.zIndex <= minZ} title={CUSTOM_FIELD_LABELS.zIndexSendToBack}>
            <ChevronsDown size={14} className="flex-shrink-0" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            data-testid="rotation-input"
            min={-360}
            max={360}
            step={1}
            value={field.rotation}
            onChange={(e) => updateProp(fieldId, 'rotation', Number(e.target.value))}
            className="flex-1 bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
          <span className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldRotationUnit}</span>
          {field.rotation !== 0 && (
            <button
              type="button"
              data-testid="rotation-reset"
              className="p-1 text-gray-400 hover:text-sky-300"
              onClick={() => updateProp(fieldId, 'rotation', 0)}
              title={CUSTOM_FIELD_LABELS.fieldRotationReset}
            >
              <RotateCcw size={14} className="flex-shrink-0" />
            </button>
          )}
        </div>
      </Section>

      {/* Style visuel */}
      <Section title={CUSTOM_FIELD_LABELS.fieldStyleTitle} defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBgColor}</label>
            <input type="color" value={field.style.backgroundColor || '#000000'} onChange={(e) => updateStyle(fieldId, { backgroundColor: e.target.value })} className="w-full h-6 bg-gray-800 border border-gray-700 rounded cursor-pointer" />
          </div>
          <div>
            <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBorderColor}</label>
            <input type="color" value={field.style.borderColor || '#000000'} onChange={(e) => updateStyle(fieldId, { borderColor: e.target.value })} className="w-full h-6 bg-gray-800 border border-gray-700 rounded cursor-pointer" />
          </div>
        </div>
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBgOpacity}</label>
          <div className="flex items-center gap-2">
            <input type="range" min={0} max={100} value={field.style.backgroundOpacity} onChange={(e) => updateStyle(fieldId, { backgroundOpacity: Number(e.target.value) })} className="flex-1 accent-sky-300" />
            <span className="text-[11px] text-gray-400 w-8 text-right">{field.style.backgroundOpacity}%</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBorderWidth}</label>
            <input type="number" min={0} max={20} value={field.style.borderWidth} onChange={(e) => updateStyle(fieldId, { borderWidth: Number(e.target.value) })} className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]" />
          </div>
          <div>
            <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldBorderRadius}</label>
            <input type="number" min={0} max={100} value={field.style.borderRadius} onChange={(e) => updateStyle(fieldId, { borderRadius: Number(e.target.value) })} className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]" />
          </div>
          <div>
            <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.fieldPadding}</label>
            <input type="number" min={0} max={50} value={field.style.padding} onChange={(e) => updateStyle(fieldId, { padding: Number(e.target.value) })} className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]" />
          </div>
        </div>
      </Section>

      {/* Effets visuels */}
      <FieldEffectsEditor fieldId={fieldId} />

      {/* Configuration sp\u00e9cifique \u00e0 l'\u00e9l\u00e9ment */}
      <Section title={CUSTOM_FIELD_LABELS.elementTypeLabels[field.element.type] ?? field.element.type}>
        <FieldElementConfigEditor fieldId={fieldId} element={field.element} />
      </Section>

      <div className="flex gap-2 mt-1">
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
