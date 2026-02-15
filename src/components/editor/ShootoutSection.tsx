import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import type { ShootoutResult } from '@/types/bodyTypes/shootout';
import type { PenaltySide } from '@/types/scoreboard';

const RESULT_OPTIONS: { value: ShootoutResult; label: string }[] = [
  { value: 'pending', label: EDITOR_LABELS.shootoutPending },
  { value: 'scored', label: EDITOR_LABELS.shootoutScored },
  { value: 'missed', label: EDITOR_LABELS.shootoutMissed },
];

function ShootoutSideEditor({ side }: { readonly side: PenaltySide }) {
  const team = useScoreboardStore((s) => side === 'left' ? s.team1 : s.team2);
  const attempts = useScoreboardStore((s) => side === 'left' ? s.shootoutLeft : s.shootoutRight);
  const addAttempt = useScoreboardStore((s) => s.addShootoutAttempt);
  const removeAttempt = useScoreboardStore((s) => s.removeShootoutAttempt);
  const updateResult = useScoreboardStore((s) => s.updateShootoutResult);

  return (
    <div className="bg-gray-800 rounded-md p-1.5">
      <div className="text-[11px] text-gray-400 font-medium mb-1">{team}</div>
      <div className="flex gap-1 flex-wrap items-center">
        {attempts.map((a, i) => (
          <div key={`so-${side}-${String(i)}`} className="flex items-center gap-0.5">
            <select
              value={a.result}
              onChange={(e) => updateResult(side, i, e.target.value as ShootoutResult)}
              className="bg-gray-700 border border-gray-600 rounded px-1 py-0.5 text-gray-100 text-xs outline-none w-10"
            >
              {RESULT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <Button
              variant="danger"
              className="h-6 px-1 text-xs"
              onClick={() => removeAttempt(side, i)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="add"
        className="mt-1 text-xs py-0.5"
        onClick={() => addAttempt(side)}
      >
        + {EDITOR_LABELS.shootoutAddAttempt}
      </Button>
    </div>
  );
}

export function ShootoutSection() {
  const showShootout = useScoreboardStore((s) => s.showShootout);
  const update = useScoreboardStore((s) => s.update);

  return (
    <Section title={EDITOR_LABELS.sectionShootout}>
      <label className="flex items-center gap-2 cursor-pointer text-[13px]">
        <input
          type="checkbox"
          checked={showShootout}
          onChange={(e) => update('showShootout', e.target.checked)}
          className="accent-sky-300"
        />
        {EDITOR_LABELS.showShootoutLabel}
      </label>

      {showShootout && (
        <>
          <ShootoutSideEditor side="left" />
          <ShootoutSideEditor side="right" />
        </>
      )}
    </Section>
  );
}
