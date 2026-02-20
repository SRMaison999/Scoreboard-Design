/**
 * Panneau principal du mode Layout libre.
 * Architecture contextuelle :
 * - Sans s\u00e9lection : rail d'ic\u00f4nes (4 onglets) + contenu actif en pleine hauteur
 * - Avec s\u00e9lection : propri\u00e9t\u00e9s en pleine hauteur (remplace le contenu),
 *   avec un bouton retour pour revenir \u00e0 la biblioth\u00e8que
 */

import { Settings, Library, Layers, Bookmark, ArrowLeft } from 'lucide-react';
import { IconRail } from '@/components/ui/IconRail';
import { useEditorUIStore } from '@/stores/editorUIStore';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useCustomFieldKeyboard } from '@/hooks/useCustomFieldKeyboard';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { FreeLayoutLibraryPanel } from './FreeLayoutLibraryPanel';
import { FreeLayoutCanvasPanel } from './FreeLayoutCanvasPanel';
import { FreeLayoutPresetsPanel } from './FreeLayoutPresetsPanel';
import { CustomFieldList } from '@/components/editor/CustomFieldList';
import { CustomFieldProperties } from '@/components/editor/CustomFieldProperties';
import { MultiSelectionToolbar } from '@/components/editor/MultiSelectionToolbar';
import type { FreeLayoutTab, IconRailItem } from '@/types/editor';

const EMPTY_IDS: readonly string[] = [];

const RAIL_ITEMS: readonly IconRailItem[] = [
  { id: 'library', icon: Library, label: CUSTOM_FIELD_LABELS.freeLayoutTabLibrary },
  { id: 'canvas', icon: Settings, label: CUSTOM_FIELD_LABELS.freeLayoutTabCanvas },
  { id: 'layers', icon: Layers, label: CUSTOM_FIELD_LABELS.freeLayoutTabLayers },
  { id: 'presets', icon: Bookmark, label: CUSTOM_FIELD_LABELS.freeLayoutTabPresets },
];

function PropertiesFullPanel({ onBack }: { readonly onBack: () => void }) {
  const selectedFieldIds = useScoreboardStore(
    (s) => s.customFieldsData?.selectedFieldIds ?? EMPTY_IDS,
  );
  const singleSelectedId = selectedFieldIds.length === 1
    ? selectedFieldIds[0] ?? null
    : null;

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      data-testid="properties-full-panel"
    >
      <div className="px-3 py-1.5 border-b border-gray-800 flex-shrink-0 flex items-center gap-2">
        <button
          type="button"
          className="p-1 text-gray-400 hover:text-sky-300"
          onClick={onBack}
          title={CUSTOM_FIELD_LABELS.freeLayoutBackToLibrary}
          data-testid="properties-back-button"
        >
          <ArrowLeft size={14} className="flex-shrink-0" />
        </button>
        <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          {CUSTOM_FIELD_LABELS.propertiesPanelTitle}
        </h3>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        {selectedFieldIds.length >= 2 && (
          <MultiSelectionToolbar count={selectedFieldIds.length} />
        )}
        {singleSelectedId && (
          <CustomFieldProperties fieldId={singleSelectedId} />
        )}
      </div>
    </div>
  );
}

function LayersContent() {
  return (
    <div className="flex flex-col h-full overflow-hidden" data-testid="free-layout-layers-panel">
      <div className="px-4 py-3 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-300">
          {CUSTOM_FIELD_LABELS.layersTitle}
        </h2>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        <CustomFieldList />
      </div>
    </div>
  );
}

function ActiveContent({ tab }: { readonly tab: FreeLayoutTab }) {
  switch (tab) {
    case 'canvas': return <FreeLayoutCanvasPanel />;
    case 'library': return <FreeLayoutLibraryPanel />;
    case 'layers': return <LayersContent />;
    case 'presets': return <FreeLayoutPresetsPanel />;
  }
}

export function FreeLayoutPanel() {
  useCustomFieldKeyboard();
  const activeTab = useEditorUIStore((s) => s.activeFreeLayoutTab);
  const setTab = useEditorUIStore((s) => s.setFreeLayoutTab);
  const hasSelection = useScoreboardStore(
    (s) => (s.customFieldsData?.selectedFieldIds ?? EMPTY_IDS).length > 0,
  );
  const clearSelection = useScoreboardStore((s) => s.clearFieldSelection);

  return (
    <div className="flex h-full" data-testid="free-layout-panel">
      <IconRail
        items={RAIL_ITEMS}
        activeId={activeTab}
        onSelect={(id) => setTab(id as FreeLayoutTab)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {hasSelection ? (
          <PropertiesFullPanel onBack={clearSelection} />
        ) : (
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            <ActiveContent tab={activeTab} />
          </div>
        )}
      </div>
    </div>
  );
}
