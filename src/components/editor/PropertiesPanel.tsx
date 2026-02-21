/**
 * Panneau de propri\u00e9t\u00e9s affich\u00e9 \u00e0 droite du canvas de preview.
 * Toujours visible en mode Layout libre (Body Type 14).
 * Les donn\u00e9es du match (HeaderSection) sont affich\u00e9es uniquement
 * quand un champ de type match est s\u00e9lectionn\u00e9 ou demand\u00e9 explicitement.
 */

import { X } from 'lucide-react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useEditorUIStore } from '@/stores/editorUIStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { Section } from '@/components/ui/Section';
import { CustomFieldProperties } from './CustomFieldProperties';
import { MultiSelectionToolbar } from './MultiSelectionToolbar';
import { HeaderSection } from './HeaderSection';

const EMPTY_IDS: readonly string[] = [];

/** Types d'\u00e9l\u00e9ments qui n\u00e9cessitent les donn\u00e9es du match */
const MATCH_DATA_TYPES = new Set([
  'team-name',
  'score-display',
  'flag-display',
  'header-block',
]);

function useSelectedFieldType(): string | null {
  return useScoreboardStore((s) => {
    const ids = s.customFieldsData?.selectedFieldIds ?? [];
    if (ids.length !== 1) return null;
    const field = s.customFieldsData.fields.find((f) => f.id === ids[0]);
    return field?.element.type ?? null;
  });
}

export function PropertiesPanel() {
  const selectedFieldIds = useScoreboardStore(
    (s) => s.customFieldsData?.selectedFieldIds ?? EMPTY_IDS,
  );
  const clearSelection = useScoreboardStore((s) => s.clearFieldSelection);
  const matchDataVisible = useEditorUIStore((s) => s.matchDataVisible);
  const setMatchDataVisible = useEditorUIStore((s) => s.setMatchDataVisible);
  const selectedType = useSelectedFieldType();

  const singleSelectedId = selectedFieldIds.length === 1
    ? selectedFieldIds[0] ?? null
    : null;

  const hasSelection = selectedFieldIds.length > 0;
  const needsMatchData = selectedType !== null && MATCH_DATA_TYPES.has(selectedType);
  const showMatchData = needsMatchData || matchDataVisible;

  const handleClose = () => {
    if (hasSelection) {
      clearSelection();
    }
    setMatchDataVisible(false);
  };

  const panelTitle = hasSelection
    ? CUSTOM_FIELD_LABELS.propertiesPanelTitle
    : showMatchData
      ? CUSTOM_FIELD_LABELS.propertiesPanelMatchData
      : CUSTOM_FIELD_LABELS.propertiesPanelTitle;

  return (
    <div
      data-testid="properties-panel"
      className="w-[300px] flex-shrink-0 border-l border-gray-800 flex flex-col h-full bg-gray-950"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
          {panelTitle}
        </span>
        {(hasSelection || showMatchData) && (
          <button
            type="button"
            onClick={handleClose}
            className="p-1 text-gray-500 hover:text-gray-300"
            title={CUSTOM_FIELD_LABELS.propertiesPanelClose}
            data-testid="properties-panel-close"
          >
            <X size={14} className="flex-shrink-0" />
          </button>
        )}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {/* Donn\u00e9es du match : visibles uniquement si un champ match est s\u00e9lectionn\u00e9 ou demand\u00e9 */}
        {showMatchData && hasSelection && (
          <div className="mb-3 pb-3 border-b border-gray-800" data-testid="match-data-section">
            <Section
              title={CUSTOM_FIELD_LABELS.propertiesPanelMatchData}
              defaultOpen
            >
              <HeaderSection embedded />
            </Section>
          </div>
        )}

        {showMatchData && !hasSelection && (
          <HeaderSection />
        )}

        {singleSelectedId && (
          <CustomFieldProperties fieldId={singleSelectedId} />
        )}
        {selectedFieldIds.length >= 2 && (
          <MultiSelectionToolbar count={selectedFieldIds.length} />
        )}

        {!hasSelection && !showMatchData && (
          <p className="text-[12px] text-gray-500">
            {CUSTOM_FIELD_LABELS.freeLayoutNoSelection}
          </p>
        )}
      </div>
    </div>
  );
}
