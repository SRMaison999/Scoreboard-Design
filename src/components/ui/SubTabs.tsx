import { cn } from '@/lib/utils';
import type { SubTabItem } from '@/types/editor';

interface SubTabsProps {
  readonly tabs: readonly SubTabItem[];
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
}

export function SubTabs({ tabs, activeId, onSelect }: SubTabsProps) {
  if (tabs.length <= 1) {
    return null;
  }

  return (
    <div
      className="flex border-b border-gray-800 gap-0.5 px-1"
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(tab.id)}
            className={cn(
              'px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider cursor-pointer transition-colors',
              isActive
                ? 'text-sky-300 border-b-2 border-sky-400'
                : 'text-gray-500 hover:text-gray-300',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
