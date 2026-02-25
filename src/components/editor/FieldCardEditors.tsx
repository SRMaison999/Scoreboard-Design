/**
 * Éditeurs de configuration pour fiche joueur et score par période.
 * Tailwind CSS uniquement (panneau éditeur).
 */

import { InputField } from '@/components/ui/InputField';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { updateFieldElementConfig } from '@/utils/fieldConfig';
import type { FieldElementConfig } from '@/types/customField';
import type { PlayerCardStatEntry, PeriodScoreEntry } from '@/types/freeLayoutConfigs';

/* --- Player Card Editor --- */

interface PlayerCardEditorProps {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'player-card' }>;
}

export function PlayerCardEditor({ fieldId, element }: PlayerCardEditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  const isDataUrl = c.playerPhoto.startsWith('data:');

  const addStat = () => {
    const entry: PlayerCardStatEntry = { label: '', value: '' };
    patch({ stats: [...c.stats, entry] });
  };

  const removeStat = (idx: number) => {
    patch({ stats: c.stats.filter((_: PlayerCardStatEntry, i: number) => i !== idx) });
  };

  const updateStat = (idx: number, key: string, value: string) => {
    const updated = c.stats.map((s: PlayerCardStatEntry, i: number) => i === idx ? { ...s, [key]: value } : s);
    patch({ stats: updated });
  };

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configCardTitle} value={c.title} onChange={(v) => patch({ title: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configCardSubtitle} value={c.subtitle} onChange={(v) => patch({ subtitle: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configCardPlayerName} value={c.playerName} onChange={(v) => patch({ playerName: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configCardPlayerNumber} value={c.playerNumber} onChange={(v) => patch({ playerNumber: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configCardPlayerTeam} value={c.playerTeam} onChange={(v) => patch({ playerTeam: v })} />
      <ImageUpload
        label={CUSTOM_FIELD_LABELS.configCardPlayerPhoto}
        value={isDataUrl ? c.playerPhoto : ''}
        onUpload={(dataUrl) => patch({ playerPhoto: dataUrl })}
        onRemove={() => patch({ playerPhoto: '' })}
      />
      <InputField label={CUSTOM_FIELD_LABELS.configCardTitleColor} value={c.titleColor} onChange={(v) => patch({ titleColor: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextFontSize} value={String(c.fontSize)} onChange={(v) => patch({ fontSize: Number(v) || 24 })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />

      {c.stats.length === 0 && (
        <p className="text-[11px] text-gray-500">{CUSTOM_FIELD_LABELS.configCardEmptyStats}</p>
      )}
      {c.stats.map((s: PlayerCardStatEntry, i: number) => (
        <div key={`stat-${i}`} className="flex flex-col gap-1 border border-gray-700 rounded p-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-medium">{`#${i + 1}`}</span>
            <button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-300" type="button">
              <Trash2 size={12} className="flex-shrink-0" />
            </button>
          </div>
          <InputField label={CUSTOM_FIELD_LABELS.configCardStatLabel} value={s.label} onChange={(v) => updateStat(i, 'label', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configCardStatValue} value={s.value} onChange={(v) => updateStat(i, 'value', v)} />
        </div>
      ))}
      <Button variant="add" onClick={addStat}>{CUSTOM_FIELD_LABELS.configCardAddStat}</Button>
    </div>
  );
}

/* --- Period Score Row Editor --- */

interface PeriodScoreRowEditorProps {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'period-score-row' }>;
}

export function PeriodScoreRowEditor({ fieldId, element }: PeriodScoreRowEditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  const addPeriod = () => {
    const entry: PeriodScoreEntry = { period: '', scoreLeft: '', scoreRight: '' };
    patch({ periods: [...c.periods, entry] });
  };

  const removePeriod = (idx: number) => {
    patch({ periods: c.periods.filter((_: PeriodScoreEntry, i: number) => i !== idx) });
  };

  const updatePeriod = (idx: number, key: string, value: string) => {
    const updated = c.periods.map((p: PeriodScoreEntry, i: number) => i === idx ? { ...p, [key]: value } : p);
    patch({ periods: updated });
  };

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configTextFontSize} value={String(c.fontSize)} onChange={(v) => patch({ fontSize: Number(v) || 18 })} />
      <InputField label={CUSTOM_FIELD_LABELS.configPeriodScoreHeaderColor} value={c.headerColor} onChange={(v) => patch({ headerColor: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />

      {c.periods.length === 0 && (
        <p className="text-[11px] text-gray-500">{CUSTOM_FIELD_LABELS.configPeriodScoreEmpty}</p>
      )}
      {c.periods.map((p: PeriodScoreEntry, i: number) => (
        <div key={`per-${i}`} className="flex flex-col gap-1 border border-gray-700 rounded p-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-medium">{`#${i + 1}`}</span>
            <button onClick={() => removePeriod(i)} className="text-red-400 hover:text-red-300" type="button">
              <Trash2 size={12} className="flex-shrink-0" />
            </button>
          </div>
          <InputField label={CUSTOM_FIELD_LABELS.configPeriodScorePeriodLabel} value={p.period} onChange={(v) => updatePeriod(i, 'period', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configPeriodScoreLeft} value={p.scoreLeft} onChange={(v) => updatePeriod(i, 'scoreLeft', v)} />
          <InputField label={CUSTOM_FIELD_LABELS.configPeriodScoreRight} value={p.scoreRight} onChange={(v) => updatePeriod(i, 'scoreRight', v)} />
        </div>
      ))}
      <Button variant="add" onClick={addPeriod}>{CUSTOM_FIELD_LABELS.configPeriodScoreAdd}</Button>
    </div>
  );
}
