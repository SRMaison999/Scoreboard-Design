/**
 * Sous-éditeurs de données pour stat-line, bar-compare, penalty-column
 * et header-block en mode Layout libre.
 * Chaque éditeur lit/écrit les données globales du store.
 */

import { Trash2, Plus } from 'lucide-react';
import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';
import { updateFieldElementConfig } from '@/utils/fieldConfig';
import { ClockDataEditor } from './FieldMatchEditors';
import { HeaderSection } from './HeaderSection';

/* ------------------------------------------------------------------ */
/*  Ligne de statistique                                              */
/* ------------------------------------------------------------------ */

export function StatLineDataEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'stat-line' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const stats = useScoreboardStore((s) => s.stats);
  const updateStat = useScoreboardStore((s) => s.updateStat);
  const addStat = useScoreboardStore((s) => s.addStat);
  const removeStat = useScoreboardStore((s) => s.removeStat);
  const idx = element.config.statIndex;
  const stat = stats[idx];

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configStatIndex}</label>
        <input
          type="number"
          min={0}
          max={Math.max(0, stats.length - 1)}
          value={idx}
          onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { statIndex: Number(e.target.value) })}
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
        />
      </div>
      {stat ? (
        <div className="rounded-md border border-gray-800 bg-gray-900/50 p-2 flex flex-col gap-2">
          <InputField
            label={CUSTOM_FIELD_LABELS.configStatLabel}
            value={stat.label}
            onChange={(v) => updateStat(idx, 'label', v)}
          />
          <div className="grid grid-cols-2 gap-2">
            <InputField
              label={CUSTOM_FIELD_LABELS.configStatValLeft}
              value={stat.valLeft}
              onChange={(v) => updateStat(idx, 'valLeft', v)}
            />
            <InputField
              label={CUSTOM_FIELD_LABELS.configStatValRight}
              value={stat.valRight}
              onChange={(v) => updateStat(idx, 'valRight', v)}
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300"
            onClick={() => removeStat(idx)}
          >
            <Trash2 size={10} className="flex-shrink-0" />
            {CUSTOM_FIELD_LABELS.configStatRemove}
          </button>
        </div>
      ) : (
        <p className="text-[10px] text-gray-600">{CUSTOM_FIELD_LABELS.configStatEmpty}</p>
      )}
      <button
        type="button"
        className="flex items-center gap-1 text-[10px] text-sky-400 hover:text-sky-300"
        onClick={addStat}
        data-testid="stat-add-btn"
      >
        <Plus size={10} className="flex-shrink-0" />
        {CUSTOM_FIELD_LABELS.configStatAdd}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Barre comparative                                                 */
/* ------------------------------------------------------------------ */

