/**
 * Panneau de propri\u00e9t\u00e9s affich\u00e9 \u00e0 droite du canvas de preview.
 * Appara\u00eet quand un ou plusieurs champs sont s\u00e9lectionn\u00e9s
 * en mode Layout libre (Body Type 14).
 */

import { X } from 'lucide-react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { CustomFieldProperties } from './CustomFieldProperties';
import { MultiSelectionToolbar } from './MultiSelectionToolbar';

const EMPTY_IDS: readonly string[] = [];

export function PropertiesPanel() {
  const selectedFieldIds = useScoreboardStore(
    (s) => s.customFieldsData?.selectedFieldIds ?? EMPTY_IDS,
  );
  const clearSelection = useScoreboardStore((s) => s.clearFieldSelection);

  const singleSelectedId = selectedFieldIds.length === 1
    ? selectedFieldIds[0] ?? null
    : null;

  if (selectedFieldIds.length === 0) return null;

  return (
    <div
      data-testid="properties-panel"
      className="w-[300px] flex-shrink-0 border-l border-gray-800 flex flex-col h-full bg-gray-950"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
          {CUSTOM_FIELD_LABELS.propertiesPanelTitle}
        </span>
        <button
          type="button"
          onClick={() => clearSelection()}
          className="p-1 text-gray-500 hover:text-gray-300"
          title={CUSTOM_FIELD_LABELS.propertiesPanelClose}
          data-testid="properties-panel-close"
        >
          <X size={14} className="flex-shrink-0" />
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {singleSelectedId && (
          <CustomFieldProperties fieldId={singleSelectedId} />
        )}
        {selectedFieldIds.length >= 2 && (
          <MultiSelectionToolbar count={selectedFieldIds.length} />
        )}
      </div>
    </div>
  );
}
