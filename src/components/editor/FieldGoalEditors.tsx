/**
 * Editeurs de configuration pour les elements "but" :
 * goal-scorer, goal-assists, goal-details.
 * Panneau editeur (Tailwind CSS, pas de styles inline).
 */

import { InputField } from '@/components/ui/InputField';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';
import { updateFieldElementConfig } from '@/utils/fieldConfig';

interface EditorProps {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}

export function GoalScorerEditor({ fieldId, element }: EditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config as { scorerName: string; scorerNumber: string; scorerPhoto: string; showPhoto: boolean; showNumber: boolean; fontSize: number; textColor: string };
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);
  const isDataUrl = c.scorerPhoto.startsWith('data:');

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configGoalScorerName} value={c.scorerName} onChange={(v) => patch({ scorerName: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configGoalScorerNumber} value={c.scorerNumber} onChange={(v) => patch({ scorerNumber: v })} />
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input type="checkbox" checked={c.showNumber} onChange={(e) => patch({ showNumber: e.target.checked })} />
        {CUSTOM_FIELD_LABELS.configGoalScorerShowNumber}
      </label>
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input type="checkbox" checked={c.showPhoto} onChange={(e) => patch({ showPhoto: e.target.checked })} />
        {CUSTOM_FIELD_LABELS.configGoalScorerShowPhoto}
      </label>
      {c.showPhoto && (
        <ImageUpload
          label={CUSTOM_FIELD_LABELS.configGoalScorerPhoto}
          value={isDataUrl ? c.scorerPhoto : ''}
          onUpload={(dataUrl) => patch({ scorerPhoto: dataUrl })}
          onRemove={() => patch({ scorerPhoto: '' })}
        />
      )}
      <FontSizeInput value={c.fontSize} onChange={(v) => patch({ fontSize: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
    </div>
  );
}

export function GoalAssistsEditor({ fieldId, element }: EditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config as { assist1Name: string; assist1Number: string; assist2Name: string; assist2Number: string; showNumbers: boolean; fontSize: number; textColor: string };
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configGoalAssist1Name} value={c.assist1Name} onChange={(v) => patch({ assist1Name: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configGoalAssist1Number} value={c.assist1Number} onChange={(v) => patch({ assist1Number: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configGoalAssist2Name} value={c.assist2Name} onChange={(v) => patch({ assist2Name: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configGoalAssist2Number} value={c.assist2Number} onChange={(v) => patch({ assist2Number: v })} />
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input type="checkbox" checked={c.showNumbers} onChange={(e) => patch({ showNumbers: e.target.checked })} />
        {CUSTOM_FIELD_LABELS.configGoalAssistsShowNumbers}
      </label>
      <FontSizeInput value={c.fontSize} onChange={(v) => patch({ fontSize: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
    </div>
  );
}

export function GoalDetailsEditor({ fieldId, element }: EditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config as { goalTime: string; goalPeriod: string; goalCountMatch: string; goalCountTournament: string; showPeriod: boolean; showCount: boolean; fontSize: number; textColor: string };
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configGoalTime} value={c.goalTime} onChange={(v) => patch({ goalTime: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configGoalPeriod} value={c.goalPeriod} onChange={(v) => patch({ goalPeriod: v })} />
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input type="checkbox" checked={c.showPeriod} onChange={(e) => patch({ showPeriod: e.target.checked })} />
        {CUSTOM_FIELD_LABELS.configGoalShowPeriod}
      </label>
      <InputField label={CUSTOM_FIELD_LABELS.configGoalCountMatch} value={c.goalCountMatch} onChange={(v) => patch({ goalCountMatch: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configGoalCountTournament} value={c.goalCountTournament} onChange={(v) => patch({ goalCountTournament: v })} />
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input type="checkbox" checked={c.showCount} onChange={(e) => patch({ showCount: e.target.checked })} />
        {CUSTOM_FIELD_LABELS.configGoalShowCount}
      </label>
      <FontSizeInput value={c.fontSize} onChange={(v) => patch({ fontSize: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
    </div>
  );
}

/* --- Composants partages --- */

function FontSizeInput({ value, onChange }: { readonly value: number; readonly onChange: (v: number) => void }) {
  return (
    <div>
      <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.configTextFontSize}</label>
      <input type="number" min={8} max={200} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]" />
    </div>
  );
}

function ColorInput({ label, value, onChange }: { readonly label: string; readonly value: string; readonly onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[11px] text-gray-400 flex-1">{label}</label>
      <input type="color" value={value || '#ffffff'} onChange={(e) => onChange(e.target.value)} className="w-7 h-7 rounded cursor-pointer border border-gray-700 bg-transparent" />
    </div>
  );
}
