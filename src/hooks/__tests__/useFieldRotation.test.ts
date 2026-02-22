import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFieldRotation } from '../useFieldRotation';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { FieldElementConfig } from '@/types/customField';

const textElement: FieldElementConfig = {
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

describe('useFieldRotation', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('retourne les trois handlers de rotation', () => {
    const { result } = renderHook(() => useFieldRotation(1));
    expect(result.current.onRotateStart).toBeDefined();
    expect(result.current.onRotateMove).toBeDefined();
    expect(result.current.onRotateEnd).toBeDefined();
  });

  it('les nouveaux champs ont une rotation par defaut de 0', () => {
    useScoreboardStore.getState().addCustomField(textElement, 100, 100, 200, 80);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];
    expect(field?.rotation).toBe(0);
  });

  it('la rotation peut etre mise a jour via updateCustomFieldProp', () => {
    useScoreboardStore.getState().addCustomField(textElement, 100, 100, 200, 80);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      act(() => {
        useScoreboardStore.getState().updateCustomFieldProp(field.id, 'rotation', 45);
      });
      const updated = useScoreboardStore.getState().customFieldsData.fields[0];
      expect(updated?.rotation).toBe(45);
    }
  });

  it('la rotation est preservee lors de la duplication', () => {
    useScoreboardStore.getState().addCustomField(textElement, 100, 100, 200, 80);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      useScoreboardStore.getState().updateCustomFieldProp(field.id, 'rotation', 90);
      useScoreboardStore.getState().duplicateCustomField(field.id);

      const fields = useScoreboardStore.getState().customFieldsData.fields;
      expect(fields).toHaveLength(2);
      expect(fields[1]?.rotation).toBe(90);
    }
  });
});
