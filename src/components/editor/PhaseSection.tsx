import { useState, useCallback } from 'react';
import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

export function PhaseSection() {
  const [open, setOpen] = useState(false);
  const periodOptions = useScoreboardStore((s) => s.periodOptions);
  const updatePhase = useScoreboardStore((s) => s.updatePhase);
  const addPhase = useScoreboardStore((s) => s.addPhase);
  const removePhase = useScoreboardStore((s) => s.removePhase);

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  const getTransitionOptions = (excludeIndex: number) =>
    periodOptions
      .filter((_, j) => j !== excludeIndex)
      .map((o) => ({ value: o.label, label: o.label }));

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={toggleOpen}
        className="flex items-center justify-between cursor-pointer"
      >
        <span className="text-[11px] text-gray-400 font-medium">
          {EDITOR_LABELS.phaseOptions}
        </span>
        <span className="text-[10px] text-gray-600">
          {open ? 'v' : '>'}
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-2">
          {periodOptions.map((p, i) => (
            <div
              key={`phase-${String(i)}`}
              className="flex flex-col gap-1 bg-gray-800 rounded-md p-1.5"
            >
              <div className="flex gap-1 items-center">
                <InputField
                  label=""
                  value={p.label}
                  onChange={(v) => updatePhase(i, 'label', v)}
                />
                <Button
                  variant="danger"
                  className="flex-shrink-0 h-8 px-2.5"
                  onClick={() => removePhase(i)}
                >
                  X
                </Button>
              </div>

              <div className="flex items-center gap-1 pl-1">
                <span className="text-[10px] text-gray-500 whitespace-nowrap">
                  {EDITOR_LABELS.phaseDuration}
                </span>
                <input
                  type="text"
                  value={p.duration}
                  onChange={(e) => updatePhase(i, 'duration', e.target.value)}
                  className="w-[60px] bg-gray-900 border border-gray-700 rounded px-1.5 py-0.5 text-gray-100 text-[11px] font-[family-name:var(--font-barlow)] outline-none text-center"
                />
              </div>

              <div className="flex items-center gap-1 pl-1">
                <span className="text-[10px] text-gray-500 whitespace-nowrap">
                  {EDITOR_LABELS.phaseTransition}
                </span>
                <Select
                  options={getTransitionOptions(i)}
                  value={p.next}
                  onChange={(v) => updatePhase(i, 'next', v)}
                  placeholder={EDITOR_LABELS.phaseTransitionStop}
                  className="flex-1 text-[11px] py-0.5 px-1.5"
                />
              </div>
            </div>
          ))}

          <Button variant="add" onClick={addPhase}>
            + {EDITOR_LABELS.addPhase}
          </Button>
        </div>
      )}
    </div>
  );
}
