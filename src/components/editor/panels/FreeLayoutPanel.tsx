/**
 * Panneau principal du mode Layout libre.
 * Navigation à deux colonnes : rail d'icônes à gauche, contenu à droite.
 * Remplace l'ancien CustomFieldsSection monolithique.
 */

import {
  Settings, Hash, Type, BarChart2, User, Image,
  LayoutGrid, Layers, Bookmark, Wrench,
} from 'lucide-react';
import { IconRail } from '@/components/ui/IconRail';
import { useEditorUIStore } from '@/stores/editorUIStore';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useCustomFieldKeyboard } from '@/hooks/useCustomFieldKeyboard';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { FreeLayoutCategoryPanel } from './FreeLayoutCategoryPanel';
import { FreeLayoutCanvasPanel } from './FreeLayoutCanvasPanel';
import { FreeLayoutPresetsPanel } from './FreeLayoutPresetsPanel';
import { CustomFieldList } from '@/components/editor/CustomFieldList';
import { CustomFieldProperties } from '@/components/editor/CustomFieldProperties';
import { MultiSelectionToolbar } from '@/components/editor/MultiSelectionToolbar';
import { HeaderSection } from '@/components/editor/HeaderSection';
import type { FreeLayoutTab, IconRailItem } from '@/types/editor';

const RAIL_ITEMS: readonly IconRailItem[] = [
  { id: 'canvas', icon: Settings, label: CUSTOM_FIELD_LABELS.freeLayoutTabCanvas },
  { id: 'match', icon: Hash, label: CUSTOM_FIELD_LABELS.freeLayoutTabMatch },
  { id: 'text', icon: Type, label: CUSTOM_FIELD_LABELS.freeLayoutTabText },
  { id: 'data', icon: BarChart2, label: CUSTOM_FIELD_LABELS.freeLayoutTabData },
  { id: 'players', icon: User, label: CUSTOM_FIELD_LABELS.freeLayoutTabPlayers },
  { id: 'media', icon: Image, label: CUSTOM_FIELD_LABELS.freeLayoutTabMedia },
  { id: 'composed', icon: LayoutGrid, label: CUSTOM_FIELD_LABELS.freeLayoutTabComposed },
  { id: 'layers', icon: Layers, label: CUSTOM_FIELD_LABELS.freeLayoutTabLayers },
  { id: 'presets', icon: Bookmark, label: CUSTOM_FIELD_LABELS.freeLayoutTabPresets },
  { id: 'properties', icon: Wrench, label: CUSTOM_FIELD_LABELS.freeLayoutTabProperties },
];

function PropertiesContent() {
  const selectedFieldIds = useScoreboardStore((s) => s.customFieldsData?.selectedFieldIds ?? []);
  const singleSelectedId = selectedFieldIds.length === 1 ? selectedFieldIds[0] ?? null : null;

  if (selectedFieldIds.length >= 2) {
    return (
      <div className="p-4">
        <MultiSelectionToolbar count={selectedFieldIds.length} />
      </div>
    );
  }

  if (singleSelectedId) {
    return (
      <div className="p-4">
        <CustomFieldProperties fieldId={singleSelectedId} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="text-[12px] text-gray-500">
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

function MatchContent() {
  return (
    <div className="flex flex-col h-full overflow-hidden" data-testid="free-layout-match-panel">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-4 border-b border-gray-800">
          <HeaderSection />
        </div>
        <FreeLayoutCategoryPanel category="match" />
      </div>
    </div>
  );
}

function ActiveContent({ tab }: { readonly tab: FreeLayoutTab }) {
  switch (tab) {
    case 'canvas': return <FreeLayoutCanvasPanel />;
    case 'match': return <MatchContent />;
    case 'text': return <FreeLayoutCategoryPanel category="text" />;
    case 'data': return <FreeLayoutCategoryPanel category="data" />;
    case 'players': return <FreeLayoutCategoryPanel category="players" />;
    case 'media': return <FreeLayoutCategoryPanel category="media" />;
    case 'composed': return <FreeLayoutCategoryPanel category="composed" />;
    case 'layers': return <LayersContent />;
    case 'presets': return <FreeLayoutPresetsPanel />;
    case 'properties': return <PropertiesContent />;
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
