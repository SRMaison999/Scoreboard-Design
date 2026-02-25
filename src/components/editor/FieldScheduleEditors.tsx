/**
 * Éditeurs de configuration pour les éléments calendrier/programme.
 * Tailwind CSS uniquement (panneau éditeur).
 */

import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { updateFieldElementConfig } from '@/utils/fieldConfig';
import type { FieldElementConfig } from '@/types/customField';
import type { ScheduleMatchEntry, ScheduleMatchStatus } from '@/types/freeLayoutConfigs';

const STATUS_OPTIONS = [
  { value: 'upcoming', label: CUSTOM_FIELD_LABELS.configMatchStatusUpcoming },
  { value: 'live', label: CUSTOM_FIELD_LABELS.configMatchStatusLive },
  { value: 'finished', label: CUSTOM_FIELD_LABELS.configMatchStatusFinished },
];

/* --- Schedule Match Editor --- */

interface ScheduleMatchEditorProps {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'schedule-match' }>;
}

export function ScheduleMatchEditor({ fieldId, element }: ScheduleMatchEditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configMatchDate} value={c.date} onChange={(v) => patch({ date: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configMatchTime} value={c.time} onChange={(v) => patch({ time: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configMatchTeamLeft} value={c.teamLeft} onChange={(v) => patch({ teamLeft: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configMatchTeamRight} value={c.teamRight} onChange={(v) => patch({ teamRight: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configMatchScoreLeft} value={c.scoreLeft} onChange={(v) => patch({ scoreLeft: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configMatchScoreRight} value={c.scoreRight} onChange={(v) => patch({ scoreRight: v })} />
      <Select label={CUSTOM_FIELD_LABELS.configMatchStatus} value={c.status} onChange={(v) => patch({ status: v })} options={STATUS_OPTIONS} />
      <InputField label={CUSTOM_FIELD_LABELS.configMatchVenue} value={c.venue} onChange={(v) => patch({ venue: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextFontSize} value={String(c.fontSize)} onChange={(v) => patch({ fontSize: Number(v) || 18 })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
    </div>
  );
}

/* --- Schedule List Editor --- */

interface ScheduleListEditorProps {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'schedule-list' }>;
}

export function ScheduleListEditor({ fieldId, element }: ScheduleListEditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  const addMatch = () => {
    const entry: ScheduleMatchEntry = { date: '', time: '', teamLeft: '', teamRight: '', scoreLeft: '', scoreRight: '', status: 'upcoming' as ScheduleMatchStatus, venue: '' };
    patch({ matches: [...c.matches, entry] });
  };

  const removeMatch = (idx: number) => {
    patch({ matches: c.matches.filter((_: ScheduleMatchEntry, i: number) => i !== idx) });
  };

  const updateMatch = (idx: number, key: string, value: string) => {
    const updated = c.matches.map((m: ScheduleMatchEntry, i: number) => i === idx ? { ...m, [key]: value } : m);
    patch({ matches: updated });
  };

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configScheduleTitle} value={c.title} onChange={(v) => patch({ title: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configScheduleTitleColor} value={c.titleColor} onChange={(v) => patch({ titleColor: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextFontSize} value={String(c.fontSize)} onChange={(v) => patch({ fontSize: Number(v) || 16 })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
      {c.matches.length === 0 && (
        <p className="text-[11px] text-gray-500">{CUSTOM_FIELD_LABELS.configScheduleEmpty}</p>
      )}
      {c.matches.map((m: ScheduleMatchEntry, i: number) => (
        <div key={`m-${i}`} className="flex flex-col gap-1 border border-gray-700 rounded p-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-medium">{`#${i + 1}`}</span>
            <button onClick={() => removeMatch(i)} className="text-red-400 hover:text-red-300" type="button">
              <Trash2 size={12} className="flex-shrink-0" />
            </button>
          </div>
          <InputField label={CUSTOM_FIELD_LABELS.configMatchDate} value={m.date} onChange={(v) => updateMatch(i, 'date', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configMatchTime} value={m.time} onChange={(v) => updateMatch(i, 'time', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configMatchTeamLeft} value={m.teamLeft} onChange={(v) => updateMatch(i, 'teamLeft', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configMatchTeamRight} value={m.teamRight} onChange={(v) => updateMatch(i, 'teamRight', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configMatchScoreLeft} value={m.scoreLeft} onChange={(v) => updateMatch(i, 'scoreLeft', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configMatchScoreRight} value={m.scoreRight} onChange={(v) => updateMatch(i, 'scoreRight', v)} />
          <Select label={CUSTOM_FIELD_LABELS.configMatchStatus} value={m.status} onChange={(v) => updateMatch(i, 'status', v)} options={STATUS_OPTIONS} />
          <InputField label={CUSTOM_FIELD_LABELS.configMatchVenue} value={m.venue} onChange={(v) => updateMatch(i, 'venue', v)} />
        </div>
      ))}
      <Button variant="add" onClick={addMatch}>{CUSTOM_FIELD_LABELS.configScheduleAdd}</Button>
    </div>
  );
}
