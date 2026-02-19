/**
 * Store non-persisté pour l'historique undo/redo des champs personnalisés.
 * Observe les changements de champs et maintient des piles d'états.
 */

import { create } from 'zustand';
import { useScoreboardStore } from './scoreboardStore';
import type { CustomField } from '@/types/customField';

const MAX_HISTORY = 50;

interface UndoRedoStore {
  past: readonly CustomField[][];
  future: readonly CustomField[][];
  /** Flag interne pour ignorer les push pendant une restauration */
  restoring: boolean;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  /** Vide tout l'historique */
  clear: () => void;
}

export const useUndoRedoStore = create<UndoRedoStore>((set, get) => ({
  past: [],
  future: [],
  restoring: false,
  canUndo: false,
  canRedo: false,

  undo: () => {
    const { past } = get();
    if (past.length === 0) return;

    const currentFields = useScoreboardStore.getState().customFieldsData.fields;
    const previous = past[past.length - 1];
    if (!previous) return;

    const newPast = past.slice(0, -1);
    set({
      restoring: true,
      past: newPast,
      future: [currentFields, ...get().future].slice(0, MAX_HISTORY),
      canUndo: newPast.length > 0,
      canRedo: true,
    });

    /* Restaurer les champs dans le store principal */
    useScoreboardStore.setState((s) => {
      s.customFieldsData.fields = structuredClone(previous) as CustomField[];
    });

    set({ restoring: false });
  },

  redo: () => {
    const { future } = get();
    if (future.length === 0) return;

    const currentFields = useScoreboardStore.getState().customFieldsData.fields;
    const next = future[0];
    if (!next) return;

    const newFuture = future.slice(1);
    set({
      restoring: true,
      past: [...get().past, currentFields].slice(-MAX_HISTORY),
      future: newFuture,
      canUndo: true,
      canRedo: newFuture.length > 0,
    });

    useScoreboardStore.setState((s) => {
      s.customFieldsData.fields = structuredClone(next) as CustomField[];
    });

    set({ restoring: false });
  },

  clear: () => {
    set({ past: [], future: [], canUndo: false, canRedo: false });
  },
}));

/**
 * Initialise l'écoute des changements de champs.
 * Doit être appelé une seule fois au montage de l'application.
 */
let subscribed = false;

export function initUndoRedoListener(): void {
  if (subscribed) return;
  subscribed = true;

  let previousFields = useScoreboardStore.getState().customFieldsData.fields;

  useScoreboardStore.subscribe((state) => {
    const currentFields = state.customFieldsData.fields;
    if (currentFields === previousFields) return;

    const { restoring } = useUndoRedoStore.getState();
    if (!restoring) {
      const snapshot = structuredClone(previousFields) as CustomField[];
      useUndoRedoStore.setState((s) => {
        const newPast = [...s.past, snapshot].slice(-MAX_HISTORY);
        return {
          past: newPast,
          future: [],
          canUndo: newPast.length > 0,
          canRedo: false,
        };
      });
    }

    previousFields = currentFields;
  });
}
