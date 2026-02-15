import { useState } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { displayTime } from '@/utils/time';

const PRESET_DURATIONS = ['2:00', '4:00', '5:00', '10:00'] as const;

export function PenaltyControls() {
  const team1 = useScoreboardStore((s) => s.team1);
  const team2 = useScoreboardStore((s) => s.team2);
  const penaltiesLeft = useScoreboardStore((s) => s.penaltiesLeft);
  const penaltiesRight = useScoreboardStore((s) => s.penaltiesRight);
  const clockTenthsThreshold = useScoreboardStore((s) => s.clockTenthsThreshold);
  const addPenalty = useScoreboardStore((s) => s.addPenalty);
  const updatePenalty = useScoreboardStore((s) => s.updatePenalty);
  const removePenalty = useScoreboardStore((s) => s.removePenalty);

  const [numberLeft, setNumberLeft] = useState('');
  const [numberRight, setNumberRight] = useState('');

  const handleAddPenalty = (side: 'left' | 'right', duration: string) => {
    const num = side === 'left' ? numberLeft : numberRight;
    addPenalty(side);
    updatePenalty(side, 0, 'time', duration);
    if (num) {
      updatePenalty(side, 0, 'number', num);
    }
    if (side === 'left') setNumberLeft('');
    else setNumberRight('');
  };

  const btnClass = 'h-10 rounded-md text-sm font-bold cursor-pointer transition-colors px-3';

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-bold text-sky-300 tracking-widest uppercase">
        {EDITOR_LABELS.operatorPenalties}
      </div>

      <div className="flex gap-6">
        {/* Équipe 1 */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-sm font-bold text-gray-300 tracking-widest">{team1}</div>
          <input
            type="text"
            value={numberLeft}
            onChange={(e) => setNumberLeft(e.target.value)}
            placeholder={EDITOR_LABELS.operatorPenaltyNumber}
            className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-100 text-sm outline-none w-full"
            data-testid="penalty-number-left"
          />
          <div className="flex gap-1.5 flex-wrap">
            {PRESET_DURATIONS.map((d) => (
              <button
                key={`left-${d}`}
                type="button"
                className={`${btnClass} bg-orange-900 text-orange-200 hover:bg-orange-800`}
                onClick={() => handleAddPenalty('left', d)}
              >
                {d}
              </button>
            ))}
          </div>
          {penaltiesLeft.length > 0 && (
            <div className="flex flex-col gap-1 mt-1">
              {penaltiesLeft.map((p, i) => (
                <div key={`pl-${String(i)}`} className="flex items-center gap-2 text-sm">
                  <span className="text-orange-300 tabular-nums font-bold">{displayTime(p.time, clockTenthsThreshold)}</span>
                  <span className="text-gray-400">#{p.number}</span>
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300 cursor-pointer text-xs ml-auto"
                    onClick={() => removePenalty('left', i)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Équipe 2 */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-sm font-bold text-gray-300 tracking-widest">{team2}</div>
          <input
            type="text"
            value={numberRight}
            onChange={(e) => setNumberRight(e.target.value)}
            placeholder={EDITOR_LABELS.operatorPenaltyNumber}
            className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-100 text-sm outline-none w-full"
            data-testid="penalty-number-right"
          />
          <div className="flex gap-1.5 flex-wrap">
            {PRESET_DURATIONS.map((d) => (
              <button
                key={`right-${d}`}
                type="button"
                className={`${btnClass} bg-orange-900 text-orange-200 hover:bg-orange-800`}
                onClick={() => handleAddPenalty('right', d)}
              >
                {d}
              </button>
            ))}
          </div>
          {penaltiesRight.length > 0 && (
            <div className="flex flex-col gap-1 mt-1">
              {penaltiesRight.map((p, i) => (
                <div key={`pr-${String(i)}`} className="flex items-center gap-2 text-sm">
                  <span className="text-orange-300 tabular-nums font-bold">{displayTime(p.time, clockTenthsThreshold)}</span>
                  <span className="text-gray-400">#{p.number}</span>
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300 cursor-pointer text-xs ml-auto"
                    onClick={() => removePenalty('right', i)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
