import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { HOCKEY_NATIONS } from '@/constants/nations';
import { EDITOR_LABELS } from '@/constants/labels';

const NATION_OPTIONS = HOCKEY_NATIONS.map((n) => ({
  value: n.noc,
  label: `${n.noc} - ${n.name}`,
}));

const MAX_ROWS = 12;

export function StandingsSection() {
  const data = useScoreboardStore((s) => s.standingsData);
  const updateTitle = useScoreboardStore((s) => s.updateStandingsTitle);
  const addRow = useScoreboardStore((s) => s.addStandingsRow);
  const removeRow = useScoreboardStore((s) => s.removeStandingsRow);
  const updateRowField = useScoreboardStore((s) => s.updateStandingsRowField);

  const title = `${EDITOR_LABELS.sectionStandings} (${String(data.rows.length)}/${String(MAX_ROWS)})`;

  return (
    <Section title={title}>
      <InputField
        label={EDITOR_LABELS.standingsTitle}
        value={data.title}
        onChange={updateTitle}
      />

      {data.rows.map((row, i) => (
        <div
          key={`sr-${String(i)}`}
          className="bg-gray-800 rounded-md p-1.5"
        >
          <div className="flex gap-1.5 items-end">
            <Select
              label={EDITOR_LABELS.standingsTeam}
              options={NATION_OPTIONS}
              value={row.team}
              onChange={(v) => updateRowField(i, 'team', v)}
              className="flex-1"
            />
            <label className="flex items-center gap-1 cursor-pointer text-[11px] text-gray-400 pb-1.5">
              <input
                type="checkbox"
                checked={row.highlighted}
                onChange={(e) => updateRowField(i, 'highlighted', String(e.target.checked))}
                className="accent-sky-300"
              />
              {EDITOR_LABELS.standingsHighlight}
            </label>
            <Button
              variant="danger"
              className="flex-shrink-0 h-8 px-2.5"
              onClick={() => removeRow(i)}
            >
              X
            </Button>
          </div>
          <div className="flex gap-1 mt-1">
            {data.columns.map((col) => (
              <InputField
                key={col.id}
                label={col.label}
                value={row.values[col.id] ?? ''}
                onChange={(v) => updateRowField(i, col.id, v)}
              />
            ))}
          </div>
        </div>
      ))}

      {data.rows.length < MAX_ROWS && (
        <Button variant="add" onClick={addRow}>
          + {EDITOR_LABELS.standingsAddRow}
        </Button>
      )}
    </Section>
  );
}
