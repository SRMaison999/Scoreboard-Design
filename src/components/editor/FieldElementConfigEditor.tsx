/**
 * Editeur de configuration specifique par type d'element.
 * Affiche les controles adaptes au type du champ selectionne.
 */

import { useMemo } from 'react';
import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import type { SelectOptionGroup } from '@/components/ui/Select';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { FONT_OPTIONS, FONT_CATEGORY_LABELS, FONT_CATEGORY_ORDER } from '@/constants/fonts';
import type { FieldElementConfig } from '@/types/customField';
import { updateFieldElementConfig } from '@/utils/fieldConfig';
import { ShapeEditor, SeparatorEditor, ImageEditor } from './FieldVisualEditors';

interface FieldElementConfigEditorProps {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}

function FontSizeOverrideInput({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const config = element.config as { fontSizeOverride?: number };
  const value = config.fontSizeOverride ?? 0;

  return (
    <div>
      <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configFontSizeOverride}</label>
      <input
        type="number"
        min={0}
        max={300}
        value={value}
        onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { fontSizeOverride: Number(e.target.value) })}
        className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
      />
      <p className="text-[10px] text-gray-600 mt-0.5">{CUSTOM_FIELD_LABELS.configFontSizeAutoHint}</p>
    </div>
  );
}

function useFontFamilyGroups(): readonly SelectOptionGroup[] {
  return useMemo(() => {
    return FONT_CATEGORY_ORDER.map((cat) => ({
      label: FONT_CATEGORY_LABELS[cat],
      options: FONT_OPTIONS
        .filter((f) => f.category === cat)
        .map((f) => ({
          value: f.family,
          label: f.label,
          style: { fontFamily: f.family } as React.CSSProperties,
        })),
    }));
  }, []);
}

function TextBlockEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'text-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);
  const fontGroups = useFontFamilyGroups();

  return (
    <div className="flex flex-col gap-2">
      <InputField
        label={CUSTOM_FIELD_LABELS.configTextContent}
        value={c.content}
        onChange={(v) => patch({ content: v })}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configTextFontSize}</label>
          <input
            type="number"
            min={8}
            max={200}
            value={c.fontSize}
            onChange={(e) => patch({ fontSize: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
          />
        </div>
        <Select
          label={CUSTOM_FIELD_LABELS.configTextFontWeight}
          value={String(c.fontWeight)}
          onChange={(v) => patch({ fontWeight: Number(v) })}
          options={[
            { value: '400', label: 'Normal' },
            { value: '500', label: 'Medium' },
            { value: '600', label: 'Semi-bold' },
            { value: '700', label: 'Bold' },
          ]}
        />
      </div>
      <Select
        label={CUSTOM_FIELD_LABELS.configFontFamily}
        value={c.fontFamily}
        onChange={(v) => patch({ fontFamily: v })}
        options={[]}
        groups={fontGroups}
        placeholder={CUSTOM_FIELD_LABELS.configFontFamilyGlobal}
      />
      <div className="grid grid-cols-2 gap-2">
        <Select
          label={CUSTOM_FIELD_LABELS.configTextAlign}
          value={c.textAlign}
          onChange={(v) => patch({ textAlign: v })}
          options={[
            { value: 'left', label: 'Gauche' },
            { value: 'center', label: 'Centre' },
            { value: 'right', label: 'Droite' },
          ]}
        />
        <Select
          label={CUSTOM_FIELD_LABELS.configTextTransform}
          value={c.textTransform}
          onChange={(v) => patch({ textTransform: v })}
          options={[
            { value: 'none', label: 'Aucune' },
            { value: 'uppercase', label: 'MAJUSCULES' },
            { value: 'lowercase', label: 'minuscules' },
          ]}
        />
      </div>
      <div>
        <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configSeparatorThickness}</label>
        <input
          type="number"
          min={0}
          max={20}
          value={c.letterSpacing}
          onChange={(e) => patch({ letterSpacing: Number(e.target.value) })}
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
        />
      </div>
    </div>
  );
}

