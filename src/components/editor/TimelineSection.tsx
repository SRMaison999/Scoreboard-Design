import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import type { TimelineEventType } from '@/types/bodyTypes/timeline';

const MAX_EVENTS = 8;

const EVENT_TYPE_OPTIONS: { value: TimelineEventType; label: string }[] = [
  { value: 'goal', label: EDITOR_LABELS.timelineTypeGoal },
  { value: 'penalty', label: EDITOR_LABELS.timelineTypePenalty },
  { value: 'timeout', label: EDITOR_LABELS.timelineTypeTimeout },
  { value: 'period', label: EDITOR_LABELS.timelineTypePeriod },
];

export function TimelineSection() {
  const data = useScoreboardStore((s) => s.timelineData);
  const updateTitle = useScoreboardStore((s) => s.updateTimelineTitle);
  const addEvent = useScoreboardStore((s) => s.addTimelineEvent);
  const removeEvent = useScoreboardStore((s) => s.removeTimelineEvent);
  const updateEvent = useScoreboardStore((s) => s.updateTimelineEvent);

  const title = `${EDITOR_LABELS.sectionTimeline} (${String(data.events.length)}/${String(MAX_EVENTS)})`;

  return (
    <Section title={title}>
      <InputField
        label={EDITOR_LABELS.timelineTitle}
        value={data.title}
        onChange={updateTitle}
      />

      {data.events.map((event, i) => (
        <div key={`tl-${String(i)}`} className="bg-gray-800 rounded-md p-1.5">
          <div className="flex gap-1.5 items-end">
            <InputField
              label={EDITOR_LABELS.timelineEventPeriod}
              value={event.period}
              onChange={(v) => updateEvent(i, 'period', v)}
            />
            <InputField
              label={EDITOR_LABELS.timelineEventTime}
              value={event.time}
              onChange={(v) => updateEvent(i, 'time', v)}
            />
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <label className="text-[11px] text-gray-400 font-medium">
                {EDITOR_LABELS.timelineEventType}
              </label>
              <select
                value={event.type}
                onChange={(e) => updateEvent(i, 'type', e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm outline-none w-full"
              >
                {EVENT_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <Button
              variant="danger"
              className="flex-shrink-0 h-8 px-2.5"
              onClick={() => removeEvent(i)}
            >
              X
            </Button>
          </div>
          <div className="flex gap-1.5 items-end mt-1">
            <InputField
              label={EDITOR_LABELS.timelineEventTeam}
              value={event.team}
              onChange={(v) => updateEvent(i, 'team', v)}
            />
            <InputField
              label={EDITOR_LABELS.timelineEventDescription}
              value={event.description}
              onChange={(v) => updateEvent(i, 'description', v)}
            />
          </div>
        </div>
      ))}

      {data.events.length < MAX_EVENTS && (
        <Button variant="add" onClick={addEvent}>
          + {EDITOR_LABELS.timelineAddEvent}
        </Button>
      )}
    </Section>
  );
}