export function BarCompareDataEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'bar-compare' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const rows = useScoreboardStore((s) => s.barChartData.rows);
  const updateRow = useScoreboardStore((s) => s.updateBarChartRow);
  const addRow = useScoreboardStore((s) => s.addBarChartRow);
  const removeRow = useScoreboardStore((s) => s.removeBarChartRow);
  const idx = element.config.barIndex;
  const row = rows[idx];

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configBarIndex}</label>
        <input
          type="number"
          min={0}
          max={Math.max(0, rows.length - 1)}
          value={idx}
          onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { barIndex: Number(e.target.value) })}
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
        />
      </div>
      {row ? (
        <div className="rounded-md border border-gray-800 bg-gray-900/50 p-2 flex flex-col gap-2">
          <InputField
            label={CUSTOM_FIELD_LABELS.configBarLabel}
            value={row.label}
            onChange={(v) => updateRow(idx, 'label', v)}
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configBarValLeft}</label>
              <input
                type="number"
                min={0}
                value={row.valueLeft}
                onChange={(e) => updateRow(idx, 'valueLeft', Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
              />
            </div>
            <div>
              <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configBarValRight}</label>
              <input
                type="number"
                min={0}
                value={row.valueRight}
                onChange={(e) => updateRow(idx, 'valueRight', Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
              />
            </div>
          </div>
          <Select
            label={CUSTOM_FIELD_LABELS.configBarFormat}
            value={row.format}
            onChange={(v) => updateRow(idx, 'format', v)}
            options={[
              { value: 'percent', label: CUSTOM_FIELD_LABELS.configBarFormatPercent },
              { value: 'absolute', label: CUSTOM_FIELD_LABELS.configBarFormatAbsolute },
            ]}
          />
          <button
            type="button"
            className="flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300"
            onClick={() => removeRow(idx)}
          >
            <Trash2 size={10} className="flex-shrink-0" />
            {CUSTOM_FIELD_LABELS.configBarRemove}
          </button>
        </div>
      ) : (
        <p className="text-[10px] text-gray-600">{CUSTOM_FIELD_LABELS.configBarEmpty}</p>
      )}
      <button
        type="button"
        className="flex items-center gap-1 text-[10px] text-sky-400 hover:text-sky-300"
        onClick={addRow}
        data-testid="bar-add-btn"
      >
        <Plus size={10} className="flex-shrink-0" />
        {CUSTOM_FIELD_LABELS.configBarAdd}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Colonne de pénalités                                              */
/* ------------------------------------------------------------------ */

export function PenaltyColumnEditor({ element }: {
  readonly element: Extract<FieldElementConfig, { type: 'penalty-column' }>;
}) {
  const side = element.config.side;
  const penalties = useScoreboardStore((s) => side === 'left' ? s.penaltiesLeft : s.penaltiesRight);
  const updatePenalty = useScoreboardStore((s) => s.updatePenalty);
  const addPenalty = useScoreboardStore((s) => s.addPenalty);
  const removePenalty = useScoreboardStore((s) => s.removePenalty);

  return (
    <div className="flex flex-col gap-2">
      {penalties.length === 0 && (
        <p className="text-[10px] text-gray-600">{CUSTOM_FIELD_LABELS.configPenaltyEmpty}</p>
      )}
      {penalties.map((pen, i) => (
        <div key={`pen-${side}-${String(i)}`} className="flex items-center gap-1">
          <input
            type="text"
            placeholder={CUSTOM_FIELD_LABELS.configPenaltyTime}
            value={pen.time}
            onChange={(e) => updatePenalty(side, i, 'time', e.target.value)}
            className="w-16 bg-gray-800 border border-gray-700 text-gray-200 rounded px-1.5 py-0.5 text-[12px]"
          />
          <input
            type="text"
            placeholder={CUSTOM_FIELD_LABELS.configPenaltyNumber}
            value={pen.number}
            onChange={(e) => updatePenalty(side, i, 'number', e.target.value)}
            className="w-12 bg-gray-800 border border-gray-700 text-gray-200 rounded px-1.5 py-0.5 text-[12px]"
          />
          <button
            type="button"
            className="p-0.5 text-red-400 hover:text-red-300 ml-auto"
            onClick={() => removePenalty(side, i)}
            title={CUSTOM_FIELD_LABELS.configPenaltyRemove}
          >
            <Trash2 size={10} className="flex-shrink-0" />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="flex items-center gap-1 text-[10px] text-sky-400 hover:text-sky-300"
        onClick={() => addPenalty(side)}
        data-testid="penalty-add-btn"
      >
        <Plus size={10} className="flex-shrink-0" />
        {CUSTOM_FIELD_LABELS.configPenaltyAdd}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header complet (équipes + scores + horloge)                       */
/* ------------------------------------------------------------------ */

export function HeaderBlockFullEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'header-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] text-sky-400/70">{CUSTOM_FIELD_LABELS.configHeaderTeamsHint}</p>
      <HeaderSection embedded />
      <ClockDataEditor />
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input
          type="checkbox"
          checked={c.showClock}
          onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { showClock: e.target.checked })}
        />
        {CUSTOM_FIELD_LABELS.configShowClock}
      </label>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Body type imbriqué (lecture seule)                                 */
/* ------------------------------------------------------------------ */

export function BodyTypeEmbeddedInfo({ element }: {
  readonly element: FieldElementConfig;
}) {
  const bodyMatch = element.type.match(/^body-type-(\d+)$/);
  const bodyId = bodyMatch?.[1] ?? '?';

  return (
    <div className="rounded-md border border-gray-800 bg-gray-900/50 p-2">
      <p className="text-[11px] text-gray-400">
        {CUSTOM_FIELD_LABELS.configBodyTypeEmbedded} <span className="text-sky-300 font-medium">{bodyId}</span>
      </p>
      <p className="text-[10px] text-gray-600 mt-1">{CUSTOM_FIELD_LABELS.configBodyTypeEmbeddedHint}</p>
    </div>
  );
}
