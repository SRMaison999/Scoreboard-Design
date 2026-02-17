/**
 * Liste des champs (couches) pour le constructeur de champs personnalisés.
 * Affiche les champs triés par z-index avec sélection et actions.
 */

import { Trash2, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { cn } from '@/lib/utils';

export function CustomFieldList() {
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const selectedId = useScoreboardStore((s) => s.customFieldsData.selectedFieldId);
  const selectField = useScoreboardStore((s) => s.selectCustomField);
  const removeField = useScoreboardStore((s) => s.removeCustomField);
  const updateProp = useScoreboardStore((s) => s.updateCustomFieldProp);

  const sorted = [...fields].sort((a, b) => b.zIndex - a.zIndex);

  if (sorted.length === 0) {
    return (
      <p className="text-[12px] text-gray-500">
        {CUSTOM_FIELD_LABELS.libraryEmpty}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      {sorted.map((field) => (
        <div
          key={field.id}
          className={cn(
            'flex items-center gap-1.5 rounded px-2 py-1 cursor-pointer text-[12px]',
            selectedId === field.id
              ? 'bg-sky-900/40 text-sky-300 border border-sky-600/40'
              : 'text-gray-300 hover:bg-gray-800 border border-transparent',
          )}
          onClick={() => selectField(field.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') selectField(field.id); }}
        >
          <span className="flex-1 truncate">{field.label}</span>
          <span className="text-gray-600 text-[10px] flex-shrink-0">z{field.zIndex}</span>

          <button
            type="button"
            className="p-0.5 hover:text-sky-300 flex-shrink-0"
            onClick={(e) => { e.stopPropagation(); updateProp(field.id, 'visible', !field.visible); }}
            title={field.visible ? CUSTOM_FIELD_LABELS.fieldVisible : CUSTOM_FIELD_LABELS.fieldVisible}
          >
            {field.visible
              ? <Eye size={12} className="flex-shrink-0" />
              : <EyeOff size={12} className="flex-shrink-0 text-gray-600" />
            }
          </button>

          <button
            type="button"
            className="p-0.5 hover:text-sky-300 flex-shrink-0"
            onClick={(e) => { e.stopPropagation(); updateProp(field.id, 'locked', !field.locked); }}
            title={field.locked ? CUSTOM_FIELD_LABELS.fieldLocked : CUSTOM_FIELD_LABELS.fieldLocked}
          >
            {field.locked
              ? <Lock size={12} className="flex-shrink-0 text-amber-400" />
              : <Unlock size={12} className="flex-shrink-0" />
            }
          </button>

          <button
            type="button"
            className="p-0.5 hover:text-red-400 flex-shrink-0"
            onClick={(e) => { e.stopPropagation(); removeField(field.id); }}
            title={CUSTOM_FIELD_LABELS.fieldDelete}
          >
            <Trash2 size={12} className="flex-shrink-0" />
          </button>
        </div>
      ))}
    </div>
  );
}
