/**
 * Panneau de propriétés affiché à droite du canvas de preview.
 * Toujours visible en mode Layout libre (Body Type 14).
 * C'est l'UNIQUE emplacement de la section "Données du match"
 * (équipes, scores, drapeaux) : tous les contrôles match sont ici.
 */

import { X } from 'lucide-react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { CustomFieldProperties } from './CustomFieldProperties';
import { MultiSelectionToolbar } from './MultiSelectionToolbar';
import { HeaderSection } from './HeaderSection';

const EMPTY_IDS: readonly string[] = [];

export function PropertiesPanel() {
  const selectedFieldIds = useScoreboardStore(
    (s) => s.customFieldsData?.selectedFieldIds ?? EMPTY_IDS,
  );
  const clearSelection = useScoreboardStore((s) => s.clearFieldSelection);

  const singleSelectedId = selectedFieldIds.length === 1
    ? selectedFieldIds[0] ?? null
    : null;

  const hasSelection = selectedFieldIds.length > 0;

  return (
    <div
      data-testid="properties-panel"
      className="w-[300px] flex-shrink-0 border-l border-gray-800 flex flex-col h-full bg-gray-950"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
          {CUSTOM_FIELD_LABELS.propertiesPanelTitle}
        </span>
        {hasSelection && (
          <button
            type="button"
            onClick={() => clearSelection()}
            className="p-1 text-gray-500 hover:text-gray-300"
            title={CUSTOM_FIELD_LABELS.propertiesPanelClose}
            data-testid="properties-panel-close"
          >
            <X size={14} className="flex-shrink-0" />
          </button>
        )}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {/* Données du match : TOUJOURS visible en mode Layout libre */}
        <div className="mb-3 pb-3 border-b border-gray-800" data-testid="match-data-section">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
            {CUSTOM_FIELD_LABELS.propertiesPanelMatchData}
          </p>
          <HeaderSection embedded />
        </div>

        {singleSelectedId && (
          <CustomFieldProperties fieldId={singleSelectedId} />
        )}
        {selectedFieldIds.length >= 2 && (
          <MultiSelectionToolbar count={selectedFieldIds.length} />
        )}

        {!hasSelection && (
          <p className="text-[12px] text-gray-500">
            {CUSTOM_FIELD_LABELS.freeLayoutNoSelection}
          </p>
        )}
      </div>
    </div>
  );
}
