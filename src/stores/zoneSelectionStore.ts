/**
 * Store non-persisté pour l'état transient de la sélection de zone.
 * Sert de pont entre le canvas (BodyType14) et le sidebar (CustomFieldsSection).
 */

import { create } from 'zustand';
import type { CustomField } from '@/types/customField';

interface ZoneSelectionStore {
  /** Champs capturés par la sélection de zone (null si pas de capture en cours) */
  capturedFields: readonly CustomField[] | null;
  /** Stocke les champs capturés depuis le canvas */
  setCapturedFields: (fields: readonly CustomField[] | null) => void;
  /** Efface les champs capturés */
  clearCapturedFields: () => void;
}

export const useZoneSelectionStore = create<ZoneSelectionStore>((set) => ({
  capturedFields: null,
  setCapturedFields: (fields) => set({ capturedFields: fields }),
  clearCapturedFields: () => set({ capturedFields: null }),
}));
