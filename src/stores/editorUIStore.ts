import { create } from 'zustand';
import type { RailTabId, ContentSubTab, FreeLayoutTab } from '@/types/editor';

export interface EditorUIState {
  /** Onglet actif du rail principal */
  readonly activeRailTab: RailTabId;
  /** Sous-onglet actif du panneau Contenu */
  readonly activeContentSubTab: ContentSubTab;
  /** Onglet actif du panneau Layout libre */
  readonly activeFreeLayoutTab: FreeLayoutTab;
}

export interface EditorUIActions {
  /** Change l'onglet actif du rail */
  setRailTab: (tab: RailTabId) => void;
  /** Change le sous-onglet actif du panneau Contenu */
  setContentSubTab: (tab: ContentSubTab) => void;
  /** Navigue directement vers un onglet + sous-onglet */
  navigateTo: (railTab: RailTabId, contentSubTab?: ContentSubTab) => void;
  /** Change l'onglet actif du panneau Layout libre */
  setFreeLayoutTab: (tab: FreeLayoutTab) => void;
}

export type EditorUIStore = EditorUIState & EditorUIActions;

export const useEditorUIStore = create<EditorUIStore>()((set) => ({
  activeRailTab: 'content',
  activeContentSubTab: 'teams',
  activeFreeLayoutTab: 'match',

  setRailTab: (tab) => set({ activeRailTab: tab }),
  setContentSubTab: (tab) => set({ activeContentSubTab: tab }),
  setFreeLayoutTab: (tab) => set({ activeFreeLayoutTab: tab }),
  navigateTo: (railTab, contentSubTab) =>
    set((s) => ({
      activeRailTab: railTab,
      ...(contentSubTab ? { activeContentSubTab: contentSubTab } : {}),
      ...(!contentSubTab && s.activeContentSubTab ? {} : {}),
    })),
}));
