import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { GeneralSection } from './GeneralSection';
import { HeaderSection } from './HeaderSection';
import { ClockSection } from './ClockSection';
import { FontSection } from './FontSection';
import { TitleSection } from './TitleSection';
import { StatsSection } from './StatsSection';
import { PlayerStatsSection } from './PlayerStatsSection';
import { PenaltySection } from './PenaltySection';
import { ColorSection } from './ColorSection';

export function EditorPanel() {
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const showPenalties = useScoreboardStore((s) => s.showPenalties);

  return (
    <div className="w-[360px] flex-shrink-0 border-r border-gray-800 overflow-y-auto p-4 flex flex-col gap-4">
      <div className="text-lg font-bold font-[family-name:var(--font-oswald)] tracking-widest uppercase text-sky-300">
        {EDITOR_LABELS.appTitle}
      </div>

      <GeneralSection />
      <HeaderSection />
      <ClockSection />
      <FontSection />
      <TitleSection />

      {bodyType === 3 ? <PlayerStatsSection /> : <StatsSection />}

      {showPenalties && (
        <>
          <PenaltySection side="left" />
          <PenaltySection side="right" />
        </>
      )}

      <ColorSection />

      <div className="h-10 flex-shrink-0" />
    </div>
  );
}
