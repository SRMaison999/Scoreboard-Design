/**
 * Panneau affichant les éléments de la bibliothèque pour une catégorie donnée.
 * Utilisé dans la navigation du Layout libre.
 */

import { GripVertical } from 'lucide-react';
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
import { LibraryIcon } from '@/components/editor/LibraryIcon';
import type { LibraryElement, LibraryCategory } from '@/types/customField';

interface FreeLayoutCategoryPanelProps {
  readonly category: LibraryCategory;
}

export function FreeLayoutCategoryPanel({ category }: FreeLayoutCategoryPanelProps) {
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const templateWidth = useScoreboardStore((s) => s.templateWidth);
  const templateHeight = useScoreboardStore((s) => s.templateHeight);
  const addField = useScoreboardStore((s) => s.addCustomField);
  const { onDragStart, onDragEnd, wasDragged } = useLibraryDragDrop();

  const items = LIBRARY_ELEMENTS.filter((el) => el.category === category);
  const isFull = fields.length >= FIELD_MAX_FIELDS;

  const handleAdd = (el: LibraryElement) => {
    if (isFull || wasDragged.current) return;
    const { config, label } = prepareFieldForAdd(el, fields);
    const w = Math.min(el.defaultWidth, templateWidth);
    const h = Math.min(el.defaultHeight, templateHeight);
    const x = Math.round((templateWidth - w) / 2);
    const y = Math.round((templateHeight - h) / 2);
    addField(config, x, y, w, h, label);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" data-testid={`free-layout-category-${category}`}>
      <div className="px-4 py-3 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-300">
          {LIBRARY_CATEGORY_LABELS[category]}
        </h2>
        <p className="text-[11px] text-gray-500 mt-0.5">
          {CUSTOM_FIELD_LABELS.freeLayoutAddHint}
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3">
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
              onDragEnd={onDragEnd}
              title={isFull ? CUSTOM_FIELD_LABELS.maxFieldsReached : CUSTOM_FIELD_LABELS.dragTooltip}
              className={cn(
                'group flex items-start gap-2 text-left rounded-md px-3 py-2.5',
                'border border-gray-800 hover:text-sky-300 hover:bg-gray-800/60 hover:border-gray-700',
                'transition-colors',
                !isFull && 'cursor-grab active:cursor-grabbing',
                'disabled:opacity-40 disabled:cursor-not-allowed',
              )}
            >
              <GripVertical
                size={12}
                className="flex-shrink-0 text-gray-600 opacity-0 group-hover:opacity-60 transition-opacity mt-0.5"
              />
              <LibraryIcon name={el.icon} />
              <div className="flex-1 min-w-0">
                <span className="text-[13px] text-gray-300 group-hover:text-sky-300">{el.label}</span>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{el.description}</p>
              </div>
            </button>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-[12px] text-gray-500">{CUSTOM_FIELD_LABELS.libraryEmpty}</p>
        )}
      </div>
    </div>
  );
}
