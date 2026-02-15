import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

const MAX_LINES = 8;

export function PlayerStatsSection() {
  const playerStats = useScoreboardStore((s) => s.playerStats);
  const showPlayerPhoto = useScoreboardStore((s) => s.showPlayerPhoto);
  const update = useScoreboardStore((s) => s.update);
  const updatePlayerStat = useScoreboardStore((s) => s.updatePlayerStat);
  const addPlayerStat = useScoreboardStore((s) => s.addPlayerStat);
  const removePlayerStat = useScoreboardStore((s) => s.removePlayerStat);

  const title = `${EDITOR_LABELS.sectionPlayerStats} (${String(playerStats.length)}/${String(MAX_LINES)})`;

  return (
    <Section title={title}>
      <label className="flex items-center gap-2 cursor-pointer text-[13px]">
        <input
          type="checkbox"
          checked={showPlayerPhoto}
          onChange={(e) => update('showPlayerPhoto', e.target.checked)}
          className="accent-sky-300"
        />
        {EDITOR_LABELS.showPlayerPhoto}
      </label>

      {playerStats.map((s, i) => (
        <div
          key={`ps-${String(i)}`}
          className="bg-gray-800 rounded-md p-1.5"
        >
          <div className="flex gap-1.5 items-end">
            <InputField
              label={EDITOR_LABELS.playerVariable}
              value={s.label}
              onChange={(v) => updatePlayerStat(i, 'label', v)}
            />
            {showPlayerPhoto && (
              <InputField
                label={EDITOR_LABELS.playerNumber}
                value={s.playerNumber}
                onChange={(v) => updatePlayerStat(i, 'playerNumber', v)}
              />
            )}
            <InputField
              label={EDITOR_LABELS.playerName}
              value={s.playerName}
              onChange={(v) => updatePlayerStat(i, 'playerName', v)}
            />
            <InputField
              label={EDITOR_LABELS.playerValue}
              value={s.value}
              onChange={(v) => updatePlayerStat(i, 'value', v)}
            />
            <Button
              variant="danger"
              className="flex-shrink-0 h-8 px-2.5"
              onClick={() => removePlayerStat(i)}
            >
              X
            </Button>
          </div>
        </div>
      ))}

      {playerStats.length < MAX_LINES && (
        <Button variant="add" onClick={addPlayerStat}>
          + {EDITOR_LABELS.addStatLine}
        </Button>
      )}
    </Section>
  );
}
