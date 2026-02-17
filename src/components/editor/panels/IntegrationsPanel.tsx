import { useState } from 'react';
import { EDITOR_LABELS } from '@/constants/labels';
import { SubTabs } from '@/components/ui/SubTabs';
import { LiveDataSection } from '@/components/editor/LiveDataSection';
import { MultiScoreboardSection } from '@/components/editor/MultiScoreboardSection';
import { SyncSection } from '@/components/editor/SyncSection';
import { BroadcastSection } from '@/components/editor/BroadcastSection';
import type { IntegrationsSubTab, SubTabItem } from '@/types/editor';

const TABS: readonly SubTabItem[] = [
  { id: 'live', label: EDITOR_LABELS.subTabLive },
  { id: 'multi', label: EDITOR_LABELS.subTabMulti },
  { id: 'sync', label: EDITOR_LABELS.subTabSync },
  { id: 'broadcast', label: EDITOR_LABELS.subTabBroadcast },
];

export function IntegrationsPanel() {
  const [activeTab, setActiveTab] = useState<IntegrationsSubTab>('live');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SubTabs
        tabs={TABS}
        activeId={activeTab}
        onSelect={(id) => setActiveTab(id as IntegrationsSubTab)}
      />
      <div className="flex-1 min-h-0 flex flex-col gap-4 p-4 overflow-y-auto">
        {activeTab === 'live' && <LiveDataSection />}
        {activeTab === 'multi' && <MultiScoreboardSection />}
        {activeTab === 'sync' && <SyncSection />}
        {activeTab === 'broadcast' && <BroadcastSection />}
      </div>
    </div>
  );
}
