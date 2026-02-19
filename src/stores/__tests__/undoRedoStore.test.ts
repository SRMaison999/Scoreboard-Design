import { describe, it, expect, beforeEach } from 'vitest';
import { useUndoRedoStore, initUndoRedoListener } from '../undoRedoStore';
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
  },
};

describe('undoRedoStore', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
    useUndoRedoStore.getState().clear();
    initUndoRedoListener();
  });

  it('commence sans historique', () => {
    const { canUndo, canRedo } = useUndoRedoStore.getState();
    expect(canUndo).toBe(false);
    expect(canRedo).toBe(false);
  });

  it('enregistre un snapshot après ajout de champ', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    const { canUndo, canRedo } = useUndoRedoStore.getState();
    expect(canUndo).toBe(true);
    expect(canRedo).toBe(false);
  });

  it('annule l\'ajout d\'un champ avec undo', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);

    useUndoRedoStore.getState().undo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(0);
    expect(useUndoRedoStore.getState().canUndo).toBe(false);
    expect(useUndoRedoStore.getState().canRedo).toBe(true);
  });

  it('rétablit un champ annulé avec redo', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    useUndoRedoStore.getState().undo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(0);

    useUndoRedoStore.getState().redo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);
    expect(useUndoRedoStore.getState().canUndo).toBe(true);
    expect(useUndoRedoStore.getState().canRedo).toBe(false);
  });

  it('vide le futur après une nouvelle action', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    useUndoRedoStore.getState().undo();
    expect(useUndoRedoStore.getState().canRedo).toBe(true);

    /* Nouvelle action : vide le redo stack */
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 100, 100, 200, 100);
    expect(useUndoRedoStore.getState().canRedo).toBe(false);
  });

  it('gère plusieurs niveaux d\'undo', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 100, 100, 200, 100);
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 150, 150, 200, 100);
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
    useUndoRedoStore.getState().redo();
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);
  });
});
