/**
 * Panneau principal du mode Layout libre.
 * Le contenu actif (biblioth\u00e8que, canvas, couches, presets) occupe
 * toute la hauteur. Les propri\u00e9t\u00e9s du champ s\u00e9lectionn\u00e9 sont
 * affich\u00e9es dans un panneau s\u00e9par\u00e9 \u00e0 droite du canvas (PropertiesPanel).
 */

import { Settings, Library, Layers, Bookmark } from 'lucide-react';
import { IconRail } from '@/components/ui/IconRail';
import { useEditorUIStore } from '@/stores/editorUIStore';
import { useCustomFieldKeyboard } from '@/hooks/useCustomFieldKeyboard';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { FreeLayoutLibraryPanel } from './FreeLayoutLibraryPanel';
import { FreeLayoutCanvasPanel } from './FreeLayoutCanvasPanel';
import { FreeLayoutPresetsPanel } from './FreeLayoutPresetsPanel';
import { CustomFieldList } from '@/components/editor/CustomFieldList';
import type { FreeLayoutTab, IconRailItem } from '@/types/editor';

const RAIL_ITEMS: readonly IconRailItem[] = [
  { id: 'library', icon: Library, label: CUSTOM_FIELD_LABELS.freeLayoutTabLibrary },
  { id: 'canvas', icon: Settings, label: CUSTOM_FIELD_LABELS.freeLayoutTabCanvas },
  { id: 'layers', icon: Layers, label: CUSTOM_FIELD_LABELS.freeLayoutTabLayers },
  { id: 'presets', icon: Bookmark, label: CUSTOM_FIELD_LABELS.freeLayoutTabPresets },
];

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
        <ActiveContent tab={activeTab} />
      </div>
    </div>
  );
}
