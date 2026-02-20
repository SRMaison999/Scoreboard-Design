import { create } from 'zustand';
import type { RailTabId, ContentSubTab } from '@/types/editor';

export interface EditorUIState {
  /** Onglet actif du rail principal */
  readonly activeRailTab: RailTabId;
  /** Sous-onglet actif du panneau Contenu */
  readonly activeContentSubTab: ContentSubTab;
}

export interface EditorUIActions {
  /** Change l'onglet actif du rail */
  setRailTab: (tab: RailTabId) => void;
  /** Change le sous-onglet actif du panneau Contenu */
  setContentSubTab: (tab: ContentSubTab) => void;
  /** Navigue directement vers un onglet + sous-onglet */
  navigateTo: (railTab: RailTabId, contentSubTab?: ContentSubTab) => void;
}

export type EditorUIStore = EditorUIState & EditorUIActions;

export const useEditorUIStore = create<EditorUIStore>()((set) => ({
  activeRailTab: 'content',
  activeContentSubTab: 'teams',

  setRailTab: (tab) => set({ activeRailTab: tab }),
  setContentSubTab: (tab) => set({ activeContentSubTab: tab }),
  navigateTo: (railTab, contentSubTab) =>
    set((s) => ({
      activeRailTab: railTab,
      ...(contentSubTab ? { activeContentSubTab: contentSubTab } : {}),
      ...(!contentSubTab && s.activeContentSubTab ? {} : {}),
    })),
}));
