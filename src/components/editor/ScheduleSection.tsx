import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import type { MatchStatus } from '@/types/bodyTypes/schedule';

const MAX_MATCHES = 8;

const STATUS_OPTIONS: { value: MatchStatus; label: string }[] = [
  { value: 'upcoming', label: EDITOR_LABELS.scheduleStatusUpcoming },
  { value: 'live', label: EDITOR_LABELS.scheduleStatusLive },
  { value: 'finished', label: EDITOR_LABELS.scheduleStatusFinished },
];

export function ScheduleSection() {
  const data = useScoreboardStore((s) => s.scheduleData);
  const updateTitle = useScoreboardStore((s) => s.updateScheduleTitle);
  const addMatch = useScoreboardStore((s) => s.addScheduleMatch);
  const removeMatch = useScoreboardStore((s) => s.removeScheduleMatch);
  const updateMatch = useScoreboardStore((s) => s.updateScheduleMatch);

  const title = `${EDITOR_LABELS.sectionSchedule} (${String(data.matches.length)}/${String(MAX_MATCHES)})`;

  return (
    <Section title={title}>
      <InputField
        label={EDITOR_LABELS.scheduleTitle}
        value={data.title}
        onChange={updateTitle}
      />

      {data.matches.map((match, i) => (
        <div key={`sched-${String(i)}`} className="bg-gray-800 rounded-md p-1.5">
          <div className="flex gap-1.5 items-end">
            <InputField
              label={EDITOR_LABELS.scheduleDate}
              value={match.date}
              onChange={(v) => updateMatch(i, 'date', v)}
            />
            <InputField
              label={EDITOR_LABELS.scheduleTime}
              value={match.time}
              onChange={(v) => updateMatch(i, 'time', v)}
            />
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <label className="text-[11px] text-gray-400 font-medium">
                {EDITOR_LABELS.scheduleStatus}
              </label>
              <select
                value={match.status}
                onChange={(e) => updateMatch(i, 'status', e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm outline-none w-full"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <Button
              variant="danger"
              className="flex-shrink-0 h-8 px-2.5"
              onClick={() => removeMatch(i)}
            >
              X
            </Button>
          </div>
          <div className="flex gap-1.5 items-end mt-1">
            <InputField
              label={EDITOR_LABELS.scheduleTeamLeft}
              value={match.teamLeft}
              onChange={(v) => updateMatch(i, 'teamLeft', v)}
            />
            <InputField
              label={EDITOR_LABELS.scheduleTeamRight}
              value={match.teamRight}
              onChange={(v) => updateMatch(i, 'teamRight', v)}
            />
            <InputField
              label={EDITOR_LABELS.scheduleVenue}
              value={match.venue}
              onChange={(v) => updateMatch(i, 'venue', v)}
            />
          </div>
        </div>
      ))}

      {data.matches.length < MAX_MATCHES && (
        <Button variant="add" onClick={addMatch}>
          + {EDITOR_LABELS.scheduleAddMatch}
        </Button>
      )}
    </Section>
  );
}
