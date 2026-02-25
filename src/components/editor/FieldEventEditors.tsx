/**
 * Editeurs de configuration pour les elements evenement/chronologie.
 * Tailwind CSS uniquement (panneau editeur).
 */

import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { updateFieldElementConfig } from '@/utils/fieldConfig';
import type { FieldElementConfig } from '@/types/customField';
import type { TimelineEventEntry, TimelineEventKind } from '@/types/freeLayoutConfigs';

const KIND_OPTIONS = [
  { value: 'goal', label: CUSTOM_FIELD_LABELS.configEventKindGoal },
  { value: 'penalty', label: CUSTOM_FIELD_LABELS.configEventKindPenalty },
  { value: 'timeout', label: CUSTOM_FIELD_LABELS.configEventKindTimeout },
  { value: 'period', label: CUSTOM_FIELD_LABELS.configEventKindPeriod },
];

/* --- Timeline Event Editor --- */

interface TimelineEventEditorProps {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'timeline-event' }>;
}

export function TimelineEventEditor({ fieldId, element }: TimelineEventEditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  return (
    <div className="flex flex-col gap-2">
      <Select label={CUSTOM_FIELD_LABELS.configEventKind} value={c.kind} onChange={(v) => patch({ kind: v })} options={KIND_OPTIONS} />
      <InputField label={CUSTOM_FIELD_LABELS.configEventPeriod} value={c.period} onChange={(v) => patch({ period: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configEventTime} value={c.time} onChange={(v) => patch({ time: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configEventTeam} value={c.team} onChange={(v) => patch({ team: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configEventDescription} value={c.description} onChange={(v) => patch({ description: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextFontSize} value={String(c.fontSize)} onChange={(v) => patch({ fontSize: Number(v) || 18 })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
    </div>
  );
}

/* --- Timeline List Editor --- */

interface TimelineListEditorProps {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'timeline-list' }>;
}

export function TimelineListEditor({ fieldId, element }: TimelineListEditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  const addEvent = () => {
    const entry: TimelineEventEntry = { period: '', time: '', kind: 'goal' as TimelineEventKind, description: '', team: '' };
    patch({ events: [...c.events, entry] });
  };

  const removeEvent = (idx: number) => {
    patch({ events: c.events.filter((_, i) => i !== idx) });
  };

  const updateEvent = (idx: number, key: string, value: string) => {
    const updated = c.events.map((ev, i) => i === idx ? { ...ev, [key]: value } : ev);
    patch({ events: updated });
  };

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configTimelineTitle} value={c.title} onChange={(v) => patch({ title: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTimelineTitleColor} value={c.titleColor} onChange={(v) => patch({ titleColor: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextFontSize} value={String(c.fontSize)} onChange={(v) => patch({ fontSize: Number(v) || 16 })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
      {c.events.length === 0 && (
        <p className="text-[11px] text-gray-500">{CUSTOM_FIELD_LABELS.configTimelineEmpty}</p>
      )}
      {c.events.map((ev, i) => (
        <div key={`ev-${i}`} className="flex flex-col gap-1 border border-gray-700 rounded p-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-medium">{`#${i + 1}`}</span>
            <button onClick={() => removeEvent(i)} className="text-red-400 hover:text-red-300" type="button">
              <Trash2 size={12} className="flex-shrink-0" />
            </button>
          </div>
          <Select label={CUSTOM_FIELD_LABELS.configEventKind} value={ev.kind} onChange={(v) => updateEvent(i, 'kind', v)} options={KIND_OPTIONS} />
          <InputField label={CUSTOM_FIELD_LABELS.configEventPeriod} value={ev.period} onChange={(v) => updateEvent(i, 'period', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configEventTime} value={ev.time} onChange={(v) => updateEvent(i, 'time', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configEventTeam} value={ev.team} onChange={(v) => updateEvent(i, 'team', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configEventDescription} value={ev.description} onChange={(v) => updateEvent(i, 'description', v)} />
        </div>
      ))}
      <Button variant="add" onClick={addEvent}>{CUSTOM_FIELD_LABELS.configTimelineAdd}</Button>
    </div>
  );
}
