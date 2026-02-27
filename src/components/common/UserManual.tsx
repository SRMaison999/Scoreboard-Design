import { Modal, ModalHeader, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { EDITOR_LABELS } from '@/constants/labels';
import { useManualSearch } from '@/hooks/useManualSearch';
import { UserManualSearchBar } from './UserManualSearchBar';
import { UserManualSearchResults } from './UserManualSearchResults';
import { UserManualChapterList } from './UserManualChapterList';
import { UserManualContent } from './UserManualContent';

interface UserManualProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly activeChapterIndex: number;
  readonly onChapterSelect: (index: number) => void;
}

export function UserManual({
  open,
  onClose,
  activeChapterIndex,
  onChapterSelect,
}: UserManualProps) {
  const search = useManualSearch();

  const handleSelectFromResults = (index: number) => {
    onChapterSelect(index);
  };

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <ModalHeader>{EDITOR_LABELS.userManualTitle}</ModalHeader>
      <div className="flex h-[60vh]">
        <div className="w-64 flex-shrink-0 border-r border-gray-700 flex flex-col">
          <UserManualSearchBar
            query={search.query}
            totalMatchCount={search.totalMatchCount}
            resultCount={search.results.length}
            isSearchActive={search.isSearchActive}
            onQueryChange={search.updateQuery}
            onClear={search.clearSearch}
          />
          {search.isSearchActive ? (
            <UserManualSearchResults
              results={search.results}
              onSelectChapter={handleSelectFromResults}
            />
          ) : (
            <UserManualChapterList
              activeIndex={activeChapterIndex}
              onSelect={onChapterSelect}
            />
          )}
        </div>
        <UserManualContent
          chapterIndex={activeChapterIndex}
          highlightTerm={search.isSearchActive ? search.debouncedQuery : ''}
        />
      </div>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          {EDITOR_LABELS.userManualClose}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
