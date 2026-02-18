import { type ReactNode, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
  full: 'max-w-[90vw] max-h-[90vh]',
};

interface ModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly children: ReactNode;
  readonly size?: ModalSize;
}

interface ModalSubProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Modal({ open, onClose, children, size = 'md' }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          'bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-full mx-4',
          SIZE_CLASSES[size],
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children }: ModalSubProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-700">
      <h2 className="text-lg font-bold text-gray-100">{children}</h2>
    </div>
  );
}

export function ModalBody({ children }: ModalSubProps) {
  return <div className="px-6 py-4">{children}</div>;
}

export function ModalFooter({ children }: ModalSubProps) {
  return (
    <div className="px-6 py-3 border-t border-gray-700 flex justify-end gap-2">
      {children}
    </div>
  );
}
