import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

export function TimeoutSection() {
  const showTimeouts = useScoreboardStore((s) => s.showTimeouts);
  const timeoutsLeft = useScoreboardStore((s) => s.timeoutsLeft);
  const timeoutsRight = useScoreboardStore((s) => s.timeoutsRight);
  const update = useScoreboardStore((s) => s.update);

  return (
    <Section title={EDITOR_LABELS.sectionTimeouts}>
      <label className="flex items-center gap-2 cursor-pointer text-[13px]">
        <input
          type="checkbox"
          checked={showTimeouts}
          onChange={(e) => update('showTimeouts', e.target.checked)}
          className="accent-sky-300"
        />
        {EDITOR_LABELS.showTimeoutsLabel}
      </label>

      {showTimeouts && (
        <div className="bg-gray-800 rounded-md p-1.5">
          <div className="flex gap-1.5 items-end">
            <InputField
              label={EDITOR_LABELS.timeoutsLeftLabel}
              value={String(timeoutsLeft)}
              onChange={(v) => update('timeoutsLeft', Number(v) || 0)}
            />
            <InputField
              label={EDITOR_LABELS.timeoutsRightLabel}
              value={String(timeoutsRight)}
              onChange={(v) => update('timeoutsRight', Number(v) || 0)}
            />
          </div>
        </div>
      )}
    </Section>
  );
}
