import { create } from 'zustand';
import type { RailTabId, ContentSubTab, FreeLayoutTab } from '@/types/editor';
import type { LibraryCategory } from '@/types/customField';

export interface EditorUIState {
  /** Onglet actif du rail principal */
  readonly activeRailTab: RailTabId;
  /** Sous-onglet actif du panneau Contenu */
  readonly activeContentSubTab: ContentSubTab;
  /** Onglet actif du panneau Layout libre */
  readonly activeFreeLayoutTab: FreeLayoutTab;
  /** Filtre de cat\u00e9gorie actif dans la biblioth\u00e8que unifi\u00e9e */
  readonly activeLibraryCategory: LibraryCategory | 'all';
  /** Affiche la section donn\u00e9es du match dans le panneau de droite */
  readonly matchDataVisible: boolean;
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
  /** Change le filtre de cat\u00e9gorie dans la biblioth\u00e8que */
  setLibraryCategory: (cat: LibraryCategory | 'all') => void;
  /** Affiche ou masque les donn\u00e9es du match dans le panneau de droite */
  setMatchDataVisible: (visible: boolean) => void;
}

export type EditorUIStore = EditorUIState & EditorUIActions;

export const useEditorUIStore = create<EditorUIStore>()((set) => ({
  activeRailTab: 'content',
  activeContentSubTab: 'teams',
  activeFreeLayoutTab: 'library',
  activeLibraryCategory: 'all',
  matchDataVisible: false,

  setRailTab: (tab) => set({ activeRailTab: tab }),
  setContentSubTab: (tab) => set({ activeContentSubTab: tab }),
  setFreeLayoutTab: (tab) => set({ activeFreeLayoutTab: tab }),
  setLibraryCategory: (cat) => set({ activeLibraryCategory: cat }),
  setMatchDataVisible: (visible) => set({ matchDataVisible: visible }),
  navigateTo: (railTab, contentSubTab) =>
    set((s) => ({
      activeRailTab: railTab,
      ...(contentSubTab ? { activeContentSubTab: contentSubTab } : {}),
      ...(!contentSubTab && s.activeContentSubTab ? {} : {}),
    })),
}));
