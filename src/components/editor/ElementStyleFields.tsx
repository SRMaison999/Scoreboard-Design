/**
 * Champs de style pour un ElementStyleOverride individuel.
 * Rendu compact : chaque propriété sur une ligne.
 */

import { useMemo } from 'react';
import { Select } from '@/components/ui/Select';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { EDITOR_LABELS } from '@/constants/labels';
import { FONT_OPTIONS, FONT_CATEGORY_LABELS, FONT_CATEGORY_ORDER } from '@/constants/fonts';
import { STYLE_OVERRIDE_RANGES } from '@/types/elementStyleOverride';
import { cn } from '@/lib/utils';
import type { SelectOptionGroup } from '@/components/ui/Select';
import type { ElementStyleOverride, TextTransformValue } from '@/types/elementStyleOverride';
import type { FontId } from '@/types/fonts';

interface ElementStyleFieldsProps {
  readonly override: ElementStyleOverride | undefined;
  readonly onSetFontSize: (v: number) => void;
  readonly onSetFontWeight: (v: number) => void;
  readonly onSetFontFamily: (v: FontId) => void;
  readonly onSetLetterSpacing: (v: number) => void;
  readonly onSetTextTransform: (v: TextTransformValue) => void;
  readonly onSetColor: (v: string) => void;
  readonly onSetOpacity: (v: number) => void;
  readonly onClearField: (field: keyof ElementStyleOverride) => void;
}

const WEIGHT_OPTIONS = STYLE_OVERRIDE_RANGES.fontWeight.options.map((w) => ({
  value: String(w),
  label: String(w),
}));

const TEXT_TRANSFORM_OPTIONS = [
  { value: 'none', label: EDITOR_LABELS.styleOverrideTextTransformNone },
  { value: 'uppercase', label: EDITOR_LABELS.styleOverrideTextTransformUppercase },
  { value: 'lowercase', label: EDITOR_LABELS.styleOverrideTextTransformLowercase },
];

function useFontGroups(): readonly SelectOptionGroup[] {
  return useMemo(() => {
    return FONT_CATEGORY_ORDER.map((cat) => ({
      label: FONT_CATEGORY_LABELS[cat],
      options: FONT_OPTIONS
        .filter((f) => f.category === cat)
        .map((f) => ({
          value: f.id,
          label: f.label,
          style: { fontFamily: f.family } as React.CSSProperties,
        })),
    }));
  }, []);
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  onClear,
}: {
  readonly label: string;
  readonly value: number | undefined;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly onChange: (v: number) => void;
  readonly onClear: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-gray-400 w-[100px] flex-shrink-0">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value ?? ''}
        placeholder={EDITOR_LABELS.styleOverrideUseGlobal}
        onChange={(e) => {
          const n = parseFloat(e.target.value);
          if (!isNaN(n)) onChange(n);
        }}
        className={cn(
          'flex-1 bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5',
          'text-gray-100 text-[11px] font-mono outline-none min-w-0',
        )}
      />
      {value !== undefined && (
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] text-gray-500 hover:text-gray-300 flex-shrink-0"
        >
          X
        </button>
      )}
    </div>
  );
}

export function ElementStyleFields({
  override,
  onSetFontSize,
  onSetFontWeight,
  onSetFontFamily,
  onSetLetterSpacing,
  onSetTextTransform,
  onSetColor,
  onSetOpacity,
  onClearField,
}: ElementStyleFieldsProps) {
  const fontGroups = useFontGroups();
  const ov = override ?? {};

  return (
    <div className="flex flex-col gap-1.5 pl-2 border-l border-gray-700">
      <NumberField
        label={EDITOR_LABELS.styleOverrideFontSize}
        value={ov.fontSize}
        min={STYLE_OVERRIDE_RANGES.fontSize.min}
        max={STYLE_OVERRIDE_RANGES.fontSize.max}
        step={STYLE_OVERRIDE_RANGES.fontSize.step}
        onChange={onSetFontSize}
        onClear={() => onClearField('fontSize')}
      />

      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-gray-400 w-[100px] flex-shrink-0">
          {EDITOR_LABELS.styleOverrideFontWeight}
        </span>
        <Select
          value={ov.fontWeight !== undefined ? String(ov.fontWeight) : ''}
          options={WEIGHT_OPTIONS}
          onChange={(v) => onSetFontWeight(Number(v))}
          placeholder={EDITOR_LABELS.styleOverrideUseGlobal}
          className="flex-1 text-[11px] py-0.5"
        />
        {ov.fontWeight !== undefined && (
          <button
            type="button"
            onClick={() => onClearField('fontWeight')}
            className="text-[10px] text-gray-500 hover:text-gray-300 flex-shrink-0"
          >
            X
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-gray-400 w-[100px] flex-shrink-0">
          {EDITOR_LABELS.styleOverrideFontFamily}
        </span>
        <Select
          value={ov.fontFamily ?? ''}
          options={[]}
          groups={fontGroups}
          onChange={(v) => onSetFontFamily(v as FontId)}
          placeholder={EDITOR_LABELS.styleOverrideUseGlobal}
          className="flex-1 text-[11px] py-0.5"
        />
        {ov.fontFamily !== undefined && (
          <button
            type="button"
            onClick={() => onClearField('fontFamily')}
            className="text-[10px] text-gray-500 hover:text-gray-300 flex-shrink-0"
          >
            X
          </button>
        )}
      </div>

      <NumberField
        label={EDITOR_LABELS.styleOverrideLetterSpacing}
        value={ov.letterSpacing}
        min={STYLE_OVERRIDE_RANGES.letterSpacing.min}
        max={STYLE_OVERRIDE_RANGES.letterSpacing.max}
        step={STYLE_OVERRIDE_RANGES.letterSpacing.step}
        onChange={onSetLetterSpacing}
        onClear={() => onClearField('letterSpacing')}
      />

      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-gray-400 w-[100px] flex-shrink-0">
          {EDITOR_LABELS.styleOverrideTextTransform}
        </span>
        <Select
          value={ov.textTransform ?? ''}
          options={TEXT_TRANSFORM_OPTIONS}
          onChange={(v) => onSetTextTransform(v as TextTransformValue)}
          placeholder={EDITOR_LABELS.styleOverrideUseGlobal}
          className="flex-1 text-[11px] py-0.5"
        />
        {ov.textTransform !== undefined && (
          <button
            type="button"
            onClick={() => onClearField('textTransform')}
            className="text-[10px] text-gray-500 hover:text-gray-300 flex-shrink-0"
          >
            X
          </button>
        )}
      </div>

      <ColorPicker
        label={EDITOR_LABELS.styleOverrideColor}
        value={ov.color ?? '#ffffff'}
        onChange={onSetColor}
        opacity={ov.opacity}
        onOpacityChange={ov.color ? onSetOpacity : undefined}
      />
    </div>
  );
}
