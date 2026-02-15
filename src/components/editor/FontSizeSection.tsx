import { Section } from '@/components/ui/Section';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { FONT_SIZE_RANGES } from '@/types/fontSizes';
import type { FontSizeKey } from '@/types/fontSizes';

interface SliderRowProps {
  readonly label: string;
  readonly fsKey: FontSizeKey;
  readonly value: number;
  readonly onChange: (key: FontSizeKey, value: number) => void;
}

function SliderRow({ label, fsKey, value, onChange }: SliderRowProps) {
  const range = FONT_SIZE_RANGES[fsKey];
  const isAuto = range.min === 0 && value === 0;
  const displayValue = isAuto ? EDITOR_LABELS.fontSizeAuto : `${value}px`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-gray-400 w-28 flex-shrink-0 truncate">
        {label}
      </span>
      <input
        type="range"
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        onChange={(e) => onChange(fsKey, Number(e.target.value))}
        className="flex-1 accent-sky-400 h-1"
      />
      <span className="text-[11px] text-gray-300 w-12 text-right tabular-nums">
        {displayValue}
      </span>
    </div>
  );
}

const HEADER_SIZES: { key: FontSizeKey; label: string }[] = [
  { key: 'teamName', label: EDITOR_LABELS.fontSizeTeamName },
  { key: 'score', label: EDITOR_LABELS.fontSizeScore },
];

const CLOCK_SIZES: { key: FontSizeKey; label: string }[] = [
  { key: 'clockTime', label: EDITOR_LABELS.fontSizeClockTime },
  { key: 'period', label: EDITOR_LABELS.fontSizePeriod },
];

const BODY_SIZES: { key: FontSizeKey; label: string }[] = [
  { key: 'title', label: EDITOR_LABELS.fontSizeTitle },
  { key: 'statValue', label: EDITOR_LABELS.fontSizeStatValue },
  { key: 'statLabel', label: EDITOR_LABELS.fontSizeStatLabel },
];

const PENALTY_SIZES: { key: FontSizeKey; label: string }[] = [
  { key: 'penaltyTime', label: EDITOR_LABELS.fontSizePenaltyTime },
  { key: 'penaltyNumber', label: EDITOR_LABELS.fontSizePenaltyNumber },
];

export function FontSizeSection() {
  const fontSizes = useScoreboardStore((s) => s.fontSizes);
  const updateFontSize = useScoreboardStore((s) => s.updateFontSize);

  return (
    <Section title={EDITOR_LABELS.sectionFontSizes} defaultOpen={false}>
      <div className="bg-gray-800 rounded-md p-2 flex flex-col gap-1.5">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
          {EDITOR_LABELS.sectionHeader}
        </span>
        {HEADER_SIZES.map((s) => (
          <SliderRow
            key={s.key}
            label={s.label}
            fsKey={s.key}
            value={fontSizes[s.key]}
            onChange={updateFontSize}
          />
        ))}
      </div>

      <div className="bg-gray-800 rounded-md p-2 flex flex-col gap-1.5">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
          {EDITOR_LABELS.sectionClock}
        </span>
        {CLOCK_SIZES.map((s) => (
          <SliderRow
            key={s.key}
            label={s.label}
            fsKey={s.key}
            value={fontSizes[s.key]}
            onChange={updateFontSize}
          />
        ))}
      </div>

      <div className="bg-gray-800 rounded-md p-2 flex flex-col gap-1.5">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
          {EDITOR_LABELS.sectionColorsBody}
        </span>
        {BODY_SIZES.map((s) => (
          <SliderRow
            key={s.key}
            label={s.label}
            fsKey={s.key}
            value={fontSizes[s.key]}
            onChange={updateFontSize}
          />
        ))}
      </div>

      <div className="bg-gray-800 rounded-md p-2 flex flex-col gap-1.5">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
          {EDITOR_LABELS.sectionPenaltiesPrefix}
        </span>
        {PENALTY_SIZES.map((s) => (
          <SliderRow
            key={s.key}
            label={s.label}
            fsKey={s.key}
            value={fontSizes[s.key]}
            onChange={updateFontSize}
          />
        ))}
      </div>
    </Section>
  );
}
