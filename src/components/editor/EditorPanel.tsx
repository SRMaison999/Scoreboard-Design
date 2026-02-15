import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { SectionGroupLabel } from '@/components/ui/SectionGroupLabel';
import { HeaderSection } from './HeaderSection';
import { TitleSection } from './TitleSection';
import { StatsSection } from './StatsSection';
import { PlayerStatsSection } from './PlayerStatsSection';
import { PenaltySection } from './PenaltySection';
import { GoalSection } from './GoalSection';
import { PlayerCardSection } from './PlayerCardSection';
import { StandingsSection } from './StandingsSection';
import { FinalScoreSection } from './FinalScoreSection';
import { FreeTextSection } from './FreeTextSection';
import { TimeoutSection } from './TimeoutSection';
import { ShootoutSection } from './ShootoutSection';
import { GeneralSection } from './GeneralSection';
import { FontSection } from './FontSection';
import { ColorSection } from './ColorSection';
import { ClockSection } from './ClockSection';
import { BackgroundSection } from './BackgroundSection';

function BodyContentSection({ bodyType }: { readonly bodyType: number }) {
  switch (bodyType) {
    case 3: return <PlayerStatsSection />;
    case 4: return <GoalSection />;
    case 5: return <PlayerCardSection />;
    case 6: return <StandingsSection />;
    case 7: return <FinalScoreSection />;
    case 8: return <FreeTextSection />;
    default: return <StatsSection />;
  }
}

export function EditorPanel() {
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const showPenalties = useScoreboardStore((s) => s.showPenalties);

  const showTitles = bodyType <= 3;

  return (
    <div className="w-[360px] flex-shrink-0 border-r border-gray-800 overflow-y-auto p-4 flex flex-col gap-4">
      <div className="text-lg font-bold font-[family-name:var(--font-oswald)] tracking-widest uppercase text-sky-300">
        {EDITOR_LABELS.appTitle}
      </div>

      <SectionGroupLabel label={EDITOR_LABELS.groupContenu} />
      <HeaderSection />
      {showTitles && <TitleSection />}
      <BodyContentSection bodyType={bodyType} />
      <TimeoutSection />
      <ShootoutSection />
      {showPenalties && (
        <>
          <PenaltySection side="left" />
          <PenaltySection side="right" />
        </>
      )}

      <SectionGroupLabel label={EDITOR_LABELS.groupApparence} />
      <GeneralSection />
      <BackgroundSection />
      <FontSection />
      <ColorSection />

      <SectionGroupLabel label={EDITOR_LABELS.groupHorloge} />
      <ClockSection />

      <div className="h-10 flex-shrink-0" />
    </div>
  );
}
