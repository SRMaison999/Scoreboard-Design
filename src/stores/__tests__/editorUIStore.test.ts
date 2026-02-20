import { describe, it, expect, beforeEach } from 'vitest';
import { useEditorUIStore } from '@/stores/editorUIStore';

describe('editorUIStore', () => {
  beforeEach(() => {
    useEditorUIStore.setState({
      activeRailTab: 'content',
      activeContentSubTab: 'teams',
    });
  });

  it('a les valeurs par défaut correctes', () => {
    const state = useEditorUIStore.getState();
    expect(state.activeRailTab).toBe('content');
    expect(state.activeContentSubTab).toBe('teams');
  });

  it('change le rail tab avec setRailTab', () => {
    useEditorUIStore.getState().setRailTab('appearance');
    expect(useEditorUIStore.getState().activeRailTab).toBe('appearance');
  });

  it('change le sous-onglet avec setContentSubTab', () => {
    useEditorUIStore.getState().setContentSubTab('match');
    expect(useEditorUIStore.getState().activeContentSubTab).toBe('match');
  });

  it('navigue vers un onglet et sous-onglet avec navigateTo', () => {
    useEditorUIStore.getState().navigateTo('content', 'teams');
    const state = useEditorUIStore.getState();
    expect(state.activeRailTab).toBe('content');
    expect(state.activeContentSubTab).toBe('teams');
  });

  it('navigue sans changer le sous-onglet si non spécifié', () => {
    useEditorUIStore.getState().setContentSubTab('match');
    useEditorUIStore.getState().navigateTo('appearance');
    const state = useEditorUIStore.getState();
    expect(state.activeRailTab).toBe('appearance');
    expect(state.activeContentSubTab).toBe('match');
  });

  it('a la valeur par d\u00e9faut de activeFreeLayoutTab', () => {
    expect(useEditorUIStore.getState().activeFreeLayoutTab).toBe('library');
  });

  it('a la valeur par d\u00e9faut de activeLibraryCategory', () => {
    expect(useEditorUIStore.getState().activeLibraryCategory).toBe('all');
  });

  it('change l\'onglet Layout libre avec setFreeLayoutTab', () => {
    useEditorUIStore.getState().setFreeLayoutTab('layers');
    expect(useEditorUIStore.getState().activeFreeLayoutTab).toBe('layers');
  });

  it('change le filtre de cat\u00e9gorie avec setLibraryCategory', () => {
    useEditorUIStore.getState().setLibraryCategory('match');
    expect(useEditorUIStore.getState().activeLibraryCategory).toBe('match');
  });
});
