/**
 * Tests pour le hook useCustomFieldKeyboard.
 * Raccourcis clavier du mode Layout libre :
 * Suppr/Backspace, Ctrl+D, flèches directionnelles.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useCustomFieldKeyboard } from '@/hooks/useCustomFieldKeyboard';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { CustomField } from '@/types/customField';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';

/* --- Helpers --- */

function fireKey(key: string, opts: Partial<KeyboardEventInit> = {}) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, ...opts });
  document.dispatchEvent(event);
}

function makeField(overrides: Partial<CustomField> = {}): CustomField {
  return {
    id: 'field-test-1',
    label: 'Champ test',
    x: 100,
    y: 100,
    width: 200,
    height: 80,
    rotation: 0,
    zIndex: 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: true,
    initialWidth: 200,
    initialHeight: 80,
    element: { type: 'text-block', config: { content: 'Test', fontSize: 24, fontWeight: 400, fontFamily: '', textAlign: 'left', textTransform: 'none', letterSpacing: 0, textColor: '#ffffff' } },
    style: { ...DEFAULT_FIELD_STYLE },
    ...overrides,
  } as CustomField;
}

function setupFieldSelected(fieldOverrides: Partial<CustomField> = {}) {
  const field = makeField(fieldOverrides);
  useScoreboardStore.setState((s) => ({
    ...s,
    bodyType: 14,
    customFieldsData: {
      ...s.customFieldsData,
      fields: [field],
      selectedFieldIds: [field.id],
    },
  }));
  return field;
}

/* --- Tests --- */

