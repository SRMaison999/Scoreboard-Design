import { Section } from '@/components/ui/Section';
import { Select } from '@/components/ui/Select';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { FONT_OPTIONS } from '@/constants/fonts';
import { EDITOR_LABELS } from '@/constants/labels';
import { ff } from '@/utils/font';
import { useFontSelectGroups } from '@/hooks/useFontSelectGroups';
import type { FontId, FontZone } from '@/types/fonts';

interface FontZoneConfig {
  readonly key: FontZone;
  readonly label: string;
}

const FONT_ZONES: readonly FontZoneConfig[] = [
  { key: 'fontTeams', label: EDITOR_LABELS.fontTeams },
  { key: 'fontClock', label: EDITOR_LABELS.fontClock },
  { key: 'fontBody', label: EDITOR_LABELS.fontBody },
] as const;

export function FontSection() {
  const fontTeams = useScoreboardStore((s) => s.fontTeams);
  const fontClock = useScoreboardStore((s) => s.fontClock);
  const fontBody = useScoreboardStore((s) => s.fontBody);
  const update = useScoreboardStore((s) => s.update);

  const fontGroups = useFontSelectGroups();

  const fontValues: Record<FontZone, FontId> = {
    fontTeams,
    fontClock,
    fontBody,
  };

  return (
    <Section title={EDITOR_LABELS.sectionFonts} defaultOpen={false}>
      {FONT_ZONES.map((zone) => (
        <Select
          key={zone.key}
          label={zone.label}
          options={FONT_OPTIONS.map((o) => ({
            value: o.id,
            label: o.label,
            style: { fontFamily: o.family },
          }))}
          groups={fontGroups}
          value={fontValues[zone.key]}
          onChange={(v) => update(zone.key, v as FontId)}
          style={{ fontFamily: ff(fontValues[zone.key]) }}
        />
      ))}
    </Section>
  );
}
