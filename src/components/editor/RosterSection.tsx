import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import type { PlayerPosition } from '@/types/bodyTypes/roster';

const MAX_PLAYERS = 25;

const POSITION_OPTIONS: { value: PlayerPosition; label: string }[] = [
  { value: 'G', label: 'G' },
  { value: 'D', label: 'D' },
  { value: 'C', label: 'C' },
  { value: 'LW', label: 'LW' },
  { value: 'RW', label: 'RW' },
  { value: 'F', label: 'F' },
];

export function RosterSection() {
  const data = useScoreboardStore((s) => s.rosterData);
  const updateField = useScoreboardStore((s) => s.updateRosterField);
  const addPlayer = useScoreboardStore((s) => s.addRosterPlayer);
  const removePlayer = useScoreboardStore((s) => s.removeRosterPlayer);
  const updatePlayer = useScoreboardStore((s) => s.updateRosterPlayer);

  const title = `${EDITOR_LABELS.sectionRoster} (${String(data.players.length)}/${String(MAX_PLAYERS)})`;

  return (
    <Section title={title}>
      <div className="flex gap-1.5">
        <InputField
          label={EDITOR_LABELS.rosterTitle}
          value={data.title}
          onChange={(v) => updateField('title', v)}
        />
        <InputField
          label={EDITOR_LABELS.rosterTeam}
          value={data.team}
          onChange={(v) => updateField('team', v)}
        />
      </div>
      <InputField
        label={EDITOR_LABELS.rosterCoach}
        value={data.coach}
        onChange={(v) => updateField('coach', v)}
      />

      {data.players.map((player, i) => (
        <div key={`roster-${String(i)}`} className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.rosterPlayerNumber}
            value={player.number}
            onChange={(v) => updatePlayer(i, 'number', v)}
          />
          <InputField
            label={EDITOR_LABELS.rosterPlayerName}
            value={player.name}
            onChange={(v) => updatePlayer(i, 'name', v)}
          />
          <div className="flex flex-col gap-0.5 min-w-0" style={{ width: 70 }}>
            <label className="text-[11px] text-gray-400 font-medium">
              {EDITOR_LABELS.rosterPlayerPosition}
            </label>
            <select
              value={player.position}
              onChange={(e) => updatePlayer(i, 'position', e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm outline-none w-full"
            >
              {POSITION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <Button
            variant="danger"
            className="flex-shrink-0 h-8 px-2.5"
            onClick={() => removePlayer(i)}
          >
            X
          </Button>
        </div>
      ))}

      {data.players.length < MAX_PLAYERS && (
        <Button variant="add" onClick={addPlayer}>
          + {EDITOR_LABELS.rosterAddPlayer}
        </Button>
      )}
    </Section>
  );
}
