/**
 * Panneau secondaire de propriétés pour le champ sélectionné.
 * S'affiche comme une deuxième colonne à droite du panneau éditeur
 * quand un champ est sélectionné en mode Layout libre (Body Type 14).
 */

import { X } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { CustomFieldProperties } from './CustomFieldProperties';

export function PropertiesPanel() {
  const selectedFieldId = useScoreboardStore(
    (s) => {
      const ids = s.customFieldsData?.selectedFieldIds;
      return ids?.length === 1 ? ids[0] ?? null : null;
    },
  );
  const clearSelection = useScoreboardStore((s) => s.clearFieldSelection);

  if (!selectedFieldId) return null;

  return (
    <div
      data-testid="properties-panel"
      className="w-[300px] flex-shrink-0 border-r border-gray-800 flex flex-col h-full bg-gray-950"
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
        >
          <X size={14} className="flex-shrink-0" />
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        <Section title={CUSTOM_FIELD_LABELS.fieldProperties} defaultOpen>
          <CustomFieldProperties fieldId={selectedFieldId} />
        </Section>
      </div>
    </div>
  );
}
