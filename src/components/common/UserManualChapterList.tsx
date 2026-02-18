import { cn } from '@/lib/utils';
import { MANUAL_CHAPTERS } from '@/data/manual/chapters';
import { EDITOR_LABELS } from '@/constants/labels';

interface UserManualChapterListProps {
  readonly activeIndex: number;
  readonly onSelect: (index: number) => void;
}

export function UserManualChapterList({ activeIndex, onSelect }: UserManualChapterListProps) {
  return (
    <nav className="w-56 flex-shrink-0 border-r border-gray-700 overflow-y-auto">
      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {EDITOR_LABELS.userManualTableOfContents}
      </div>
      <ul>
        {MANUAL_CHAPTERS.map((chapter, index) => (
          <li key={chapter.id}>
            <button
              type="button"
              onClick={() => onSelect(index)}
              className={cn(
                'w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors',
                index === activeIndex
                  ? 'bg-blue-950 text-blue-300 border-r-2 border-blue-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200',
              )}
            >
              <span className="text-gray-600 mr-1.5">{index + 1}.</span>
              {chapter.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
