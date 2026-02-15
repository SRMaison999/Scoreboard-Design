import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

export function PhaseControls() {
  const period = useScoreboardStore((s) => s.period);
  const periodOptions = useScoreboardStore((s) => s.periodOptions);
  const update = useScoreboardStore((s) => s.update);
  const nextPhase = useScoreboardStore((s) => s.nextPhase);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-bold text-sky-300 tracking-widest uppercase">
        {EDITOR_LABELS.operatorPhase}
      </div>

      <div className="flex gap-2 flex-wrap">
        {periodOptions.map((opt) => (
          <button
            key={opt.label}
            type="button"
            className={`h-10 rounded-md px-4 text-sm font-bold cursor-pointer transition-colors tracking-wide ${
              period === opt.label
                ? 'bg-sky-700 text-white'
                : 'bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => update('period', opt.label)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        data-testid="next-phase"
        className="h-12 rounded-lg bg-blue-900 text-blue-200 text-base font-bold cursor-pointer hover:bg-blue-800 transition-colors tracking-widest"
        onClick={nextPhase}
      >
        {EDITOR_LABELS.operatorNextPhase}
      </button>
    </div>
  );
}
