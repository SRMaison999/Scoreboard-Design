import { useMemo, useCallback } from 'react';
import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { StyleOverridePanel } from '@/components/editor/StyleOverridePanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import type { SelectOption } from '@/components/ui/Select';
import type { SpectatorsPreset } from '@/types/bodyTypes/spectators';
import type { ElementStyleOverride, SpectatorsStyleRole } from '@/types/elementStyleOverride';

const PRESET_OPTIONS: readonly SelectOption[] = [
  { value: 'centered', label: EDITOR_LABELS.spectatorsPresetCentered },
  { value: 'banner', label: EDITOR_LABELS.spectatorsPresetBanner },
  { value: 'compact', label: EDITOR_LABELS.spectatorsPresetCompact },
  { value: 'detailed', label: EDITOR_LABELS.spectatorsPresetDetailed },
  { value: 'free', label: EDITOR_LABELS.spectatorsPresetFree },
];

const STYLE_ROLES = [
  { role: 'title', label: EDITOR_LABELS.styleRoleSpectatorsTitle },
  { role: 'count', label: EDITOR_LABELS.styleRoleSpectatorsCount },
  { role: 'label', label: EDITOR_LABELS.styleRoleSpectatorsLabel },
  { role: 'venue', label: EDITOR_LABELS.styleRoleSpectatorsVenue },
  { role: 'capacity', label: EDITOR_LABELS.styleRoleSpectatorsCapacity },
] as const;

export function SpectatorsSection() {
  const data = useScoreboardStore((s) => s.spectatorsData);
  const updateField = useScoreboardStore((s) => s.updateSpectatorsField);
  const updateStyleOverride = useScoreboardStore((s) => s.updateSpectatorsStyleOverride);

  const overrides = useMemo(() => data.styleOverrides ?? {}, [data.styleOverrides]);

  const handleStyleUpdate = useCallback(
    (role: string, override: ElementStyleOverride | undefined) => {
      updateStyleOverride(role as SpectatorsStyleRole, override);
    },
    [updateStyleOverride],
  );

  return (
    <Section title={EDITOR_LABELS.sectionSpectators}>
      <InputField
        label={EDITOR_LABELS.spectatorsTitle}
        value={data.title}
        onChange={(v) => updateField('title', v)}
      />

      <Select
        label={EDITOR_LABELS.spectatorsPreset}
        options={PRESET_OPTIONS}
        value={data.preset}
        onChange={(v) => updateField('preset', v as SpectatorsPreset)}
      />

      <InputField
        label={EDITOR_LABELS.spectatorsCount}
        value={data.count}
        onChange={(v) => updateField('count', v)}
      />

      <InputField
        label={EDITOR_LABELS.spectatorsLabel}
        value={data.label}
        onChange={(v) => updateField('label', v)}
      />

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={data.showVenue}
            onChange={(e) => updateField('showVenue', e.target.checked)}
            className="accent-sky-300"
          />
          {EDITOR_LABELS.spectatorsShowVenue}
        </label>
        {data.showVenue && (
          <InputField
            label={EDITOR_LABELS.spectatorsVenue}
            value={data.venue}
            onChange={(v) => updateField('venue', v)}
          />
        )}

        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={data.showCapacity}
            onChange={(e) => updateField('showCapacity', e.target.checked)}
            className="accent-sky-300"
          />
          {EDITOR_LABELS.spectatorsShowCapacity}
        </label>
        {data.showCapacity && (
          <InputField
            label={EDITOR_LABELS.spectatorsCapacity}
            value={data.capacity}
            onChange={(v) => updateField('capacity', v)}
          />
        )}
      </div>

      <StyleOverridePanel
        roles={STYLE_ROLES}
        overrides={overrides}
        onUpdate={handleStyleUpdate}
      />
    </Section>
  );
}
