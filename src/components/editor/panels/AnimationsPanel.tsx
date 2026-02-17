import { useState } from 'react';
import { EDITOR_LABELS } from '@/constants/labels';
import { SubTabs } from '@/components/ui/SubTabs';
import { AnimationSection } from '@/components/editor/AnimationSection';
import { ExportSection } from '@/components/editor/ExportSection';
import type { AnimationsSubTab, SubTabItem } from '@/types/editor';

const TABS: readonly SubTabItem[] = [
  { id: 'animations', label: EDITOR_LABELS.subTabAnimations },
  { id: 'export', label: EDITOR_LABELS.subTabExport },
];

export function AnimationsPanel() {
  const [activeTab, setActiveTab] = useState<AnimationsSubTab>('animations');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SubTabs
        tabs={TABS}
        activeId={activeTab}
        onSelect={(id) => setActiveTab(id as AnimationsSubTab)}
      />
      <div className="flex-1 min-h-0 flex flex-col gap-4 p-4 overflow-y-auto">
        {activeTab === 'animations' && <AnimationSection />}
        {activeTab === 'export' && <ExportSection />}
      </div>
    </div>
  );
}
