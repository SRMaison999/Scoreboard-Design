import { useMemo } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { BODY_TYPES, BODY_TYPE_CATEGORY_LABELS } from '@/constants/bodyTypes';
import { EDITOR_LABELS } from '@/constants/labels';
import type { BodyTypeId, BodyTypeOption } from '@/types/scoreboard';
import { cn } from '@/lib/utils';

type Category = BodyTypeOption['category'];

function ModeButton({
  type,
  isActive,
  onSelect,
}: {
  readonly type: BodyTypeOption;
  readonly isActive: boolean;
  readonly onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-testid={`mode-btn-${type.id}`}
      onClick={onSelect}
      className={cn(
        'w-full rounded-md px-3 py-2 text-left cursor-pointer transition-colors border',
        isActive
          ? 'bg-sky-950 border-sky-500 text-sky-100'
          : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200',
      )}
    >
      <span className={cn('block text-sm leading-snug', isActive && 'font-semibold')}>
        {type.label}
      </span>
      <span className="block text-[11px] leading-snug mt-0.5 text-gray-500">
        {type.description}
      </span>
    </button>
  );
}

export function ModesPanel() {
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const update = useScoreboardStore((s) => s.update);

  const groups = useMemo(() => {
    const order: Category[] = ['custom', 'stats', 'match', 'info'];
    const map = new Map<Category, BodyTypeOption[]>();
    for (const cat of order) map.set(cat, []);
    for (const bt of BODY_TYPES) {
      map.get(bt.category)?.push(bt);
    }
    return order
      .filter((cat) => (map.get(cat)?.length ?? 0) > 0)
      .map((cat) => ({ category: cat, items: map.get(cat)! }));
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-300">
          {EDITOR_LABELS.sectionModes}
        </h2>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-3 flex flex-col gap-4">
        {groups.map(({ category, items }) => (
          <div key={category}>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2 px-1">
              {BODY_TYPE_CATEGORY_LABELS[category]}
            </h3>
            <div className="flex flex-col gap-1.5">
              {items.map((t) => (
                <ModeButton
                  key={t.id}
                  type={t}
                  isActive={bodyType === t.id}
                  onSelect={() => update('bodyType', t.id as BodyTypeId)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
