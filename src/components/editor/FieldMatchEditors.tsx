/**
 * Sous-éditeurs pour les données de match en mode Layout libre.
 * Horloge/période, temps morts et tirs au but.
 * Chaque éditeur lit/écrit les données globales du store.
 */

import { InputField } from '@/components/ui/InputField';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { ShootoutAttempt } from '@/types/bodyTypes/shootout';

/**
 * Éditeur de l'horloge et de la période.
 * Utilisé par clock-display et period-display.
 */
export function ClockDataEditor() {
  const time = useScoreboardStore((s) => s.time);
  const period = useScoreboardStore((s) => s.period);
  const update = useScoreboardStore((s) => s.update);

  return (
    <div className="flex flex-col gap-2 rounded-md border border-gray-800 bg-gray-900/50 p-2">
      <InputField
        label={CUSTOM_FIELD_LABELS.configClockTime}
        value={time}
        onChange={(v) => update('time', v)}
      />
      <InputField
        label={CUSTOM_FIELD_LABELS.configClockPeriod}
        value={period}
        onChange={(v) => update('period', v)}
      />
      <p className="text-[10px] text-gray-600 -mt-1">{CUSTOM_FIELD_LABELS.configClockPeriodHint}</p>
    </div>
  );
}

/**
 * Éditeur des temps morts (timeout-display).
 * Permet de modifier le nombre de temps morts restants par équipe.
 */
export function TimeoutEditor() {
  const timeoutsLeft = useScoreboardStore((s) => s.timeoutsLeft);
  const timeoutsRight = useScoreboardStore((s) => s.timeoutsRight);
  const update = useScoreboardStore((s) => s.update);

  return (
    <div className="flex flex-col gap-2 rounded-md border border-gray-800 bg-gray-900/50 p-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configTimeoutsCount}</label>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-500">G</span>
            <input
              type="number"
              min={0}
              max={5}
              value={timeoutsLeft}
              onChange={(e) => update('timeoutsLeft', Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
              data-testid="timeout-left-input"
            />
          </div>
        </div>
        <div>
          <label className="text-[11px] text-gray-400 invisible">{CUSTOM_FIELD_LABELS.configTimeoutsCount}</label>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-500">D</span>
            <input
              type="number"
              min={0}
              max={5}
              value={timeoutsRight}
              onChange={(e) => update('timeoutsRight', Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
              data-testid="timeout-right-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const SHOOTOUT_RESULTS: readonly { value: ShootoutAttempt['result']; label: string }[] = [
  { value: 'scored', label: CUSTOM_FIELD_LABELS.configShootoutScored },
  { value: 'missed', label: CUSTOM_FIELD_LABELS.configShootoutMissed },
  { value: 'pending', label: CUSTOM_FIELD_LABELS.configShootoutPending },
];

function ShootoutSide({ side, label }: {
  readonly side: 'left' | 'right';
  readonly label: string;
}) {
  const attempts = useScoreboardStore((s) => side === 'left' ? s.shootoutLeft : s.shootoutRight);
  const addAttempt = useScoreboardStore((s) => s.addShootoutAttempt);
  const removeAttempt = useScoreboardStore((s) => s.removeShootoutAttempt);
  const updateResult = useScoreboardStore((s) => s.updateShootoutResult);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-gray-500 font-medium">{label}</span>
      {attempts.length === 0 && (
        <p className="text-[10px] text-gray-600">{CUSTOM_FIELD_LABELS.configShootoutEmpty}</p>
      )}
      {attempts.map((a, i) => (
        <div key={`${side}-${String(i)}`} className="flex items-center gap-1">
          <span className="text-[10px] text-gray-500 w-3">{i + 1}</span>
          {SHOOTOUT_RESULTS.map((r) => (
            <button
              key={r.value}
              type="button"
              className={`text-[10px] px-1.5 py-0.5 rounded ${
                a.result === r.value
                  ? 'bg-sky-900 text-sky-300 border border-sky-600'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => updateResult(side, i, r.value)}
            >
              {r.label}
            </button>
          ))}
          <button
            type="button"
            className="text-[10px] text-red-400 hover:text-red-300 ml-auto"
            onClick={() => removeAttempt(side, i)}
          >
            x
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-[10px] text-sky-400 hover:text-sky-300 text-left"
        onClick={() => addAttempt(side)}
      >
        + {CUSTOM_FIELD_LABELS.configShootoutAdd}
      </button>
    </div>
  );
}

/**
 * Éditeur des tirs au but (shootout-display).
 * Permet d'ajouter/modifier/supprimer les tentatives de chaque équipe.
 */
export function ShootoutEditor() {
  const team1 = useScoreboardStore((s) => s.teamDisplayName1 || s.team1 || 'G');
  const team2 = useScoreboardStore((s) => s.teamDisplayName2 || s.team2 || 'D');

  return (
    <div className="flex flex-col gap-2 rounded-md border border-gray-800 bg-gray-900/50 p-2">
      <ShootoutSide side="left" label={team1} />
      <div className="border-t border-gray-800" />
      <ShootoutSide side="right" label={team2} />
    </div>
  );
}
