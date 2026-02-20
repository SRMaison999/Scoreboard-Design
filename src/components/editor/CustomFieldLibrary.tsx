/**
 * Panneau bibliothèque d'éléments pour le constructeur de champs.
 * Permet de parcourir les catégories et d'ajouter des éléments au canvas.
 */

import { useState, useMemo } from 'react';
import { GripVertical } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useLibraryDragDrop } from '@/hooks/useLibraryDragDrop';
import { prepareFieldForAdd } from '@/utils/fieldConfig';
import { cn } from '@/lib/utils';
import {
  LIBRARY_ELEMENTS,
  LIBRARY_CATEGORY_LABELS,
  CUSTOM_FIELD_LABELS,
} from '@/constants/customFields';
import { FIELD_MAX_FIELDS } from '@/types/customField';
import { LibraryIcon } from './LibraryIcon';
import type { LibraryCategory, LibraryElement } from '@/types/customField';

const CATEGORIES: LibraryCategory[] = ['match', 'text', 'data', 'players', 'media', 'composed'];

export function CustomFieldLibrary() {
  const [search, setSearch] = useState('');
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const templateWidth = useScoreboardStore((s) => s.templateWidth);
  const templateHeight = useScoreboardStore((s) => s.templateHeight);
  const addField = useScoreboardStore((s) => s.addCustomField);
  const { onDragStart } = useLibraryDragDrop();

  const filtered = useMemo(() => {
    if (!search.trim()) return LIBRARY_ELEMENTS;
    const q = search.toLowerCase();
    return LIBRARY_ELEMENTS.filter((el) => el.label.toLowerCase().includes(q));
  }, [search]);

  const isFull = fields.length >= FIELD_MAX_FIELDS;

  const handleAdd = (el: LibraryElement) => {
    if (isFull) return;
    const { config, label } = prepareFieldForAdd(el, fields);

    const w = Math.min(el.defaultWidth, templateWidth);
    const h = Math.min(el.defaultHeight, templateHeight);
    const x = Math.round((templateWidth - w) / 2);
    const y = Math.round((templateHeight - h) / 2);
    addField(config, x, y, w, h, label);
  };

  return (
    <Section title={CUSTOM_FIELD_LABELS.libraryTitle} defaultOpen>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={CUSTOM_FIELD_LABELS.librarySearch}
        className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2.5 py-1 text-[13px] mb-2"
      />

      {isFull && (
        <p className="text-[11px] text-red-400 mb-2">{CUSTOM_FIELD_LABELS.maxFieldsReached}</p>
      )}

      {CATEGORIES.map((cat) => {
        const items = filtered.filter((el) => el.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="mb-2">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 border-t border-gray-800 pt-1">
              {LIBRARY_CATEGORY_LABELS[cat]}
            </div>
            <div className="flex flex-col gap-0.5">
              {items.map((el) => (
                <button
                  key={el.type}
                  type="button"
                  disabled={isFull}
                  draggable={!isFull}
                  onClick={() => handleAdd(el)}
                  onDragStart={(e) => onDragStart(e, el.type)}
                  title={isFull ? CUSTOM_FIELD_LABELS.maxFieldsReached : CUSTOM_FIELD_LABELS.dragTooltip}
                  className={cn(
                    'group flex items-center gap-1.5 text-[12px] text-gray-300 rounded px-1.5 py-1 text-left',
                    'hover:text-sky-300 hover:bg-gray-800',
                    !isFull && 'cursor-grab active:cursor-grabbing',
                    'disabled:opacity-40 disabled:cursor-not-allowed',
                  )}
                >
                  <GripVertical
                    size={10}
                    className="flex-shrink-0 text-gray-600 opacity-0 group-hover:opacity-60 transition-opacity"
                  />
                  <LibraryIcon name={el.icon} />
                  {el.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <p className="text-[12px] text-gray-500">{CUSTOM_FIELD_LABELS.libraryEmpty}</p>
      )}
    </Section>
  );
}
