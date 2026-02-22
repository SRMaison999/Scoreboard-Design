/**
 * Conteneur de notifications toast.
 * Positionné en bas à droite, affiche les toasts empilés avec auto-suppression.
 */

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToastStore } from '@/stores/toastStore';
import type { ToastVariant } from '@/stores/toastStore';

const variantClasses: Record<ToastVariant, string> = {
  success: 'bg-green-900 border-green-700 text-green-200',
  error: 'bg-red-900 border-red-700 text-red-200',
  info: 'bg-gray-800 border-gray-600 text-gray-200',
};

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      data-testid="toast-container"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          data-testid="toast-item"
          className={cn(
            'pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-lg border',
            'shadow-lg text-sm font-medium min-w-[240px] max-w-[400px]',
            'animate-in slide-in-from-right-5',
            variantClasses[toast.variant],
          )}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="p-0.5 rounded hover:bg-white/10 transition-colors"
          >
            <X size={14} className="flex-shrink-0" />
          </button>
        </div>
      ))}
    </div>
  );
}
