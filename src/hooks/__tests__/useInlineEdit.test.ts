import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInlineEdit } from '../useInlineEdit';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { FieldElementConfig } from '@/types/customField';

const TEXT_BLOCK_ELEMENT: FieldElementConfig = {
  type: 'text-block',
  config: {
    content: 'Texte initial',
    fontSize: 24,
    fontWeight: 600,
    fontFamily: '',
    textAlign: 'center',
    textTransform: 'none',
    letterSpacing: 0,
    textColor: '#ffffff',
  },
};

const SHAPE_ELEMENT: FieldElementConfig = {
  type: 'shape-block',
  config: {
    shape: 'rectangle',
    fillColor: '#ff0000',
    fillOpacity: 100,
    borderColor: '',
    borderWidth: 0,
    borderRadius: 0,
  },
};

describe('useInlineEdit', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('initialise avec editingFieldId a null', () => {
    const { result } = renderHook(() => useInlineEdit());
    expect(result.current.editingFieldId).toBeNull();
    expect(result.current.originalContent).toBe('');
  });

  it('demarre l\'edition d\'un champ text-block', () => {
    const store = useScoreboardStore.getState();
    store.addCustomField(TEXT_BLOCK_ELEMENT, 0, 0, 200, 80);
    const fieldId = useScoreboardStore.getState().customFieldsData.fields[0]!.id;

    const { result } = renderHook(() => useInlineEdit());

    act(() => {
      result.current.startEditing(fieldId);
    });

    expect(result.current.editingFieldId).toBe(fieldId);
    expect(result.current.originalContent).toBe('Texte initial');
  });

  it('ne demarre pas l\'edition pour un champ non text-block', () => {
    const store = useScoreboardStore.getState();
    store.addCustomField(SHAPE_ELEMENT, 0, 0, 200, 200);
    const fieldId = useScoreboardStore.getState().customFieldsData.fields[0]!.id;

    const { result } = renderHook(() => useInlineEdit());

    act(() => {
      result.current.startEditing(fieldId);
    });

    expect(result.current.editingFieldId).toBeNull();
  });

  it('ne demarre pas l\'edition pour un champ inexistant', () => {
    const { result } = renderHook(() => useInlineEdit());

    act(() => {
      result.current.startEditing('inexistant');
    });

    expect(result.current.editingFieldId).toBeNull();
  });

  it('commitEdit sauvegarde le contenu et quitte le mode edition', () => {
    const store = useScoreboardStore.getState();
    store.addCustomField(TEXT_BLOCK_ELEMENT, 0, 0, 200, 80);
    const fieldId = useScoreboardStore.getState().customFieldsData.fields[0]!.id;

    const { result } = renderHook(() => useInlineEdit());

    act(() => {
      result.current.startEditing(fieldId);
    });
    act(() => {
      result.current.commitEdit('Nouveau texte');
    });

    expect(result.current.editingFieldId).toBeNull();

    /* Verifier que le store a ete mis a jour */
    const updatedField = useScoreboardStore.getState().customFieldsData.fields[0];
    expect(updatedField?.element.type).toBe('text-block');
    if (updatedField?.element.type === 'text-block') {
      expect(updatedField.element.config.content).toBe('Nouveau texte');
    }
  });

  it('cancelEdit quitte le mode edition sans sauvegarder', () => {
    const store = useScoreboardStore.getState();
    store.addCustomField(TEXT_BLOCK_ELEMENT, 0, 0, 200, 80);
    const fieldId = useScoreboardStore.getState().customFieldsData.fields[0]!.id;

    const { result } = renderHook(() => useInlineEdit());

    act(() => {
      result.current.startEditing(fieldId);
    });
    act(() => {
      result.current.cancelEdit();
    });

    expect(result.current.editingFieldId).toBeNull();

    /* Verifier que le contenu original est preserve */
    const field = useScoreboardStore.getState().customFieldsData.fields[0];
    if (field?.element.type === 'text-block') {
      expect(field.element.config.content).toBe('Texte initial');
    }
  });

  it('commitEdit sans edition active ne fait rien', () => {
    const { result } = renderHook(() => useInlineEdit());

    act(() => {
      result.current.commitEdit('Texte');
    });

    expect(result.current.editingFieldId).toBeNull();
  });
});
