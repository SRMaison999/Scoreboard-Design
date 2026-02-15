import { useCallback } from 'react';
import { Section } from '@/components/ui/Section';
import { Select } from '@/components/ui/Select';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import type { EntryAnimation, EasingType, AnimationConfig } from '@/types/animation';

const ENTRY_OPTIONS = [
  { value: 'none', label: EDITOR_LABELS.animNone },
  { value: 'fade', label: EDITOR_LABELS.animFade },
  { value: 'slide-top', label: EDITOR_LABELS.animSlideTop },
  { value: 'slide-bottom', label: EDITOR_LABELS.animSlideBottom },
  { value: 'slide-left', label: EDITOR_LABELS.animSlideLeft },
  { value: 'slide-right', label: EDITOR_LABELS.animSlideRight },
] as const;

const EASING_OPTIONS = [
  { value: 'linear', label: EDITOR_LABELS.animEasingLinear },
  { value: 'ease', label: EDITOR_LABELS.animEasingEase },
  { value: 'ease-in', label: EDITOR_LABELS.animEasingEaseIn },
  { value: 'ease-out', label: EDITOR_LABELS.animEasingEaseOut },
  { value: 'ease-in-out', label: EDITOR_LABELS.animEasingEaseInOut },
] as const;

export function AnimationSection() {
  const config = useScoreboardStore((s) => s.animationConfig);
  const visible = useScoreboardStore((s) => s.scoreboardVisible);
  const update = useScoreboardStore((s) => s.update);

  const updateConfig = useCallback(
    <K extends keyof AnimationConfig>(key: K, value: AnimationConfig[K]) => {
      update('animationConfig', { ...config, [key]: value });
    },
    [config, update],
  );

  const toggleVisible = useCallback(() => {
    update('scoreboardVisible', !visible);
  }, [visible, update]);

  return (
    <Section title={EDITOR_LABELS.sectionAnimations} defaultOpen={false}>
      {/* Bouton afficher/masquer */}
      <button
        type="button"
        onClick={toggleVisible}
        className="w-full py-1.5 rounded-md text-sm font-medium bg-green-900 text-gray-100 hover:bg-green-800 transition-colors"
      >
        {visible ? EDITOR_LABELS.animHideScoreboard : EDITOR_LABELS.animShowScoreboard}
      </button>

      {/* Entrée */}
      <div className="bg-gray-800 rounded-md p-1.5 flex flex-col gap-1.5">
        <Select
          label={EDITOR_LABELS.animEntryAnimation}
          options={[...ENTRY_OPTIONS]}
          value={config.entryAnimation}
          onChange={(v) => updateConfig('entryAnimation', v as EntryAnimation)}
        />
        <RangeField
          label={EDITOR_LABELS.animDuration}
          value={config.entryDuration}
          min={100}
          max={2000}
          step={50}
          onChange={(v) => updateConfig('entryDuration', v)}
        />
        <Select
          label={EDITOR_LABELS.animEasing}
          options={[...EASING_OPTIONS]}
          value={config.entryEasing}
          onChange={(v) => updateConfig('entryEasing', v as EasingType)}
        />
      </div>

      {/* Sortie */}
      <div className="bg-gray-800 rounded-md p-1.5 flex flex-col gap-1.5">
        <Select
          label={EDITOR_LABELS.animExitAnimation}
          options={[...ENTRY_OPTIONS]}
          value={config.exitAnimation}
          onChange={(v) => updateConfig('exitAnimation', v as EntryAnimation)}
        />
        <RangeField
          label={EDITOR_LABELS.animDuration}
          value={config.exitDuration}
          min={100}
          max={2000}
          step={50}
          onChange={(v) => updateConfig('exitDuration', v)}
        />
        <Select
          label={EDITOR_LABELS.animEasing}
          options={[...EASING_OPTIONS]}
          value={config.exitEasing}
          onChange={(v) => updateConfig('exitEasing', v as EasingType)}
        />
      </div>

      {/* Score pop */}
      <div className="bg-gray-800 rounded-md p-1.5 flex flex-col gap-1.5">
        <CheckboxField
          label={EDITOR_LABELS.animScorePop}
          checked={config.scorePopEnabled}
          onChange={(v) => updateConfig('scorePopEnabled', v)}
        />
        {config.scorePopEnabled && (
          <RangeField
            label={EDITOR_LABELS.animScorePopDuration}
            value={config.scorePopDuration}
            min={100}
            max={1000}
            step={50}
            onChange={(v) => updateConfig('scorePopDuration', v)}
          />
        )}
      </div>

      {/* Penalty flash */}
      <div className="bg-gray-800 rounded-md p-1.5 flex flex-col gap-1.5">
        <CheckboxField
          label={EDITOR_LABELS.animPenaltyFlash}
          checked={config.penaltyFlashEnabled}
          onChange={(v) => updateConfig('penaltyFlashEnabled', v)}
        />
        {config.penaltyFlashEnabled && (
          <RangeField
            label={EDITOR_LABELS.animPenaltyFlashDuration}
            value={config.penaltyFlashDuration}
            min={200}
            max={1500}
            step={50}
            onChange={(v) => updateConfig('penaltyFlashDuration', v)}
          />
        )}
      </div>

      {/* Clock pulse */}
      <div className="bg-gray-800 rounded-md p-1.5 flex flex-col gap-1.5">
        <CheckboxField
          label={EDITOR_LABELS.animClockPulse}
          checked={config.clockPulseEnabled}
          onChange={(v) => updateConfig('clockPulseEnabled', v)}
        />
        {config.clockPulseEnabled && (
          <RangeField
            label={EDITOR_LABELS.animClockPulseThreshold}
            value={config.clockPulseThreshold}
            min={5}
            max={60}
            step={1}
            onChange={(v) => updateConfig('clockPulseThreshold', v)}
          />
        )}
      </div>
    </Section>
  );
}

/* Sous-composants internes */

interface RangeFieldProps {
  readonly label: string;
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly onChange: (value: number) => void;
}

function RangeField({ label, value, min, max, step, onChange }: RangeFieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-gray-400 font-medium">{label}</label>
        <span className="text-[11px] text-gray-300 tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-sky-300"
      />
    </div>
  );
}

interface CheckboxFieldProps {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (value: boolean) => void;
}

function CheckboxField({ label, checked, onChange }: CheckboxFieldProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-sky-300"
      />
      <span className="text-[11px] text-gray-300 font-medium">{label}</span>
    </label>
  );
}
