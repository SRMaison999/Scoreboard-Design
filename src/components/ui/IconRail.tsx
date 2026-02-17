import { cn } from '@/lib/utils';
import { Tooltip } from './Tooltip';
import type { IconRailItem } from '@/types/editor';

interface IconRailProps {
  readonly items: readonly IconRailItem[];
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
}

export function IconRail({ items, activeId, onSelect }: IconRailProps) {
  return (
    <nav
      className="flex flex-col items-center w-12 flex-shrink-0 border-r border-gray-800 bg-gray-950 py-2 gap-1"
      aria-label="Navigation principale"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        const Icon = item.icon;

        return (
          <Tooltip key={item.id} text={item.label} position="right">
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-colors',
                isActive
                  ? 'bg-gray-800 text-sky-400 border-l-2 border-sky-400'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900',
              )}
            >
              <Icon size={20} className="flex-shrink-0" />
            </button>
          </Tooltip>
        );
      })}
    </nav>
  );
}
