import { Section } from '@/components/ui/Section';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { COLOR_PRESETS } from '@/constants/colors';
import { EDITOR_LABELS } from '@/constants/labels';
import { cn } from '@/lib/utils';
import type { ColorKey } from '@/types/colors';
import type { BgMode } from '@/types/scoreboard';

function useColorHandlers() {
  const colors = useScoreboardStore((s) => s.colors);
  const opacities = useScoreboardStore((s) => s.opacities);
  const updateColor = useScoreboardStore((s) => s.updateColor);
  const updateOpacity = useScoreboardStore((s) => s.updateOpacity);
  return { colors, opacities, updateColor, updateOpacity };
}

function ColorRow({
  colorKey,
  label,
}: {
  readonly colorKey: ColorKey;
  readonly label: string;
}) {
  const { colors, opacities, updateColor, updateOpacity } =
    useColorHandlers();

  return (
    <ColorPicker
      label={label}
      value={colors[colorKey]}
      onChange={(v) => updateColor(colorKey, v)}
      opacity={opacities[colorKey]}
      onOpacityChange={(v) => updateOpacity(colorKey, v)}
    />
  );
}

const BG_MODES: readonly { readonly key: BgMode; readonly label: string }[] = [
  { key: 'uniform', label: EDITOR_LABELS.bgModeUniform },
  { key: 'gradient', label: EDITOR_LABELS.bgModeGradient },
];

function useUniformBgHandlers() {
  const colors = useScoreboardStore((s) => s.colors);
  const opacities = useScoreboardStore((s) => s.opacities);
  const updateColor = useScoreboardStore((s) => s.updateColor);
  const updateOpacity = useScoreboardStore((s) => s.updateOpacity);

  const onColorChange = (value: string) => {
    updateColor('bgTop', value);
    updateColor('bgMid', value);
    updateColor('bgBot', value);
  };

  const onOpacityChange = (value: number) => {
    updateOpacity('bgTop', value);
    updateOpacity('bgMid', value);
    updateOpacity('bgBot', value);
  };

  return { color: colors.bgTop, opacity: opacities.bgTop, onColorChange, onOpacityChange };
}

function BackgroundColors() {
  const bgMode = useScoreboardStore((s) => s.bgMode);
  const update = useScoreboardStore((s) => s.update);
  const { color, opacity, onColorChange, onOpacityChange } = useUniformBgHandlers();

  return (
    <Section title={EDITOR_LABELS.sectionColorsBg} defaultOpen={false}>
      <div className="flex gap-1.5">
        {BG_MODES.map((mode) => (
          <Button
            key={mode.key}
            variant="ghost"
            className={cn(
              'flex-1 text-[11px]',
              bgMode === mode.key && 'border-2 border-sky-300',
            )}
            onClick={() => update('bgMode', mode.key)}
          >
            {mode.label}
          </Button>
        ))}
      </div>

      {bgMode === 'uniform' ? (
        <ColorPicker
          label={EDITOR_LABELS.colorBgUniform}
          value={color}
          onChange={onColorChange}
          opacity={opacity}
          onOpacityChange={onOpacityChange}
        />
      ) : (
        <>
          <ColorRow colorKey="bgTop" label={EDITOR_LABELS.colorBgTop} />
          <ColorRow colorKey="bgMid" label={EDITOR_LABELS.colorBgMid} />
          <ColorRow colorKey="bgBot" label={EDITOR_LABELS.colorBgBot} />
        </>
      )}
    </Section>
  );
}

function HeaderColors() {
  const colors = useScoreboardStore((s) => s.colors);
  const updateColor = useScoreboardStore((s) => s.updateColor);

  return (
    <Section title={EDITOR_LABELS.sectionColorsHeader} defaultOpen={false}>
      <ColorRow colorKey="teamName" label={EDITOR_LABELS.colorTeamName} />
      <ColorRow colorKey="score" label={EDITOR_LABELS.colorScore} />
      <ColorRow colorKey="scoreBox" label={EDITOR_LABELS.colorScoreBox} />
      <div className="flex gap-1.5">
        <Button
          variant="ghost"
          className={
            colors.scoreBox === ''
              ? 'flex-1 border-2 border-sky-300 text-[11px]'
              : 'flex-1 text-[11px]'
          }
          onClick={() => updateColor('scoreBox', '')}
        >
          {EDITOR_LABELS.colorScoreBoxNone}
        </Button>
      </div>
      <ColorRow colorKey="time" label={EDITOR_LABELS.colorTime} />
      <ColorRow colorKey="clockBox" label={EDITOR_LABELS.colorClockBox} />
      <ColorRow colorKey="period" label={EDITOR_LABELS.colorPeriod} />
    </Section>
  );
}

function BodyColors() {
  return (
    <Section title={EDITOR_LABELS.sectionColorsBody} defaultOpen={false}>
      <ColorRow colorKey="titleText" label={EDITOR_LABELS.colorTitleText} />
      <ColorRow colorKey="statVal" label={EDITOR_LABELS.colorStatVal} />
      <ColorRow colorKey="statLabel" label={EDITOR_LABELS.colorStatLabel} />
    </Section>
  );
}

function PenaltyColors() {
  const showPenalties = useScoreboardStore((s) => s.showPenalties);

  if (!showPenalties) {
    return null;
  }

  return (
    <Section
      title={EDITOR_LABELS.sectionColorsPenalties}
      defaultOpen={false}
    >
      <ColorRow
        colorKey="penaltyTime"
        label={EDITOR_LABELS.colorPenaltyTime}
      />
      <ColorRow
        colorKey="penaltyNumber"
        label={EDITOR_LABELS.colorPenaltyNumber}
      />
    </Section>
  );
}

function PresetsSection() {
  const applyPreset = useScoreboardStore((s) => s.applyPreset);

  return (
    <Section title={EDITOR_LABELS.sectionPresets} defaultOpen={false}>
      {COLOR_PRESETS.map((preset) => (
        <Button
          key={preset.label}
          variant="ghost"
          className="w-full text-left text-[13px] font-semibold tracking-wide py-2 px-3"
          onClick={() => applyPreset(preset)}
        >
          {preset.label}
        </Button>
      ))}
    </Section>
  );
}

export function ColorSection() {
  return (
    <>
      <BackgroundColors />
      <HeaderColors />
      <BodyColors />
      <PenaltyColors />
      <PresetsSection />
    </>
  );
}
