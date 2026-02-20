/**
 * Store non-persist\u00e9 pour le presse-papiers du mode Layout libre.
 * Stocke les champs copi\u00e9s (deep copy) pour les op\u00e9rations couper/copier/coller.
 */

import { create } from 'zustand';
import type { CustomField } from '@/types/customField';

interface ClipboardStore {
  /** Champs copi\u00e9s en m\u00e9moire (deep copy) */
  copiedFields: CustomField[];
  /** Compteur de collages successifs (pour le d\u00e9calage) */
  pasteCount: number;
  /** Copie les champs fournis dans le presse-papiers */
  copyFields: (fields: CustomField[]) => void;
  /** Vide le presse-papiers */
  clear: () => void;
  /** Incr\u00e9mente le compteur de collage */
  incrementPasteCount: () => void;
  /** R\u00e9initialise le compteur de collage */
  resetPasteCount: () => void;
}

export const useClipboardStore = create<ClipboardStore>((set) => ({
  copiedFields: [],
  pasteCount: 0,
  copyFields: (fields) =>
    set({
      copiedFields: structuredClone(fields),
      pasteCount: 0,
    }),
  clear: () => set({ copiedFields: [], pasteCount: 0 }),
  incrementPasteCount: () =>
    set((s) => ({ pasteCount: s.pasteCount + 1 })),
  resetPasteCount: () => set({ pasteCount: 0 }),
}));
