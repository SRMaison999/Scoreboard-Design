/**
 * Editeurs de configuration pour les elements "equipe" et "tableau" :
 * staff-row, staff-list, data-table.
 * Panneau editeur (Tailwind CSS, pas de styles inline).
 */

import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig, StaffListEntry, DataTableColumn, DataTableRow } from '@/types/customField';
import { updateFieldElementConfig } from '@/utils/fieldConfig';

interface EditorProps {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}

export function StaffRowEditor({ fieldId, element }: EditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config as { role: string; name: string; fontSize: number; textColor: string };
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configStaffRole} value={c.role} onChange={(v) => patch({ role: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configStaffName} value={c.name} onChange={(v) => patch({ name: v })} />
      <FontSizeInput value={c.fontSize} onChange={(v) => patch({ fontSize: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
    </div>
  );
}

export function StaffListEditor({ fieldId, element }: EditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config as { title: string; members: readonly StaffListEntry[]; fontSize: number; textColor: string; titleColor: string };
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  const addMember = () => {
    const next = [...c.members, { role: '', name: '' }];
    patch({ members: next });
  };

  const removeMember = (idx: number) => {
    const next = c.members.filter((_, i) => i !== idx);
    patch({ members: next });
  };

  const updateMember = (idx: number, key: keyof StaffListEntry, value: string) => {
    const next = c.members.map((m, i) => i === idx ? { ...m, [key]: value } : m);
    patch({ members: next });
  };

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configStaffListTitle} value={c.title} onChange={(v) => patch({ title: v })} />
      <FontSizeInput value={c.fontSize} onChange={(v) => patch({ fontSize: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configStaffListTitleColor} value={c.titleColor} onChange={(v) => patch({ titleColor: v })} />

      <div className="mt-2 border-t border-gray-700 pt-2">
        {c.members.length === 0 && (
          <p className="text-[11px] text-gray-500">{CUSTOM_FIELD_LABELS.configStaffListEmpty}</p>
        )}
        {c.members.map((member, idx) => (
          <div key={idx} className="flex flex-col gap-1 mb-2 p-2 bg-gray-800 rounded">
            <div className="flex gap-1">
              <input className="w-24 bg-gray-900 border border-gray-700 rounded px-1.5 py-0.5 text-gray-200 text-[12px]" placeholder={CUSTOM_FIELD_LABELS.configStaffRole} value={member.role} onChange={(e) => updateMember(idx, 'role', e.target.value)} />
              <input className="flex-1 bg-gray-900 border border-gray-700 rounded px-1.5 py-0.5 text-gray-200 text-[12px]" placeholder={CUSTOM_FIELD_LABELS.configStaffName} value={member.name} onChange={(e) => updateMember(idx, 'name', e.target.value)} />
            </div>
            <button type="button" className="text-[10px] text-red-400 self-end cursor-pointer" onClick={() => removeMember(idx)}>
              {CUSTOM_FIELD_LABELS.configStaffListRemove}
            </button>
          </div>
        ))}
        <Button variant="add" onClick={addMember}>{CUSTOM_FIELD_LABELS.configStaffListAdd}</Button>
      </div>
    </div>
  );
}

export function DataTableEditor({ fieldId, element }: EditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config as { title: string; columns: readonly DataTableColumn[]; rows: readonly DataTableRow[]; showHeader: boolean; fontSize: number; headerColor: string; textColor: string };
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  const addColumn = () => {
    const id = `col${c.columns.length + 1}`;
    const next = [...c.columns, { id, label: id, align: 'center' as const }];
    patch({ columns: next });
  };

  const removeColumn = (idx: number) => {
    const next = c.columns.filter((_, i) => i !== idx);
    patch({ columns: next });
  };

  const updateColumn = (idx: number, key: keyof DataTableColumn, value: string) => {
    const next = c.columns.map((col, i) => i === idx ? { ...col, [key]: value } : col);
    patch({ columns: next });
  };

  const addRow = () => {
    const values: Record<string, string> = {};
    c.columns.forEach((col) => { values[col.id] = ''; });
    const next = [...c.rows, { values, highlighted: false }];
    patch({ rows: next });
  };

  const removeRow = (idx: number) => {
    const next = c.rows.filter((_, i) => i !== idx);
    patch({ rows: next });
  };

  const updateCell = (rIdx: number, colId: string, value: string) => {
    const next = c.rows.map((row, i) => i === rIdx ? { ...row, values: { ...row.values, [colId]: value } } : row);
    patch({ rows: next });
  };

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configTableTitle} value={c.title} onChange={(v) => patch({ title: v })} />
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input type="checkbox" checked={c.showHeader} onChange={(e) => patch({ showHeader: e.target.checked })} />
        {CUSTOM_FIELD_LABELS.configTableShowHeader}
      </label>
      <FontSizeInput value={c.fontSize} onChange={(v) => patch({ fontSize: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configTableHeaderColor} value={c.headerColor} onChange={(v) => patch({ headerColor: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />

      {/* Colonnes */}
      <div className="mt-2 border-t border-gray-700 pt-2">
        <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1">{CUSTOM_FIELD_LABELS.configTableAddColumn}</p>
        {c.columns.length === 0 && (
          <p className="text-[11px] text-gray-500">{CUSTOM_FIELD_LABELS.configTableEmptyColumns}</p>
        )}
        {c.columns.map((col, idx) => (
          <div key={col.id} className="flex gap-1 mb-1 items-center">
            <input className="flex-1 bg-gray-900 border border-gray-700 rounded px-1.5 py-0.5 text-gray-200 text-[12px]" placeholder={CUSTOM_FIELD_LABELS.configTableColumnLabel} value={col.label} onChange={(e) => updateColumn(idx, 'label', e.target.value)} />
            <Select value={col.align} onChange={(v) => updateColumn(idx, 'align', v)} options={ALIGN_OPTIONS} />
            <button type="button" className="text-[10px] text-red-400 cursor-pointer" onClick={() => removeColumn(idx)}>x</button>
          </div>
        ))}
        <Button variant="add" onClick={addColumn}>{CUSTOM_FIELD_LABELS.configTableAddColumn}</Button>
      </div>

      {/* Lignes */}
      {c.columns.length > 0 && (
        <div className="mt-2 border-t border-gray-700 pt-2">
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1">{CUSTOM_FIELD_LABELS.configTableAddRow}</p>
          {c.rows.length === 0 && (
            <p className="text-[11px] text-gray-500">{CUSTOM_FIELD_LABELS.configTableEmptyRows}</p>
          )}
          {c.rows.map((row, rIdx) => (
            <div key={rIdx} className="flex flex-col gap-0.5 mb-2 p-1.5 bg-gray-800 rounded">
              <div className="flex gap-1 flex-wrap">
                {c.columns.map((col) => (
                  <input key={col.id} className="flex-1 min-w-[60px] bg-gray-900 border border-gray-700 rounded px-1.5 py-0.5 text-gray-200 text-[11px]" placeholder={col.label} value={row.values[col.id] ?? ''} onChange={(e) => updateCell(rIdx, col.id, e.target.value)} />
                ))}
              </div>
              <button type="button" className="text-[10px] text-red-400 self-end cursor-pointer" onClick={() => removeRow(rIdx)}>
                {CUSTOM_FIELD_LABELS.configTableRemoveRow}
              </button>
            </div>
          ))}
          <Button variant="add" onClick={addRow}>{CUSTOM_FIELD_LABELS.configTableAddRow}</Button>
        </div>
      )}
    </div>
  );
}

/* --- Composants partages --- */

const ALIGN_OPTIONS = [
  { value: 'left', label: 'G' },
  { value: 'center', label: 'C' },
  { value: 'right', label: 'D' },
];

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
