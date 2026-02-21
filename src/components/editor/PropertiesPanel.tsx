/**
 * Panneau de propri\u00e9t\u00e9s affich\u00e9 \u00e0 droite du canvas de preview.
 * Toujours visible en mode Layout libre (Body Type 14).
 * Le HeaderSection (donn\u00e9es du match) est toujours accessible :
 * - Sans s\u00e9lection : affich\u00e9 en plein
 * - Avec s\u00e9lection : repliable au-dessus des propri\u00e9t\u00e9s du champ
 */

import { X } from 'lucide-react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { Section } from '@/components/ui/Section';
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
          {hasSelection
            ? CUSTOM_FIELD_LABELS.propertiesPanelTitle
            : CUSTOM_FIELD_LABELS.propertiesPanelMatchData}
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
        {/* Donn\u00e9es du match : toujours pr\u00e9sentes, repliables quand un champ est s\u00e9lectionn\u00e9 */}
        {hasSelection ? (
          <div className="mb-3 pb-3 border-b border-gray-800" data-testid="match-data-section">
            <Section
              title={CUSTOM_FIELD_LABELS.propertiesPanelMatchData}
              defaultOpen={false}
            >
              <HeaderSection embedded />
            </Section>
          </div>
        ) : (
          <HeaderSection />
        )}

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
