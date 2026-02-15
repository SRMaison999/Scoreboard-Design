import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { displayTime } from '@/utils/time';

export function ClockControls() {
  const time = useScoreboardStore((s) => s.time);
  const clockTenthsThreshold = useScoreboardStore((s) => s.clockTenthsThreshold);
  const period = useScoreboardStore((s) => s.period);
  const demoRunning = useScoreboardStore((s) => s.demoRunning);
  const startClock = useScoreboardStore((s) => s.startClock);
  const stopClock = useScoreboardStore((s) => s.stopClock);
  const resetClock = useScoreboardStore((s) => s.resetClock);

  const btnClass = 'h-14 rounded-lg text-lg font-bold cursor-pointer transition-colors tracking-widest';

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-bold text-sky-300 tracking-widest uppercase">
        {EDITOR_LABELS.operatorClock}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-white tabular-nums font-[family-name:var(--font-barlow)]">
            {displayTime(time, clockTenthsThreshold)}
          </div>
          <div className="text-sm text-gray-400 tracking-widest mt-1">{period}</div>
        </div>
      </div>

      <div className="flex gap-2">
        {demoRunning ? (
          <button
            type="button"
            data-testid="clock-stop"
            className={`${btnClass} flex-1 bg-red-900 text-red-200 hover:bg-red-800`}
            onClick={stopClock}
          >
            {EDITOR_LABELS.operatorStop}
          </button>
        ) : (
          <button
            type="button"
            data-testid="clock-start"
            className={`${btnClass} flex-1 bg-green-900 text-green-200 hover:bg-green-800`}
            onClick={startClock}
          >
            {EDITOR_LABELS.operatorStart}
          </button>
        )}
        <button
          type="button"
          data-testid="clock-reset"
          className={`${btnClass} px-6 bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700`}
          onClick={resetClock}
        >
          {EDITOR_LABELS.operatorReset}
        </button>
      </div>
    </div>
  );
}
