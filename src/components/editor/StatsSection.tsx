import { useMemo, useCallback } from 'react';
import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { StyleOverridePanel } from '@/components/editor/StyleOverridePanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import type { ElementStyleOverride, StatsStyleRole } from '@/types/elementStyleOverride';

const MAX_LINES = 8;

const STYLE_ROLES = [
  { role: 'title', label: EDITOR_LABELS.styleRoleStatsTitle },
  { role: 'statValue', label: EDITOR_LABELS.styleRoleStatsStatValue },
  { role: 'statLabel', label: EDITOR_LABELS.styleRoleStatsStatLabel },
] as const;

export function StatsSection() {
  const stats = useScoreboardStore((s) => s.stats);
  const updateStat = useScoreboardStore((s) => s.updateStat);
  const addStat = useScoreboardStore((s) => s.addStat);
  const removeStat = useScoreboardStore((s) => s.removeStat);
  const rawOverrides = useScoreboardStore((s) => s.statsStyleOverrides);
  const updateStyleOverride = useScoreboardStore((s) => s.updateStatsStyleOverride);

  const overrides = useMemo(() => rawOverrides ?? {}, [rawOverrides]);
  const handleStyleUpdate = useCallback(
    (role: string, override: ElementStyleOverride | undefined) => {
      updateStyleOverride(role as StatsStyleRole, override);
    },
    [updateStyleOverride],
  );

  const title = `${EDITOR_LABELS.sectionStats} (${String(stats.length)}/${String(MAX_LINES)})`;

  return (
    <Section title={title}>
      {stats.map((s, i) => (
        <div
          key={`stat-${String(i)}`}
          className="bg-gray-800 rounded-md p-1.5"
        >
          <div className="flex gap-1.5 items-end">
            <InputField
              label={EDITOR_LABELS.statValLeft}
              value={s.valLeft}
              onChange={(v) => updateStat(i, 'valLeft', v)}
            />
            <InputField
              label={EDITOR_LABELS.statLabel}
              value={s.label}
              onChange={(v) => updateStat(i, 'label', v)}
            />
            <InputField
              label={EDITOR_LABELS.statValRight}
              value={s.valRight}
              onChange={(v) => updateStat(i, 'valRight', v)}
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
      {stats.length < MAX_LINES && (
        <Button variant="add" onClick={addStat}>
          + {EDITOR_LABELS.addStatLine}
        </Button>
      )}

      <StyleOverridePanel
        roles={STYLE_ROLES}
        overrides={overrides}
        onUpdate={handleStyleUpdate}
      />
    </Section>
  );
}