describe('useCustomFieldKeyboard', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  /* --- Suppression --- */

  it('Suppr supprime le champ sélectionné', () => {
    setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('Delete'));

    const state = useScoreboardStore.getState();
    expect(state.customFieldsData.fields).toHaveLength(0);
    expect(state.customFieldsData.selectedFieldIds).toEqual([]);
  });

  it('Backspace supprime le champ sélectionné', () => {
    setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('Backspace'));

    const state = useScoreboardStore.getState();
    expect(state.customFieldsData.fields).toHaveLength(0);
    expect(state.customFieldsData.selectedFieldIds).toEqual([]);
  });

  /* --- Duplication --- */

  it('Ctrl+D duplique le champ sélectionné', () => {
    setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('d', { ctrlKey: true }));

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    expect(fields).toHaveLength(2);
    expect(fields[1]!.label).toContain('(copie)');
  });

  it('Meta+D duplique le champ sélectionné (macOS)', () => {
    setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('d', { metaKey: true }));

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    expect(fields).toHaveLength(2);
  });

  /* --- Déplacement avec les flèches --- */

  it('ArrowLeft déplace le champ de 1px vers la gauche', () => {
    const field = setupFieldSelected();
    useScoreboardStore.setState((s) => ({
      customFieldsData: { ...s.customFieldsData, snapToGrid: false },
    }));
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowLeft'));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x - 1);
    expect(updated.y).toBe(field.y);
  });

  it('ArrowRight déplace le champ de 1px vers la droite', () => {
    const field = setupFieldSelected();
    useScoreboardStore.setState((s) => ({
      customFieldsData: { ...s.customFieldsData, snapToGrid: false },
    }));
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowRight'));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x + 1);
    expect(updated.y).toBe(field.y);
  });

  it('ArrowUp déplace le champ de 1px vers le haut', () => {
    const field = setupFieldSelected();
    useScoreboardStore.setState((s) => ({
      customFieldsData: { ...s.customFieldsData, snapToGrid: false },
    }));
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowUp'));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x);
    expect(updated.y).toBe(field.y - 1);
  });

  it('ArrowDown déplace le champ de 1px vers le bas', () => {
    const field = setupFieldSelected();
    useScoreboardStore.setState((s) => ({
      customFieldsData: { ...s.customFieldsData, snapToGrid: false },
    }));
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowDown'));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x);
    expect(updated.y).toBe(field.y + 1);
  });

  /* --- Shift + flèches : déplacement de 10px --- */

  it('Shift+ArrowLeft déplace le champ de 10px vers la gauche', () => {
    const field = setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowLeft', { shiftKey: true }));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x - 10);
    expect(updated.y).toBe(field.y);
  });

  it('Shift+ArrowRight déplace le champ de 10px vers la droite', () => {
    const field = setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowRight', { shiftKey: true }));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x + 10);
    expect(updated.y).toBe(field.y);
  });

  it('Shift+ArrowUp déplace le champ de 10px vers le haut', () => {
    const field = setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowUp', { shiftKey: true }));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x);
    expect(updated.y).toBe(field.y - 10);
  });

  it('Shift+ArrowDown déplace le champ de 10px vers le bas', () => {
    const field = setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowDown', { shiftKey: true }));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x);
    expect(updated.y).toBe(field.y + 10);
  });

  /* --- Snap to grid : déplacement par pas de grille --- */

  it('Flèche avec snapToGrid activé déplace par pas de gridSize', () => {
    const field = setupFieldSelected();
    useScoreboardStore.setState((s) => ({
      customFieldsData: { ...s.customFieldsData, snapToGrid: true, gridSize: 20 },
    }));
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowRight'));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x + 20);
  });

  it('Shift+flèche avec snapToGrid ignore le gridSize et utilise 10px', () => {
    const field = setupFieldSelected();
    useScoreboardStore.setState((s) => ({
      customFieldsData: { ...s.customFieldsData, snapToGrid: true, gridSize: 20 },
    }));
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowRight', { shiftKey: true }));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x + 10);
  });

  /* --- Aucun champ sélectionné : touches ignorées --- */

  it('Delete est ignoré quand aucun champ n\'est sélectionné', () => {
    const field = makeField();
    useScoreboardStore.setState((s) => ({
      bodyType: 14,
      customFieldsData: {
        ...s.customFieldsData,
        fields: [field],
        selectedFieldIds: [],
      },
    }));
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('Delete'));

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    expect(fields).toHaveLength(1);
  });

  it('Ctrl+D est ignoré quand aucun champ n\'est sélectionné', () => {
    const field = makeField();
    useScoreboardStore.setState((s) => ({
      bodyType: 14,
      customFieldsData: {
        ...s.customFieldsData,
        fields: [field],
        selectedFieldIds: [],
      },
    }));
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('d', { ctrlKey: true }));

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    expect(fields).toHaveLength(1);
  });

  it('Les flèches sont ignorées quand aucun champ n\'est sélectionné', () => {
    const field = makeField();
    useScoreboardStore.setState((s) => ({
      bodyType: 14,
      customFieldsData: {
        ...s.customFieldsData,
        fields: [field],
        selectedFieldIds: [],
      },
    }));
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowRight'));
    act(() => fireKey('ArrowDown'));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x);
    expect(updated.y).toBe(field.y);
  });

  /* --- Champ verrouillé : déplacement bloqué, suppression/duplication autorisée --- */

  it('Les flèches sont ignorées quand le champ est verrouillé', () => {
    const field = setupFieldSelected({ locked: true });
    useScoreboardStore.setState((s) => ({
      customFieldsData: { ...s.customFieldsData, snapToGrid: false },
    }));
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('ArrowRight'));
    act(() => fireKey('ArrowDown'));

    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(field.x);
    expect(updated.y).toBe(field.y);
  });

  it('Delete fonctionne même si le champ est verrouillé', () => {
    setupFieldSelected({ locked: true });
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('Delete'));

    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(0);
  });

  it('Ctrl+D fonctionne même si le champ est verrouillé', () => {
    setupFieldSelected({ locked: true });
    renderHook(() => useCustomFieldKeyboard());

    act(() => fireKey('d', { ctrlKey: true }));

    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(2);
  });

  /* --- Focus sur un champ de saisie : touches ignorées --- */

  it('Les raccourcis sont ignorés quand un INPUT est focus', () => {
    setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const event = new KeyboardEvent('keydown', { key: 'Delete', bubbles: true });
    act(() => { input.dispatchEvent(event); });

    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);

    document.body.removeChild(input);
  });

  it('Les raccourcis sont ignorés quand un TEXTAREA est focus', () => {
    setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.focus();

    const event = new KeyboardEvent('keydown', { key: 'Delete', bubbles: true });
    act(() => { textarea.dispatchEvent(event); });

    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);

    document.body.removeChild(textarea);
  });

  it('Les raccourcis sont ignorés quand un SELECT est focus', () => {
    setupFieldSelected();
    renderHook(() => useCustomFieldKeyboard());

    const select = document.createElement('select');
    document.body.appendChild(select);
    select.focus();

    const event = new KeyboardEvent('keydown', { key: 'Delete', bubbles: true });
    act(() => { select.dispatchEvent(event); });

    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);

    document.body.removeChild(select);
  });

  /* --- Nettoyage du listener --- */

  it('Le listener est supprimé quand le hook est démonté', () => {
    setupFieldSelected();
    useScoreboardStore.setState((s) => ({
      customFieldsData: { ...s.customFieldsData, snapToGrid: false },
    }));
    const { unmount } = renderHook(() => useCustomFieldKeyboard());

    unmount();

    act(() => fireKey('Delete'));

    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);
  });
});
