import { useScoreboardStore } from '@/stores/scoreboardStore';
import { Button } from '@/components/ui/Button';
import { EDITOR_LABELS } from '@/constants/labels';

export function DemoSection() {
  const demoRunning = useScoreboardStore((s) => s.demoRunning);
  const period = useScoreboardStore((s) => s.period);
  const periodOptions = useScoreboardStore((s) => s.periodOptions);
  const startClock = useScoreboardStore((s) => s.startClock);
  const stopClock = useScoreboardStore((s) => s.stopClock);
  const resetClock = useScoreboardStore((s) => s.resetClock);

  const transitionInfo = (() => {
    const cur = periodOptions.find((p) => p.label === period);
    if (cur?.next) {
      const nextP = periodOptions.find((p) => p.label === cur.next);
      const duration = nextP?.duration ?? '20:00';
      return `${EDITOR_LABELS.demoTransitionPrefix} → ${cur.next} (${duration})`;
    }
    return `${EDITOR_LABELS.demoTransitionPrefix} → ${EDITOR_LABELS.demoTransitionStop}`;
  })();

  return (
    <div className="flex flex-col gap-1.5 bg-gray-900/60 border border-blue-950 rounded-md p-2">
      <div className="text-xs font-bold text-sky-300 tracking-wide">
        {EDITOR_LABELS.demoTitle}
      </div>

      <div className="flex gap-1.5">
        <Button
          variant={demoRunning ? 'danger' : 'primary'}
          className="flex-1 py-2 text-sm font-bold tracking-wide"
          onClick={demoRunning ? stopClock : startClock}
        >
          {demoRunning ? EDITOR_LABELS.demoStop : EDITOR_LABELS.demoStart}
        </Button>
        <Button
          variant="ghost"
          className="px-3 py-2 text-xs"
          onClick={resetClock}
        >
          {EDITOR_LABELS.demoReset}
        </Button>
      </div>

      {demoRunning && (
        <div className="text-[11px] text-sky-300 opacity-70">
          {transitionInfo}
        </div>
      )}
    </div>
  );
}
