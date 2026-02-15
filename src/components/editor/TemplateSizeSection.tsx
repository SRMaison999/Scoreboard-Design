import { useCallback } from 'react';
import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { RESOLUTION_PRESETS } from '@/constants/resolutions';

export function TemplateSizeSection() {
  const width = useScoreboardStore((s) => s.templateWidth);
  const height = useScoreboardStore((s) => s.templateHeight);
  const update = useScoreboardStore((s) => s.update);

  const currentPreset = RESOLUTION_PRESETS.find(
    (p) => p.width === width && p.height === height,
  );
  const presetValue = currentPreset ? currentPreset.label : EDITOR_LABELS.templateCustom;

  const handlePresetChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const preset = RESOLUTION_PRESETS.find((p) => p.label === e.target.value);
      if (preset) {
        update('templateWidth', preset.width);
        update('templateHeight', preset.height);
      }
    },
    [update],
  );

  const handleWidthChange = useCallback(
    (v: string) => {
      const n = parseInt(v, 10);
      if (!isNaN(n) && n > 0) update('templateWidth', n);
    },
    [update],
  );

  const handleHeightChange = useCallback(
    (v: string) => {
      const n = parseInt(v, 10);
      if (!isNaN(n) && n > 0) update('templateHeight', n);
    },
    [update],
  );

  return (
    <Section title={EDITOR_LABELS.sectionTemplateSize}>
      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex flex-col gap-0.5">
          <label className="text-[11px] text-gray-400 font-medium">
            {EDITOR_LABELS.templatePreset}
          </label>
          <select
            value={presetValue}
            onChange={handlePresetChange}
            className="bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm outline-none w-full"
          >
            {RESOLUTION_PRESETS.map((p) => (
              <option key={p.label} value={p.label}>
                {p.label}
              </option>
            ))}
            {!currentPreset && (
              <option value={EDITOR_LABELS.templateCustom}>
                {EDITOR_LABELS.templateCustom}
              </option>
            )}
          </select>
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.templateWidth}
            value={String(width)}
            onChange={handleWidthChange}
          />
          <InputField
            label={EDITOR_LABELS.templateHeight}
            value={String(height)}
            onChange={handleHeightChange}
          />
        </div>
      </div>
    </Section>
  );
}
