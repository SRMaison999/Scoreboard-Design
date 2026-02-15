import { parseTime, formatTime } from '@/utils/time';
import type { ScoreboardState, Penalty } from '@/types/scoreboard';

export function tickTimerDraft(s: ScoreboardState & { penaltiesLeft: Penalty[]; penaltiesRight: Penalty[] }): void {
  const secs = parseTime(s.time);

  const tickPenalties = (list: Penalty[]) => {
    for (let i = list.length - 1; i >= 0; i--) {
      const pen = list[i];
      if (!pen) continue;
      const ps = parseTime(pen.time);
      if (ps <= 0) {
        list.splice(i, 1);
      } else {
        pen.time = formatTime(ps - 1);
      }
    }
  };

  tickPenalties(s.penaltiesLeft);
  tickPenalties(s.penaltiesRight);

  if (secs <= 0) {
    const cur = s.periodOptions.find((p) => p.label === s.period);
    if (cur?.next) {
      const nextPhase = s.periodOptions.find((p) => p.label === cur.next);
      s.period = cur.next;
      s.time = nextPhase?.duration ?? '20:00';
    } else {
      s.demoRunning = false;
    }
  } else {
    s.time = formatTime(secs - 1);
  }
}
