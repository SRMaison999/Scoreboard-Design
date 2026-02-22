/**
 * Store pour la gestion des notifications toast.
 * File d'attente auto-supprimante avec durée configurable.
 */

import { create } from 'zustand';

export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
  readonly id: string;
  readonly message: string;
  readonly variant: ToastVariant;
}

interface ToastState {
  readonly toasts: readonly Toast[];
}

interface ToastActions {
  addToast: (message: string, variant?: ToastVariant) => void;
  removeToast: (id: string) => void;
}

const TOAST_DURATION_MS = 3000;
let toastCounter = 0;

export const useToastStore = create<ToastState & ToastActions>()((set) => ({
  toasts: [],

  addToast: (message, variant = 'success') => {
    const id = `toast-${Date.now()}-${++toastCounter}`;
    const toast: Toast = { id, message, variant };

    set((s) => ({ toasts: [...s.toasts, toast] }));

    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, TOAST_DURATION_MS);
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
