/**
 * Panneau principal du mode Layout libre.
 * Architecture \u00e0 deux zones :
 * - Haut : rail d'ic\u00f4nes (4 onglets) + contenu actif
 * - Bas : panneau de propri\u00e9t\u00e9s persistant (toujours visible)
 */

import { Settings, Library, Layers, Bookmark } from 'lucide-react';
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

function PropertiesContent() {
  const selectedFieldIds = useScoreboardStore(
    (s) => s.customFieldsData?.selectedFieldIds ?? EMPTY_IDS,
  );
  const singleSelectedId = selectedFieldIds.length === 1
    ? selectedFieldIds[0] ?? null
    : null;

  if (selectedFieldIds.length >= 2) {
    return (
      <div className="p-3">
        <MultiSelectionToolbar count={selectedFieldIds.length} />
      </div>
    );
  }

  if (singleSelectedId) {
    return (
      <div className="p-3">
        <CustomFieldProperties fieldId={singleSelectedId} />
      </div>
    );
  }

  return (
    <div className="p-3">
      <p className="text-[11px] text-gray-500">
        {CUSTOM_FIELD_LABELS.freeLayoutNoSelection}
      </p>
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

  return (
    <div className="flex h-full" data-testid="free-layout-panel">
      <IconRail
        items={RAIL_ITEMS}
        activeId={activeTab}
        onSelect={(id) => setTab(id as FreeLayoutTab)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Zone haute : contenu de l'onglet actif */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <ActiveContent tab={activeTab} />
        </div>

        {/* Zone basse : propri\u00e9t\u00e9s persistantes */}
        <div
          className="border-t border-gray-700 bg-gray-900/50 flex flex-col max-h-[45%] min-h-[80px]"
          data-testid="persistent-properties-panel"
        >
          <div className="px-3 py-1.5 border-b border-gray-800 flex-shrink-0">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              {CUSTOM_FIELD_LABELS.propertiesPanelTitle}
            </h3>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <PropertiesContent />
          </div>
        </div>
      </div>
    </div>
  );
}
