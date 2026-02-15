import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { SectionGroupLabel } from '@/components/ui/SectionGroupLabel';
import { HeaderSection } from './HeaderSection';
import { TitleSection } from './TitleSection';
import { StatsSection } from './StatsSection';
import { PlayerStatsSection } from './PlayerStatsSection';
import { PenaltySection } from './PenaltySection';
import { GeneralSection } from './GeneralSection';
import { FontSection } from './FontSection';
import { ColorSection } from './ColorSection';
import { ClockSection } from './ClockSection';

export function EditorPanel() {
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const showPenalties = useScoreboardStore((s) => s.showPenalties);

  return (
    <div className="w-[360px] flex-shrink-0 border-r border-gray-800 overflow-y-auto p-4 flex flex-col gap-4">
      <div className="text-lg font-bold font-[family-name:var(--font-oswald)] tracking-widest uppercase text-sky-300">
        {EDITOR_LABELS.appTitle}
      </div>

      <SectionGroupLabel label={EDITOR_LABELS.groupContenu} />
      <HeaderSection />
      <TitleSection />
      {bodyType === 3 ? <PlayerStatsSection /> : <StatsSection />}
      {showPenalties && (
        <>
          <PenaltySection side="left" />
          <PenaltySection side="right" />
        </>
      )}

      <SectionGroupLabel label={EDITOR_LABELS.groupApparence} />
      <GeneralSection />
      <FontSection />
      <ColorSection />

      <SectionGroupLabel label={EDITOR_LABELS.groupHorloge} />
      <ClockSection />

      <div className="h-10 flex-shrink-0" />
    </div>
  );
}
