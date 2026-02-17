import { useState } from 'react';
import { EDITOR_LABELS } from '@/constants/labels';
import { SubTabs } from '@/components/ui/SubTabs';
import { TemplateSizeSection } from '@/components/editor/TemplateSizeSection';
import { BackgroundSection } from '@/components/editor/BackgroundSection';
import { FontSection } from '@/components/editor/FontSection';
import { FontSizeSection } from '@/components/editor/FontSizeSection';
import { ColorSection } from '@/components/editor/ColorSection';
import type { AppearanceSubTab, SubTabItem } from '@/types/editor';

const TABS: readonly SubTabItem[] = [
  { id: 'style', label: EDITOR_LABELS.subTabStyle },
  { id: 'fonts', label: EDITOR_LABELS.subTabPolices },
  { id: 'colors', label: EDITOR_LABELS.subTabCouleurs },
];

export function AppearancePanel() {
  const [activeTab, setActiveTab] = useState<AppearanceSubTab>('style');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SubTabs
        tabs={TABS}
        activeId={activeTab}
        onSelect={(id) => setActiveTab(id as AppearanceSubTab)}
      />
      <div className="flex-1 min-h-0 flex flex-col gap-4 p-4 overflow-y-auto">
        {activeTab === 'style' && (
          <>
            <TemplateSizeSection />
            <BackgroundSection />
          </>
        )}
        {activeTab === 'fonts' && (
          <>
            <FontSection />
            <FontSizeSection />
          </>
        )}
        {activeTab === 'colors' && <ColorSection />}
      </div>
    </div>
  );
}
