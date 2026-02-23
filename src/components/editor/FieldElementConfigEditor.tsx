/**
 * Editeur de configuration specifique par type d'element.
 * Affiche les controles adaptes au type du champ selectionne.
 */

import { InputField } from '@/components/ui/InputField';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Select } from '@/components/ui/Select';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';
import { updateFieldElementConfig } from '@/utils/fieldConfig';
import { ShapeEditor, SeparatorEditor, ImageEditor } from './FieldVisualEditors';
import { ClockDataEditor, TimeoutEditor, ShootoutEditor } from './FieldMatchEditors';
import { TextBlockEditor } from './FieldTextEditor';
import { TeamNationSelector } from './TeamNationSelector';

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

function ShowFlagToggle({ fieldId, element }: {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const config = element.config as { showFlag?: boolean };
  const checked = config.showFlag !== false;

  return (
    <label className="flex items-center gap-2 text-[12px] text-gray-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => updateFieldElementConfig(updateElement, fieldId, element, { showFlag: e.target.checked })}
      />
      {CUSTOM_FIELD_LABELS.configShowFlag}
    </label>
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
      <ClockDataEditor />
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
  const isDataUrl = c.photoKey.startsWith('data:');

  return (
    <div className="flex flex-col gap-2">
      <ImageUpload
        label={CUSTOM_FIELD_LABELS.configPlayerPhotoUpload}
        value={isDataUrl ? c.photoKey : ''}
        onUpload={(dataUrl) => patch({ photoKey: dataUrl })}
        onRemove={() => patch({ photoKey: '' })}
      />
      {!isDataUrl && (
        <InputField
          label={CUSTOM_FIELD_LABELS.configPhotoKey}
          value={c.photoKey}
          onChange={(v) => patch({ photoKey: v })}
        />
      )}
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
          <TeamNationSelector element={element} />
          <FontSizeOverrideInput fieldId={fieldId} element={element} />
        </div>
      );
    case 'team-name':
      return (
        <div className="flex flex-col gap-2">
          <SideSelector fieldId={fieldId} element={element} />
          <TeamNationSelector element={element} />
          <ShowFlagToggle fieldId={fieldId} element={element} />
          <FontSizeOverrideInput fieldId={fieldId} element={element} />
        </div>
      );
    case 'flag-display':
      return (
        <div className="flex flex-col gap-2">
          <SideSelector fieldId={fieldId} element={element} />
          <TeamNationSelector element={element} />
        </div>
      );
    case 'penalty-column':
      return <SideSelector fieldId={fieldId} element={element} />;
    case 'header-block':
      return <HeaderBlockEditor fieldId={fieldId} element={element} />;
    case 'clock-display':
      return <ClockDisplayEditor fieldId={fieldId} element={element} />;
    case 'period-display':
      return (
        <div className="flex flex-col gap-2">
          <ClockDataEditor />
          <FontSizeOverrideInput fieldId={fieldId} element={element} />
        </div>
      );
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
    case 'timeout-display':
      return <TimeoutEditor />;
    case 'shootout-display':
      return <ShootoutEditor />;
    default:
      return null;
  }
}