function SideSelector({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const config = element.config as { side: string };

  return (
    <Select
      label={CUSTOM_FIELD_LABELS.configSide}
      value={config.side}
      onChange={(v) => updateFieldElementConfig(updateElement, fieldId, element, { side: v })}
      options={[
        { value: 'left', label: CUSTOM_FIELD_LABELS.configSideLeft },
        { value: 'right', label: CUSTOM_FIELD_LABELS.configSideRight },
      ]}
    />
  );
}

function HeaderBlockEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'header-block' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;

  return (
    <label className="flex items-center gap-2 text-[12px] text-gray-300">
      <input
        type="checkbox"
        checked={c.showClock}
        onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { showClock: e.target.checked })}
      />
      {CUSTOM_FIELD_LABELS.configShowClock}
    </label>
  );
}

function ClockDisplayEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'clock-display' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input
          type="checkbox"
          checked={c.showPeriod}
          onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { showPeriod: e.target.checked })}
        />
        {CUSTOM_FIELD_LABELS.configShowPeriod}
      </label>
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input
          type="checkbox"
          checked={c.showBox}
          onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { showBox: e.target.checked })}
        />
        {CUSTOM_FIELD_LABELS.configShowBox}
      </label>
      <FontSizeOverrideInput fieldId={fieldId} element={element} />
    </div>
  );
}

function StatLineEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'stat-line' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const statsCount = useScoreboardStore((s) => s.stats.length);

  return (
    <div>
      <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configStatIndex}</label>
      <input
        type="number"
        min={0}
        max={Math.max(0, statsCount - 1)}
        value={element.config.statIndex}
        onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { statIndex: Number(e.target.value) })}
        className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
      />
    </div>
  );
}

function BarCompareEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'bar-compare' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const rowsCount = useScoreboardStore((s) => s.barChartData.rows.length);

  return (
    <div>
      <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configBarIndex}</label>
      <input
        type="number"
        min={0}
        max={Math.max(0, rowsCount - 1)}
        value={element.config.barIndex}
        onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { barIndex: Number(e.target.value) })}
        className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
      />
    </div>
  );
}

function PlayerPhotoEditor({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: Extract<FieldElementConfig, { type: 'player-photo' }>;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config;
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  return (
    <div className="flex flex-col gap-2">
      <InputField
        label={CUSTOM_FIELD_LABELS.configPhotoKey}
        value={c.photoKey}
        onChange={(v) => patch({ photoKey: v })}
      />
      <Select
        label={CUSTOM_FIELD_LABELS.configPhotoShape}
        value={c.shape}
        onChange={(v) => patch({ shape: v })}
        options={[
          { value: 'circle', label: CUSTOM_FIELD_LABELS.configPhotoCircle },
          { value: 'square', label: CUSTOM_FIELD_LABELS.configPhotoSquare },
        ]}
      />
    </div>
  );
}

export function FieldElementConfigEditor({ fieldId, element }: FieldElementConfigEditorProps) {
  switch (element.type) {
    case 'text-block':
      return <TextBlockEditor fieldId={fieldId} element={element} />;
    case 'score-display':
      return (
        <div className="flex flex-col gap-2">
          <SideSelector fieldId={fieldId} element={element} />
          <FontSizeOverrideInput fieldId={fieldId} element={element} />
        </div>
      );
    case 'team-name':
      return (
        <div className="flex flex-col gap-2">
          <SideSelector fieldId={fieldId} element={element} />
          <FontSizeOverrideInput fieldId={fieldId} element={element} />
        </div>
      );
    case 'flag-display':
    case 'penalty-column':
      return <SideSelector fieldId={fieldId} element={element} />;
    case 'header-block':
      return <HeaderBlockEditor fieldId={fieldId} element={element} />;
    case 'clock-display':
      return <ClockDisplayEditor fieldId={fieldId} element={element} />;
    case 'period-display':
      return <FontSizeOverrideInput fieldId={fieldId} element={element} />;
    case 'stat-line':
      return <StatLineEditor fieldId={fieldId} element={element} />;
    case 'bar-compare':
      return <BarCompareEditor fieldId={fieldId} element={element} />;
    case 'player-photo':
      return <PlayerPhotoEditor fieldId={fieldId} element={element} />;
    case 'shape-block':
      return <ShapeEditor fieldId={fieldId} element={element} />;
    case 'separator-line':
      return <SeparatorEditor fieldId={fieldId} element={element} />;
    case 'image-block':
      return <ImageEditor fieldId={fieldId} element={element} />;
    default:
      return null;
  }
}
