/**
 * Editeurs de configuration pour les elements "joueurs" :
 * player-row, player-list.
 * Panneau editeur (Tailwind CSS, pas de styles inline).
 */

import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig, PlayerListEntry } from '@/types/customField';
import { updateFieldElementConfig } from '@/utils/fieldConfig';

interface EditorProps {
  readonly fieldId: string;
  readonly element: FieldElementConfig;
}

export function PlayerRowEditor({ fieldId, element }: EditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config as { playerName: string; playerNumber: string; position: string; showNumber: boolean; showPosition: boolean; fontSize: number; textColor: string };
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configPlayerName} value={c.playerName} onChange={(v) => patch({ playerName: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configPlayerNumber} value={c.playerNumber} onChange={(v) => patch({ playerNumber: v })} />
      <InputField label={CUSTOM_FIELD_LABELS.configPlayerPosition} value={c.position} onChange={(v) => patch({ position: v })} />
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input type="checkbox" checked={c.showNumber} onChange={(e) => patch({ showNumber: e.target.checked })} />
        {CUSTOM_FIELD_LABELS.configPlayerShowNumber}
      </label>
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input type="checkbox" checked={c.showPosition} onChange={(e) => patch({ showPosition: e.target.checked })} />
        {CUSTOM_FIELD_LABELS.configPlayerShowPosition}
      </label>
      <FontSizeInput value={c.fontSize} onChange={(v) => patch({ fontSize: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
    </div>
  );
}

export function PlayerListEditor({ fieldId, element }: EditorProps) {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const c = element.config as { title: string; players: readonly PlayerListEntry[]; showNumbers: boolean; showPositions: boolean; fontSize: number; textColor: string; titleColor: string };
  const patch = (p: Record<string, unknown>) => updateFieldElementConfig(updateElement, fieldId, element, p);

  const addPlayer = () => {
    const next = [...c.players, { name: '', number: '', position: '' }];
    patch({ players: next });
  };

  const removePlayer = (idx: number) => {
    const next = c.players.filter((_, i) => i !== idx);
    patch({ players: next });
  };

  const updatePlayer = (idx: number, key: keyof PlayerListEntry, value: string) => {
    const next = c.players.map((p, i) => i === idx ? { ...p, [key]: value } : p);
    patch({ players: next });
  };

  return (
    <div className="flex flex-col gap-2">
      <InputField label={CUSTOM_FIELD_LABELS.configPlayerListTitle} value={c.title} onChange={(v) => patch({ title: v })} />
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input type="checkbox" checked={c.showNumbers} onChange={(e) => patch({ showNumbers: e.target.checked })} />
        {CUSTOM_FIELD_LABELS.configPlayerListShowNumbers}
      </label>
      <label className="flex items-center gap-2 text-[12px] text-gray-300">
        <input type="checkbox" checked={c.showPositions} onChange={(e) => patch({ showPositions: e.target.checked })} />
        {CUSTOM_FIELD_LABELS.configPlayerListShowPositions}
      </label>
      <FontSizeInput value={c.fontSize} onChange={(v) => patch({ fontSize: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configTextColor} value={c.textColor} onChange={(v) => patch({ textColor: v })} />
      <ColorInput label={CUSTOM_FIELD_LABELS.configPlayerListTitleColor} value={c.titleColor} onChange={(v) => patch({ titleColor: v })} />

      <div className="mt-2 border-t border-gray-700 pt-2">
        {c.players.length === 0 && (
          <p className="text-[11px] text-gray-500">{CUSTOM_FIELD_LABELS.configPlayerListEmpty}</p>
        )}
        {c.players.map((player, idx) => (
          <div key={idx} className="flex flex-col gap-1 mb-2 p-2 bg-gray-800 rounded">
            <div className="flex gap-1">
              <input className="w-12 bg-gray-900 border border-gray-700 rounded px-1.5 py-0.5 text-gray-200 text-[12px]" placeholder="#" value={player.number} onChange={(e) => updatePlayer(idx, 'number', e.target.value)} />
              <input className="flex-1 bg-gray-900 border border-gray-700 rounded px-1.5 py-0.5 text-gray-200 text-[12px]" placeholder={CUSTOM_FIELD_LABELS.configPlayerName} value={player.name} onChange={(e) => updatePlayer(idx, 'name', e.target.value)} />
              <Select value={player.position} onChange={(v) => updatePlayer(idx, 'position', v)} options={POSITION_OPTIONS} />
            </div>
            <button type="button" className="text-[10px] text-red-400 self-end cursor-pointer" onClick={() => removePlayer(idx)}>
              {CUSTOM_FIELD_LABELS.configPlayerListRemove}
            </button>
          </div>
        ))}
        <Button variant="add" onClick={addPlayer}>{CUSTOM_FIELD_LABELS.configPlayerListAdd}</Button>
      </div>
    </div>
  );
}

/* --- Composants partages --- */

const POSITION_OPTIONS = [
  { value: '', label: '-' },
  { value: 'G', label: 'G' },
  { value: 'D', label: 'D' },
  { value: 'C', label: 'C' },
  { value: 'LW', label: 'AG' },
  { value: 'RW', label: 'AD' },
  { value: 'F', label: 'A' },
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
