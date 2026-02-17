import { useState } from 'react';
import { FileText, Palette, Clock, Film, Radio } from 'lucide-react';
import { EDITOR_LABELS } from '@/constants/labels';
import { IconRail } from '@/components/ui/IconRail';
import { ContentPanel } from '@/components/editor/panels/ContentPanel';
import { AppearancePanel } from '@/components/editor/panels/AppearancePanel';
import { ClockPanel } from '@/components/editor/panels/ClockPanel';
import { AnimationsPanel } from '@/components/editor/panels/AnimationsPanel';
import { IntegrationsPanel } from '@/components/editor/panels/IntegrationsPanel';
import type { RailTabId, IconRailItem } from '@/types/editor';

const RAIL_ITEMS: readonly IconRailItem[] = [
  { id: 'content', icon: FileText, label: EDITOR_LABELS.navContenu },
  { id: 'appearance', icon: Palette, label: EDITOR_LABELS.navApparence },
  { id: 'clock', icon: Clock, label: EDITOR_LABELS.navHorloge },
  { id: 'animations', icon: Film, label: EDITOR_LABELS.navAnimations },
  { id: 'integrations', icon: Radio, label: EDITOR_LABELS.navIntegrations },
];

function ActivePanel({ railTab }: { readonly railTab: RailTabId }) {
  switch (railTab) {
    case 'content': return <ContentPanel />;
    case 'appearance': return <AppearancePanel />;
    case 'clock': return <ClockPanel />;
    case 'animations': return <AnimationsPanel />;
    case 'integrations': return <IntegrationsPanel />;
  }
}

export function EditorNavigation() {
  const [activeTab, setActiveTab] = useState<RailTabId>('content');

  return (
    <div className="flex h-full">
      <IconRail
        items={RAIL_ITEMS}
        activeId={activeTab}
        onSelect={(id) => setActiveTab(id as RailTabId)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ActivePanel railTab={activeTab} />
      </div>
    </div>
  );
}
