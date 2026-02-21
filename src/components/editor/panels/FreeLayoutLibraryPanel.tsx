/**
 * Panneau de biblioth\u00e8que unifi\u00e9 pour le mode Layout libre.
 * Regroupe toutes les cat\u00e9gories d'\u00e9l\u00e9ments avec des filtres horizontaux.
 * Affiche le HeaderSection quand la cat\u00e9gorie "match" est active.
 */

import { GripVertical } from 'lucide-react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useEditorUIStore } from '@/stores/editorUIStore';
import { useLibraryDragDrop } from '@/hooks/useLibraryDragDrop';
import { prepareFieldForAdd } from '@/utils/fieldConfig';
import { cn } from '@/lib/utils';
import {
  LIBRARY_ELEMENTS,
  LIBRARY_CATEGORY_LABELS,
  CUSTOM_FIELD_LABELS,
} from '@/constants/customFields';
import { FIELD_MAX_FIELDS } from '@/types/customField';
import { LibraryIcon } from '@/components/editor/LibraryIcon';
import type { LibraryElement, LibraryCategory } from '@/types/customField';

const ALL_CATEGORIES: readonly (LibraryCategory | 'all')[] = [
  'all', 'match', 'text', 'data', 'players', 'media', 'composed',
];

const CATEGORY_FILTER_LABELS: Readonly<Record<LibraryCategory | 'all', string>> = {
  all: CUSTOM_FIELD_LABELS.freeLayoutCategoryAll,
  ...LIBRARY_CATEGORY_LABELS,
};

export function FreeLayoutLibraryPanel() {
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const templateWidth = useScoreboardStore((s) => s.templateWidth);
  const templateHeight = useScoreboardStore((s) => s.templateHeight);
  const addField = useScoreboardStore((s) => s.addCustomField);
  const activeCategory = useEditorUIStore((s) => s.activeLibraryCategory);
  const setCategory = useEditorUIStore((s) => s.setLibraryCategory);
  const { onDragStart } = useLibraryDragDrop();

  const isFull = fields.length >= FIELD_MAX_FIELDS;
  const items = activeCategory === 'all'
    ? LIBRARY_ELEMENTS
    : LIBRARY_ELEMENTS.filter((el) => el.category === activeCategory);

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
    <div className="flex flex-col h-full overflow-hidden" data-testid="free-layout-library-panel">
      {/* Filtres de cat\u00e9gorie */}
      <div className="flex flex-wrap gap-1 px-3 py-2 border-b border-gray-800" role="tablist">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'px-2 py-1 text-[11px] font-medium rounded-md transition-colors',
              activeCategory === cat
                ? 'bg-sky-900/60 text-sky-300 border border-sky-600/40'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60 border border-transparent',
            )}
          >
            {CATEGORY_FILTER_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-3">
          {isFull && (
            <p className="text-[11px] text-red-400 mb-2">{CUSTOM_FIELD_LABELS.maxFieldsReached}</p>
          )}

          <div className="flex flex-col gap-1.5">
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
                  'group flex items-start gap-2 text-left rounded-md px-3 py-2',
                  'border border-gray-800 hover:text-sky-300 hover:bg-gray-800/60 hover:border-gray-700',
                  'transition-colors',
                  !isFull && 'cursor-grab active:cursor-grabbing',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                )}
              >
                <GripVertical
                  size={12}
                  className="flex-shrink-0 text-gray-600 opacity-40 group-hover:opacity-80 transition-opacity mt-0.5"
                />
                <LibraryIcon name={el.icon} />
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] text-gray-300 group-hover:text-sky-300">{el.label}</span>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{el.description}</p>
                </div>
                {activeCategory === 'all' && (
                  <span className="text-[9px] text-gray-600 flex-shrink-0 mt-0.5">
                    {LIBRARY_CATEGORY_LABELS[el.category]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {items.length === 0 && (
            <p className="text-[12px] text-gray-500">{CUSTOM_FIELD_LABELS.libraryEmpty}</p>
          )}
        </div>
      </div>
    </div>
  );
}
