import { Section } from '@/components/ui/Section';
import { Select } from '@/components/ui/Select';
import { InputField } from '@/components/ui/InputField';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { HOCKEY_NATIONS } from '@/constants/nations';
import { EDITOR_LABELS } from '@/constants/labels';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

const NATION_OPTIONS = HOCKEY_NATIONS.map((n) => ({
  value: n.noc,
  label: `${n.noc} - ${n.name}`,
}));

export function HeaderSection() {
  const team1 = useScoreboardStore((s) => s.team1);
  const team2 = useScoreboardStore((s) => s.team2);
  const displayName1 = useScoreboardStore((s) => s.teamDisplayName1);
  const displayName2 = useScoreboardStore((s) => s.teamDisplayName2);
  const score1 = useScoreboardStore((s) => s.score1);
  const score2 = useScoreboardStore((s) => s.score2);
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const update = useScoreboardStore((s) => s.update);

  return (
    <Section title={EDITOR_LABELS.sectionHeader}>
      {bodyType === 14 && (
        <p className="text-[11px] text-sky-400/70 -mt-1 mb-1">
          {CUSTOM_FIELD_LABELS.headerLayoutLibreHint}
        </p>
      )}
      <div className="flex gap-2">
        <Select
          label={EDITOR_LABELS.team1Label}
          options={NATION_OPTIONS}
          value={team1}
          onChange={(v) => update('team1', v)}
          className="flex-1"
        />
        <Select
          label={EDITOR_LABELS.team2Label}
          options={NATION_OPTIONS}
          value={team2}
          onChange={(v) => update('team2', v)}
          className="flex-1"
        />
      </div>
      <div className="flex gap-2">
        <InputField
          label={EDITOR_LABELS.teamDisplayName1Label}
          value={displayName1}
          onChange={(v) => update('teamDisplayName1', v)}
        />
        <InputField
          label={EDITOR_LABELS.teamDisplayName2Label}
          value={displayName2}
          onChange={(v) => update('teamDisplayName2', v)}
        />
      </div>
      <p className="text-[10px] text-gray-600 -mt-1">
        {EDITOR_LABELS.teamDisplayNameHint}
      </p>
      <div className="flex gap-2">
        <InputField
          label={EDITOR_LABELS.score1Label}
          value={score1}
          onChange={(v) => update('score1', v)}
        />
        <InputField
          label={EDITOR_LABELS.score2Label}
          value={score2}
          onChange={(v) => update('score2', v)}
        />
      </div>
    </Section>
  );
}
