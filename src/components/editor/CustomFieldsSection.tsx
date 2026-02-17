/**
 * Section éditeur pour le constructeur de champs personnalisés (Type 14).
 * Contient les options du canvas, la bibliothèque et la liste des champs.
 */

import { Section } from '@/components/ui/Section';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { CustomFieldLibrary } from './CustomFieldLibrary';
import { CustomFieldList } from './CustomFieldList';
import { CustomFieldProperties } from './CustomFieldProperties';
import { GRID_SIZE_OPTIONS } from '@/types/customField';

export function CustomFieldsSection() {
  const fullPageMode = useScoreboardStore((s) => s.customFieldsData.fullPageMode);
  const snapToGrid = useScoreboardStore((s) => s.customFieldsData.snapToGrid);
  const showGuides = useScoreboardStore((s) => s.customFieldsData.showGuides);
  const gridSize = useScoreboardStore((s) => s.customFieldsData.gridSize);
  const selectedFieldId = useScoreboardStore((s) => s.customFieldsData.selectedFieldId);
  const updateOption = useScoreboardStore((s) => s.updateCustomFieldsOption);
  const updateGridSize = useScoreboardStore((s) => s.updateCustomFieldsGridSize);

  return (
    <>
      <Section title={CUSTOM_FIELD_LABELS.sectionCustomFields} defaultOpen>
        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={fullPageMode}
            onChange={(e) => updateOption('fullPageMode', e.target.checked)}
            className="accent-sky-300"
          />
          {CUSTOM_FIELD_LABELS.fullPageMode}
        </label>
        <p className="text-[11px] text-gray-500 mt-0.5">
          {CUSTOM_FIELD_LABELS.fullPageModeHint}
        </p>

        <label className="flex items-center gap-2 cursor-pointer text-[13px] mt-2">
          <input
            type="checkbox"
            checked={snapToGrid}
            onChange={(e) => updateOption('snapToGrid', e.target.checked)}
            className="accent-sky-300"
          />
          {CUSTOM_FIELD_LABELS.snapToGrid}
        </label>

        {snapToGrid && (
          <div className="flex items-center gap-2 mt-1 text-[13px]">
            <span className="text-gray-400">{CUSTOM_FIELD_LABELS.gridSize}</span>
            <select
              value={gridSize}
              onChange={(e) => updateGridSize(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
            >
              {GRID_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}px</option>
              ))}
            </select>
          </div>
        )}

        <label className="flex items-center gap-2 cursor-pointer text-[13px] mt-2">
          <input
            type="checkbox"
            checked={showGuides}
            onChange={(e) => updateOption('showGuides', e.target.checked)}
            className="accent-sky-300"
          />
          {CUSTOM_FIELD_LABELS.showGuides}
        </label>
      </Section>

      <CustomFieldLibrary />

      <Section title={CUSTOM_FIELD_LABELS.layersTitle} defaultOpen>
        <CustomFieldList />
      </Section>

      {selectedFieldId && (
        <Section title={CUSTOM_FIELD_LABELS.fieldProperties} defaultOpen>
          <CustomFieldProperties fieldId={selectedFieldId} />
        </Section>
      )}
    </>
  );
}
