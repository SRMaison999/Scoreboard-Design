import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

export function ScoreControls() {
  const team1 = useScoreboardStore((s) => s.team1);
  const team2 = useScoreboardStore((s) => s.team2);
  const score1 = useScoreboardStore((s) => s.score1);
  const score2 = useScoreboardStore((s) => s.score2);
  const increment = useScoreboardStore((s) => s.incrementScore);
  const decrement = useScoreboardStore((s) => s.decrementScore);

  const btnClass = 'w-16 h-16 rounded-lg text-2xl font-bold cursor-pointer transition-colors';

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-bold text-sky-300 tracking-widest uppercase">
        {EDITOR_LABELS.operatorScore}
      </div>

      <div className="flex items-center gap-6">
        {/* Équipe 1 */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm font-bold text-gray-300 tracking-widest">{team1}</div>
          <div className="text-5xl font-bold text-white tabular-nums">{score1}</div>
          <div className="flex gap-2">
            <button
              type="button"
              data-testid="score1-minus"
              className={`${btnClass} bg-red-900 text-red-200 hover:bg-red-800`}
              onClick={() => decrement('left')}
            >
              -1
            </button>
            <button
              type="button"
              data-testid="score1-plus"
              className={`${btnClass} bg-green-900 text-green-200 hover:bg-green-800`}
              onClick={() => increment('left')}
            >
              +1
            </button>
          </div>
        </div>

        <div className="text-3xl font-bold text-gray-600">:</div>

        {/* Équipe 2 */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm font-bold text-gray-300 tracking-widest">{team2}</div>
          <div className="text-5xl font-bold text-white tabular-nums">{score2}</div>
          <div className="flex gap-2">
            <button
              type="button"
              data-testid="score2-minus"
              className={`${btnClass} bg-red-900 text-red-200 hover:bg-red-800`}
              onClick={() => decrement('right')}
            >
              -1
            </button>
            <button
              type="button"
              data-testid="score2-plus"
              className={`${btnClass} bg-green-900 text-green-200 hover:bg-green-800`}
              onClick={() => increment('right')}
            >
              +1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
