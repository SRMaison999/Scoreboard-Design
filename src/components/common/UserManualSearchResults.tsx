import { cn } from '@/lib/utils';
import { EDITOR_LABELS } from '@/constants/labels';
import type { ManualSearchResult } from '@/types/userManual';

interface UserManualSearchResultsProps {
  readonly results: readonly ManualSearchResult[];
  readonly onSelectChapter: (index: number) => void;
}

export function UserManualSearchResults({
  results,
  onSelectChapter,
}: UserManualSearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm px-4 text-center">
        {EDITOR_LABELS.userManualSearchNoResults}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto" data-testid="manual-search-results">
      {results.map((result) => (
        <div key={result.chapterIndex} className="border-b border-gray-800">
          <button
            type="button"
            onClick={() => onSelectChapter(result.chapterIndex)}
            className={cn(
              'w-full text-left px-3 py-2 cursor-pointer',
              'hover:bg-gray-800 transition-colors',
            )}
            data-testid={`manual-search-result-${result.chapterIndex}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-200 font-medium">
                {result.chapterTitle}
              </span>
              <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                {result.matchCount} {EDITOR_LABELS.userManualSearchMatchCount}
              </span>
            </div>
            {result.snippets.length > 0 && (
              <div className="mt-1 space-y-0.5">
                {result.snippets.map((snippet, snippetIndex) => (
                  <p
                    key={snippetIndex}
                    className="text-xs text-gray-500 truncate"
                  >
                    {snippet.text}
                  </p>
                ))}
              </div>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
