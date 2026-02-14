import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

export function TitleSection() {
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const titleCenter = useScoreboardStore((s) => s.titleCenter);
  const titleLeft = useScoreboardStore((s) => s.titleLeft);
  const titleRight = useScoreboardStore((s) => s.titleRight);
  const update = useScoreboardStore((s) => s.update);

  const showCenter = bodyType === 1 || bodyType === 3;

  return (
    <Section title={EDITOR_LABELS.sectionTitles}>
      {showCenter && (
        <InputField
          label={EDITOR_LABELS.titleCenter}
          value={titleCenter}
          onChange={(v) => update('titleCenter', v)}
        />
      )}
      {bodyType === 2 && (
        <>
          <InputField
            label={EDITOR_LABELS.titleLeft}
            value={titleLeft}
            onChange={(v) => update('titleLeft', v)}
          />
          <InputField
            label={EDITOR_LABELS.titleRight}
            value={titleRight}
            onChange={(v) => update('titleRight', v)}
          />
        </>
      )}
    </Section>
  );
}
