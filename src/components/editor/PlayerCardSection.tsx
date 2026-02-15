import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { HOCKEY_NATIONS } from '@/constants/nations';
import { EDITOR_LABELS } from '@/constants/labels';

const NATION_OPTIONS = HOCKEY_NATIONS.map((n) => ({
  value: n.noc,
  label: `${n.noc} - ${n.name}`,
}));

const MAX_STATS = 8;

export function PlayerCardSection() {
  const data = useScoreboardStore((s) => s.playerCardData);
  const updateField = useScoreboardStore((s) => s.updatePlayerCardField);
  const addStat = useScoreboardStore((s) => s.addPlayerCardStat);
  const removeStat = useScoreboardStore((s) => s.removePlayerCardStat);
  const updateStat = useScoreboardStore((s) => s.updatePlayerCardStat);

  const title = `${EDITOR_LABELS.sectionPlayerCard} (${String(data.stats.length)}/${String(MAX_STATS)})`;

  return (
    <Section title={title}>
      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.playerCardTitle}
            value={data.title}
            onChange={(v) => updateField('title', v)}
          />
          <InputField
            label={EDITOR_LABELS.playerCardSubtitle}
            value={data.subtitle}
            onChange={(v) => updateField('subtitle', v)}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.playerCardName}
            value={data.playerName}
            onChange={(v) => updateField('playerName', v)}
          />
          <InputField
            label={EDITOR_LABELS.playerCardNumber}
            value={data.playerNumber}
            onChange={(v) => updateField('playerNumber', v)}
          />
        </div>
      </div>

      <Select
        label={EDITOR_LABELS.playerCardTeam}
        options={NATION_OPTIONS}
        value={data.playerTeam}
        onChange={(v) => updateField('playerTeam', v)}
      />

      {data.stats.map((s, i) => (
        <div
          key={`pcs-${String(i)}`}
          className="bg-gray-800 rounded-md p-1.5"
        >
          <div className="flex gap-1.5 items-end">
            <InputField
              label={EDITOR_LABELS.playerCardStatLabel}
              value={s.label}
              onChange={(v) => updateStat(i, 'label', v)}
            />
            <InputField
              label={EDITOR_LABELS.playerCardStatValue}
              value={s.value}
              onChange={(v) => updateStat(i, 'value', v)}
            />
            <Button
              variant="danger"
              className="flex-shrink-0 h-8 px-2.5"
              onClick={() => removeStat(i)}
            >
              X
            </Button>
          </div>
        </div>
      ))}

      {data.stats.length < MAX_STATS && (
        <Button variant="add" onClick={addStat}>
          + {EDITOR_LABELS.playerCardAddStat}
        </Button>
      )}
    </Section>
  );
}
