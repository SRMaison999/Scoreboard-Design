import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  useUndoRedoStore,
  initUndoRedoListener,
  resetUndoRedoListener,
  flushUndoSnapshot,
  DEBOUNCE_DELAY,
} from '../undoRedoStore';
import { useScoreboardStore } from '../scoreboardStore';
import type { FieldElementConfig } from '@/types/customField';

const TEXT_ELEMENT: FieldElementConfig = {
  type: 'text-block',
  config: {
    content: 'test',
    fontSize: 20,
    fontWeight: 400,
    fontFamily: '',
    textAlign: 'center',
    textTransform: 'none',
    letterSpacing: 0,
    textColor: '#ffffff',
  },
};

describe('undoRedoStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
    useUndoRedoStore.getState().clear();
    resetUndoRedoListener();
    initUndoRedoListener();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('commence sans historique', () => {
    const { canUndo, canRedo } = useUndoRedoStore.getState();
    expect(canUndo).toBe(false);
    expect(canRedo).toBe(false);
  });

  it('enregistre un snapshot après ajout de champ et debounce', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);

    /* Avant le debounce, pas encore de snapshot */
    expect(useUndoRedoStore.getState().canUndo).toBe(false);

    /* Après le délai de debounce */
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);
    expect(useUndoRedoStore.getState().canUndo).toBe(true);
    expect(useUndoRedoStore.getState().canRedo).toBe(false);
  });

  it('regroupe les changements rapides en un seul snapshot', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    const fieldId = useScoreboardStore.getState().customFieldsData.fields[0]?.id ?? '';

    /* Simuler plusieurs déplacements rapides (drag) */
    useScoreboardStore.getState().updateCustomFieldProp(fieldId, 'x', 60);
    useScoreboardStore.getState().updateCustomFieldProp(fieldId, 'x', 70);
    useScoreboardStore.getState().updateCustomFieldProp(fieldId, 'x', 80);

    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);

    /* Tous les changements rapides = un seul snapshot dans le passé */
    expect(useUndoRedoStore.getState().past).toHaveLength(1);
  });

  it('flushUndoSnapshot force le commit immédiat', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    expect(useUndoRedoStore.getState().canUndo).toBe(false);

    flushUndoSnapshot();
    expect(useUndoRedoStore.getState().canUndo).toBe(true);
  });

  it('annule l\'ajout d\'un champ avec undo', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);

    useUndoRedoStore.getState().undo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(0);
    expect(useUndoRedoStore.getState().canUndo).toBe(false);
    expect(useUndoRedoStore.getState().canRedo).toBe(true);
  });

  it('rétablit un champ annulé avec redo', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);

    useUndoRedoStore.getState().undo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(0);

    useUndoRedoStore.getState().redo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);
    expect(useUndoRedoStore.getState().canUndo).toBe(true);
    expect(useUndoRedoStore.getState().canRedo).toBe(false);
  });

  it('vide le futur après une nouvelle action', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);

    useUndoRedoStore.getState().undo();
    expect(useUndoRedoStore.getState().canRedo).toBe(true);

    /* Nouvelle action : vide le redo stack */
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 100, 100, 200, 100);
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);
    expect(useUndoRedoStore.getState().canRedo).toBe(false);
  });

  it('gère plusieurs niveaux d\'undo', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);

    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 100, 100, 200, 100);
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);

    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 150, 150, 200, 100);
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);

    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(3);

    useUndoRedoStore.getState().undo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(2);

    useUndoRedoStore.getState().undo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);

    useUndoRedoStore.getState().undo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(0);
  });

  it('clear vide tout l\'historique', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);

    useUndoRedoStore.getState().undo();
    expect(useUndoRedoStore.getState().canRedo).toBe(true);

    useUndoRedoStore.getState().clear();
    expect(useUndoRedoStore.getState().canUndo).toBe(false);
    expect(useUndoRedoStore.getState().canRedo).toBe(false);
  });

  it('ne fait rien sur undo quand le passé est vide', () => {
    useUndoRedoStore.getState().undo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(0);
  });

  it('ne fait rien sur redo quand le futur est vide', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);

    useUndoRedoStore.getState().redo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);
  });

  it('resetUndoRedoListener nettoie l\'état', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    resetUndoRedoListener();
    vi.advanceTimersByTime(DEBOUNCE_DELAY + 10);

    /* Le snapshot en attente a été nettoyé par le reset */
    expect(useUndoRedoStore.getState().canUndo).toBe(false);
  });
});
