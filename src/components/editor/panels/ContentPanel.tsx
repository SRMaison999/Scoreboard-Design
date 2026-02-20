import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useEditorUIStore } from '@/stores/editorUIStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { SubTabs } from '@/components/ui/SubTabs';
import { HeaderSection } from '@/components/editor/HeaderSection';
import { TitleSection } from '@/components/editor/TitleSection';
import { GeneralSection } from '@/components/editor/GeneralSection';
import { TimeoutSection } from '@/components/editor/TimeoutSection';
import { ShootoutSection } from '@/components/editor/ShootoutSection';
import { PenaltySection } from '@/components/editor/PenaltySection';
import { PhotoSection } from '@/components/editor/PhotoSection';
import { LogoSection } from '@/components/editor/LogoSection';
import { BodyContentSection } from '@/components/editor/BodyContentSection';
import { FreeLayoutPanel } from './FreeLayoutPanel';
import type { ContentSubTab, SubTabItem } from '@/types/editor';

const TABS: readonly SubTabItem[] = [
  { id: 'general', label: EDITOR_LABELS.subTabGeneral },
  { id: 'teams', label: EDITOR_LABELS.subTabEquipes },
  { id: 'match', label: EDITOR_LABELS.subTabMatch },
  { id: 'media', label: EDITOR_LABELS.subTabMedias },
];

export function ContentPanel() {
  const activeTab = useEditorUIStore((s) => s.activeContentSubTab);
  const setContentSubTab = useEditorUIStore((s) => s.setContentSubTab);
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const showPenalties = useScoreboardStore((s) => s.showPenalties);
  const showTitles = bodyType <= 3;

  /* En mode Layout libre (bodyType 14), afficher le panneau dédié */
  if (bodyType === 14) {
    return <FreeLayoutPanel />;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SubTabs
        tabs={TABS}
        activeId={activeTab}
        onSelect={(id) => setContentSubTab(id as ContentSubTab)}
      />
      <div className="flex-1 min-h-0 flex flex-col gap-4 p-4 overflow-y-auto">
        {activeTab === 'general' && <GeneralSection />}
        {activeTab === 'teams' && (
          <>
            <HeaderSection />
            {showTitles && <TitleSection />}
            <BodyContentSection bodyType={bodyType} />
          </>
        )}
        {activeTab === 'match' && (
          <>
            <TimeoutSection />
            <ShootoutSection />
            {showPenalties && (
              <>
                <PenaltySection side="left" />
                <PenaltySection side="right" />
              </>
            )}
          </>
        )}
        {activeTab === 'media' && (
          <>
            <PhotoSection />
            <LogoSection />
          </>
        )}
      </div>
    </div>
  );
}
