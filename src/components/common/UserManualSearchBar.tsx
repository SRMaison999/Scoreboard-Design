import { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EDITOR_LABELS } from '@/constants/labels';

interface UserManualSearchBarProps {
  readonly query: string;
  readonly totalMatchCount: number;
  readonly resultCount: number;
  readonly isSearchActive: boolean;
  readonly onQueryChange: (value: string) => void;
  readonly onClear: () => void;
}

export function UserManualSearchBar({
  query,
  totalMatchCount,
  resultCount,
  isSearchActive,
  onQueryChange,
  onClear,
}: UserManualSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="px-3 py-2 border-b border-gray-700">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={EDITOR_LABELS.userManualSearchPlaceholder}
          className={cn(
            'w-full pl-7 pr-7 py-1.5 text-sm rounded',
            'bg-gray-800 border border-gray-700 text-gray-200',
            'placeholder:text-gray-500',
            'focus:outline-none focus:border-blue-600',
          )}
          data-testid="manual-search-input"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
            data-testid="manual-search-clear"
          >
            <X className="w-3.5 h-3.5 flex-shrink-0" />
          </button>
        )}
      </div>
      {isSearchActive && (
        <div className="mt-1.5 text-xs text-gray-500" data-testid="manual-search-summary">
          {totalMatchCount > 0
            ? `${totalMatchCount} ${EDITOR_LABELS.userManualSearchResultCount} dans ${resultCount} ${EDITOR_LABELS.userManualSearchInChapters}`
            : EDITOR_LABELS.userManualSearchNoResults}
        </div>
      )}
    </div>
  );
}
