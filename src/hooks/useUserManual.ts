import { useState, useCallback } from 'react';

export function useUserManual() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const goToChapter = useCallback((index: number) => {
    setActiveChapterIndex(index);
  }, []);

  return {
    isOpen,
    activeChapterIndex,
    open,
    close,
    goToChapter,
  } as const;
}
