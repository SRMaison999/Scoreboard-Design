import { useCallback } from 'react';
import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { PhaseSection } from './PhaseSection';
import { DemoSection } from './DemoSection';
import type { ClockBoxMode } from '@/types/scoreboard';

const CLOCK_BOX_OPTIONS = [
  { value: 'never', label: EDITOR_LABELS.clockBoxNever },
  { value: 'always', label: EDITOR_LABELS.clockBoxAlways },
  { value: 'stopped', label: EDITOR_LABELS.clockBoxStopped },
  { value: 'running', label: EDITOR_LABELS.clockBoxRunning },
] as const;

export function ClockSection() {
  const showClock = useScoreboardStore((s) => s.showClock);
  const time = useScoreboardStore((s) => s.time);
  const period = useScoreboardStore((s) => s.period);
  const clockBoxMode = useScoreboardStore((s) => s.clockBoxMode);
  const periodOptions = useScoreboardStore((s) => s.periodOptions);
  const update = useScoreboardStore((s) => s.update);
  const stopClock = useScoreboardStore((s) => s.stopClock);

  const periodSelectOptions = periodOptions.map((p) => ({
    value: p.label,
    label: p.label,
  }));

  const handleTimeChange = useCallback(
    (v: string) => {
      update('time', v);
      stopClock();
    },
    [update, stopClock],
  );

  const handlePeriodChange = useCallback(
    (v: string) => {
      update('period', v);
      const phase = periodOptions.find((p) => p.label === v);
      if (phase) {
        update('time', phase.duration);
      }
    },
    [update, periodOptions],
  );

  return (
    <Section title={EDITOR_LABELS.sectionClock}>
      <label className="flex items-center gap-2 cursor-pointer text-[13px]">
        <input
          type="checkbox"
          checked={showClock}
          onChange={(e) => update('showClock', e.target.checked)}
          className="accent-sky-300"
        />
        {EDITOR_LABELS.showClock}
      </label>

      {showClock && (
        <>
          <InputField
            label={EDITOR_LABELS.timeLabel}
            value={time}
            onChange={handleTimeChange}
          />

          <Select
            label={EDITOR_LABELS.activePhase}
            options={periodSelectOptions}
            value={period}
            onChange={handlePeriodChange}
            placeholder={EDITOR_LABELS.noPhase}
          />

          <PhaseSection />
          <DemoSection />

          <Select
            label={EDITOR_LABELS.clockBoxLabel}
            options={[...CLOCK_BOX_OPTIONS]}
            value={clockBoxMode}
            onChange={(v) => update('clockBoxMode', v as ClockBoxMode)}
          />
        </>
      )}
    </Section>
  );
}
