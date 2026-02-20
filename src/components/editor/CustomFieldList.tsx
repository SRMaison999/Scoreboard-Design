/**
 * Liste des champs (couches) pour le constructeur de champs personnalisés.
 * Affiche les champs triés par z-index avec sélection, réordonnancement,
 * renommage inline (double-clic) et actions rapides.
 */

import { useState, useRef, useEffect } from 'react';
import {
  Trash2, Eye, EyeOff, Lock, Unlock,
  ChevronUp, ChevronDown, Type, Image, Clock,
} from 'lucide-react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { cn } from '@/lib/utils';

/** Icône compacte selon le type d'élément du champ */
function FieldTypeIcon({ type }: { type: string }) {
  const cls = 'flex-shrink-0 text-gray-500';
  switch (type) {
    case 'text-block':
      return <Type size={10} className={cls} />;
    case 'player-photo':
      return <Image size={10} className={cls} />;
    case 'clock-display':
      return <Clock size={10} className={cls} />;
    default:
      return <Type size={10} className={cls} />;
  }
}

export function CustomFieldList() {
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const selectedIds = useScoreboardStore((s) => s.customFieldsData.selectedFieldIds);
  const selectField = useScoreboardStore((s) => s.selectCustomField);
  const toggleSelection = useScoreboardStore((s) => s.toggleFieldSelection);
  const removeField = useScoreboardStore((s) => s.removeCustomField);
  const updateProp = useScoreboardStore((s) => s.updateCustomFieldProp);
  const reorderField = useScoreboardStore((s) => s.reorderCustomField);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const sorted = [...fields].sort((a, b) => b.zIndex - a.zIndex);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  if (sorted.length === 0) {
    return (
      <p className="text-[12px] text-gray-500">
        {CUSTOM_FIELD_LABELS.libraryEmpty}
      </p>
    );
  }

  const handleMoveUp = (e: React.MouseEvent, fieldId: string, currentZ: number) => {
    e.stopPropagation();
    const above = sorted.find((f) => f.zIndex > currentZ);
    if (above) reorderField(fieldId, above.zIndex + 1);
  };

  const handleMoveDown = (e: React.MouseEvent, fieldId: string, currentZ: number) => {
    e.stopPropagation();
    const below = sorted.find((f) => f.zIndex < currentZ);
    if (below) reorderField(fieldId, Math.max(0, below.zIndex - 1));
  };

  const startRename = (fieldId: string, currentLabel: string) => {
    setEditingId(fieldId);
    setEditValue(currentLabel);
  };

  const commitRename = () => {
    if (editingId && editValue.trim().length > 0) {
      updateProp(editingId, 'label', editValue.trim());
    }
    setEditingId(null);
  };

  const handleRenameKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { commitRename(); }
    if (e.key === 'Escape') { setEditingId(null); }
  };

  return (
    <div className="flex flex-col gap-0.5" data-testid="custom-field-list">
      {sorted.map((field, idx) => (
        <div
          key={field.id}
          className={cn(
            'flex items-center gap-1 rounded px-2 py-1 cursor-pointer text-[12px]',
            selectedIds.includes(field.id)
              ? 'bg-sky-900/40 text-sky-300 border border-sky-600/40'
              : 'text-gray-300 hover:bg-gray-800 border border-transparent',
          )}
          onClick={(e) => {
            if (editingId) return;
            if (e.ctrlKey || e.metaKey) { toggleSelection(field.id); }
            else { selectField(field.id); }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' && !editingId) selectField(field.id); }}
        >
          <FieldTypeIcon type={field.element.type} />

          {editingId === field.id ? (
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-gray-800 text-sky-300 text-[12px] rounded px-1 py-0 outline-none border border-sky-600"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={commitRename}
              onKeyDown={handleRenameKey}
              data-testid="layer-rename-input"
            />
          ) : (
            <span
              className="flex-1 truncate"
              onDoubleClick={(e) => { e.stopPropagation(); startRename(field.id, field.label); }}
              title={CUSTOM_FIELD_LABELS.layerRename}
            >
              {field.label}
            </span>
          )}

          <span className="text-gray-600 text-[10px] flex-shrink-0">z{field.zIndex}</span>

          <button
            type="button"
            className="p-0.5 hover:text-sky-300 flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={(e) => handleMoveUp(e, field.id, field.zIndex)}
            disabled={idx === 0}
            title={CUSTOM_FIELD_LABELS.layerMoveUp}
          >
            <ChevronUp size={12} className="flex-shrink-0" />
          </button>

          <button
            type="button"
            className="p-0.5 hover:text-sky-300 flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={(e) => handleMoveDown(e, field.id, field.zIndex)}
            disabled={idx === sorted.length - 1}
            title={CUSTOM_FIELD_LABELS.layerMoveDown}
          >
            <ChevronDown size={12} className="flex-shrink-0" />
          </button>

          <button
            type="button"
            className="p-0.5 hover:text-sky-300 flex-shrink-0"
            onClick={(e) => { e.stopPropagation(); updateProp(field.id, 'visible', !field.visible); }}
            title={CUSTOM_FIELD_LABELS.fieldVisible}
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
            title={CUSTOM_FIELD_LABELS.fieldLocked}
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
