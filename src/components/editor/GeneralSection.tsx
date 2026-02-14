import { Section } from '@/components/ui/Section';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { BODY_TYPES } from '@/constants/bodyTypes';
import { EDITOR_LABELS } from '@/constants/labels';
import type { BodyTypeId } from '@/types/scoreboard';

export function GeneralSection() {
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const showPenalties = useScoreboardStore((s) => s.showPenalties);
  const update = useScoreboardStore((s) => s.update);

  return (
    <>
      <Section title={EDITOR_LABELS.sectionBodyType}>
        {BODY_TYPES.map((t) => (
          <label
            key={t.id}
            className="flex items-center gap-2 cursor-pointer text-[13px]"
          >
            <input
              type="radio"
              checked={bodyType === t.id}
              onChange={() => update('bodyType', t.id as BodyTypeId)}
              className="accent-sky-300"
            />
            {t.label}
          </label>
        ))}
      </Section>

      <Section title={EDITOR_LABELS.sectionPenalties}>
        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={showPenalties}
            onChange={(e) => update('showPenalties', e.target.checked)}
            className="accent-sky-300"
          />
          {EDITOR_LABELS.showPenalties}
        </label>
      </Section>
    </>
  );
}
