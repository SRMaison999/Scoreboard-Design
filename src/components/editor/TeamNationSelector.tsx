/**
 * Sélecteur de nation, nom affiché et score pour un champ
 * lié à une équipe (team-name, score-display, flag-display).
 * Lit le côté (left/right) depuis la config du champ pour
 * déterminer s'il s'agit de l'équipe 1 ou 2.
 */

import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { HOCKEY_NATIONS } from '@/constants/nations';
import type { FieldElementConfig } from '@/types/customField';

const NATION_OPTIONS = HOCKEY_NATIONS.map((n) => ({
  value: n.noc,
  label: `${n.noc} - ${n.name}`,
}));

interface TeamNationSelectorProps {
  readonly element: FieldElementConfig;
}

export function TeamNationSelector({ element }: TeamNationSelectorProps) {
  const config = element.config as { side: string };
  const side = config.side ?? 'left';
  const isLeft = side === 'left';

  const team = useScoreboardStore((s) => isLeft ? s.team1 : s.team2);
  const displayName = useScoreboardStore((s) => isLeft ? s.teamDisplayName1 : s.teamDisplayName2);
  const score = useScoreboardStore((s) => isLeft ? s.score1 : s.score2);
  const update = useScoreboardStore((s) => s.update);

  const teamKey = isLeft ? 'team1' : 'team2';
  const displayNameKey = isLeft ? 'teamDisplayName1' : 'teamDisplayName2';
  const scoreKey = isLeft ? 'score1' : 'score2';

  return (
    <div className="flex flex-col gap-2 rounded-md border border-gray-800 bg-gray-900/50 p-2" data-testid="team-nation-selector">
      <Select
        label={CUSTOM_FIELD_LABELS.configTeamNation}
        options={NATION_OPTIONS}
        value={team}
        onChange={(v) => update(teamKey, v)}
        placeholder={CUSTOM_FIELD_LABELS.configTeamNationPlaceholder}
      />
      <InputField
        label={CUSTOM_FIELD_LABELS.configTeamDisplayName}
        value={displayName}
        onChange={(v) => update(displayNameKey, v)}
      />
      <p className="text-[10px] text-gray-600 -mt-1">{CUSTOM_FIELD_LABELS.configTeamDisplayNameHint}</p>
      <InputField
        label={CUSTOM_FIELD_LABELS.configTeamScore}
        value={score}
        onChange={(v) => update(scoreKey, v)}
      />
    </div>
  );
}
