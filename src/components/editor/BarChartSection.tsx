import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

const MAX_ROWS = 8;

const FORMAT_OPTIONS = [
  { value: 'percent', label: EDITOR_LABELS.barChartFormatPercent },
  { value: 'absolute', label: EDITOR_LABELS.barChartFormatAbsolute },
];

export function BarChartSection() {
  const data = useScoreboardStore((s) => s.barChartData);
  const updateTitle = useScoreboardStore((s) => s.updateBarChartTitle);
  const addRow = useScoreboardStore((s) => s.addBarChartRow);
  const removeRow = useScoreboardStore((s) => s.removeBarChartRow);
  const updateRow = useScoreboardStore((s) => s.updateBarChartRow);

  const title = `${EDITOR_LABELS.sectionBarChart} (${String(data.rows.length)}/${String(MAX_ROWS)})`;

  return (
    <Section title={title}>
      <InputField
        label={EDITOR_LABELS.barChartTitle}
        value={data.title}
        onChange={updateTitle}
      />

      {data.rows.map((row, i) => (
        <div key={`bar-${String(i)}`} className="bg-gray-800 rounded-md p-1.5">
          <div className="flex gap-1.5 items-end">
            <InputField
              label={EDITOR_LABELS.barChartLabel}
              value={row.label}
              onChange={(v) => updateRow(i, 'label', v)}
            />
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <label className="text-[11px] text-gray-400 font-medium">
                {EDITOR_LABELS.barChartFormat}
              </label>
              <select
                value={row.format}
                onChange={(e) => updateRow(i, 'format', e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm outline-none w-full"
              >
                {FORMAT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <Button
              variant="danger"
              className="flex-shrink-0 h-8 px-2.5"
              onClick={() => removeRow(i)}
            >
              X
            </Button>
          </div>
          <div className="flex gap-1.5 items-end mt-1">
            <InputField
              label={EDITOR_LABELS.barChartValueLeft}
              value={String(row.valueLeft)}
              onChange={(v) => updateRow(i, 'valueLeft', Number(v) || 0)}
            />
            <InputField
              label={EDITOR_LABELS.barChartValueRight}
              value={String(row.valueRight)}
              onChange={(v) => updateRow(i, 'valueRight', Number(v) || 0)}
            />
          </div>
        </div>
      ))}

      {data.rows.length < MAX_ROWS && (
        <Button variant="add" onClick={addRow}>
          + {EDITOR_LABELS.barChartAddRow}
        </Button>
      )}
    </Section>
  );
}
