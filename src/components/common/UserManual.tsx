import { Modal, ModalHeader, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { EDITOR_LABELS } from '@/constants/labels';
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
  return (
    <Modal open={open} onClose={onClose} size="xl">
      <ModalHeader>{EDITOR_LABELS.userManualTitle}</ModalHeader>
      <div className="flex h-[60vh]">
        <UserManualChapterList
          activeIndex={activeChapterIndex}
          onSelect={onChapterSelect}
        />
        <UserManualContent chapterIndex={activeChapterIndex} />
      </div>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          {EDITOR_LABELS.userManualClose}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
