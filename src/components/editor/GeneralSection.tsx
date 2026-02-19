import { Section } from '@/components/ui/Section';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

export function GeneralSection() {
  const showPenalties = useScoreboardStore((s) => s.showPenalties);
  const update = useScoreboardStore((s) => s.update);

  return (
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
  );
}
