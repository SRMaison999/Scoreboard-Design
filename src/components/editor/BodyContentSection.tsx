import { StatsSection } from './StatsSection';
import { PlayerStatsSection } from './PlayerStatsSection';
import { GoalSection } from './GoalSection';
import { PlayerCardSection } from './PlayerCardSection';
import { StandingsSection } from './StandingsSection';
import { FinalScoreSection } from './FinalScoreSection';
import { FreeTextSection } from './FreeTextSection';
import { HeadToHeadSection } from './HeadToHeadSection';
import { TimelineSection } from './TimelineSection';
import { BarChartSection } from './BarChartSection';
import { RosterSection } from './RosterSection';
import { ScheduleSection } from './ScheduleSection';

export function BodyContentSection({ bodyType }: { readonly bodyType: number }) {
  switch (bodyType) {
    case 3: return <PlayerStatsSection />;
    case 4: return <GoalSection />;
    case 5: return <PlayerCardSection />;
    case 6: return <StandingsSection />;
    case 7: return <FinalScoreSection />;
    case 8: return <FreeTextSection />;
    case 9: return <HeadToHeadSection />;
    case 10: return <TimelineSection />;
    case 11: return <BarChartSection />;
    case 12: return <RosterSection />;
    case 13: return <ScheduleSection />;
    default: return <StatsSection />;
  }
}
