import { describe, it, expect, beforeEach } from 'vitest';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { FieldElementConfig } from '@/types/customField';

const TEXT_ELEMENT: FieldElementConfig = {
  type: 'text-block',
  config: {
    content: 'Test',
    fontSize: 30,
    fontWeight: 600,
    fontFamily: '',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
};

function getField(index = 0) {
  const f = useScoreboardStore.getState().customFieldsData.fields[index];
  if (!f) throw new Error(`Champ ${index} introuvable`);
  return f;
}

describe('customFieldActions', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('addCustomField ajoute un champ et le selectionne', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 100, 200, 400, 80);
    const fields = useScoreboardStore.getState().customFieldsData.fields;
    expect(fields).toHaveLength(1);
    const f = getField(0);
    expect(f.x).toBe(100);
    expect(f.y).toBe(200);
    expect(f.width).toBe(400);
    expect(f.height).toBe(80);
    expect(f.element.type).toBe('text-block');
    expect(useScoreboardStore.getState().customFieldsData.selectedFieldId).toBe(f.id);
  });

  it('removeCustomField supprime un champ', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 0, 0, 100, 100);
    const id = getField(0).id;
    useScoreboardStore.getState().removeCustomField(id);
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(0);
    expect(useScoreboardStore.getState().customFieldsData.selectedFieldId).toBeNull();
  });

  it('updateCustomFieldPosition respecte les bornes du canvas', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 100, 100, 200, 100);
    const id = getField(0).id;

    useScoreboardStore.getState().updateCustomFieldPosition(id, -50, -50);
    const field = getField(0);
    expect(field.x).toBe(0);
    expect(field.y).toBe(0);
  });

  it('updateCustomFieldPosition contraint au canvas droit/bas', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 100, 100, 200, 100);
    const id = getField(0).id;

    useScoreboardStore.getState().updateCustomFieldPosition(id, 9999, 9999);
    const field = getField(0);
    expect(field.x).toBeLessThanOrEqual(1920 - field.width);
    expect(field.y).toBeLessThanOrEqual(1080 - field.height);
  });

  it('updateCustomFieldSize respecte la taille minimale', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 0, 0, 200, 200);
    const id = getField(0).id;

    useScoreboardStore.getState().updateCustomFieldSize(id, 10, 10);
    const field = getField(0);
    expect(field.width).toBe(40);
    expect(field.height).toBe(40);
  });

  it('duplicateCustomField cree une copie decalee', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 100, 100, 200, 100);
    const id = getField(0).id;

    useScoreboardStore.getState().duplicateCustomField(id);
    const fields = useScoreboardStore.getState().customFieldsData.fields;
    expect(fields).toHaveLength(2);
    const copy = getField(1);
    expect(copy.x).toBe(130);
    expect(copy.y).toBe(130);
    expect(copy.label).toContain('copie');
  });

  it('updateCustomFieldStyle met a jour partiellement le style', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 0, 0, 200, 200);
    const id = getField(0).id;

    useScoreboardStore.getState().updateCustomFieldStyle(id, { borderWidth: 2, borderColor: '#ff0000' });
    const field = getField(0);
    expect(field.style.borderWidth).toBe(2);
    expect(field.style.borderColor).toBe('#ff0000');
    expect(field.style.backgroundColor).toBe('');
  });

  it('selectCustomField change la selection', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 0, 0, 100, 100);
    const id = getField(0).id;

    useScoreboardStore.getState().selectCustomField(null);
    expect(useScoreboardStore.getState().customFieldsData.selectedFieldId).toBeNull();

    useScoreboardStore.getState().selectCustomField(id);
    expect(useScoreboardStore.getState().customFieldsData.selectedFieldId).toBe(id);
  });

  it('ne deplace pas un champ verrouille', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 100, 100, 200, 100);
    const id = getField(0).id;
    useScoreboardStore.getState().updateCustomFieldProp(id, 'locked', true);

    useScoreboardStore.getState().updateCustomFieldPosition(id, 500, 500);
    const field = getField(0);
    expect(field.x).toBe(100);
    expect(field.y).toBe(100);
  });

  it('updateCustomFieldsOption met a jour les options', () => {
    useScoreboardStore.getState().updateCustomFieldsOption('fullPageMode', true);
    expect(useScoreboardStore.getState().customFieldsData.fullPageMode).toBe(true);

    useScoreboardStore.getState().updateCustomFieldsOption('snapToGrid', false);
    expect(useScoreboardStore.getState().customFieldsData.snapToGrid).toBe(false);
  });

  it('reorderCustomField change le zIndex', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 0, 0, 100, 100);
    const id = getField(0).id;

    useScoreboardStore.getState().reorderCustomField(id, 10);
    expect(getField(0).zIndex).toBe(10);
  });

  it('respecte la limite max de champs', () => {
    for (let i = 0; i < 50; i++) {
      useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 0, 0, 100, 100);
    }
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(50);

    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 0, 0, 100, 100);
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(50);
  });
});
