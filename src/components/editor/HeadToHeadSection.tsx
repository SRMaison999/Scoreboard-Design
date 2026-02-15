import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

const MAX_STATS = 8;

export function HeadToHeadSection() {
  const data = useScoreboardStore((s) => s.headToHeadData);
  const updateTitle = useScoreboardStore((s) => s.updateHeadToHeadTitle);
  const updatePlayer = useScoreboardStore((s) => s.updateHeadToHeadPlayer);
  const addStat = useScoreboardStore((s) => s.addHeadToHeadStat);
  const removeStat = useScoreboardStore((s) => s.removeHeadToHeadStat);
  const updateStat = useScoreboardStore((s) => s.updateHeadToHeadStat);

  const title = `${EDITOR_LABELS.sectionHeadToHead} (${String(data.stats.length)}/${String(MAX_STATS)})`;

  return (
    <Section title={title}>
      <InputField
        label={EDITOR_LABELS.headToHeadTitle}
        value={data.title}
        onChange={updateTitle}
      />

      {/* Joueur gauche */}
      <div className="text-xs text-gray-400 font-medium mt-1">
        {EDITOR_LABELS.goalSideLeft}
      </div>
      <div className="flex gap-1.5">
        <InputField
          label={EDITOR_LABELS.headToHeadPlayerName}
          value={data.playerLeft.name}
          onChange={(v) => updatePlayer('left', 'name', v)}
        />
        <InputField
          label={EDITOR_LABELS.headToHeadPlayerNumber}
          value={data.playerLeft.number}
          onChange={(v) => updatePlayer('left', 'number', v)}
        />
        <InputField
          label={EDITOR_LABELS.headToHeadPlayerTeam}
          value={data.playerLeft.team}
          onChange={(v) => updatePlayer('left', 'team', v)}
        />
      </div>

      {/* Joueur droite */}
      <div className="text-xs text-gray-400 font-medium mt-1">
        {EDITOR_LABELS.goalSideRight}
      </div>
      <div className="flex gap-1.5">
        <InputField
          label={EDITOR_LABELS.headToHeadPlayerName}
          value={data.playerRight.name}
          onChange={(v) => updatePlayer('right', 'name', v)}
        />
        <InputField
          label={EDITOR_LABELS.headToHeadPlayerNumber}
          value={data.playerRight.number}
          onChange={(v) => updatePlayer('right', 'number', v)}
        />
        <InputField
          label={EDITOR_LABELS.headToHeadPlayerTeam}
          value={data.playerRight.team}
          onChange={(v) => updatePlayer('right', 'team', v)}
        />
      </div>

      {/* Stats */}
      {data.stats.map((stat, i) => (
        <div key={`h2h-${String(i)}`} className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.headToHeadStatLeft}
            value={stat.valueLeft}
            onChange={(v) => updateStat(i, 'valueLeft', v)}
          />
          <InputField
            label={EDITOR_LABELS.headToHeadStatLabel}
            value={stat.label}
            onChange={(v) => updateStat(i, 'label', v)}
          />
          <InputField
            label={EDITOR_LABELS.headToHeadStatRight}
            value={stat.valueRight}
            onChange={(v) => updateStat(i, 'valueRight', v)}
          />
          <Button
            variant="danger"
            className="flex-shrink-0 h-8 px-2.5"
            onClick={() => removeStat(i)}
          >
            X
          </Button>
        </div>
      ))}

      {data.stats.length < MAX_STATS && (
        <Button variant="add" onClick={addStat}>
          + {EDITOR_LABELS.headToHeadAddStat}
        </Button>
      )}
    </Section>
  );
}
