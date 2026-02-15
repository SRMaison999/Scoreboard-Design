import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

const MAX_PERIODS = 8;

export function FinalScoreSection() {
  const data = useScoreboardStore((s) => s.finalScoreData);
  const updateField = useScoreboardStore((s) => s.updateFinalScoreField);
  const addPeriod = useScoreboardStore((s) => s.addPeriodScore);
  const removePeriod = useScoreboardStore((s) => s.removePeriodScore);
  const updatePeriod = useScoreboardStore((s) => s.updatePeriodScore);

  const title = `${EDITOR_LABELS.sectionFinalScore} (${String(data.periodScores.length)}/${String(MAX_PERIODS)})`;

  return (
    <Section title={title}>
      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.finalScoreTitle}
            value={data.title}
            onChange={(v) => updateField('title', v)}
          />
          <InputField
            label={EDITOR_LABELS.finalScoreOvertimeNote}
            value={data.overtimeNote}
            onChange={(v) => updateField('overtimeNote', v)}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-1.5">
        <label className="flex items-center gap-2 cursor-pointer text-[11px] text-gray-400">
          <input
            type="checkbox"
            checked={data.showGwg}
            onChange={(e) => updateField('showGwg', e.target.checked)}
            className="accent-sky-300"
          />
          {EDITOR_LABELS.finalScoreShowGwg}
        </label>
        {data.showGwg && (
          <div className="flex gap-1.5 items-end mt-1.5">
            <InputField
              label={EDITOR_LABELS.finalScoreGwgPlayer}
              value={data.gwgPlayer}
              onChange={(v) => updateField('gwgPlayer', v)}
            />
            <InputField
              label={EDITOR_LABELS.finalScoreGwgTeam}
              value={data.gwgTeam}
              onChange={(v) => updateField('gwgTeam', v)}
            />
            <InputField
              label={EDITOR_LABELS.finalScoreGwgTime}
              value={data.gwgTime}
              onChange={(v) => updateField('gwgTime', v)}
            />
          </div>
        )}
      </div>

      {data.periodScores.map((ps, i) => (
        <div
          key={`ps-${String(i)}`}
          className="bg-gray-800 rounded-md p-1.5"
        >
          <div className="flex gap-1.5 items-end">
            <InputField
              label={EDITOR_LABELS.finalScorePeriodLabel}
              value={ps.period}
              onChange={(v) => updatePeriod(i, 'period', v)}
            />
            <InputField
              label={EDITOR_LABELS.finalScoreLeft}
              value={ps.scoreLeft}
              onChange={(v) => updatePeriod(i, 'scoreLeft', v)}
            />
            <InputField
              label={EDITOR_LABELS.finalScoreRight}
              value={ps.scoreRight}
              onChange={(v) => updatePeriod(i, 'scoreRight', v)}
            />
            <Button
              variant="danger"
              className="flex-shrink-0 h-8 px-2.5"
              onClick={() => removePeriod(i)}
            >
              X
            </Button>
          </div>
        </div>
      ))}

      {data.periodScores.length < MAX_PERIODS && (
        <Button variant="add" onClick={addPeriod}>
          + {EDITOR_LABELS.finalScoreAddPeriod}
        </Button>
      )}
    </Section>
  );
}
